import React from "react";
export default class GridRow<P> extends React.Component<
  P & React.HTMLAttributes<HTMLDivElement>,
  {}
> {
  render(): React.ReactNode {
    const { children, className, id, ...others } = this.props;
    return (
      <div id={id} className={`grid-row ${className ?? ""}`} {...others}>
        {children}
      </div>
    );
  }
}
