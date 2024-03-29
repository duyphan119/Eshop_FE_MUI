import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { TitlePaper } from "../../components/Title";
import {
  PieChart,
  ResponsiveContainer,
  Pie,
  Cell,
  Legend,
  Text,
} from "recharts";
import { Box } from "@mui/material";

const colors = ["#f1f", "#11f", "#1f1", "#ff1", "#1ff", "#f11"];

const GroupCategoryRating = (props) => {
  const { data, height } = props;

  const totalCount = useMemo(() => {
    return data.reduce((prev, curr) => {
      return prev + curr.count;
    }, 0);
  }, [data]);

  return (
    <Box height={height}>
      <TitlePaper>Số lượng bán theo nhóm danh mục</TitlePaper>
      <ResponsiveContainer width="100%" height={height - 50}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="name"
            cx="50%"
            outerRadius={100}
            label={({ index, innerRadius, outerRadius, cx, cy, midAngle }) => {
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              return (
                <Text fill="#fff" dominantBaseline="hanging" x={x} y={y}>
                  {`${((data[index].count * 100) / totalCount).toFixed(1)}%`}
                </Text>
              );
            }}
          >
            {data.map((item, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

GroupCategoryRating.propTypes = {
  data: PropTypes.array,
};

export default memo(GroupCategoryRating);
