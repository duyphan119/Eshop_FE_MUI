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
import { apiGetAllProducts } from "../../../api/apiProduct";
import { ADMIN_ORDERS_PER_PAGE } from "../../../constants";
import ConfirmDialog from "../ConfirmDialog";
import ProductDetailModal from "./ProductDetailModal";
import ProductModal from "./ProductModal";
const Products = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [productDetailModal, setProductDetailModal] = useState({
    open: false,
    item: null,
  });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    text: "",
    onConfirm: () => {},
  });
  const [productModal, setProductModal] = useState(false);
  console.log(products);

  useEffect(() => {
    const callApi = async () => {
      let data = await apiGetAllProducts(
        user,
        "?pSize=true&pImage=true",
        dispatch
      );
      setProducts(data);
    };
    callApi();
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
              onClick={() =>
                setProductDetailModal({ open: true, item: params.row })
              }
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
            rows={products && products.items ? products.items : []}
            rowCount={ADMIN_ORDERS_PER_PAGE}
            pageSize={ADMIN_ORDERS_PER_PAGE}
            rowsPerPageOptions={[ADMIN_ORDERS_PER_PAGE]}
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
      {products && (
        <>
          {productDetailModal.open && (
            <ProductDetailModal
              open={productDetailModal.open}
              item={productDetailModal.item}
              handleClose={() =>
                setProductDetailModal({ open: false, item: null })
              }
            />
          )}
        </>
      )}
      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        text={confirmDialog.text}
        onConfirm={confirmDialog.onConfirm}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
      />
      <ProductModal
        open={productModal}
        handleClose={() => setProductModal(false)}
      />
    </>
  );
};

export default Products;
