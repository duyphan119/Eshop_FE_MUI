import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton, Tab, Tabs, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalCategory from "../../components/ModalCategory";
import ModalGroupCategory from "../../components/ModalGroupCategory";
import { CustomTableCell } from "../../components/TableCell";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import {
  API_CATEGORY_URL,
  API_GENDER_URL,
  API_GROUP_CATEGORY_URL,
  LIMIT_ROW_CATEGORY,
  LIMIT_ROW_GROUP_CATEGORY,
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
const useStyles = makeStyles({
  sticky: {
    position: "sticky",
    right: 0,
    backgroundColor: "#fff",
  },
});
const CategoryManagement = () => {
  const classes = useStyles();

  const user = useSelector((state) => state.auth.currentUser);
  const categories = useSelector((state) => state.category.all);
  const currentCategory = useSelector((state) => state.category.current);
  const groupCategories = useSelector((state) => state.groupCategory.all);
  const currentGroupCategory = useSelector(
    (state) => state.groupCategory.current
  );

  const dispatch = useDispatch();

  const [openGroupCategory, setOpenGroupCategory] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [pageGroupCategory, setPageGroupCategory] = useState(0);
  const [pageCategory, setPageCategory] = useState(0);
  const [tab, setTab] = useState(1);

  useEffect(() => {
    document.title = "Quản lý danh mục";
  }, []);

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
        .post(`${API_CATEGORY_URL}`, {
          name,
          gender_id: gender.id,
        })
        .then((res) => {
          dispatch(getAllCategories([{ ...res, gender }, ...groupCategories]));
        })
        .catch((err) => {});
    }
  }

  function getCategory(data) {
    const { name, code, groupCategory } = data;
    if (currentCategory) {
      configAxiosAll(user, dispatch)
        .put(`${API_CATEGORY_URL}`, {
          id: currentCategory,
          name,
          code,
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
          onClick={() => setOpenGroupCategory(true)}
          startIcon={<AddIcon />}
        >
          Thêm nhóm danh mục
        </Button>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 380 }} className="custom-scrollbar">
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <CustomTableCell header align="center">
                    Mã nhóm
                  </CustomTableCell>
                  <CustomTableCell header align="center">
                    Đối tượng kháchh hàng
                  </CustomTableCell>
                  <CustomTableCell header align="center">
                    Tên nhóm danh mục
                  </CustomTableCell>
                  <CustomTableCell className={classes.sticky}></CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...groupCategories]
                  .splice(
                    pageGroupCategory * LIMIT_ROW_GROUP_CATEGORY,
                    LIMIT_ROW_GROUP_CATEGORY
                  )
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <CustomTableCell align="center">
                          {row.id}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {row.gender.name}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {row.name}
                        </CustomTableCell>
                        <CustomTableCell className={classes.sticky}>
                          <Tooltip title="Sửa nhóm danh mục">
                            <IconButton
                              onClick={() => {
                                dispatch(getCurrentGroupCategory(row));
                                setOpenGroupCategory(true);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </CustomTableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {groupCategories && (
            <TablePagination
              rowsPerPageOptions={[LIMIT_ROW_GROUP_CATEGORY, 50, 100]}
              component="div"
              count={groupCategories.length}
              rowsPerPage={LIMIT_ROW_GROUP_CATEGORY}
              page={pageGroupCategory}
              onPageChange={(e, page) => {
                setPageGroupCategory(page);
              }}
            />
          )}
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
          onClick={() => setOpenCategory(true)}
          startIcon={<AddIcon />}
        >
          Thêm danh mục
        </Button>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 380 }} className="custom-scrollbar">
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <CustomTableCell header align="center">
                    Mã danh mục
                  </CustomTableCell>
                  <CustomTableCell header align="center">
                    Nhóm danh mục
                  </CustomTableCell>
                  <CustomTableCell header align="center">
                    Tên danh mục
                  </CustomTableCell>
                  <CustomTableCell header align="center">
                    SKU
                  </CustomTableCell>
                  <CustomTableCell className={classes.sticky}></CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...categories]
                  .splice(pageCategory * LIMIT_ROW_CATEGORY, LIMIT_ROW_CATEGORY)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <CustomTableCell align="center">
                          {row.id}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {row.group_category.name}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {row.name}
                        </CustomTableCell>
                        <CustomTableCell align="center">
                          {row.code}
                        </CustomTableCell>
                        <CustomTableCell className={classes.sticky}>
                          <Tooltip title="Sửa danh mục">
                            <IconButton
                              onClick={() => {
                                dispatch(getCurrentCategory(row));
                                setOpenCategory(true);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </CustomTableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {categories && (
            <TablePagination
              rowsPerPageOptions={[LIMIT_ROW_CATEGORY, 50, 100]}
              component="div"
              count={categories.length}
              rowsPerPage={LIMIT_ROW_CATEGORY}
              page={pageCategory}
              onPageChange={(e, page) => {
                setPageCategory(page);
              }}
            />
          )}
          {openCategory && (
            <ModalCategory
              open={openCategory}
              handleClose={() => setOpenCategory(false)}
              labelOk={currentCategory ? "Sửa" : "Thêm"}
              title={!currentCategory ? "Thêm danh mục" : "Sửa danh mục"}
              isCloseAfterOk={true}
              category={currentCategory}
              // width={500}
              handleOk={getCategory}
            />
          )}
        </Paper>
      </TabPanel>
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
