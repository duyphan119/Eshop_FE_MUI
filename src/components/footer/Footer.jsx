import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xs={4}>
            <div className="footer__slogan">
              “Đặt sự hài lòng của khách hàng là ưu tiên số 1 trong mọi suy nghĩ
              hành động của mình” là sứ mệnh, là triết lý, chiến lược.. luôn
              cùng YODY tiến bước”
            </div>
            <div className="footer__email-register">
              <div className="footer__form-title">ĐĂNG KÝ NHẬN THÔNG TIN</div>
              <form className="footer__form">
                <input type="text" placeholder="Nhập email đăng ký của bạn" />
                <button type="submit">Đăng ký</button>
              </form>
            </div>
            <div className="footer__social">
              <a
                href="https://www.facebook.com/YodyVietnam.Official"
                className="footer__social-link"
              >
                <img
                  src="//bizweb.dktcdn.net/100/438/408/themes/848101/assets/social_1.png?1646486842767"
                  alt=""
                />
              </a>
              <a
                href="https://www.youtube.com/channel/UCfRq5SO7a2fWyTzkGB-5t8g?view_as=subscriber"
                className="footer__social-link"
              >
                <img
                  src="//bizweb.dktcdn.net/100/438/408/themes/848101/assets/social_2.png?1646486842767"
                  alt=""
                />
              </a>
              <a
                href="https://www.instagram.com/yody.vn/"
                className="footer__social-link"
              >
                <img
                  src="//bizweb.dktcdn.net/100/438/408/themes/848101/assets/social_3.png?1646486842767"
                  alt=""
                />
              </a>
              <a
                href="https://zalo.me/3492644577837657321"
                className="footer__social-link"
              >
                <img
                  src="//bizweb.dktcdn.net/100/438/408/themes/848101/assets/social_4.png?1646486842767"
                  alt=""
                />
              </a>
              <a
                href="https://shopee.vn/yody.official"
                className="footer__social-link"
              >
                <img
                  src="//bizweb.dktcdn.net/100/438/408/themes/848101/assets/social_5.png?1646486842767"
                  alt=""
                />
              </a>
              <a
                href="https://www.lazada.vn/yody/"
                className="footer__social-link"
              >
                <img
                  src="//bizweb.dktcdn.net/100/438/408/themes/848101/assets/social_6.png?1646486842767"
                  alt=""
                />
              </a>
              <a
                href="https://www.sendo.vn/thuong-hieu/yody/"
                className="footer__social-link"
              >
                <img
                  src="//bizweb.dktcdn.net/100/438/408/themes/848101/assets/social_7.png?1646486842767"
                  alt=""
                />
              </a>
              <a
                href="https://tiki.vn/cua-hang/yody-official-store"
                className="footer__social-link"
              >
                <img
                  src="//bizweb.dktcdn.net/100/438/408/themes/848101/assets/social_8.png?1646486842767"
                  alt=""
                />
              </a>
            </div>
          </Col>
          <Col xs={2} style={{
             paddingLeft:"50px"
          }}>
            <div className="footer__title">VỀ YODY</div>
            <div className="footer__pages">
              <Link to={`/`} className="footer__page">
                Giới thiệu
              </Link>
              <Link to={`/`} className="footer__page">
                Liên hệ
              </Link>
              <Link to={`/`} className="footer__page">
                Tuyển dụng
              </Link>
              <Link to={`/`} className="footer__page">
                Tin tức
              </Link>
              <Link to={`/`} className="footer__page">
                Hệ thống cửa hàng
              </Link>
            </div>
          </Col>
          <Col xs={2}>
            <div className="footer__title">HỖ TRỢ KHÁCH HÀNG</div>
            <div className="footer__supports">
              <Link to={`/`} className="footer__support">
                Hướng dẫn chọn size
              </Link>
              <Link to={`/`} className="footer__support">
                Chính sách khách hàng thân thiết
              </Link>
              <Link to={`/`} className="footer__support">
                Chính sách đổi/trả
              </Link>
              <Link to={`/`} className="footer__support">
                Tin tức
              </Link>
              <Link to={`/`} className="footer__support">
                Chính sách bảo mật
              </Link>
              <Link to={`/`} className="footer__support">
                Thanh toán, giao nhận
              </Link>
            </div>
          </Col>
          <Col xs={4}>
            <div className="footer__contacts">
              <div className="footer__address">
                <img
                  src="//bizweb.dktcdn.net/100/438/408/themes/848101/assets/map.svg?1646486842767"
                  alt="map"
                />
                Công ty CP Thời Trang YODY, đường An Định, TP. Hải Dương
              </div>
              <div className="footer__phone">
                <img
                  src="//bizweb.dktcdn.net/100/438/408/themes/848101/assets/mst.svg?1646486842767"
                  alt="phone"
                />
                <div>
                  <a href="tel:02473056665">Liên hệ đặt hàng: 024 730 56665</a>
                  <a href="tel:02473016661">Thắc mắc đơn hàng: 024 730 16661</a>
                  <a href="tel:18002086">Góp ý khiếu nại: 1800 2086</a>
                </div>
              </div>
              <div className="footer__mail">
                <img
                  src="//bizweb.dktcdn.net/100/438/408/themes/848101/assets/email.svg?1646486842767"
                  alt="phone"
                />
                <a href="mailto:chamsockhachhang@yody.vn">
                  chamsockhachhang@yody.vn
                </a>
              </div>
              <div className="footer__vat">
                <img
                  src="//bizweb.dktcdn.net/100/438/408/themes/848101/assets/mst.svg?1646486842767"
                  alt="phone"
                />
                0801206940
              </div>
            </div>
            <a
              href="http://online.gov.vn/Home/WebDetails/44085"
              style={{
                display: "block",
                marginTop: "20px",
              }}
            >
              <img
                src="//bizweb.dktcdn.net/100/438/408/themes/848101/assets/logo_bct.png?1646486842767"
                alt="bộ công thương"
              />
            </a>
          </Col>
          <hr style={{ margin: "30px 0 10px 0" }} />
          <Col xs={12} className="footer__copyright">
            @ Bản quyền thuộc về <span>Yody.vn</span> All right reserved
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
