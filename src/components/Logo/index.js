import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import config from "../../config";

const Logo = ({ style, sx }) => {
  return (
    <Link to={config.routes.home} style={style}>
      <Box
        sx={{
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 40,
          fontWeight: 600,
          textTransform: "uppercase",
          ...sx,
        }}
      >
        Duy.P
      </Box>
    </Link>
  );
};

export default Logo;
