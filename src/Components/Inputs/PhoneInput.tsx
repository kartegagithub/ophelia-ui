import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "../../Enums/additionalHtmlAttributes";
import DataList from "./DataList";
import { maskHandler, pasteHandler } from "../../Extensions";
export interface PhoneInputProps
  extends AdditionalHtmlAttributes,
    InputHTMLAttributes<HTMLInputElement> {
  list: string;
  labelType?: any;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  list,
  dataOptions,
  labelType,
  mask,
  maskRule,
  style,
  defaultValue,
  ...props
}) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Eğer Ctrl veya Cmd tuşu basılıysa (örneğin Ctrl+V), maskHandler çalışmasın
    if (e.ctrlKey || e.metaKey) {
      return;
    }
    maskHandler(mask, e, props.onChange, maskRule);
  };

  return (
    <>
      <DataList options={dataOptions} id={list} />
      <input
        onKeyDown={handleKeyDown}
        onPaste={(e) => pasteHandler(mask, e, props.onChange, maskRule)}
        type="tel"
        className={`oph-phoneInput ${props.errorClassName ? "error" : ""} ${labelType && labelType === "floating" ? "floating" : ""}`}
        style={style}
        defaultValue={defaultValue}
        {...props}
      />
    </>
  );
};

export default PhoneInput;
