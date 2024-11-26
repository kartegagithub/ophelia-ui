import React from "react";
export default class Label<P> extends React.Component<
  P & {
    id?: string;
    name?: string;
    className?: string;
    value?: string;
    for?: string;
    children?: React.ReactNode;
  },
  {}
> {
  render(): React.ReactNode {
    const { value, children, className, id, ...pureProps } = this.props;
    return (
      <label className={`oph-label ${className}`} id={id} {...pureProps}>
        {this.props.value}
        {this.props.children}
      </label>
    );
  }
}
