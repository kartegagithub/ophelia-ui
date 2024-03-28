import React from "react";
import { getAppTheme } from "../../../Ophelia/AppTheme";

export default class GridRow<P> extends React.Component<P & React.HTMLAttributes<HTMLDivElement>, {}>{
    render(): React.ReactNode {
      const theme = getAppTheme();
      const { children, className, ...others} = this.props
      return (
        <div className={className ?? theme.Grid?.RowClass} {...others}>{children}</div>
      );
    }
  }