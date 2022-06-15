import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";

import ColorTabPanel from "./ColorTabPanel";
import MaterialTabPanel from "./MaterialTabPanel";
import SizeTabPanel from "./SizeTabPanel";
import ProductTabPanel from "./ProductTabPanel";
import { axiosRes } from "../../config/configAxios";
import { API_COLOR_URL, API_MATERIAL_URL, API_SIZE_URL } from "../../constants";
import { useDispatch } from "react-redux";
import { getAll as getAllColors } from "../../redux/colorSlice";
import { getAll as getAllSizes } from "../../redux/sizeSlice";
import { getAll as getAllMaterials } from "../../redux/materialSlice";
import TabPanel from "../../components/TabPanel";

const ProductManagement = () => {
  const [tab, setTab] = useState(3);

  const dispatch = useDispatch();

  useEffect(() => {
    const promises = [];

    promises.push(axiosRes().get(`${API_COLOR_URL}`));
    promises.push(axiosRes().get(`${API_SIZE_URL}`));
    promises.push(axiosRes().get(`${API_MATERIAL_URL}`));

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
          <Tab label="Chất liệu" />
          <Tab label="Màu sắc" />
          <Tab label="Kích cỡ" />
          <Tab label="Sản phẩm" />
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

export default ProductManagement;
