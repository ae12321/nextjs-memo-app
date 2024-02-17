import MemoList from "@/components/list/MemoList";
import SearchForm from "@/components/list/SearchForm";
import { getMemosAction } from "@/lib/actions";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import React from "react";

export default async function ListMemoPage() {
  const queryClient = new QueryClient({});

  await queryClient.prefetchQuery({
    queryKey: ["memos"],
    queryFn: () => getMemosAction({}),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchForm />
      <MemoList />
    </HydrationBoundary>
  );
}
