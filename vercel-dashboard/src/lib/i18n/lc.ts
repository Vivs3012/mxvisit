import type { Locale } from "./locale";

export type LocalizedString = { en: string; pt: string };

export function lc(locale: Locale, bag: LocalizedString): string {
 return locale === "pt" ? bag.pt : bag.en;
}

export function lcList(locale: Locale, bag: { en: string[]; pt: string[] }): string[] {
 return locale === "pt" ? bag.pt : bag.en;
}

export function lcOptional(locale: Locale, bag: { en: string; pt?: string }): string {
 return locale === "pt" ? (bag.pt ?? bag.en) : bag.en;
}
