import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";

import ColorTabPanel from "./ColorTabPanel";
import MaterialTabPanel from "./MaterialTabPanel";
import SizeTabPanel from "./SizeTabPanel";
import ProductTabPanel from "./ProductTabPanel";
import { configAxiosResponse } from "../../config/configAxios";
import { API_COLOR_URL, API_MATERIAL_URL, API_SIZE_URL } from "../../constants";
import { useDispatch } from "react-redux";
import { getAll as getAllColors } from "../../redux/colorSlice";
import { getAll as getAllSizes } from "../../redux/sizeSlice";
import { getAll as getAllMaterials } from "../../redux/materialSlice";

const ProductManagement = () => {
  const [tab, setTab] = useState(3);

  const dispatch = useDispatch();

  useEffect(() => {
    const promises = [];

    promises.push(configAxiosResponse().get(`${API_COLOR_URL}`));
    promises.push(configAxiosResponse().get(`${API_SIZE_URL}`));
    promises.push(configAxiosResponse().get(`${API_MATERIAL_URL}`));

    Promise.allSettled(promises)
      .then((listRes) => {
        if (listRes[0].status === "fulfilled") {
          dispatch(getAllColors(listRes[0].value));
        }
        if (listRes[1].status === "fulfilled") {
          dispatch(getAllSizes(listRes[1].value));
        }
        if (listRes[2].status === "fulfilled") {
          dispatch(getAllMaterials(listRes[2].value));
        }
      })
      .catch((err) => {});
  }, [dispatch]);
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#fff" }}>
        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          aria-label="basic tabs example"
        >
          <Tab label="Chất liệu" {...a11yProps(0)} />
          <Tab label="Màu sắc" {...a11yProps(1)} />
          <Tab label="Kích cỡ" {...a11yProps(2)} />
          <Tab label="Sản phẩm" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel index={0} value={tab}>
        <MaterialTabPanel />
      </TabPanel>
      <TabPanel index={1} value={tab}>
        <ColorTabPanel />
      </TabPanel>
      <TabPanel index={2} value={tab}>
        <SizeTabPanel />
      </TabPanel>
      <TabPanel index={3} value={tab}>
        <ProductTabPanel />
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

export default ProductManagement;
