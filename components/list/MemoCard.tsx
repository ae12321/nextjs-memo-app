import { MemoType } from "@/lib/types";
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import Info from "./Info";
import { Briefcase, ClipboardPlus, FileSliders, Tag } from "lucide-react";

export default function MemoCard({ memo }: { memo: MemoType }) {
  const createdAt = new Date(memo.createdAt).toLocaleDateString();
  const updatedAt = new Date(memo.updatedAt).toLocaleDateString();

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{memo.title}</CardTitle>
        <CardDescription>{memo.description}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="m-4 grid grid-cols-2 gap-4">
        <Info icon={<ClipboardPlus />} text={createdAt} />
        <Info icon={<FileSliders />} text={updatedAt} />
        <Badge>
          <Tag />
          {memo.status}
        </Badge>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/memos/${memo.id}`}>edit</Link>
        </Button>
        <DeleteButton id={memo.id} />
      </CardFooter>
    </Card>
  );
}
