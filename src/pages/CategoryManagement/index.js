import { Box, Tab, Tabs } from "@mui/material";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { configAxiosResponse } from "../../config/configAxios";
import {
  API_CATEGORY_URL,
  API_DISCOUNT_CATEGORY_URL,
  API_GENDER_URL,
  API_GROUP_CATEGORY_URL,
  API_SIZE_GUIDE_URL,
  API_SIZE_URL,
  LIMIT_ROW_SIZE_GUIDE,
} from "../../constants";
import { getAllCategories } from "../../redux/categorySlice";
import { getAllDiscountCategories } from "../../redux/discountCategorySlice";
import { getAllGenderCategories } from "../../redux/genderCategorySlice";
import { getAllGroupCategories } from "../../redux/groupCategorySlice";
import { getSizeGuide } from "../../redux/sizeGuideSlice";
import { getAll as getAllSizes } from "../../redux/sizeSlice";
import CategoryTabPanel from "./CategoryTabPanel";
import DiscountCategoryTabPanel from "./DiscountCategoryTabPanel";
import GenderTabPanel from "./GenderTabPanel";
import GroupCategoryTabPanel from "./GroupCategoryTabPanel";
import SizeGuideTabPanel from "./SizeGuideTabPanel";

const CategoryManagement = () => {
  const dispatch = useDispatch();

  const [tab, setTab] = useState(1);

  useEffect(() => {
    (function () {
      const promises = [];
      promises.push(configAxiosResponse().get(`${API_GENDER_URL}`));
      promises.push(configAxiosResponse().get(`${API_GROUP_CATEGORY_URL}`));
      promises.push(configAxiosResponse().get(`${API_CATEGORY_URL}`));
      promises.push(configAxiosResponse().get(`${API_DISCOUNT_CATEGORY_URL}`));
      promises.push(
        configAxiosResponse().get(
          `${API_SIZE_GUIDE_URL}?limit=${LIMIT_ROW_SIZE_GUIDE}`
        )
      );
      promises.push(configAxiosResponse().get(`${API_SIZE_URL}`));
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
          if (listRes[4].status === "fulfilled") {
            dispatch(getSizeGuide(listRes[4].value));
          }
          if (listRes[5].status === "fulfilled") {
            dispatch(getAllSizes(listRes[5].value));
          }
        })
        .catch((err) => {});
    })();
  }, [dispatch]);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#fff" }}>
        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          aria-label="basic tabs example"
        >
          <Tab label="Đối tượng khách hàng" {...a11yProps(0)} />
          <Tab label="Nhóm danh mục" {...a11yProps(1)} />
          <Tab label="Danh mục" {...a11yProps(2)} />
          <Tab label="Giảm giá" {...a11yProps(3)} />
          <Tab label="Hướng dẫn chọn kích cỡ" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel index={0} value={tab}>
        <GenderTabPanel />
      </TabPanel>
      <TabPanel index={1} value={tab}>
        <GroupCategoryTabPanel />
      </TabPanel>
      <TabPanel index={2} value={tab}>
        <CategoryTabPanel />
      </TabPanel>
      <TabPanel index={3} value={tab}>
        <DiscountCategoryTabPanel />
      </TabPanel>
      <TabPanel index={4} value={tab}>
        <SizeGuideTabPanel />
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
        <Box sx={{ p: 1, bgcolor: "#fff" }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}
export default CategoryManagement;
