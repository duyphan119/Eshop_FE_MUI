import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
const AccountInfo = () => {
  useEffect(() => {
    document.title = "Thông tin tài khoản";
  }, []);
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
        borderBottom="1px solid black"
      >
        <Typography color="var(--main-color)">Thông tin tài khoản</Typography>
      </Box>
    </>
  );
};

export default AccountInfo;
