"use client";

import React from "react";
import links from "./links";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logoImage from "@/app/assets/logo.png";

export default function Sidebar() {
  // const pathname = window.location.pathname;
  const pathname = usePathname();

  return (
    <aside className="p-4 bg-slate-300 h-full">
      <div className="w-full p-4">
        <div className="flex items-center gap-4">
          <Image src={logoImage} alt="logo" className="w-8 h-8" />
          <h1 className=" font-bold">Memo App</h1>
        </div>
      </div>
      <div className="flex flex-col gap-y-8 mt-16">
        {links.map((link) => (
          <Button
            key={link.href}
            asChild
            variant={pathname === link.href ? "default" : "link"}
            className="block w-full"
          >
            <Link href={link.href} className="flex items-center gap-x-4">
              {link.icon} <span>{link.title}</span>
            </Link>
          </Button>
        ))}
      </div>
    </aside>
  );
}
