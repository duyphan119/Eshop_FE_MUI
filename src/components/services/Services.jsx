import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
// import { Link } from "react-router-dom";
import "./service.scss";
const services = [
  {
    iconSrc:
      "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/ser_1.png?1646486842767",
    title: "Miễn phí giao hàng",
    detail: "Miễn phí ship với <span>đơn hàng > 498k</span>",
    to:"https://yody.vn/chinh-sach-giao-nhan-hang-online"
  },
  {
    iconSrc:
      "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/ser_2.png?1646486842767",
    title: "Thanh toán COD",
    detail: "Thanh toán khi <span>nhận hàng (COD)</span>",
    to:"https://yody.vn/chinh-sach-ship-cod-tai-yody"
  },
  {
    iconSrc:
      "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/ser_3.png?1646486842767",
    title: "Khách hàng VIP",
    detail: "Ưu dãi dành cho <span>khách hàng VIP</span>",
    to:"https://yody.vn/chinh-sach-khach-hang-than-thiet"
  },
  {
    iconSrc:
      "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/ser_4.png?1646486842767",
    title: "Hỗ trợ bảo hành",
    detail: "<span>Đổi, sửa</span> đồ tất cả tại store YODY",
    to:"https://yody.vn/chinh-sach-doi-tra"
  },
];
const Services = () => {
  return (
    <Container>
      <Row className="services">
        {services.map((item, index) => {
          return (
            <Col xs lg={3} md={6} sm={6} className="service" key={index}>
              <a href={item.to} className="service__link">
                <img src={item.iconSrc} alt="" />
                <div className="service__info">
                  <div className="service__title">{item.title}</div>
                  <div
                    className="service__detail"
                    dangerouslySetInnerHTML={{ __html: item.detail }}
                  ></div>
                </div>
              </a>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Services;
