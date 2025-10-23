import React, { ButtonHTMLAttributes } from "react";
import RawHTML from "../RawHTML";
import { getObjectValue } from "../../Extensions/ReflectionExtensions";
import { trimSpaces } from "../../Extensions/StringExtensions";
import { IconProps, getImageComponent } from "..";

const Button: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    id?: string;
    priority?: string;
    size?: string;
    background?: string;
    text?: string;
    inlineStyle?: string;
    leftIcon?: React.JSX.Element | string | undefined | IconProps;
    rightIcon?: React.JSX.Element | string | undefined | IconProps;
  }
> = ({
  id,
  text = undefined,
  leftIcon = undefined,
  rightIcon = undefined,
  background = "red",
  size = "medium",
  priority = "primary",
  className = undefined,
  inlineStyle = "",
  value = undefined,
  ...props
}) => {
  if (!className) {
    className = trimSpaces(
      `${getObjectValue(`${priority}`, priority, "")} ${getObjectValue(`${background}`, background, "")} ${getObjectValue(`${size}`, size, "")}`
    );
    if (!className) className = "oph-button-primary";
  }
  return (
    <button
      id={id}
      className={`group oph-button ${className} ${inlineStyle}`}
      {...props}
    >
      {leftIcon && getImageComponent(leftIcon)}
      <RawHTML html={text ?? value} className="oph-button-raw" />
      {rightIcon && getImageComponent(rightIcon)}
    </button>
  );
};
export default Button;
