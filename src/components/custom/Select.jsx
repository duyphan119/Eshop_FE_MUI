import Form from "react-bootstrap/esm/Form";
import FormSelect from "react-bootstrap/esm/FormSelect";

const Select = ({ label, fields, error, onChange, onBlur, options, value }) => {
  return (
    <Form.Group className="form-group">
      {label && (
        <Form.Label className="form-label" htmlFor={fields.id}>
          {label}
        </Form.Label>
      )}
      <FormSelect
        {...fields}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="form-control"
      >
        {options.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          );
        })}
      </FormSelect>
      {error && <span className="form-error">{error}</span>}
    </Form.Group>
  );
};

export default Select;
