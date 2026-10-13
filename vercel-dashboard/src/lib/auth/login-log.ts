import { Redis } from "@upstash/redis";
import { normalizeEmail } from "./domain";

export type LoginLogEntry = {
 email: string;
 loggedAt: string;
 userAgent?: string;
};

const LOGIN_LOG_KEY = "oneyp:login-log";
const MAX_ENTRIES = 100;

const devMemoryLog: LoginLogEntry[] = [];

function redisClient(): Redis | null {
 const url =
 process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
 const token =
 process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

 if (url && token) {
 return new Redis({ url, token });
 }

 try {
 return Redis.fromEnv();
 } catch {
 return null;
 }
}

export async function checkLoginLogStorage(): Promise<{
 configured: boolean;
 connected: boolean;
}> {
 const redis = redisClient();
 const configured = Boolean(redis);
 if (!redis) {
 return { configured: false, connected: false };
 }

 try {
 const pong = await redis.ping();
 return { configured: true, connected: pong === "PONG" };
 } catch {
 return { configured: true, connected: false };
 }
}

export function isLoginLogStorageEnabled(): boolean {
 return Boolean(redisClient()) || process.env.NODE_ENV === "development";
}

export async function recordLogin(input: {
 email: string;
 userAgent?: string;
}): Promise<void> {
 const entry: LoginLogEntry = {
 email: normalizeEmail(input.email),
 loggedAt: new Date().toISOString(),
 userAgent: input.userAgent?.slice(0, 240),
 };

 const redis = redisClient();
 if (redis) {
 await redis.lpush(LOGIN_LOG_KEY, entry);
 await redis.ltrim(LOGIN_LOG_KEY, 0, MAX_ENTRIES - 1);
 return;
 }

 if (process.env.NODE_ENV === "development") {
 devMemoryLog.unshift(entry);
 devMemoryLog.splice(MAX_ENTRIES);
 }
}

function parseLoginEntry(item: unknown): LoginLogEntry | null {
 if (typeof item === "string") {
 try {
 return JSON.parse(item) as LoginLogEntry;
 } catch {
 return null;
 }
 }
 if (item && typeof item === "object" && "email" in item && "loggedAt" in item) {
 return item as LoginLogEntry;
 }
 return null;
}

export async function getRecentLogins(limit = 30): Promise<LoginLogEntry[]> {
 const capped = Math.min(Math.max(limit, 1), MAX_ENTRIES);

 const redis = redisClient();
 if (redis) {
 const raw = await redis.lrange<unknown>(LOGIN_LOG_KEY, 0, capped - 1);
 return raw
.map(parseLoginEntry)
.filter((item): item is LoginLogEntry => Boolean(item?.email && item?.loggedAt));
 }

 if (process.env.NODE_ENV === "development") {
 return devMemoryLog.slice(0, capped);
 }

 return [];
}
