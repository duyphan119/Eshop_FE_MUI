import React from "react";
import "./confirmmessage.scss";
const ConfirmMessage = ({ confirmMessage, setConfirmMessage }) => {
  const handleCloseConfirmMessage = () => {
    setConfirmMessage({ ...setConfirmMessage, isOpen: false });
  };

  if (!confirmMessage || !confirmMessage.isOpen) return "";
  return (
    <div className="confirm-message">
      <div className="overlay" onClick={handleCloseConfirmMessage}></div>
      <div className="confirm-message__body">
        <div className="confirm-message__title">
          {confirmMessage.title}
          <div>x</div>
        </div>
        <hr />
        <div className="confirm-message__content">{confirmMessage.text}</div>
        <div className="confirm-message__actions">
          <button
            className="confirm-message__action yes"
            onClick={confirmMessage.answerYes}
          >
            Yes
          </button>
          <button
            className="confirm-message__action no"
            onClick={handleCloseConfirmMessage}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmMessage;
