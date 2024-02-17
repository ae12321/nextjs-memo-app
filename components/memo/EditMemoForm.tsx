"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { MemoStatus, NewAndEditMemoSchema, newAndEditMemoSchema } from "@/lib/types";
import { getMemoAction, updateMemoAction } from "@/lib/actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { CustomFormField, CustomFormSelect } from "../form/FormComponent";
import { Button } from "../ui/button";

export default function EditMemoForm({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  // get the one memo
  const { data, isPending } = useQuery({
    queryKey: ["memo", id],
    queryFn: () => getMemoAction(id),
  });

  // update memo
  const mutation = useMutation({
    mutationFn: (value: NewAndEditMemoSchema) => updateMemoAction(id, value),
    onSuccess: (data) => {
      //
      if (!data) {
        toast({ description: "更新に失敗しました" });
        return;
      }
      toast({ description: "更新しました" });
      // clear cache
      queryClient.invalidateQueries({ queryKey: ["memo", id] });
      queryClient.invalidateQueries({ queryKey: ["memos"] });
      queryClient.invalidateQueries({ queryKey: ["statistics"] });

      router.push("/memos");
    },
  });

  const form = useForm<NewAndEditMemoSchema>({
    resolver: zodResolver(newAndEditMemoSchema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      status: (data?.status as MemoStatus) || MemoStatus.DRAFT,
      tag: data?.tag || "",
    },
  });

  const onSubmit = () => {
    //
    mutation.mutate(form.getValues());
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h2>メモを更新する</h2>
          <div>
            <CustomFormField name="title" label="タイトル" control={form.control} />
            <CustomFormField name="description" label="説明" control={form.control} />
            <CustomFormField name="tag" label="タグ" control={form.control} />
            <CustomFormSelect name="status" items={Object.values(MemoStatus)} control={form.control} labelText="状態" />
          </div>
          {/*  */}
          {/*  */}
          <div>
            <Button type="submit">更新</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
