import { normalizeEmail } from "./domain";

export const ADMIN_EMAILS = ["vivian.damasceno@ab-inbev.com"] as const;

export function isAdminEmail(email: string): boolean {
 const normalized = normalizeEmail(email);
 return ADMIN_EMAILS.some((admin) => admin === normalized);
}
