import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "../../Enums/additionalHtmlAttributes";
import DataList from "./DataList";
import { getAppTheme } from "../../AppTheme";

export interface NumberInputProps extends AdditionalHtmlAttributes, InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
}

const NumberInput: React.FC<NumberInputProps> = ({ className, dataOptions, list, labelType, ...props }) => {
  const appTheme = getAppTheme();
  return (
    <>
      <DataList options={dataOptions} id={list} />
      <input
        type="number"
        className={`${props.errorClassName} ${className ?? appTheme?.Inputs?.numeric} ${labelType && labelType === "floating" ? "placeholder-transparent" : ""}`}
        {...props}
      />
    </>
  );
};

export default NumberInput;