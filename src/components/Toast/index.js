import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Toast = () => {
  const toastMessage = useSelector((state) => state.toast.toastMessage);
  useEffect(() => {
    if (toastMessage.text !== "") {
      toast[toastMessage.type](toastMessage.text, {
        position: "bottom-right",
        autoClose: 1234,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  }, [toastMessage]);
  if (!toastMessage.isOpen) {
    return "";
  } else {
    return (
      <ToastContainer
        position="bottom-right"
        autoClose={2345}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    );
  }
};

export default memo(Toast);
