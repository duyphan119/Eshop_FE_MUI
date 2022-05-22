import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Button,
  Typography,
  Chip,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { apiGetAllCategories } from "../../../api/apiCategory";
import { Editor } from "@tinymce/tinymce-react";
import { apiCreateProduct } from "../../../api/apiProduct";
import { useDispatch, useSelector } from "react-redux";
import { apiGetAllColors } from "../../../api/apiColor";
import { apiGetAllSizes } from "../../../api/apiSize";
import { apiCreateDetails } from "../../../api/apiDetail";
import { apiUploadImages } from "../../../api/apiUpload";
import { apiCreateImages } from "../../../api/apiImage";
const ProductModal = ({ open, handleClose }) => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState("");
  const [colorSelected, setColorSelected] = useState("");
  const [size, setSize] = useState("");
  const [amount, setAmount] = useState(0);
  const [details, setDetails] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);

  const editorRef = useRef(null);

  useEffect(() => {
    const callApi = async () => {
      const data1 = await apiGetAllCategories();
      setCategories(data1);
      const data2 = await apiGetAllColors();
      setColors(data2);
      const data3 = await apiGetAllSizes();
      setSizes(data3);
    };
    callApi();
  }, []);

  const handleAddProduct = async () => {
    const data = await apiCreateProduct(
      user,
      {
        category_id: category.id,
        name: name,
        price: parseInt(price),
        description: editorRef.current.getContent(),
      },
      dispatch
    );
    await apiCreateDetails(
      details.map((item) => ({
        color_id: item.color.id,
        size_id: item.size.id,
        amount: item.amount,
        product_id: data.id,
        sku: `${category.code}${`000${data.id}`.slice(-4)}-${item.color.code}-${
          item.size.code
        }`,
      }))
    );
    // Không dám async await trong for
    let formData = new FormData();
    for (const image of images) {
      formData.append("images", image.file);
    }
    const arrUrls = await apiUploadImages(formData);
    console.log(arrUrls);
    await apiCreateImages(
      arrUrls.map((url, index) => ({
        product_id: data.id,
        color_id: images[index].color.id,
        url: url.secure_url,
      }))
    );
  };
  const handleSelectDetail = () => {
    const newDetails = [...details];
    const index = newDetails.findIndex(
      (item) =>
        JSON.stringify(item.color) === color &&
        JSON.stringify(item.size) === size
    );
    if (index === -1) {
      newDetails.push({
        color: JSON.parse(color),
        size: JSON.parse(size),
        amount: parseInt(amount),
      });
    } else {
      newDetails[index].amount = amount;
    }
    setDetails(newDetails);
  };

  const handleDeselectDetail = (detail) => {
    const newDetails = [...details].filter(
      (item) =>
        item.color.id !== detail.color.id || item.size.id !== detail.size.id
    );
    setDetails(newDetails);
  };

  const handleSelectImages = (e) => {
    const files = e.target.files;
    const _color = JSON.parse(colorSelected);
    let newImages = [...images].filter((item) => item.color.id !== _color.id);
    for (const file of files) {
      newImages.push({ color: _color, file });
    }
    setImages(newImages);
    // apiUploadImages(formData);
  };

  const handleDeselectImages = (color) => {
    const newImages = [...images].filter((item) => item.color.id !== color.id);
    setDetails(newImages);
  };

  console.log(images);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 800,
          height: 600,
          transform: "translate(-50%, -50%)",
          bgcolor: "#fff",
          boxShadow: 24,
          p: 2,
          outline: "none",
          overflowX: "hidden",
        }}
      >
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h4">Thêm sản phẩm</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="category">Danh mục</InputLabel>
              <Select
                labelId="category"
                id="category"
                label="Danh mục"
                name="category"
                value={category === "" ? "" : JSON.stringify(category)}
                onChange={(e) => setCategory(JSON.parse(e.target.value))}
              >
                {category === "" && (
                  <MenuItem value={""}>Chọn danh mục</MenuItem>
                )}
                {categories.map((item) => {
                  return (
                    <MenuItem value={JSON.stringify(item)} key={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="name"
                label="Tên sản phẩm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                id="price"
                label="Giá"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue="<p>Mô tả sản phẩm</p>"
              apiKey="indwv4av23yq82wi3287w99kyjhpog9esio9z4tzzabp86w1"
              init={{
                height: 300,
                apiKey: "indwv4av23yq82wi3287w99kyjhpog9esio9z4tzzabp86w1",
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center" marginBottom="4px">
              Chi tiết
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="color">Màu sắc</InputLabel>
              <Select
                labelId="color"
                id="color"
                defaultValue={""}
                label="Màu sắc"
                name="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <MenuItem value={""}>Chọn màu sắc</MenuItem>
                {colors.map((item) => {
                  return (
                    <MenuItem value={JSON.stringify(item)} key={item.id}>
                      {item.value}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="size">Kích cỡ</InputLabel>
              <Select
                labelId="size"
                id="size"
                defaultValue={""}
                label="Kích cỡ"
                name="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <MenuItem value={""}>Chọn kích cỡ</MenuItem>
                {sizes.map((item) => {
                  return (
                    <MenuItem value={JSON.stringify(item)} key={item.id}>
                      {item.value}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                id="amount"
                label="Số lượng"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} display="flex" flexWrap="wrap" alignItems="center">
            <Typography variant="body2" whiteSpace="nowrap">
              Đã chọn:{" "}
            </Typography>
            {details.map((detail) => (
              <Chip
                sx={{ marginBottom: "4px", marginRight: "4px" }}
                size="small"
                key={Math.random()}
                label={`${detail.color.value} - ${detail.size.value} - ${detail.amount}`}
                onClick={() => handleDeselectDetail(detail)}
              />
            ))}
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button variant={"outlined"} onClick={() => handleSelectDetail()}>
              Chọn chi tiết này
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center" marginBottom="4px">
              Hình ảnh
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="colorSelected">Màu sắc</InputLabel>
              <Select
                labelId="colorSelected"
                id="colorSelected"
                defaultValue={""}
                label="Màu sắc"
                name="colorSelected"
                value={colorSelected}
                onChange={(e) => setColorSelected(e.target.value)}
              >
                <MenuItem value={""}>Chọn màu sắc</MenuItem>
                {colors.map((item) => {
                  return (
                    <MenuItem value={JSON.stringify(item)} key={item.id}>
                      {item.value}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant={"outlined"} component="label">
              Chọn hình
              <input
                type="file"
                name="images"
                id="images"
                multiple
                hidden
                onChange={handleSelectImages}
              />
            </Button>
          </Grid>
          <Grid item xs={12} display="flex" flexWrap="wrap" alignItems="center">
            <Typography variant="body2" whiteSpace="nowrap">
              Đã chọn:{" "}
            </Typography>
            {colors.map((color) => {
              const _images = images.filter(
                (item) => item.color.id === color.id
              );
              if (_images.length > 0) {
                return (
                  <Chip
                    sx={{ marginBottom: "4px", marginRight: "4px" }}
                    size="small"
                    key={Math.random()}
                    label={`${color.value} - ${_images.length} hình`}
                    onClick={() => handleDeselectImages(color)}
                  />
                );
              } else return "";
            })}
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button variant={"contained"} onClick={() => handleAddProduct()}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ProductModal;
