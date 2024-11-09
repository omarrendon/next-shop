import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  // delete previous registers
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  const { categories, products } = initialData;
  // Categories
  const categoriesData = categories.map(name => ({
    name,
  }));
  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  // Products
  products.forEach(async product => {
    const { type, images, ...rest } = product;

    const dbProdruct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    const imageData = images.map(image => ({
      url: image,
      productId: dbProdruct.id,
    }));

    await prisma.productImage.createMany({
      data: imageData,
    });
  });

  console.log("Seed excecuted succssesfully!");
}

(() => {
  main();
})();
