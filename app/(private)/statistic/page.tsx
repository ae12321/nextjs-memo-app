import ChartArea from "@/components/statistic/ChartArea";
import StatisticArea from "@/components/statistic/StatisticArea";
import { getChartDataAction, getStatusStatisticAction } from "@/lib/actions";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import React from "react";

export default async function StatisticPage() {
  const queryClient = new QueryClient();

  // prefetch
  await queryClient.prefetchQuery({
    queryKey: ["stats"],
    queryFn: () => getStatusStatisticAction(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["charts"],
    queryFn: () => getChartDataAction(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatisticArea />
      <ChartArea />
    </HydrationBoundary>
  );
}
