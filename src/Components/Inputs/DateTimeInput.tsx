import { stringToDateInputValue } from "../../Extensions";
import React, { InputHTMLAttributes } from "react";
import { getAppTheme } from "../../AppTheme";
import { AdditionalHtmlAttributes } from "../../Enums";

export interface DateTimeInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
  id?: string;
  showPickerOnFocus?: boolean;
}

const DateTimeInput: React.FC<
  DateTimeInputProps & AdditionalHtmlAttributes
> = ({ errorClassName, showPickerOnFocus, labelType, value, defaultValue, style, id, ...props }) => {

  var formattedValue = stringToDateInputValue(
    (defaultValue ?? value) as string,
    "YYYY-MM-DD HH:mm"
  );

  const handleFocus = (e: any) => {
    if(showPickerOnFocus)
      e.target.showPicker();
  };

  return (
    <input
      id={id}
      type="datetime-local"
      className={`oph-dateTimeInput peer ${
        errorClassName ? "error" : ""
      } ${labelType && labelType === "floating" ? "floating" : ""}`}
      onClick={handleFocus}
      defaultValue={formattedValue}
      min="1900-01-01T00:00"
      max="2100-12-31T23:59"
      {...props}
      style={style}
    />
  );
};

export default DateTimeInput;
