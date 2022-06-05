import { Button, IconButton, Paper, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";

import { getAll, getCurrentColor } from "../../redux/colorSlice";
import { calHeightDataGrid } from "../../utils";
import ModalColor from "../../components/ModalColor";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import { API_COLOR_URL } from "../../constants";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import ConfirmDialog from "../../components/ConfirmDialog";

const ColorTabPanel = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const all = useSelector((state) => state.color.all);
  const current = useSelector((state) => state.color.current);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    configAxiosResponse()
      .get(`${API_COLOR_URL}`)
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
      headerName: "Màu sắc",
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
          <Tooltip title="Sửa màu sắc">
            <IconButton
              onClick={() => {
                dispatch(getCurrentColor(params.data));
                setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá màu sắc">
            <IconButton
              onClick={() => {
                dispatch(getCurrentColor(params.data));
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
    const { value, code } = data;
    if (current) {
      configAxiosAll(user, dispatch)
        .put(`${API_COLOR_URL}`, {
          id: current.id,
          value,
          code,
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
        .post(`${API_COLOR_URL}`, {
          value,
          code,
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
        `${API_COLOR_URL}/${current.id}`
      );
      const data = await configAxiosResponse().get(`${API_COLOR_URL}`);
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
        Thêm màu sắc
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
          <ModalColor
            open={open}
            handleClose={() => setOpen(false)}
            labelOk={current ? "Sửa" : "Thêm"}
            title={!current ? "Thêm màu sắc" : "Sửa màu sắc"}
            isCloseAfterOk={true}
            color={current}
            handleOk={getData}
          />
        )}
      </Paper>
      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          text="Bạn có chắc chắn muốn xoá màu này ?"
          onClose={() => setOpenDialog(false)}
          onConfirm={onConfirm}
        />
      )}
    </>
  );
};

export default ColorTabPanel;
