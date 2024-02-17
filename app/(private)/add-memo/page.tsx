import NewMemoForm from "@/components/form/NewMemoForm";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import React from "react";

export default function AddMemoPage() {
  const queryClient = new QueryClient();
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/*  */}
        <NewMemoForm />
      </HydrationBoundary>
    </div>
  );
}
