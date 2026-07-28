"use client";

import React, { useState, type CSSProperties, type ReactNode } from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Tone = "success" | "warning" | "danger" | "info" | "neutral" | "primary";

const TONE_COLORS: Record<Tone, string> = {
  success: "#16a34a",
  warning: "#d97706",
  danger: "#dc2626",
  info: "#0284c7",
  neutral: "#64748b",
  primary: "#2563eb",
};

const CHART_COLORS = ["#2563eb", "#16a34a", "#d97706", "#dc2626", "#7c3aed", "#0891b2"];

function toneBg(tone: Tone): string {
  const map: Record<Tone, string> = {
    success: "#dcfce7",
    warning: "#fef3c7",
    danger: "#fee2e2",
    info: "#e0f2fe",
    neutral: "#f1f5f9",
    primary: "#dbeafe",
  };
  return map[tone];
}

function toneText(tone: Tone): string {
  return TONE_COLORS[tone];
}

type StackProps = {
  gap?: number;
  style?: CSSProperties;
  children?: ReactNode;
};

export function Stack({ gap = 8, style, children }: StackProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap, ...style }}>{children}</div>
  );
}

type RowProps = {
  gap?: number;
  wrap?: boolean;
  align?: "center" | "start" | "end" | "stretch";
  style?: CSSProperties;
  children?: ReactNode;
};

