import React, { useEffect, useState } from "react";
import Backdrop from "../Backdrop";
import { getAppTheme } from "../../AppTheme";
import { checkMouseInBoundByRef } from "../../Extensions/ComponentExtensions";
import {
  registerDocumentKeyDown,
  unregisterDocumentKeyDown,
} from "../../Extensions/DocumentExtension";
import Icon from "../Icon";
const Modal: React.FC<{
  id?: string;
  className?: string;
  defaultOpen?: boolean;
  title?: string | React.ReactNode;
  backdrop?: boolean;
  dismissText?: string;
  center?: boolean;
  dismissButtonClassName?: string;
  showCloseButton?: boolean;
  dismissOnBackdropClick?: boolean;
  maxWidth?: string;
  bodyClassName?: string;
  draggable?: boolean;
  containerCls?: string;
  buttons?: Array<{
    disabled?: boolean;
    className?: string;
    text: string | React.ReactNode;
    closeModalOnClick?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>, item: any) => void;
    type?: "submit" | "reset" | "button" | undefined;
  }>;
  children?: React.ReactNode;
  onCurrentValue?: Function | any;
  onBottomScroll?: Function;
}> = ({
  className = undefined,
  dismissButtonClassName = undefined,
  dismissOnBackdropClick = true,
  id = undefined,
  defaultOpen = true,
  title = undefined,
  dismissText = undefined,
  onBottomScroll = undefined,
  onCurrentValue = undefined,
  maxWidth = "800px",
  showCloseButton = false,
  containerCls = undefined,
  bodyClassName = undefined,
  buttons = [],
  draggable = false,
  center = false,
  backdrop = true,
  children,
}) => {
  const theme = getAppTheme();
  const ModalRef = React.createRef<HTMLDivElement>();
  const ModalBodyRef = React.createRef<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (draggable) {
      setIsDragging(true);
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      setStartY(clientY);
    }
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDragging && draggable) {
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const diff = clientY - startY;
      setCurrentY(diff > 0 ? diff : 0); // sadece positive yükseliğe izin veriliyor. daha yükseğe çıkarmasın.
    }
  };

  const handleMouseUp = () => {
    if (draggable) {
      setIsDragging(false);
      if (currentY > 100) {
        // currentY 100 den büyükse kapatsın.(100den fazla bottom yaparsa)
        setOpen(false);
        onCurrentValue(false);
      }
      setCurrentY(0);
    }
  };

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onCurrentValue && onCurrentValue(false);
    setOpen(false);
    return false;
  };
  const buttonClick = (e: React.MouseEvent<HTMLButtonElement>, item: any) => {
    if (item.type !== "submit") e.preventDefault();
    if (item.closeModalOnClick) {
      closeModal(e);
    }
    if (item.onClick) item.onClick(e, item);

    return item.type !== "submit";
  };
  const onScrollModalBody = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (ModalBodyRef.current) {
      if (
        onBottomScroll &&
        ModalBodyRef.current.scrollTop +
          ModalBodyRef.current.offsetHeight +
          20 >=
          ModalBodyRef.current.scrollHeight
      )
        onBottomScroll();
    }
  };

  useEffect(() => {
    setOpen(defaultOpen || !open);
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismissOnBackdropClick && setOpen(false);
      }
    };
    registerDocumentKeyDown("keydown", close);
    return () => unregisterDocumentKeyDown("keydown", close);
  }, []);

  if (!open) return <></>;

  if (!className) className = theme.Modal?.Class;
  if (backdrop) className += " z-" + theme.Modal?.DefaultZIndex;
  //console.log(buttons)
  return (
    <>
      <div
        id={id}
        className={
          className +
          " " +
          (open ? "" : "hidden") +
          (center &&
            "flex items-center justify-center h-screen overflow-y-hidden top-0")
        }
        onClick={(e) => {
          checkMouseInBoundByRef(e, ModalRef, (inside) => {
            dismissOnBackdropClick && !inside
              ? (onCurrentValue(false), setOpen(false))
              : undefined;
          });
        }}
        style={{ transform: `translateY(${currentY}px)` }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <div className={theme.Modal?.SubClass} style={{ maxWidth }}>
          <div
            className={containerCls + " " + theme.Modal?.ContainerClass}
            ref={ModalRef}
          >
            {showCloseButton && (
              <div
                className="absolute right-5 top-4 z-30"
                onClick={(e: any) => {
                  closeModal(e);
                  onCurrentValue(false);
                }}
              >
                <Icon
                  name="azClose"
                  color="#768892"
                  size={24}
                  className="cursor-pointer"
                />
              </div>
            )}
            {draggable && (
              <div
                className="flex sm:hidden justify-center items-center h-10 cursor-pointer group"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
              >
                <div className="w-12 h-1 bg-blue-200 group-hover:bg-blue-400 rounded-full"></div>
              </div>
            )}
            {title && (
              <div className={theme.Modal?.HeaderClass}>
                <h3 className={theme.Modal?.TitleClass}>{title}</h3>
              </div>
            )}
            <div
              className={bodyClassName ?? theme.Modal?.BodyClass}
              ref={ModalBodyRef}
              onScroll={(e) => onScrollModalBody(e)}
            >
              {children}
            </div>
            {buttons?.length >= 1 && (
              <div className={theme.Modal?.FooterClass}>
                {buttons?.map((item, i) => {
                  return (
                    <button
                      key={i}
                      disabled={item.disabled}
                      onClick={(e) => buttonClick(e, item)}
                      type={item.type ?? "button"}
                      className={
                        (item.className ?? theme.Modal?.ButtonClass) +
                        (item.disabled ? " disabled:opacity-50" : "")
                      }
                    >
                      {item.text}
                    </button>
                  );
                })}
                {dismissText && (
                  <button
                    data-modal-hide={id}
                    type="button"
                    className={
                      dismissButtonClassName ?? theme.Modal?.ButtonClass
                    }
                    onClick={(e) => {
                      closeModal(e);
                    }}
                  >
                    {dismissText}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Backdrop visible={open && backdrop} />
    </>
  );
};
export default Modal;

var modalTheme: {
  DefaultZIndex?: string | number;
  Class?: string;
  SubClass?: string;
  ContainerClass?: string;
  HeaderClass?: string;
  BodyClass?: string;
  FooterClass?: string;
  TitleClass?: string;
  ButtonClass?: string;
};
export type ModalTheme = typeof modalTheme;
