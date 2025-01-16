import React, { InputHTMLAttributes } from "react";
import { AdditionalHtmlAttributes } from "../../Enums/additionalHtmlAttributes";
import DataList from "./DataList";
import { maskHandler } from "../../Extensions";
import { IconProps } from "../Icon";
import { getImageComponent } from "../Image";

export interface TextInputProps
  extends AdditionalHtmlAttributes,
    InputHTMLAttributes<HTMLInputElement> {
  labelType?: any; // Örnek olarak any kullanıldı, gerçek türüne göre değiştirilebilir
  list?: string;
  isDate?: boolean;
  rightIcon?: React.JSX.Element | string | undefined | IconProps;
  rightIcon2?: React.JSX.Element | string | undefined | IconProps;
  iconOnClick?: () => void;
  value?: any;
}

const TextInput: React.FC<TextInputProps> = ({
  dataOptions,
  mask,
  maskRule,
  list,
  labelType,
  isDate,
  style,
  rightIcon,
  rightIcon2,
  iconOnClick,
  value,
  className,
  ...props
}) => {
  return (
    <>
      <DataList options={dataOptions} id={list} />
      <input
        type="text"
        onKeyDown={(e) => maskHandler(mask, e, props.onChange, maskRule)}
        className={`oph-textInput peer ${props.errorClassName ? "error" : ""} ${labelType && labelType === "floating" ? "floating" : ""} ${className}`}
        {...props}
        style={style}
        onChange={props.onChange}
        value={value}
      />
      {rightIcon && (
        <button type="button" className="oph-textInputRightIcon" onClick={iconOnClick}>
          {getImageComponent(rightIcon)}
        </button>
      )}
      {rightIcon2 && (
        <button type="button" className="oph-textInputRightIcon2" onClick={iconOnClick}>
          {getImageComponent(rightIcon2)}
        </button>
      )}
    </>
  );
};

export default TextInput;
