import { getAppTheme } from "../../AppTheme";
import React, { AnchorHTMLAttributes } from "react";
import RawHTML from "../RawHTML";
import { getObjectValue } from "../../Extensions/ReflectionExtensions";
import { trimSpaces } from "../../Extensions/StringExtensions";
import { IconProps, getImageComponent } from "..";

const Navigation: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: string;
    text?: string;
    direction?: string;
    leftIcon?: React.JSX.Element | string | undefined | IconProps;
    rightIcon?: React.JSX.Element | string | undefined | IconProps;
    rawClass?: string;
    disable?: string;
  }
> = ({
  text = undefined,
  direction = undefined,
  leftIcon = undefined,
  rightIcon = undefined,
  size = undefined,
  disable = undefined,
  className,
  rawClass,
  children,
  ...otherProps
}) => {
  const Theme = getAppTheme();

  className =
    className ??
    (trimSpaces(
      `${getObjectValue(Theme.Navigation?.Size, size, "")} ${getObjectValue(
        Theme.Navigation?.Direction,
        direction,
        ""
      )}`
    ) ||
      Theme.Navigation?.Size?.small ||
      "");

  return (
    <button
      className={`group inline-flex items-center gap-1.5 transition delay-100 ${className}`} // Burada className her zaman string olur
      {...otherProps}
    >
      {leftIcon && getImageComponent(leftIcon)}
      {text ? <RawHTML html={text} className={rawClass} /> : children}
      {rightIcon && getImageComponent(rightIcon)}
    </button>
  );
};
export default Navigation;
