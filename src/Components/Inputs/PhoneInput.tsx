import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "../../Enums/additionalHtmlAttributes";
import DataList from "./DataList";
import { getAppTheme } from "../../AppTheme";

export interface PhoneInputProps extends AdditionalHtmlAttributes, InputHTMLAttributes<HTMLInputElement> {
  list: string;
  labelType?: any;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ list, dataOptions, className, labelType, ...props }) => {
  const appTheme = getAppTheme();
  return (
    <>
      <DataList options={dataOptions} id={list} />
      <input
        type="tel"
        className={`${props.errorClassName} ${className ?? appTheme?.Inputs?.phone} ${labelType && labelType === "floating" ? "placeholder-transparent" : ""}`}
        {...props}
      />
    </>
  );
};

export default PhoneInput;