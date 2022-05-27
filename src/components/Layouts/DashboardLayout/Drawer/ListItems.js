import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import CategoryIcon from "@mui/icons-material/Category";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import { Link } from "react-router-dom";
export const MainListItems = (
  <React.Fragment>
    <Link to="/dashboard">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Bảng điều khiển" />
      </ListItemButton>
    </Link>
    <Link to="/dashboard/category">
      <ListItemButton>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Danh mục" />
      </ListItemButton>
    </Link>
    <Link to="/dashboard/product">
      <ListItemButton>
        <ListItemIcon>
          <InventoryIcon />
        </ListItemIcon>
        <ListItemText primary="Sản phẩm" />
      </ListItemButton>
    </Link>
    <Link to="/dashboard/comment">
      <ListItemButton>
        <ListItemIcon>
          <ModeCommentIcon />
        </ListItemIcon>
        <ListItemText primary="Bình luận, đánh giá" />
      </ListItemButton>
    </Link>
    <Link to="/dashboard/order">
      <ListItemButton>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="Hoá đơn" />
      </ListItemButton>
    </Link>
    <Link to="/dashboard/user">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Người dùng" />
      </ListItemButton>
    </Link>
    <Link to="/dashboard/banner">
      <ListItemButton>
        <ListItemIcon>
          <ViewCarouselIcon />
        </ListItemIcon>
        <ListItemText primary="Banner" />
      </ListItemButton>
    </Link>
    <Link to="/dashboard/statistics">
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Thống kê" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const SecondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
