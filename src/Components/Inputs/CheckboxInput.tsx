import { isNullOrEmpty } from "../../Extensions/StringExtensions";
import { getAppTheme } from "../../AppTheme";
import React, { InputHTMLAttributes, useEffect, useState } from "react";

const CheckboxInput: React.FC<
  InputHTMLAttributes<HTMLInputElement> & {
    switchbox?: boolean;
    onText?: string;
    offText?: string;
    label?: string;
    onClick?: void;
    id?: string;
  }
> = ({
  onText = null,
  offText = null,
  style = undefined,
  switchbox = undefined,
  type = undefined,
  checked = undefined,
  defaultChecked = undefined,
  label = undefined,
  readOnly = undefined,
  onChange = undefined,
  onClick = undefined,
  id,
  ...props
}) => {
  const appTheme = getAppTheme();
  const [checkedValue, setCheckedValue] = useState(
    defaultChecked || checked || false
  );

  // checked prop'u değiştiğinde checkedValue'yu güncelle
  useEffect(() => {
    if (checked !== undefined) {
      setCheckedValue(checked);
    }
  }, [checked]);

  const onCheckedChange = (e: any) => {
    if (readOnly == true) {
      e.preventDefault();
      return;
    }
    setCheckedValue(!checkedValue);
    if (onChange) onChange(e);
  };

  if (switchbox === true) {
    return (
      <label id={id} className="oph-checkboxSwitchbox">
        <input
          className="oph-checkboxSwitchbox-input peer"
          type="checkbox"
          name={props.name}
          id={id ? id + "-input" : ""}
          key={checkedValue ? "true" : "false"}
          onChange={(e) => onCheckedChange(e)}
          defaultChecked={checkedValue}
          checked={checked !== undefined ? checked : checkedValue}
          onClick={onClick}
          {...props}
        />
        <div className="oph-checkboxSwitchbox-switch peer"></div>
        {!isNullOrEmpty(onText) && !isNullOrEmpty(offText) && (
          <span className="oph-checkboxSwitchbox-text">
            {checkedValue ? onText : offText}
          </span>
        )}
      </label>
    );
  } else {
    return (
      <div id={id} className="oph-checkboxInput">
        <input
          className="oph-checkboxInput-input peer"
          type="checkbox"
          name={props.name}
          id={id ? id + "-input" : ""}
          key={checkedValue ? "true" : "false"}
          onChange={(e) => onCheckedChange(e)}
          defaultChecked={checkedValue}
          checked={checked !== undefined ? checked : checkedValue}
          onClick={onClick}
          {...props}
          style={style}
        />
        <label className="oph-checkboxInput-label" htmlFor={id + "-input"}>
          {label}
        </label>
      </div>
    );
  }
};

export default CheckboxInput;
