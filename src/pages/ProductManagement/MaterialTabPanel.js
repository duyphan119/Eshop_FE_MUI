import { Button, IconButton, Paper, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";

import { getAll, getCurrentMaterial } from "../../redux/materialSlice";
import { calHeightDataGrid } from "../../utils";
import ModalMaterial from "../../components/ModalMaterial";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import { API_MATERIAL_URL } from "../../constants";
import ConfirmDialog from "../../components/ConfirmDialog";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const MaterialTabPanel = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const all = useSelector((state) => state.material.all);
  const current = useSelector((state) => state.material.current);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    configAxiosResponse()
      .get(`${API_MATERIAL_URL}`)
      .then((res) => {
        dispatch(getAll(res));
      })
      .catch((err) => {});
  }, [dispatch]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "value",
      headerName: "Chất liệu",
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
          <Tooltip title="Sửa chất liệu">
            <IconButton
              onClick={() => {
                dispatch(getCurrentMaterial(params.data));
                setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá chất liệu">
            <IconButton
              onClick={() => {
                dispatch(getCurrentMaterial(params.data));
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
  function getData(data) {
    const { value } = data;
    if (current) {
      configAxiosAll(user, dispatch)
        .put(`${API_MATERIAL_URL}`, {
          id: current.id,
          value,
        })
        .then((res) => {
          const _all = [...all];
          const index = _all.findIndex((el) => el.id === current.id);
          if (index !== -1) {
            _all[index] = res;
            dispatch(getAll(_all));
          }
        })
        .catch((err) => {});
    } else {
      configAxiosAll(user, dispatch)
        .post(`${API_MATERIAL_URL}`, {
          value,
        })
        .then((res) => {
          dispatch(getAll([res, ...all]));
        })
        .catch((err) => {});
    }
  }
  async function onConfirm() {
    try {
      await configAxiosAll(user, dispatch).delete(
        `${API_MATERIAL_URL}/${current.id}`
      );
      const data = await configAxiosResponse().get(`${API_MATERIAL_URL}`);
      dispatch(getAll(data));
    } catch (error) {}
  }
  return (
    <>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setOpen(true)}
        startIcon={<AddIcon />}
      >
        Thêm chất liệu
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
          <AgGridReact rowData={all} columnDefs={columns}></AgGridReact>
        </div>
        {open && (
          <ModalMaterial
            open={open}
            handleClose={() => setOpen(false)}
            labelOk={current ? "Sửa" : "Thêm"}
            title={!current ? "Thêm chất liệu" : "Sửa chất liệu"}
            isCloseAfterOk={true}
            material={current}
            handleOk={getData}
          />
        )}
      </Paper>
      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          text="Bạn có chắc chắn muốn xoá chất liệu này ?"
          onClose={() => setOpenDialog(false)}
          onConfirm={onConfirm}
        />
      )}
    </>
  );
};

export default MaterialTabPanel;
