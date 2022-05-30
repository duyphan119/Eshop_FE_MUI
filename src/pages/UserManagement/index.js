import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Tab, Tabs, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import { AgGridReact } from "ag-grid-react";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ModalRole from "../../components/ModalRole";
import ModalUser from "../../components/ModalUser";
import ConfirmDialog from "../../components/ConfirmDialog";
import { configAxiosAll } from "../../config/configAxios";
import { API_ROLE_URL, API_USER_URL, LIMIT_ROW_USER } from "../../constants";
import { getAll as getAllRoles, getCurrentRole } from "../../redux/roleSlice";
import Pagination from "../../components/Pagination";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { calHeightDataGrid, formatTimeVN } from "../../utils";

const UserManagement = () => {
  const columnRoles = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "role",
      headerName: "Quyền",
      flex: 1,
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
              onClick={() => {
                dispatch(getCurrentRole(params.data));
                setOpenUser(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá quyền">
            <IconButton
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
  const columnUsers = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      sortable: true,
      filter: true,
      pinned: "left",
    },
    {
      field: "full_name",
      headerName: "Họ và tên",
      width: 200,
      sortable: true,
      filter: true,
    },
    {
      field: "email",
      headerName: "Địa chỉ email",
      width: 300,
      sortable: true,
      filter: true,
    },
    {
      field: "createdAt",
      headerName: "Thời gian tạo",
      width: 170,
      sortable: true,
      filter: true,
      valueFormatter: (params) => formatTimeVN(params.data.createdAt),
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
              onClick={() => {
                setCurrentUser(params.data);
                setOpenUser(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá người dùng">
            <IconButton
              onClick={() => {
                setCurrentUser(params.data);
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
  const roles = useSelector((state) => state.role.all);
  const currentRole = useSelector((state) => state.role.current);

  const dispatch = useDispatch();

  const [openRole, setOpenRole] = useState(false);
  const [dataUser, setDataUser] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [openUser, setOpenUser] = useState(false);
  const [pageUser, setPageUser] = useState(1);
  const [tab, setTab] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const promises = [];

    promises.push(
      new Promise((resolve, reject) =>
        resolve(configAxiosAll(user, dispatch).get(`${API_ROLE_URL}`))
      )
    );
    promises.push(
      new Promise((resolve, reject) =>
        resolve(
          configAxiosAll(user, dispatch).get(
            `${API_USER_URL}?limit=${LIMIT_ROW_USER}&p=${pageUser}`
          )
        )
      )
    );
    Promise.allSettled(promises)
      .then((listRes) => {
        if (listRes[0].status === "fulfilled") {
          dispatch(getAllRoles(listRes[0].value));
        }
        if (listRes[1].status === "fulfilled") {
          setDataUser(listRes[1].value);
        }
      })
      .catch((err) => {});
  }, [dispatch, user, pageUser]);

  function getRole(data) {
    const { role } = data;
    if (currentRole) {
      configAxiosAll(user, dispatch)
        .put(`${API_USER_URL}`, {
          id: currentRole.id,
          role,
        })
        .then((res) => {
          const _roles = [...roles];
          const index = _roles.findIndex((el) => el.id === currentRole.id);
          if (index !== -1) {
            _roles[index] = res;
            dispatch(getAllRoles(_roles));
          }
        })
        .catch((err) => {});
    } else {
      configAxiosAll(role, dispatch)
        .post(`${API_ROLE_URL}`, {
          role,
        })
        .then((res) => {
          dispatch(getAllRoles([...res, ...roles]));
        })
        .catch((err) => {});
    }
  }
  function getUser(data) {
    const { fullName, email, role } = data;
    if (currentUser) {
      configAxiosAll(user, dispatch)
        .put(`${API_USER_URL}`, {
          id: currentUser.id,
          full_name: fullName,
          role_id: role.id,
          email,
        })
        .then((res) => {
          const _users = [...dataUser.items];
          const index = _users.findIndex((el) => el.id === currentUser.id);
          if (index !== -1) {
            _users[index] = res;
            setDataUser({ ...dataUser, items: _users });
          }
        })
        .catch((err) => {});
    } else {
      configAxiosAll(user, dispatch)
        .post(`${API_USER_URL}`, {
          full_name: fullName,
          role_id: role.id,
          email,
        })
        .then((res) => {
          setDataUser({
            ...dataUser,
            items: [{ ...res, role }, ...dataUser.items],
            total_result: dataUser.items.length + 1,
            total_page: Math.ceil((dataUser.items.length + 1) / dataUser.limit),
          });
        })
        .catch((err) => {});
    }
  }
  async function onConfirm() {
    try {
      if (tab === 0) {
        await configAxiosAll(user, dispatch).delete(
          `${API_ROLE_URL}/${currentRole.id}`
        );
        const data = await configAxiosAll(user, dispatch).get(
          `${API_ROLE_URL}`
        );
        dispatch(getAllRoles(data));
      } else {
        await configAxiosAll(user, dispatch).delete(
          `${API_USER_URL}/${currentUser.id}`
        );
        const data = await configAxiosAll(user, dispatch).get(
          `${API_USER_URL}?limit=${LIMIT_ROW_USER}&p=${pageUser}`
        );
        setDataUser(data);
      }
    } catch (error) {}
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#fff" }}>
        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          aria-label="basic tabs example"
        >
          <Tab label="Quyền" {...a11yProps(0)} />
          <Tab label="Người dùng" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel index={0} value={tab}>
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => {
            dispatch(getCurrentRole(null));
            setOpenRole(true);
          }}
          startIcon={<AddIcon />}
        >
          Thêm quyền
        </Button>
        <Paper
          sx={{
            width: "100%",
            height: calHeightDataGrid(10),
            overflow: "hidden",
          }}
        >
          <div
            className="ag-theme-alpine"
            style={{ width: "100%", height: "100%" }}
          >
            <AgGridReact rowData={roles} columnDefs={columnRoles}></AgGridReact>
          </div>
          {openRole && (
            <ModalRole
              open={openRole}
              handleClose={() => setOpenRole(false)}
              labelOk={currentRole ? "Sửa" : "Thêm"}
              title={!currentRole ? "Thêm quyền" : "Sửa quyền"}
              isCloseAfterOk={true}
              user={currentRole}
              handleOk={getRole}
            />
          )}
        </Paper>
      </TabPanel>
      <TabPanel index={1} value={tab}>
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => {
            setCurrentUser(null);
            setOpenUser(true);
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
              height: calHeightDataGrid(10),
            }}
          >
            <div
              className="ag-theme-alpine"
              style={{ width: "100%", height: "100%" }}
            >
              <AgGridReact
                rowData={dataUser.items}
                columnDefs={columnUsers}
              ></AgGridReact>
            </div>
            {openUser && (
              <ModalUser
                open={openUser}
                handleClose={() => setOpenUser(false)}
                labelOk={currentUser ? "Sửa" : "Thêm"}
                title={!currentUser ? "Thêm người dùng" : "Sửa người dùng"}
                isCloseAfterOk={true}
                user={currentUser}
                handleOk={getUser}
              />
            )}
          </Paper>
        )}
        {dataUser && dataUser.total_page && dataUser.total_page > 1 && (
          <Box display="flex" justifyContent="center" mt={1}>
            <Pagination
              page={pageUser}
              onChange={(e, value) => setPageUser(value)}
              totalPage={dataUser.total_page}
            />
          </Box>
        )}
      </TabPanel>
      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={onConfirm}
          text={`Bạn có chắc chắn muốn xoá ${
            tab === 0 ? "quyền" : "người dùng"
          } này ?`}
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
export default UserManagement;
