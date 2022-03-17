export const formatDate = (format, date) => {
  try {
    let result = "";
    let newDate = new Date(date);
    let year = newDate.getFullYear();
    let month =
      newDate.getMonth() + 1 < 10
        ? "0" + (newDate.getMonth() + 1)
        : newDate.getMonth() + 1;
    let day =
      newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
    if (format === "dd-MM-yyyy") {
      result = `${day}-${month}-${year}`;
    } else if (format === "yyyy-MM-dd") {
      result = `${year}-${month}-${day}`;
    }
    return result;
  } catch (error) {
    console.log(error);
    return "";
  }
};
export const convertSizeStringToNumber = (size) => {
  switch (size) {
    case "XS":
      return 0;
    case "S":
      return 1;
    case "M":
      return 2;
    case "L":
      return 3;
    case "XL":
      return 4;
    case "2XL":
      return 5;
    case "3XL":
      return 6;
    case "4XL":
      return 7;
    default:
      return -1;
  }
};
export const separateThousands = (x) =>{
  if(!x){
    return 0;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}