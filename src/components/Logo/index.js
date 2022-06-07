import { Link } from "react-router-dom";
import config from "../../config";

import "./Logo.css";
const Logo = ({ style }) => {
  return (
    <Link to={config.routes.home} style={style} className="logo-link">
      <div className="logo">Duy</div>
    </Link>
  );
};

export default Logo;
