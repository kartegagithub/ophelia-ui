import { getAppTheme } from "../../AppTheme";
import React, { InputHTMLAttributes } from "react";

export default class Date<P> extends React.Component<P & InputHTMLAttributes<HTMLInputElement>, {}>{
    render(): React.ReactNode {
      return (
        <input
          type="date"
          className={this.props.className ?? getAppTheme().Inputs?.date}
          {...this.props}
        />
      );
    }
  }