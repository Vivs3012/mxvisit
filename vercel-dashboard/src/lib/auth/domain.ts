import { ALLOWED_EMAIL_DOMAIN } from "./constants";

export function normalizeEmail(email: string): string {
 return email.trim().toLowerCase();
}

export function isAllowedEmail(email: string): boolean {
 return normalizeEmail(email).endsWith(ALLOWED_EMAIL_DOMAIN);
}
