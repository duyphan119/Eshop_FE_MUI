import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Container,
  Grid,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  TextField,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { apiCreateProduct } from "../api/apiProduct";
import { apiCreateProductColors } from "../api/apiProductColor";
import { apiCreateProductColorSizes } from "../api/apiProductColorSize";
import { apiCreateProductColorImages } from "../api/apiProductColorImage";
import { apiUploadImages } from "../api/apiUpload";
import { apiGetAllCategories } from "../api/apiCategory";
import { showToastMessage } from "../redux/toastSlice";

const steps = ["Thông tin mặt hàng", "Màu sắc", "Kích cỡ", "Hình ảnh khác"];
const AddProductFormPage = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [thumbnail, setThumbnail] = useState();
  const [sizeText, setSizeText] = useState("");
  const [sizeValue, setSizeValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [colors, setColors] = useState([]);
  const [colorSelected, setColorSelected] = useState("");
  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    document.title = "Thêm sản phẩm";
  }, []);

  useEffect(() => {
    const callApi = async () => {
      const data = await apiGetAllCategories();
      setCategories(data);
    };
    callApi();
  }, []);

  useEffect(() => {
    if (colorSelected === "" && colors.length > 0) {
      setColorSelected(colors[0].color);
    }
  }, [colors, colorSelected]);

  console.log(colors);

  const handleAdd = async () => {
    // Đầu tiên là tạo product trước
    const product = await apiCreateProduct(
      user,
      { name, price, category_id: categoryId },
      dispatch
    );
    console.log("Sau khi tao product", product);
    // Tạo product_colors theo product_id của product ở trên
    const formData = new FormData();
    colors.forEach((item) => {
      formData.append("images", item.thumbnail);
    });
    const uploadedImages = await apiUploadImages(formData);
    console.log("Sau khi upload cac thumbnail colors", uploadedImages);
    const product_colors = await apiCreateProductColors(
      user,
      colors.map((item, index) => {
        return {
          color: item.color,
          color_code: item.colorCode,
          product_id: product.id,
          thumbnail: uploadedImages[index],
        };
      }),
      dispatch
    );
    console.log("Sau khi tao colors", product_colors);
    // Lặp qua từng product_colors để thêm product_color_sizes và product_color_images
    for (const product_color of product_colors) {
      // Tạo nhiều product_color_size cùng 1 lúc
      const _Sizes = [...sizes]
        .filter((el) => el.colorSelected === product_color.color)
        .map((item) => {
          return {
            product_color_id: product_color.id,
            size_text: item.sizeText,
            size_value: item.sizeValue,
            amount: item.amount,
          };
        });
      await apiCreateProductColorSizes(user, _Sizes, dispatch);
      // Upload các hình lên cloudinary
      const formData = new FormData();

      formData.append(
        "images",
        colors.find((it) => it.color === product_color.color).thumbnail
      );

      const _imgs = images.find(
        (el) => el.colorSelected === product_color.color
      );

      for (const file of _imgs.imgs) {
        formData.append("images", file);
      }
      const uploadedImages = await apiUploadImages(formData);
      // Tạo nhiều product_color_image cùng 1 lúc
      console.log("Sau khi upload cac image", uploadedImages);
      await apiCreateProductColorImages(
        user,
        uploadedImages.map((item, index) => {
          return {
            product_color_id: product_color.id,
            url: item,
          };
        }),
        dispatch
      );
    }
    dispatch(
      showToastMessage({
        type: "success",
        text: "Thêm sản phẩm thành công",
        isOpen: true,
      })
    );
  };

  return (
    <Box sx={{ paddingBlock: "20px" }}>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Stepper activeStep={currentStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
        <Grid container rowSpacing={2} columnSpacing={2}>
          {currentStep === 0 && (
            <>
              {categories.length > 0 && (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="select-categories">Danh mục</InputLabel>
                    <Select
                      labelId="select-categories"
                      id="select-categories"
                      value={categoryId === 0 ? categories[0].id : categoryId}
                      label="Danh mục"
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      {categories.map((item) => {
                        return (
                          <MenuItem value={item.id} key={item.id}>
                            {item.full_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="name"
                    label="Tên"
                    variant="outlined"
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
                    variant="outlined"
                    value={price}
                    onChange={(e) =>
                      setPrice(
                        isNaN(parseInt(e.target.value))
                          ? 0
                          : parseInt(e.target.value)
                      )
                    }
                  />
                </FormControl>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  disabled={name === "" || price === 0}
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Tiếp
                </Button>
              </Grid>
            </>
          )}
          {currentStep === 1 && (
            <>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="color"
                    label="Tên màu"
                    variant="outlined"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="color_code"
                    label="Mã màu"
                    variant="outlined"
                    value={colorCode}
                    onChange={(e) => setColorCode(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  marginTop: "8px",
                }}
              >
                <label
                  htmlFor="upload-file"
                  style={{
                    backgroundColor: "var(--main-color)",
                    padding: "5px 10px",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    color: "#fff",
                    borderRadius: "5px",
                  }}
                >
                  Chọn hình xem trước
                </label>
                <input
                  type="file"
                  hidden
                  id="upload-file"
                  height={200}
                  onChange={(e) => {
                    setThumbnail(e.target.files[0]);
                  }}
                />
              </Grid>
              {thumbnail && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    marginTop: "8px",
                  }}
                >
                  <img
                    src={URL.createObjectURL(thumbnail)}
                    alt={""}
                    style={{
                      width: "calc(100% - 10px)",
                    }}
                  />
                </Grid>
              )}
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    setColors([
                      ...colors,
                      {
                        color: color,
                        colorCode: colorCode,
                        thumbnail: thumbnail,
                      },
                    ]);
                    if (colors.length === 1) {
                      setColorSelected(color);
                    }
                  }}
                >
                  Thêm màu mới
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6">Đã thêm</Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="center">Tên Màu</TableCell>
                        <TableCell align="center">Mã màu</TableCell>
                        <TableCell align="center">Xem trước</TableCell>
                        <TableCell align="center">Hành động</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {colors.map((color, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" align="center">
                            {index + 1}
                          </TableCell>
                          <TableCell align="center">{color.color}</TableCell>
                          <TableCell align="center">
                            {color.colorCode}
                          </TableCell>
                          <TableCell align="center">
                            <img src={color.thumbnail} alt="" width={80} />
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() =>
                                setColors(
                                  [...colors].filter(
                                    (item) =>
                                      item.color !== color.color ||
                                      item.colorCode !== color.colorCode ||
                                      item.thumbnail.name !==
                                        color.thumbnail.name
                                  )
                                )
                              }
                            >
                              Xoá
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    marginRight: "2px",
                  }}
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Quay lại
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={colors.length === 0}
                  sx={{
                    marginLeft: "2px",
                  }}
                >
                  Tiếp
                </Button>
              </Grid>
            </>
          )}
          {currentStep === 2 && (
            <>
              {colors.length > 0 && (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="select-colors">Tên màu</InputLabel>
                    <Select
                      labelId="select-colors"
                      id="select-colors"
                      value={
                        colorSelected === "" ? colors[0].color : colorSelected
                      }
                      label="Tên màu"
                      onChange={(e) => setColorSelected(e.target.value)}
                    >
                      {colors.map((item) => {
                        return (
                          <MenuItem value={item.color} key={item.color}>
                            {item.color}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="sizeText"
                    label="Tên kích cỡ"
                    variant="outlined"
                    value={sizeText}
                    onChange={(e) => setSizeText(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    id="sizeValue"
                    label="Giá trị kích cỡ"
                    variant="outlined"
                    value={sizeValue}
                    onChange={(e) => setSizeValue(parseInt(e.target.value))}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    id="amount"
                    label="Số lượng tồn"
                    variant="outlined"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    setSizes([
                      ...sizes,
                      {
                        sizeText,
                        sizeValue,
                        amount,
                        colorSelected,
                      },
                    ]);
                  }}
                >
                  Thêm kích cỡ mới
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6">Đã thêm</Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="center">Màu</TableCell>
                        <TableCell align="center">Tên kích cỡ</TableCell>
                        <TableCell align="center">Giá trị kích cỡ</TableCell>
                        <TableCell align="center">Tồn kho</TableCell>
                        <TableCell align="center">Hành động</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sizes.map((size, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" align="center">
                            {index + 1}
                          </TableCell>
                          <TableCell align="center">
                            {size.colorSelected}
                          </TableCell>
                          <TableCell align="center">{size.sizeText}</TableCell>
                          <TableCell align="center">{size.sizeValue}</TableCell>
                          <TableCell align="center">{size.amount}</TableCell>
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() =>
                                setSizes(
                                  [...sizes].filter(
                                    (item) =>
                                      item.colorSelected !==
                                        size.colorSelected ||
                                      item.sizeText !== size.sizeText ||
                                      item.sizeValue !== size.sizeValue ||
                                      item.amount !== size.amount
                                  )
                                )
                              }
                            >
                              Xoá
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    marginRight: "2px",
                  }}
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Quay lại
                </Button>
                <Button
                  variant="contained"
                  disabled={sizes.length === 0}
                  sx={{
                    marginLeft: "2px",
                  }}
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Tiếp
                </Button>
              </Grid>
            </>
          )}
          {currentStep === 3 && (
            <>
              {colors.length > 0 && (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="select-colors">Tên màu</InputLabel>
                    <Select
                      labelId="select-colors"
                      id="select-colors"
                      value={
                        colorSelected === "" ? colors[0].color : colorSelected
                      }
                      label="Tên màu"
                      onChange={(e) => setColorSelected(e.target.value)}
                    >
                      {colors.map((item) => {
                        return (
                          <MenuItem value={item.color} key={item.color}>
                            {item.color}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              )}

              <Grid
                item
                xs={12}
                sx={{
                  marginTop: "8px",
                }}
              >
                <label
                  htmlFor="upload-file"
                  style={{
                    backgroundColor: "var(--main-color)",
                    padding: "5px 10px",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    color: "#fff",
                    borderRadius: "5px",
                  }}
                >
                  Chọn các hình ảnh tương tụ
                </label>
                <input
                  type="file"
                  hidden
                  id="upload-file"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files;
                    const _images = [];
                    for (let i = 0; i < files.length; i++) {
                      _images.push(files[i]);
                    }
                    setSelectedImages(_images);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container sx={{ marginTop: "10px" }}>
                  {selectedImages.map((item, index) => {
                    return (
                      <Grid item xs={2} key={index}>
                        <>{index}</>
                        <br />
                        <img
                          src={URL.createObjectURL(item)}
                          alt={index}
                          style={{
                            width: "calc(100% - 10px)",
                          }}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    const _images = [...images];
                    const i = _images.findIndex(
                      (item) => item.colorSelected === colorSelected
                    );
                    if (i === -1) {
                      _images.push({
                        colorSelected,
                        imgs: selectedImages,
                      });
                    } else {
                      _images[i] = {
                        colorSelected,
                        imgs: selectedImages,
                      };
                    }
                    setImages(_images);
                    setSelectedImages([]);
                  }}
                >
                  Thêm danh sách ảnh mới
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    marginRight: "2px",
                  }}
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Quay lại
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    marginLeft: "2px",
                  }}
                  onClick={handleAdd}
                >
                  Hoàn tất thêm
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default AddProductFormPage;
