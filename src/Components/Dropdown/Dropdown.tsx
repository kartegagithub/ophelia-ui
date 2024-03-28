import { getAppTheme } from "../../AppTheme";
import React, { useEffect, useState } from "react";
import { getImageComponent } from "../Image/Extensions";
import { filterInArray, findData, findInArray, selectDefaultValues } from "../../Extensions/ArrayExtensions";
import Link from "next/link";
import { IconProps } from "../Icon/Icon";
const Dropdown: React.FC<DropdownProps> = ({ 
    id = "", 
    multipleSelection = undefined,
    visible = false, 
    enableSearch = false, 
    searchPlaceholder = "Search",
    onSearch = undefined,
    onSelectionChange = undefined,
    children = undefined,
    options = [],
    buttons = [],
    optionTemplateFn = undefined,
    defaultValue = undefined,
    urlProp = "url",
    iconProp = "icon",
    displayProp = "text",
    valueProp = "value",
    label = "",
    theme = undefined
  }) => {  
  const [selectedOptions, setSelectedOptions] = useState(new Array<any>());
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [open, setOpen] = useState(false);
  const Theme = getAppTheme({Dropdown: theme}).Dropdown;
  const SearchRef = React.createRef<HTMLInputElement>();
  var Searching: boolean = false;
  var Timer: any
  const onSearchKeyup = async (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if(Searching) return
    Searching = true;

    if(Timer) clearTimeout(Timer)
    Timer = setTimeout(async () => {
      var key = SearchRef.current?.value ?? "";
      var result : Array<any> | undefined = undefined
      if(onSearch) {
        result = await onSearch(key)
      }
      if(!onSearch || result == undefined) {
        result = filterInArray(options, key, displayProp);
      }
      if(result != undefined) setFilteredOptions(result);
      Searching = false;
    }, 500);
  }  

  const onButtonClick = (e: any, button: any) => {
    e.preventDefault();
    if(button.type == "dismiss"){
      setOpen(false)
      return;
    }
    else if(button.type == "reset"){
      if(defaultValue) setSelectedOptions(selectDefaultValues(defaultValue, valueProp, options))
      return;
    }
    else{
      if(onSelectionChange) onSelectionChange(selectedOptions, button)
      if(button.hideDropdownOnClick === true) setOpen(false)
    }
  }

  const onOptionSelectionChanged = (e: any, option: any) => {
    if(multipleSelection == undefined){
      if(onSelectionChange) onSelectionChange(option)
      return;
    }
    var tmpOptions = JSON.parse(JSON.stringify(selectedOptions))
    var findResult = findInArray(tmpOptions, option, valueProp);
    if(multipleSelection == false) {
      tmpOptions = []
      findResult.index = -1
    }
    if(findResult.index > -1){
      tmpOptions.splice(findResult.index, 1)
    }
    else tmpOptions.push(option)
    setSelectedOptions(tmpOptions)
    if(onSelectionChange) onSelectionChange(tmpOptions)
  }

  useEffect(() =>{
    setOpen(visible)
    if(defaultValue){
      var values = selectDefaultValues(defaultValue, valueProp, options)
      setSelectedOptions(values)
    }
    if(enableSearch && visible){
      setTimeout(function(){ SearchRef.current?.focus(); }, 200)
    }
    if(visible && (!filteredOptions || filteredOptions.length == 0)) onSearchKeyup();
  },[enableSearch, visible])

  return (
    <div id={id} className={`${Theme?.Class} ${open ? "block": "hidden"}`}>
      {enableSearch && <div className="p-3">
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center">
            {getImageComponent(Theme?.SearchIcon)}
          </div>
          <input onKeyUp={(e) => onSearchKeyup(e)} type="text" ref={SearchRef} className="border-b border-wildBlueYonder text-black placeholder:text-silverChalice text-[14px] font-normal focus:border-black outline-none block w-full py-2 pl-6" placeholder={searchPlaceholder} />
        </div>
      </div>}
      {label && <p className="text-manatee text-[10px] font-normal mb-1.5">{label}</p>}

      {filteredOptions && filteredOptions.length > 0 && <ul className={Theme?.ContentClass} aria-labelledby="dropdownSearchButton">
        {filteredOptions.map((option, i) => 
        {
          var checked = findInArray(selectedOptions, option, valueProp).index > -1
          //console.log(option, checked)
          return <li>
            <Link href={urlProp && option[urlProp] != undefined? option[urlProp]: "javascript:void(0)"}>
              <div id={`${id}_option_${i}`} className={Theme?.ItemClass} onClick={(e) => onOptionSelectionChanged(e, option)}>
                {iconProp && option[iconProp] && getImageComponent(option[iconProp])}
                {multipleSelection != undefined && <input disabled id={`${id}_selectedvalue_${i}`} name={`${id}_selectedvalue`} type={multipleSelection? "checkbox": "radio"} value={option[valueProp]} checked={checked} className={multipleSelection? (Theme?.CheckboxClass ?? getAppTheme().Inputs?.checkbox): (Theme?.RadioClass ?? getAppTheme().Inputs?.radio)} />}
                {!optionTemplateFn && <label className={Theme?.ItemLabelClass}>{option[displayProp]}</label>}
                {optionTemplateFn && optionTemplateFn(option)}
              </div>
            </Link>
          </li>})}      
      </ul>}
      {children}
      {buttons && buttons.length > 0 && <div className={Theme?.ButtonContainerClass}>
        {buttons.map((button) => 
          <a href="#" onClick={(e) => onButtonClick(e, button)} className={button.className ?? Theme?.ButtonClass}>
            {button.icon && getImageComponent(button.icon)}
            {button.text}
          </a>
        )}
      </div> }     
  </div>
  );
}
export default Dropdown;

var dropdownProps : { id?: string, 
  visible?: boolean, 
  enableSearch?: boolean, 
  searchPlaceholder?: string,
  multipleSelection?: boolean
  onSearch?: ((key?: string) => Promise<Array<any> | undefined>)
  onSelectionChange?: ((value?: any | Array<any>, clickedButton?: any) => void)
  children?: React.ReactNode,
  defaultValue?: Array<any> | any,
  options?: Array<any>,
  buttons?: Array<{id?: string | number, text?: string, icon?: string | React.JSX.Element, type?: "dismiss" | "reset" | "button", className?: string, hideDropdownOnClick?: boolean, color?: 'inherit'| 'primary' | 'secondary' | 'success' | 'error' | 'info'| 'warning'| string}>,
  optionTemplateFn?: ((item: any) => React.JSX.Element),
  displayProp?: string
  valueProp?: string
  urlProp?: string
  iconProp?: string
  label?: string,
  theme?: DropdownTheme
}
export type DropdownProps = typeof dropdownProps

var dropdownTheme: {
  Class?: string,
  ClassWhenInner?: string,
  ButtonContainerClass?: string,
  ButtonClass?: string,
  ContentClass?: string,
  SuccessClass?: string,
  ItemClass?: string,
  CheckboxClass?: string,
  RadioClass?: string,
  ItemLabelClass?: string,
  SearchIcon?: React.JSX.Element | string | undefined | IconProps,
}

export type DropdownTheme = typeof dropdownTheme