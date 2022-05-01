export const calculateProductSale = (price, sale) => {
  return (price / 1000 - Math.floor(((price / 1000) * sale) / 100)) * 1000;
};
