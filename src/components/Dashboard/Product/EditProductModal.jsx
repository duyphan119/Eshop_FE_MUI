import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const EditProductModal = ({ open, handleClose, item, categories }) => {
  const [indexTab, setIndexTab] = React.useState(0);
  const [colors, setColors] = React.useState(item ? item.product_colors : []);
  const [thumbnail, setThumbnail] = React.useState();

  const handleChange = (event, newValue) => {
    setIndexTab(newValue);
  };

  const handleAddNewColor = () => {
    const formData = new FormData(document.getElementById("form"));
    const color = formData.get("color");
    const thumbnail = formData.get("thumbnail");
    setColors([...colors, { color, thumbnail, isNew: true }]);
    console.log({ color, thumbnail });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const price = formData.get("price");
    const categoryId = formData.get("categoryId");
    console.log({ name, price, categoryId });
    // handleClose();
  };

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
          maxWidth: 1200,
          transform: "translate(-50%, -50%)",
          bgcolor: "#fff",
          boxShadow: 24,
          p: 2,
          outline: "none",
          overflowX: "hidden",
        }}
      >
        <form onSubmit={handleSubmit} id="form">
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
                      defaultValue={
                        item && item.category
                          ? item.category.id
                          : categories[0].id
                      }
                      label="Danh mục"
                      name="categoryId"
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
                    name="name"
                    defaultValue={item ? item.name : ""}
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
                    defaultValue={item ? item.price : 0}
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
                    {thumbnail ? (
                      <img
                        src={URL.createObjectURL(thumbnail)}
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
                    onChange={(e) => setThumbnail(e.target.files[0])}
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
                        <TableRow key={index + Math.random()}>
                          <TableCell sx={{ textAlign: "center" }}>
                            {index + 1}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {element.color}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <img
                              src={
                                element.isNew
                                  ? URL.createObjectURL(element.thumbnail)
                                  : element.thumbnail
                              }
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
                  {item?.product_colors?.length !== 0 && (
                    <FormControl fullWidth>
                      <InputLabel id="select-categories">Màu sắc</InputLabel>
                      <Select
                        labelId="select-categories"
                        id="select-categories"
                        defaultValue={
                          item &&
                          item.product_colors &&
                          item.product_colors.length !== 0
                            ? item.product_colors[0].id
                            : ""
                        }
                        label="Màu sắc"
                        onChange={(e) => {}}
                      >
                        {item?.product_colors?.map((product_color) => {
                          return (
                            <MenuItem
                              value={product_color.id}
                              key={product_color.id}
                            >
                              {product_color.color}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  )}
                  <FormControl fullWidth sx={{ marginTop: "8px" }}>
                    <TextField
                      id="size"
                      label="Kích cỡ"
                      variant="outlined"
                      value={""}
                      onChange={
                        (e) => {}
                        // setPrice(
                        //   isNaN(parseInt(e.target.value))
                        //     ? 0
                        //     : parseInt(e.target.value)
                        // )
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ marginTop: "8px" }}>
                    <TextField
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      id="amount"
                      label="Số lượng"
                      variant="outlined"
                      value={""}
                      onChange={
                        (e) => {}
                        // setPrice(
                        //   isNaN(parseInt(e.target.value))
                        //     ? 0
                        //     : parseInt(e.target.value)
                        // )
                      }
                    />
                  </FormControl>
                  <Button>Thêm</Button>
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
                        item?.product_colors?.forEach(
                          (product_color, index1) => {
                            product_color?.product_color_sizes?.forEach(
                              (product_color_size, index2) => {
                                arr.push(
                                  <TableRow
                                    key={index1 + index2 + Math.random()}
                                  >
                                    <TableCell sx={{ textAlign: "center" }}>
                                      {arr.length + 1}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                      {product_color.color}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                      {product_color_size.size_text}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                      {product_color_size.amount}
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
                              }
                            );
                          }
                        );
                        return arr;
                      })()}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={indexTab} index={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} display="flex">
                <Box
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "720px",
                  }}
                >
                  {item?.product_colors?.length !== 0 && (
                    <FormControl fullWidth>
                      <InputLabel id="select-categories">Màu sắc</InputLabel>
                      <Select
                        labelId="select-categories"
                        id="select-categories"
                        defaultValue={
                          item &&
                          item.product_colors &&
                          item.product_colors.length !== 0
                            ? item.product_colors[0].id
                            : ""
                        }
                        label="Màu sắc"
                        onChange={(e) => {}}
                      >
                        {item?.product_colors?.map((product_color) => {
                          return (
                            <MenuItem
                              value={product_color.id}
                              key={product_color.id}
                            >
                              {product_color.color}
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
                    multiple
                    hidden
                  />
                  <Grid container rowSpacing={2} columnSpacing={2}>
                    {item?.product_colors?.length !== 0
                      ? item?.product_colors[2]?.product_color_images?.map(
                          (product_color_image) => (
                            <Grid item xs={2} key={product_color_image.url}>
                              <img
                                src={product_color_image.url}
                                width="100%"
                                alt=""
                              />
                            </Grid>
                          )
                        )
                      : new Array(6).fill(1).map((el) => (
                          <Grid item xs={2} key={Math.random()}>
                            <Box
                              sx={{ height: 120, border: "1px solid #000" }}
                            ></Box>
                          </Grid>
                        ))}
                  </Grid>
                  <Button>Thêm</Button>
                  <Typography>Màu sắc: Vàng</Typography>
                  <Grid container rowSpacing={2} columnSpacing={2}>
                    {item?.product_colors?.length !== 0 &&
                      item?.product_colors[2]?.product_color_images?.map(
                        (product_color_image) => (
                          <Grid item xs={2} key={product_color_image.url}>
                            <img
                              src={product_color_image.url}
                              width="100%"
                              alt=""
                            />
                          </Grid>
                        )
                      )}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
          <div style={{ textAlign: "right" }}>
            <Button type="submit">Xác nhận</Button>
          </div>
        </form>
      </Box>
    </Modal>
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

export default EditProductModal;
