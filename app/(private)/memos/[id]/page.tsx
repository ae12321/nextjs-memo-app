import EditMemoForm from "@/components/memo/EditMemoForm";
import { getMemoAction } from "@/lib/actions";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default async function MemoDetailPage({ params }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["memo", params.id],
    queryFn: () => getMemoAction(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditMemoForm id={params.id} />
    </HydrationBoundary>
  );
}
