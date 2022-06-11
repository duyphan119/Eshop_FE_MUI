import { Box } from "@mui/material";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import { useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";

import { DefaultLayout } from "./layouts";
import Toast from "./components/Toast";
import { socket, SocketContext } from "./context";
import { publicRoutes, adminRoutes } from "./routes";
import "./App.css";
import NavigateScrollToTop from "./components/NavigateScrollToTop";
import ModalAddToCart from "./components/ModalAddToCart";
import { checkIsAdmin } from "./utils";
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      Đã có lỗi xảy ra.
    </div>
  );
}
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
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
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
          {checkIsAdmin(user) && showRoutes(adminRoutes)}
        </Routes>
        <Toast />
        <ModalAddToCart />
      </SocketContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
