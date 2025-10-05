"use client";

import React from "react";
import Dashboard from "@/components/Dashboard";
import Table from "@/components/table";

export default function TablePage() {
  return (
    <>
      <Dashboard />
      <main className="pt-20 p-6 bg-slate-100 min-h-screen">
        <Table />
      </main>
    </>
  );
}
