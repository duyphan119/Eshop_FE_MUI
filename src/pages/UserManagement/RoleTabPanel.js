import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../components/ConfirmDialog";
import ModalRole from "../../components/ModalRole";
import { configAxiosAll } from "../../config/configAxios";
import { API_ROLE_URL, API_USER_URL } from "../../constants";
import { getAll as getAllRoles, getCurrentRole } from "../../redux/roleSlice";
import { calHeightDataGrid } from "../../utils";

const RoleTabPanel = () => {
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
              color="secondary"
              onClick={() => {
                dispatch(getCurrentRole(params.data));
                setOpenRole(true);
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

  const user = useSelector((state) => state.auth.currentUser);
  const roles = useSelector((state) => state.role.all);
  const currentRole = useSelector((state) => state.role.current);
  const dispatch = useDispatch();

  const [openRole, setOpenRole] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

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
  async function onConfirm() {
    try {
      await configAxiosAll(user, dispatch).delete(
        `${API_ROLE_URL}/${currentRole.id}`
      );
      const data = await configAxiosAll(user, dispatch).get(`${API_ROLE_URL}`);
      dispatch(getAllRoles(data));
    } catch (error) {}
  }
  return (
    <>
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
        {openDialog && (
          <ConfirmDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            onConfirm={onConfirm}
            title="Bạn có chắc chắn muốn xoá quyền này ?"
          />
        )}
      </Paper>
    </>
  );
};

export default RoleTabPanel;
