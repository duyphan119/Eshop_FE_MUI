import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "react-scroll-to-top";
import { apiGetCartByUser } from "./api/apiCart";
import "./App.scss";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import ListToastMessage from "./components/toastmessage/ListToastMessage";
import { socket, SocketContext } from "./context";
import Pages from "./routes/Pages";
const App = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      apiGetCartByUser(user, dispatch);
    }
  }, [user, dispatch]);
  return (
    <SocketContext.Provider value={socket}>
      <ScrollToTop smooth color="#6f00ff" />
      <Header />
      <Pages />
      <Footer />
      <ListToastMessage />
    </SocketContext.Provider>
  );
};

export default App;
