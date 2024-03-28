import { getAppTheme } from "../../AppTheme";
import React, { InputHTMLAttributes } from "react";

export default class Password<P> extends React.Component<P & InputHTMLAttributes<HTMLInputElement>, {}>{
    render(): React.ReactNode {
      return (
        <input
          type="password"
          className={this.props.className ?? getAppTheme().Inputs?.password}
          {...this.props}
        />
      );
    }
  }