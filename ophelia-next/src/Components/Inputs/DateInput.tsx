import { stringToDateInputValue } from "ophelia-core";
import { getAppTheme } from "../../AppTheme";
import { AdditionalHtmlAttributes } from "ophelia-core";
import React, { InputHTMLAttributes } from "react";

export interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
  id?: string;
  showPickerOnFocus?: boolean;
}

const DateInput: React.FC<DateInputProps & AdditionalHtmlAttributes> = ({
  errorClassName,
  labelType,
  value,
  defaultValue,
  style,
  id,
  showPickerOnFocus,
  ...props
}) => {
  var formattedValue = stringToDateInputValue(
    (defaultValue ?? value) as string,
    "YYYY-MM-DD"
  );

  const handleFocus = (e: any) => {
    if (showPickerOnFocus) e.target.showPicker();
  };
  return (
    <input
      id={id}
      type="date"
      className={`oph-dateInput peer ${errorClassName ? "error" : ""} ${
        labelType && labelType === "floating" ? "floating" : ""
      }`}
      onClick={handleFocus}
      defaultValue={formattedValue}
      min="1900-01-01"
      max="2100-12-31"
      {...props}
      style={style}
    />
  );
};

export default DateInput;
