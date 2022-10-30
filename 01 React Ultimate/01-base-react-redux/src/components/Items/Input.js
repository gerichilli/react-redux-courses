import { useState } from "react";

function Input({ name, labelText, wasSubmitted, initialValue, props }) {
  const [value, setValue] = useState(initialValue);
  const errorClass = wasSubmitted && value === "" ? "is-invalid" : "";

  return (
    <>
      <input
        name={name}
        type="text"
        className={`form-control ${errorClass}`}
        placeholder="Answer"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
      <label>{labelText}</label>
    </>
  );
}

export default Input;
