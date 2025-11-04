import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "ophelia-core";

export interface RangeInputProps
  extends AdditionalHtmlAttributes,
    InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
}

const RangeInput: React.FC<RangeInputProps> = ({
  errorClassName,
  labelType,
  style,
  ...props
}) => {
  return (
    <input
      type="range"
      className={`oph-rangeInput peer ${errorClassName ? "error" : ""} ${labelType && labelType === "floating" ? "floating" : ""}`}
      style={style}
      {...props}
    />
  );
};

export default RangeInput;
