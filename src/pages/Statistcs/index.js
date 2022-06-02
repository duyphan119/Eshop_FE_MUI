import { Box, Button, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { configAxiosAll } from "../../config/configAxios";
import { API_STATISTICS_URL } from "../../constants";
import { exportComponentToPDF, getTotalDaysOfMonth } from "../../utils";
import ChartDaysInMonth from "./ChartDaysInMonth";
import ChartMonthsInYear from "./ChartMonthsInYear";
import ChartYears from "./ChartYears";

const Statistics = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [revenuesDaysInMonth, setRevenuesDaysInMonth] = useState([]);
  const [revenuesMonthsInYear, setRevenuesMonthsInYear] = useState([]);
  const [revenuesYears, setRevenuesYears] = useState([]);

  useEffect(() => {
    const promises = [];

    promises.push(
      new Promise((resolve, reject) =>
        resolve(
          configAxiosAll(user, dispatch).get(
            `${API_STATISTICS_URL}/revenue?type=years`
          )
        )
      )
    );
    promises.push(
      new Promise((resolve, reject) =>
        resolve(
          configAxiosAll(user, dispatch).get(
            `${API_STATISTICS_URL}/revenue?type=monthsInYear`
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
    Promise.allSettled(promises)
      .then((listRes) => {
        if (listRes[0].status === "fulfilled") {
          setRevenuesYears(listRes[0].value);
        }
        if (listRes[1].status === "fulfilled") {
          setRevenuesMonthsInYear(listRes[1].value);
        }
        if (listRes[2].status === "fulfilled") {
          let _index = -1;
          setRevenuesDaysInMonth(
            new Array(getTotalDaysOfMonth()).fill(1).map((item, index) => {
              _index = listRes[2].value.findIndex((el) => el.day === index + 1);
              if (_index === -1) {
                return { day: index + 1, total: 0 };
              } else {
                return {
                  day: index + 1,
                  total: listRes[2].value[_index].total,
                };
              }
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Paper
          sx={{
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 300,
              width: "100%",
              overflow: "overlay",
              p: 1,
            }}
            id="chart-years"
            className="custom-scrollbar-horizontal"
          >
            <ChartYears data={revenuesYears} />
          </Box>
          <div>
            <Button
              variant="contained"
              onClick={() => exportComponentToPDF("chart-years")}
              size="small"
            >
              Xuất file PDF
            </Button>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper
          sx={{
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 300,
              width: "100%",
              overflow: "overlay",
              p: 1,
            }}
            id="chart-months-in-year"
            className="custom-scrollbar-horizontal"
          >
            <ChartMonthsInYear data={revenuesMonthsInYear} />
          </Box>
          <div>
            <Button
              variant="contained"
              onClick={() => exportComponentToPDF("chart-months-in-year")}
              size="small"
            >
              Xuất file PDF
            </Button>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 360,
              width: "100%",
              overflow: "overlay",
              p: 1,
            }}
            id="chart-days-in-month"
            className="custom-scrollbar-horizontal"
          >
            <ChartDaysInMonth data={revenuesDaysInMonth} />
          </Box>
          <div>
            <Button
              variant="contained"
              onClick={() => exportComponentToPDF("chart-days-in-month")}
              size="small"
            >
              Xuất file PDF
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Statistics;
