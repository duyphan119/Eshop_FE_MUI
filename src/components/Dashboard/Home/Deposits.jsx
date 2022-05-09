import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { Link } from "react-router-dom";

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link
          to="/dashboard/orders"
          style={{
            marginTop: "24px",
            color: "var(--main-color)",
            textDecoration: "underline",
            fontSize: "14px",
          }}
        >
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
