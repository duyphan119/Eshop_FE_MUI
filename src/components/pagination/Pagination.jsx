import {
  AiOutlineDoubleLeft,
  AiOutlineLeft,
  AiOutlineDoubleRight,
  AiOutlineRight,
} from "react-icons/ai";
import "./pagination.scss";
const Paginations = ({ totalPages, currentPage, setCurrentPage }) => {
  const handleClick = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  if (totalPages <= 1) return "";
  return (
    <div className="pagination">
      <div
        className={`pagination__page-item ${
          currentPage === 1 ? "disabled" : ""
        }`}
        onClick={() => handleClick(1)}
      >
        <AiOutlineDoubleLeft />
      </div>
      <div
        className={`pagination__page-item ${
          currentPage === 1 ? "disabled" : ""
        }`}
        onClick={() => handleClick(currentPage - 1)}
      >
        <AiOutlineLeft />
      </div>
      <div className={`pagination__page-item active`}>{currentPage}</div>
      <div
        className={`pagination__page-item ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={() => handleClick(currentPage + 1)}
      >
        <AiOutlineRight />
      </div>
      <div
        className={`pagination__page-item ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={() => handleClick(totalPages)}
      >
        <AiOutlineDoubleRight />
      </div>
    </div>
  );
};

export default Paginations;
