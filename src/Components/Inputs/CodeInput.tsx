import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "../../Enums/additionalHtmlAttributes";
import DataList from "./DataList";
import { getAppTheme } from "../../AppTheme";
import { getImageComponent } from "../Image";
import { IconProps } from "../Icon";

export interface CodeInputProps
  extends AdditionalHtmlAttributes,
    InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
  inputType?: any;
  codeText?: string;
  rightIcon?: React.JSX.Element | string | undefined | IconProps;
  rightIcon2?: React.JSX.Element | string | undefined | IconProps;
  iconOnClick?: () => void;
  id?: string;
}

const CodeInput: React.FC<CodeInputProps> = ({
  dataOptions,
  list,
  labelType,
  style,
  inputType,
  codeText,
  rightIcon,
  rightIcon2,
  iconOnClick,
  id,
  ...props
}) => {
  return (
    <>
      <DataList options={dataOptions} id={list} />
      <div
        id={id}
        className={`oph-codeInput peer ${props.errorClassName ? "error" : ""} ${labelType && labelType === "floating" ? "floating" : ""}`}
      >
        <div
          className={`oph-codeInput-content ${props.errorClassName ? "error" : ""}`}
        >
          <p className="oph-codeInput-content-text">{codeText}</p>
        </div>

        <input
          type={inputType}
          className="oph-codeInput-input peer"
          {...props}
          style={style}
        />
        {rightIcon && (
          <button type="button" className="oph-codeInput-rightIcon" onClick={iconOnClick}>
            {getImageComponent(rightIcon)}
          </button>
        )}
        {rightIcon2 && (
          <button type="button" className="oph-codeInput-rightIcon2" onClick={iconOnClick}>
            {getImageComponent(rightIcon2)}
          </button>
        )}
      </div>
    </>
  );
};

export default CodeInput;
