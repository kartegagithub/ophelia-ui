import { AppTheme, getAppTheme } from "../../AppTheme";
import React, { ButtonHTMLAttributes } from "react";
import RawHTML from "../RawHTML";
import { getObjectValue } from "../../Extensions/ReflectionExtensions";
import { trimSpaces } from "../../Extensions/StringExtensions";
import { IconProps, getImageComponent } from "..";

const Button: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    priority?: string;
    size?: string;
    background?: string;
    text?: string;
    extraClass?: string;
    spanClass?: string;
    leftIcon?: React.JSX.Element | string | undefined | IconProps;
    rightIcon?: React.JSX.Element | string | undefined | IconProps;
  }
> = ({
  text = undefined,
  leftIcon = undefined,
  rightIcon = undefined,
  background = "red",
  size = "medium",
  priority = "primary",
  className = "" || undefined,
  extraClass = "" || undefined, //className bozulmasın ama extrada ekleme yapayım propsu.
  spanClass = "" || undefined,  //buton içindeki RawHTML e müdahale etmek için
  value = undefined,
  ...props
}) => {
  const Theme = getAppTheme();
  if (!className) {
    className = trimSpaces(
      `${getObjectValue(Theme.Buttons?.Priority, priority, "")} ${getObjectValue(Theme.Buttons?.Background, background, "")} ${getObjectValue(Theme.Buttons?.Size, size, "")}`
    );
    if (!className) className = Theme.Buttons?.Priority?.primary;
  }
  return (
    <button
      className={`${extraClass} group flex items-center justify-center w-full gap-2 font-medium ${className}`}
      {...props}
    >
      {leftIcon && getImageComponent(leftIcon)}
      <RawHTML html={text ?? value} className={spanClass} />
      {rightIcon && getImageComponent(rightIcon)}
    </button>
  );
};
export default Button;
