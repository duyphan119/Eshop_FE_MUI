import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { apiGetAllCategories } from "../../../api/apiCategory";
import { apiCreateProduct } from "../../../api/apiProduct";
import { apiUploadImages } from "../../../api/apiUpload";
import { apiCreateProductColors } from "../../../api/apiProductColor";
import { apiCreateProductColorSizes } from "../../../api/apiProductColorSize";
import {
  apiCreateProductColorImage,
  apiCreateProductColorImages,
} from "../../../api/apiProductColorImage";
const AddProductForm = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [indexTab, setIndexTab] = React.useState(0);
  const [categories, setCategories] = React.useState([]);
  const [colors, setColors] = React.useState([]);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [categoryId, setCategoryId] = React.useState(0);
  const [file, setFile] = React.useState();

  const handleChange = (event, newValue) => {
    setIndexTab(newValue);
  };

  React.useEffect(() => {
    const callApi = async () => {
      const data = await apiGetAllCategories();
      setCategories(data);
      setCategoryId(data[0].id);
    };
    callApi();
  }, []);

  console.log("add form re-render");

  const handleAddNewColor = async () => {
    const formData = new FormData(document.getElementById("form"));
    const color = formData.get("color");
    const thumbnail = formData.get("thumbnail");
    setColors([
      ...colors,
      { color, thumbnail, color_code: "#000", images: [], sizes: [] },
    ]);
    console.log({ color, thumbnail });
    if (2 > 3) {
      await apiCreateProduct(user, {}, dispatch);
    }
  };

  const handleNewSize = () => {
    const formData = new FormData(document.getElementById("form"));
    const size_text = formData.get("size_text");
    const amount = formData.get("amount");
    const selectedColorOfSize = formData.get("selectedColorOfSize");
    let arrColors = [...colors];
    const index = arrColors.findIndex(
      (element) => element.color === selectedColorOfSize
    );
    if (index !== -1) {
      let arrSizes = [...arrColors[index].sizes];
      const indexSize = arrSizes.findIndex(
        (element) => element.size_text === size_text
      );
      if (indexSize === -1) {
        arrColors[index].sizes.push({
          size_text,
          size_value: arrColors[index].sizes.length,
          amount,
        });
      } else {
        arrColors[index].sizes[indexSize].amount = amount;
      }
      setColors(arrColors);
    }
  };

  console.log(colors);

  const handleNewImages = () => {
    //
    const formData = new FormData(document.getElementById("form"));
    const images = formData.getAll("images");
    const selectedColorOfImages = formData.get("selectedColorOfImages");
    let arrColors = [...colors];
    const index = arrColors.findIndex(
      (element) => element.color === selectedColorOfImages
    );
    if (index !== -1) {
      arrColors[index].images = images;
      setColors(arrColors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ name, price, categoryId, colors });

    const createdProduct = await apiCreateProduct(
      user,
      { name, price, category_id: categoryId },
      dispatch
    );

    const formDataThumbnails = new FormData();
    colors.forEach((element) => {
      formDataThumbnails.append("images", element.thumbnail);
    });

    const uploadedThumbnails = await apiUploadImages(formDataThumbnails);

    const createdProductColors = await apiCreateProductColors(
      user,
      colors.map((element, index) => {
        return {
          product_id: createdProduct.id,
          thumbnail: uploadedThumbnails[index],
          color: element.color,
          color_code: element.color_code,
        };
      }),
      dispatch
    );
    console.log(createdProductColors);

    createdProductColors.forEach(async (element, index) => {
      await apiCreateProductColorSizes(
        user,
        colors[index].sizes.map((elm) => {
          return {
            product_color_id: element.id,
            size_text: elm.size_text,
            size_value: elm.size_value,
            amount: elm.amount,
          };
        }),
        dispatch
      );

      await apiCreateProductColorImage(
        user,
        {
          product_color_id: element.id,
          url: element.thumbnail,
        },
        dispatch
      );

      const formDataImages = new FormData();
      colors[index].images.forEach((file) => {
        if (file.name !== colors[index].thumbnail.name) {
          formDataImages.append("images", file);
        }
      });

      const uploadedImages = await apiUploadImages(formDataImages);

      await apiCreateProductColorImages(
        user,
        uploadedImages.map((elm) => {
          return {
            product_color_id: element.id,
            url: elm,
          };
        }),
        dispatch
      );
    });
  };

  return (
    <form onSubmit={handleSubmit} id="form">
      <Box bgcolor="#fff" height={600} pb={7} position="relative">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={indexTab}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Chung" {...a11yProps(0)} />
            <Tab label="Màu sắc" {...a11yProps(1)} />
            <Tab label="Kích cỡ" {...a11yProps(2)} />
            <Tab label="Hình ảnh" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={indexTab} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {categories.length !== 0 && (
                <FormControl fullWidth>
                  <InputLabel id="select-categories">Danh mục</InputLabel>
                  <Select
                    labelId="select-categories"
                    id="select-categories"
                    value={categoryId === "" ? categories[0].id : categoryId}
                    label="Danh mục"
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    {categories &&
                      categories.map((item) => {
                        return (
                          <MenuItem value={item.id} key={item.id}>
                            {item.full_name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              )}
            </Grid>
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
                  name="price"
                  label="Giá"
                  variant="outlined"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={indexTab} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex">
              <Box
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl fullWidth>
                  <TextField
                    id="color"
                    label="Màu sắc"
                    variant="outlined"
                    name="color"
                    defaultValue={""}
                  />
                </FormControl>
                <label
                  htmlFor="color-img"
                  style={{
                    marginBlock: "8px",
                    height: 152,
                    width: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #666",
                    cursor: "pointer",
                  }}
                >
                  {file ? (
                    <img
                      src={URL.createObjectURL(file)}
                      width={120}
                      height={150}
                      style={{ objectFit: "cover" }}
                      alt=""
                    />
                  ) : (
                    "Chọn hình ảnh"
                  )}
                </label>
                <input
                  type="file"
                  name="thumbnail"
                  id="color-img"
                  hidden
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <Button onClick={handleAddNewColor}>Thêm</Button>
              </Box>
              <TableContainer
                sx={{ ml: 3, maxHeight: "540px", overflowY: "auto" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        STT
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Tên Màu
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Xem trước
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Hành động
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[...colors].reverse().map((element, index) => (
                      <TableRow key={Math.random()}>
                        <TableCell sx={{ textAlign: "center" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {element.color}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          <img
                            src={URL.createObjectURL(element.thumbnail)}
                            height={80}
                            width={60}
                            style={{ objectFit: "cover" }}
                            alt=""
                          />
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {element.isNew ? (
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                            >
                              Xoá
                            </Button>
                          ) : (
                            <Button
                              size="small"
                              variant="outlined"
                              color="secondary"
                            >
                              Sửa
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={indexTab} index={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex">
              <Box
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {colors.length !== 0 && (
                  <FormControl fullWidth>
                    <InputLabel id="select-color-size">Màu sắc</InputLabel>
                    <Select
                      labelId="select-colors-size"
                      id="select-colors-size"
                      defaultValue={colors[0].color}
                      label="Màu sắc"
                      name="selectedColorOfSize"
                    >
                      {colors.map((element) => {
                        return (
                          <MenuItem value={element.color} key={element.color}>
                            {element.color}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}
                <FormControl fullWidth sx={{ marginTop: "8px" }}>
                  <TextField
                    id="size_text"
                    name="size_text"
                    label="Kích cỡ"
                    variant="outlined"
                    defaultValue={""}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ marginTop: "8px" }}>
                  <TextField
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    id="amount"
                    label="Số lượng"
                    variant="outlined"
                    name="amount"
                    defaultValue={0}
                  />
                </FormControl>
                <Button onClick={handleNewSize}>Thêm</Button>
              </Box>
              <TableContainer
                sx={{ ml: 3, maxHeight: "540px", overflowY: "auto" }}
                className="custom-scrollbar"
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        STT
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Màu sắc
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Kích cỡ
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Số lượng
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Hành động
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(() => {
                      let arr = [];
                      colors.forEach((element, index1) => {
                        element.sizes.forEach((size, index2) => {
                          arr.push(
                            <TableRow key={index1 + index2 + Math.random()}>
                              <TableCell sx={{ textAlign: "center" }}>
                                {arr.length + 1}
                              </TableCell>
                              <TableCell sx={{ textAlign: "center" }}>
                                {element.color}
                              </TableCell>
                              <TableCell sx={{ textAlign: "center" }}>
                                {size.size_text}
                              </TableCell>
                              <TableCell sx={{ textAlign: "center" }}>
                                {size.amount}
                              </TableCell>
                              <TableCell sx={{ textAlign: "center" }}>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  color="error"
                                >
                                  Xoá
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        });
                      });
                      return arr;
                    })()}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={indexTab} index={3}>
          <Grid
            container
            spacing={2}
            // sx={{ ml: 3, maxHeight: "540px", overflowY: "auto" }}
          >
            <Grid item xs={12} display="flex">
              <Box
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {colors.length !== 0 && (
                  <FormControl fullWidth>
                    <InputLabel id="select-colors-images">Màu sắc</InputLabel>
                    <Select
                      labelId="select-colors-images"
                      id="select-colors-images"
                      defaultValue={colors[0].color}
                      label="Màu sắc"
                      name="selectedColorOfImages"
                    >
                      {colors.map((element) => {
                        return (
                          <MenuItem value={element.color} key={element.color}>
                            {element.color}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}

                <label
                  htmlFor="product-color-images"
                  style={{
                    padding: "4px 12px",
                    backgroundColor: "#12f",
                    marginBlock: "8px",
                    color: "#fff",
                    cursor: "pointer",
                    zIndex: "1",
                  }}
                >
                  Chọn hình
                </label>
                <input
                  type="file"
                  id="product-color-images"
                  multiple={true}
                  hidden
                  name="images"
                />
                <Button onClick={handleNewImages}>Thêm</Button>
                {colors.map((element, index) => {
                  return (
                    <React.Fragment key={Math.random() + index}>
                      {element.images.length !== 0 && (
                        <Typography>Màu sắc: {element.color}</Typography>
                      )}
                      <Grid container rowSpacing={2} columnSpacing={2}>
                        {element.images.length !== 0 &&
                          element.images.map((file) => (
                            <Grid item xs={2} key={Math.random()}>
                              <img
                                src={URL.createObjectURL(file)}
                                width="100%"
                                alt=""
                              />
                            </Grid>
                          ))}
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
        <div
          style={{
            position: "absolute",
            bottom: "4px",
            left: 0,
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button type="submit">Xác nhận</Button>
        </div>
      </Box>
    </form>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default AddProductForm;
