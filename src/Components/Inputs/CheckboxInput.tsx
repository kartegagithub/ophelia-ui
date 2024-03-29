import { getAppTheme } from "../../AppTheme";
import React, { InputHTMLAttributes } from "react";

export default class CheckboxInput<P> extends React.Component<P & InputHTMLAttributes<HTMLInputElement>, {}>{
  render(): React.ReactNode {
    return (
      <input
        type="checkbox"
        className={this.props.className ?? getAppTheme().Inputs?.checkbox}
        {...this.props}
      />
    );
  }
}