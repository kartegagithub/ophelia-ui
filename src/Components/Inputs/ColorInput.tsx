import React, { InputHTMLAttributes, useRef, useState } from "react";
import { getAppTheme } from "../../AppTheme";
import { AdditionalHtmlAttributes } from "../../Enums";
import { ArrowDownIcon } from "@heroicons/react/24/solid";

interface ColorInputProps extends InputHTMLAttributes<HTMLInputElement> {
  // İhtiyacınıza göre ek prop'lar ekleyebilirsiniz
  labelType?: any;
  useAlpha?: boolean;
}

const ColorInput: React.FC<ColorInputProps & AdditionalHtmlAttributes> = ({
  className,
  style,
  defaultValue,
  value,
  labelType,
  useAlpha = false,
  onChange,
  ...props
}) => {
  const appTheme = getAppTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLInputElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const onColorSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;
    inputRef.current.value = addAlphaToHexColorCode(e.currentTarget.value, rangeRef.current?.value);
    if (divRef.current) divRef.current.style.backgroundColor = inputRef.current.value;
    if (onChange) onChange({target: inputRef.current, value: inputRef.current.value, bubbles: true} as any);
  };

  const onManualColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!pickerRef.current) return;
    pickerRef.current.value = removeAlphaFromHexColorCode(e.currentTarget.value) ?? "";
    if (divRef.current)
      divRef.current.style.backgroundColor = e.currentTarget.value;

    if (onChange) onChange({target: e.currentTarget, value: e.currentTarget.value, bubbles: true} as any);
  };

  const onOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!inputRef.current || !pickerRef.current) return;
    inputRef.current.value = addAlphaToHexColorCode(pickerRef.current.value, e.currentTarget.value);
    if (divRef.current) divRef.current.style.backgroundColor = inputRef.current.value;
    if (onChange) onChange({target: inputRef.current, value: inputRef.current.value, bubbles: true} as any);
  };

  const toggleRange = () => {
    if(!rangeRef.current) return;
    if(pickerRef.current && inputRef.current)
      pickerRef.current.value = removeAlphaFromHexColorCode(inputRef.current.value) ?? "";

    if(rangeRef.current.classList.contains("hidden")) rangeRef.current.classList.remove("hidden")
    else rangeRef.current.classList.add("hidden")
  }

  const initialAlpha = getAlphaFromHexColorCode((defaultValue ?? value ?? "").toString());
  return (
    <>
      <div className="relative">
        <input
          type="text"
          onChange={(e) => onManualColorChange(e)}
          className={`${props.errorClassName} ${
            className ?? appTheme?.Inputs?.text
          } ${
            labelType && labelType === "floating"
              ? "placeholder-transparent"
              : ""
          }`}
          ref={inputRef}
          value={value}
          defaultValue={defaultValue}
          {...props}
        />
        <div
          className={`w-15 h-5 absolute ${useAlpha? "right-5": "right-1"} bottom-2 border-gray-300 border-solid border-2`}
          onClick={() => { 
            if(!pickerRef.current) return;

            pickerRef.current.value = removeAlphaFromHexColorCode(inputRef.current?.value) ?? ""; 
            pickerRef.current?.click()}}
          style={{ backgroundColor: (defaultValue ?? value ?? "").toString()}}
          ref={divRef}
        ></div>
        <input
          onChange={(e) => onColorSelection(e)}
          type="color"
          className={`opacity-0 w-0 h-0 absolute ${useAlpha? "right-5": "right-1"} bottom-2 border-gray-300 border-solid border-2`}
          ref={pickerRef}
        />
        {useAlpha && 
          <div>
            <div title="Opacity" className="h-5 absolute pr-1 pl-1 right-0 bottom-2 cursor-pointer border-gray-300 border-solid border-2 flex align-center" onClick={() => toggleRange()}><ArrowDownIcon width={10} height={10}></ArrowDownIcon></div>
            <input defaultValue={initialAlpha} onChange={(e) => onOpacityChange(e)} ref={rangeRef} type="range" max={1} min={0} step={0.01} className="hidden absolute right-1 bottom-[-1] w-full"/>
          </div>
        }
      </div>
    </>
  );
};

export default ColorInput;

export const addAlphaToHexColorCode = (hex: string, alpha?: string | number) => {
  if(!alpha ) return hex;
  return `${hex}${Math.floor(parseFloat(alpha.toString()) * 255).toString(16).padStart(2, '0')}`;
}
export const removeAlphaFromHexColorCode = (hex?: string) => {
  if(!hex) return undefined;
  if(hex.length == 9){
    return hex.substring(0, 7);
  }
  return hex;
}
export const getAlphaFromHexColorCode = (hex?: string) => {
  if(!hex) return 1;
  if(hex.length == 9){
    return (parseInt(hex.substring(7, 9), 16) / 255).toFixed(2);
  }
  return 1;
}