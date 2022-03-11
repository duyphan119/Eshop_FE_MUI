import Form from "react-bootstrap/esm/Form";

const CheckBox = ({ fields, label, value, onChange, onBlur }) => {
  return (
    <>
      <input
        style={{
          marginRight: "2px",
          marginTop: "10px",
        }}
        {...fields}
        type="checkbox"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <Form.Label
        style={{
          margin: "0 10px 0 0",
        }}
        htmlFor={fields.id}
      >
        {label}
      </Form.Label>
    </>
  );
};

export default CheckBox;
