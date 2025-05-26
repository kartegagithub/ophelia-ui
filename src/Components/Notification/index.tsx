import React, { useEffect, useState } from "react";
import { getAppTheme } from "../../AppTheme";
import { getImageComponent } from "../Image/Extensions";
import { IconProps } from "../Icon";
import RawHTML from "../RawHTML";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { listenCustomEvent } from "../../Extensions";

const Notification: React.FC<NotificationProps> = ({
  type = "success",
  title,
  content,
  image,
  theme,
  autoClose = true,
  duration = 3000,
  listenEvents = true,
  defaultVisibility = false,
  onClose,
}) => {
  const Theme = getAppTheme({ Notification: theme }).Notification;
  const [isVisible, setIsVisible] = useState(defaultVisibility);
  const [notifyData, setNotifyData] = useState(undefined);

  const handleNotification = (e: any) => {
    setNotifyData(e?.detail);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  useEffect(() => {
    if(listenEvents){
      type = type ?? (notifyData as any)?.type;
      listenCustomEvent("notification", handleNotification);
    }
  }, [type, handleNotification, listenEvents]);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (notifyData) {
    type = (notifyData as any).type;
  }

  if (!image) {
    if (type === "success") image = Theme?.SuccessImage;
    if (type === "error") image = Theme?.ErrorImage;
    if (type === "warning") image = Theme?.WarningImage;
    if (type === "info") image = Theme?.InfoImage;
  }

  if (!isVisible) return null;

  return (
    <div className={`oph-notification ${type}`} role="alert">
      <div className="oph-notification-header">
        <div className="oph-notification-title">
          {image && (
            <div className="oph-notification-image">
              {getImageComponent(image, { width: 24, height: 24 })}
            </div>
          )}
          <h3>
            <RawHTML html={title ?? (notifyData as any)?.title} />
          </h3>
        </div>
        <button 
          className="oph-notification-close"
          onClick={handleClose}
          aria-label="Close notification"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="oph-notification-content">
        <RawHTML html={content ?? (notifyData as any)?.description} />
      </div>
    </div>
  );
};

export default Notification;

var notificationProps: {
  type?: "error" | "info" | "success" | "warning";
  title?: string;
  content?: string;
  theme?: NotificationTheme;
  image?: string | any | React.JSX.Element;
  autoClose?: boolean;
  duration?: number;
  listenEvents?: boolean
  defaultVisibility?: boolean
  onClose?: () => void;
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
