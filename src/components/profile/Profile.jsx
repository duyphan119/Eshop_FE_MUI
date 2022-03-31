import React from "react";
import Col from "react-bootstrap/esm/Col";
import { formatDate } from "../../utils";
import * as constants from "../../constants"
import "./profile.scss";
const Profile = ({ user }) => {
  return (
    <Col xs={3} className="personal-info__profile">
      <img
        src={user.avatar === null ? user.avatar : constants.IMAGE_IS_NOT_AVAILABLE_URL}
        alt=""
      />
      <div className="personal-info__name">
        {`${user.firstName ? user.firstName : ""} ${user.lastName ? user.lastName : ""
          }`}
      </div>
      <div className="personal-info__email">{user.email}</div>
      <ul>
        <li className="personal-info__birthday">
          <span>Ngày sinh:</span>{" "}
          {`${user.birthday ? formatDate("dd-MM-yyyy", user.birthday) : ""}`}
        </li>
        <li className="personal-info__gender">
          <span>Giới tính:</span>
          {user.gender === null ? "" : user.gender ? "Nam" : "Nữ"}
        </li>
        <li className="personal-info__phone">
          <span>Số điên thoại:</span>
          {user.phoneNumber === null ? "" : user.phoneNumber}
        </li>
      </ul>
    </Col>
  );
};

export default Profile;
