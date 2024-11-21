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
  type = "info",
  theme = undefined,
  image = undefined,
}) => {
  const Theme = getAppTheme({ Alert: theme }).Alert;

  if (!image) {
    if (type == "success") image = Theme?.SuccessImage;
    if (type == "error") image = Theme?.ErrorImage;
    if (type == "warning") image = Theme?.WarningImage;
    if (type == "info") image = Theme?.InfoImage;
  }

  return (
    <>
      {visible && (
        <div id={id} className={`oph-alert ${type}`}>
          {image && (
            <div className="oph-alert-image">{getImageComponent(image)}</div>
          )}
          {text && (
            <div className="oph-alert-text">
              <RawHTML html={text} />
            </div>
          )}
          {children}
        </div>
      )}
    </>
  );
};
export default Alert;

var alertProps: {
  id?: string;
  visible?: boolean;
  children?: React.ReactNode;
  text?: string;
  type?: "error" | "success" | "warning" | "info" | "custom";
  iconProps?: IconProps;
  theme?: AlertTheme;
  image?: string | any | React.JSX.Element;
  style?: any;
  textStyle?: any;
};
export type AlertProps = typeof alertProps;

var alertTheme: {
  InfoImage?: React.JSX.Element | string | undefined | IconProps;
  SuccessImage?: React.JSX.Element | string | undefined | IconProps;
  ErrorImage?: React.JSX.Element | string | undefined | IconProps;
  WarningImage?: React.JSX.Element | string | undefined | IconProps;
};

export type AlertTheme = typeof alertTheme;
