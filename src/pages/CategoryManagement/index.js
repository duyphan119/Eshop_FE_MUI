import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton, Tab, Tabs, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalCategory from "../../components/ModalCategory";
import ModalGroupCategory from "../../components/ModalGroupCategory";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import {
  API_CATEGORY_URL,
  API_GENDER_URL,
  API_GROUP_CATEGORY_URL,
  API_UPLOAD_URL,
} from "../../constants";
import {
  getAll as getAllCategories,
  getCurrentCategory,
} from "../../redux/categorySlice";
import { getAll as getAllGenderCategories } from "../../redux/genderCategorySlice";
import {
  getAll as getAllGroupCategories,
  getCurrentGroupCategory,
} from "../../redux/groupCategorySlice";
import { calHeightDataGrid } from "../../utils";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import ConfirmDialog from "../../components/ConfirmDialog";

const CategoryManagement = () => {
  const columnGroups = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "gender.name",
      headerName: "Đối tượng khách hàng",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "name",
      headerName: "Tên nhóm danh mục",
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
          <Tooltip title="Sửa nhóm danh mục">
            <IconButton
              onClick={() => {
                dispatch(getCurrentGroupCategory(params.data));
                setOpenGroupCategory(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá nhóm danh mục">
            <IconButton
              onClick={() => {
                dispatch(getCurrentGroupCategory(params.data));
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

  const columnCategories = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "group_category.gender.name",
      headerName: "Đối tượng",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "group_category.name",
      headerName: "Nhóm danh mục",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "icon",
      headerName: "Icon",
      flex: 1,
      cellRenderer: (params) => (
        <img src={params.data.icon} width="16" height="16" alt="" />
      ),
    },
    {
      field: "name",
      headerName: "Tên danh mục",
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
          <Tooltip title="Sửa danh mục">
            <IconButton
              onClick={() => {
                dispatch(getCurrentCategory(params.data));
                setOpenCategory(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá danh mục">
            <IconButton
              onClick={() => {
                dispatch(getCurrentCategory(params.data));
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
  const categories = useSelector((state) => state.category.all);
  const currentCategory = useSelector((state) => state.category.current);
  const groupCategories = useSelector((state) => state.groupCategory.all);
  const currentGroupCategory = useSelector(
    (state) => state.groupCategory.current
  );

  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [openGroupCategory, setOpenGroupCategory] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [tab, setTab] = useState(1);

  useEffect(() => {
    (function () {
      const promises = [];
      promises.push(
        new Promise((resolve, reject) =>
          resolve(configAxiosResponse().get(`${API_GENDER_URL}`))
        )
      );
      promises.push(
        new Promise((resolve, reject) =>
          resolve(configAxiosResponse().get(`${API_GROUP_CATEGORY_URL}`))
        )
      );
      promises.push(
        new Promise((resolve, reject) =>
          resolve(configAxiosResponse().get(`${API_CATEGORY_URL}`))
        )
      );
      Promise.allSettled(promises)
        .then((listRes) => {
          dispatch(getAllGenderCategories(listRes[0].value));
          dispatch(getAllGroupCategories(listRes[1].value));
          dispatch(getAllCategories(listRes[2].value));
        })
        .catch((err) => {});
    })();
  }, [dispatch]);

  function getGroupCategory(data) {
    const { name, gender } = data;
    if (currentCategory) {
      configAxiosAll(user, dispatch)
        .put(`${API_GROUP_CATEGORY_URL}`, {
          id: currentCategory,
          name,
          gender_id: gender.id,
        })
        .then((res) => {
          const _groupCategories = [...groupCategories];
          const index = _groupCategories.findIndex(
            (el) => el.id === currentCategory.id
          );
          if (index !== -1) {
            _groupCategories[index] = res;
            dispatch(getAllGroupCategories(_groupCategories));
          }
        })
        .catch((err) => {});
    } else {
      configAxiosAll(user, dispatch)
        .post(`${API_GROUP_CATEGORY_URL}`, {
          name,
          gender_id: gender.id,
        })
        .then((res) => {
          console.log(res);
          dispatch(
            getAllGroupCategories([{ ...res, gender }, ...groupCategories])
          );
        })
        .catch((err) => {});
    }
  }

  async function getCategory(data) {
    const { name, code, file, groupCategory } = data;
    let urlList;
    if (file) {
      let formData = new FormData();
      formData.append("images", file);
      urlList = await configAxiosResponse().post(`${API_UPLOAD_URL}`, formData);
    }
    if (currentCategory) {
      configAxiosAll(user, dispatch)
        .put(`${API_CATEGORY_URL}`, {
          id: currentCategory.id,
          name,
          code,
          icon:
            urlList && urlList.length > 0
              ? urlList[0].secure_url
              : currentCategory.icon,
          group_category_id: groupCategory.id,
        })
        .then((res) => {
          const _categories = [...categories];
          const index = _categories.findIndex(
            (el) => el.id === currentCategory.id
          );
          if (index !== -1) {
            _categories[index] = res;
            dispatch(getAllCategories(_categories));
          }
        })
        .catch((err) => {});
    } else {
      configAxiosAll(user, dispatch)
        .post(`${API_CATEGORY_URL}`, {
          name,
          code,
          icon: urlList && urlList.length > 0 ? urlList[0].secure_url : null,
          group_category_id: groupCategory.id,
        })
        .then((res) => {
          dispatch(
            getAllCategories([{ ...res, groupCategory }, ...categories])
          );
        })
        .catch((err) => {});
    }
  }

  async function onConfirm() {
    try {
      if (tab === 0) {
        await configAxiosAll(user, dispatch).delete(
          `${API_GROUP_CATEGORY_URL}/${currentGroupCategory.id}`
        );
        const data = await configAxiosResponse().get(
          `${API_GROUP_CATEGORY_URL}`
        );
        dispatch(getAllGroupCategories(data));
      } else {
        await configAxiosAll(user, dispatch).delete(
          `${API_CATEGORY_URL}/${currentCategory.id}`
        );
        const data = await configAxiosResponse().get(`${API_CATEGORY_URL}`);
        dispatch(getAllCategories(data));
      }
    } catch (error) {}
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#fff" }}>
        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          aria-label="basic tabs example"
        >
          <Tab label="Nhóm danh mục" {...a11yProps(0)} />
          <Tab label="Danh mục" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel index={0} value={tab}>
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => {
            dispatch(getCurrentGroupCategory(null));
            setOpenGroupCategory(true);
          }}
          startIcon={<AddIcon />}
        >
          Thêm nhóm danh mục
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
            <AgGridReact
              rowData={groupCategories}
              columnDefs={columnGroups}
            ></AgGridReact>
          </div>
          {openGroupCategory && (
            <ModalGroupCategory
              open={openGroupCategory}
              handleClose={() => setOpenGroupCategory(false)}
              labelOk={currentGroupCategory ? "Sửa" : "Thêm"}
              title={
                !currentGroupCategory
                  ? "Thêm nhóm danh mục"
                  : "Sửa nhóm danh mục"
              }
              isCloseAfterOk={true}
              groupCategory={currentGroupCategory}
              // width={500}
              handleOk={getGroupCategory}
            />
          )}
        </Paper>
      </TabPanel>
      <TabPanel index={1} value={tab}>
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => {
            dispatch(getCurrentCategory(null));
            setOpenCategory(true);
          }}
          startIcon={<AddIcon />}
        >
          Thêm danh mục
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
            <AgGridReact
              rowData={categories}
              columnDefs={columnCategories}
            ></AgGridReact>
          </div>
        </Paper>
        {openCategory && (
          <ModalCategory
            open={openCategory}
            handleClose={() => setOpenCategory(false)}
            labelOk={currentCategory ? "Sửa" : "Thêm"}
            title={!currentCategory ? "Thêm danh mục" : "Sửa danh mục"}
            isCloseAfterOk={true}
            category={currentCategory}
            handleOk={getCategory}
          />
        )}
      </TabPanel>
      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={onConfirm}
          text={`Bạn có chắc chắn muốn xoá ${
            tab === 0 ? "nhóm" : ""
          } danh mục này ?`}
        />
      )}
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
export default CategoryManagement;
