import React from "react";
import { getImageComponent } from "../Image/Extensions";

var iconProps: {
  name: string;
  color?: string;
  fill?: string;
  size?: number;
  className?: string;
  ext1?: string;
  ext2?: string;
  ext3?: string;
  unoptimized?: boolean,
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
}

export type IconProps = typeof iconProps
const Icon: React.FC<IconProps & any> = ({
    name,
    color = "#fff",
    fill = undefined,
    size = undefined,
    className,
    ext1,
    ext2, 
    ext3,
    unoptimized,
    width,
    height,
    ...props
  }) => {
    return getImageComponent(name, {...{ color, fill, size, className, ext1, ext2, ext3, unoptimized, width, height},...props});
  };
  
  export default Icon;