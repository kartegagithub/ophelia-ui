import React from "react";
import { getImageComponent } from "../Image/Extensions";
import { IconProps } from "../Icon";
const Spinner: React.FC<SpinnerProps> = ({
  id,
  text = undefined,
  image = undefined,
  className = undefined,
  visible = true,
}) => {
  if (!visible) return <></>;

  if (!image)
    image = {
      name: "spinner",
      size: 18,
      className: "oph-spinner-image",
    };
  return (
    <div role="status" className={`oph-spinner ${className}`} id={id}>
      {image && getImageComponent(image)}
      {text && <span className="oph-spinner-text">{text}</span>}
    </div>
  );
};
export default Spinner;

var spinnerProps: {
  id?: string;
  text?: string;
  visible?: boolean;
  className?: string;
  image?: string | any | React.JSX.Element;
};
export type SpinnerProps = typeof spinnerProps;

var spinnerTheme: {
  Image?: React.JSX.Element | string | undefined | IconProps;
};
export type SpinnerTheme = typeof spinnerTheme;
