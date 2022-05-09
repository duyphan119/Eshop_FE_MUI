import { useLocation } from "react-router-dom";
import routes from "./routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import ToastMessage from "./components/ToastMessage";
import ScrollToTop from "react-scroll-to-top";
import { Box } from "@mui/material";
import "./App.css";
// import { socket, SocketContext } from "./context";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import AppBar from "./components/Dashboard/Common/AppBar";
import Drawer from "./components/Dashboard/Common/Drawer";
const mdTheme = createTheme();
function App() {
  // Hook
  const location = useLocation();

  const user = useSelector((state) => state.auth.currentUser);
  const genderCategories = useSelector((state) => state.genderCategory.list);

  const [open, setOpen] = React.useState(true);

  // Function
  const showHeaderFooter = () => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      return false;
    }

    return true;
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    // <SocketContext.Provider value={socket}>
    <>
      <Box
        sx={{
          display: {
            md: "block",
            xs: "none",
          },
        }}
      >
        <ScrollToTop smooth color="#6f00ff" />
      </Box>
      {location.pathname.includes("dashboard") ? (
        <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar open={open} toggleDrawer={toggleDrawer} />
            <Drawer toggleDrawer={toggleDrawer} open={open} />
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {routes(user, genderCategories)}
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      ) : (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            overflowX: "hidden",
            paddingTop: "60px",
          }}
        >
          {showHeaderFooter() && <Header />}
          {routes(user, genderCategories)}
          {showHeaderFooter() && <Footer />}
        </div>
      )}
      <ToastMessage />
    </>
    // </SocketContext.Provider>
  );
}

export default App;
