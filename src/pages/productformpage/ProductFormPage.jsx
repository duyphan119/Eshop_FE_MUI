import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Input from "../../components/custom/Input";
import Select from "../../components/custom/Select";
import { useFormik } from "formik";
import { apiUploadImages } from "../../api/apiFile";
import { apiCreateProduct } from "../../api/apiProduct";
import { apiGetAllCategories } from "../../api/apiCategory";
const ProductFormPage = () => {
  const categories = useSelector((state) => state.category.list);
  const dispatch = useDispatch();
  const [sizes, setSizes] = useState({
    size: "S",
    amount: 0,
    list: [],
  });
  const [images, setImages] = useState([]);
  const formik = useFormik({
    initialValues: {
      categoryId: categories.length > 0 ? categories[0].id : "",
      name: "",
      color: "",
      colorCode: "#000000",
      oldPrice: 0,
      newPrice: 0,
    },
    onSubmit: async (values) => {
      const uploadedImages = [];
      console.log(images);
      for (let i = 0; i < images.length; i++) {
        const formData = new FormData();
        formData.append("image", images[i]);
        const uploadedImage = await apiUploadImages(formData);
        uploadedImages.push({ image: uploadedImage.data.image.url })
      }
      apiCreateProduct({
        ...values,
        sizes: sizes.list,
        images: uploadedImages,
      }, dispatch);
    },
  });
  console.log(formik.values);
  const handleAddSize = () => {
    let arr = [...sizes.list];
    let index = arr.findIndex((item) => item.size === sizes.size);
    if (index !== -1) {
      arr[index].amount = sizes.amount;
    } else {
      arr.push({ size: sizes.size, amount: sizes.amount });
    }
    setSizes({ ...sizes, list: arr });
  };
  const handleRemoveSize = (size) => {
    let arr = [...sizes.list];

    setSizes({ ...sizes, list: arr.filter((item) => item.size !== size) });
  };
  const handleSelectPictures = async (e) => {
    const files = e.target.files;
    const imgs = [];
    for (let i = 0; i < files.length; i++) {
      imgs.push(files[i]);
    }
    setImages(imgs);
  };
  useEffect(() => {
    apiGetAllCategories(dispatch);
  }, [dispatch]);
  return (
    <Container>
      <Row>
        <Col xs={2}></Col>
        <Col xs={10} className="product-form-page">
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col xs={6}>
                <Select
                  fields={{
                    name: "categoryId",
                    id: "categoryId",
                  }}
                  label="Danh mục"
                  options={categories.map((item) => {
                    return {
                      value: item.id,
                      text: item.name,
                    };
                  })}
                  value={formik.values.categoryId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Col>
              <Col xs={6}>
                <Input
                  fields={{
                    type: "text",
                    name: "name",
                    placeholder: "Tên",
                    id: "name",
                  }}
                  label="Tên sản phẩm"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Col>
              <Col xs={6}>
                <Input
                  fields={{
                    type: "text",
                    name: "color",
                    placeholder: "Tên màu",
                    id: "color",
                  }}
                  label="Tên màu"
                  value={formik.values.color}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Col>
              <Col xs={6}>
                <Input
                  fields={{
                    type: "color",
                    name: "colorCode",
                    id: "colorCode",
                  }}
                  label="Chọn màu"
                  value={formik.values.colorCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Col>
              <Col xs={6}>
                <Input
                  fields={{
                    type: "number",
                    name: "oldPrice",
                    placeholder: "Giá cũ",
                    id: "oldPrice",
                  }}
                  label="Giá cũ"
                  value={formik.values.oldPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Col>
              <Col xs={6}>
                <Input
                  fields={{
                    type: "number",
                    name: "newPrice",
                    placeholder: "Giá mới",
                    id: "newPrice",
                  }}
                  label="Giá mới"
                  value={formik.values.newPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Col>
              <Col xs={3}>
                <Row>
                  <Col xs={6}>
                    <Select
                      fields={{
                        name: "size",
                        id: "size",
                      }}
                      label="Kích cỡ"
                      options={[
                        { text: "XS", value: "XS" },
                        { text: "S", value: "S" },
                        { text: "M", value: "M" },
                        { text: "L", value: "L" },
                        { text: "XL", value: "XL" },
                      ]}
                      value={sizes.size}
                      onChange={(e) =>
                        setSizes({ ...sizes, size: e.target.value })
                      }
                    />
                  </Col>
                  <Col xs={6}>
                    <Input
                      fields={{
                        type: "number",
                        name: "amount",
                        placeholder: "Số lượng",
                        id: "amount",
                      }}
                      label="Số lượng"
                      value={sizes.amount}
                      onChange={(e) =>
                        setSizes({ ...sizes, amount: parseInt(e.target.value) })
                      }
                    />
                  </Col>
                  <Col xs={12}>
                    <button
                      type="button"
                      className="form-submit"
                      onClick={() => handleAddSize()}
                    >
                      Chọn
                    </button>
                  </Col>
                  <Col xs={12}>
                    {sizes.list.map((item) => (
                      <Col
                        xs={2}
                        key={item.size}
                        onClick={() => handleRemoveSize(item.size)}
                      >
                        {item.size} - {item.amount}
                      </Col>
                    ))}
                  </Col>
                </Row>
              </Col>
              <Col xs={9}>
                <Row>
                  <Col xs={12}>
                    <Input
                      fields={{
                        type: "file",
                        name: "product",
                        id: "product",
                        hidden: true,
                        multiple: true,
                      }}
                      onChange={handleSelectPictures}
                    />
                  </Col>
                  <Col
                    xs={12}
                    style={{
                      textAlign: "center",
                      marginBlock: "20px",
                    }}
                  >
                    <label
                      className="form-submit"
                      style={{
                        display: "inline",
                      }}
                      htmlFor="product"
                    >
                      Chọn ảnh
                    </label>
                  </Col>
                  {images.map((image, index) => (
                    <Col
                      xs={2}
                      style={{
                        marginTop: "10px",
                      }}
                      key={index}
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        style={{
                          width: "100%",
                          objectFit: "cover",
                        }}
                        alt=""
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col xs={12}>
                <button type="submit" className="form-submit">
                  Thêm
                </button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductFormPage;
