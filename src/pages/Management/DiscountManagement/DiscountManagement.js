import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { ModalDiscount } from "../../../components/ModalAddUpdate";
import { axiosRes, axiosToken } from "../../../config/configAxios";
import {
  API_DISCOUNT_URL,
  API_GROUP_PRODUCT_URL,
  API_UPLOAD_URL,
  LIMIT_ROW_DISCOUNT,
} from "../../../constants";
import {
  addDiscount,
  deleteDiscount,
  getAllDiscounts,
  getCurrentDiscount,
  updateDiscount,
} from "../../../redux/discountSlice";
import { getAllGroupProducts } from "../../../redux/groupProductSlice";
import { showToast } from "../../../redux/toastSlice";
import { calHeightDataGrid, formatDateVN, getURL } from "../../../utils";
const DiscountManagement = () => {
  const columns = [
    {
      field: "actions",
      headerName: "",
      width: 120,
      renderCell: (params) => (
        <>
          <Tooltip title="Sửa giảm giá">
            <IconButton
              color="secondary"
              onClick={() => {
                dispatch(getCurrentDiscount(params.row));
                setOpenModal(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá giảm giá">
            <IconButton
              color="error"
              onClick={() => {
                dispatch(getCurrentDiscount(params.row));
                setOpenDialog(true);
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
      width: 80,
    },
    {
      field: "groupProduct.name",
      headerName: "Tên nhóm sản phẩm",
      valueGetter: (params) => params.row.groupProduct.name,
    },
    {
      field: "percent",
      headerName: "Phần trăm",
    },
    {
      field: "banner",
      headerName: "Quảng cáo",
      cellRenderer: (params) => (
        <img src={getURL(params.row.banner)} height="32" alt="" />
      ),
    },
    {
      field: "start",
      headerName: "Bắt đầu",
      valueGetter: (params) => formatDateVN(params.row.start),
    },
    {
      field: "end",
      headerName: "Kết thúc",
      valueGetter: (params) => formatDateVN(params.row.end),
    },
    {
      field: "description",
      headerName: "Mô tả",
    },
  ];

  const discounts = useSelector((state) => state.discount.all);
  const current = useSelector((state) => state.discount.current);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const promises = [];
    promises.push(
      axiosToken(token?.accessToken, dispatch, navigate).get(
        `${API_DISCOUNT_URL}`
      )
    );
    promises.push(
      axiosToken(token?.accessToken, dispatch, navigate).get(
        `${API_GROUP_PRODUCT_URL}`
      )
    );
    Promise.allSettled(promises)
      .then((listRes) => {
        if (listRes[0].status === "fulfilled") {
          dispatch(getAllDiscounts(listRes[0].value.items));
        }
        if (listRes[1].status === "fulfilled") {
          dispatch(getAllGroupProducts(listRes[1].value.items));
        }
      })
      .catch((err) => {});
  }, [dispatch, navigate, token]);
  async function handleOk(data) {
    try {
      data.newPrice = data.newPrice === "" ? null : data.newPrice;
      const { fileBanner, fileAvatar } = data;
      let listUrls = [];
      const formData = new FormData();

      if (fileBanner) {
        formData.append("images", fileBanner);
      }
      if (fileAvatar) {
        formData.append("images", fileAvatar);
      }
      if (fileAvatar || fileBanner) {
        const res = await axiosRes().post(`${API_UPLOAD_URL}`, formData);
        listUrls = res.items;
      }
      if (listUrls.length === 1) {
        data.banner = listUrls[0].path;
      }
      if (listUrls.length === 2) {
        data.avatar = listUrls[1].path;
      }
      if (!current) {
        const res = await axiosToken(
          token.accessToken,
          dispatch,
          navigate
        ).post(`${API_DISCOUNT_URL}`, data);
        dispatch(addDiscount({ ...data, ...res.item }));
        dispatch(
          showToast({
            isOpen: true,
            text: "Thêm thành công",
            type: "success",
          })
        );
      } else {
        await axiosToken(token.accessToken, dispatch, navigate).put(
          `${API_DISCOUNT_URL}/${current.id}`,
          data
        );
        dispatch(updateDiscount({ ...current, ...data }));
      }
    } catch (error) {}
  }
  async function handleDelete() {
    try {
      if (current) {
        await axiosToken(token.accessToken, dispatch, navigate).delete(
          `${API_DISCOUNT_URL}/${current.id}`
        );
        dispatch(
          showToast({
            isOpen: true,
            text: "Xoá thành công",
            type: "success",
          })
        );
        dispatch(deleteDiscount(current.id));
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showToast({
          isOpen: true,
          text: "Xoá thất bại",
          type: "error",
        })
      );
    }
  }

  return (
    <>
      <Box bgcolor="#fff" p={1}>
        <button
          className="management-btn management-btn-add"
          onClick={() => {
            dispatch(getCurrentDiscount(null));
            setOpenModal(true);
          }}
        >
          <AddIcon />
          Thêm giảm giá
        </button>
        <Box height={calHeightDataGrid(LIMIT_ROW_DISCOUNT)}>
          <DataGrid
            columns={columns}
            rows={discounts}
            pageSize={LIMIT_ROW_DISCOUNT}
            rowsPerPageOptions={[
              LIMIT_ROW_DISCOUNT,
              LIMIT_ROW_DISCOUNT * 5,
              LIMIT_ROW_DISCOUNT * 10,
              LIMIT_ROW_DISCOUNT * 20,
              LIMIT_ROW_DISCOUNT * 50,
            ]}
          />
        </Box>
      </Box>
      {openModal && (
        <ModalDiscount
          width={560}
          height={640}
          open={openModal}
          handleClose={() => setOpenModal(false)}
          handleOk={handleOk}
          labelOk={current ? "Sửa" : "Thêm"}
          title={current ? "Sửa giảm giá" : "Thêm giảm giá"}
          isCloseAfterOk={current !== null}
        />
      )}
      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          title="Xác nhận"
          text="Bạn có chắc chắn muốn xoá giảm giá này ?"
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};

export default DiscountManagement;
