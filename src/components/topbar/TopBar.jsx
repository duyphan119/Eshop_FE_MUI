import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail, MdPhoneIphone } from "react-icons/md";
import "./topbar.scss";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
const TopBar = () => {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <ul className="top-bar">
            <li className="top-bar__item">
              <Link to="/" className="top-bar__item-link">
                <IoLocationSharp />
                Tìm <span>160+</span> cửa hàng
              </Link>
            </li>
            <li className="top-bar__item">
              <Link to="tel:0385981196" className="top-bar__item-link">
                <MdPhoneIphone />
                <span>0385981196</span>
                <span className="tel-free">FREE</span>
              </Link>
            </li>
            <li className="top-bar__item">
              <Link
                to="mailto:duychomap123@gmail.com"
                className="top-bar__item-link"
              >
                <MdEmail />
                duychomap123@gmail.com
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default TopBar;
