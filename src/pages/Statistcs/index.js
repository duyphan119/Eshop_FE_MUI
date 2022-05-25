import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { configAxiosAll } from "../../config/configAxios";
import { API_STATISTICS_URL } from "../../constants";
import { formatThousandDigits, getTotalDaysOfMonth } from "../../utils";
import ChartDaysInMonth from "./ChartDaysInMonth";
const Statistics = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [revenuesDaysInMonth, setRevenuesDaysInMonth] = useState([]);
  const [countOrder, setCountOrder] = useState([]);
  const [countUser, setCountUser] = useState([]);
  const [revenueCurrentMonth, setRevenueCurrentMonth] = useState([]);
  const [countComment, setCountComment] = useState([]);

  useEffect(() => {
    document.title = "Báo cáo, thống kê";
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
            `${API_STATISTICS_URL}/revenue?type=daysInMonth`
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
    Promise.allSettled(promises)
      .then((listRes) => {
        if (listRes[0].status === "fulfilled") {
          setCountOrder(listRes[0].value);
        }
        if (listRes[1].status === "fulfilled") {
          let _index = -1;

          setRevenuesDaysInMonth(
            new Array(getTotalDaysOfMonth()).fill(1).map((item, index) => {
              _index = listRes[1].value.findIndex((el) => el.day === index + 1);
              if (_index === -1) {
                return { day: index + 1, total: 0 };
              } else {
                return {
                  day: index + 1,
                  total: listRes[1].value[_index].total,
                };
              }
            })
          );
        }
        if (listRes[2].status === "fulfilled") {
          setCountUser(listRes[2].value);
        }
        if (listRes[3].status === "fulfilled") {
          setRevenueCurrentMonth(listRes[3].value);
        }
        if (listRes[4].status === "fulfilled") {
          setCountComment(listRes[4].value);
        }
      })
      .catch((err) => {});
  }, [user, dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Widget
          icon={<PersonAddAltIcon sx={{ fontSize: 40 }} />}
          title="Người dùng"
          value={
            countUser.length > 0
              ? countUser.find((el) => el.month === new Date().getMonth() + 1)
                  .count
              : 0
          }
          comparedValue={
            countUser.length > 1
              ? countUser.find((el) => el.month !== new Date().getMonth() + 1)
                  .count
              : 0
          }
        />
      </Grid>
      <Grid item xs={3}>
        <Widget
          icon={<ReceiptLongIcon sx={{ fontSize: 40 }} />}
          title="Hoá đơn"
          value={
            countOrder.length > 0
              ? countOrder.find((el) => el.month === new Date().getMonth() + 1)
                  .count
              : 0
          }
          comparedValue={
            countOrder.length > 1
              ? countOrder.find((el) => el.month !== new Date().getMonth() + 1)
                  .count
              : 0
          }
        />
      </Grid>
      <Grid item xs={3}>
        <Widget
          icon={<AttachMoneyIcon sx={{ fontSize: 40 }} />}
          title="Doanh thu"
          value={
            revenueCurrentMonth.length > 0
              ? parseInt(
                  revenueCurrentMonth.find(
                    (el) => el.month === new Date().getMonth() + 1
                  ).total
                )
              : 0
          }
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
      <Grid item xs={3}>
        <Widget
          icon={<ChatBubbleOutlineIcon sx={{ fontSize: 40 }} />}
          title="Đánh giá"
          value={
            countComment.length > 0
              ? countComment.find(
                  (el) => el.month === new Date().getMonth() + 1
                ).count
              : 0
          }
          comparedValue={
            countComment.length > 1
              ? countComment.find(
                  (el) => el.month !== new Date().getMonth() + 1
                ).count
              : 0
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <ChartDaysInMonth data={revenuesDaysInMonth} />
        </Paper>
      </Grid>
    </Grid>
  );
};

const Widget = ({ icon, title, value, comparedValue }) => {
  return (
    <Paper
      sx={{
        height: 120,
        display: "flex",
        p: 2,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography>{title}</Typography>
        <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
          {formatThousandDigits(value)}
        </Typography>
        {comparedValue > 0 && value > 0 && (
          <div
            style={{
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              color:
                value / comparedValue < 1
                  ? "var(--error-color)"
                  : "var(--success-color)",
            }}
          >
            {(value / comparedValue).toFixed(2)}
            {value / comparedValue > 1 && (
              <ArrowUpwardIcon
                sx={{ fontSize: 16, transform: "translateY(-1px)" }}
              />
            )}
            {value / comparedValue < 1 && (
              <ArrowDownwardIcon
                sx={{ fontSize: 16, transform: "translateY(-1px)" }}
              />
            )}
            <span style={{ color: "#000", fontSize: 12 }}>
              (so với tháng trước)
            </span>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {icon}
      </div>
    </Paper>
  );
};

export default Statistics;
