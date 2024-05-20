import React, { TextareaHTMLAttributes } from "react";
import { getAppTheme } from "../../AppTheme";
import { AdditionalHtmlAttributes } from "../../Enums";

export interface TextAreaInputProps extends AdditionalHtmlAttributes, TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelType?: any;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ className, labelType, ...props }) => {
  const appTheme = getAppTheme();
  return (
    <textarea {...props} className={`${props.errorClassName} ${className ?? appTheme?.Inputs?.textarea} ${labelType && labelType === "floating" ? "placeholder-transparent" : ""}`} />
  );
};

export default TextAreaInput;