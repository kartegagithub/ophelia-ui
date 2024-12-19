import { stringToDateInputValue } from "../../Extensions";
import React, { InputHTMLAttributes } from "react";
import { getAppTheme } from "../../AppTheme";
import { AdditionalHtmlAttributes } from "../../Enums";

export interface DateTimeInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
  id?: string;
}

const DateTimeInput: React.FC<
  DateTimeInputProps & AdditionalHtmlAttributes
> = ({ labelType, value, defaultValue, style, id, ...props }) => {

  var formattedValue = stringToDateInputValue(
    (defaultValue ?? value) as string,
    "YYYY-MM-DD HH:mm"
  );

  const handleFocus = (e: any) => {
    e.target.showPicker();
  };

  return (
    <input
      id={id}
      type="datetime-local"
      className={`oph-dateTimeInput peer ${
        props.errorClassName ? "error" : ""
      } ${labelType && labelType === "floating" ? "floating" : ""}`}
      onClick={handleFocus}
      defaultValue={formattedValue}
      {...props}
      style={style}
    />
  );
};

export default DateTimeInput;
