import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "../../Enums";

export interface RangeInputProps
  extends AdditionalHtmlAttributes,
    InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
}

const RangeInput: React.FC<RangeInputProps> = ({
  labelType,
  style,
  ...props
}) => {
  return (
    <input
      type="range"
      className={`oph-rangeInput ${props.errorClassName ? "error" : ""} ${labelType && labelType === "floating" ? "floating" : ""}`}
      style={style}
      {...props}
    />
  );
};

export default RangeInput;
