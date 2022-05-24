import { Box } from "@mui/material";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import "./App.css";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import Toast from "./components/Toast";
import { socket, SocketContext } from "./context";
import { publicRoutes } from "./routes";
function App() {
  useEffect(() => {
    socket.emit("join-room", "admin");
  }, []);
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
        <ScrollToTop smooth color="var(--main-color)" />
      </Box>
      <Routes>
        {publicRoutes.map((router, index) => {
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
        })}
      </Routes>
      <Toast />
    </SocketContext.Provider>
  );
}

export default App;
