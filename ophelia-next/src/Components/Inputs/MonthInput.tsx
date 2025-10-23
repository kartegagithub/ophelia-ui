import { AdditionalHtmlAttributes } from "../../Enums";
import React from "react";
export interface MonthInputProps
  extends AdditionalHtmlAttributes,
    React.InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
  showPickerOnFocus?: boolean;
}

const MonthInput: React.FC<MonthInputProps> = ({
  errorClassName,
  labelType,
  style,
  id,
  showPickerOnFocus,
  ...props
}) => {

  const handleFocus = (e: any) => {
    if(showPickerOnFocus)
      e.target.showPicker();
  };


  return (
    <input
      id={id}
      type="month"
      className={`oph-monthInput ${errorClassName ? "error" : ""} ${labelType && labelType === "floating" ? "floating" : ""}`}
      style={style}
      onClick={handleFocus}
      {...props}
    />
  );
};

export default MonthInput;
