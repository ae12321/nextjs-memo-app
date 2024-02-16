"use client";

import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";
export default function Theme() {
  // うまく動かない。。。
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="icon" asChild>
          <div>
            <SunIcon />
            <MoonIcon />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Button
          variant="link"
          className="w-full"
          //
          onClick={() => setTheme("dark")}
        >
          Dark
        </Button>
        <Button
          variant="link"
          className="w-full"
          //
          onClick={() => setTheme("light")}
        >
          Light
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
