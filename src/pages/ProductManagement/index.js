import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tab, Tabs, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../components/ConfirmDialog";
import ModalAddProduct from "../../components/ModalAddProduct";
import ModalColor from "../../components/ModalColor";
import ModalMaterial from "../../components/ModalMaterial";
import ModalSize from "../../components/ModalSize";
import { CustomTableCell } from "../../components/TableCell";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import {
  API_CATEGORY_URL,
  API_COLOR_URL,
  API_IMAGE_URL,
  API_MATERIAL_URL,
  API_PRODUCT_DETAIL_URL,
  API_PRODUCT_MATERIAL_URL,
  API_PRODUCT_URL,
  API_SIZE_URL,
  API_UPLOAD_URL,
  LIMIT_ROW_COLOR,
  LIMIT_ROW_MATERIAL,
  LIMIT_ROW_PRODUCT,
  LIMIT_ROW_SIZE,
} from "../../constants";
import { getAll as getAllCategories } from "../../redux/categorySlice";
import {
  getAll as getAllColors,
  getCurrentColor,
} from "../../redux/colorSlice";
import {
  getAll as getAllMaterials,
  getCurrentMaterial,
} from "../../redux/materialSlice";
import { getAll as getAllSizes, getCurrentSize } from "../../redux/sizeSlice";
import { formatThousandDigits } from "../../utils";

const useStyles = makeStyles({
  sticky: {
    position: "sticky",
    right: 0,
    backgroundColor: "#fff",
  },
});

