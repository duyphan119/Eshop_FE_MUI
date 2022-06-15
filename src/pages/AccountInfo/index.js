import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { TitleAccount } from "../../components/Title";
import { configAxiosAll, axiosRes } from "../../config/configAxios";
import { API_UPLOAD_URL, API_USER_URL } from "../../constants";
import { login } from "../../redux/authSlice";

const AccountInfo = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: user ? user.full_name : "",
    },
  });

  const dispatch = useDispatch();

  const [file, setFile] = useState();

  useEffect(() => {
    document.title = "Thông tin tài khoản";
  }, []);

  const onSubmit = async (data) => {
    try {
      let reqData = data;
      if (file) {
        const formData = new FormData();
        formData.append("images", file);
        const urlList = await axiosRes().post(`${API_UPLOAD_URL}`, formData);
        reqData.avatar = urlList[0].secure_url;
      }
      await configAxiosAll(user, dispatch).put(`${API_USER_URL}`, {
        ...reqData,
        id: user.id,
      });
      dispatch(login({ ...user, ...reqData }));
      setFile();
    } catch (error) {}
  };
  console.log(file);
  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <TitleAccount leftLabel="Thông tin tài khoản" />
      <Grid container spacing={2} p={2}>
        <Grid item xs={12}>
          <input
            type="file"
            accept="image/*"
            id="avatar"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="avatar">
            {!file && user.avatar !== "" ? (
              <Avatar
                alt=""
                src={user.avatar}
                sx={{ cursor: "pointer", width: 60, height: 60 }}
              />
            ) : (
              <div
                style={{
                  width: 60,
                  height: 60,
                  border: "1px solid #000",
                  cursor: "pointer",
                  backgroundImage: `url(${
                    file ? URL.createObjectURL(file) : ""
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "50%",
                }}
              ></div>
            )}
          </label>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <TextField
              label="Địa chỉ email"
              size="small"
              disabled={true}
              defaultValue={user ? user.email : ""}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <TextField
              label="Họ tên"
              size="small"
              {...register("full_name", {
                required: "Trường này không được để trống",
              })}
              error={errors.full_name}
              helperText={errors.full_name && errors.full_name.message}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">
            Cập nhật
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountInfo;
