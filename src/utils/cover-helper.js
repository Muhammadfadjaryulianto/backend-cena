const formatProductCover = (product, baseUrl) => {
  if (!product) return product;

  const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");

  const formatSingleProduct = (item) => {
    if (!item?.cover) return item;

    return {
      ...item,
      cover: `${normalizedBaseUrl}/api/cover/${item.cover}`,
    };
  };

  if (Array.isArray(product)) {
    return product.map(formatSingleProduct);
  }

  return formatSingleProduct(product);
};

export { formatProductCover };
