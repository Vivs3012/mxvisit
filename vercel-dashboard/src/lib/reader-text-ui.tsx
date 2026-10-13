"use client";

import { Text } from "@/components/ui";
import type { CSSProperties } from "react";
import { useLocale } from "./i18n/locale-context";
import { clarifyReaderText } from "./reader-text";

type ReaderTextProps = {
  size?: "small" | "medium" | "large";
  tone?: "primary" | "secondary" | "tertiary";
  weight?: "normal" | "semibold" | "bold";
  style?: CSSProperties;
  children: string;
};

/** User-facing copy with jargon softened at render time. */
export function ReaderText({ children, ...props }: ReaderTextProps) {
  const { locale } = useLocale();
  return <Text {...props}>{clarifyReaderText(children, locale)}</Text>;
}
