import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalProduct } from "../../../components/ModalAddUpdate";
import { axiosRes } from "../../../config/configAxios";
import {
  API_GROUP_PRODUCT_URL,
  API_PRODUCT_URL,
  API_UPLOAD_URL,
  LIMIT_ROW_PRODUCT,
} from "../../../constants";
import { getAllGroupProducts } from "../../../redux/groupProductSlice";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getCurrentProduct,
  updateProduct,
} from "../../../redux/productSlice";
import { showToast } from "../../../redux/toastSlice";
import { calHeightDataGrid } from "../../../utils";
const rowHeight = 64;
const ProductManagement = () => {
  const columns = [
    {
      field: "actions",
      headerName: "",
      width: 100,
      renderCell: (params) => (
        <>
          <Tooltip title="Sửa sản phẩm">
            <IconButton
              size="small"
              color="secondary"
              onClick={() => {
                dispatch(getCurrentProduct(params.row));
                setOpenModal(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá sản phẩm">
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                dispatch(getCurrentProduct(params.row));
                // setOpenDialog(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "groupProduct.name",
      headerName: "Tên nhóm sản phẩm",
      width: 180,
      valueGetter: (params) => params.row.groupProduct.name,
    },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      width: 300,
      renderCell: (params) => {
        return (
          <div
            style={{ display: "flex", alignItems: "center", height: rowHeight }}
          >
            <img src={params.row.avatar} height="100%" alt="" />
            &nbsp;{params.row.name}
          </div>
        );
      },
    },
    {
      field: "initPrice",
      headerName: "Giá",
      width: 100,
    },
    {
      field: "newPrice",
      headerName: "Giá mới",
      width: 100,
    },
    {
      field: "slug",
      headerName: "Slug",
      width: 200,
    },
  ];

  const products = useSelector((state) => state.product.list);
  const current = useSelector((state) => state.product.current);
  const page = useSelector((state) => state.product.page);

  const [openModal, setOpenModal] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const promises = [];
    promises.push(axiosRes().get(`${API_PRODUCT_URL}`));
    promises.push(axiosRes().get(`${API_GROUP_PRODUCT_URL}`));
    Promise.allSettled(promises)
      .then((listRes) => {
        if (listRes[0].status === "fulfilled") {
          dispatch(getAllProducts(listRes[0].value.items));
        }
        if (listRes[1].status === "fulfilled") {
          dispatch(getAllGroupProducts(listRes[1].value.items));
        }
      })
      .catch((err) => {});
  }, [dispatch, page]);

  async function handleOk(data) {
    try {
      data.newPrice = data.newPrice === "" ? null : data.newPrice;
      const { file } = data;
      let listUrls = [];
      if (file) {
        const formData = new FormData();
        formData.append("images", file);
        listUrls = await axiosRes().post(`${API_UPLOAD_URL}`, formData);
        if (listUrls.length > 0) {
          data.avatar = listUrls[0].secure_url;
        }
      }
      if (!current) {
        const res = await axiosRes().post(`${API_PRODUCT_URL}`, data);
        dispatch(addProduct({ ...data, ...res.item }));
        dispatch(
          showToast({
            isOpen: true,
            text: "Thêm thành công",
            type: "success",
          })
        );
      } else {
        await axiosRes().put(`${API_PRODUCT_URL}/${current.id}`, data);
        dispatch(updateProduct({ ...current, ...data }));
      }
    } catch (error) {}
  }

  async function deleteById(id) {
    try {
      await axiosRes().delete(`${API_PRODUCT_URL}/${current.id}`);
      dispatch(deleteProduct(current.id));
    } catch (error) {
      dispatch(
        showToast({ isOpen: true, type: "error", text: "Xoá thất bại" })
      );
    }
  }

  return (
    <>
      <Box bgcolor="#fff" p={1}>
        <button
          className="management-btn-add"
          onClick={() => {
            dispatch(getCurrentProduct(null));
            // setOpen(true);
            setOpenModal(true);
          }}
        >
          <AddIcon />
          Thêm sản phẩm
        </button>
        <Box height={calHeightDataGrid(LIMIT_ROW_PRODUCT, rowHeight)}>
          <DataGrid
            columns={columns}
            rows={products}
            pageSize={LIMIT_ROW_PRODUCT}
            rowHeight={rowHeight}
            rowsPerPageOptions={[
              LIMIT_ROW_PRODUCT,
              LIMIT_ROW_PRODUCT * 5,
              LIMIT_ROW_PRODUCT * 10,
              LIMIT_ROW_PRODUCT * 20,
              LIMIT_ROW_PRODUCT * 50,
            ]}
          />
        </Box>
      </Box>
      {openModal && (
        <ModalProduct
          width={560}
          height={560}
          open={openModal}
          handleClose={() => setOpenModal(false)}
          handleOk={handleOk}
          labelOk={"Thêm"}
          title={"Thêm sản phẩm"}
          isCloseAfterOk={false}
        />
      )}
    </>
  );
};

export default ProductManagement;
