import { useState } from "react";

function Textarea({ name, labelText, wasSubmitted, initialValue, props }) {
  const [value, setValue] = useState(initialValue);
  const errorClass = wasSubmitted && value === "" ? "is-invalid" : "";

  return (
    <>
      <textarea
        type="text"
        className={`form-control ${errorClass}`}
        placeholder="Description"
        value={value}
        name={name}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
      <label>{labelText}</label>
    </>
  );
}

export default Textarea;
