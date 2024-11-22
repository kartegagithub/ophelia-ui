import { stringToDateInputValue } from "../../Extensions";
import { getAppTheme } from "../../AppTheme";
import { AdditionalHtmlAttributes } from "../../Enums";
import React, { InputHTMLAttributes } from "react";

export interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
  id?: string;
}

const DateInput: React.FC<DateInputProps & AdditionalHtmlAttributes> = ({
  labelType,
  value,
  defaultValue,
  style,
  id,
  ...props
}) => {
  var formattedValue = stringToDateInputValue(
    (defaultValue ?? value) as string,
    "YYYY-MM-DD"
  );
  return (
    <input
      id={id}
      type="date"
      className={`oph-dateInput peer ${props.errorClassName ? "error" : ""} ${labelType && labelType === "floating" ? "floating" : ""}`}
      defaultValue={formattedValue}
      {...props}
      style={style}
    />
  );
};

export default DateInput;
