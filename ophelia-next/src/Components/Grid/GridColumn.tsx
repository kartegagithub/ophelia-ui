import { getAppTheme } from "../../AppTheme";
import React from "react";
export default class GridColumn<P> extends React.Component<
  P & React.HTMLAttributes<HTMLDivElement>,
  {}
> {
  render(): React.ReactNode {
    const theme = getAppTheme();
    const { children, className, id, ...others } = this.props;
    return (
      <div id={id} className={`grid-column ${className ?? ""}`} {...others}>
        {children}
      </div>
    );
  }
}
