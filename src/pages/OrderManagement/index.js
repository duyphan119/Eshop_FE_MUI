import { Box, Tab, Tabs } from "@mui/material";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import React, { useState } from "react";
import CouponTabPanel from "./CouponTabPanel";
import OrderTabPanel from "./OrderTabPanel";

const OrderManagement = () => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#fff" }}>
        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          aria-label="basic tabs example"
        >
          <Tab label="Hoá đơn" {...a11yProps(0)} />
          <Tab label="Giảm giá" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel index={0} value={tab}>
        <OrderTabPanel />
      </TabPanel>
      <TabPanel index={1} value={tab}>
        <CouponTabPanel />
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

export default OrderManagement;
