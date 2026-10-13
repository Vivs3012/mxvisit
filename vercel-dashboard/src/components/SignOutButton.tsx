"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignOutButton() {
 const router = useRouter();
 const [loading, setLoading] = useState(false);

 async function handleSignOut() {
 setLoading(true);
 sessionStorage.removeItem("oneyp-stakeholder-selected");
 sessionStorage.removeItem("oneyp-stakeholder-focus");
 try {
 await fetch("/api/auth/logout", { method: "POST" });
 router.replace("/login");
 router.refresh();
 } finally {
 setLoading(false);
 }
 }

 return (
 <button
 type="button"
 onClick={handleSignOut}
 disabled={loading}
 style={{
 padding: "8px 12px",
 borderRadius: 8,
 border: "1px solid var(--border)",
 background: "var(--bg-elevated)",
 color: "var(--text-secondary)",
 fontSize: 13,
 cursor: loading ? "not-allowed" : "pointer",
 whiteSpace: "nowrap",
 }}
 >
 {loading ? "Signing out..." : "Sign out"}
 </button>
 );
}
