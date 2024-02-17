"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MemoStatus, newAndEditMemoSchema, NewAndEditMemoSchema } from "@/lib/types";
import { CustomFormField, CustomFormSelect } from "./FormComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { createMemoAction } from "@/lib/actions";

export default function NewMemoForm() {
  const form = useForm<NewAndEditMemoSchema>({
    resolver: zodResolver(newAndEditMemoSchema),
    defaultValues: {
      title: "",
      description: "",
      status: MemoStatus.DRAFT,
      tag: "",
    },
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (values: NewAndEditMemoSchema) => createMemoAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast({ description: "エラーが発生しました" });
        return;
      }
      toast({ description: "メモを追加しました" });
      // clear cache
      queryClient.invalidateQueries({ queryKey: ["memos"] });
      // queryClient.invalidateQueries({ queryKey: ["statistic"] });
      // queryClient.invalidateQueries({ queryKey: ["charts"] });

      // return data;
      router.push("/memos");
    },
  });

  function onSubmit(values: NewAndEditMemoSchema) {
    console.log(values);
    mutation.mutate(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-4 rounded-lg">
          <h2 className="font-bold mb-4">memoを追加</h2>
          <div>
            <CustomFormField control={form.control} name="title" label="タイトル" />
            <CustomFormField control={form.control} name="description" label="説明" />
            <CustomFormSelect name="status" control={form.control} items={Object.values(MemoStatus)} labelText="状態" />
            <CustomFormField control={form.control} name="tags" label="タグ" />
          </div>
          <div className="w-full">
            <Button type="submit" className="self-end" disabled={mutation.isPending}>
              {mutation.isPending ? "送信中" : "送信"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
