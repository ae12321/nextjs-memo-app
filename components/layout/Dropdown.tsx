import { AlignJustify } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import links from "./links";
import Link from "next/link";

export default function Dropdown() {
  return (
    <div className="lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AlignJustify />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {links.map((link) => (
            <DropdownMenuItem key={link.href}>
              <Link href={link.href} className="flex items-center gap-x-4">
                {link.icon} <span>{link.title}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
