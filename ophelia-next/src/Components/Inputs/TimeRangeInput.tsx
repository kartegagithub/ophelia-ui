import { AdditionalHtmlAttributes } from "ophelia-core";
import React, { createRef, useEffect, useState } from "react";
import TimeInput, { TimeInputProps } from "./TimeInput";

const TimeRangeInput: React.FC<TimeInputProps & AdditionalHtmlAttributes & {
  highValue?: string,
  lowValue?: string
}> = ({
  labelType,
  highValue,
  lowValue,
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
   <div className="oph-timeRangeInput" ref={Root}>
      <TimeInput onChange={(e) => onValueChanged(e, "low")} {...props} style={style} defaultValue={lowValue} id={`${id}_low`}/>
      <TimeInput onChange={(e) => onValueChanged(e, "high")} {...props} style={style} defaultValue={highValue} id={`${id}_high`}/>
   </div>
  );
};

export default TimeRangeInput;
