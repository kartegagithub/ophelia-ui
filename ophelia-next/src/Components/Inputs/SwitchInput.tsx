import React, { ChangeEvent, useRef, useState } from "react";
import Icon from "../Icon";

interface Option {
  text: string;
  value: string;
}

interface SwitchInputProps {
  id?: string;
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
  id,
  options = [],
  low,
  high,
  defaultValue = "",
  onChange,
  displayProp = "text",
  valueProp = "value",
  leftIcon = true,
  icon = "",
  ...pureProps
}) => {
  const [selectedItem, setSelectedItem] = useState<number>(
    parseInt(defaultValue || "0", 10)
  );
  const HiddenRef = useRef<HTMLInputElement>(null);
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
        _options.push({
          text: opt[displayProp as keyof Option],
          value: opt[valueProp as keyof Option],
        });
      });
    } else if (low !== undefined && high !== undefined) {
      for (let index = low; index <= high; index++) {
        _options.push({ text: index.toString(), value: index.toString() });
      }
    }
    return _options;
  };

  const _options = getOptions();

  const _getGroupCheckBox = (item: Option, index: number) => {
    return (
      <div className={`oph-switchInput ${index}`}>
        <div className="oph-switchInput-left">
          {leftIcon && (
            <Icon
              className="oph-switchInput-left-icon"
              name={icon}
              color="currentColor"
              size={20}
            />
          )}
          <label key={index} className="oph-switchInput-left-label">
            {item?.text}
          </label>
        </div>
        <div className="oph-switchInput-right">
          <input
            id="switch-component"
            type="checkbox"
            className="oph-switchInput-right-input"
            defaultChecked
            onChange={(e) => {
              onSwitchValueChange(item.text, index);
            }}
          />
          <label
            htmlFor="switch-component"
            className="oph-switchInput-right-label"
          >
            <div
              className="oph-switchInput-right-label-inner"
              data-ripple-dark="true"
            ></div>
          </label>
        </div>
      </div>
    );
  };
  return (
    <div id={id}>
      {_options.map((item, index) => {
        return _getGroupCheckBox(item, index);
      })}
    </div>
  );
};

export default SwitchInput;
