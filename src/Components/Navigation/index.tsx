import React from "react";
import RawHTML from "../RawHTML";
import { IconProps, getImageComponent } from "..";

const Navigation: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: string;
    text?: string;
    direction?: string;
    leftIcon?: React.JSX.Element | string | undefined | IconProps;
    rightIcon?: React.JSX.Element | string | undefined | IconProps;
    disable?: string;
    id: string;
  }
> = ({
  text = undefined,
  direction = undefined,
  leftIcon = undefined,
  rightIcon = undefined,
  size = undefined,
  disable = undefined,
  children,
  id,
  ...otherProps
}) => {
  return (
    <button id={id} className="oph-navigation" {...otherProps}>
      {leftIcon && getImageComponent(leftIcon)}
      {text ? <RawHTML html={text} className="oph-navigation-raw" /> : children}
      {rightIcon && getImageComponent(rightIcon)}
    </button>
  );
};
export default Navigation;
