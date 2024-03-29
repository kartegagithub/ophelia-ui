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
}

export type IconProps = typeof iconProps
const Icon: React.FC<IconProps> = ({
    name,
    color = "#fff",
    fill = undefined,
    size = 24,
    className,
    ext1,
    ext2, 
    ext3
  }) => {
    return getImageComponent(name, { color, fill, size, className, ext1, ext2, ext3});
  };
  
  export default Icon;