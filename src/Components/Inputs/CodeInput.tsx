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
  iconWrapperStyle?: string;
  icon2WrapperStyle?: string;
  iconOnClick?: () => void;
}

const CodeInput: React.FC<CodeInputProps> = ({
  className,
  dataOptions,
  list,
  labelType,
  style,
  inputType,
  codeText,
  rightIcon,
  rightIcon2,
  iconWrapperStyle,
  icon2WrapperStyle,
  iconOnClick,
  ...props
}) => {
  const appTheme = getAppTheme();
  return (
    <>
      <DataList options={dataOptions} id={list} />
      <div
        className={`${props.errorClassName} ${className ?? appTheme?.Inputs?.withCode} ${labelType && labelType === "floating" ? "placeholder-transparent" : ""}`}
      >
        <div
          className={`flex items-center pl-5 h-10 md:h-12 w-20 bg-sky bg-opacity-30 border-r ${props.errorClassName ? "border-azRed" : "border-pastelBlue"}`}
        >
          <p className="text-sm/4 text-azBlue font-medium my-auto">{codeText}</p>
        </div>

        <input
          type={inputType}
          className="pl-4 appearance-none focus:none block w-full peer focus:outline-none focus:ring-0"
          {...props}
          style={style}
        />
          {rightIcon && <button className={iconWrapperStyle} onClick={iconOnClick}>{getImageComponent(rightIcon)}</button> }
      {rightIcon2 && <button className={icon2WrapperStyle} onClick={iconOnClick}>{getImageComponent(rightIcon2)}</button> }
      </div>
    </>
  );
};

export default CodeInput;
