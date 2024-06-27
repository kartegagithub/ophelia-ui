import { stringToDateInputValue } from "../../Extensions";
import React, { InputHTMLAttributes } from "react";
import { getAppTheme } from "../../AppTheme";
import { AdditionalHtmlAttributes } from "../../Enums";

export interface DateTimeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
}

const DateTimeInput: React.FC<DateTimeInputProps & AdditionalHtmlAttributes> = ({ 
  className, 
  labelType, 
  value,
  defaultValue,
  style,
  ...props }) => {
  const appTheme = getAppTheme();
  var formattedValue = stringToDateInputValue(
    (defaultValue ?? value) as string,
    "YYYY-MM-DD HH:mm"
  );
  return (
    <input
      type="datetime-local"
      className={`${props.errorClassName} ${className ?? appTheme?.Inputs?.datetime} ${labelType && labelType === "floating" ? "placeholder-transparent" : ""}`}
      defaultValue={formattedValue}
      {...props}
      style={style}
    />
  );
};

export default DateTimeInput;