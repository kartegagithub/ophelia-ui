import { getAppTheme } from "../../AppTheme";
import React, { AnchorHTMLAttributes } from "react";
import RawHTML from "../RawHTML";
import { getObjectValue } from "../../Extensions/ReflectionExtensions";
import { trimSpaces } from "../../Extensions/StringExtensions";
import { IconProps, getImageComponent } from "..";

const Navigation: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: string
  text?: string,
  direction?: string,
  leftIcon?: React.JSX.Element | string | undefined | IconProps,
  rightIcon?: React.JSX.Element | string | undefined | IconProps,
  disable?: string,
}> = ({ 
  text = undefined, 
  direction = undefined,
  leftIcon = undefined,
  rightIcon = undefined, 
  size = undefined, 
  disable= undefined,
  ...otherProps
}) => {  
  const Theme = getAppTheme();
  var className: string | undefined = className ?? undefined; 
  if(!className){
    className = trimSpaces(`${getObjectValue(Theme.Navigation?.Size, size, "")} ${getObjectValue(Theme.Navigation?.Direction, direction, "")}`)
    if(!className) className = Theme.Navigation?.Size?.small;
  }
  return (
    <button
      className={`group inline-flex items-center gap-1.5 ${className}`}
    {...otherProps}
    >
      {leftIcon && getImageComponent(leftIcon)}
      <RawHTML html={text} />
      {rightIcon && getImageComponent(rightIcon)}
    </button>
  );
}
export default Navigation;