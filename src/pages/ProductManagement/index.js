import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

import ColorTabPanel from "./ColorTabPanel";
import MaterialTabPanel from "./MaterialTabPanel";
import SizeTabPanel from "./SizeTabPanel";
import ProductTabPanel from "./ProductTabPanel";

const ProductManagement = () => {
  const [tab, setTab] = useState(3);

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
