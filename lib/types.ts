import * as z from "zod";

export type MemoType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;

  title: string;
  description: string;
  status: string;
  tag: string;
};

export enum MemoStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  DELETED = "deleted",
}

export const newAndEditMemoSchema = z.object({
  title: z.string().min(1, { message: "一文字以上！！！" }),
  description: z.string().min(1, { message: "一文字以上！！！" }),
  status: z.nativeEnum(MemoStatus),
  tag: z.string(),
});
export type NewAndEditMemoSchema = z.infer<typeof newAndEditMemoSchema>;
