import { isNullOrEmpty } from "../../Extensions/StringExtensions";
import { getAppTheme } from "../../AppTheme";
import React, { InputHTMLAttributes, useState } from "react";

const CheckboxInput: React.FC<InputHTMLAttributes<HTMLInputElement> & {
  switchbox?: boolean,
  onText?: string,
  offText?: string
}> = ({ 
  onText = "ON",
  offText = "OFF",
  className = undefined, 
  switchbox = undefined, 
  type = undefined, 
  checked = undefined, 
  defaultChecked = undefined, 
  readOnly = undefined, 
  onChange = undefined, 
  ...props 
}) => {
  const appTheme = getAppTheme(); 
  const [checkedValue, setCheckedValue] = useState(defaultChecked == true || checked == true)
  const onCheckedChange = (e: any) => {
    if(readOnly == true){
      e.preventDefault()
      return;
    }
    setCheckedValue(!checkedValue)
    if(onChange) onChange(e)
  }

  if(switchbox === true){
    return (
    <label className="inline-flex items-center cursor-pointer" key={checkedValue ? "true": "false"}>
      <input type="checkbox" value="" className="sr-only peer" defaultChecked={checkedValue} onChange={(e) => onCheckedChange(e)}/>
      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      {!isNullOrEmpty(onText) && !isNullOrEmpty(offText) && <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {checkedValue && onText}
        {!checkedValue && offText}
      </span>}
    </label>)
  }
  else{
    return (
      <input
        type="checkbox"
        key={checkedValue ? "true": "false"}
        onChange={(e) => onCheckedChange(e)}
        defaultChecked={checkedValue}
        className={className ?? getAppTheme().Inputs?.checkbox}
        {...props}
      />
    );
  }
};

export default CheckboxInput;