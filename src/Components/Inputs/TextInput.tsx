import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "../../Enums/additionalHtmlAttributes";
import DataList from "./DataList";
import { getAppTheme } from "../../AppTheme";
import { maskHandler } from "../../Extensions";
import Icon, { IconProps } from "../Icon";
import { getImageComponent } from "../Image";

export interface TextInputProps
  extends AdditionalHtmlAttributes,
    InputHTMLAttributes<HTMLInputElement> {
  labelType?: any; // Örnek olarak any kullanıldı, gerçek türüne göre değiştirilebilir
  list?: string;
  isDate?: boolean;
  rightIcon?: React.JSX.Element | string | undefined | IconProps;
  rightIcon2?: React.JSX.Element | string | undefined | IconProps;
  iconWrapperStyle?: string;
  icon2WrapperStyle?: string;
  iconOnClick?: () => void;
  value?: any;
}

const TextInput: React.FC<TextInputProps> = ({
  dataOptions,
  mask,
  maskRule,
  list,
  className,
  labelType,
  isDate,
  style,
  rightIcon,
  rightIcon2,
  iconWrapperStyle,
  icon2WrapperStyle,
  iconOnClick,
  value,
  ...props
}) => {
  const appTheme = getAppTheme();
  //console.log("value", value);

  return (
    <>
      <DataList options={dataOptions} id={list} />
      <input
        type="text"
        onKeyDown={(e) => maskHandler(mask, e, props.onChange, maskRule)}
        className={`${appTheme?.Inputs?.text} ${
          props.errorClassName
        } ${className} ${labelType && labelType === "floating" ? "" : ""}`}
        {...props}
        style={style}
        onChange={props.onChange}
        value={value}
      />
      {rightIcon && (
        <button className={iconWrapperStyle} onClick={iconOnClick}>
          {getImageComponent(rightIcon)}
        </button>
      )}
      {rightIcon2 && (
        <button className={icon2WrapperStyle} onClick={iconOnClick}>
          {getImageComponent(rightIcon2)}
        </button>
      )}
    </>
  );
};

export default TextInput;
