import React, { SelectHTMLAttributes, useEffect, useState } from "react";
import Icon from "../Icon";
import { AppTheme, getAppTheme } from "../../AppTheme";

const ToggleInput: React.FC<SelectHTMLAttributes<HTMLSelectElement> & ToggleInputProps> = ({ 
  onChange = undefined,
  placeholder = undefined,
  value = undefined,
  defaultValue = undefined,
  options = undefined,
  low = undefined,
  high = undefined,
  className = undefined,
  displayProp = "text",
  valueProp = "value",
  switchbox = true,
  icon = "",
  leftIcon="search",
  rightIcon="search",
  type,
  ...pureProps
}) => {  
  const [selectedItem, setSelectedItem] = useState(0)
  const [changeItem, setChangeItem] = useState(Object)
  const [toggle, setToggle] = useState(false)
  const HiddenRef = React.createRef<HTMLInputElement>();
  const [showContent, setShowContent] = useState(false);
  const [animationArrow, setAnimationArrow] = useState("arrow-down");
  const theme = getAppTheme() as AppTheme;

  const getOptions = () => {
    var _options: Array<ToggleInputOption> = []
    if(options){
      var tmpOptions = JSON.parse(JSON.stringify(options)) as Array<any>;
      for (let index = 0; index < tmpOptions.length; index++) {
        var tmp = tmpOptions[index]
        if(displayProp == "itself" && valueProp == "itself")
          _options.push({ text: tmp, value: tmp })
        else
          _options.push({ text: tmp[displayProp], value: tmp[valueProp] })
      }
    } 
    else if(low && high){
      for (let index = low; index <= high; index++){
        _options.push({text: (index).toString(), value: (index).toString()})
      }
    }
    return _options
  }
  

  const _options = getOptions()

    const _className = toggle ? theme.SelectBox?.toggleActiveInput : theme.SelectBox?.togglePassiveInput;
    return(
      <label className={theme.SelectBox?.toggleClass} onClick={(e) => setToggle(!toggle)}>
        <div className={theme.SelectBox?.toggleLabelClass}>
          {leftIcon && <Icon name={icon} color="black" size={20}/>}
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Small toggle</span>
          <input type="checkbox" value="" className="sr-only peer" disabled/>
        </div>
        <div className={_className}></div>
      </label>
    )
}
export default ToggleInput;

var toggleInputProps : { 
  placeholder?: string;
  options?: Array<any>
  low?: number
  high?: number
  displayProp?: string
  valueProp?: string,
  switchbox?: boolean;
  icon?: string;
  leftIcon?: string;
  rightIcon?: string;
  type?: string

}
var toggleInputOption : {text: string, value: string, className?: string, selectedClassName?:string}
export type ToggleInputOption = typeof toggleInputOption
export type ToggleInputProps = typeof toggleInputProps