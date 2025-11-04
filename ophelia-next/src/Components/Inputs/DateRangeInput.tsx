import { stringToDateInputValue } from "ophelia-core";
import { getAppTheme } from "../../AppTheme";
import { AdditionalHtmlAttributes } from "ophelia-core";
import React, { createRef, InputHTMLAttributes, useEffect, useState } from "react";
import DateInput, { DateInputProps } from "./DateInput";

const DateRangeInput: React.FC<DateInputProps & AdditionalHtmlAttributes & {
  highValue?: string,
  lowValue?: string
}> = ({
  labelType,
  highValue,
  lowValue,
  value,
  style,
  id,
  showPickerOnFocus,
  onChange,
  ...props
}) => {
  const Root = createRef<HTMLDivElement>();
  const [values, setValues] = useState<{lowValue?: string, highValue?: string}>({ lowValue: lowValue, highValue: highValue });
  useEffect(() => {
    setValues({lowValue: lowValue, highValue: highValue});
  }, [highValue, lowValue]);

  const onValueChanged = (e: React.ChangeEvent<HTMLInputElement>, name: string)=> {
    var tmpValue: any = {};
    if(name == "low")
      tmpValue = {lowValue: e.target.value, highValue: values.highValue};
    else
      tmpValue = {lowValue: values.lowValue, highValue: e.target.value}

    setValues(tmpValue)

    var val: any = {
      rawValue:{
        low: tmpValue.lowValue,
        high: tmpValue.highValue,
      },
      bubbles: true,
    }
    if(onChange)
      onChange(val);
  }

  return (
   <div className="oph-dateRangeInput" ref={Root}>
      <DateInput onChange={(e) => onValueChanged(e, "low")} {...props} style={style} defaultValue={values.lowValue} id={`${id}_low`}/>
      <DateInput onChange={(e) => onValueChanged(e, "high")} {...props} style={style} defaultValue={values.highValue} id={`${id}_high`}/>
   </div>
  );
};

export default DateRangeInput;
