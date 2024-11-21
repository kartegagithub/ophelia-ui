import React, { InputHTMLAttributes } from "react";
import DataList from "./DataList";
import { getAppTheme } from "../../AppTheme";
import { AdditionalHtmlAttributes } from "../../Enums/additionalHtmlAttributes";

export interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  list?: string;
  labelType?: any;
  id?: string;
}

const EmailInput: React.FC<EmailInputProps & AdditionalHtmlAttributes> = ({
  dataOptions,
  list,
  name,
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
        type="email"
        className={`oph-emailInput ${props.errorClassName ? "error" : ""} ${labelType && labelType === "floating" ? "floating" : ""}`}
        style={style}
        {...props}
      />
    </>
  );
};

export default EmailInput;
