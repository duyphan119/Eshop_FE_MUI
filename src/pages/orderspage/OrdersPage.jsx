import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { GoTrashcan } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { apiDeleteOrder, apiGetOrdersByUser } from "../../api/apiOrder";
import ConfirmMessage from "../../components/confirmmessage/ConfirmMessage";
import Profile from "../../components/profile/Profile";
import {separateThousands, formatDate} from "../../utils"
import "./orderspage.scss";

const OrdersPage = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const orders = useSelector((state) => state.order.list);
  const dispatch = useDispatch();
  const [confirmMessage, setConfirmMessage] = useState({
    isOpen: false,
  });
  const handleDelete = async (item) => {
    await apiDeleteOrder(user, item, dispatch);
    setConfirmMessage({ ...confirmMessage, isOpen: false });
  };

  useEffect(() => {
    apiGetOrdersByUser(user, dispatch);
  }, [user, dispatch]);
  console.log(orders);
  return (
    <div className="orders-page">
      <Container className="orders-page__container">
        <Row className="orders-page__main">
          <Profile user={user} />
          <Col xs={9} className="orders-page__body">
            <div className="orders-page__header">
              <div>Lịch sử mua hàng</div>
            </div>
            <hr />
            <div className="orders-page__list">
              <div className="orders-page__item header">
                <div className="orders-page__item-child">Mã đơn hàng</div>
                <div className="orders-page__item-child flex-5">Ngày đặt</div>
                <div className="orders-page__item-child flex-5">Ngày nhận</div>
                <div className="orders-page__item-child">Phí vận chuyển</div>
                <div className="orders-page__item-child flex-3">Tổng tiền</div>
                <div className="orders-page__item-child">Trạng thái</div>
                <div className="orders-page__item-child action"></div>
              </div>
              {orders.map((order) => (
                <div className="orders-page__item" key={order.id}>
                  <div className="orders-page__item-child">{order.id}</div>
                  <div className="orders-page__item-child flex-5">
                    {formatDate("dd-MM-yyyy HH:mm:ss", order.createdAt)}
                  </div>
                  <div className="orders-page__item-child flex-5">
                    {order.createdAt !== order.updatedAt && formatDate("dd-MM-yyyy HH:mm:ss", order.updatedAt)}
                  </div>
                  <div className="orders-page__item-child">{separateThousands(order.deliveryPrice)}đ</div>
                  <div className="orders-page__item-child flex-3">{separateThousands(order.totalPrice)}đ</div>
                  <div className="orders-page__item-child">Đang xử lý</div>
                  <div className="orders-page__item-child action">
                    <GoTrashcan
                      onClick={() => {
                        setConfirmMessage({
                          ...confirmMessage,
                          isOpen: true,
                          text: `Bạn có chắc chắn huỷ đơn hàng số ${`1647759551510`} `,
                          title: "Xác nhận",
                          answerYes: () => handleDelete(order),
                        });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      {confirmMessage.isOpen && (
        <ConfirmMessage
          confirmMessage={confirmMessage}
          setConfirmMessage={setConfirmMessage}
        />
      )}
    </div>
  );
};

export default OrdersPage;
