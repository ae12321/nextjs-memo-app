"use client";

import { getStatusStatisticAction } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import StatsCard from "./statsCard";

export default function StatisticArea() {
  const query = useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatusStatisticAction(),
  });

  return (
    <div className="bg-muted p-4 grid grid-cols-[1fr,1fr,1fr] ">
      <StatsCard title="草案" value={query.data?.draft || 0} />
      <StatsCard title="公開" value={query.data?.published || 0} />
      <StatsCard title="削除" value={query.data?.deleted || 0} />
    </div>
  );
}
