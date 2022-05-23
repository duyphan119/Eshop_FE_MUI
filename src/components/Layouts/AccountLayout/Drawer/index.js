import { Avatar, Box, Typography } from "@mui/material";
import List from "@mui/material/List";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { MainListItems } from "./ListItems";
import { useSelector } from "react-redux";
const Drawer = ({ items, indexItem, getIndexItem }) => {
  const user = useSelector((state) => state.auth.currentUser);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      backgroundColor="#fff"
      height="100%"
      pt={4}
    >
      <Avatar
        sx={{
          backgroundColor: "var(--main-color)",
          width: 100,
          height: 100,
        }}
      >
        <PersonOutlineIcon style={{ fontSize: "50px" }} />
      </Avatar>
      <Typography my={1}>{user.full_name}</Typography>
      <List component="nav" style={{ width: "100%" }}>
        <MainListItems
          items={items}
          indexItem={indexItem}
          getIndexItem={getIndexItem}
        />
      </List>
    </Box>
  );
};

export default Drawer;
