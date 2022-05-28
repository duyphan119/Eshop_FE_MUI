import { useEffect } from "react";

import { TitleAccount } from "../../components/Title";
const AccountInfo = () => {
  useEffect(() => {
    document.title = "Thông tin tài khoản";
  }, []);
  return (
    <>
      <TitleAccount leftLabel="Thông tin tài khoản" />
    </>
  );
};

export default AccountInfo;
