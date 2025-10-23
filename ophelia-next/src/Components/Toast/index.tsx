import { getAppTheme } from "../../AppTheme";
import React, { useState } from "react";
import { getImageComponent } from "../Image/Extensions";
import { IconProps } from "../Icon";
const Toast: React.FC<ToastProps> = ({
  text = undefined,
  id,
  image = undefined,
  visible = false,
  showCloseButton = true,
  type = "info",
  theme = undefined,
}) => {
  const [open, setOpen] = useState(visible);
  const Theme = getAppTheme({ Toast: theme }).Toast;
  if (!visible || !open) return <></>;
  if (!image) {
    if (type == "success") image = Theme?.SuccessImage;
    if (type == "error") image = Theme?.ErrorImage;
    if (type == "warning") image = Theme?.WarningImage;
    if (type == "info") image = Theme?.InfoImage;
  }
  return (
    <div id={id} className={`oph-toast ${type}`} role="alert">
      {image && (
        <div className="oph-toast-image">{getImageComponent(image)}</div>
      )}
      <div className={"oph-toast-text"}>{text}</div>
      {showCloseButton && (
        <button
          onClick={() => setOpen(!open)}
          type="button"
          className={"oph-toast-close"}
          data-dismiss-target={"#" + id}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
export default Toast;

var toastProps: {
  id?: string;
  text?: string;
  visible?: boolean;
  showCloseButton?: boolean;
  type?: "error" | "success" | "warning" | "info" | "custom";
  image?: string | any | React.JSX.Element;
  theme?: ToastTheme;
};
export type ToastProps = typeof toastProps;

var toastTheme: {
  InfoImage?: React.JSX.Element | string | undefined | IconProps;
  SuccessImage?: React.JSX.Element | string | undefined | IconProps;
  ErrorImage?: React.JSX.Element | string | undefined | IconProps;
  WarningImage?: React.JSX.Element | string | undefined | IconProps;
};
export type ToastTheme = typeof toastTheme;
