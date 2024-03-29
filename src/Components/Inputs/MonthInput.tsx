import { getAppTheme } from "../../AppTheme";
import React, { InputHTMLAttributes } from "react";

export default class MonthInput<P> extends React.Component<P & InputHTMLAttributes<HTMLInputElement>, {}>{
    render(): React.ReactNode {
      return (
        <input
          type="month"
          className={this.props.className ?? getAppTheme().Inputs?.month}
          {...this.props}
        />
      );
    }
  }