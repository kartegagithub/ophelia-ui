import React, { InputHTMLAttributes } from "react";
import DataList from "./DataList";
import { getAppTheme } from "../../AppTheme";
import { AdditionalHtmlAttributes } from "ophelia-core";
import { IconProps } from "../Icon";
import { maskHandler } from "ophelia-core";
import { getImageComponent } from "../Image";

export interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  list?: string;
  labelType?: any;
  id?: string;
  rightIcon?: React.JSX.Element | string | undefined | IconProps;
  rightIcon2?: React.JSX.Element | string | undefined | IconProps;
  iconOnClick?: () => void;
}

const EmailInput: React.FC<EmailInputProps & AdditionalHtmlAttributes> = ({
  errorClassName,
  dataOptions, 
  mask,
  maskRule,
  list,
  labelType,
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
        type="email"
         onInput={(e) => maskHandler(mask, e, props.onChange, maskRule)}
          className={`oph-emailInput peer ${errorClassName ? "error" : ""} ${
            labelType && labelType === "floating" ? "floating" : ""
          } ${className}`}
          {...props}
          style={style}
          onChange={props.onChange}
          value={value}
      />
      {rightIcon && (
        <button
          type="button"
          className="oph-textInputRightIcon"
          onClick={iconOnClick}
        >
          {getImageComponent(rightIcon)}
        </button>
      )}
      {rightIcon2 && (
        <button
          type="button"
          className="oph-textInputRightIcon2"
          onClick={iconOnClick}
        >
          {getImageComponent(rightIcon2)}
        </button>
      )}
    </>
  );
};

export default EmailInput;
