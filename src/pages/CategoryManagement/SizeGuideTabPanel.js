import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AgGridReact } from "ag-grid-react";

import ModalSizeGuide from "../../components/ModalSizeGuide";
import Pagination from "../../components/Pagination";
import {
  changeLimit,
  changePage,
  deletedSizeGuide,
  getCurrentSizeGuide,
  newSizeGuide,
  updateSizeGuide,
} from "../../redux/sizeGuideSlice";
import {
  calHeightDataGrid,
  formatHeightGuide,
  formatWeightGuide,
} from "../../utils";
import { configAxiosAll } from "../../config/configAxios";
import { API_SIZE_GUIDE_URL, LIMIT_ROW_SIZE_GUIDE } from "../../constants";
import ConfirmDialog from "../../components/ConfirmDialog";

const SizeGuideTabPanel = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "category.name",
      headerName: "Danh mục",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "size.value",
      headerName: "Kích cỡ",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "height",
      headerName: "Chiều cao",
      flex: 1,
      sortable: true,
      filter: true,
      valueGetter: (params) =>
        formatHeightGuide(params.data.min_height, params.data.max_height),
    },
    {
      field: "weight",
      headerName: "Cân nặng",
      flex: 1,
      sortable: true,
      filter: true,
      valueGetter: (params) =>
        formatWeightGuide(params.data.min_weight, params.data.max_weight),
    },
    {
      field: "actions",
      headerName: "",
      pinned: "right",
      width: 120,
      cellRenderer: (params) => (
        <>
          <Tooltip title="Sửa hướng dẫn">
            <IconButton
              color="secondary"
              onClick={() => {
                dispatch(getCurrentSizeGuide(params.data));
                setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá hướng dẫn">
            <IconButton
              color="error"
              onClick={() => {
                dispatch(getCurrentSizeGuide(params.data));
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

  const sizeGuide = useSelector((state) => state.sizeGuide.sizeGuide);
  const limit = useSelector((state) => state.sizeGuide.limit);
  const page = useSelector((state) => state.sizeGuide.page);
  const current = useSelector((state) => state.sizeGuide.current);
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  async function handleOk(data) {
    try {
      const { category, size, minHeight, maxHeight, minWeight, maxWeight } =
        data;
      const req = {
        category_id: category.id,
        size_id: size.id,
        min_height: minHeight,
        max_height: maxHeight,
        min_weight: minWeight,
        max_weight: maxWeight,
      };

      if (current) {
        await configAxiosAll(user, dispatch).put(`${API_SIZE_GUIDE_URL}`, {
          ...req,
          id: current.id,
        });
        dispatch(updateSizeGuide({ ...req, category, size }));
      } else {
        const res = await configAxiosAll(user, dispatch).post(
          `${API_SIZE_GUIDE_URL}`,
          req
        );
        dispatch(newSizeGuide({ ...res, category, size }));
      }
    } catch (error) {}
  }

  async function onConfirm() {
    try {
      await configAxiosAll(user, dispatch).delete(
        `${API_SIZE_GUIDE_URL}/${current.id}`
      );
      dispatch(deletedSizeGuide(current.id));
    } catch (error) {}
  }

  return (
    <Box p={1} bgcolor="#fff">
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          dispatch(getCurrentSizeGuide(null));
          setOpen(true);
        }}
        startIcon={<AddIcon />}
      >
        Thêm hướng dẫn
      </Button>

      <div
        style={{
          width: "100%",
          overflow: "hidden",
          height: calHeightDataGrid(LIMIT_ROW_SIZE_GUIDE),
        }}
      >
        <div
          className="ag-theme-alpine"
          style={{ width: "100%", height: "100%" }}
        >
          <AgGridReact
            rowData={sizeGuide.items}
            columnDefs={columns}
          ></AgGridReact>
        </div>
      </div>
      {open && (
        <ModalSizeGuide
          open={open}
          handleClose={() => setOpen(false)}
          labelOk={current ? "Sửa" : "Thêm"}
          title={!current ? "Thêm hướng dẫn" : "Sửa hướng dẫn"}
          isCloseAfterOk={false}
          sizeGuide={current}
          handleOk={handleOk}
        />
      )}
      {sizeGuide && sizeGuide.total_page && (
        <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
          <Pagination
            showRowsPerPage={true}
            listRowPerPage={[LIMIT_ROW_SIZE_GUIDE, 50, 100, 200, 500]}
            rowsPerPage={limit}
            onChangeRowsPerPage={(value) => dispatch(changeLimit(value))}
            onChange={(e, value) => {
              dispatch(changePage(value));
            }}
            page={page}
            totalPage={sizeGuide.total_page}
          />
        </Box>
      )}
      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={onConfirm}
          text={`Bạn có chắc chắn muốn xoá ?`}
        />
      )}
    </Box>
  );
};

export default SizeGuideTabPanel;
