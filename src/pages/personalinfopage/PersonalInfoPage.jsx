import { useFormik } from "formik";
import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useDispatch, useSelector } from "react-redux";
import { apiUploadImage } from "../../api/apiFile";
import Input from "../../components/custom/Input";
import Select from "../../components/custom/Select";
import * as constants from "../../constants";
import * as Yup from "yup";
import { apiUpdateUser } from "../../api/apiUser";
import "./personalinfopage.scss";
import { formatDate } from "../../utils";
const PersonalInfoPage = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: user.firstName ? user.firstName : "",
      lastName: user.lastName ? user.lastName : "",
      gender: user.gender ? user.gender : "",
      phoneNumber: user.phoneNumber ? user.phoneNumber : "",
      birthday: user.birthday ? formatDate("yyyy-MM-dd",user.birthday) : "",
      avatar: user.avatar ? user.avatar : "",
    },
    onSubmit: (values) => {
      apiUpdateUser({ ...user, ...values }, dispatch);
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("Bắt buộc nhập trường này"),
      lastName: Yup.string().required("Bắt buộc nhập trường này"),
      phoneNumber: Yup.string().matches(
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        "Số điện thoại không hợp lệ"
      ),
    }),
  });
  const handleSelectPicture = async (e) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    const avatar = await apiUploadImage(formData);
    formik.setFieldValue("avatar", avatar);
  };
  return (
    <Container>
      <Row className="personal-info">
        <Col xs={3} className="personal-info__profile">
          <img
            src={`${
              formik.values.avatar.includes("http")
                ? formik.values.avatar
                : `${constants.SERVER_URL}${formik.values.avatar}`
            }`}
            alt=""
          />
          <div className="personal-info__name">
            {`${user.firstName ? user.firstName : ""} ${
              user.lastName ? user.lastName : ""
            }`}
          </div>
          <div className="personal-info__email">{user.email}</div>
          <ul>
            <li className="personal-info__birthday">
              <span>Ngày sinh:</span>{" "}
              {`${user.birthday ? formatDate("dd-MM-yyyy",user.birthday) : ""}`}
            </li>
            <li className="personal-info__gender">
              <span>Giới tính:</span>Nam
            </li>
            <li className="personal-info__phone">
              <span>Số điên thoại:</span>0385981196
            </li>
          </ul>
        </Col>
        <Col xs={9} className="personal-info__form">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-title">THÔNG TIN CÁ NHÂN</div>
            <Row>
              <Col xs={8}>
                <Row>
                  <Col xs={6}>
                    <Input
                      fields={{
                        type: "text",
                        name: "firstName",
                        placeholder: "Tên",
                        id: "firstName",
                        autoComplete: "off",
                      }}
                      label="Tên"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.firstName && formik.errors.firstName
                      }
                    />
                  </Col>
                  <Col xs={6}>
                    <Input
                      fields={{
                        type: "text",
                        name: "lastName",
                        placeholder: "Họ",
                        id: "lastName",
                        autoComplete: "off",
                      }}
                      label="Họ"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.lastName && formik.errors.lastName}
                    />
                  </Col>
                  <Col xs={6}>
                    <Input
                      fields={{
                        type: "date",
                        name: "birthday",
                        placeholder: "Ngày sinh",
                        id: "birthday",
                        autoComplete: "off",
                      }}
                      label="Ngày sinh"
                      value={formik.values.birthday}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.birthday && formik.errors.birthday}
                    />
                  </Col>
                  <Col xs={6}>
                    <Input
                      fields={{
                        type: "text",
                        name: "phoneNumber",
                        placeholder: "Số điện thoại",
                        id: "phoneNumber",
                        autoComplete: "off",
                      }}
                      label="Số điện thoại"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                      }
                    />
                  </Col>
                  <Col xs={6}>
                    <Select
                      fields={{
                        name: "gender",
                      }}
                      options={[
                        {
                          value: "",
                          text: "Chọn giới tính",
                        },
                        {
                          value: "male",
                          text: "Nam",
                        },
                        {
                          value: "female",
                          text: "Nữ",
                        },
                      ]}
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      label="Giới tính"
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={4}>
                <label
                  htmlFor="avatar"
                  style={{
                    width: "200px",
                    height: "200px",
                    border: "1px solid gray",
                    margin: "10px auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    backgroundImage: `url(${
                      formik.values.avatar.includes("http")
                        ? formik.values.avatar
                        : `${constants.SERVER_URL}${formik.values.avatar}`
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {formik.values.avatar === "" ? "Chọn ảnh đại diện" : ""}
                </label>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  hidden
                  onChange={handleSelectPicture}
                />
              </Col>
            </Row>

            <button className="form-submit" type="submit">
              Lưu
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonalInfoPage;
