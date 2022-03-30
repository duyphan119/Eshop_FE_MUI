import Form from "react-bootstrap/esm/Form";
import "./radio.scss";
const RadioButton = ({ fields, label, value, onChange, onBlur }) => {
  return (
    <>
      <Form.Label
        style={{
          margin: "0 10px 0 0",
        }}
        htmlFor={fields.id}
        className="radio-label"
      >
        <input
          style={{
            marginRight: "2px",
            marginTop: "10px",
          }}
          {...fields}
          type="radio"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <div className="radio-input"></div>
        {label}
      </Form.Label>
    </>
  );
};

export default RadioButton;
