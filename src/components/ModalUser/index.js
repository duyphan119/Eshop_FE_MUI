import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../Modal";

const ModalUser = ({
  open,
  handleClose,
  title,
  labelOk,
  isCloseAfterOk,
  handleOk,
  width,
  user,
}) => {
  const roles = useSelector((state) => state.role.all);

  const [fullName, setFullName] = useState(user ? user.full_name : "");
  const [email, setEmail] = useState(user ? user.email : "");

  const [indexRole, setIndexRole] = useState(
    (function () {
      if (user) {
        const index = roles.findIndex((el) => el.id === user.role.id);
        if (index !== -1) {
          return index;
        }
      }
      return 0;
    })()
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      labelOk={labelOk}
      handleOk={() => {
        handleOk({
          fullName,
          email,
        });
      }}
      isCloseAfterOk={isCloseAfterOk}
      width={width}
    >
      <Grid container columnSpacing={2} rowSpacing={2} my={1}>
        {roles && (
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="role">Quyền</InputLabel>
              <Select
                label="Quyền"
                onChange={(e) => setIndexRole(e.target.value)}
                value={indexRole}
              >
                {roles.map((item, index) => (
                  <MenuItem key={index} value={index}>
                    {item.role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Họ và tên"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Địa chỉ email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </FormControl>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalUser;
