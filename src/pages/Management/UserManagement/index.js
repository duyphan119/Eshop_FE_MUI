import { Avatar, Box, Button, IconButton, Tooltip } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { API_USER_URL, LIMIT_ROW_USER } from "../../../constants";
import { calHeightDataGrid } from "../../../utils";
import Pagination from "../../../components/Pagination";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useEffect } from "react";
import { configAxiosResponse } from "../../../config/configAxios";
import { useDispatch, useSelector } from "react-redux";
import { changeLimit, changePage, getUser } from "../../../redux/userSlice";
const UserManagement = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      sortable: true,
      filter: true,
    },
    {
      field: "fullName",
      headerName: "Họ và tên",
      sortable: true,
      filter: true,
      cellRenderer: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={params.data.avatar}
            alt="Phan Khánh Duy"
            sx={{ height: 32, width: 32 }}
          />
          &nbsp;
          {params.data.fullName}
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Địa chỉ email",
      sortable: true,
      filter: true,
      width: 240,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      sortable: true,
      filter: true,
      width: 540,
    },
    {
      field: "telephone",
      headerName: "Số điện thoại",
      sortable: true,
      filter: true,
      width: 200,
    },
    {
      field: "role.role",
      headerName: "Quyền",
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
          <Tooltip title="Sửa người dùng">
            <IconButton
              color="secondary"
              onClick={() => {
                // dispatch(getCurrentCategory(params.data));
                // setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá người dùng">
            <IconButton
              color="error"
              onClick={() => {
                // dispatch(getCurrentCategory(params.data));
                // setOpenDialog(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const user = useSelector((state) => state.user.user);
  const page = useSelector((state) => state.user.page);
  const limit = useSelector((state) => state.user.limit);

  const dispatch = useDispatch();

  useEffect(() => {
    const promises = [];
    promises.push(
      configAxiosResponse().get(
        `${API_USER_URL}?limit=${LIMIT_ROW_USER}&p=${page}`
      )
    );
    Promise.allSettled(promises)
      .then((listRes) => {
        if (listRes[0].status === "fulfilled") {
          dispatch(getUser(listRes[0].value));
        }
      })
      .catch((err) => {});
  }, [dispatch, page]);

  return (
    <Box bgcolor="#fff" p={1}>
      <button
        className="management-btn-add"
        onClick={() => {
          // dispatch(getCurrentCategory(null));
          // setOpen(true);
        }}
      >
        <AddIcon />
        Thêm người dùng
      </button>
      <Box>
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            height: calHeightDataGrid(LIMIT_ROW_USER),
          }}
        >
          <div
            className="ag-theme-alpine"
            style={{ width: "100%", height: "100%" }}
          >
            <AgGridReact
              rowData={user.items}
              columnDefs={columns}
            ></AgGridReact>
          </div>
        </div>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
        <Pagination
          showRowsPerPage={true}
          listRowPerPage={[LIMIT_ROW_USER, 50, 100, 200, 500]}
          rowsPerPage={limit}
          onChangeRowsPerPage={(value) => dispatch(changeLimit(value))}
          onChange={(e, value) => {
            dispatch(changePage(value));
          }}
          page={page}
          totalPage={user.totalPage}
        />
      </Box>
    </Box>
  );
};

export default UserManagement;
