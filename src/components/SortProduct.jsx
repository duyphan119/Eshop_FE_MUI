import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DoneIcon from "@mui/icons-material/Done";
import "./styles/sort_product.css";
const sortFilters = [
  {
    text: "Mặc định",
    name: null,
    type: null,
  },
  {
    text: "Từ A-Z",
    name: "name",
    type: "asc",
  },
  {
    text: "Từ Z-A",
    name: "name",
    type: "desc",
  },
  {
    text: "Rẻ nhất",
    name: "price",
    type: "asc",
  },
  {
    text: "Giá giảm dần",
    name: "price",
    type: "desc",
  },
  {
    text: "Mới nhất",
    name: "createdAt",
    type: "desc",
  },
];
const SortProduct = ({ sortFilter, setSortFilter }) => {
  const handleSelectSortFilter = (item) => {
    setSortFilter(item);
  };

  return (
    <div className="sort-product-wrapper">
      <div>Sắp xếp theo</div>
      <label htmlFor="sort-product" className="sort-product-select">
        <div className="sort-product-select-value">
          {sortFilter ? sortFilter.text : sortFilters[0].text}
          <ArrowDropDownIcon />
        </div>
        <input type="checkbox" id="sort-product" hidden />
        <div className="sort-product-dropdown">
          {sortFilters.map((item) => {
            return (
              <label
                key={item.text}
                htmlFor="sort-product"
                className={`sort-product-dropdown-item ${
                  sortFilter
                    ? item.text === sortFilter.text
                      ? "sort-active"
                      : ""
                    : ""
                }`}
                onClick={() => handleSelectSortFilter(item)}
              >
                {item.text}
                <DoneIcon />
              </label>
            );
          })}
        </div>
      </label>
    </div>
  );
};

export default SortProduct;
