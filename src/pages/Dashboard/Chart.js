import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { API_STATISTICS_URL } from "../../constants";
import { configAxiosAll } from "../../config/configAxios";

export default function Chart() {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [revenueHoursInDay, setRevenueHoursInDay] = React.useState([]);

  const theme = useTheme();

  React.useEffect(() => {
    (async function () {
      (async function () {
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
              (i === -1 ? 0 : data[i].total) + (j === -1 ? 0 : data[j].total),
          };
        });

        setRevenueHoursInDay(arr);
      })();
    })();
  }, [user, dispatch]);

  return (
    <React.Fragment>
      <Title>Biểu đồ doanh thu hôm nay</Title>
      <ResponsiveContainer>
        <LineChart
          data={revenueHoursInDay}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 16,
          }}
        >
          <XAxis
            dataKey="hour"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          ></YAxis>
          <Tooltip />
          <Line
            isAnimationActive={true}
            type="monotone"
            dataKey="total"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
