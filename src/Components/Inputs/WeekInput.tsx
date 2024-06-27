import React, { InputHTMLAttributes } from "react";
import { getAppTheme } from "../../AppTheme";
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
  const appTheme = getAppTheme();
  return (
    <input
      type="week"
      className={`${props.errorClassName} ${className ?? appTheme?.Inputs?.week} ${labelType && labelType === "floating" ? "placeholder-transparent" : ""}`}
      style={style}
      {...props}
    />
  );
};

export default WeekInput;
