import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useSelector } from "react-redux";
import { apiGetAllCities } from "../../api/apiProvince";
import Input from "../../components/custom/Input";
import Select from "../../components/custom/Select";
import RadioButton from "../../components/custom/RadioButton";
import "./paymentpage.scss";

const PaymentPage = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [optionsCity, setOptionsCity] = useState([]);
  const [optionsDistrict, setOptionsDistricts] = useState([]);
  const [optionsWards, setOptionsWards] = useState([]);
  console.log(address);

  useEffect(() => {
    const api = async () => {
      const data = await apiGetAllCities();
      setOptionsCity(data);
    };
    api();
  }, []);

  useEffect(() => {
    if (optionsCity.length !== 0) {
      const _item = optionsCity.find((item) => item.name === city);
      setOptionsDistricts(_item ? _item.districts : []);
    }
  }, [city, optionsCity]);

  useEffect(() => {
    if (optionsDistrict.length !== 0) {
      const _item = optionsDistrict.find((item) => item.name === district);
      setOptionsWards(_item ? _item.wards : []);
    }
  }, [district, optionsDistrict]);

  return (
    <Container>
      <Row>
        <Col xs={4}>
          <div className="payment__title">Thông tin đơn hàng</div>
          <Input
            fields={{
              type: "email",
              disabled: true,
              name: "email",
              id: "email",
              defaultValue: user.email,
            }}
            label="Địa chỉ email"
          />
          <Select
            fields={{
              name: "city",
              id: "city",
              value: city,
            }}
            options={[...optionsCity].map((item) => {
              return {
                ...item,
                value: item.name,
                text: item.name,
              };
            })}
            label="Tỉnh, Thành phố"
            onChange={(e) => setCity(e.target.value)}
          ></Select>
          <Select
            fields={{
              name: "district",
              id: "district",
              value: district,
              disabled: optionsDistrict.length === 0 ? true : false,
            }}
            options={[...optionsDistrict].map((item) => {
              return {
                ...item,
                value: item.name,
                text: item.name,
              };
            })}
            label="Quận, Huyện"
            onChange={(e) => setDistrict(e.target.value)}
          ></Select>
          <Select
            fields={{
              name: "ward",
              id: "ward",
              value: ward,
              disabled: optionsWards.length === 0 ? true : false,
            }}
            options={[...optionsWards].map((item) => {
              return {
                ...item,
                value: item.name,
                text: item.name,
              };
            })}
            label="Phường, Xã"
            onChange={(e) => setWard(e.target.value)}
          ></Select>
          <Input
            fields={{
              type: "text",
              name: "address",
              id: "address",
              value: address,
              placeholder: "Địa chỉ",
            }}
            label="Địa chỉ"
            onChange={(e) => setAddress(e.target.value)}
          />
        </Col>
        <Col xs={4}>
          <div className="payment__title">Thanh toán</div>
          <div className="payments__methods">
            <div className="payments__method">
              <RadioButton
                fields={{
                  name: "methodCOD",
                  id: "method",
                }}
                label="Thanh toán khi giao hàng"
              />
            </div>
          </div>
        </Col>
        <Col xs={4}></Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
