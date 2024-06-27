import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { default as NextImage } from "next/image";
import React, { ImgHTMLAttributes } from "react";

const Image: React.FC<
  ImgHTMLAttributes<HTMLImageElement> & {
    src?: string | StaticImport;
    alt?: string;
    width?: number | undefined;
    height?: number | undefined;
    size?: number;
    unoptimized?: boolean;
  }
> = ({ src, alt, size = 0, ...props }) => {
  
  if (size > 0) (props.width = size), (props.height = size);
  return <NextImage src={src ?? ""} alt={alt ?? ""} {...props} />;
};
export default Image;
