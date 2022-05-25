import { IMAGE_IS_NOT_AVAILABLE_URL } from "../constants";

export const calculateProductSale = (price, sale) => {
  return (price / 1000 - Math.floor(((price / 1000) * sale) / 100)) * 1000;
};

export const getThumbnailProduct = (product) => {
  try {
    if (product && product.colors && product.colors.length > 0) {
      if (product.colors[0].images && product.colors[0].images.length > 0) {
        return product.colors[0].images[0].url;
      }
    }
  } catch (error) {}
  return IMAGE_IS_NOT_AVAILABLE_URL;
};
export const getThumbnailCartItem = (item) => {
  try {
    const image = item.detail.product.images.find(
      (el) => el.color_id === item.detail.color.id
    );
    if (image) {
      return image.url;
    }
  } catch (error) {}
  return IMAGE_IS_NOT_AVAILABLE_URL;
};
export const formatThousandDigits = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
export const formatTimeVN = (time) => {
  return (
    new Date(time).toLocaleDateString("vi-VN") +
    " " +
    new Date(time).toLocaleTimeString("vi-VN")
  );
};
export const ignoreTimezone = (date) => {
  let tzoffset = new Date().getTimezoneOffset() * 60000;
  let localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
  return localISOTime;
};

export const fromNow = (date) => {
  const created = new Date(date).getTime();
  let periods = {
    năm: 12 * 30 * 24 * 60 * 60 * 1000,
    tháng: 30 * 24 * 60 * 60 * 1000,
    tuần: 7 * 24 * 60 * 60 * 1000,
    ngày: 24 * 60 * 60 * 1000,
    giờ: 60 * 60 * 1000,
    phút: 60 * 1000,
    giây: 1000,
  };
  let diff = Date.now() - created;

  for (const key in periods) {
    if (diff >= periods[key]) {
      let result = Math.floor(diff / periods[key]);
      return `${result} ${key} trước`;
    }
  }

  return "Vài giây trước";
};

export const getTotalPage = (cart) => {
  let result = 0;
  if (cart) {
    cart.items.forEach((item) => {
      if (
        item.detail.product.discounts &&
        item.detail.product.discounts.length > 0
      ) {
        result += item.quantity * item.detail.product.discounts[0].new_price;
      } else {
        result += item.quantity * item.detail.product.price;
      }
    });
  }
  return result;
};

export const getTotalDaysOfMonth = () => {
  let dt = new Date();
  let month = dt.getMonth();
  let year = dt.getFullYear();
  return new Date(year, month, 0).getDate();
};
