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
import { apiGetRevenue } from "../../../api/apiStatistics";

export default function Chart() {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [revenue, setRevenue] = React.useState([]);

  const theme = useTheme();

  React.useEffect(() => {
    const callApi = async () => {
      const data = await apiGetRevenue(user, "?type=daysInMonth", dispatch);
      setRevenue(
        new Array(24).fill(1).map((item, index) => {
          const revenue = data.find((el) => el.hour === index);
          return { hour: index, total: revenue ? revenue.total : 0 };
        })
      );
    };
    callApi();
  }, [user, dispatch]);

  console.log(revenue);

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={revenue}
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
