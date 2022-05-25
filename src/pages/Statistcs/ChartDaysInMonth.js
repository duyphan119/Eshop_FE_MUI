import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Typography } from "@mui/material";

const ChartDaysInMonth = ({ data }) => {
  const theme = useTheme();
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Biểu đồ doanh thu tháng {new Date().getMonth() + 1} năm{" "}
        {new Date().getFullYear()}
      </Typography>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 16,
          }}
        >
          <XAxis
            dataKey="day"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          ></YAxis>
          <Tooltip />
          <Bar dataKey="total" fill="var(--main-color)" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default ChartDaysInMonth;
