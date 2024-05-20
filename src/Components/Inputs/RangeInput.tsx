import React, { InputHTMLAttributes } from "react";
import { getAppTheme } from "../../AppTheme";
import { AdditionalHtmlAttributes } from "../../Enums";

export interface RangeInputProps extends AdditionalHtmlAttributes, InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
}

const RangeInput: React.FC<RangeInputProps> = ({ labelType, className, ...props }) => {
  const appTheme = getAppTheme();
  return (
    <input
      type="range"
      className={`${props.errorClassName} ${className ?? appTheme?.Inputs?.range} ${labelType && labelType === "floating" ? "placeholder-transparent" : ""}`}
      {...props}
    />
  );
};

export default RangeInput;