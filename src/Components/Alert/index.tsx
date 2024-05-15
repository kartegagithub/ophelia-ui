import { getAppTheme } from "../../AppTheme";
import React from "react";
import { getImageComponent } from "../Image/Extensions";
import { IconProps } from "../Icon";
import RawHTML from "../RawHTML";
const Alert: React.FC<AlertProps> = ({
  id = undefined,
  visible = true,
  children = undefined,
  text = undefined,
  iconProps = undefined,
  type = "info",
  theme = undefined,
  image = undefined, 

}) => {
  const Theme = getAppTheme({Alert: theme}).Alert;
  const className = (Theme?.Types as any)[type] ?? Theme?.Class

  if(!image){
    if(type == "success") image = Theme?.SuccessImage
    if(type == "error") image = Theme?.ErrorImage
    if(type == "warning") image = Theme?.WarningImage
    if(type == "info") image = Theme?.InfoImage
  }

  return (
    <>
      {visible && <div id={id} className={className}>
        {image && <div className={Theme?.ImageClass}>
          {getImageComponent(image)}
        </div>}
        {text && <div className={Theme?.TextClass}>
          <RawHTML html={text} />
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
  image?: string | any | React.JSX.Element,
}
export type AlertProps = typeof alertProps

var alertTheme: {
  Class?: string,
  TextClass?: string,
  Types?: { info?: string, warning?: string, error?: string, success?: string}
  ImageClass?: string,
  InfoImage?: React.JSX.Element | string | undefined | IconProps,
  SuccessImage?: React.JSX.Element | string | undefined | IconProps,
  ErrorImage?: React.JSX.Element | string | undefined | IconProps,
  WarningImage?: React.JSX.Element | string | undefined | IconProps
}

export type AlertTheme = typeof alertTheme