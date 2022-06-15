import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  API_GROUP_CATEGORY_URL,
  LIMIT_ROW_GROUP_CATEGORY,
} from "../../../constants";
import { calHeightDataGrid } from "../../../utils";
import Pagination from "../../../components/Pagination";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useEffect } from "react";
import { axiosRes } from "../../../config/configAxios";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLimit,
  changePage,
  getGroupCategory,
} from "../../../redux/groupCategorySlice";
const CommentManagement = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      sortable: true,
      filter: true,
    },
    {
      field: "name",
      headerName: "Tên nhóm danh mục",
      sortable: true,
      filter: true,
    },
    {
      field: "shortName",
      headerName: "Viết tắt",
      sortable: true,
      filter: true,
    },
    {
      field: "avatar",
      headerName: "Hình ảnh",
      cellRenderer: (params) => (
        <img src={params.data.avatar} height="32" alt="" />
      ),
    },
    {
      field: "banner",
      headerName: "Quảng cáo",
      cellRenderer: (params) => (
        <img src={params.data.banner} height="32" alt="" />
      ),
    },
    {
      field: "slug",
      headerName: "Slug",
    },
    {
      field: "description",
      headerName: "Mô tả",
    },
    {
      field: "code",
      headerName: "Viết tắt",
      sortable: true,
      filter: true,
    },
    {
      field: "isHot",
      headerName: "Đang hot",
      valueGetter: (params) => (params.data.isHot ? "Hot" : "Không"),
    },
    {
      field: "actions",
      headerName: "",
      pinned: "right",
      width: 120,
      cellRenderer: (params) => (
        <>
          <Tooltip title="Sửa danh mục">
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
          <Tooltip title="Xoá danh mục">
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

  const groupCategory = useSelector(
    (state) => state.groupCategory.groupCategory
  );
  const page = useSelector((state) => state.groupCategory.page);
  const limit = useSelector((state) => state.groupCategory.limit);
  console.log(groupCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    const promises = [];
    promises.push(
      axiosRes().get(
        `${API_GROUP_CATEGORY_URL}?limit=${LIMIT_ROW_GROUP_CATEGORY}&p=${page}`
      )
    );
    Promise.allSettled(promises)
      .then((listRes) => {
        if (listRes[0].status === "fulfilled") {
          dispatch(getGroupCategory(listRes[0].value));
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
        Thêm nhóm danh mục
      </button>
      <Box>
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            height: calHeightDataGrid(LIMIT_ROW_GROUP_CATEGORY),
          }}
        >
          <div
            className="ag-theme-alpine"
            style={{ width: "100%", height: "100%" }}
          >
            <AgGridReact
              rowData={groupCategory.items}
              columnDefs={columns}
            ></AgGridReact>
          </div>
        </div>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
        <Pagination
          showRowsPerPage={true}
          listRowPerPage={[LIMIT_ROW_GROUP_CATEGORY, 50, 100, 200, 500]}
          rowsPerPage={limit}
          onChangeRowsPerPage={(value) => dispatch(changeLimit(value))}
          onChange={(e, value) => {
            dispatch(changePage(value));
          }}
          page={page}
          totalPage={groupCategory.totalPage}
        />
      </Box>
    </Box>
  );
};

export default CommentManagement;
