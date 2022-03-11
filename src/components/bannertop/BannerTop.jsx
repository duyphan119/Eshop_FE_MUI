import { Link } from "react-router-dom";
import "./bannertop.scss";
const BannerTop = () => {
  return (
    <section className="banner-top">
      <Link to="/" className="banner-top-link"></Link>
    </section>
  );
};

export default BannerTop;
