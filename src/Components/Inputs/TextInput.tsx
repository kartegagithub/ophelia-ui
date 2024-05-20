import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "../../Enums/additionalHtmlAttributes";
import DataList from "./DataList";
import { getAppTheme } from "../../AppTheme";

export interface TextInputProps extends AdditionalHtmlAttributes, InputHTMLAttributes<HTMLInputElement> {
  labelType?: any; // Örnek olarak any kullanıldı, gerçek türüne göre değiştirilebilir
  list?: string;
}

const TextInput: React.FC<TextInputProps> = ({ dataOptions, list, className, labelType, ...props }) => {
  const appTheme = getAppTheme();
  return (
    <>
      <DataList options={dataOptions} id={list} />
      <input
        type="text"
        className={`${props.errorClassName} ${className ?? appTheme?.Inputs?.text} ${labelType && labelType === "floating" ? "placeholder-transparent" : ""}`}
        {...props}
      />
    </>
  );
};

export default TextInput;