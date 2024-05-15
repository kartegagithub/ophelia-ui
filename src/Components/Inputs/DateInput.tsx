import { stringToDateInputValue } from "../../Extensions";
import { getAppTheme } from "../../AppTheme";
import { AdditionalHtmlAttributes } from "../../Enums";
import React, { InputHTMLAttributes } from "react";

interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
}

const DateInput: React.FC<DateInputProps & AdditionalHtmlAttributes> = ({ className, labelType, value, defaultValue, ...props }) => {
  const appTheme = getAppTheme();
  var formattedValue = stringToDateInputValue((defaultValue ?? value) as string, "YYYY-MM-DD")
  return (
    <input
      type="date"
      className={`${props.errorClassName} ${className ?? appTheme?.Inputs?.date} ${labelType && labelType === "floating" ? "placeholder-transparent" : ""}`}
      defaultValue={formattedValue}
      {...props}
    />
  )
}

export default DateInput;