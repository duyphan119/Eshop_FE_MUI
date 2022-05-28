import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalBanner from "../../components/ModalBanner";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import {
  API_BANNER_URL,
  API_UPLOAD_URL,
  LIMIT_ROW_BANNER,
} from "../../constants";
import { calHeightDataGrid } from "../../utils";
import Pagination from "../../components/Pagination";
import ConfirmDialog from "../../components/ConfirmDialog";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
const BannerManagement = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "url",
      headerName: "Hình ảnh",
      flex: 2,
      cellRenderer: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <img src={params.data.url} height="30" alt="" />
        </div>
      ),
    },
    {
      field: "page",
      headerName: "Trang",
      flex: 1,
    },
    {
      field: "href",
      headerName: "Liên kết tới",
      flex: 2,
      sortable: true,
      filter: true,
    },
    {
      field: "position",
      headerName: "Vị trí",
      flex: 2,
      sortable: true,
      filter: true,
    },
    {
      field: "isShow",
      headerName: "Hiển thỉ",
      flex: 1,
      sortable: true,
      cellRenderer: (params) =>
        params.data.isShow ? (
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <CheckBoxIcon sx={{ color: "var(--success-color)" }} />
          </div>
        ) : (
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <CancelIcon sx={{ color: "var(--error-color)" }} />
          </div>
        ),
    },
    {
      field: "actions",
      headerName: "",
      pinned: "right",
      width: 120,
      cellRenderer: (params) => (
        <>
          <Tooltip title="Sửa banner">
            <IconButton
              onClick={() => {
                setCurrent(params.data);
                setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá banner">
            <IconButton
              onClick={() => {
                setCurrent(params.data);
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

  const dispatch = useDispatch();

  const [banner, setBanner] = useState();
  const [current, setCurrent] = useState();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    configAxiosResponse()
      .get(`${API_BANNER_URL}?limit=${LIMIT_ROW_BANNER}&p=${page}`)
      .then((data) => {
        setBanner(data);
      })
      .catch((err) => {});
  }, [page]);

  async function getData(data) {
    const { file, position, href, isShow, page } = data;
    let urlList;
    try {
      if (file) {
        let formData = new FormData();
        formData.append("images", file);
        urlList = await configAxiosResponse().post(
          `${API_UPLOAD_URL}`,
          formData
        );
      }
      if (current) {
        const updated = await configAxiosAll(user, dispatch).put(
          `${API_BANNER_URL}`,
          {
            id: current.id,
            position,
            href,
            isShow,
            page,
            url:
              urlList && urlList.length > 0
                ? urlList[0].secure_url
                : current.url,
          }
        );
        const _banners = [...banner.items];
        const index = _banners.findIndex((el) => el.id === current.id);
        if (index !== -1) {
          _banners[index] = updated;
          setBanner({ ...banner, items: _banners });
        }
      } else {
        const created = await configAxiosAll(user, dispatch).post(
          `${API_BANNER_URL}`,
          {
            position,
            href,
            isShow,
            page,
            url: urlList && urlList.length > 0 ? urlList[0].secure_url : null,
          }
        );
        setBanner({
          ...banner,
          items: [created, ...banner.items],
          total_result: banner.total_result + 1,
          total_page: (banner.total_result + 1) / banner.limit,
        });
      }
    } catch (error) {}
  }

  async function onConfirm() {
    try {
      if (current) {
        await configAxiosAll(user, dispatch).delete(
          `${API_BANNER_URL}/${current.id}`
        );
        const data = await configAxiosResponse().get(
          `${API_BANNER_URL}?limit=${LIMIT_ROW_BANNER}&p=${page}`
        );
        setBanner(data);
      }
    } catch (error) {}
  }

  return (
    <>
      <Paper sx={{ width: "100%", p: 2 }}>
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => {
            setCurrent(null);
            setOpen(true);
          }}
          startIcon={<AddIcon />}
        >
          Thêm banner
        </Button>
        {banner && (
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
              <AgGridReact
                rowData={banner.items}
                columnDefs={columns}
              ></AgGridReact>
            </div>
            {open && (
              <ModalBanner
                open={open}
                handleClose={() => setOpen(false)}
                labelOk={current ? "Sửa" : "Thêm"}
                title={!current ? "Thêm banner" : "Sửa banner"}
                isCloseAfterOk={true}
                banner={current}
                width={700}
                handleOk={getData}
              />
            )}
          </Paper>
        )}
        {banner && banner.total_page && banner.total_page > 1 && (
          <Box display="flex" justifyContent="center" mt={1}>
            <Pagination
              page={page}
              totalPage={banner.total_page}
              onChange={(e, value) => setPage(value)}
            />
          </Box>
        )}
      </Paper>
      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={onConfirm}
          text="Bạn có chắc chắn muốn xoá banner này ?"
        />
      )}
    </>
  );
};

export default BannerManagement;
