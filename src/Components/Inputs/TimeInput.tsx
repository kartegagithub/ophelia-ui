import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "../../Enums/additionalHtmlAttributes";
import DataList from "./DataList";
import { getAppTheme } from "../../AppTheme";

interface TimeInputProps extends AdditionalHtmlAttributes, InputHTMLAttributes<HTMLInputElement> {
  labelType?: any; // Örnek olarak any kullanıldı, gerçek türüne göre değiştirilebilir
  list?: string;
}

const TimeInput: React.FC<TimeInputProps> = ({ dataOptions, list, className, labelType, ...props }) => {
  const appTheme = getAppTheme();
  return (
    <>
      <DataList options={dataOptions} id={list} />
      <input
        type="time"
        className={`${props.errorClassName} ${className ?? appTheme?.Inputs?.time} ${labelType && labelType === "floating" ? "placeholder-transparent" : ""}`}
        {...props}
      />
    </>
  );
};

export default TimeInput;