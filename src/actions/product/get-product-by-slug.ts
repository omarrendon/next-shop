"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const slugItem = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },
      where: {
        slug: slug,
      },
    });

    if (!slug) return null;

    return {
      ...slugItem,
      images: slugItem?.ProductImage.map(image => image.url),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Slug not founded");
  }
};
