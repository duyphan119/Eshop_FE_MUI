import React from "react";
import "./../Edit/EditPage.css";
const Input = (props) => {
  const { inputType, classStyle, lable, data, setData } = props;
  return (
    <>
      <label>{lable}</label>
      {inputType === "textarea" ? (
        <textarea
          type="text"
          className={classStyle}
          placeholder={data}
          onChange={(e) => setData(e.target.value)}
        />
      ) : (
        <input
          type="text"
          placeholder={data}
          onChange={(e) => setData(e.target.value)}
        />
      )}
    </>
  );
};

export default Input;
