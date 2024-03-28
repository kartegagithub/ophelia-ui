import { getAppTheme } from "../../AppTheme";
import React, { ChangeEvent, MouseEventHandler, SelectHTMLAttributes } from "react";

export default class Select<P> extends React.Component<P & SelectHTMLAttributes<HTMLSelectElement> & {
  placeholder?: string;
  options?: Array<{text: string, value: string}>
  low?: number
  high?: number
  displayProp?: string
  valueProp?: string
}, {}>{
  getOptions(){
    var _options: Array<{text: string, value: string}> = []
    if(this.props.options){
      var tmpOptions = JSON.parse(JSON.stringify(this.props.options)) as Array<any>;
      var displayProp = this.props.displayProp ?? "text"
      var valueProp = this.props.valueProp ?? "value"
      for (let index = 0; index < tmpOptions.length; index++) {
        var tmp = tmpOptions[index]
        if(displayProp == "itself" && valueProp == "itself")
          _options.push({ text: tmp, value: tmp })
        else
          _options.push({ text: tmp[displayProp], value: tmp[valueProp] })
      }
    } 
    else if(this.props.low && this.props.high){
      for (let index = this.props.low; index <= this.props.high; index++){
        _options.push({text: (index).toString(), value: (index).toString()})
      }
    }
    return _options
  }
  render(): React.ReactNode {
    var _options = this.getOptions()
    var pureProps = (({ placeholder, type, options, displayProp, valueProp, className, ...others }) => others)(this.props as any)

    let val: number | readonly string[] | string | undefined = undefined;
    if(this.props.value)
      val = this.props.value;

    return (
      <>
        <select {...pureProps} className={this.props.className ?? getAppTheme().Inputs?.selectbox}>
          {this.props.placeholder && (
            <option>
              {this.props.placeholder}
            </option>
          )}
          {_options && _options.map((item, i) => {
            return (
              <option
                key={i}
                value={item.value}
              >
                {item.text}
              </option>
            );
          })}
        </select>
      </>
    );
  }
}