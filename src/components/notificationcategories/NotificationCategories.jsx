import { Link } from "react-router-dom";
import "./notificationcategories.scss";

const NotificationCategories = ({ groups }) => {
  if (!groups || groups.length === 0) {
    return "";
  }
  return (
    <div className="notificationcategories">
      <div className="notificationcategories__groups">
        {groups.map((item) => {
          return (
            <div className="notificationcategories__group" key={item.slug}>
              <Link
                to={`/${item.slug}`}
                className="notificationcategories__group-name"
              >
                {item.short_name.toUpperCase()}
              </Link>
              {item.Categories.map((category) => {
                return (
                  <Link
                    to={`/${category.slug}`}
                    key={category.slug}
                    className="notificationcategories__group-item"
                  >
                    {category.short_name.toUpperCase()}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationCategories;
