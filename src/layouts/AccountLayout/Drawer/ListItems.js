import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_AUTH_URL } from "../../../constants";
import { logout } from "../../../redux/authSlice";
export const MainListItems = ({ items, indexItem, getIndexItem }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogout = () => {
    axios.post(`${API_AUTH_URL}/logout`);
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      {items.map((item, index) => (
        <Link to={item.to} key={index} onClick={() => getIndexItem(index)}>
          <ListItemButton
            style={{
              color: indexItem === index ? "var(--main-color)" : "inherit",
            }}
          >
            <ListItemIcon>
              {(() => {
                const Icon = item.icon;
                return (
                  <Icon
                    style={{
                      color:
                        indexItem === index ? "var(--main-color)" : "inherit",
                    }}
                  />
                );
              })()}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </Link>
      ))}
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Đăng xuất" />
      </ListItemButton>
    </>
  );
};
