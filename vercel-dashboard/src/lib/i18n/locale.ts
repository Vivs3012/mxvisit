export type Locale = "en" | "pt";

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "oneyp-locale";

export function parseLocale(raw: string | null | undefined): Locale {
 if (raw === "pt" || raw === "pt-BR" || raw === "pt-br") return "pt";
 return "en";
}

export function localeToHtmlLang(locale: Locale): string {
 return locale === "pt" ? "pt-BR" : "en";
}
