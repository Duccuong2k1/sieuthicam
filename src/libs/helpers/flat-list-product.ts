export const flatListProduct = (productsData: any[]) => {
  const allProducts = [];
  const seenIds = {} as any;

  for (const category of productsData) {
    for (const product of category.listProduct) {
      if (!seenIds[product.id]) {
        allProducts.push(product);
        seenIds[product.id] = true;
      }
    }
  }

  return allProducts;
};
