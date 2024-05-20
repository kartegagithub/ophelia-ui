import React, { InputHTMLAttributes } from "react";
import { getAppTheme } from "../../AppTheme";
import { AdditionalHtmlAttributes } from "../../Enums";

export interface DateTimeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
}

const DateTimeInput: React.FC<DateTimeInputProps & AdditionalHtmlAttributes> = ({ className, labelType, ...props }) => {
  const appTheme = getAppTheme();
  return (
    <input
      type="datetime-local"
      className={`${props.errorClassName} ${className ?? appTheme?.Inputs?.datetime} ${labelType && labelType === "floating" ? "placeholder-transparent" : ""}`}
      {...props}
    />
  );
};

export default DateTimeInput;