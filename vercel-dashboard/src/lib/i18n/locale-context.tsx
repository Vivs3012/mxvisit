"use client";

import {
 createContext,
 useContext,
 useEffect,
 useMemo,
 type ReactNode,
} from "react";
import { type Locale, localeToHtmlLang } from "./locale";
import { lc, type LocalizedString } from "./lc";

type LocaleContextValue = {
 locale: Locale;
 setLocale: (locale: Locale) => void;
 t: (bag: LocalizedString) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/** Controlled locale — parent owns state (URL + localStorage). */
export function LocaleProvider({
 locale,
 setLocale,
 children,
}: {
 locale: Locale;
 setLocale: (locale: Locale) => void;
 children: ReactNode;
}) {
 useEffect(() => {
 document.documentElement.lang = localeToHtmlLang(locale);
 }, [locale]);

 const value = useMemo(
 () => ({
 locale,
 setLocale,
 t: (bag: LocalizedString) => lc(locale, bag),
 }),
 [locale, setLocale],
 );

 return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
 const ctx = useContext(LocaleContext);
 if (!ctx) {
 throw new Error("useLocale must be used within LocaleProvider");
 }
 return ctx;
}
