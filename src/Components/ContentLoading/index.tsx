import AppClient from "../../AppClient";
import { getImageComponent } from "../Image";
import React from "react";
import Spinner from "../../Components/Spinner";
const ContentLoading: React.FC<ContentLoadingProps> = ({ 
  text = undefined, 
  image = undefined, 
  loading = false,
  children = undefined,
  showDefaultText = true,
  showDefaultSpinner = true,
  ...props
}) => {  
  //if(loading) console.log("loadin.....")
  return (
    <div className="relative">
      {loading && <div className="absolute w-full h-full align-middle mx-auto text-center z-40 flex flex-col justify-center">
        {image && getImageComponent(image)}
        {!image && showDefaultSpinner && <Spinner theme={{ Class: "text-center flex justify-center mb-10"}}></Spinner>}
        {(text || showDefaultText) && <span>{text ?? props.appClient?.Translate("ProcessingPleaseWait")}</span>}  
      </div>}
      {children && <div className={loading? "opacity-50": "opacity-100"}>
        {children}
      </div>}
    </div>
  );
}
export default ContentLoading;

var contentLoadingProps: { 
  appClient?: AppClient
  text?: string, 
  loading?: boolean, 
  showDefaultText?: boolean
  showDefaultSpinner?: boolean
  image?: string | any | React.JSX.Element,
  children?: React.ReactNode;
}
export type ContentLoadingProps = typeof contentLoadingProps