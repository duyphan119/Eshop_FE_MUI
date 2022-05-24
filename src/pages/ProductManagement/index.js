import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../components/ConfirmDialog";
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
  LIMIT_ROW_PRODUCT,
} from "../../constants";
import { getAll as getAllCategories } from "../../redux/categorySlice";
import { getAll as getAllSizes } from "../../redux/sizeSlice";
import { getAll as getAllColors } from "../../redux/colorSlice";
import { getAll as getAllMaterials } from "../../redux/materialSlice";
import { makeStyles } from "@mui/styles";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { formatThousandDigits } from "../../utils";
import ModalAddProduct from "../../components/ModalAddProduct";
import { CustomTableCell } from "../../components/TableCell";

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

  const dispatch = useDispatch();

  const [product, setProduct] = useState();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
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

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => setOpen(true)}
            startIcon={<AddIcon />}
          >
            Thêm sản phẩm
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ height: 520, width: "100%", bgcolor: "#fff" }}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer
              sx={{ maxHeight: 520 }}
              className="custom-scrollbar"
            >
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
                    <CustomTableCell
                      className={classes.sticky}
                    ></CustomTableCell>
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
                                  // setCurrentOrder(row);
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
        </Grid>
      </Grid>
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
          labelOk="Thêm"
          title="Thêm sản phẩm"
          isCloseAfterOk={true}
          width={900}
          handleOk={handleOk}
        />
      )}
    </>
  );
};

export default ProductManagement;
