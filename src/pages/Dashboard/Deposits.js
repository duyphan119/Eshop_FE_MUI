import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { Link } from "react-router-dom";
import { formatThousandDigits, formatTimeVN } from "../../utils";

export default function Deposits({ total }) {
  console.log(total);
  return (
    <React.Fragment>
      <Title>Doanh thu hôm nay</Title>
      <Typography component="p" variant="h4">
        {formatThousandDigits(total)}đ
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {formatTimeVN(new Date()).split(" ")[0]}
      </Typography>
      <div>
        <Link
          to="/dashboard/statistics"
          style={{
            marginTop: "24px",
            color: "var(--main-color)",
            textDecoration: "underline",
            fontSize: "14px",
          }}
        >
          Xem thống kê
        </Link>
      </div>
    </React.Fragment>
  );
}
