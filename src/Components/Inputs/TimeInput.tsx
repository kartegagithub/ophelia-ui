import { stringToDateInputValue } from "../../Extensions";
import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "../../Enums/additionalHtmlAttributes";
import DataList from "./DataList";
import { getAppTheme } from "../../AppTheme";

export interface TimeInputProps extends AdditionalHtmlAttributes, InputHTMLAttributes<HTMLInputElement> {
  labelType?: any; // Örnek olarak any kullanıldı, gerçek türüne göre değiştirilebilir
  list?: string;
}

const TimeInput: React.FC<TimeInputProps> = ({ 
  dataOptions, 
  list, 
  className, 
  labelType, 
  value,
  defaultValue,
  style,
  ...props }) => {
  const appTheme = getAppTheme();
  var formattedValue = stringToDateInputValue(
    (defaultValue ?? value) as string,
    "HH:mm"
  );

  return (
    <>
      <DataList options={dataOptions} id={list} />
      <input
        type="time"
        className={`${props.errorClassName} ${className ?? appTheme?.Inputs?.time} ${labelType && labelType === "floating" ? "placeholder-transparent" : ""}`}
        defaultValue={formattedValue}
        {...props}
        style={style}
      />
    </> 
  );
};

export default TimeInput;