"use client";

import React, { FormEvent } from "react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { MemoStatus } from "@/lib/types";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchForm() {
  // 初回
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "all";

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
    const search = formdata.get("search") as string;
    const status = formdata.get("status") as string;
    console.log({ search, status });

    let params = new URLSearchParams();
    params.set("search", search);
    params.set("status", status);

    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-muted p-4 grid grid-cols-3 gap-4">
        <Input type="text" placeholder="Search" name="search" className="" defaultValue={search} />
        <div>
          <Select name="status" defaultValue={status}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["all", ...Object.values(MemoStatus)].map((status) => {
                return (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
}
