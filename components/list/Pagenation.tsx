"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function Pagenation(props: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathnaem = usePathname();

  const pageButtons = Array.from({ length: props.totalPages }, (_, i) => i + 1);

  const handleClick = (pageNumber: number) => {
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";
    const page = String(pageNumber);

    console.log(pathnaem);
    const params = new URLSearchParams({ search, status, page });
    router.push(`${window.location.origin}/${pathnaem}?${params.toString()}`);
  };

  const pagenationButton = ({ pageNumber, isActive = false }: { pageNumber: number; isActive: boolean }) => {
    return (
      <Button
        key={pageNumber}
        onClick={() => handleClick(pageNumber)}
        size={"icon"}
        variant={isActive ? "default" : "outline"}
      >
        {pageNumber}
      </Button>
    );
  };

  const pagenationButtons = () => {
    const span = 4;
    //

    const result: React.ReactNode[] = [];

    // 1
    result.push(
      pagenationButton({
        pageNumber: 1,
        isActive: props.currentPage === 1,
      })
    );

    // ...   1,2    1,2,3    1,...,4
    if (props.currentPage > span) {
      result.push(
        <Button key={"dot-before"} size={"icon"} variant={"outline"}>
          ...
        </Button>
      );
    }

    // current
    if (props.currentPage !== 1 && props.currentPage !== props.totalPages) {
      result.push(
        pagenationButton({
          pageNumber: props.currentPage,
          isActive: true,
        })
      );
    }

    // ...  max : 10      9,10   8,9,10     7,...,10
    if (props.totalPages - props.currentPage > span) {
      result.push(
        <Button key={"dot-before"} size={"icon"} variant={"outline"}>
          ...
        </Button>
      );
    }
    // last
    result.push(
      pagenationButton({
        pageNumber: props.totalPages,
        isActive: props.currentPage === props.totalPages,
      })
    );

    return result;
  };

  return (
    <div>
      {/*  */}
      <Button
        variant={"outline"}
        className={`${props.currentPage === 1 ? "hidden" : ""}`}
        onClick={() => handleClick(props.currentPage - 1)}
      >
        一つ前
      </Button>

      {pagenationButtons()}

      {/*  */}
      <Button
        variant={"outline"}
        className={`${props.currentPage === props.totalPages ? "hidden" : ""}`}
        onClick={() => handleClick(props.currentPage + 1)}
      >
        一つ後
      </Button>
    </div>
  );
}
