import { stringToDateInputValue } from "../../Extensions";
import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "../../Enums/additionalHtmlAttributes";
import DataList from "./DataList";

export interface TimeInputProps
  extends AdditionalHtmlAttributes,
    InputHTMLAttributes<HTMLInputElement> {
  labelType?: any; // Örnek olarak any kullanıldı, gerçek türüne göre değiştirilebilir
  list?: string;
}

const TimeInput: React.FC<TimeInputProps> = ({
  dataOptions,
  list,
  labelType,
  value,
  defaultValue,
  style,
  ...props
}) => {
  var formattedValue = stringToDateInputValue(
    (defaultValue ?? value) as string,
    "HH:mm"
  );

  return (
    <>
      <DataList options={dataOptions} id={list} />
      <input
        type="time"
        className={`oph-timeInput ${props.errorClassName ? "error" : ""} ${labelType && labelType === "floating" ? "floating" : ""}`}
        defaultValue={formattedValue}
        {...props}
        style={style}
      />
    </>
  );
};

export default TimeInput;
