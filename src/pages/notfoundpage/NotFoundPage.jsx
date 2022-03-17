import React, { useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Link } from "react-router-dom";
import "./notfoundpage.scss";
const NotFoundPage = () => {
  useEffect(()=>{
    document.title = "404 Không tìm thấy trang";
  },[])
  return (
    <div className="not-found-page">
      <Container className="not-found-page__container">
        <Row className="not-found-page__main">
          <Col xs={12} className="not-found-page__status-code">404</Col>
          <Col xs={12} className="not-found-page__content">Trang này không tìm thấy</Col>
          <Col xs={12} className="not-found-page__home">
            <Link to={`/`}>Về trang chủ</Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFoundPage;
