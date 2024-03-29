import { getAppTheme } from "../../AppTheme";
import React, { TextareaHTMLAttributes } from "react";

export default class TextAreaInput<P> extends React.Component<P & TextareaHTMLAttributes<HTMLTextAreaElement>, {}>{
    render(): React.ReactNode {
      return (
        <textarea {...this.props} className={this.props.className ?? getAppTheme().Inputs?.textarea}/>
      );
    }
  }