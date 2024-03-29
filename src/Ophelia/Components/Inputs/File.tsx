import { getAppTheme } from "../../AppTheme";
import React, { InputHTMLAttributes } from "react";

export default class File<P> extends React.Component<P & InputHTMLAttributes<HTMLInputElement>, {}>{
    render(): React.ReactNode {
      return (
        <input type="file"
          className={this.props.className ?? getAppTheme().Inputs?.file}
          {...this.props}
        />
      );
    }
  }