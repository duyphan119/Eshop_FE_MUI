import { Grid, Paper } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import Widget from "../../components/Widget";
import { configAxiosAll } from "../../config/configAxios";
import {
  API_ORDER_URL,
  API_PRODUCT_URL,
  API_STATISTICS_URL,
  LIMIT_RECENT_ORDERS,
} from "../../constants";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import BestSellers from "./BestSellers";
import { getRecentOrders } from "../../redux/orderSlice";
import { getBestSellersDashboard } from "../../redux/productSlice";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [revenueHoursInDay, setRevenueHoursInDay] = useState([]);
  const [countOrder, setCountOrder] = useState([]);
  const [countUser, setCountUser] = useState([]);
  const [revenueCurrentMonth, setRevenueCurrentMonth] = useState([]);
  const [countComment, setCountComment] = useState([]);
  const [countProduct, setCountProduct] = useState([]);

  const calRevenueCurrentMonth = useMemo(() => {
    if (revenueCurrentMonth.length > 0) {
      const x = revenueCurrentMonth.find(
        (el) => el.month === new Date().getMonth() + 1
      );
      if (x) {
        return parseInt(x.total);
      }
    }
    return 0;
  }, [revenueCurrentMonth]);

  useEffect(() => {
    document.title = "Bảng điều khiển";
  }, []);

  useEffect(() => {
    const promises = [];

    promises.push(
      configAxiosAll(user, dispatch).get(
        `${API_STATISTICS_URL}/order?type=countCurrentMonth`
      )
    );

    promises.push(
      configAxiosAll(user, dispatch).get(
        `${API_STATISTICS_URL}/user?type=countCurrentMonth`
      )
    );
    promises.push(
      configAxiosAll(user, dispatch).get(
        `${API_STATISTICS_URL}/revenue?type=sumCurrentMonth`
      )
    );
    promises.push(
      configAxiosAll(user, dispatch).get(
        `${API_STATISTICS_URL}/comment?type=countCurrentMonth`
      )
    );
    promises.push(
      configAxiosAll(user, dispatch).get(
        `${API_STATISTICS_URL}/product?type=countCurrentMonth`
      )
    );
    promises.push(
      configAxiosAll(user, dispatch).get(
        `${API_STATISTICS_URL}/revenue?type=hoursInDay`
      )
    );
    promises.push(
      configAxiosAll(user, dispatch).get(
        `${API_ORDER_URL}?limit=${LIMIT_RECENT_ORDERS}`
      )
    );
    promises.push(
      configAxiosAll(user, dispatch).get(`${API_PRODUCT_URL}?type=best-seller`)
    );
    Promise.allSettled(promises)
      .then((listRes) => {
        console.log(`${API_STATISTICS_URL}/revenue?type=hoursInDay`);
        if (listRes[0].status === "fulfilled") {
          setCountOrder(listRes[0].value);
        }
        if (listRes[1].status === "fulfilled") {
          setCountUser(listRes[1].value);
        }
        if (listRes[2].status === "fulfilled") {
          setRevenueCurrentMonth(listRes[2].value);
        }
        if (listRes[3].status === "fulfilled") {
          setCountComment(listRes[3].value);
        }
        if (listRes[4].status === "fulfilled") {
          setCountProduct(listRes[4].value);
        }
        if (listRes[5].status === "fulfilled") {
          let i, j;
          const arr = new Array(12).fill(1).map((item, index) => {
            const value = listRes[5].value;
            i = value.findIndex((el) => el.hour === index * 2);
            j = value.findIndex((el) => el.hour === index * 2 + 1);

            return {
              hour: index * 2 + " - " + (index * 2 + 2),
              total:
                (i === -1 ? 0 : parseInt(value[i].total)) +
                (j === -1 ? 0 : parseInt(value[j].total)),
            };
          });

          setRevenueHoursInDay(arr);
        }
        if (listRes[6].status === "fulfilled") {
          dispatch(getRecentOrders(listRes[6].value.items));
        }
        if (listRes[7].status === "fulfilled") {
          dispatch(getBestSellersDashboard(listRes[7].value.items));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, dispatch]);

  return (
    <Grid container spacing={1}>
      <Grid
        item
        xs={12}
        lg={3}
        md={6}
        sx={{
          maxWidth: {
            lg: "20%",
            md: "50%",
          },
          flexBasis: {
            lg: "20%",
            md: "50%",
          },
        }}
      >
        <Widget
          icon={<PersonAddAltIcon sx={{ fontSize: 40 }} />}
          title="Người dùng"
          value={2}
          // value={
          //   countUser.length > 0
          //     ? countUser.find((el) => el.month === new Date().getMonth() + 1)
          //         ?.count
          //     : 0
          // }
          // comparedValue={
          //   countUser.length > 1
          //     ? countUser.find((el) => el.month !== new Date().getMonth() + 1)
          //         ?.count
          //     : 0
          // }
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={3}
        md={6}
        sx={{
          maxWidth: {
            lg: "20%",
            md: "50%",
          },
          flexBasis: {
            lg: "20%",
            md: "50%",
          },
        }}
      >
        <Widget
          icon={<ReceiptLongIcon sx={{ fontSize: 40 }} />}
          title="Hoá đơn"
          value={1}
          // value={
          //   countOrder.length > 0
          //     ? countOrder.find((el) => el.month === new Date().getMonth() + 1)
          //         ?.count
          //     : 0
          // }
          // comparedValue={
          //   countOrder.length > 1
          //     ? countOrder.find((el) => el.month !== new Date().getMonth() + 1)
          //         ?.count
          //     : 0
          // }
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={3}
        md={6}
        sx={{
          maxWidth: {
            lg: "20%",
            md: "50%",
          },
          flexBasis: {
            lg: "20%",
            md: "50%",
          },
        }}
      >
        <Widget
          icon={<AttachMoneyIcon sx={{ fontSize: 40 }} />}
          title="Doanh thu"
          value={570000}
          // value={calRevenueCurrentMonth}
          // comparedValue={
          //   revenueCurrentMonth.length > 1
          //     ? parseInt(
          //         revenueCurrentMonth.find(
          //           (el) => el.month !== new Date().getMonth() + 1
          //         ).total
          //       )
          //     : 0
          // }
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={3}
        md={6}
        sx={{
          maxWidth: {
            lg: "20%",
            md: "50%",
          },
          flexBasis: {
            lg: "20%",
            md: "50%",
          },
        }}
      >
        <Widget
          icon={<ChatBubbleOutlineIcon sx={{ fontSize: 40 }} />}
          title="Đánh giá"
          value={1}
          // value={
          //   countComment.length > 0
          //     ? countComment.find(
          //         (el) => el.month === new Date().getMonth() + 1
          //       )?.count
          //     : 0
          // }
          // comparedValue={
          //   countComment.length > 1
          //     ? countComment.find(
          //         (el) => el.month !== new Date().getMonth() + 1
          //       )?.count
          //     : 0
          // }
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={3}
        md={6}
        sx={{
          maxWidth: {
            lg: "20%",
            md: "100%",
          },
          flexBasis: {
            lg: "20%",
            md: "100%",
          },
        }}
      >
        <Widget
          icon={<InventoryIcon sx={{ fontSize: 40 }} />}
          title="Sản phẩm"
          value={2}
          // value={
          //   countProduct.length > 0
          //     ? countProduct.find(
          //         (el) => el.month === new Date().getMonth() + 1
          //       )?.count
          //     : 0
          // }
          // comparedValue={
          //   countProduct.length > 1
          //     ? countProduct.find(
          //         (el) => el.month !== new Date().getMonth() + 1
          //       )?.count
          //     : 0
          // }
        />
      </Grid>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
            overflowX: "overlay",
            overflowY: "hidden",
          }}
          className="custom-scrollbar-horizontal"
        >
          <Chart
            // data={revenueHoursInDay}
            data={[
              {
                hour: "0-2",
                total: 0,
              },
              {
                hour: "2-4",
                total: 0,
              },
              {
                hour: "4-6",
                total: 0,
              },
              {
                hour: "8-10",
                total: 0,
              },
              {
                hour: "10-12",
                total: 0,
              },
              {
                hour: "12-14",
                total: 0,
              },
              {
                hour: "14-16",
                total: 570000,
              },
              {
                hour: "16-18",
                total: 0,
              },
              {
                hour: "18-20",
                total: 0,
              },
              {
                hour: "20-22",
                total: 0,
              },
              {
                hour: "22-24",
                total: 0,
              },
            ]}
          />
        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Deposits
            // total={revenueHoursInDay.reduce((prev, cur) => {
            //   return prev + cur.total;
            // }, 0)}
            total={570000}
          />
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Orders />
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <BestSellers />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
