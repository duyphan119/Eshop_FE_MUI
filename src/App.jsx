import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiGetCartByUser } from "./api/apiCart";
import { socket, SocketContext } from "./context";
import { routes } from "./routes";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import ToastMessage from "./components/toastmessage/ToastMessage";
import "./App.scss";
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
      <Header/>
      {routes()}
      <Footer />
      <ToastMessage />
    </SocketContext.Provider>
  );
};

export default App;
