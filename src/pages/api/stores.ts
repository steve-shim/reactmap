// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { StoreType, StoreApiResponse } from "@/interface";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[] | StoreType>
) {
  const { page = "" }: { page?: string } = req.query;
  const prisma = new PrismaClient();

  if (page) {
    const count = await prisma.store.count();
    const skipPage = parseInt(page) - 1;
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      take: 10,
      skip: skipPage * 10,
    });

    // const stores = (await import("../../data/store_data.json"))[
    //   "DATA"
    // ] as StoreType[];

    // totalpage, data, page
    res.status(200).json({
      page: parseInt(page),
      data: stores,
      totalCount: count,
      totalPage: Math.ceil(count / 10),
    });
  } else {
    const { id }: { id?: string } = req.query;

    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      where: {
        id: id ? parseInt(id) : {},
      },
    });

    // id값이 있는 상세 페이지에서 요청이 오면 데이터를 하나만 보내주고
    // 그게 아니라면 배열 데이터를 보내준다
    return res.status(200).json(id ? stores[0] : stores);
  }
}
