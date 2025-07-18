import React, { createRef, TextareaHTMLAttributes, useEffect } from "react";
import { getAppTheme } from "../../AppTheme";
import { AdditionalHtmlAttributes } from "../../Enums";

export interface TextAreaInputProps
  extends AdditionalHtmlAttributes,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelType?: any;
  rows?: number;
  trackHeight?: boolean
  maxTrackedHeight?: number
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  errorClassName,
  labelType,
  rows,
  style,
  onChange,
  trackHeight = false,
  maxTrackedHeight = 300,
  ...props
}) => {
  const inputRef = createRef<HTMLTextAreaElement>();
  const onValueChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    checkHeight();
    if(onChange) onChange(e);
  }

  const checkHeight = () => {
    if(inputRef.current && trackHeight == true){
      inputRef.current.style.height = "auto";
      if(maxTrackedHeight && maxTrackedHeight >= inputRef.current.scrollHeight)
        inputRef.current.style.height = inputRef.current.scrollHeight + "px";
      else if(maxTrackedHeight) inputRef.current.style.height = maxTrackedHeight + "px";
    }
  }
  useEffect(() => {
    checkHeight();
  }, [inputRef, trackHeight, maxTrackedHeight])

  return (
    <textarea
      {...props}
      onChange={(e) => onValueChanged(e)}
      ref={inputRef}
      className={`oph-textAreaInput peer ${errorClassName ? "error" : ""} ${labelType && labelType === "floating" ? "floating" : ""}`}
      rows={rows}
      style={style}
    />
  );
};

export default TextAreaInput;
