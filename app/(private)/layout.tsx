import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid lg:grid-cols-5 border border-red-500 min-h-screen">
      {/* sidebar */}
      <div className="hidden lg:block lg:col-span-1 border border-blue-500">
        <Sidebar />
      </div>
      {/* content */}
      <div className="lg:col-span-4 border border-green-500 ">
        <Navbar />
        <div className="px-4 py-4">{children}</div>
      </div>
    </main>
  );
}
