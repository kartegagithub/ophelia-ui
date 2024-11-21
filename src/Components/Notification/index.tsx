import React, { useEffect, useState } from "react";
import { getAppTheme } from "../../AppTheme";
import { getImageComponent } from "../Image/Extensions";
import { IconProps } from "../Icon";
import { listenCustomEvent } from "../../Extensions/DocumentExtension";
import RawHTML from "../RawHTML";

const Notification: React.FC<NotificationProps> = ({
  type = undefined,
  title = undefined,
  content = undefined,
  image = undefined,
  theme = undefined,
}) => {
  const Theme = getAppTheme({ Notification: theme }).Notification;
  const [isVisible, setIsVisible] = useState(false);
  const [notifyData, setNotifyData] = useState(undefined);

  const handleNotification = (e: any) => {
    setNotifyData(e?.detail);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };
  useEffect(() => {
    type = type ?? (notifyData as any)?.type;
    listenCustomEvent("notification", handleNotification);
  }, [type, handleNotification]);

  if (notifyData) {
    type = (notifyData as any).type;
  }
  if (!image) {
    if (type == "success") image = Theme?.SuccessImage;
    if (type == "error") image = Theme?.ErrorImage;
    if (type == "warning") image = Theme?.WarningImage;
    if (type == "info") image = Theme?.InfoImage;
  }

  return (
    <>
      {isVisible && (
        <div className={`oph-notification ${type}`} role="alert">
          <div className="oph-notification-title">
            {image && (
              <div className="oph-notification-image">
                {getImageComponent(image, { width: 50, height: 50 })}
              </div>
            )}
            <h3>
              <RawHTML html={title ?? (notifyData as any)?.title} />
            </h3>
          </div>
          <div className="oph-notification-content">
            <RawHTML html={content ?? (notifyData as any)?.description} />
          </div>
        </div>
      )}
    </>
  );
};
export default Notification;

var notificationProps: {
  type?: "error" | "info" | "success" | "warning";
  title?: string;
  content?: string;
  theme?: NotificationTheme;
  id?: string;
  text?: string;
  image?: string | any | React.JSX.Element;
};

export type NotificationProps = typeof notificationProps;

var NotificationTheme: {
  InfoContainer?: string;
  ErrorContainer?: string;
  TitleContainer?: string;
  ContentClass?: string;
  ImageClass?: string;
  InfoImage?: React.JSX.Element | string | undefined | IconProps;
  SuccessImage?: React.JSX.Element | string | undefined | IconProps;
  ErrorImage?: React.JSX.Element | string | undefined | IconProps;
  WarningImage?: React.JSX.Element | string | undefined | IconProps;
};
export type NotificationTheme = typeof NotificationTheme;
