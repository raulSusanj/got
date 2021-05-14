import React, { FC } from "react";

import "./Selector.css";

interface IOption {
  label: string;
  value: string | number;
}

interface ISelector {
  value: string | number;
  onChange: (event: any) => void;
  options: Array<IOption>;
}

export const Selector: FC<ISelector> = ({ value, onChange, options }) => {
  return (
    <div className="selector-container">
      <select className="select-container" value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
