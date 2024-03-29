import { getAppTheme } from "../../AppTheme";
import React from "react";
import { getImageComponent } from "../Image/Extensions";
import { IconProps } from "../Icon";
const Spinner: React.FC<SpinnerProps> = ({ 
  text = undefined, 
  theme = undefined, 
  image = undefined, 
  visible = true
}) => {  
  if(!visible) return <></>
  
  const Theme = getAppTheme({Spinner: theme}).Spinner;

  if(!image) image = Theme?.Image
  return (
    <div role="status" className={Theme?.Class}>
      {image && getImageComponent(image)}
      {text && <span className={theme?.TextClass}>{text}</span>}
    </div>
  );
}
export default Spinner;

var spinnerProps: { 
  text?: string, 
  visible?: boolean, 
  theme?: SpinnerTheme 
  image?: string | any | React.JSX.Element 
}
export type SpinnerProps = typeof spinnerProps

var spinnerTheme: {
  Class?: string,
  TextClass?: string,
  Image?: React.JSX.Element | string | undefined | IconProps,
}
export type SpinnerTheme = typeof spinnerTheme