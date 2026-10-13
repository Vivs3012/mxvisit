"use client";

import { useEffect, useState } from "react";
import { Callout, CollapsibleSection, Row, Stack, Table, Text } from "@/components/ui";
import type { LoginLogEntry } from "@/lib/auth/login-log";

function formatWhen(iso: string): string {
 try {
 return new Intl.DateTimeFormat("pt-BR", {
 dateStyle: "short",
 timeStyle: "medium",
 }).format(new Date(iso));
 } catch {
 return iso;
 }
}

export function AdminLoginPanel() {
 const [isAdmin, setIsAdmin] = useState(false);
 const [logins, setLogins] = useState<LoginLogEntry[]>([]);
 const [storage, setStorage] = useState<{ configured: boolean; connected: boolean }>({
 configured: true,
 connected: true,
 });
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 let cancelled = false;

 async function load() {
 try {
 const meRes = await fetch("/api/auth/me");
 if (!meRes.ok) return;
 const me = (await meRes.json()) as { isAdmin?: boolean };
 if (!me.isAdmin || cancelled) return;

 setIsAdmin(true);

 const logRes = await fetch("/api/admin/login-log");
 if (!logRes.ok) return;
 const data = (await logRes.json()) as {
 logins?: LoginLogEntry[];
 storage?: { configured: boolean; connected: boolean };
 };
 if (cancelled) return;

 setLogins(data.logins ?? []);
 setStorage(
 data.storage ?? {
 configured: false,
 connected: false,
 },
 );
 } finally {
 if (!cancelled) setLoading(false);
 }
 }

 void load();
 return () => {
 cancelled = true;
 };
 }, []);

 if (!isAdmin) return null;

 return (
 <CollapsibleSection title="Admin · últimos logins" defaultOpen>
 <Stack gap={12} style={{ paddingTop: 8 }}>
 {!storage.connected && (
 <Callout
 tone="warning"
 title={storage.configured ? "Redis conectado, mas sem resposta" : "Redis não detectado no deploy"}
 >
 <Text size="small">
 {storage.configured
 ? "As variáveis existem, mas o Redis não respondeu. Verifique a integração Upstash e faça Redeploy."
 : "Conecte Redis (Upstash) em Storage no Vercel, vincule ao projeto e faça Redeploy para carregar KV_REST_API_URL e KV_REST_API_TOKEN."}
 </Text>
 </Callout>
 )}

 {loading ? (
 <Text size="small" tone="tertiary">
 Carregando logins…
 </Text>
 ) : logins.length === 0 ? (
 <Text size="small" tone="secondary">
 Nenhum login registrado ainda.
 </Text>
 ) : (
 <Table
 headers={["E-mail", "Data/hora", "Navegador"]}
 rows={logins.map((entry) => [
 entry.email,
 formatWhen(entry.loggedAt),
 entry.userAgent ? entry.userAgent.slice(0, 48) : "—",
 ])}
 />
 )}

 <Row gap={8}>
 <Text size="small" tone="tertiary">
 Visível apenas para vivian.damasceno@ab-inbev.com · últimos {logins.length} acessos
 </Text>
 </Row>
 </Stack>
 </CollapsibleSection>
 );
}
