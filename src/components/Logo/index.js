import { Link } from "react-router-dom";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import config from "../../config";
import "./Logo.css";
const Logo = ({ style }) => {
  return (
    <Link to={config.routes.home} style={style} className="logo-link">
      <LogoDevIcon
        sx={{
          transform: "translateY(-1px)",
          fontSize: style.fontSize ? style.fontSize : 36,
          marginRight: "4px",
        }}
      />
    </Link>
  );
};

export default Logo;
