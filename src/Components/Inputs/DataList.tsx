import React, { InputHTMLAttributes } from "react";

export default class DataList<P> extends React.Component<P & InputHTMLAttributes<HTMLDataListElement> & {
  options?: string | string[]
}, { }>{
    render(): React.ReactNode {
      if(!this.props.children && !this.props.options) return <></>
      return (
        <datalist id={this.props.id}>
          {this.props.children}
          {this.props.options && typeof this.props.options == "string" && this.props.options.split(",").map((item) => <option value={item}></option>)}
          {this.props.options && typeof this.props.options == "object" && this.props.options.map((item) => <option value={item}></option>)}
        </datalist>
      );
    }
  }