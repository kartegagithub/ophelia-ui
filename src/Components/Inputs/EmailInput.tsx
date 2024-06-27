import React, { InputHTMLAttributes } from "react";
import DataList from "./DataList";
import { getAppTheme } from "../../AppTheme";
import { AdditionalHtmlAttributes } from "../../Enums/additionalHtmlAttributes";

export interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  list?: string;
  labelType?: any;
}

const EmailInput: React.FC<EmailInputProps & AdditionalHtmlAttributes> = ({
  dataOptions,
  list,
  className,
  name,
  labelType,
  style,
  ...props
}) => {
  const appTheme = getAppTheme();
  return (
    <>
      <DataList options={dataOptions} id={list} />
      <input
        type="email"
        className={`${props.errorClassName} ${className ?? appTheme?.Inputs?.email} ${labelType && labelType === "floating" ? "placeholder-transparent" : ""}`}
        style={style}
        {...props}
      />
    </>
  );
};

export default EmailInput;
