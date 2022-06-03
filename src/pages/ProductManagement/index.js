import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tab, Tabs, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ConfirmDialog from "../../components/ConfirmDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalAddProduct from "../../components/ModalAddProduct";
import Pagination from "../../components/Pagination";
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
import { getAll as getAllColors } from "../../redux/colorSlice";
import { getAll as getAllMaterials } from "../../redux/materialSlice";
import { getAll as getAllSizes } from "../../redux/sizeSlice";
import { calHeightDataGrid, formatThousandDigits, getSku } from "../../utils";
import ColorTabPanel from "./ColorTabPanel";
import MaterialTabPanel from "./MaterialTabPanel";
import SizeTabPanel from "./SizeTabPanel";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const ProductManagement = () => {
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
              onClick={() => {
                setCurrentProduct(params.data);
                setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá sản phẩm">
            <IconButton
              onClick={() => {
                setCurrentProduct(params.data);
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
  const dispatch = useDispatch();

  const [product, setProduct] = useState();
  const [currentProduct, setCurrentProduct] = useState();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState(3);
  const [openDialog, setOpenDialog] = useState(false);
  const [limit, setLimit] = useState(LIMIT_ROW_PRODUCT);

  useEffect(() => {
    (function () {
      const promiseCategory = new Promise((resolve, reject) => {
        resolve(configAxiosAll(user, dispatch).get(`${API_CATEGORY_URL}`));
      });
      const promiseColor = new Promise((resolve, reject) => {
        resolve(configAxiosResponse().get(`${API_COLOR_URL}`));
      });
      const promiseSize = new Promise((resolve, reject) => {
        resolve(configAxiosResponse().get(`${API_SIZE_URL}`));
      });
      const promiseMaterial = new Promise((resolve, reject) => {
        resolve(configAxiosAll(user, dispatch).get(`${API_MATERIAL_URL}`));
      });
      const promiseProduct = new Promise((resolve, reject) => {
        resolve(
          configAxiosAll(user, dispatch).get(
            `${API_PRODUCT_URL}?limit=${limit}&include=true&p=${page}`
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
        .catch((err) => {});
    })();
  }, [dispatch, user, page, limit]);

  // console.log(product);

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
            new Promise((resolve, reject) =>
              resolve(
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
              )
            )
          );
        }
        if (materials.length > 0) {
          promises.push(
            new Promise((resolve, reject) =>
              resolve(
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
              )
            )
          );
          promises.push(
            new Promise((resolve, reject) =>
              resolve(
                configAxiosAll(user, dispatch).delete(
                  `${API_PRODUCT_MATERIAL_URL}?many=true`,
                  { data: deleteMaterials, headers: { Authorization: "***" } }
                )
              )
            )
          );
        }
        let productImages = [];
        let formData = new FormData();
        let urlList = [];
        images.forEach((image) => {
          image.files.forEach((file) => {
            console.log(file);
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
        if (deleteImages.length > 0) {
          promises.push(
            new Promise((resolve, reject) =>
              resolve(
                configAxiosAll(user, dispatch).delete(
                  `${API_IMAGE_URL}?many=true`,
                  {
                    data: deleteImages.map((img, index) => img.id),
                    headers: { Authorization: "***" },
                  }
                )
              )
            )
          );
        }
        await Promise.allSettled(promises);
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
                    sku: getSku(
                      category.code,
                      _product.id,
                      item.color.code,
                      item.size.code
                    ),
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
        await Promise.allSettled(promises);
      }
      const newProduct = await configAxiosResponse().get(
        `${API_PRODUCT_URL}/slug/${
          currentProduct ? currentProduct.slug : _product.slug
        }`
      );
      setProduct({
        ...product,
        total_result: product.total_result + 1,
        items: [newProduct, ...[...product.items].splice(0, product.limit - 1)],
        total_page: Math.ceil(product.total_result / product.limit),
      });
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
        setProduct(data);
      }
    } catch (error) {}
  }

  console.log(limit);

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
        <MaterialTabPanel />
      </TabPanel>
      <TabPanel index={1} value={tab}>
        <ColorTabPanel />
      </TabPanel>
      <TabPanel index={2} value={tab}>
        <SizeTabPanel />
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
              onChangeRowsPerPage={setLimit}
              onChange={(e, value) => {
                setPage(value);
              }}
              page={page}
              totalPage={product.total_page}
            />
          </Box>
        )}
      </TabPanel>
      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          text="Bạn có chắc chắn muốn xoá sản phẩm này ?"
          onConfirm={onConfirm}
          onClose={() => setOpenDialog(false)}
        />
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
        <Box sx={{ p: 1, bgcolor: "#fff" }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

export default ProductManagement;
