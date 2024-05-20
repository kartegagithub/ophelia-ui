import { AppTheme, getAppTheme } from "../../AppTheme";
import React, { ChangeEvent, SelectHTMLAttributes, useEffect, useRef, useState } from "react";
import Icon from "../Icon";

interface Option {
    text: string;
    value: string;
  }
  
  interface SwitchInputProps {
    options?: Option[];
    low?: number;
    high?: number;
    defaultValue?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    displayProp?: string;
    valueProp?: string;
    leftIcon?: string;
    icon?: string;
    [key: string]: any;
  }
  
const SwitchInput: React.FC<SwitchInputProps> = ({
    options = [],
    low,
    high,
    defaultValue = '',
    onChange,
    displayProp = 'text',
    valueProp = 'value',
    leftIcon = true,
    icon = '',
    ...pureProps
  }) => {
    const [selectedItem, setSelectedItem] = useState<number>(parseInt(defaultValue || '0', 10));
    const HiddenRef = useRef<HTMLInputElement>(null);
    const theme = getAppTheme() as AppTheme;
    const onSwitchValueChange = (value: string, index: number) => {
      setSelectedItem(index);
      if (HiddenRef.current) {
        HiddenRef.current.value = value;
        const event: any = { currentTarget: HiddenRef.current, bubbles: true };
        if (onChange) onChange(event);
      }
    };
  
    const getOptions = (): Option[] => {
        let _options: Option[] = [];
      
        if (options && options.length > 0) {
          options.forEach((opt) => {
            _options.push({ text: opt[displayProp as keyof Option], value: opt[valueProp as keyof Option] });
          });
        } else if (low !== undefined && high !== undefined) {
          for (let index = low; index <= high; index++) {
            _options.push({ text: index.toString(), value: index.toString() });
          }
        }
        return _options;
      };
  
    const getSelectedValueIndex = (options: Option[]): number => {
      const selectedValue = defaultValue || HiddenRef.current?.value;
      for (let index = 0; index < options.length; index++) {
        const element = options[index];
        if (element.value === selectedValue?.toString()) return index;
      }
      return -1;
    };
  
    const _options = getOptions();
  
    const _getGroupCheckBox = (item: Option, index: number) => {
      return (
        <div className="flex flex-row  justify-between">
          <div className="flex flex-row items-center">
            {leftIcon && <Icon name={icon} color="black" size={20}/>}
            <label key={"index"}  className={`${theme.SelectBox?.checkBoxLabel}`}>
              {item?.text}
            </label>
          </div>
          <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
              <input id="switch-component" type="checkbox"
                className={`${theme.SelectBox?.switchInputClass}`}
                defaultChecked 
                onChange={(e) => {
                  onSwitchValueChange(item.text, index)}
                }
                />
              <label htmlFor="switch-component"
                className={`${theme.SelectBox?.switchLabelClass}`}>
                <div className={`${theme.SelectBox?.switchRoundedClass}`}
                  data-ripple-dark="true"> </div>
              </label>
            </div>
        </div>
      );
    };
    return (
        <>
          {
            _options.map((item,index) => {
                return(
                    _getGroupCheckBox(item, index)
                )
            })
          }
        </>
    );
  };
  
export default SwitchInput;
