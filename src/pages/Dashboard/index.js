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
import { API_STATISTICS_URL } from "../../constants";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";

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
      new Promise((resolve, reject) =>
        resolve(
          configAxiosAll(user, dispatch).get(
            `${API_STATISTICS_URL}/order?type=countCurrentMonth`
          )
        )
      )
    );

    promises.push(
      new Promise((resolve, reject) =>
        resolve(
          configAxiosAll(user, dispatch).get(
            `${API_STATISTICS_URL}/user?type=countCurrentMonth`
          )
        )
      )
    );
    promises.push(
      new Promise((resolve, reject) =>
        resolve(
          configAxiosAll(user, dispatch).get(
            `${API_STATISTICS_URL}/revenue?type=sumCurrentMonth`
          )
        )
      )
    );
    promises.push(
      new Promise((resolve, reject) =>
        resolve(
          configAxiosAll(user, dispatch).get(
            `${API_STATISTICS_URL}/comment?type=countCurrentMonth`
          )
        )
      )
    );
    promises.push(
      new Promise((resolve, reject) =>
        resolve(
          configAxiosAll(user, dispatch).get(
            `${API_STATISTICS_URL}/product?type=countCurrentMonth`
          )
        )
      )
    );
    promises.push(
      new Promise((resolve, reject) =>
        resolve(
          configAxiosAll(user, dispatch).get(
            `${API_STATISTICS_URL}/revenue?type=hoursInDay`
          )
        )
      )
    );
    Promise.allSettled(promises)
      .then((listRes) => {
        console.log(listRes);
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
          value={
            countUser.length > 0
              ? countUser.find((el) => el.month === new Date().getMonth() + 1)
                  ?.count
              : 0
          }
          comparedValue={
            countUser.length > 1
              ? countUser.find((el) => el.month !== new Date().getMonth() + 1)
                  ?.count
              : 0
          }
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
          value={
            countOrder.length > 0
              ? countOrder.find((el) => el.month === new Date().getMonth() + 1)
                  ?.count
              : 0
          }
          comparedValue={
            countOrder.length > 1
              ? countOrder.find((el) => el.month !== new Date().getMonth() + 1)
                  ?.count
              : 0
          }
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
          value={calRevenueCurrentMonth}
          comparedValue={
            revenueCurrentMonth.length > 1
              ? parseInt(
                  revenueCurrentMonth.find(
                    (el) => el.month !== new Date().getMonth() + 1
                  ).total
                )
              : 0
          }
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
          value={
            countComment.length > 0
              ? countComment.find(
                  (el) => el.month === new Date().getMonth() + 1
                )?.count
              : 0
          }
          comparedValue={
            countComment.length > 1
              ? countComment.find(
                  (el) => el.month !== new Date().getMonth() + 1
                )?.count
              : 0
          }
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
          value={
            countProduct.length > 0
              ? countProduct.find(
                  (el) => el.month === new Date().getMonth() + 1
                )?.count
              : 0
          }
          comparedValue={
            countProduct.length > 1
              ? countProduct.find(
                  (el) => el.month !== new Date().getMonth() + 1
                )?.count
              : 0
          }
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
          <Chart data={revenueHoursInDay} />
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
            total={revenueHoursInDay.reduce((prev, cur) => {
              return prev + cur.total;
            }, 0)}
          />
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Orders />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
