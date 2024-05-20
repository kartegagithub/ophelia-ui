import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { default as NextImage } from "next/image";
import React, { ImgHTMLAttributes } from "react";

const Image: React.FC<ImgHTMLAttributes<HTMLImageElement> & {
  src?: string | StaticImport
  alt?: string,
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
  size?: number,
  unoptimized?: boolean
}> = ({
  src,
  alt,
  width = 0,
  size = 0,
  height = 0,
  unoptimized = true,
  ...props
}) => {
  if(size > 0) width = size, height = size;
  return <NextImage src={src ?? ""} width={width} height={height} unoptimized={unoptimized} alt={alt ?? ""} {...props} />;
};
export default Image;