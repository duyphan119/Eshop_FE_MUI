import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { API_COLOR_URL, LIMIT_ROW_COLOR } from "../../../constants";
import { calHeightDataGrid } from "../../../utils";
import Pagination from "../../../components/Pagination";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useEffect } from "react";
import { configAxiosResponse } from "../../../config/configAxios";
import { useDispatch, useSelector } from "react-redux";
import { changeLimit, changePage, getColor } from "../../../redux/colorSlice";
const ColorManagement = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      sortable: true,
      filter: true,
    },
    {
      field: "value",
      flex: 1,
      headerName: "Tên màu",
      sortable: true,
      filter: true,
    },
    {
      field: "shortValue",
      flex: 1,
      headerName: "Viết tắt",
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
              color="secondary"
              onClick={() => {
                // dispatch(getCurrentCategory(params.data));
                // setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá màu sắc">
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

  const color = useSelector((state) => state.color.color);
  const page = useSelector((state) => state.color.page);
  const limit = useSelector((state) => state.color.limit);
  console.log(color);
  const dispatch = useDispatch();

  useEffect(() => {
    const promises = [];
    promises.push(
      configAxiosResponse().get(
        `${API_COLOR_URL}?limit=${LIMIT_ROW_COLOR}&p=${page}`
      )
    );
    Promise.allSettled(promises)
      .then((listRes) => {
        if (listRes[0].status === "fulfilled") {
          dispatch(getColor(listRes[0].value));
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
        Thêm màu sắc
      </button>
      <Box>
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            height: calHeightDataGrid(LIMIT_ROW_COLOR),
          }}
        >
          <div
            className="ag-theme-alpine"
            style={{ width: "100%", height: "100%" }}
          >
            <AgGridReact
              rowData={color.items}
              columnDefs={columns}
            ></AgGridReact>
          </div>
        </div>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
        <Pagination
          showRowsPerPage={true}
          listRowPerPage={[LIMIT_ROW_COLOR, 50, 100, 200, 500]}
          rowsPerPage={limit}
          onChangeRowsPerPage={(value) => dispatch(changeLimit(value))}
          onChange={(e, value) => {
            dispatch(changePage(value));
          }}
          page={page}
          totalPage={color.totalPage}
        />
      </Box>
    </Box>
  );
};

export default ColorManagement;
