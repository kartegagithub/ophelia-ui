import React, { InputHTMLAttributes } from "react";

export interface HiddenInputProps extends InputHTMLAttributes<HTMLInputElement> {
  // İhtiyacınıza göre ek prop'lar ekleyebilirsiniz
}

const HiddenInput: React.FC<HiddenInputProps> = (props) => {
  return (
    <input type="hidden" {...props} />
  );
};

export default HiddenInput;