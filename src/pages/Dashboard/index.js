import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { configAxiosAll } from "../../config/configAxios";
import { API_STATISTICS_URL } from "../../constants";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [revenueHoursInDay, setRevenueHoursInDay] = useState([]);

  useEffect(() => {
    document.title = "Bảng điều khiển";
  }, []);
  console.log(`${API_STATISTICS_URL}/revenue?type=hoursInDay`);
  useEffect(() => {
    (async function () {
      try {
        const data = await configAxiosAll(user, dispatch).get(
          `${API_STATISTICS_URL}/revenue?type=hoursInDay`
        );
        let i, j;
        const arr = new Array(12).fill(1).map((item, index) => {
          i = data.findIndex((el) => el.hour === index * 2);
          j = data.findIndex((el) => el.hour === index * 2 + 1);

          return {
            hour: index * 2 + " - " + (index * 2 + 2),
            total:
              (i === -1 ? 0 : parseInt(data[i].total)) +
              (j === -1 ? 0 : parseInt(data[j].total)),
          };
        });

        setRevenueHoursInDay(arr);
      } catch (error) {}
    })();
  }, [user, dispatch]);

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
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
