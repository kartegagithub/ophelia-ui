import React from "react";
export default class Label<P> extends React.Component<P & {
    id?: string;
    name?: string;
    className?: string;
    value?: string
    for?: string
    children?: React.ReactNode
  }, {}>{
    render(): React.ReactNode {
      const {value, children, ...pureProps} = this.props  
      return (
        <label {...pureProps}>
          {this.props.value}
          {this.props.children}
        </label>
      );
    }
  }