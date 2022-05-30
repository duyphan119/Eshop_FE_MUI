import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../Modal";
const ModalAddProduct = ({
  open,
  handleClose,
  title,
  labelOk,
  isCloseAfterOk,
  product,
  handleOk,
  width,
  height,
}) => {
  const categories = useSelector((state) => state.category.all);
  const colors = useSelector((state) => state.color.all);
  const sizes = useSelector((state) => state.size.all);
  const _materials = useSelector((state) => state.material.all);

  const [name, setName] = useState(product ? product.name : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [indexCategory, setIndexCategory] = useState(
    categories.length > 0 ? 0 : -1
  );
  const [indexColor, setIndexColor] = useState(0);
  const [indexSize, setIndexSize] = useState(0);
  const [indexMaterial, setIndexMaterial] = useState(0);
  const [deleteMaterials, setDeleteMaterials] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(product ? product.price : "");
  const [files, setFiles] = useState();
  const [details, setDetails] = useState(
    product
      ? (function () {
          let arr = [];
          product.colors.forEach((item) => {
            item.sizes.forEach((size) => {
              arr.push({
                color: item,
                size,
                amount: size.amount,
                detail_id: size.detail_id,
              });
            });
          });
          return arr;
        })()
      : []
  );
  const [materials, setMaterials] = useState(
    product
      ? (function () {
          let arr = [];
          product.materials.forEach((item) => {
            arr.push({ ...item.material, product_material_id: item.id });
          });
          return arr;
        })()
      : []
  );
  const [images, setImages] = useState([]);
  const [productImages, setProductImages] = useState(
    product
      ? (function () {
          let arr = [];
          product.colors.forEach((item) => {
            arr.push({ color: item, urlList: item.images });
          });
          return arr;
        })()
      : []
  );

  function getDetail(detail) {
    const _details = [...details];

    const index = _details.findIndex(
      (d) => d.color.id === detail.color.id && d.size.id === detail.size.id
    );
    if (index === -1) {
      _details.push(detail);
    } else {
      _details[index] = { ..._details[index], ...detail };
    }
    setDetails(_details);
  }

  function getMaterial(material) {
    const _materials = [...materials];

    const index = _materials.findIndex((m) => m.id === material.id);

    if (index === -1) {
      _materials.push(material);
    } else {
      _materials[index] = { ..._materials[index], ...material };
    }

    setMaterials(_materials);
  }
  function getImage(image) {
    const _images = [...images];

    const index = _images.findIndex((img) => img.color.id === image.color.id);

    if (index === -1) {
      _images.push(image);
    } else {
      _images[index] = image;
    }

    setImages(_images);
  }

  return (
    <>
      <Modal
        open={open}
        handleClose={handleClose}
        title={title}
        labelOk={labelOk}
        handleOk={() => {
          handleOk({
            name,
            price,
            description,
            category: categories[indexCategory],
            details,
            materials,
            images,
            deleteMaterials,
            deleteImages,
          });
        }}
        isCloseAfterOk={isCloseAfterOk}
        width={width}
        height={height}
      >
        <Grid container spacing={2} my={1}>
          <Grid item xs={5}>
            {categories.length > 0 && (
              <FormControl sx={{ marginBottom: "8px" }} size="small" fullWidth>
                <InputLabel id="category">Danh mục</InputLabel>
                <Select
                  label="Danh mục"
                  labelId="category"
                  value={indexCategory}
                  onChange={(e) => setIndexCategory(e.target.value)}
                >
                  {categories.map((item, index) => (
                    <MenuItem value={index} key={index}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <FormControl sx={{ marginBottom: "8px" }} fullWidth>
              <TextField
                size="small"
                label="Tên sản phẩm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ marginBottom: "8px" }} fullWidth>
              <TextField
                size="small"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                label="Giá"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
              />
            </FormControl>
            <Editor
              apiKey="indwv4av23yq82wi3287w99kyjhpog9esio9z4tzzabp86w1"
              onEditorChange={(text, editor) => {
                setDescription(text);
              }}
              value={description}
              init={{
                height: 300,
                apiKey: "indwv4av23yq82wi3287w99kyjhpog9esio9z4tzzabp86w1",
                menubar: false,
                toolbar: `undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help`,
                content_style: "body {  font-size:12px }",
              }}
            />
          </Grid>
          <Grid item xs={7}>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                {colors.length > 0 && (
                  <FormControl size="small" fullWidth>
                    <InputLabel id="color">Màu sắc</InputLabel>
                    <Select
                      label="Màu sắc"
                      value={indexColor}
                      onChange={(e) => setIndexColor(e.target.value)}
                      labelId="color"
                    >
                      {colors.map((item, index) => (
                        <MenuItem value={index} key={index}>
                          {item.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                <label htmlFor="contained-button-file">
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => setFiles(Array.from(e.target.files))}
                    hidden
                  />
                  <Button
                    variant="outlined"
                    sx={{ mb: files ? 1 : 0, mt: 1 }}
                    component="span"
                    size="small"
                  >
                    Tải ảnh lên
                  </Button>
                </label>
                {files && (
                  <>
                    <Grid container spacing={1}>
                      {files.map((item, index) => (
                        <Grid item xs={2} key={index}>
                          <img
                            src={URL.createObjectURL(item)}
                            alt=""
                            style={{ width: "100%" }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                    <Button
                      sx={{ mt: 1 }}
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        getImage({
                          color: colors[indexColor],
                          files,
                        });
                        setFiles(null);
                      }}
                    >
                      Chọn các ảnh này
                    </Button>
                  </>
                )}
                <Box sx={{ mt: 1 }}>
                  <Grid container spacing={1}>
                    {productImages.map((item, index) => (
                      <Fragment key={index}>
                        <Grid item xs={12}>
                          <div>{item.color.value}</div>
                        </Grid>
                        {item.urlList.map((el, index) => (
                          <Grid item xs={2} position="relative" key={index}>
                            <img
                              src={el.url}
                              style={{ width: "100%" }}
                              alt=""
                            />
                            <div
                              style={{
                                position: "absolute",
                                top: "3px",
                                right: "-3px",
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                backgroundColor: "var(--error-color)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setDeleteImages((prev) => [...prev, el]);
                                setProductImages((prev) => {
                                  const _images = [...prev];
                                  const indexColor = _images.findIndex(
                                    (a) => a.color.id === item.color.id
                                  );
                                  _images[indexColor].urlList = _images[
                                    indexColor
                                  ].urlList.filter((b) => b.id !== el.id);
                                  return _images;
                                });
                              }}
                            >
                              &times;
                            </div>
                          </Grid>
                        ))}
                      </Fragment>
                    ))}
                    {[...images]
                      .filter(
                        (i) =>
                          productImages.findIndex(
                            (a) => a.color.id === i.color.id
                          ) === -1
                      )
                      .map((item, index) => (
                        <Fragment key={index}>
                          <Grid item xs={12}>
                            <div>{item.color.value}</div>
                          </Grid>
                          {item.files.map((file, index) => (
                            <Grid item xs={2} position="relative" key={index}>
                              <img
                                src={URL.createObjectURL(file)}
                                style={{ width: "100%" }}
                                alt=""
                              />
                              <div
                                style={{
                                  position: "absolute",
                                  top: "3px",
                                  right: "-3px",
                                  width: "12px",
                                  height: "12px",
                                  borderRadius: "50%",
                                  backgroundColor: "var(--error-color)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "#fff",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  setImages(
                                    [...images].filter(
                                      (i) => i.color.id === item.color.id
                                    )
                                  );
                                }}
                              >
                                &times;
                              </div>
                            </Grid>
                          ))}
                        </Fragment>
                      ))}
                  </Grid>
                </Box>
                {sizes.length > 0 && (
                  <FormControl size="small" fullWidth sx={{ mt: 1 }}>
                    <InputLabel id="size">Kích cỡ</InputLabel>
                    <Select
                      label="Kích cỡ"
                      value={indexSize}
                      onChange={(e) => setIndexSize(e.target.value)}
                      labelId="size"
                    >
                      {sizes.map((item, index) => (
                        <MenuItem value={index} key={index}>
                          {item.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                <FormControl sx={{ mt: 1 }} fullWidth>
                  <TextField
                    size="small"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    label="Số lượng"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                  />
                </FormControl>
                <Button
                  sx={{ mt: 1 }}
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    getDetail({
                      color: colors[indexColor],
                      size: sizes[indexSize],
                      amount,
                    })
                  }
                >
                  Chọn màu và kích cỡ này
                </Button>
                <Box sx={{ mt: 1 }}>
                  {details.map((item, index) => (
                    <Chip
                      sx={{
                        marginRight: "2px",
                        marginBottom: "2px",
                      }}
                      key={index}
                      size="small"
                      label={`${item.color.value} - ${item.size.value} - ${item.amount}`}
                      variant="outlined"
                      {...(product
                        ? {}
                        : {
                            onDelete: () =>
                              setDetails(
                                [...details].filter(
                                  (el) =>
                                    el.color.id !== item.color.id ||
                                    el.size.id !== item.size.id
                                )
                              ),
                          })}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={5}>
                {_materials.length > 0 && (
                  <FormControl size="small" fullWidth>
                    <InputLabel id="material">Chất liệu</InputLabel>
                    <Select
                      label="Chất liệu"
                      value={indexMaterial}
                      onChange={(e) => setIndexMaterial(e.target.value)}
                      labelId="material"
                    >
                      {_materials.map((item, index) => (
                        <MenuItem value={index} key={index}>
                          {item.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                <Button
                  sx={{ mt: 1 }}
                  size="small"
                  variant="outlined"
                  onClick={() => getMaterial(_materials[indexMaterial])}
                >
                  Chọn chất liệu này
                </Button>
                <Box sx={{ mt: 1 }}>
                  {materials.map((item, index) => (
                    <Chip
                      sx={{
                        marginRight: "2px",
                        marginBottom: "2px",
                      }}
                      key={index}
                      size="small"
                      label={item.value}
                      variant="outlined"
                      onDelete={() => {
                        if (product) {
                          setDeleteMaterials((prev) => [
                            ...prev,
                            item.product_material_id,
                          ]);
                        }
                        setMaterials(
                          [...materials].filter((el) => el.id !== item.id)
                        );
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default ModalAddProduct;
