import React from "react";
import { useSelector } from "react-redux";
import ScrollToTop from "react-scroll-to-top";
import "./App.scss";
import { socket, SocketContext } from "./context";
import routes from "./routes";
import Loading from "./components/loading/Loading";
const Footer = React.lazy(() => import("./components/footer/Footer"));
const Header = React.lazy(() => import("./components/header/Header"));
const ToastMessage = React.lazy(() =>
  import("./components/toastmessage/ToastMessage")
);
const App = () => {
  const genderCategories = useSelector((state) => state.genderCategory.list);
  const collectionProducts = useSelector(
    (state) => state.collectionProduct.list
  );
  return (
    <React.Suspense fallback={<Loading />}>
      <SocketContext.Provider value={socket}>
        <ScrollToTop smooth color="#6f00ff" />
        <Header />
        {routes(genderCategories, collectionProducts)}
        <Footer />
        <ToastMessage />
      </SocketContext.Provider>
    </React.Suspense>
  );
};

export default App;
