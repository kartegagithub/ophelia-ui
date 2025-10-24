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
  const [text, setText] = React.useState<any>("");
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
    setText(props.value ?? props.defaultValue ?? "");
  }, [props.value, props.defaultValue]);

  useEffect(() => {
    checkHeight();
  }, [inputRef, trackHeight, maxTrackedHeight])

  const pureProps = (({
      value,
      defaultValue,
      defaultChecked,
      ...others
    }) => others)(props);

  return (
    <textarea
      defaultValue={text ?? ""}
      {...pureProps}
      onChange={(e) => {
        setText(e.target.value);
        onValueChanged(e)
      }}
      ref={inputRef}
      className={`oph-textAreaInput peer ${errorClassName ? "error" : ""} ${labelType && labelType === "floating" ? "floating" : ""}`}
      rows={rows}
      style={style}
    />
  );
};

export default TextAreaInput;
