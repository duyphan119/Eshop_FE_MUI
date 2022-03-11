import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { showToastMessage } from "../../redux/toastSlice";
import { AiOutlineClose } from "react-icons/ai";
import "./toastmessage.scss";
const ToastMessage = () => {
  const toastMessage = useSelector((state) => state.toast.toastMessage);
  const dispatch = useDispatch();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(
        showToastMessage({
          ...toastMessage,
          isOpen: false,
        })
      );
    }, 3000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [toastMessage, dispatch]);

  if (!toastMessage.isOpen) {
    return "";
  } else {
    return (
      <div className={`toast-message__container ${toastMessage.type}`}>
        <div className="toast-message">
          <div className="toast-message__header">
            <div className="toast-message__title">{toastMessage.title}</div>
            <button className="toast-message__btn-close btn">
              <AiOutlineClose />
            </button>
          </div>
          <div className="toast-message__body">{toastMessage.text}</div>
        </div>
      </div>
    );
  }
};

export default ToastMessage;
