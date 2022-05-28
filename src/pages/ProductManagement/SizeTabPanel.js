import { Button, IconButton, Paper, Tooltip } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";

import { getAll, getCurrentSize } from "../../redux/sizeSlice";
import { calHeightDataGrid } from "../../utils";
import ModalSize from "../../components/ModalSize";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import { API_SIZE_URL } from "../../constants";
import ConfirmDialog from "../../components/ConfirmDialog";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const SizeTabPanel = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const all = useSelector((state) => state.size.all);
  const current = useSelector((state) => state.size.current);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

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
      headerName: "Kích cỡ",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "code",
      headerName: "Viết tắt",
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
          <Tooltip title="Sửa kích cỡ">
            <IconButton
              onClick={() => {
                dispatch(getCurrentSize(params.data));
                setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>{" "}
          <Tooltip title="Xoá kích cỡ">
            <IconButton
              onClick={() => {
                dispatch(getCurrentSize(params.data));
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
        .put(`${API_SIZE_URL}`, {
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
        .post(`${API_SIZE_URL}`, {
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
        `${API_SIZE_URL}/${current.id}`
      );
      const data = await configAxiosResponse().get(`${API_SIZE_URL}`);
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
        Thêm kích cỡ
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
          <ModalSize
            open={open}
            handleClose={() => setOpen(false)}
            labelOk={current ? "Sửa" : "Thêm"}
            title={!current ? "Thêm kích cỡ" : "Sửa kích cỡ"}
            isCloseAfterOk={true}
            size={current}
            handleOk={getData}
          />
        )}
      </Paper>
      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          text="Bạn có chắc chắn muốn xoá kích cỡ này ?"
          onClose={() => setOpenDialog(false)}
          onConfirm={onConfirm}
        />
      )}
    </>
  );
};

export default SizeTabPanel;
