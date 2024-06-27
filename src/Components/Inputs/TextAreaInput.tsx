import React, { TextareaHTMLAttributes } from "react";
import { getAppTheme } from "../../AppTheme";
import { AdditionalHtmlAttributes } from "../../Enums";

export interface TextAreaInputProps
  extends AdditionalHtmlAttributes,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelType?: any;
  rows?: number;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  className,
  labelType,
  rows,
  style,
  ...props
}) => {
  const appTheme = getAppTheme();
  return (
    <textarea
      {...props}
      className={`${props.errorClassName} ${className ?? appTheme?.Inputs?.textarea} ${labelType && labelType === "floating" ? "placeholder-transparent" : ""}`}
      rows={rows}
      style={style}
    />
  );
};

export default TextAreaInput;
