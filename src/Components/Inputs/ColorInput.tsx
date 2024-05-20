import React, { InputHTMLAttributes, useRef } from "react";
import { getAppTheme } from "../../AppTheme";
import { AdditionalHtmlAttributes } from "../../Enums";

interface ColorInputProps extends InputHTMLAttributes<HTMLInputElement> {
  // İhtiyacınıza göre ek prop'lar ekleyebilirsiniz
  labelType?: any;
}

const ColorInput: React.FC<ColorInputProps & AdditionalHtmlAttributes> = ({
  className,
  defaultValue,
  value,
  labelType,
  onChange,
  ...props
}) => {
  const appTheme = getAppTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const onColorSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;
    inputRef.current.value = e.currentTarget.value;
    if (onChange) onChange(e);
  };

  return (
    <>
      <input
        type="text"
        className={`${props.errorClassName} ${className ?? appTheme?.Inputs?.text} ${labelType && labelType === "floating" ? "placeholder-transparent" : ""}`}
        ref={inputRef}
        {...props}
      />
      <input
        onChange={(e) => onColorSelection(e)}
        type="color"
        className="w-15 absolute right-4 top-4"
        defaultValue={defaultValue}
        value={value}
      />
    </>
  );
};

export default ColorInput;