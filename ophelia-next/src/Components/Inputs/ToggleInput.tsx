import React, { SelectHTMLAttributes, useEffect, useState } from "react";
import Icon from "../Icon";

const ToggleInput: React.FC<
  SelectHTMLAttributes<HTMLSelectElement> & ToggleInputProps
> = ({
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
  leftIcon = "search",
  rightIcon = "search",
  type,
  id,
  ...pureProps
}) => {
  const [toggle, setToggle] = useState(false);

  const getOptions = () => {
    var _options: Array<ToggleInputOption> = [];
    if (options) {
      var tmpOptions = JSON.parse(JSON.stringify(options)) as Array<any>;
      for (let index = 0; index < tmpOptions.length; index++) {
        var tmp = tmpOptions[index];
        if (displayProp == "itself" && valueProp == "itself")
          _options.push({ text: tmp, value: tmp });
        else _options.push({ text: tmp[displayProp], value: tmp[valueProp] });
      }
    } else if (low && high) {
      for (let index = low; index <= high; index++) {
        _options.push({ text: index.toString(), value: index.toString() });
      }
    }
    return _options;
  };

  return (
    <label
      className="oph-toggleInput"
      onClick={(e) => setToggle(!toggle)}
      id={id}
    >
      <div className="oph-toggleInput-label">
        {leftIcon && <Icon name={icon} color="currentColor" size={20} />}
        <span className="oph-toggleInput-label-text">Small toggle</span>
        <input
          type="checkbox"
          value=""
          className="oph-toggleInput-label-checkbox"
          disabled
        />
      </div>
    </label>
  );
};
export default ToggleInput;

var toggleInputProps: {
  id?: string;
  placeholder?: string;
  options?: Array<any>;
  low?: number;
  high?: number;
  displayProp?: string;
  valueProp?: string;
  switchbox?: boolean;
  icon?: string;
  leftIcon?: string;
  rightIcon?: string;
  type?: string;
};
var toggleInputOption: {
  text: string;
  value: string;
  className?: string;
  selectedClassName?: string;
};
export type ToggleInputOption = typeof toggleInputOption;
export type ToggleInputProps = typeof toggleInputProps;
