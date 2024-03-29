import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { API_ROLE_URL, LIMIT_ROW_ROLE } from "../../../constants";
import { calHeightDataGrid } from "../../../utils";
import Pagination from "../../../components/Pagination";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useEffect, useState } from "react";
import { axiosRes, axiosToken } from "../../../config/configAxios";
import { useDispatch, useSelector } from "react-redux";
import {
  addRole,
  changeLimit,
  changePage,
  deleteRole,
  getAllRoles,
  getCurrentRole,
  getRole,
  updateRole,
} from "../../../redux/roleSlice";
import { ModalRole } from "../../../components/ModalAddUpdate";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../../components/ConfirmDialog";
const RoleManagement = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      sortable: true,
      filter: true,
    },
    {
      field: "role",
      headerName: "Tên quyền",
      sortable: true,
      filter: true,
    },
    {
      field: "description",
      headerName: "Mô tả",
      sortable: true,
      filter: true,
    },
    {
      field: "actions",
      headerName: "",
      pinned: "right",
      width: 120,
      cellRenderer: (params) => (
        <>
          <Tooltip title="Sửa quyền">
            <IconButton
              color="secondary"
              onClick={() => {
                dispatch(getCurrentRole(params.data));
                setOpenModal(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá quyền">
            <IconButton
              color="error"
              onClick={() => {
                dispatch(getCurrentRole(params.data));
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

  const roles = useSelector((state) => state.role.all);
  const token = useSelector((state) => state.auth.token);
  const current = useSelector((state) => state.role.current);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const promises = [];
    promises.push(
      axiosToken(token?.accessToken, dispatch, navigate).get(`${API_ROLE_URL}`)
    );
    Promise.allSettled(promises)
      .then((listRes) => {
        if (listRes[0].status === "fulfilled") {
          dispatch(getAllRoles(listRes[0].value.items));
        }
      })
      .catch((err) => {});
  }, [dispatch, navigate, token]);

  async function handleOk(data) {
    try {
      if (current) {
        await axiosToken(token?.accessToken, dispatch, navigate).put(
          `${API_ROLE_URL}/${current.id}`,
          data
        );
        dispatch(updateRole({ ...current, ...data }));
      } else {
        const res = await axiosToken(
          token?.accessToken,
          dispatch,
          navigate
        ).post(`${API_ROLE_URL}`, data);
        dispatch(addRole(res.item));
      }
    } catch (error) {}
  }

  async function handleDelete() {
    try {
      await axiosToken(token?.accessToken, dispatch, navigate).delete(
        `${API_ROLE_URL}/${current.id}`
      );
      dispatch(deleteRole(current.id));
    } catch (error) {}
  }

  return (
    <>
      <Box bgcolor="#fff" p={1}>
        <button
          className="management-btn management-btn-add"
          onClick={() => {
            dispatch(getCurrentRole(null));
            setOpenModal(true);
          }}
        >
          <AddIcon />
          Thêm quyền
        </button>
        <Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Quyền</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <Tooltip title="Sửa quyền">
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => {
                          dispatch(getCurrentRole(item));
                          setOpenModal(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xoá quyền">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          dispatch(getCurrentRole(item));
                          setOpenDialog(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
      {openModal && (
        <ModalRole
          open={openModal}
          handleClose={() => setOpenModal(false)}
          handleOk={handleOk}
          title={current ? "Sửa quyền" : "Thêm quyền"}
          labelOk={current ? "Sửa" : "Thêm"}
        />
      )}

      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          title="Xác nhận"
          text="Bạn có chắc chắn xoá quyền này?"
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};

export default RoleManagement;
