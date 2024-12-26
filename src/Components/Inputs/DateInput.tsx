import { stringToDateInputValue } from "../../Extensions";
import { getAppTheme } from "../../AppTheme";
import { AdditionalHtmlAttributes } from "../../Enums";
import React, { InputHTMLAttributes } from "react";

export interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
  id?: string;
  showPickerOnFocus?: boolean;
}

const DateInput: React.FC<DateInputProps & AdditionalHtmlAttributes> = ({
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
    if(showPickerOnFocus)
      e.target.showPicker(); 
  };
  return (
    <input
      id={id}
      type="date"
      className={`oph-dateInput peer ${props.errorClassName ? "error" : ""} ${
        labelType && labelType === "floating" ? "floating" : ""
      }`}
      onClick={handleFocus}
      defaultValue={formattedValue}
      {...props}
      style={style}
    />
  );
};

export default DateInput;
