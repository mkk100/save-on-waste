"use client";

import dynamic from "next/dynamic";

const LazyMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return (
    <>
      <header className="w-full bg-emerald-600 text-white fixed top-0 left-0 z-20 h-16 grid grid-cols-3 items-center px-6">
        <h1 className="text-lg font-semibold justify-self-start">
          Save on Waste
        </h1>
        <h2 className="text-lg justify-self-center">Map</h2>
        <img
          src="/favicon.ico"
          alt="Account Logo"
          className="w-12 h-12 rounded-md object-cover justify-self-end"
        />
      </header>

      <main className="min-h-screen pt-16 p-6 bg-slate-200">
        <LazyMap />
      </main>
    </>
  );
}
