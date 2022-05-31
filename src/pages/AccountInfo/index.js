import { Box } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { TitleAccount } from "../../components/Title";
const AccountInfo = () => {
  const user = useSelector((state) => state.auth.currentUser);
  useEffect(() => {
    document.title = "Thông tin tài khoản";
  }, []);
  return (
    <>
      <TitleAccount leftLabel="Thông tin tài khoản" />
      <Box py={1} px={2}>
        Địa chỉ email: {user.email}
        <br />
        Họ tên: {user.full_name}
      </Box>
    </>
  );
};

export default AccountInfo;
