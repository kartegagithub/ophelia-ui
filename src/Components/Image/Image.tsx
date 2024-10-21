import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { default as NextImage } from "next/image";
import React, { ImgHTMLAttributes, useMemo } from "react";

const Image: React.FC<
  ImgHTMLAttributes<HTMLImageElement> & {
    src?: string | StaticImport;
    alt?: string;
    width?: number | undefined;
    height?: number | undefined;
    size?: number;
    unoptimized?: boolean;
    defaultImage?: string
  }
> = ({ src, alt, size = 0, defaultImage = "/assets/default-image.png", ...props }) => {
  if (size > 0) (props.width = size), (props.height = size);
  const image = useMemo(() => {
    return (
      <NextImage
        src={src ?? ""}
        alt={alt ?? ""}
        {...props}
        onError={(e: any) => {
          var src = (e.target as HTMLImageElement).src;
          if(!src || src.indexOf("default") == -1 && defaultImage){
            (e.target as HTMLImageElement).src = defaultImage;
          }
        }}
      />
    );
  }, [src]);
  return image;
};
export default Image;
