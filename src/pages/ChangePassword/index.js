import { Box, Button, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TitleAccount } from "../../components/Title";
import { API_USER_URL } from "../../constants";
import { configAxiosAll } from "../../config/configAxios";
import config from "../../config";
const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const newPassword = useRef({});
  newPassword.current = watch("newPassword", "");

  useEffect(() => {
    document.title = "Đổi mật khẩu";
  }, []);

  const onSubmit = (data) => {
    configAxiosAll(user, dispatch)
      .put(`${API_USER_URL}`, { password: data.newPassword, id: user.id })
      .then(() => {
        navigate(config.routes.account);
      })
      .catch((err) => {});
  };
  return (
    <>
      <TitleAccount leftLabel="Đổi mật khẩu" />
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          {...register("oldPassword", {
            required: "Trường này không được để trống",
          })}
          sx={{ width: 300 }}
          type="password"
          label="Mật khẩu hiện tại"
          error={errors.oldPassword}
        />
        <TextField
          {...register("newPassword", {
            required: "Trường này không được để trống",
          })}
          sx={{ width: 300, mt: 2 }}
          type="password"
          label="Mật khẩu mới"
          error={errors.newPassword}
        />
        <TextField
          {...register("confirmNewPassword", {
            required: "Trường này không được để trống",
            validate: (value) =>
              value === newPassword.current ||
              "Nhập lại mật khẩu không chính xác",
          })}
          sx={{ width: 300, mt: 2 }}
          type="password"
          label="Nhập lại mật khẩu mới"
          error={errors.confirmNewPassword}
        />
        <Box sx={{ width: 300 }} textAlign="center">
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Đổi mật khẩu
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ChangePassword;
