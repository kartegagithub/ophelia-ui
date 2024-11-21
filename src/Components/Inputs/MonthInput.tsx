import { AdditionalHtmlAttributes } from "../../Enums";
import React from "react";
export interface MonthInputProps
  extends AdditionalHtmlAttributes,
    React.InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
}

const MonthInput: React.FC<MonthInputProps> = ({
  labelType,
  style,
  id,
  ...props
}) => {
  return (
    <input
      id={id}
      type="month"
      className={`oph-monthInput ${props.errorClassName ? "error" : ""} ${labelType && labelType === "floating" ? "floating" : ""}`}
      style={style}
      {...props}
    />
  );
};

export default MonthInput;
