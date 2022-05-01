import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useDispatch, useSelector } from "react-redux";
import { apiUpdateUser } from "../api/apiUser";
import { apiUploadImages } from "../api/apiUpload";
import { useEffect, useState } from "react";
const AccountPage = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const [newUser, setNewUser] = useState(user);
  const [newAvatar, setNewAvatar] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Thông tin tài khoản";
  }, []);

  const handleUpdate = async () => {
    if (newAvatar) {
      const formData = new FormData();
      formData.append("images", newAvatar);
      const url = await apiUploadImages(formData);
      apiUpdateUser({ ...newUser, avatar: url[0] }, dispatch);
    } else {
      apiUpdateUser(newUser, dispatch);
    }
  };

  return (
    <Box sx={{ paddingBlock: "20px" }}>
      <Container>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Thông tin cá nhân</Typography>
          </Grid>
        </Grid>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <label
              htmlFor="avatar"
              style={{
                borderRadius: "50%",
                border: "1px solid #555",
                width: "100px",
                height: "100px",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <input
                id="avatar"
                type="file"
                hidden
                onChange={(e) => setNewAvatar(e.target.files[0])}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#05050529",
                  height: "100%",
                  width: "100%",
                  borderRadius: "50%",
                }}
              >
                <CameraAltOutlinedIcon />
              </div>
              {user.avatar && (
                <img
                  src={newAvatar ? URL.createObjectURL(newAvatar) : user.avatar}
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
            </label>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                id="first_name"
                label="Tên"
                variant="outlined"
                value={newUser.first_name}
                onChange={(e) =>
                  setNewUser({ ...newUser, first_name: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                id="last_name"
                label="Họ"
                variant="outlined"
                value={newUser.last_name}
                onChange={(e) =>
                  setNewUser({ ...newUser, last_name: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="gender">Giới tính</InputLabel>
              <Select
                labelId="gender"
                id="select-gender"
                label="Giới tính"
                value={newUser.gender}
                onChange={(e) =>
                  setNewUser({ ...newUser, gender: e.target.value })
                }
              >
                <MenuItem value={1}>Nam</MenuItem>
                <MenuItem value={0}>Nữ</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FormControl fullWidth>
                <DesktopDatePicker
                  label="Ngày sinh"
                  inputFormat="MM/dd/yyyy"
                  value={newUser.birthday}
                  onChange={(value) =>
                    setNewUser({ ...newUser, birthday: value })
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                id="phone_number"
                label="Số điện thoại"
                variant="outlined"
                value={newUser.phone_number ? newUser.phone_number : ""}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone_number: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" onClick={handleUpdate}>
              Lưu
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AccountPage;
