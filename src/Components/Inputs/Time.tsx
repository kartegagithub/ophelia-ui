import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "../../../Ophelia/Enums/additionalHtmlAttributes";
import DataList from "./DataList";
import { getAppTheme } from "../../AppTheme";

export default class Time<P> extends React.Component<P & AdditionalHtmlAttributes & InputHTMLAttributes<HTMLInputElement>, {}>{
    render(): React.ReactNode {
      return (
        <>
          <DataList options={this.props.dataOptions} id={this.props.list}/>
          <input
            type="time"
            className={this.props.className ?? getAppTheme().Inputs?.time}
            {...this.props}
          />
        </>
      );
    }
  }