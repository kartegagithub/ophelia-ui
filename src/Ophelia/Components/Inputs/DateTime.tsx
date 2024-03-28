import { getAppTheme } from "../../AppTheme";
import React, { InputHTMLAttributes } from "react";

export default class DateTime<P> extends React.Component<P & InputHTMLAttributes<HTMLInputElement>, {}>{
    render(): React.ReactNode {
      return (
        <input
          type="datetime-local"
          className={this.props.className ?? getAppTheme().Inputs?.datetime}
          {...this.props}
        />
      );
    }
  }