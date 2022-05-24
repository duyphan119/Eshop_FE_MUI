import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import { API_CATEGORY_URL, LIMIT_ROW_CATEGORY } from "../../constants";
import ModalEditOrder from "../../components/ModalEditOrder";
import { CustomTableCell } from "../../components/TableCell";
import {
  getAll as getAllCategories,
  getCurrentCategory,
} from "../../redux/categorySlice";
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

  const dispatch = useDispatch();

  const [openCategory, setOpenCategory] = useState(false);
  const [pageCategory, setPageCategory] = useState(0);

  useEffect(() => {
    (function () {
      const promises = [];
      promises.push(
        new Promise((resolve, reject) =>
          resolve(configAxiosResponse().get(`${API_CATEGORY_URL}`))
        )
      );
      Promise.allSettled(promises)
        .then((listRes) => {
          dispatch(getAllCategories(listRes[0].value));
        })
        .catch((err) => {});
    })();
  }, [dispatch]);

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
      <Grid container>
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => setOpenCategory(true)}
            startIcon={<AddIcon />}
          >
            Thêm danh mục
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ height: 520, width: "100%", bgcolor: "#fff" }}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer
              sx={{ maxHeight: 520 }}
              className="custom-scrollbar"
            >
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
                      Nhóm danh mục
                    </CustomTableCell>
                    <CustomTableCell header align="center">
                      Tên danh mục
                    </CustomTableCell>
                    <CustomTableCell header align="center">
                      SKU
                    </CustomTableCell>
                    <CustomTableCell
                      className={classes.sticky}
                    ></CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories
                    .splice(
                      pageCategory * LIMIT_ROW_CATEGORY,
                      LIMIT_ROW_CATEGORY
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
                            {row.groupCategory.name}
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
            {currentCategory && openCategory && (
              <ModalEditOrder
                open={openCategory}
                handleClose={() => setOpenCategory(false)}
                labelOk="Sửa"
                title={`Sửa hoá đơn ${currentCategory.id}`}
                isCloseAfterOk={true}
                order={currentCategory}
                // width={500}
                handleOk={getCategory}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default CategoryManagement;
