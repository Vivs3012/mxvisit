"use client";

import { Suspense } from "react";
import Dashboard from "@/lib/dashboard";

export default function Home() {
  return (
    <main>
      <Suspense fallback={null}>
        <Dashboard />
      </Suspense>
    </main>
  );
}
