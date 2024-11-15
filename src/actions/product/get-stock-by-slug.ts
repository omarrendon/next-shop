"use server";

import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string | undefined) => {
  try {
    const stock = await prisma.product.findFirst({
      where: {
        slug: slug,
      },
    });

    return { inStock: stock?.inStock ?? 0 };
  } catch (error) {
    console.log(error);
    throw new Error("Stock by skug not founded.");
  }
};
