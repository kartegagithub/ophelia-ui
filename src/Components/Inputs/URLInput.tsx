import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "../../Enums/additionalHtmlAttributes";
import DataList from "./DataList";
import { getAppTheme } from "../../AppTheme";

export interface URLInputProps
  extends AdditionalHtmlAttributes,
    InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
  list: string;
}

const URLInput: React.FC<URLInputProps> = ({
  dataOptions,
  list,
  className,
  labelType,
  style,
  ...props
}) => {
  const appTheme = getAppTheme();
  return (
    <>
      <DataList options={dataOptions} id={list} />
      <input
        type="url"
        className={`${props.errorClassName} ${className ?? appTheme?.Inputs?.url} ${labelType && labelType === "floating" ? "placeholder-transparent" : ""}`}
        style={style}
        {...props}
      />
    </>
  );
};

export default URLInput;
