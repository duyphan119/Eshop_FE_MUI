import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../components/ConfirmDialog";
import ModalUser from "../../components/ModalUser";
import Pagination from "../../components/Pagination";
import { configAxiosAll } from "../../config/configAxios";
import { API_USER_URL, LIMIT_ROW_USER } from "../../constants";
import { updateUser } from "../../redux/authSlice";
import {
  addUser,
  changeLimit,
  changePage,
  deleteUser,
  getCurrentUser,
} from "../../redux/userSlice";
import { calHeightDataGrid, formatDateTimeVN } from "../../utils";

const UserTabPanel = () => {
  const columnUsers = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "full_name",
      headerName: "Họ và tên",
      flex: 3,
      sortable: true,
      filter: true,
    },
    {
      field: "email",
      headerName: "Địa chỉ email",
      flex: 3,
      sortable: true,
      filter: true,
    },
    {
      field: "createdAt",
      headerName: "Thời gian tạo",
      flex: 2,
      sortable: true,
      filter: true,
      valueFormatter: (params) => formatDateTimeVN(params.data.createdAt),
    },
    {
      field: "actions",
      headerName: "",
      pinned: "right",
      width: 120,
      cellRenderer: (params) => (
        <>
          <Tooltip title="Sửa người dùng">
            <IconButton
              color="secondary"
              onClick={() => {
                dispatch(getCurrentUser(params.data));
                setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá người dùng">
            <IconButton
              color="error"
              onClick={() => {
                dispatch(getCurrentUser(params.data));
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
  const dataUser = useSelector((state) => state.user.user);
  const currentUser = useSelector((state) => state.user.current);
  const page = useSelector((state) => state.user.page);
  const limit = useSelector((state) => state.user.limit);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  async function getUser(data) {
    try {
      const { fullName, email, role } = data;
      if (currentUser) {
        const req = {
          id: currentUser.id,
          full_name: fullName,
          role_id: role.id,
          email,
        };
        await configAxiosAll(user, dispatch).put(`${API_USER_URL}`, req);
        dispatch(updateUser({ ...req, role }));
      } else {
        const res = await configAxiosAll(user, dispatch).post(
          `${API_USER_URL}`,
          {
            full_name: fullName,
            role_id: role.id,
            email,
          }
        );
        dispatch(addUser({ ...res, role }));
      }
    } catch (error) {}
  }
  async function onConfirm() {
    try {
      await configAxiosAll(user, dispatch).delete(
        `${API_USER_URL}/${currentUser.id}`
      );
      await configAxiosAll(user, dispatch).get(
        `${API_USER_URL}?limit=${limit}&p=${page}`
      );
      dispatch(deleteUser(currentUser.id));
    } catch (error) {}
  }
  return (
    <>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          dispatch(getCurrentUser(null));
          setOpen(true);
        }}
        startIcon={<AddIcon />}
      >
        Thêm người dùng
      </Button>
      {dataUser && (
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            height: calHeightDataGrid(LIMIT_ROW_USER),
          }}
        >
          <div
            className="ag-theme-alpine user-management"
            style={{ width: "100%", height: "100%" }}
          >
            <AgGridReact
              rowData={dataUser.items}
              columnDefs={columnUsers}
            ></AgGridReact>
          </div>
          {open && (
            <ModalUser
              open={open}
              handleClose={() => setOpen(false)}
              labelOk={currentUser ? "Sửa" : "Thêm"}
              title={!currentUser ? "Thêm người dùng" : "Sửa người dùng"}
              isCloseAfterOk={true}
              user={currentUser}
              handleOk={getUser}
            />
          )}
        </Paper>
      )}
      {dataUser && dataUser.total_page && (
        <Box display="flex" justifyContent="end" mt={1}>
          <Pagination
            showRowsPerPage={true}
            listRowPerPage={[LIMIT_ROW_USER, 50, 100, 200, 500]}
            rowsPerPage={limit}
            onChangeRowsPerPage={(l) => dispatch(changeLimit(l))}
            page={page}
            onChange={(e, value) => dispatch(changePage(value))}
            totalPage={dataUser.total_page}
          />
        </Box>
      )}
      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={onConfirm}
          title="Bạn có chắc chắn muốn xoá người dùng này ?"
        />
      )}
    </>
  );
};

export default UserTabPanel;
