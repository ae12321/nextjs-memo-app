"use client";
import { getChartDataAction } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip } from "recharts";
export default function ChartArea() {
  const query = useQuery({
    queryKey: ["charts"],
    queryFn: () => getChartDataAction(),
  });

  console.log({ data: query.data });

  if (query.isPending) return <div>Loading...</div>;

  if (!query.data || query.data.length < 1) return <div>No data</div>;

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={query.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" barSize={100} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
