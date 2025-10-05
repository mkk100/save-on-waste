"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <header className="w-full bg-emerald-600 text-white fixed top-0 left-0 z-20 h-16 grid grid-cols-3 items-center px-6">
      <button
        aria-label="Save on Waste Home"
        className="justify-self-start text-lg font-semibold px-3 py-1 rounded transition-transform duration-150 ease-out hover:scale-105 hover:shadow-md hover:bg-white/10"
        onClick={() => {
          router.push("/table");
        }}
      >
        Save on Waste
      </button>
      <button
        aria-label="View Map"
        className="text-lg justify-self-center px-2 py-1 rounded transition-transform duration-150 ease-out hover:scale-105 hover:shadow-md hover:bg-white/10"
        onClick={() => router.push("/map")}
      >
        Map
      </button>
      <img
        src="/favicon.ico"
        alt="Account Logo"
        className="w-12 h-12 rounded-md object-cover justify-self-end"
      />
    </header>
  );
}
