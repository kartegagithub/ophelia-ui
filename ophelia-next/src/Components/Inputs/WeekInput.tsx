import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "ophelia-core";

export interface WeekInputProps
  extends AdditionalHtmlAttributes,
    InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
}

const WeekInput: React.FC<WeekInputProps> = ({
  errorClassName,
  className,
  labelType,
  style,
  ...props
}) => {
  return (
    <input
      type="week"
      className={`oph-weekInput peer ${errorClassName ? "error" : ""} ${labelType && labelType === "floating" ? "floating" : ""}`}
      style={style}
      {...props}
    />
  );
};

export default WeekInput;
