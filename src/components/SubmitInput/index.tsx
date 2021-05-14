import React, { FC } from "react";
import { Button } from "../";
import "./SubmitInput.css";

interface ISubmitInput {
  value: string;
  onChange: (event: any) => void;
  placeholder?: string;
  submitLabel?: string;
  onSubmit: () => void;
}
export const SubmitInput: FC<ISubmitInput> = ({
  value,
  onChange,
  placeholder,
  submitLabel = "Submit",
  onSubmit,
}) => {
  return (
    <div className="submit-input-container">
      <div className="input-container">
        <input
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      <Button
        label={submitLabel}
        onClick={onSubmit}
        size="sx"
        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, height: 35 }}
      />
    </div>
  );
};
