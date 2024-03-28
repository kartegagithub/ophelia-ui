import { getAppTheme } from "../../AppTheme";
import React, { InputHTMLAttributes } from "react";

export default class Range<P> extends React.Component<P & InputHTMLAttributes<HTMLInputElement>, {}>{
    render(): React.ReactNode {
      return (
        <input
          type="range"
          className={this.props.className ?? getAppTheme().Inputs?.range}
          {...this.props}
        />
      );
    }
  }