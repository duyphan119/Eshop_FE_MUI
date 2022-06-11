import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TabPanel from "../../components/TabPanel";
import { configAxiosAll } from "../../config/configAxios";
import { API_ROLE_URL, API_USER_URL, LIMIT_ROW_USER } from "../../constants";
import { getAll as getAllRoles } from "../../redux/roleSlice";
import { getUser } from "../../redux/userSlice";
import RoleTabPanel from "./RoleTabPanel";
import UserTabPanel from "./UserTabPanel";

const UserManagement = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [tab, setTab] = useState(1);

  useEffect(() => {
    const promises = [];

    promises.push(
      new Promise((resolve, reject) =>
        resolve(configAxiosAll(user, dispatch).get(`${API_ROLE_URL}`))
      )
    );
    promises.push(
      new Promise((resolve, reject) =>
        resolve(
          configAxiosAll(user, dispatch).get(
            `${API_USER_URL}?limit=${LIMIT_ROW_USER}&p=${1}`
          )
        )
      )
    );
    Promise.allSettled(promises)
      .then((listRes) => {
        if (listRes[0].status === "fulfilled") {
          dispatch(getAllRoles(listRes[0].value));
        }
        if (listRes[1].status === "fulfilled") {
          dispatch(getUser(listRes[1].value));
        }
      })
      .catch((err) => {});
  }, [dispatch, user]);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#fff" }}>
        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          aria-label="basic tabs example"
        >
          <Tab label="Quyền" />
          <Tab label="Người dùng" />
        </Tabs>
      </Box>
      <TabPanel index={0} value={tab}>
        <RoleTabPanel />
      </TabPanel>
      <TabPanel index={1} value={tab}>
        <UserTabPanel />
      </TabPanel>
    </>
  );
};
export default UserManagement;
