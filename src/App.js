import { useLocation } from "react-router-dom";
import routes from "./routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import ToastMessage from "./components/ToastMessage";
import ScrollToTop from "react-scroll-to-top";
import { Box } from "@mui/material";
import "./App.css";
import { socket, SocketContext } from "./context";

function App() {
  // Hook
  const location = useLocation();

  const user = useSelector((state) => state.auth.currentUser);
  const genderCategories = useSelector((state) => state.genderCategory.list);

  // Function
  const showHeaderFooter = () => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      return false;
    }
    return true;
  };
  return (
    <SocketContext.Provider value={socket}>
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
      <ToastMessage />
    </SocketContext.Provider>
  );
}

export default App;
