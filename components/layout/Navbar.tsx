import React from "react";
import Dropdown from "./Dropdown";
import Theme from "./Theme";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="bg-slate-300 p-4 flex items-center justify-between">
      <div>
        <Dropdown />
      </div>
      <div className="flex items-center gap-4">
        <Theme />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
