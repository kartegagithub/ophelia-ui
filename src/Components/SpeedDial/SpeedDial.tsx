import { getAppTheme } from "../../AppTheme";
import { checkMouseInBoundByRef } from "../../Extensions/ComponentExtensions";
import React, { useState } from "react";
import { getImageComponent } from "../Image/Extensions";
import { IconProps } from "../Icon/Icon";
import Router from "next/router";

var SpeedDialButton : {
  ID: string,
  Tooltip?: boolean,
  TooltipText?: string,
  ClassName?: string,
  Location?: string,
  OnClick?: ((e: any) => void)
  TooltipPosition?: string,
  Icon?: string | React.JSX.Element | IconProps
}
export type SpeedDialButton = typeof SpeedDialButton

const SpeedDial: React.FC<SpeedDialProps> = ({ 
  open = false, 
  id = "speed-dial-menu-default", 
  image = undefined, 
  children = undefined, 
  buttons = undefined,
  theme = undefined 
}) => { 
  const [opened, setOpened] = useState(open) 
  const boxRef1 = React.createRef<HTMLDivElement>()
  const Theme = getAppTheme({SpeedDial: theme}).SpeedDial;
  const menuID = id + "-menu";
  const onButtonClick = (e: any, button: SpeedDialButton) => {
    if(button.OnClick) button.OnClick(e)
    else if(button.Location) Router.push(button.Location)
    setOpened(false)
  }
  if(!image) image = Theme?.Image
  return (
    <div id={id} className={Theme?.Class} onMouseOut={(e) => checkMouseInBoundByRef(e, boxRef1, (result) => setOpened(result))} ref={boxRef1}>
      <div id={menuID} className={Theme?.MenuClass + " " + (opened? "": "hidden")}>
        { buttons && buttons.map((button) => 
          {return <>
            <button
              type="button"
              data-tooltip-target={button.ID}
              data-tooltip-placement={button.TooltipPosition}
              className={button.ClassName ?? Theme?.DialButtonClass}
              onClick={(e)=> onButtonClick(e, button)}>
              {button.Icon && getImageComponent(button.Icon)}
              {button.Tooltip === true && button.TooltipText && <span className="sr-only">{button.TooltipText}</span>}
            </button>
            {button.Tooltip === true && button.TooltipText && <div
              id={button.ID}
              role="tooltip"
              className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
              {button.TooltipText}
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>}
          </>
          }
        )}        
        {children}
      </div>
      <button
        type="button"
        data-dial-toggle={menuID}
        aria-controls={menuID}
        aria-expanded="false"
        className={Theme?.MainButtonClass}
        onMouseOver={() => setOpened(true)}
      >
        {image && getImageComponent(image)}
      </button>
    </div>
  );
}
export default SpeedDial;

var speedDialProps: { 
  id?: string, 
  open?: boolean, 
  image?: string | IconProps | React.JSX.Element, 
  buttons?: Array<SpeedDialButton>, 
  children?: React.ReactNode; 
  theme?: SpeedDialTheme
}
export type SpeedDialProps = typeof speedDialProps

var speedDialTheme: {
  Class?: string,
  MenuClass?: string,
  MainButtonClass?: string,
  DialButtonClass?: string,
  Image?: React.JSX.Element | string | undefined | IconProps,
}
export type SpeedDialTheme = typeof speedDialTheme