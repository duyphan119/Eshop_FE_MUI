import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiUpdateUser } from "../api/apiUser";
const AccountPage = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const [newUser, setNewUser] = useState(user);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Thông tin tài khoản";
  }, []);

  const handleUpdate = async () => {
    apiUpdateUser(newUser, dispatch);
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
                id="middle_name"
                label="Tên lót"
                variant="outlined"
                value={newUser.middle_name}
                onChange={(e) =>
                  setNewUser({ ...newUser, middle_name: e.target.value })
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
