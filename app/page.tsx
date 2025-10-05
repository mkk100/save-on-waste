"use client";

import dynamic from "next/dynamic";
import Dashboard from "@/components/Dashboard";
import { ThemeContext } from "@emotion/react";
import { isCharityUser } from "./AccountProvider";
import { useEffect, useState } from "react";

const LazyMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
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
      <Dashboard />
      <main className="min-h-screen pt-16 p-6 bg-slate-200">
        <LazyMap />
      </main>
    </ThemeContext.Provider>
  );
}
