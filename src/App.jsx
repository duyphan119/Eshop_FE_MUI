import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsSearch } from "react-icons/bs";
import { BiShoppingBag, BiUser } from "react-icons/bi";
import "./App.scss";
const App = () => {
  return (
    <Container>
      <Row className="header">
        <Col xs={4} className="header__left">
          <form>
            <input type="text" name="keyword" id="keyword" />
            <BsSearch />
          </form>
        </Col>
        <Col xs={4} className="header__middle">
          <a href="/#">DUY</a>
        </Col>
        <Col xs={4} className="header__right">
          <ul className="header__right-icons">
            <li className="header__right-icon">
              <a href="/#">
                <BiUser />
              </a>
            </li>
            <li className="header__right-icon">
              <a href="/#">
                <BiShoppingBag />
                <span>11</span>
              </a>
            </li>
          </ul>
        </Col>
      </Row>
      <Row className="banner">
        <Col xs={12} className="banner__img">
          <img
            src="https://xtee.vn/wp-content/uploads/2021/07/BANNER3.png"
            alt=""
          />
          <a href="/#">XEM THÊM</a>
        </Col>
      </Row>
      <Row className="products">
        <Col xs={12} className="products__title">
          NEW ARRIVALS
        </Col>
        <Col xs={3} className="products__item">
          <a href="/#">
            <img
              src="https://xtee.vn/wp-content/uploads/2022/01/BST129B-400x400.jpg"
              alt=""
            />
          </a>
          <div className="products__item-name">
            <a href="/#">Áo Thun PoLo Cổ Bẻ Đẹp Navy BST129B</a>
          </div>
          <div className="products__item-price">289.000Đ</div>
          <ul className="products__item-colors">
            <li
              className="products__item-color"
              style={{
                border: "1px solid lightgray",
                backgroundColor: "blue",
              }}
            ></li>
            <li
              className="products__item-color"
              style={{
                border: "1px solid lightgray",
                backgroundColor: "white",
              }}
            ></li>
            <li
              className="products__item-color"
              style={{
                border: "1px solid lightgray",
                backgroundColor: "black",
              }}
            ></li>
          </ul>
        </Col>
        <Col xs={3} className="products__item">
          <a href="/#">
            <img
              src="https://xtee.vn/wp-content/uploads/2022/01/BST129B-400x400.jpg"
              alt=""
            />
          </a>
          <div className="products__item-name">
            <a href="/#">Áo Thun PoLo Cổ Bẻ Đẹp Navy BST129B</a>
          </div>
          <div className="products__item-price">289.000Đ</div>
          <ul className="products__item-colors">
            <li
              className="products__item-color"
              style={{
                border: "1px solid lightgray",
                backgroundColor: "blue",
              }}
            ></li>
            <li
              className="products__item-color"
              style={{
                border: "1px solid lightgray",
                backgroundColor: "white",
              }}
            ></li>
            <li
              className="products__item-color"
              style={{
                border: "1px solid lightgray",
                backgroundColor: "black",
              }}
            ></li>
          </ul>
        </Col>
        <Col xs={3} className="products__item">
          <a href="/#">
            <img
              src="https://xtee.vn/wp-content/uploads/2022/01/BST129B-400x400.jpg"
              alt=""
            />
          </a>
          <div className="products__item-name">
            <a href="/#">Áo Thun PoLo Cổ Bẻ Đẹp Navy BST129B</a>
          </div>
          <div className="products__item-price">289.000Đ</div>
          <ul className="products__item-colors">
            <li
              className="products__item-color"
              style={{
                border: "1px solid lightgray",
                backgroundColor: "blue",
              }}
            ></li>
            <li
              className="products__item-color"
              style={{
                border: "1px solid lightgray",
                backgroundColor: "white",
              }}
            ></li>
            <li
              className="products__item-color"
              style={{
                border: "1px solid lightgray",
                backgroundColor: "black",
              }}
            ></li>
          </ul>
        </Col>
        <Col xs={3} className="products__item">
          <a href="/#">
            <img
              src="https://xtee.vn/wp-content/uploads/2022/01/BST129B-400x400.jpg"
              alt=""
            />
          </a>
          <div className="products__item-name">
            <a href="/#">Áo Thun PoLo Cổ Bẻ Đẹp Navy BST129B</a>
          </div>
          <div className="products__item-price">289.000Đ</div>
          <ul className="products__item-colors">
            <li
              className="products__item-color"
              style={{
                border: "1px solid lightgray",
                backgroundColor: "blue",
              }}
            ></li>
            <li
              className="products__item-color"
              style={{
                border: "1px solid lightgray",
                backgroundColor: "white",
              }}
            ></li>
            <li
              className="products__item-color"
              style={{
                border: "1px solid lightgray",
                backgroundColor: "black",
              }}
            ></li>
          </ul>
        </Col>
        <Col xs={12} className="products__view-more">
          <a href="/#">XEM THÊM</a>
        </Col>
      </Row>
      <Row className="footer">
        <Col xs={3}></Col>
        <Col xs={3}></Col>
        <Col xs={3}></Col>
        <Col xs={3}></Col>
      </Row>
    </Container>
  );
};

export default App;
