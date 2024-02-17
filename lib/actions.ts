"use server";

import { auth, useAuth } from "@clerk/nextjs";
import prisma from "./db";
import { MemoStatus, MemoType, NewAndEditMemoSchema, newAndEditMemoSchema } from "./types";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

function authenticate() {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  return userId;
}

export async function createMemoAction(values: NewAndEditMemoSchema): Promise<MemoType | null> {
  const userId = authenticate();

  try {
    newAndEditMemoSchema.parse(values);
    const memo = await prisma.memo.create({
      data: {
        ...values,
        userId,
      },
    });
    return memo;
  } catch (error) {
    console.error(error);
    return null;
  }
}

type GetMemosBody = {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
};
type GetMemosResponse = {
  memos: MemoType[];
  count: number;
  page: number;
  totalPages: number;
};

// get all memos
export async function getMemosAction({ search, status, page = 1, limit = 5 }: GetMemosBody): Promise<GetMemosResponse> {
  const userId = authenticate();

  try {
    // フィルタ条件初期値
    let whereClause: Prisma.MemoWhereInput = {
      userId,
    };
    // 検索ワードでフィルタ
    if (search) {
      whereClause = {
        ...whereClause,
        OR: [{ title: { contains: search } }, { description: { contains: search } }],
      };
    }
    // ステータスでフィルタ
    if (status && status !== "all") {
      whereClause = {
        ...whereClause,
        status,
      };
    }

    const skip = (page - 1) * limit;

    // フィルタ条件でメモを取得
    const memos: MemoType[] = await prisma.memo.findMany({
      where: whereClause,
      take: limit,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    });

    const count: number = await prisma.memo.count({
      where: whereClause,
    });
    const totalPages = Math.ceil(count / limit);

    return { memos, count, page, totalPages };
  } catch (error) {
    return { memos: [], count: 0, page: 1, totalPages: 1 };
  }
}

// delete memo action
export async function deleteMemoAction(id: string): Promise<MemoType | null> {
  const userId = authenticate();

  try {
    const memo: MemoType = await prisma.memo.delete({
      where: {
        id,
        userId,
      },
    });
    return memo;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getMemoAction(id: string): Promise<MemoType | null> {
  const userId = authenticate();

  try {
    const memo: MemoType | null = await prisma.memo.findUnique({
      where: { id, userId },
    });
    if (!memo) return null;
    return memo;
  } catch (error) {
    console.error(error);
    redirect("/memos");
  }
}
export async function updateMemoAction(id: string, values: NewAndEditMemoSchema) {
  const userId = authenticate();

  try {
    newAndEditMemoSchema.parse(values);
    const memo = await prisma.memo.update({
      where: { id, userId },
      data: { ...values },
    });
    return memo;
  } catch (error) {
    console.error(error);
    return null;
  }
}

type GetStatusStatisticResponse = {
  [key in MemoStatus]: number;
};
export async function getStatusStatisticAction() {
  const userId = authenticate();
  try {
    const resullt = await prisma.memo.groupBy({
      where: {
        userId,
      },
      by: ["status"],
      _count: {
        status: true,
      },
    });

    // console.log(resullt);
    // ↓
    // [
    //   { _count: { status: 39 }, status: "deleted" },
    //   { _count: { status: 33 }, status: "draft" },
    //   { _count: { status: 29 }, status: "published" },
    // ];
    const defaultData: GetStatusStatisticResponse = {
      draft: 0,
      published: 0,
      deleted: 0,
    };
    const obj = resullt.reduce((acc, cur) => {
      const key = cur.status as keyof GetStatusStatisticResponse;
      acc[key] = cur._count.status;
      return acc;
    }, defaultData);

    return obj;
  } catch (error) {
    console.error(error);
    redirect("/memos");
  }
}

import dayjs from "dayjs";

type GetChartDataAction = Array<{ date: string; count: number }>;
export async function getChartDataAction() {
  const userId = authenticate();
  const oneYearAgo = dayjs().subtract(1, "year").toDate();

  try {
    const memos = await prisma.memo.findMany({
      where: {
        userId,
        createdAt: { gte: oneYearAgo },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const slicedPerMonth = memos.reduce((acc, current) => {
      const date = dayjs(current.createdAt).format("YYYY-MM");
      const existed = acc.find((obj) => obj.date === date);
      if (existed) {
        existed.count++;
      } else {
        acc.push({ date, count: 1 });
      }

      return acc;
    }, [] as GetChartDataAction);
    //
    console.log({ slicedPerMonth });
    return slicedPerMonth;
  } catch (error) {
    //
  }
}
