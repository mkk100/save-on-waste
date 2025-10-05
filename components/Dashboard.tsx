import React from "react";

export default function Dashboard() {
  return (
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
  );
}
