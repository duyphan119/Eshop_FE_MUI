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
    }
    else if(format === "yyyy-MM-dd"){
      result = `${year}-${month}-${day}`;
    }
    return result;
  } catch (error) {
    console.log(error);
    return "";
  }
};
