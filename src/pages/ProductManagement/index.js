import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../components/ConfirmDialog";
import { configAxiosAll } from "../../config/configAxios";
import {
  API_COLOR_URL,
  API_MATERIAL_URL,
  API_PRODUCT_URL,
  API_SIZE_URL,
  LIMIT_ROW_PRODUCT,
} from "../../constants";
import { getAllColors } from "../../redux/colorSlice";
import { getAllSizes } from "../../redux/sizeSlice";
import { getAllMaterials } from "../../redux/materialSlice";
const ProductManagement = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [product, setProduct] = useState();

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    text: "",
    onConfirm: () => {},
  });
  const [productModal, setProductModal] = useState(false);

  useEffect(() => {
    (async function () {
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
            `${API_PRODUCT_URL}?limit=${LIMIT_ROW_PRODUCT}&include=true`
          )
        );
      });

      Promise.allSettled([
        promiseColor,
        promiseSize,
        promiseMaterial,
        promiseProduct,
      ])
        .then((values) => {
          dispatch(getAllColors(values[0].value));
          dispatch(getAllSizes(values[1].value));
          dispatch(getAllMaterials(values[2].value));
          setProduct(values[3].value);
        })
        .catch((err) => console.log(err));
    })();
  }, [dispatch, user]);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "name",
      headerName: "Tên",
      width: 430,
    },
    {
      field: "materials",
      headerName: "Chất liệu",
      width: 120,
      renderCell: (params) => {
        return <>Không có</>;
      },
    },
    {
      field: "price",
      headerName: "Giá tiền",
      width: 90,
      renderCell: (params) => {
        return (
          <>
            {params.row.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
          </>
        );
      },
    },
    {
      field: "discount",
      headerName: "Giảm giá",
      width: 90,
      renderCell: (params) => {
        return <>Không có</>;
      },
    },
    {
      field: "category",
      headerName: "Danh mục",
      width: 140,
      renderCell: (params) => {
        return <>{params.row.category.name}</>;
      },
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <Button
              sx={{ fontSize: 12 }}
              variant="contained"
              size="small"
              // onClick={() =>
              //   setProductDetailModal({ open: true, item: params.row })
              // }
            >
              Chi tiết
            </Button>
            <Button
              sx={{ fontSize: 12, ml: 1 }}
              variant="contained"
              size="small"
              color="secondary"
            >
              Sửa
            </Button>
          </>
        );
      },
    },
  ];
  console.log(productModal);
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => setProductModal(true)}
          >
            Thêm sản phẩm
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ height: 560, width: "100%", bgcolor: "#fff" }}>
          <DataGrid
            className="custom-scrollbar"
            columns={columns}
            rows={product && product.items ? product.items : []}
            rowCount={LIMIT_ROW_PRODUCT}
            pageSize={LIMIT_ROW_PRODUCT}
            rowsPerPageOptions={[LIMIT_ROW_PRODUCT]}
            sx={{ fontSize: 12 }}
            components={{
              Toolbar: () => (
                <GridToolbarContainer>
                  <GridToolbarColumnsButton />
                  <GridToolbarFilterButton />
                  <GridToolbarDensitySelector />
                  <GridToolbarExport />
                </GridToolbarContainer>
              ),
            }}
          />
        </Grid>
      </Grid>
      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        text={confirmDialog.text}
        onConfirm={confirmDialog.onConfirm}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
      />
    </>
  );
};

export default ProductManagement;
