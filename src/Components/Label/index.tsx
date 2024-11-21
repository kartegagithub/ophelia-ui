import React from "react";
export default class Label<P> extends React.Component<
  P & {
    id?: string;
    name?: string;
    value?: string;
    for?: string;
    children?: React.ReactNode;
  },
  {}
> {
  render(): React.ReactNode {
    const { value, children, id, ...pureProps } = this.props;
    return (
      <label className="oph-label" id={id} {...pureProps}>
        {this.props.value}
        {this.props.children}
      </label>
    );
  }
}
