import { getAppTheme } from "../../AppTheme";
import React, { InputHTMLAttributes, useState } from "react";

export interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  // defaultChecked?: boolean;
  // checked?: boolean;
  labelClass?: string;
  label?: string;
  shape?: string;
  radioSize?: number;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({
  // defaultChecked,
  // checked,
  className,
  labelClass,
  label,
  style,
  shape,
  radioSize,
  selectedValue,
  setSelectedValue,
  ...props
}) => {
  const InputRef = React.createRef<HTMLInputElement>();
  // const [newChecked, setNewChecked] = useState(
  //   defaultChecked || checked || false
  // );

  const onChange = (e: any) => {
    // setNewChecked(!newChecked);
    var event: any = { currentTarget: InputRef.current, bubbles: true };
    if (props.onChange) props.onChange(event);
  };

  return (
    <div
      className="w-full flex items-center gap-2"
      onClick={(e) => onChange(e)}
    >
      <input
        key={props.id}
        type="radio"
        ref={InputRef}
        id={props.id}
        // defaultChecked={newChecked}
        name={props.name}
        value={props.value}
        // checked={selectedValue === props.value}
        className={
          className ??
          (shape === "square"
            ? getAppTheme().Inputs?.radio?.square
            : shape === "circle"
              ? getAppTheme().Inputs?.radio?.circle
              : "")
        }
        style={style}
        {...props}
      />
      {shape === "square" && (
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
      )}
      <label className={labelClass ?? "p4"} htmlFor={props.id}>
        {shape === "circle" && (
          <span
            className={`w-${radioSize} h-${radioSize} flex items-center justify-center border-[3px] ${
              selectedValue === props.value
                ? "!border-[#2892E9]"
                : "border-[#BCDEFA]"
            }  rounded-full ${
              selectedValue === props.value ? "bg-[#2892E9]" : "bg-white"
            }`}
          >
            {selectedValue === props.value && (
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            )}
          </span>
        )}
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
