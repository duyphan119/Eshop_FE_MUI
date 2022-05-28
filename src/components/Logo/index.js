import { Link } from "react-router-dom";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import config from "../../config";
import "./Logo.css";
const Logo = () => {
  return (
    <Link to={config.routes.home} className="logo-link">
      <LogoDevIcon
        sx={{
          transform: "translateY(-1px)",
          fontSize: 36,
          marginRight: "4px",
        }}
      />
      CHICKEN DEV
    </Link>
  );
};

export default Logo;
