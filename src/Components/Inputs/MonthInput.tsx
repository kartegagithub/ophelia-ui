import { AdditionalHtmlAttributes } from "../../Enums";
import { getAppTheme } from "../../AppTheme";
import React from "react";

export interface MonthInputProps
  extends AdditionalHtmlAttributes,
    React.InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
  className?: string;
}

const MonthInput: React.FC<MonthInputProps> = ({
  className,
  labelType,
  style,
  ...props
}) => {
  const appTheme = getAppTheme(); // Assuming getAppTheme function is available

  return (
    <input
      type="month"
      className={`${props.errorClassName} ${className ?? appTheme?.Inputs?.month} ${labelType && labelType === "floating" ? "placeholder-transparent" : ""}`}
      style={style}
      {...props}
    />
  );
};

export default MonthInput;
