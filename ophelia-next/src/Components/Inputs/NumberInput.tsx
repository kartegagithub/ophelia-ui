import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "ophelia-core";
import DataList from "./DataList";
import { getAppTheme } from "../../AppTheme";

export interface NumberInputProps
  extends AdditionalHtmlAttributes,
    InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
}

const NumberInput: React.FC<NumberInputProps> = ({
  errorClassName,
  className,
  dataOptions,
  list,
  labelType,
  style,
  id,
  ...props
}) => {
  const appTheme = getAppTheme();
  return (
    <>
      <DataList options={dataOptions} id={list} />
      <input
        id={id}
        type="number"
        className={`oph-numberInput peer ${errorClassName ? "error" : ""} ${labelType && labelType === "floating" ? "floating" : ""}`}
        {...props}
        style={style}
      />
    </>
  );
};

export default NumberInput;
