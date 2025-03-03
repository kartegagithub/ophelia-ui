import { StaticImport } from "next/dist/shared/lib/get-img-props";
import NextImage from "next/image";
import React, { ImgHTMLAttributes } from "react";

const Image: React.FC<
  ImgHTMLAttributes<HTMLImageElement> & {
    id?: string;
    src?: string | StaticImport;
    alt?: string;
    width?: number | undefined;
    height?: number | undefined;
    size?: number;
    unoptimized?: boolean;
    defaultImage?: string;
  }
> = ({
  id,
  src,
  alt = "",
  size = 0,
  defaultImage = "/assets/default-image.png",
  ...props
}) => {
  if (size > 0) {
    props.width = size;
    props.height = size;
  }

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;

    // Eğer src boşsa veya "default" içermiyorsa ve fallback resmi varsa
    if (defaultImage && (!target.src.includes(defaultImage) || !target.src)) {
      target.src = defaultImage;
    }
  };

  return (
    <NextImage
      {...(id && { id })}
      src={src || defaultImage}
      alt={alt || "Image"}
      onError={handleError}
      loading={props?.loading ?? ("priority" in props ? undefined : "lazy")}
      {...props}
    />
  );
};

export default Image;
