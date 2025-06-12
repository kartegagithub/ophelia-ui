import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "../../Enums/additionalHtmlAttributes";
import DataList from "./DataList";
export interface URLInputProps
  extends AdditionalHtmlAttributes,
    InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
  list: string;
}

const URLInput: React.FC<URLInputProps> = ({
  errorClassName,
  dataOptions,
  list,
  className,
  labelType,
  style,
  ...props
}) => {
  return (
    <>
      <DataList options={dataOptions} id={list} />
      <input
        type="url"
        className={`oph-urlInput peer ${errorClassName ? "error" : ""} ${labelType && labelType === "floating" ? "floating" : ""}`}
        style={style}
        {...props}
      />
    </>
  );
};

export default URLInput;
