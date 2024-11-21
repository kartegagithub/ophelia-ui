import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "../../Enums";

export interface WeekInputProps
  extends AdditionalHtmlAttributes,
    InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
}

const WeekInput: React.FC<WeekInputProps> = ({
  className,
  labelType,
  style,
  ...props
}) => {
  return (
    <input
      type="week"
      className={`oph-weekInput ${props.errorClassName ? "error" : ""} ${labelType && labelType === "floating" ? "floating" : ""}`}
      style={style}
      {...props}
    />
  );
};

export default WeekInput;
