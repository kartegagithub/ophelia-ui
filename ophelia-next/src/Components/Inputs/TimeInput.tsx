import { stringToDateInputValue } from "ophelia-core";
import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "ophelia-core";
import DataList from "./DataList";

export interface TimeInputProps
  extends AdditionalHtmlAttributes,
    InputHTMLAttributes<HTMLInputElement> {
  labelType?: any; // Örnek olarak any kullanıldı, gerçek türüne göre değiştirilebilir
  list?: string;
  showPickerOnFocus?: boolean;
}

const TimeInput: React.FC<TimeInputProps> = ({
  errorClassName,
  dataOptions,
  list,
  labelType,
  value,
  defaultValue,
  style,
  showPickerOnFocus,
  ...props
}) => {
  var formattedValue = stringToDateInputValue(
    (defaultValue ?? value) as string,
    "HH:mm"
  );

  const handleFocus = (e: any) => {
    if(showPickerOnFocus)
      e.target.showPicker();
  };

  return (
    <>
      <DataList options={dataOptions} id={list} />
      <input
        type="time"
        className={`oph-timeInput peer ${errorClassName ? "error" : ""} ${labelType && labelType === "floating" ? "floating" : ""}`}
        defaultValue={formattedValue}
        {...props}
        onClick={handleFocus}
        style={style}
      />
    </>
  );
};

export default TimeInput;
