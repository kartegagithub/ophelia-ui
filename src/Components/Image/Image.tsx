import React, { ImgHTMLAttributes } from "react";
export default class Image<P> extends React.Component<P & ImgHTMLAttributes<HTMLImageElement>, {}>{
    render(): React.ReactNode {
      return (
        <img
          {...this.props}
        />
      );
    }
  }