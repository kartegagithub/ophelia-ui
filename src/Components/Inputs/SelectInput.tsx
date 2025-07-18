import { AdditionalHtmlAttributes } from "../../Enums";
import React, { SelectHTMLAttributes, useState } from "react";

const SelectInput: React.FC<
  SelectHTMLAttributes<HTMLSelectElement> &
    SelectInputProps &
    AdditionalHtmlAttributes
> = ({
  errorClassName,
  onChange = undefined,
  placeholder = undefined,
  value = undefined,
  defaultValue = undefined,
  options = undefined,
  low = undefined,
  high = undefined,
  className = undefined,
  style = undefined,
  displayProp = "text",
  valueProp = "value",
  isDisabled = false,
  switchbox = false,
  ...pureProps
}) => {
  const [selectedItem, setSelectedItem] = useState(-1);
  const HiddenRef = React.createRef<HTMLInputElement>();

  const getOptions = () => {
    var _options: Array<SelectInputOption> = [];
    if (options) {
      var tmpOptions = JSON.parse(JSON.stringify(options)) as Array<any>;
      for (let index = 0; index < tmpOptions.length; index++) {
        var tmp = tmpOptions[index];
        if (displayProp == "itself" && valueProp == "itself")
          _options.push({ text: tmp, value: tmp });
        else
          _options.push({
            text: tmp[displayProp],
            value: tmp[valueProp],
            isDisabled: tmp.isDisabled,
          });
      }
    } else if (low && high) {
      for (let index = low; index <= high; index++) {
        _options.push({ text: index.toString(), value: index.toString() });
      }
    }
    return _options;
  };

  const getSelectedValueIndex = (options: Array<SelectInputOption>) => {
    var selectedValue = value ?? defaultValue;
    for (let index = 0; index < options.length; index++) {
      const element = options[index];
      if (element.value == selectedValue?.toString()) return index;
    }
    return -1;
  };
  const onSelectValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(e);
  };
  const onSwitchValueChange = (
    e: React.MouseEvent<HTMLLabelElement>,
    value: string,
    index: number
  ) => {
    setSelectedItem(index);
    if (HiddenRef.current) {
      HiddenRef.current.value = value;
      var event: any = { currentTarget: HiddenRef.current, bubbles: true };
      if (onChange) onChange(event);
    }
  };
  const _options = getOptions();

  if (switchbox === true) {
    className = "oph-selectInput-switch";
    var selectedIndex = selectedItem;
    if (selectedIndex == -1) selectedIndex = getSelectedValueIndex(_options);
    var selectedValue = "";
    if (_options && _options.length > 0 && selectedIndex > -1)
      selectedValue = _options[selectedIndex].value;
    return (
      <>
        <div className="oph-selectboxWithSwitch">
          <input
            ref={HiddenRef}
            type="hidden"
            id={pureProps.id}
            name={pureProps.name}
            value={selectedValue}
          ></input>
          {_options &&
            _options.map((item, i) => {
              var selected = i == selectedIndex;
              return (
                <label
                  onClick={(e) => onSwitchValueChange(e, item.value, i)}
                  key={i}
                  className={`${selected ? "oph-selectboxWithSwitch-selectedItem" : "oph-selectboxWithSwitch-item"}`}
                >
                  {item.text}
                </label>
              );
            })}
        </div>
      </>
    );
  } else {
    return (
      <>
        <select
          onChange={(e) => onSelectValueChange(e)}
          value={value}
          defaultValue={defaultValue}
          {...pureProps}
          className={`oph-selectInput peer ${className} ${errorClassName ? "error" : ""}`}
          style={style}
        >
          {placeholder && <option>{placeholder}</option>}
          {_options &&
            _options.map((item, i) => {
              return (
                <option key={i} value={item.value} disabled={item.isDisabled}>
                  {item.text}
                </option>
              );
            })}
        </select>
      </>
    );
  }
};
export default SelectInput;

var selectInputProps: {
  placeholder?: string;
  options?: Array<any>;
  low?: number;
  high?: number;
  displayProp?: string;
  valueProp?: string;
  switchbox?: boolean;
  isDisabled?: boolean;
};
var selectOption: {
  text: string;
  value: string;
  className?: string;
  selectedClassName?: string;
  isDisabled?: boolean;
};
export type SelectInputOption = typeof selectOption;
export type SelectInputProps = typeof selectInputProps;
