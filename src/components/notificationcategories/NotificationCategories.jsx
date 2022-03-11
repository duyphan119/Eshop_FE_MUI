import { Link } from "react-router-dom";
import "./notificationcategories.scss";

const NotificationCategories = ({ groups, buyerType }) => {
  return (
    <div className="notificationcategories">
      <div className="notificationcategories__groups">
        {groups.map((item) => {
          return (
            <div
              className="notificationcategories__group"
              key={item.id + item.name}
            >
              <Link
                to={`/${item.slug}`}
                className="notificationcategories__group-name"
              >
                {item.name.toUpperCase().split(` ${buyerType.name.toUpperCase()}`)[0]}
              </Link>
              {item.categories.map((category) => {
                return (
                  <Link
                    to={`/${category.slug}`}
                    key={category.id + category.name}
                    className="notificationcategories__group-item"
                  >
                    {category.name.split(` ${buyerType.name.toLowerCase()}`)[0]}
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
