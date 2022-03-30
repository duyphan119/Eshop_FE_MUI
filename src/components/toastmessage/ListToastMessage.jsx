import React from "react";
import { useSelector } from "react-redux";
import ToastMessage from "./ToastMessage";

const ListToastMessage = () => {
  const list = useSelector((state) => state.toast.toastMessages);
  if (list.length === 0) return "";
  return (
    <div className="toast-message__list">
      {list.map((item, index) => {
        return <ToastMessage item={item} key={index} />;
      })}
    </div>
  );
};

export default ListToastMessage;
