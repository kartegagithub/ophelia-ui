import React, { InputHTMLAttributes } from "react";
import { getAppTheme } from "../../AppTheme";

export default class ColorInput<P> extends React.Component<P & InputHTMLAttributes<HTMLInputElement>, {}>{
  InputRef = React.createRef<HTMLInputElement>();
  onColorSelection(e: React.ChangeEvent<HTMLInputElement>){
    if(!this.InputRef.current) return;
    this.InputRef.current.value = e.currentTarget.value;
    if(this.props.onChange) this.props.onChange(e)
  }
  render(): React.ReactNode {
    return (
      <>
          <div className="flex relative">
            <input
              type="text"
              className={` ${this.props.className ?? getAppTheme().Inputs?.text}`}
              {...this.props}
              ref={this.InputRef}
            >
            </input>
            <input onChange={(e) => this.onColorSelection(e)} type="color" className="w-10 absolute right-2" defaultValue={this.props.defaultValue} value={this.props.value}></input>
          </div>
      </>
    );
  }
}