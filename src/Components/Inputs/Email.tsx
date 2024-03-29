import { AdditionalHtmlAttributes } from "../../Enums/additionalHtmlAttributes";
import React, { InputHTMLAttributes } from "react";
import DataList from "./DataList";
import { getAppTheme } from "../../AppTheme";

export default class Email<P> extends React.Component<P & AdditionalHtmlAttributes & InputHTMLAttributes<HTMLInputElement>, {}>{
    render(): React.ReactNode {
      return (
        <>
          <DataList options={this.props.dataOptions} id={this.props.list}/>
          <input
            type="email"
            className={this.props.className ?? getAppTheme().Inputs?.email}
            {...this.props}
          />
        </>
      );
    }
  }