import { Link } from "react-router-dom";
import "./bannertop.scss";
const BannerTop = () => {
  return (
    <div className="banner-top">
      <Link to="/" className="banner-top-link"></Link>
    </div>
  );
};

export default BannerTop;
