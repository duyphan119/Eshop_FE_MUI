import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../components/ConfirmDialog";
import ModalAddProduct from "../../components/ModalAddProduct";
import Pagination from "../../components/Pagination";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import {
  API_DISCOUNT_URL,
  API_IMAGE_URL,
  API_PRODUCT_DETAIL_URL,
  API_PRODUCT_MATERIAL_URL,
  API_PRODUCT_URL,
  API_UPLOAD_URL,
  LIMIT_ROW_PRODUCT,
} from "../../constants";
import {
  changeLimit,
  changePage,
  getCurrentProduct,
  getProduct,
} from "../../redux/productSlice";
import {
  calHeightDataGrid,
  formatDateVN,
  formatThousandDigits,
  getSku,
} from "../../utils";

const ProductTabPanel = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "category.name",
      headerName: "Danh mục",
      flex: 2,
      sortable: true,
      filter: true,
    },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      flex: 8,
      sortable: true,
      filter: true,
    },
    {
      field: "price",
      headerName: "Giá sản phẩm",
      flex: 2,
      sortable: true,
      filter: true,
      valueFormatter: (params) => formatThousandDigits(params.data.price),
    },
    {
      field: "actions",
      headerName: "",
      pinned: "right",
      width: 120,
      cellRenderer: (params) => (
        <>
          <Tooltip title="Sửa sản phẩm">
            <IconButton
              color="secondary"
              onClick={() => {
                dispatch(getCurrentProduct(params.data));
                setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá sản phẩm">
            <IconButton
              color="error"
              onClick={() => {
                dispatch(getCurrentProduct(params.data));
                setOpenDialog(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const user = useSelector((state) => state.auth.currentUser);
  const product = useSelector((state) => state.product.product);
  const limit = useSelector((state) => state.product.limit);
  const page = useSelector((state) => state.product.page);
  const currentProduct = useSelector((state) => state.product.current);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    configAxiosAll(user, dispatch)
      .get(
        `${API_PRODUCT_URL}?limit=${limit}&include=true&p=${page}&allDiscounts=true`
      )
      .then((res) => dispatch(getProduct(res)))
      .catch((err) => {});
  }, [dispatch, limit, page, user]);

  async function handleOk(data) {
    const {
      name,
      price,
      description,
      category,
      details,
      materials,
      images,
      deleteMaterials,
      deleteImages,
      discounts,
      deleteDiscounts,
    } = data;
    try {
      let _product;
      if (currentProduct) {
        await configAxiosAll(user, dispatch).put(`${API_PRODUCT_URL}`, {
          id: currentProduct.id,
          name,
          price,
          description,
          category_id: category.id,
        });
        const promises = [];
        if (details.length > 0) {
          promises.push(
            configAxiosAll(user, dispatch).put(
              `${API_PRODUCT_DETAIL_URL}?many=true`,
              {
                details: details.map((item) => ({
                  id: item.detail_id,
                  color_id: item.color.id,
                  size_id: item.size.id,
                  amount: item.amount,
                  product_id: currentProduct.id,
                  sku: getSku(
                    category.code,
                    currentProduct.id,
                    item.code.code,
                    item.size.code
                  ),
                })),
              }
            )
          );
        }
        if (materials.length > 0) {
          promises.push(
            configAxiosAll(user, dispatch).put(
              `${API_PRODUCT_MATERIAL_URL}?many=true`,
              {
                materials: materials.map((item) => ({
                  id: item.product_material_id,
                  material_id: item.id,
                  product_id: _product.id,
                })),
              }
            )
          );
          promises.push(
            configAxiosAll(user, dispatch).delete(
              `${API_PRODUCT_MATERIAL_URL}?many=true`,
              { data: deleteMaterials }
            )
          );
        }
        let productImages = [];
        let formData = new FormData();
        let urlList = [];
        images.forEach((image) => {
          image.files.forEach((file) => {
            formData.append("images", file);
            productImages.push({ color: image.color });
          });
        });
        if (images.length > 0) {
          urlList = await configAxiosResponse().post(
            `${API_UPLOAD_URL}`,
            formData
          );
        }
        if (images.length > 0) {
          promises.push(
            configAxiosAll(user, dispatch).post(
              `${API_IMAGE_URL}?many=true`,
              urlList.map((url, index) => ({
                product_id: _product.id,
                url: url.secure_url,
                color_id: productImages[index].color.id,
              }))
            )
          );
        }
        if (discounts.length > 0) {
          promises.push(
            configAxiosAll(user, dispatch).post(
              `${API_DISCOUNT_URL}?many=true`,
              discounts.map((discount, index) => ({
                ...discount,
                product_id: currentProduct.id,
                start: formatDateVN(discount.start),
              }))
            )
          );
        }
        if (deleteImages.length > 0) {
          promises.push(
            configAxiosAll(user, dispatch).delete(
              `${API_IMAGE_URL}?many=true`,
              {
                data: deleteImages.map((img, index) => img.id),
              }
            )
          );
        }
        if (deleteDiscounts.length > 0) {
          promises.push(
            configAxiosAll(user, dispatch).delete(`${API_DISCOUNT_URL}`, {
              data: deleteDiscounts,
            })
          );
        }
        const a = await Promise.allSettled(promises);
        console.log(a);
      } else {
        _product = await configAxiosAll(user, dispatch).post(
          `${API_PRODUCT_URL}`,
          {
            name,
            price,
            description,
            category_id: category.id,
          }
        );

        let productImages = [];
        let formData = new FormData();
        images.forEach((image) => {
          image.files.forEach((file) => {
            formData.append("images", file);
            productImages.push({ color: image.color });
          });
        });
        let urlList = [];
        if (images.length > 0) {
          urlList = await configAxiosResponse().post(
            `${API_UPLOAD_URL}`,
            formData
          );
        }

        const promises = [];
        if (materials.length > 0) {
          promises.push(
            configAxiosAll(user, dispatch).post(
              `${API_PRODUCT_MATERIAL_URL}?many=true`,
              materials.map((item) => ({
                material_id: item.id,
                product_id: _product.id,
              }))
            )
          );
        }
        if (details.length > 0) {
          promises.push(
            configAxiosAll(user, dispatch).post(
              `${API_PRODUCT_DETAIL_URL}?many=true`,
              details.map((item) => ({
                color_id: item.color.id,
                size_id: item.size.id,
                amount: item.amount,
                product_id: _product.id,
                sku: getSku(
                  category.code,
                  _product.id,
                  item.color.code,
                  item.size.code
                ),
              }))
            )
          );
        }
        if (images.length > 0) {
          promises.push(
            configAxiosAll(user, dispatch).post(
              `${API_IMAGE_URL}?many=true`,
              urlList.map((url, index) => ({
                product_id: _product.id,
                url: url.secure_url,
                color_id: productImages[index].color.id,
              }))
            )
          );
        }
        if (discounts.length > 0) {
          promises.push(
            configAxiosAll(user, dispatch).post(
              `${API_DISCOUNT_URL}?many=true`,
              discounts.map((item) => ({
                ...item,
                product_id: _product.id,
                start: formatDateVN(item.start),
              }))
            )
          );
        }
        await Promise.allSettled(promises);
      }
      const newProduct = await configAxiosResponse().get(
        `${API_PRODUCT_URL}/slug/${
          currentProduct ? currentProduct.slug : _product.slug
        }`
      );
      dispatch(
        getProduct({
          ...product,
          total_result: product.total_result + 1,
          items: [
            newProduct,
            ...[...product.items].splice(0, product.limit - 1),
          ],
          total_page: Math.ceil(product.total_result / product.limit),
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
  async function onConfirm() {
    try {
      if (currentProduct) {
        await configAxiosAll(user, dispatch).delete(
          `${API_PRODUCT_URL}/${currentProduct.id}`
        );
        const data = await configAxiosAll(user, dispatch).get(
          `${API_PRODUCT_URL}?limit=${limit}&include=true&p=${page}`
        );
        dispatch(getProduct(data));
      }
    } catch (error) {}
  }

  return (
    <>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          dispatch(getCurrentProduct(null));
          setOpen(true);
        }}
        startIcon={<AddIcon />}
      >
        Thêm sản phẩm
      </Button>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          height: calHeightDataGrid(LIMIT_ROW_PRODUCT),
        }}
      >
        <div
          className="ag-theme-alpine"
          style={{ width: "100%", height: "100%" }}
        >
          <AgGridReact
            rowData={product && product.items ? product.items : []}
            columnDefs={columns}
          ></AgGridReact>
        </div>
      </Paper>
      {product && product.total_page && (
        <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
          <Pagination
            showRowsPerPage={true}
            listRowPerPage={[LIMIT_ROW_PRODUCT, 50, 100, 200, 500]}
            rowsPerPage={limit}
            onChangeRowsPerPage={(e) => dispatch(changeLimit(e.target.value))}
            onChange={(e, value) => {
              dispatch(changePage(value));
            }}
            page={page}
            totalPage={product.total_page}
          />
        </Box>
      )}

      {open && (
        <ModalAddProduct
          open={open}
          handleClose={() => setOpen(false)}
          labelOk={currentProduct ? "Sửa" : "Thêm"}
          title={currentProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
          isCloseAfterOk={true}
          width={1000}
          handleOk={handleOk}
          product={currentProduct}
          height={700}
        />
      )}
      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          text="Bạn có chắc chắn muốn xoá sản phẩm này ?"
          onConfirm={onConfirm}
          onClose={() => setOpenDialog(false)}
        />
      )}
    </>
  );
};

export default ProductTabPanel;
