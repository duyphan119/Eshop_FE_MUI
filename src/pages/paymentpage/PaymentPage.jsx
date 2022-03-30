import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useSelector, useDispatch } from "react-redux";
import { apiGetAllCities } from "../../api/apiProvince";
import Input from "../../components/custom/Input";
import Select from "../../components/custom/Select";
import RadioButton from "../../components/custom/RadioButton";
import { AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { showToastMessage } from "../../redux/toastSlice";
import * as constants from "../../constants";
import { separateThousands } from "../../utils";
import "./paymentpage.scss";
import { apiCreateOrder } from "../../api/apiOrder";

const PaymentPage = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const cart = useSelector((state) => state.cart.list);
  const dispatch = useDispatch();
  const [addressNo, setAddressNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [optionsCity, setOptionsCity] = useState([]);
  const [optionsDistrict, setOptionsDistricts] = useState([]);
  const [optionsWards, setOptionsWards] = useState([]);
  const [deliveryPrice, setDeliveryPrice] = useState(20000);

  const getTotalPrice = () => {
    let result = 0;
    cart.forEach((item) => {
      result += item.quantity * item.product.newPrice;
    });
    return result;
  };

  const handleCheckout = () => {
    if (
      city !== "" &&
      district !== "" &&
      ward !== "" &&
      addressNo !== "" &&
      street !== ""
    ) {
      apiCreateOrder(
        user,
        {
          userId: user.id,
          cart: cart,
          city,
          district,
          ward,
          addressNo,
          street,
          deliveryPrice,
          paymentMethod: "1",
        },
        dispatch
      );
    } else {
      dispatch(
        showToastMessage({
          type: "error",
          text: "Vui lòng chọn đầy đủ thông tin",
          title: "Thất bại",
          isOpen: true,
        })
      );
    }
  };

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
          <div className="payments__title">Thông tin đơn hàng</div>
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
          <Input
            fields={{
              type: "text",
              disabled: true,
              name: "fullName",
              id: "fullName",
              defaultValue: user.firstName + " " + user.lastName,
            }}
            label="Họ tên"
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
              name: "addressNo",
              id: "addressNo",
              value: addressNo,
              placeholder: "Số nhà",
            }}
            label="Số nhà"
            onChange={(e) => setAddressNo(e.target.value)}
          />
          <Input
            fields={{
              type: "text",
              name: "address",
              id: "address",
              value: street,
              placeholder: "Địa chỉ",
            }}
            label="Địa chỉ"
            onChange={(e) => setStreet(e.target.value)}
          />
        </Col>
        <Col xs={4}>
          <div className="payments__title">Thanh toán</div>
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
        <Col xs={4}>
          <div className="payments__title">
            Đơn hàng ({cart.length} sản phẩm)
          </div>
          <div className="payments__list">
            {cart.map((item) => {
              return (
                <div className="payments__item" key={item.id}>
                  <div className="payments__item-img">
                    <img
                      src={`${constants.SERVER_URL}${item.product.images[0].image}`}
                      alt=""
                    />
                    <span>{item.quantity}</span>
                  </div>
                  <div className="payments__item-info">
                    <div className="payments__item-info-name">
                      {item.product.name}
                    </div>
                    <div className="payments__item-info-color">
                      {item.product.color} / {item.size.size}
                    </div>
                  </div>
                  <div className="payments__item-price">
                    {separateThousands(item.quantity * item.product.newPrice)}đ
                  </div>
                </div>
              );
            })}
          </div>
          <div className="payments__result">
            <div className="payments__result-item">
              <div className="payments__result-item-text">Tạm tính</div>
              <div className="payments__result-item-value">
                {separateThousands(getTotalPrice())}đ
              </div>
            </div>
            <div className="payments__result-item">
              <div className="payments__result-item-text">Phí vận chuyển</div>
              <div className="payments__result-item-value">
                {separateThousands(deliveryPrice)}đ
              </div>
            </div>
          </div>

          <div className="payments__result total">
            <div className="payments__result-text">Tổng cộng</div>
            <div className="payments__result-value">
              {separateThousands(getTotalPrice() + deliveryPrice)}đ
            </div>
          </div>

          <div className="payments__actions">
            <Link to={`/cart`} className="payments__action back-to-cart">
              <AiOutlineLeft />
              Quay về giỏ hàng
            </Link>
            <div className="payments__action checkout" onClick={handleCheckout}>
              ĐẶT HÀNG
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
