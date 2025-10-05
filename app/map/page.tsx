"use client";

import dynamic from "next/dynamic";
import Dashboard from "@/components/Dashboard";

const LazyMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default function MapPage() {
  return (
    <>
      <Dashboard />

      <main className="min-h-screen pt-16 p-0 bg-slate-200">
        <LazyMap />
      </main>
    </>
  );
}
