import { getAppTheme } from "../../AppTheme";
import React, { InputHTMLAttributes, useState } from "react";

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  defaultChecked?: boolean;
  checked?: boolean;
  labelClass?: string;
  label?: string;
}

const RadioInput: React.FC<RadioInputProps> = ({
  defaultChecked,
  checked,
  className,
  labelClass,
  label,
  ...props
}) => {
  const [newChecked, setNewChecked] = useState(
    defaultChecked || checked || false
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChecked(!newChecked);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div className="w-full flex items-center gap-2">
      <input
        type="radio"
        id={props.id}
        onChange={onChange}
        checked={defaultChecked || checked}
        className={className ?? getAppTheme().Inputs?.radio}
        {...props}
      />
      <svg
        className="absolute w-4 h-4 pointer-events-none hidden peer-checked:block stroke-white mt-[3px] ml-[2px] outline-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <label className={labelClass ?? "p4"} htmlFor={props.id}>
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
