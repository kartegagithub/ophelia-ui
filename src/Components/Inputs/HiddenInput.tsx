import React, { InputHTMLAttributes } from "react";

export interface HiddenInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

const HiddenInput: React.FC<HiddenInputProps> = (props) => {
  return (
    <input id={props.id} type="hidden" className="oph-hiddenInput" {...props} />
  );
};

export default HiddenInput;
