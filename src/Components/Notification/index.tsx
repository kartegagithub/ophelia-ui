import React, { useEffect, useState } from "react";
import { getAppTheme } from "../../AppTheme";
import { getImageComponent } from "../Image/Extensions";
import { IconProps } from "../Icon";
import { listenCustomEvent } from "../../Extensions/DocumentExtension";

const Notification: React.FC<NotificationProps> = ({ 
  type = undefined,
  title = undefined, 
  content = undefined, 
  ContainerClass = undefined, 
  image = undefined, 
  theme = undefined 
}) => {
  const Theme = getAppTheme({Notification: theme}).Notification;
  const [isVisible, setIsVisible] = useState(false);
  const [notifyData, setNotifyData] = useState(undefined);

  const handleNotification = (e:any) => {
    type = e.detail.type
    title = e.detail.title
    content = e.detail.description
    setNotifyData(e?.detail)
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  type = type ?? (notifyData as any)?.type
  listenCustomEvent("notification", handleNotification)
  
  if(!image){
    if(type == "success") image = Theme?.SuccessImage
    if(type == "error") image = Theme?.ErrorImage
    if(type == "warning") image = Theme?.WarningImage
    if(type == "info") image = Theme?.InfoImage
  }
  if(!ContainerClass){
    if(type == "info") ContainerClass = Theme?.InfoContainer
    if(type == "error") ContainerClass = Theme?.ErrorContainer
    // if(type == "warning") ContainerClass = Theme?.InfoContainer
    // if(type == "success") ContainerClass = Theme?.InfoContainer
  }
  

  return (
    <>
      {isVisible &&  (
        <div
          className={ContainerClass}
          role="alert"
        >
          <div className={Theme?.TitleContainer}> 
            {image && <div className={Theme?.ImageClass}>
              {getImageComponent(image)}
            </div>}
            <h3>{title ?? (notifyData as any)?.title}</h3>
          </div>
          <div className={Theme?.ContentClass}>
            {content ?? (notifyData as any)?.description}  
          </div>
        </div>
      )}
    </>
  );
};
export default Notification;

var notificationProps : { 
  type?: "error" | "info" | "success" | "warning"
  title?: string;
  content?: string;
  ContainerClass?: string;
  theme?: NotificationTheme;
  id?: string, 
  text?: string, 
  image?: string | any | React.JSX.Element,
}

export type NotificationProps = typeof notificationProps


var NotificationTheme: {
  InfoContainer?: string;
  ErrorContainer?: string;
  TitleContainer?: string;
  ContentClass?: string;
  ImageClass?: string,
  InfoImage?: React.JSX.Element | string | undefined | IconProps,
  SuccessImage?: React.JSX.Element | string | undefined | IconProps,
  ErrorImage?: React.JSX.Element | string | undefined | IconProps,
  WarningImage?: React.JSX.Element | string | undefined | IconProps
};
export type NotificationTheme = typeof NotificationTheme;