const ProductManagement = () => {
  const classes = useStyles();

  const user = useSelector((state) => state.auth.currentUser);
  const colors = useSelector((state) => state.color.all);
  const currentColor = useSelector((state) => state.color.current);
  const sizes = useSelector((state) => state.size.all);
  const currentSize = useSelector((state) => state.size.current);
  const materials = useSelector((state) => state.material.all);
  const currentMaterial = useSelector((state) => state.material.current);
  const dispatch = useDispatch();

  const [product, setProduct] = useState();
  const [currentProduct, setCurrentProduct] = useState();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [tab, setTab] = useState(0);
  const [openSize, setOpenSize] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const [openColor, setOpenColor] = useState(false);
  const [pageColor, setPageColor] = useState(0);
  const [openMaterial, setOpenMaterial] = useState(false);
  const [pageMaterial, setPageMaterial] = useState(0);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    text: "",
    onConfirm: () => {},
  });

  useEffect(() => {
    document.title = "Quản lý sản phẩm";
  }, []);

  useEffect(() => {
    (function () {
      const promiseCategory = new Promise((resolve, reject) => {
        resolve(configAxiosAll(user, dispatch).get(`${API_CATEGORY_URL}`));
      });
      const promiseColor = new Promise((resolve, reject) => {
        resolve(configAxiosAll(user, dispatch).get(`${API_COLOR_URL}`));
      });
      const promiseSize = new Promise((resolve, reject) => {
        resolve(configAxiosAll(user, dispatch).get(`${API_SIZE_URL}`));
      });
      const promiseMaterial = new Promise((resolve, reject) => {
        resolve(configAxiosAll(user, dispatch).get(`${API_MATERIAL_URL}`));
      });
      const promiseProduct = new Promise((resolve, reject) => {
        resolve(
          configAxiosAll(user, dispatch).get(
            `${API_PRODUCT_URL}?limit=${LIMIT_ROW_PRODUCT}&include=true&p=${
              page + 1
            }`
          )
        );
      });

      Promise.allSettled([
        promiseCategory,
        promiseColor,
        promiseSize,
        promiseMaterial,
        promiseProduct,
      ])
        .then((listRes) => {
          dispatch(getAllCategories(listRes[0].value));
          dispatch(getAllColors(listRes[1].value));
          dispatch(getAllSizes(listRes[2].value));
          dispatch(getAllMaterials(listRes[3].value));
          setProduct(listRes[4].value);
        })
        .catch((err) => console.log(err));
    })();
  }, [dispatch, user, page]);

  function handleOk(data) {
    const { name, price, description, category, details, materials, images } =
      data;
    configAxiosAll(user, dispatch)
      .post(`${API_PRODUCT_URL}`, {
        name,
        price,
        description,
        category_id: category.id,
      })
      .then((_product) => {
        let productImages = [];
        let formData = new FormData();
        images.forEach((image) => {
          image.files.forEach((file) => {
            console.log(file);
            formData.append("images", file);
            productImages.push({ color: image.color });
          });
        });

        configAxiosResponse()
          .post(`${API_UPLOAD_URL}`, formData)
          .then((urlList) => {
            const promises = [];
            if (materials.length > 0) {
              promises.push(
                new Promise((resolve, reject) =>
                  resolve(
                    configAxiosAll(user, dispatch).post(
                      `${API_PRODUCT_MATERIAL_URL}?many=true`,
                      materials.map((item) => ({
                        material_id: item.id,
                        product_id: _product.id,
                      }))
                    )
                  )
                )
              );
            }
            if (details.length > 0) {
              promises.push(
                new Promise((resolve, reject) =>
                  resolve(
                    configAxiosAll(user, dispatch).post(
                      `${API_PRODUCT_DETAIL_URL}?many=true`,
                      details.map((item) => ({
                        color_id: item.color.id,
                        size_id: item.size.id,
                        amount: item.amount,
                        product_id: _product.id,
                        sku: `${category.code}${`000${_product.id}`.slice(
                          -4
                        )}-${item.color.code}-${item.size.code}`,
                      }))
                    )
                  )
                )
              );
            }
            if (images.length > 0) {
              promises.push(
                new Promise((resolve, reject) =>
                  resolve(
                    configAxiosAll(user, dispatch).post(
                      `${API_IMAGE_URL}?many=true`,
                      urlList.map((url, index) => ({
                        product_id: _product.id,
                        url: url.secure_url,
                        color_id: productImages[index].color.id,
                      }))
                    )
                  )
                )
              );
            }
            Promise.allSettled(promises)
              .then(() => {
                setProduct({
                  ...product,
                  total_result: product.total_result + 1,
                  items: [
                    { ..._product, category },
                    [...product.items].splice(product.items.length - 1, 1),
                  ],
                  total_page: Math.ceil(product.total_result / product.limit),
                });
              })
              .catch((err) => {});
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  }

  function getMaterial(data) {
    const { value } = data;
    if (currentMaterial) {
      configAxiosAll(user, dispatch)
        .put(`${API_MATERIAL_URL}`, {
          id: currentMaterial,
          value,
        })
        .then((res) => {
          const _materials = [...materials];
          const index = _materials.findIndex(
            (el) => el.id === currentMaterial.id
          );
          if (index !== -1) {
            _materials[index] = res;
            dispatch(getAllMaterials(_materials));
          }
        })
        .catch((err) => {});
    } else {
      configAxiosAll(user, dispatch)
        .post(`${API_MATERIAL_URL}`, {
          value,
        })
        .then((res) => {
          dispatch(getAllMaterials([res, ...materials]));
        })
        .catch((err) => {});
    }
  }
  function getSize(data) {
    const { value, code } = data;
    if (currentSize) {
      configAxiosAll(user, dispatch)
        .put(`${API_SIZE_URL}`, {
          id: currentSize,
          value,
          code,
        })
        .then((res) => {
          const _sizes = [...sizes];
          const index = _sizes.findIndex((el) => el.id === currentSize.id);
          if (index !== -1) {
            _sizes[index] = res;
            dispatch(getAllSizes(_sizes));
          }
        })
        .catch((err) => {});
    } else {
      configAxiosAll(user, dispatch)
        .post(`${API_SIZE_URL}`, {
          value,
          code,
        })
        .then((res) => {
          dispatch(getAllSizes([res, ...sizes]));
        })
        .catch((err) => {});
    }
  }
  function getColor(data) {
    const { value, code } = data;
    if (currentColor) {
      configAxiosAll(user, dispatch)
        .put(`${API_COLOR_URL}`, {
          id: currentColor,
          value,
          code,
        })
        .then((res) => {
          const _colors = [...colors];
          const index = _colors.findIndex((el) => el.id === currentColor.id);
          if (index !== -1) {
            _colors[index] = res;
            dispatch(getAllColors(_colors));
          }
        })
        .catch((err) => {});
    } else {
      configAxiosAll(user, dispatch)
        .post(`${API_COLOR_URL}`, {
          value,
          code,
        })
        .then((res) => {
          dispatch(getAllColors([res, ...colors]));
        })
        .catch((err) => {});
    }
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#fff" }}>
        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          aria-label="basic tabs example"
        >
          <Tab label="Chất liệu" {...a11yProps(0)} />
          <Tab label="Màu sắc" {...a11yProps(1)} />
          <Tab label="Kích cỡ" {...a11yProps(2)} />
          <Tab label="Sản phẩm" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel index={0} value={tab}>
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => {
            dispatch(getCurrentMaterial(null));
            setOpenMaterial(true);
          }}
          startIcon={<AddIcon />}
        >
          Thêm chất liệu
        </Button>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 400 }} className="custom-scrollbar">
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <CustomTableCell header align="center">
                    ID
                  </CustomTableCell>
                  <CustomTableCell header align="center">
                    Tên chất liệu
                  </CustomTableCell>
                  <CustomTableCell className={classes.sticky}></CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...materials]
                  .splice(pageMaterial * LIMIT_ROW_MATERIAL, LIMIT_ROW_MATERIAL)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <CustomTableCell align="center">
                          {row.id}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {row.value}
                        </CustomTableCell>
                        <CustomTableCell className={classes.sticky}>
                          <Tooltip title="Sửa chất liệu">
                            <IconButton
                              size="small"
                              onClick={() => {
                                dispatch(getCurrentMaterial(row));
                                setOpenMaterial(true);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </CustomTableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {materials && (
            <TablePagination
              rowsPerPageOptions={[LIMIT_ROW_MATERIAL, 50, 100]}
              component="div"
              count={materials.length}
              rowsPerPage={LIMIT_ROW_MATERIAL}
              page={pageMaterial}
              onPageChange={(e, page) => {
                setPageMaterial(page);
              }}
            />
          )}
        </Paper>
      </TabPanel>
      <TabPanel index={1} value={tab}>
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => {
            dispatch(getCurrentColor(null));
            setOpenColor(true);
          }}
          startIcon={<AddIcon />}
        >
          Thêm màu sắc
        </Button>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 400 }} className="custom-scrollbar">
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <CustomTableCell header align="center">
                    ID
                  </CustomTableCell>
                  <CustomTableCell header align="center">
                    Tên màu sắc
                  </CustomTableCell>
                  <CustomTableCell header align="center">
                    SKU
                  </CustomTableCell>
                  <CustomTableCell className={classes.sticky}></CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...colors]
                  .splice(pageColor * LIMIT_ROW_COLOR, LIMIT_ROW_COLOR)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <CustomTableCell align="center">
                          {row.id}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {row.value}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {row.code}
                        </CustomTableCell>
                        <CustomTableCell className={classes.sticky}>
                          <Tooltip title="Sửa màu sắc">
                            <IconButton
                              size="small"
                              onClick={() => {
                                dispatch(getCurrentColor(row));
                                setOpenColor(true);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </CustomTableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {colors && (
            <TablePagination
              rowsPerPageOptions={[LIMIT_ROW_COLOR, 50, 100]}
              component="div"
              count={colors.length}
              rowsPerPage={LIMIT_ROW_COLOR}
              page={pageColor}
              onPageChange={(e, page) => {
                setPageColor(page);
              }}
            />
          )}
        </Paper>
      </TabPanel>
      <TabPanel index={2} value={tab}>
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => {
            dispatch(getCurrentSize(null));
            setOpenSize(true);
          }}
          startIcon={<AddIcon />}
        >
          Thêm kích cỡ
        </Button>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 400 }} className="custom-scrollbar">
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <CustomTableCell header align="center">
                    ID
                  </CustomTableCell>
                  <CustomTableCell header align="center">
                    Tên kích cỡ
                  </CustomTableCell>
                  <CustomTableCell header align="center">
                    SKU
                  </CustomTableCell>
                  <CustomTableCell className={classes.sticky}></CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...sizes]
                  .splice(pageSize * LIMIT_ROW_SIZE, LIMIT_ROW_SIZE)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <CustomTableCell align="center">
                          {row.id}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {row.value}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {row.code}
                        </CustomTableCell>
                        <CustomTableCell className={classes.sticky}>
                          <Tooltip title="Sửa màu sắc">
                            <IconButton
                              size="small"
                              onClick={() => {
                                dispatch(getCurrentSize(row));
                                setOpenSize(true);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </CustomTableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {sizes && (
            <TablePagination
              rowsPerPageOptions={[LIMIT_ROW_SIZE, 50, 100]}
              component="div"
              count={sizes.length}
              rowsPerPage={LIMIT_ROW_SIZE}
              page={pageSize}
              onPageChange={(e, page) => {
                setPageSize(page);
              }}
            />
          )}
        </Paper>
      </TabPanel>
      <TabPanel index={3} value={tab}>
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => {
            setCurrentProduct(null);
            setOpen(true);
          }}
          startIcon={<AddIcon />}
        >
          Thêm sản phẩm
        </Button>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 400 }} className="custom-scrollbar">
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <CustomTableCell header align="center">
                    ID
                  </CustomTableCell>
                  <CustomTableCell header align="center">
                    Danh mục
                  </CustomTableCell>
                  <CustomTableCell header align="center">
                    Tên sản phẩm
                  </CustomTableCell>
                  <CustomTableCell header align="center">
                    Giá
                  </CustomTableCell>
                  <CustomTableCell className={classes.sticky}></CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {product &&
                  product.items &&
                  product.items.map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <CustomTableCell align="center">
                          {row.id}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {row.category.name}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {row.name}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {formatThousandDigits(row.price)}
                        </CustomTableCell>
                        <CustomTableCell className={classes.sticky}>
                          <Tooltip title="Sửa sản phẩm">
                            <IconButton
                              size="small"
                              onClick={() => {
                                setCurrentProduct(row);
                                setOpen(true);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </CustomTableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {product && (
            <TablePagination
              rowsPerPageOptions={[LIMIT_ROW_PRODUCT, 50, 100]}
              component="div"
              count={product.total_result}
              rowsPerPage={LIMIT_ROW_PRODUCT}
              page={page}
              onPageChange={(e, page) => {
                setPage(page);
              }}
            />
          )}
        </Paper>
      </TabPanel>
      {confirmDialog.open && (
        <ConfirmDialog
          open={confirmDialog.open}
          title={confirmDialog.title}
          text={confirmDialog.text}
          onConfirm={confirmDialog.onConfirm}
          onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
        />
      )}

      {open && (
        <ModalAddProduct
          open={open}
          handleClose={() => setOpen(false)}
          labelOk={currentProduct ? "Sửa" : "Thêm"}
          title={currentProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
          isCloseAfterOk={true}
          width={900}
          handleOk={handleOk}
          product={currentProduct}
        />
      )}
      {openMaterial && (
        <ModalMaterial
          open={openMaterial}
          handleClose={() => setOpenMaterial(false)}
          labelOk={currentMaterial ? "Sửa" : "Thêm"}
          title={currentMaterial ? "Sửa chất liệu" : "Thêm chất liệu"}
          isCloseAfterOk={true}
          handleOk={getMaterial}
          material={currentMaterial}
        />
      )}
      {openSize && (
        <ModalSize
          open={openSize}
          handleClose={() => setOpenSize(false)}
          labelOk={currentSize ? "Sửa" : "Thêm"}
          title={currentSize ? "Sửa kích cỡ" : "Thêm kích cỡ"}
          isCloseAfterOk={true}
          handleOk={getSize}
          size={currentSize}
        />
      )}
      {openColor && (
        <ModalColor
          open={openColor}
          handleClose={() => setOpenColor(false)}
          labelOk={currentColor ? "Sửa" : "Thêm"}
          title={currentColor ? "Sửa màu sắc" : "Thêm màu sắc"}
          isCloseAfterOk={true}
          handleOk={getColor}
          color={currentColor}
        />
      )}
    </>
  );
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
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
      {value === index && (
        <Box sx={{ p: 3, bgcolor: "#fff" }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

export default ProductManagement;
