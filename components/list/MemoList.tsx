"use client";

import { getMemosAction } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import Loading from "../layout/Loading";
import MemoCard from "./MemoCard";
import Pagenation from "./Pagenation";

export default function MemoList() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "all";
  const pageNumber = Number(searchParams.get("page") || 1);

  const query = useQuery({
    queryKey: ["memos", search, status, pageNumber],
    queryFn: () => getMemosAction({ search, status, page: pageNumber }),
  });
  const memos = query.data?.memos || [];

  console.log({ memos });

  if (query.isLoading) {
    return <Loading />;
  }
  if (memos.length < 1) {
    return <p>メモが存在しません</p>;
  }

  //
  const count = query.data?.count || 0;
  const totalPages = query.data?.totalPages || 0;
  const page = query.data?.page || 0;

  return (
    <div>
      <div>
        <h2>計 {count} 件</h2>
        {
          <div>
            {page} - {totalPages} - {count}
            <Pagenation currentPage={page} totalPages={totalPages} />
          </div>
        }
      </div>
      {memos.map((memo) => (
        <div key={memo.id}>
          <MemoCard memo={memo} />
        </div>
      ))}
    </div>
  );
}
