import { getAppTheme } from "../../AppTheme";
import React, { InputHTMLAttributes } from "react";

export default class WeekInput<P> extends React.Component<P & InputHTMLAttributes<HTMLInputElement>, {}>{
    render(): React.ReactNode {
      return (
        <input
          type="week"
          className={this.props.className ?? getAppTheme().Inputs?.week}
          {...this.props}
        />
      );
    }
  }