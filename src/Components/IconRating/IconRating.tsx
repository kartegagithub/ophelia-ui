import { getAppTheme } from "../../AppTheme";
import React, { useState } from "react";
import { getImageComponent } from "../Image/Extensions";
import { loopInRange } from "../../Extensions/ArrayExtensions";
import { formatString } from "../../Extensions/StringExtensions";
import { IconProps } from "../Icon/Icon";
const IconRating: React.FC<{ text?: string, count?: number, value?: number, visible?: boolean, className?: string, textClassName?: string, image?: string | React.JSX.Element, filledImage?: string | React.JSX.Element, onClick?: ((index: number) => void) }> = ({ text = undefined, className = undefined, image = undefined, visible = true, count = 5, value = 0, filledImage = undefined, textClassName = undefined, onClick = undefined}) => {  
  const [hoverIndex, setHoverIndex] = useState(-1)

  if(!visible) return <></>
  
  const theme = getAppTheme();
  return (
    <div role="status" className={className ?? theme.IconRating?.Class} onMouseOut={() => setHoverIndex(-1)}>
      {loopInRange(1, count, (i) => 
        {
          return <div onMouseOver={() => setHoverIndex(i)} onClick={() => onClick && onClick(i)}>
            {(i <= (hoverIndex > -1? hoverIndex: value)) && getImageComponent(image ?? theme.IconRating?.FilledIcon)}
            {(i > (hoverIndex > -1? hoverIndex: value)) && getImageComponent(filledImage ?? theme.IconRating?.Icon)}
          </div>
        }
      )}
      {text && <p className={textClassName ?? theme.IconRating?.TextClass}>{formatString(text, value, count)}</p>}
    </div>
  );
}
export default IconRating;

var iconRatingTheme: {
  Class?: string,
  TextClass?: string,
  Icon?: React.JSX.Element | string | undefined | IconProps,
  FilledIcon?: React.JSX.Element | string | undefined | IconProps,
}
export type IconRatingTheme = typeof iconRatingTheme