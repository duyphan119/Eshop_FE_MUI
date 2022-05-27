import { Button, IconButton, Paper, Tooltip } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";

import { getAll, getCurrentColor } from "../../redux/colorSlice";
import { calHeightDataGrid } from "../../utils";
import ModalColor from "../../components/ModalColor";
import { configAxiosAll } from "../../config/configAxios";
import { API_COLOR_URL } from "../../constants";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const ColorTabPanel = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const all = useSelector((state) => state.color.all);
  const current = useSelector((state) => state.color.current);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

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
      width: 100,
      cellRenderer: (params) => (
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
      ),
    },
  ];
  function getData(data) {
    const { value } = data;
    if (current) {
      configAxiosAll(user, dispatch)
        .put(`${API_COLOR_URL}`, {
          id: current.id,
          value,
        })
        .then((res) => {
          const _all = [...all];
          const index = all.findIndex((el) => el.id === current.id);
          if (index !== -1) {
            all[index] = res;
            dispatch(getAll(_all));
          }
        })
        .catch((err) => {});
    } else {
      configAxiosAll(user, dispatch)
        .post(`${API_COLOR_URL}`, {
          value,
        })
        .then((res) => {
          dispatch(getAll([res, ...all]));
        })
        .catch((err) => {});
    }
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
    </>
  );
};

export default ColorTabPanel;
