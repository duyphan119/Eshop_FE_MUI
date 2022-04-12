import React from "react";

import ReactLoading from "react-loading";
const Loading = () => {
  return (
    <div
      className="loading"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <ReactLoading type="spin" color="var(--main-color)" />
      <span
        style={{
          marginTop: "5px",
          fontSize: "1.6rem",
        }}
      >
        Đang tải
      </span>
    </div>
  );
};

export default Loading;
