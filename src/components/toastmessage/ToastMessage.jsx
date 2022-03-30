import { useDispatch } from "react-redux";
import { memo, useEffect } from "react";
import { hideToastMessage } from "../../redux/toastSlice";
import { AiOutlineClose } from "react-icons/ai";
import "./toastmessage.scss";
const ToastMessage = ({ item }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(hideToastMessage());
    }, 6000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [item, dispatch]);
  if (!item.isOpen) {
    return "";
  } else {
    return (
      <div className={`toast-message__container ${item.type}`}>
        <div className="toast-message">
          <div className="toast-message__header">
            <div className="toast-message__title">{item.title}</div>
            <button className="toast-message__btn-close btn">
              <AiOutlineClose />
            </button>
          </div>
          <div className="toast-message__body">
            {item.text}
          </div>
        </div>
      </div>
    );
  }
};

export default memo(ToastMessage);
