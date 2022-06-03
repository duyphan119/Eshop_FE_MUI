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
import ModalDiscountGroupCategory from "../../components/ModalDiscountGroupCategory";
import ModalDiscountGender from "../../components/ModalDiscountGender";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import {
  API_CATEGORY_URL,
  API_DISCOUNT_CATEGORY_URL,
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
import {
  getAllDiscountCategories,
  getCurrentDiscountCategory,
} from "../../redux/discountCategorySlice";
import { calHeightDataGrid, formatDateTimeVN } from "../../utils";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import ConfirmDialog from "../../components/ConfirmDialog";
import ModalDiscountCategory from "../../components/ModalDiscountCategory";

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

  const columnDiscountCategories = [
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
      field: "start",
      headerName: "Ngày bắt đầu",
      flex: 1,
      sortable: true,
      filter: true,
      valueFormatter: (params) => formatDateTimeVN(params.data.start),
    },
    {
      field: "end",
      headerName: "Ngày kết thúc",
      flex: 1,
      sortable: true,
      filter: true,
      valueFormatter: (params) => formatDateTimeVN(params.data.end),
    },
    {
      field: "percent",
      headerName: "Phần trăm",
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
          <Tooltip title="Sửa giảm giá">
            <IconButton
              onClick={() => {
                dispatch(getCurrentDiscountCategory(params.data));
                setOpenDiscountCategory(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá giảm xoá">
            <IconButton
              onClick={() => {
                dispatch(getCurrentDiscountCategory(params.data));
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
  const discountCategories = useSelector((state) => state.discountCategory.all);
  const currentDiscountCategory = useSelector(
    (state) => state.discountCategory.current
  );
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [openGroupCategory, setOpenGroupCategory] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openDiscountCategory, setOpenDiscountCategory] = useState(false);
  const [openDiscountGroupCategory, setOpenDiscountGroupCategory] =
    useState(false);
  const [openDiscountGender, setOpenDiscountGender] = useState(false);
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
      promises.push(
        new Promise((resolve, reject) =>
          resolve(configAxiosResponse().get(`${API_DISCOUNT_CATEGORY_URL}`))
        )
      );
      Promise.allSettled(promises)
        .then((listRes) => {
          if (listRes[0].status === "fulfilled") {
            dispatch(getAllGenderCategories(listRes[0].value));
          }
          if (listRes[1].status === "fulfilled") {
            dispatch(getAllGroupCategories(listRes[1].value));
          }
          if (listRes[2].status === "fulfilled") {
            dispatch(getAllCategories(listRes[2].value));
          }
          if (listRes[3].status === "fulfilled") {
            dispatch(getAllDiscountCategories(listRes[3].value));
          }
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
  async function getDiscountCategory(data) {
    const { category, start, end, percent } = data;

    if (currentDiscountCategory) {
      configAxiosAll(user, dispatch)
        .put(`${API_DISCOUNT_CATEGORY_URL}`, {
          id: currentDiscountCategory.id,
          percent,
          start,
          end,
          category_id: category.id,
        })
        .then((res) => {
          const _discountCategories = [...discountCategories];
          const index = _discountCategories.findIndex(
            (el) => el.id === currentDiscountCategory.id
          );
          if (index !== -1) {
            _discountCategories[index] = res;
            dispatch(getAllDiscountCategories(_discountCategories));
          }
        })
        .catch((err) => {});
    } else {
      configAxiosAll(user, dispatch)
        .post(`${API_DISCOUNT_CATEGORY_URL}`, {
          percent,
          start,
          end,
          category_id: category.id,
        })
        .then((res) => {
          dispatch(
            getAllDiscountCategories([
              { ...res, category },
              ...discountCategories,
            ])
          );
        })
        .catch((err) => {});
    }
  }
  async function getDiscountGroupCategory(data) {
    const { groupCategory, start, end, percent } = data;
    const list = [];
    groupCategory.categories.forEach((item) => {
      list.push({
        percent,
        start,
        end,
        category_id: item.id,
      });
    });
    configAxiosAll(user, dispatch)
      .post(`${API_DISCOUNT_CATEGORY_URL}?many=true`, list)
      .then((res) => {})
      .catch((err) => {});
  }
  async function getDiscountGender(data) {
    const { genderCategory, start, end, percent } = data;
    const list = [];
    genderCategory.group_categories.forEach((item) => {
      item.categories.forEach((subItem) => {
        list.push({
          percent,
          start,
          end,
          category_id: subItem.id,
        });
      });
    });
    configAxiosAll(user, dispatch)
      .post(`${API_DISCOUNT_CATEGORY_URL}?many=true`, list)
      .then((res) => {})
      .catch((err) => {});
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
      } else if (tab === 1) {
        await configAxiosAll(user, dispatch).delete(
          `${API_CATEGORY_URL}/${currentCategory.id}`
        );
        const data = await configAxiosResponse().get(`${API_CATEGORY_URL}`);
        dispatch(getAllCategories(data));
      } else if (tab === 2) {
        await configAxiosAll(user, dispatch).delete(
          `${API_DISCOUNT_CATEGORY_URL}/${currentDiscountCategory.id}`
        );
        const data = await configAxiosResponse().get(
          `${API_DISCOUNT_CATEGORY_URL}`
        );
        dispatch(getAllDiscountCategories(data));
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
          <Tab label="Giảm giá" {...a11yProps(2)} />
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
        <Button
          variant="contained"
          sx={{ mb: 2, ml: 2 }}
          onClick={() => {
            setOpenDiscountGender(true);
          }}
          startIcon={<AddIcon />}
        >
          Thêm giảm giá đối tượng khách hàng
        </Button>
        <Button
          variant="contained"
          sx={{ mb: 2, ml: 2 }}
          onClick={() => {
            setOpenDiscountGroupCategory(true);
          }}
          startIcon={<AddIcon />}
        >
          Thêm giảm giá theo nhóm danh mục
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
        {openDiscountGroupCategory && (
          <ModalDiscountGroupCategory
            open={openDiscountGroupCategory}
            handleClose={() => setOpenDiscountGroupCategory(false)}
            labelOk="Thêm"
            title="Thêm giảm giá"
            isCloseAfterOk={true}
            handleOk={getDiscountGroupCategory}
          />
        )}
        {openDiscountGender && (
          <ModalDiscountGender
            open={openDiscountGender}
            handleClose={() => setOpenDiscountGender(false)}
            labelOk="Thêm"
            title="Thêm giảm giá"
            isCloseAfterOk={true}
            handleOk={getDiscountGender}
          />
        )}
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
      <TabPanel index={2} value={tab}>
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => {
            dispatch(getCurrentDiscountCategory(null));
            setOpenDiscountCategory(true);
          }}
          startIcon={<AddIcon />}
        >
          Thêm giảm giá
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
              rowData={discountCategories}
              columnDefs={columnDiscountCategories}
            ></AgGridReact>
          </div>
        </Paper>
        {openDiscountCategory && (
          <ModalDiscountCategory
            open={openDiscountCategory}
            handleClose={() => setOpenDiscountCategory(false)}
            labelOk={currentDiscountCategory ? "Sửa" : "Thêm"}
            title={!currentDiscountCategory ? "Thêm giảm giá" : "Sửa giảm giá"}
            isCloseAfterOk={true}
            discountCategory={currentDiscountCategory}
            handleOk={getDiscountCategory}
          />
        )}
      </TabPanel>
      {openDialog && (
        <ConfirmDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={onConfirm}
          text={`Bạn có chắc chắn muốn xoá ?`}
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
