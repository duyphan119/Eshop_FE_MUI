import moment from "moment";
import "moment/locale/vi";
import React, { useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { BsStar, BsStarFill } from "react-icons/bs";
import * as constants from "../../constants";
import { apiAddNewComment } from "../../api/apiComment";
import "./comments.scss";
import { apiGetProductBySlug } from "../../api/apiProduct";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Comments = ({ product, setProduct, user, socket }) => {
  const [message, setMessage] = useState(
    (() => {
      let comment;
      if (user) {
        comment = product.Comments.find((item) => item.User.id === user.id);
      }
      return comment ? comment : { content: "", rate: 0 };
    })()
  );
  const dispatch = useDispatch();
  const myRating = useRef(message.rate);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = {
      content: message.content,
      rate: message.rate,
      userId: user.id,
      productSlug: product.slug,
      replyTo: null,
    };
    apiAddNewComment(newMessage);
    setProduct(
      await apiGetProductBySlug(user, newMessage.productSlug, dispatch)
    );
    socket.emit("send-message", {
      ...newMessage,
      roomId: newMessage.productSlug,
    });
  };
  useEffect(() => {
    socket.on("receive-message", async (msg) => {
      setProduct(await apiGetProductBySlug(user, msg.productSlug, dispatch));
    });
  }, [user, socket, setProduct, dispatch]);
  const handleRating = (item) => {
    myRating.current = item;
    setMessage({ ...message, rate: item });
  };
  if (!user) {
    return (
      <Row className="comments__login">
        <Col xs={12}>
          <Link to="/login">Đăng nhập để viết đánh giá</Link>
        </Col>
      </Row>
    );
  }
  return (
    <>
      <Row className="comments__title">
        <Col xs={12}>Đánh giá sản phẩm</Col>
      </Row>
      <Row className="comments__rating">
        <Col xs={2} className="comments__rating-left">
          <div className="comments__rating-average">
            {product.Comments.length === 0
              ? 0
              : product.Comments.reduce((prev, curr) => {
                  return prev + curr.rate / product.Comments.length;
                }, 0)}
            /5
          </div>
          <div className="stars">
            <div className="star">
              <BsStarFill />
            </div>
            <div className="star">
              <BsStarFill />
            </div>
            <div className="star">
              <BsStarFill />
            </div>
            <div className="star">
              <BsStarFill />
            </div>
            <div className="star">
              <BsStar />
            </div>
          </div>
          <div className="comments__rating-count">
            {product.Comments.length} lượt đánh giá
          </div>
        </Col>
        <Col xs={10} className="comments__rating-right">
          <div className="comments__rating-percents">
            {[5, 4, 3, 2, 1].map((item, index) => {
              return (
                <div
                  className="comments__rating-percent"
                  key={new Date() + index}
                >
                  <div className="comments__rating-percent-name">{item}</div>
                  <div className="comments__rating-percent-description">
                    <div
                      style={{
                        width: "45%",
                      }}
                    ></div>
                  </div>
                  <div className="comments__rating-percent-value">45</div>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="comments__rating-user-rate">
          <div className="comments__rating-user-rate-title">
            Đánh giá của bạn
          </div>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((item, index) => {
              return (
                <div
                  className="star"
                  key={new Date() + index}
                  onClick={() => handleRating(item)}
                  onMouseEnter={() => setMessage({ ...message, rate: item })}
                  onMouseLeave={() =>
                    setMessage({ ...message, rate: myRating.current })
                  }
                >
                  {item <= message.rate ? <BsStarFill /> : <BsStar />}
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
      <Row className="comments__main">
        <Col xs={12}>
          <form className="comments__main-box" onSubmit={handleSubmit}>
            <div className="comments__main-box-top">
              <img src={user.avatar} alt="" />
              <textarea
                rows={3}
                placeholder="Viết đánh giá của bạn"
                value={message.content}
                onChange={(e) =>
                  setMessage({ ...message, content: e.target.value })
                }
              ></textarea>
            </div>
            <div className="comments__main-box-bottom">
              <button>Gửi</button>
            </div>
          </form>
        </Col>
        {product.Comments.map((comment) => (
          <Col xs={12} key={comment.id}>
            <div className="comments__main-user">
              <div className="comments__main-user-top">
                <div className="comments__main-user-avatar">
                  <img src={comment.User.avatar} alt="" />
                </div>
                <div className="comments__main-user-info">
                  <div className="comments__main-user-info-top">
                    {`${comment.User.first_name} ${comment.User.last_name}`}
                    &nbsp;
                    <span>{moment(comment.createdAt).fromNow()}</span>
                  </div>
                  <div className="comments__main-user-info-bottom">
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((item, index) => {
                        return (
                          <div
                            className="star"
                            key={new Date().getTime() + index}
                          >
                            {item <= comment.rate ? <BsStarFill /> : <BsStar />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="comments__main-user-bottom">
                <div className="comments__main-user-content">
                  {comment.content}
                </div>
                <div className="comments__main-user-actions">
                  <div className="comments__main-user-action-like">Thích</div>
                  <div className="comments__main-user-action-reply">
                    Trả lời
                  </div>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Comments;