export function Row({ gap = 8, wrap, align = "start", style, children }: RowProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: wrap ? "wrap" : "nowrap",
        alignItems: align,
        gap,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

type GridProps = {
  columns: number;
  gap?: number;
  style?: CSSProperties;
  children?: ReactNode;
};

export function Grid({ columns, gap = 12, style, children }: GridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

type TextProps = {
  size?: "small" | "medium" | "large";
  tone?: "primary" | "secondary" | "tertiary";
  weight?: "normal" | "semibold" | "bold";
  style?: CSSProperties;
  children?: ReactNode;
};

export function Text({
  size = "medium",
  tone = "primary",
  weight = "normal",
  style,
  children,
}: TextProps) {
  const fontSize = size === "small" ? 13 : size === "large" ? 18 : 15;
  const color =
    tone === "secondary"
      ? "var(--text-secondary)"
      : tone === "tertiary"
        ? "var(--text-tertiary)"
        : "var(--text)";
  return (
    <span
      style={{
        fontSize,
        color,
        fontWeight: weight === "semibold" ? 600 : weight === "bold" ? 700 : 400,
        lineHeight: 1.5,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

const headingStyle = (level: 1 | 2 | 3): CSSProperties => ({
  margin: 0,
  fontWeight: 700,
  color: "var(--text)",
  fontSize: level === 1 ? 28 : level === 2 ? 22 : 18,
  lineHeight: 1.25,
});

export function H1({ children, style }: { children?: ReactNode; style?: CSSProperties }) {
  return <h1 style={{ ...headingStyle(1), ...style }}>{children}</h1>;
}

export function H2({ children, style }: { children?: ReactNode; style?: CSSProperties }) {
  return <h2 style={{ ...headingStyle(2), ...style }}>{children}</h2>;
}

export function H3({ children, style }: { children?: ReactNode; style?: CSSProperties }) {
  return <h3 style={{ ...headingStyle(3), ...style }}>{children}</h3>;
}

export function Card({ children, style }: { children?: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  trailing,
}: {
  children?: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "14px 16px",
        borderBottom: "1px solid var(--border)",
        fontWeight: 600,
        fontSize: 15,
      }}
    >
      <span>{children}</span>
      {trailing != null && (
        <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>
          {trailing}
        </span>
      )}
    </div>
  );
}

export function CardBody({ children, style }: { children?: ReactNode; style?: CSSProperties }) {
  return <div style={{ padding: 16, ...style }}>{children}</div>;
}

export function Pill({
  tone = "neutral",
  size = "md",
  children,
}: {
  tone?: Tone;
  size?: "sm" | "md";
  children?: ReactNode;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: size === "sm" ? "2px 8px" : "4px 10px",
        borderRadius: 999,
        fontSize: size === "sm" ? 11 : 12,
        fontWeight: 600,
        background: toneBg(tone),
        color: toneText(tone),
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

export function Callout({
  tone = "neutral",
  title,
  children,
}: {
  tone?: Tone;
  title?: string;
  children?: ReactNode;
}) {
  return (
    <div
      style={{
        border: `1px solid ${toneText(tone)}33`,
        borderLeft: `4px solid ${toneText(tone)}`,
        borderRadius: 8,
        padding: "12px 14px",
        background: toneBg(tone),
      }}
    >
      {title && (
        <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{title}</div>
      )}
      <div style={{ fontSize: 14, lineHeight: 1.55, color: "var(--text)" }}>{children}</div>
    </div>
  );
}

export function Button({
  variant = "secondary",
  onClick,
  children,
}: {
  variant?: "primary" | "secondary";
  onClick?: () => void;
  children?: ReactNode;
}) {
  const isPrimary = variant === "primary";
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: 8,
        border: isPrimary ? "none" : "1px solid var(--border)",
        background: isPrimary ? "var(--accent)" : "var(--bg-elevated)",
        color: isPrimary ? "#fff" : "var(--text)",
        fontWeight: 500,
        fontSize: 14,
        cursor: "pointer",
        transition: "background 0.15s",
      }}
    >
      {children}
    </button>
  );
}

export function Select<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      style={{
        padding: "6px 10px",
        borderRadius: 8,
        border: "1px solid var(--border)",
        background: "var(--bg-elevated)",
        fontSize: 14,
        color: "var(--text)",
        minWidth: 160,
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: Tone;
}) {
  return (
    <div
      style={{
        padding: "12px 14px",
        borderRadius: 10,
        border: "1px solid var(--border)",
        background: "var(--bg-elevated)",
      }}
    >
      <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4 }}>{label}</div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: tone ? toneText(tone) : "var(--text)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export function CollapsibleSection({
  title,
  count,
  trailing,
  defaultOpen,
  children,
}: {
  title: string;
  count?: number;
  trailing?: ReactNode;
  defaultOpen?: boolean;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 10,
        background: "var(--bg-elevated)",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "12px 16px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          textAlign: "left",
          fontWeight: 600,
          fontSize: 15,
          color: "var(--text)",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{open ? "▼" : "▶"}</span>
          {title}
          {count != null && <Pill tone="neutral" size="sm">{count}</Pill>}
        </span>
        {trailing != null && (
          <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>
            {trailing}
          </span>
        )}
      </button>
      {open && <div style={{ padding: "0 16px 16px" }}>{children}</div>}
    </div>
  );
}

export function Table({
  headers,
  rows,
  columnAlign,
  striped,
  rowTone,
}: {
  headers: string[];
  rows: ReactNode[][];
  columnAlign?: string[];
  striped?: boolean;
  rowTone?: (Tone | undefined)[];
}) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  textAlign: (columnAlign?.[i] as CSSProperties["textAlign"]) ?? "left",
                  padding: "10px 12px",
                  borderBottom: "2px solid var(--border)",
                  color: "var(--text-secondary)",
                  fontWeight: 600,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            const tone = rowTone?.[ri];
            const rowStyle: CSSProperties = {
              ...(striped && ri % 2 === 1 ? { background: "#f8fafc" } : {}),
              ...(tone === "danger"
                ? { background: "#fef2f2" }
                : tone === "success"
                  ? { background: "#f0fdf4" }
                  : {}),
            };
            return (
            <tr key={ri} style={Object.keys(rowStyle).length ? rowStyle : undefined}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    textAlign: (columnAlign?.[ci] as CSSProperties["textAlign"]) ?? "left",
                    padding: "10px 12px",
                    borderBottom: "1px solid var(--border)",
                    verticalAlign: "top",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

type ChartSeries = {
  name: string;
  data: number[];
  tone?: Tone;
};

type ReferenceLineDef = {
  value: number;
  label: string;
  tone?: Tone;
};

export function LineChart({
  categories,
  series,
  height = 220,
  valueSuffix = "",
  beginAtZero = true,
  yMin,
  yMax,
  referenceLines,
}: {
  categories: string[];
  series: ChartSeries[];
  height?: number;
  valueSuffix?: string;
  beginAtZero?: boolean;
  yMin?: number;
  yMax?: number;
  referenceLines?: ReferenceLineDef[];
}) {
  const data = categories.map((cat, i) => {
    const point: Record<string, string | number> = { name: cat };
    series.forEach((s) => {
      point[s.name] = s.data[i] ?? 0;
    });
    return point;
  });

  const domain: [number | "auto", number | "auto"] = [
    yMin ?? (beginAtZero ? 0 : "auto"),
    yMax ?? "auto",
  ];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
        <YAxis domain={domain} tick={{ fontSize: 12 }} stroke="#94a3b8" />
        <Tooltip
          formatter={(value: number) => [`${value}${valueSuffix}`, ""]}
          contentStyle={{ borderRadius: 8, border: "1px solid var(--border)" }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {referenceLines?.map((rl) => (
          <ReferenceLine
            key={rl.label}
            y={rl.value}
            stroke={toneText(rl.tone ?? "warning")}
            strokeDasharray="4 4"
            label={{ value: rl.label, fontSize: 11, fill: toneText(rl.tone ?? "warning") }}
          />
        ))}
        {series.map((s, i) => (
          <Line
            key={s.name}
            type="monotone"
            dataKey={s.name}
            stroke={s.tone ? toneText(s.tone) : CHART_COLORS[i % CHART_COLORS.length]}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

export function BarChart({
  categories,
  series,
  height = 240,
  stacked = false,
}: {
  categories: string[];
  series: ChartSeries[];
  height?: number;
  stacked?: boolean;
}) {
  const data = categories.map((cat, i) => {
    const point: Record<string, string | number> = { name: cat };
    series.forEach((s) => {
      point[s.name] = s.data[i] ?? 0;
    });
    return point;
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
        <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)" }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {series.map((s, i) => (
          <Bar
            key={s.name}
            dataKey={s.name}
            fill={s.tone ? toneText(s.tone) : CHART_COLORS[i % CHART_COLORS.length]}
            stackId={stacked ? "stack" : undefined}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
