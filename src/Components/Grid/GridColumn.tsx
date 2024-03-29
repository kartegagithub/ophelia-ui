import { getAppTheme } from "../../AppTheme";
import React from "react";
export default class GridColumn<P> extends React.Component<P & React.HTMLAttributes<HTMLDivElement>, {}>{
    render(): React.ReactNode {
      const theme = getAppTheme();
      const { children, className, ...others} = this.props
      return (
        <div className={className ?? theme.Grid?.ColumnClass} {...others}>{children}</div>
      );
    }
  }