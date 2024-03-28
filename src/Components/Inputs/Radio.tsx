import { getAppTheme } from "../../AppTheme";
import React, { InputHTMLAttributes } from "react";

export default class Radio<P> extends React.Component<P & InputHTMLAttributes<HTMLInputElement>, {}>{
    render(): React.ReactNode {
      return (
        <input
          type="radio"
          className={this.props.className ?? getAppTheme().Inputs?.radio}
          {...this.props}
        />
      );
    }
  }