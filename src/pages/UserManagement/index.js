import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton, Tab, Tabs, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalRole from "../../components/ModalRole";
import ModalUser from "../../components/ModalUser";
import { CustomTableCell } from "../../components/TableCell";
import { configAxiosAll } from "../../config/configAxios";
import {
  API_ROLE_URL,
  API_USER_URL,
  LIMIT_ROW_ROLE,
  LIMIT_ROW_USER,
} from "../../constants";
import { getAll as getAllRoles, getCurrentRole } from "../../redux/roleSlice";
import { getAll as getAllUSers, getCurrentUser } from "../../redux/userSlice";
const useStyles = makeStyles({
  sticky: {
    position: "sticky",
    right: 0,
    backgroundColor: "#fff",
  },
});
const UserManagement = () => {
  const classes = useStyles();

  const user = useSelector((state) => state.auth.currentUser);
  const users = useSelector((state) => state.user.all);
  const currentUser = useSelector((state) => state.user.current);
  const roles = useSelector((state) => state.role.all);
  const currentRole = useSelector((state) => state.role.current);

  const dispatch = useDispatch();

  const [openRole, setOpenRole] = useState(false);
  const [pageRole, setPageRole] = useState(0);
  const [openUser, setOpenUser] = useState(false);
  const [pageUser, setPageUser] = useState(0);
  const [tab, setTab] = useState(1);

  useEffect(() => {
    document.title = "Quản lý người dùng";
  }, []);

  useEffect(() => {
    const promises = [];

    promises.push(
      new Promise((resolve, reject) =>
        resolve(configAxiosAll(user, dispatch).get(`${API_ROLE_URL}`))
      )
    );
    promises.push(
      new Promise((resolve, reject) =>
        resolve(configAxiosAll(user, dispatch).get(`${API_USER_URL}`))
      )
    );
    Promise.allSettled(promises)
      .then((listRes) => {
        if (listRes[0].status === "fulfilled") {
          dispatch(getAllRoles(listRes[0].value));
        }
        if (listRes[1].status === "fulfilled") {
          dispatch(getAllUSers(listRes[1].value));
        }
      })
      .catch((err) => {});
  }, [dispatch, user]);

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
          const _users = [...users];
          const index = _users.findIndex((el) => el.id === currentUser.id);
          if (index !== -1) {
            _users[index] = res;
            dispatch(getAllUSers(_users));
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
          dispatch(getAllUSers([{ ...res, role }, ...users]));
        })
        .catch((err) => {});
    }
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
          onClick={() => setOpenRole(true)}
          startIcon={<AddIcon />}
        >
          Thêm quyền
        </Button>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 380 }} className="custom-scrollbar">
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <CustomTableCell header align="center">
                    Mã số
                  </CustomTableCell>
                  <CustomTableCell header align="center">
                    Quyền
                  </CustomTableCell>
                  <CustomTableCell className={classes.sticky}></CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...roles]
                  .splice(pageRole * LIMIT_ROW_ROLE, LIMIT_ROW_ROLE)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <CustomTableCell align="center">
                          {row.id}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {row.role}
                        </CustomTableCell>
                        <CustomTableCell className={classes.sticky}>
                          <Tooltip title="Sửa quyền">
                            <IconButton
                              onClick={() => {
                                dispatch(getCurrentRole(row));
                                setOpenRole(true);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </CustomTableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {roles && (
            <TablePagination
              rowsPerPageOptions={[LIMIT_ROW_ROLE, 50, 100]}
              component="div"
              count={roles.length}
              rowsPerPage={LIMIT_ROW_ROLE}
              page={pageRole}
              onPageChange={(e, page) => {
                setPageRole(page);
              }}
            />
          )}
          {openRole && (
            <ModalRole
              open={openRole}
              handleClose={() => setOpenRole(false)}
              labelOk={currentRole ? "Sửa" : "Thêm"}
              title={!currentRole ? "Thêm quyền" : "Sửa quyền"}
              isCloseAfterOk={true}
              user={currentRole}
              // width={500}
              handleOk={getRole}
            />
          )}
        </Paper>
      </TabPanel>
      <TabPanel index={1} value={tab}>
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => setOpenUser(true)}
          startIcon={<AddIcon />}
        >
          Thêm người dùng
        </Button>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 380 }} className="custom-scrollbar">
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <CustomTableCell header align="center">
                    Mã số
                  </CustomTableCell>
                  <CustomTableCell header align="center">
                    Họ tên
                  </CustomTableCell>
                  <CustomTableCell header align="center">
                    Địa chỉ email
                  </CustomTableCell>
                  <CustomTableCell header align="center">
                    Quyền
                  </CustomTableCell>
                  <CustomTableCell className={classes.sticky}></CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...users]
                  .splice(pageUser * LIMIT_ROW_USER, LIMIT_ROW_USER)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <CustomTableCell align="center">
                          {row.id}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {row.full_name}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {row.email}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {row.role.role}
                        </CustomTableCell>
                        <CustomTableCell className={classes.sticky}>
                          <Tooltip title="Sửa người dùng">
                            <IconButton
                              onClick={() => {
                                dispatch(getCurrentUser(row));
                                setOpenUser(true);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </CustomTableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {users && (
            <TablePagination
              rowsPerPageOptions={[LIMIT_ROW_USER, 50, 100]}
              component="div"
              count={users.length}
              rowsPerPage={LIMIT_ROW_USER}
              page={pageUser}
              onPageChange={(e, page) => {
                setPageUser(page);
              }}
            />
          )}
          {openUser && (
            <ModalUser
              open={openUser}
              handleClose={() => setOpenUser(false)}
              labelOk={currentUser ? "Sửa" : "Thêm"}
              title={!currentUser ? "Thêm người dùng" : "Sửa người dùng"}
              isCloseAfterOk={true}
              user={currentUser}
              // width={500}
              handleOk={getUser}
            />
          )}
        </Paper>
      </TabPanel>
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
        <Box sx={{ p: 3, bgcolor: "#fff" }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}
export default UserManagement;
