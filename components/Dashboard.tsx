"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@emotion/react";

import { useEffect, useState } from "react";
import { isCharityUser } from "@/app/AccountProvider";

export default function Dashboard() {
  const router = useRouter();
  const [isCharity, setIsCharity] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkCharity = async () => {
      console.log("Checking charity status..."); // Add this to verify execution
      try {
        const result = await isCharityUser();
        console.log("Charity result:", result); // Add this too
        setIsCharity(result);
      } catch (error) {
        console.error("Error checking charity status:", error);
        setIsCharity(false);
      } finally {
        setLoading(false);
      }
    };

    checkCharity();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <ThemeContext.Provider value={{ charity: isCharity }}>
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
        {isCharity && (
          <button
            aria-label="View Map"
            className="text-lg justify-self-center px-2 py-1 rounded transition-transform duration-150 ease-out hover:scale-105 hover:shadow-md hover:bg-white/10"
            onClick={() => router.push("/map")}
          >
            Map
          </button>
        )}
        <img
          src="/favicon.ico"
          alt="Account Logo"
          className="w-12 h-12 rounded-md object-cover justify-self-end"
        />
      </header>
    </ThemeContext.Provider>
  );
}
