import { Box } from "@mui/material";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import { useSelector } from "react-redux";

import { DefaultLayout } from "./layouts";
import Toast from "./components/Toast";
import { socket, SocketContext } from "./context";
import { publicRoutes, adminRoutes } from "./routes";
import "./App.css";
import NavigateScrollToTop from "./components/NavigateScrollToTop";
function App() {
  const user = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    socket.emit("join-room", "admin");
  }, []);

  function showRoutes(routes) {
    return routes.map((router, index) => {
      let Layout = DefaultLayout;
      let Page = router.component;
      if (router.layout) {
        Layout = router.layout;
      }
      return (
        <Route
          key={index}
          path={router.path}
          element={
            <Layout>
              <Page />
            </Layout>
          }
        />
      );
    });
  }
  return (
    <SocketContext.Provider value={socket}>
      <NavigateScrollToTop />
      <Box
        sx={{
          display: {
            md: "block",
            xs: "none",
          },
        }}
      >
        <ScrollToTop smooth color="var(--main-color)" />
      </Box>
      <Routes>
        {showRoutes(publicRoutes)}
        {user && showRoutes(adminRoutes)}
      </Routes>
      <Toast />
    </SocketContext.Provider>
  );
}

export default App;
