import Form from "react-bootstrap/esm/Form";
const Input = ({
  fields,
  value,
  onChange,
  label,
  onBlur,
  error,
  className,
}) => {
  return (
    <Form.Group className="form-group">
      {label && (
        <Form.Label className="form-label" htmlFor={fields.id}>
          {label}
        </Form.Label>
      )}
      <Form.Control
        {...fields}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`form-control ${className}`}
      />
      {error && <span className="form-error">{error}</span>}
    </Form.Group>
  );
};

export default Input;
