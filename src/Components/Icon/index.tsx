import React from "react";
import { getImageComponent } from "../Image/Extensions";

var iconProps: {
  name: string;
  id?: string;
  color?: string;
  fill?: string;
  size?: number;
  className?: string;
  ext1?: string;
  ext2?: string;
  ext3?: string;
  unoptimized?: boolean;
  width?: number | string | undefined;
  height?: number | string | undefined;
};

export type IconProps = typeof iconProps;
const Icon: React.FC<IconProps & any> = ({
  id,
  name,
  color = "#fff",
  fill = undefined,
  size = undefined,
  className = "oph-icon",
  ext1,
  ext2,
  ext3,
  unoptimized,
  width,
  height,
  ...props
}) => {
  return getImageComponent(name, {
    ...{
      id,
      color,
      fill,
      size,
      className,
      ext1,
      ext2,
      ext3,
      unoptimized,
      width,
      height,
    },
    ...props,
  });
};

export default Icon;
