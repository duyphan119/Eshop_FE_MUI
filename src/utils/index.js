import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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
  try {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } catch (error) {
    return 0;
  }
};
export const formatDateVN = (input) => {
  const dt = new Date(input.toString());
  let date = dt.getDate();
  let month = dt.getMonth() + 1;
  return `${date < 10 ? "0" + date : date}/${
    month < 10 ? "0" + month : month
  }/${dt.getFullYear()}`;
};
export const formatTimeVN = (input) => {
  const dt = new Date(input.toString());

  let hour = dt.getHours();
  let minute = dt.getMinutes();
  let second = dt.getSeconds();

  return `${hour < 10 ? "0" + hour : hour}:${
    minute < 10 ? "0" + minute : minute
  }:${second < 10 ? "0" + second : second}`;
};
export const formatDateTimeVN = (input) => {
  return `${formatDateVN(input)} ${formatTimeVN(input)}`;
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

export const getTotalPrice = (cart) => {
  let result = 0;
  if (cart) {
    cart.items.forEach((item) => {
      if (
        item.detail.product.category.discounts &&
        item.detail.product.category.discounts.length > 0
      ) {
        result +=
          item.quantity *
          getNewPrice(
            item.detail.product.price,
            item.detail.product.category.discounts[0].percent
          );
      } else if (
        item.detail.product.discounts &&
        item.detail.product.discounts.length > 0
      ) {
        result +=
          item.quantity *
          item.detail.product.discounts[
            item.detail.product.discounts.length - 1
          ].new_price;
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

export const calHeightDataGrid = (rowCount) => {
  const rowHeight = 41;
  const rowHeaderHeight = 48;
  const borderCount = rowCount + 3;
  return rowCount * rowHeight + rowHeaderHeight + borderCount;
};
export const getSku = (category_code, product_id, color_code, size_code) => {
  return `${category_code}${`000${product_id}`.slice(-4)}-${color_code}${
    size_code === "0" ? "" : `-${size_code}`
  }`;
};
export const getFinalPrice = (totalPrice, coupon) => {
  let divide1000 = totalPrice / 1000;
  if (!coupon) return 0;
  return (divide1000 - Math.floor((divide1000 * coupon.percent) / 100)) * 1000;
};
export const exportComponentToPDF = (id) => {
  const input = document.getElementById(id);

  input.style.transform = `scale(${896 / input.getBoundingClientRect().width})`;
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("img/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
    });

    pdf.addImage(imgData, "PNG", 1, 1);
    pdf.save("File.pdf");
  });
  input.style.transform = `scale(1)`;
};

export const getNewPrice = (price, percent) => {
  let result;

  let divide1000 = price / 1000;

  result = Math.floor(divide1000 - (divide1000 * percent) / 100) * 1000;

  return result;
};
export const validateTelephone = (telephone) => {
  try {
    if (/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(telephone)) {
      return true;
    }
  } catch (error) {}
  return false;
};
export const formatHeightGuide = (min, max) => {
  let minFirst = Math.floor(min / 100);
  let maxFirst = Math.floor(max / 100);
  let minLast = min % 100;
  let maxLast = max % 100;

  if (min === 0) {
    return `Dưới ${maxFirst}m${maxLast}`;
  } else if (max === 0) {
    return `Trên ${minFirst}m${minLast}`;
  } else {
    return `${minFirst}m${minLast} - ${maxFirst}m${maxLast}`;
  }
};
export const formatWeightGuide = (min, max) => {
  if (min === 0) {
    return `Dưới ${max}kg`;
  } else if (max === 0) {
    return `Trên ${min}kg`;
  } else {
    return `${min}kg - ${max}kg`;
  }
};
