import { getAppTheme } from "../../AppTheme";
import React from "react";
import { getImageComponent } from "../Image/Extensions";
import { IconProps } from "../Icon/Icon";
const Alert: React.FC<AlertProps> = ({
  id = undefined,
  visible = true,
  children = undefined,
  text = undefined,
  iconProps = undefined,
  type = "info",
  theme = undefined
}) => {
  const Theme = getAppTheme({Alert: theme}).Alert;
  const className = (Theme?.Types as any)[type] ?? Theme?.Class
  return (
    <>
      {visible && <div id={id} className={className}>
        {getImageComponent(iconProps?.name ?? type, iconProps ?? { size: 18 })}
        {text && <div className={Theme?.TextClass}>
          {text}
        </div>}
        {children}  
      </div>}
    </>
  );
};
export default Alert;

var alertProps: {
  id?: string;
  visible?: boolean;
  children?: React.ReactNode;
  text?: string;
  type?: "error" | "success" | "warning" | "info" | "custom",
  iconProps?: IconProps
  theme?: AlertTheme
}
export type AlertProps = typeof alertProps

var alertTheme: {
  Class?: string,
  TextClass?: string,
  Types?: { info?: string, warning?: string, error?: string, success?: string}
}

export type AlertTheme = typeof alertTheme