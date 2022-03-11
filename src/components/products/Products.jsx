import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import CardProduct from "../cardproduct/CardProduct";
import "./products.scss";
const products = [
  {
    id: Math.random(),
    name: "Áo Polo Nữ Cafe Phối Nẹp Siêu Nhẹ Siêu Mát",
    img: "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/qjn4014-tru-apn3700-gre-3.jpg?v=1641958600000",
    oldPrice: "329.000đ",
    newPrice: "299.000đ",
  },
  {
    id: Math.random(),
    name: "Áo Polo Nữ Cafe Phối Nẹp Siêu Nhẹ Siêu Mát",
    img: "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/qjn4014-tru-apn3700-gre-3.jpg?v=1641958600000",
    oldPrice: "329.000đ",
    newPrice: "299.000đ",
  },
  {
    id: Math.random(),
    name: "Áo Polo Nữ Cafe Phối Nẹp Siêu Nhẹ Siêu Mát",
    img: "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apn3340-vag-qjn3102-xah-3.jpg?v=1644283529000",
    oldPrice: "329.000đ",
    newPrice: "299.000đ",
  },
  {
    id: Math.random(),
    name: "Áo Polo Nữ Cafe Phối Nẹp Siêu Nhẹ Siêu Mát",
    img: "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/qjn4014-tru-apn3700-gre-3.jpg?v=1641958600000",
    oldPrice: "329.000đ",
    newPrice: "299.000đ",
  },
  {
    id: Math.random(),
    name: "Áo Polo Nữ Tay Ngắn Pique Mắt Chim Phối Bo Thoáng Khí",
    img: "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/qjn4014-tru-apn3700-gre-3.jpg?v=1641958600000",
    oldPrice: "",
    newPrice: "289.000đ",
  },
  {
    id: Math.random(),
    name: "Áo Polo Nữ Cafe Phối Nẹp Siêu Nhẹ Siêu Mát",
    img: "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/qjn4014-tru-apn3700-gre-3.jpg?v=1641958600000",
    oldPrice: "329.000đ",
    newPrice: "299.000đ",
  },
  {
    id: Math.random(),
    name: "Áo Polo Nữ Cafe Phối Nẹp Siêu Nhẹ Siêu Mát",
    img: "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/qjn4014-tru-apn3700-gre-3.jpg?v=1641958600000",
    oldPrice: "329.000đ",
    newPrice: "299.000đ",
  },
  {
    id: Math.random(),
    name: "Áo Polo Nữ Cafe Phối Nẹp Siêu Nhẹ Siêu Mát",
    img: "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/qjn4014-tru-apn3700-gre-3.jpg?v=1641958600000",
    oldPrice: "329.000đ",
    newPrice: "299.000đ",
  },
  {
    id: Math.random(),
    name: "Áo Polo Nữ Cafe Phối Nẹp Siêu Nhẹ Siêu Mát",
    img: "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/qjn4014-tru-apn3700-gre-3.jpg?v=1641958600000",
    oldPrice: "329.000đ",
    newPrice: "299.000đ",
  },
];
const Products = () => {
  return (
    <Container>
      <Row className="products">
        {products.map((item, index) => {
          return <CardProduct item={item} key={item.id} />;
        })}
      </Row>
    </Container>
  );
};

export default Products;
