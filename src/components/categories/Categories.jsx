import "./categories.scss";
const Categories = ({ array, onClick, indexClick }) => {
  return (
    <div className="categories">
      {array ? (
        array.map((item, index) => {
          return (
            <button
              className={`category ${indexClick === index ? "active" : ""}`}
              onClick={() => onClick(index)}
              key={new Date() + index}
            >
              {item.name}
            </button>
          );
        })
      ) : (
        <>
          <button className="category active">Bán chạy nhất</button>;
          <button className="category">Thời trang nam</button>
          <button className="category">Thời trang nữ</button>
          <button className="category">Thời trang nam</button>
          <button className="category">Polo YODY</button>
          <button className="category">Quần Jeans nữ</button>
        </>
      )}
    </div>
  );
};

export default Categories;
