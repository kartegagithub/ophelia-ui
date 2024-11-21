import React, { InputHTMLAttributes, useState } from "react";

export interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelClass?: string;
  label?: string;
  shape?: string;
  radioSize?: number;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({
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

  const onChange = (e: any) => {
    var event: any = { currentTarget: InputRef.current, bubbles: true };
    if (props.onChange) props.onChange(event);
  };

  return (
    <div className="oph-radioInput" onClick={(e) => onChange(e)}>
      <input
        key={props.id}
        type="radio"
        ref={InputRef}
        id={props.id}
        name={props.name}
        value={props.value}
        className={`
          oph-radioInput-input ${shape}
          `}
        style={style}
        {...props}
      />
      {shape === "square" && (
        <svg
          className="oph-radioInput-input square-icon"
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
      <label className={"oph-radioInput-label"} htmlFor={props.id}>
        {shape === "circle" && (
          <span
            className={`w-${radioSize} h-${radioSize} oph-radioInput-label-circle ${
              selectedValue === props.value ? "selected" : "unselected"
            }  `}
          >
            {selectedValue === props.value && (
              <span className="oph-radioInput-label-circle-rounded"></span>
            )}
          </span>
        )}
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
