import React, { useState } from "react";
import { getImageComponent } from "../Image/Extensions";
import { loopInRange } from "ophelia-core";
import { formatString } from "ophelia-core";
import { IconProps } from "../Icon";
const IconRating: React.FC<{
  id?: string;
  text?: string;
  count?: number;
  value?: number;
  visible?: boolean;
  className?: string;
  textClassName?: string;
  image?: string | React.JSX.Element;
  filledImage?: string | React.JSX.Element;
  onClick?: (index: number) => void;
}> = ({
  text = undefined,
  className = undefined,
  image = undefined,
  visible = true,
  count = 5,
  value = 0,
  filledImage = undefined,
  textClassName = undefined,
  onClick = undefined,
  id,
}) => {
  const [hoverIndex, setHoverIndex] = useState(-1);

  if (!visible) return <></>;

  return (
    <div
      id={id}
      role="status"
      className={`oph-iconRating ${className}`}
      onMouseOut={() => setHoverIndex(-1)}
    >
      {loopInRange(1, count, (i) => {
        return (
          <div
            onMouseOver={() => setHoverIndex(i)}
            onClick={() => onClick && onClick(i)}
          >
            {i <= (hoverIndex > -1 ? hoverIndex : value) &&
              getImageComponent(
                image ?? {
                  name: "star",
                  className: "oph-iconRating-filledIcon",
                  size: 12,
                }
              )}
            {i > (hoverIndex > -1 ? hoverIndex : value) &&
              getImageComponent(
                filledImage ?? {
                  name: "star",
                  className: "oph-iconRating-icon",
                  size: 12,
                }
              )}
          </div>
        );
      })}
      {text && (
        <p className={textClassName ?? "oph-iconRating-text"}>
          {formatString(text, value.toString(), count.toString())}
        </p>
      )}
    </div>
  );
};
export default IconRating;

var iconRatingTheme: {
  Icon?: React.JSX.Element | string | undefined | IconProps;
  FilledIcon?: React.JSX.Element | string | undefined | IconProps;
};
export type IconRatingTheme = typeof iconRatingTheme;
