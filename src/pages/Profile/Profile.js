import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Divider, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import pageHeaderImg from "../../assets/imgs/search/bg-page-header.webp";
import Breadcrumbs from "../../components/Breadcrumbs";
import config from "../../config";
import { axiosRes } from "../../config/configAxios";
import { API_AUTH_URL } from "../../constants";
import { logout } from "../../redux/authSlice";

const items = [
  {
    text: "Thay đổi thông tin tài khoản",
    to: config.routes.profileEdit,
  },
  {
    text: "Đổi mật khẩu",
    to: config.routes.changePassword,
  },
  {
    text: "Đơn hàng",
    to: config.routes.profileOrder,
  },
  {
    text: "Đăng xuất",
    icon: <LogoutIcon sx={{ fontSize: "inherit" }} />,
  },
];

const Profile = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     full_name: user ? user.full_name : "",
  //   },
  // });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const [file, setFile] = useState();

  useEffect(() => {
    document.title = "Thông tin tài khoản";
  }, []);

  // const onSubmit = async (data) => {
  //   try {
  //     let reqData = data;
  //     if (file) {
  //       const formData = new FormData();
  //       formData.append("images", file);
  //       const urlList = await axiosRes().post(`${API_UPLOAD_URL}`, formData);
  //       reqData.avatar = urlList[0].path;
  //     }
  //     await configAxiosAll(user, dispatch).put(`${API_USER_URL}`, {
  //       ...reqData,
  //       id: user.id,
  //     });
  //     dispatch(login({ ...user, ...reqData }));
  //     setFile();
  //   } catch (error) {}
  // };

  const handleLogout = () => {
    axiosRes()
      .post(`${API_AUTH_URL}/logout`)
      .then(() => {
        dispatch(logout());
        navigate(config.routes.login);
      })
      .catch((err) => {});
  };
  return (
    <Box>
      <div
        style={{
          backgroundImage: `url(${pageHeaderImg})`,
          width: "100%",
          height: 260,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          paddingInline: 32,
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 8 }}>Trang thông tin</div>
        <Box pl={2}>
          <Breadcrumbs
            sx={{ fontSize: 10 }}
            items={[
              {
                text: "TRANG CHỦ",
                to: config.routes.home,
              },
              {
                text: "TRANG THÔNG TIN",
              },
            ]}
          />
        </Box>
      </div>
      <Box p={4}>
        <Box fontSize={26} pb={2}>
          Tài khoản
        </Box>
        <Box p={2}>
          <Grid container>
            <Grid item xs={6}>
              <Box fontSize={22}>Thông tin tài khoản</Box>
              <Divider sx={{ mt: 2, mb: 1, bgcolor: "#000" }} />
              {items.map((item, index) => {
                return (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    fontSize={14}
                    py={1}
                    sx={{
                      useSelect: "none",
                      cursor: "pointer",
                      "&:hover": {
                        textDecoration: "underline",
                        color: "var(--main-color)",
                      },
                    }}
                  >
                    {item.icon}
                    {item.to ? (
                      <Link to={item.to}>{item.text}</Link>
                    ) : (
                      <Box onClick={handleLogout}>{item.text}</Box>
                    )}
                  </Box>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
