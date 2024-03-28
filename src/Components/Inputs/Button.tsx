import { getAppTheme } from "../../AppTheme";
import React, { ButtonHTMLAttributes } from "react";
export default class Button<P> extends React.Component<P & ButtonHTMLAttributes<HTMLButtonElement>, {}>{
    render(): React.ReactNode {
      return (
        <button
          className={this.props.className ?? getAppTheme().Buttons?.default}
          {...this.props}
        >{this.props.children?? this.props.value}</button>
      );
    }
  }