import React, { useEffect, useState } from "react";
import Backdrop from "../Backdrop";
import { checkMouseInBoundByRef } from "ophelia-core";
import {
  registerDocumentKeyDown,
  unregisterDocumentKeyDown,
} from "ophelia-core";
import Icon from "../Icon";
const Modal: React.FC<{
  id?: string;
  defaultOpen?: boolean;
  title?: string | React.ReactNode;
  backdrop?: boolean;
  dismissText?: string;
  center?: boolean;
  showCloseButton?: boolean;
  dismissOnBackdropClick?: boolean;
  draggable?: boolean;
  className?: string;
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
  onClose?: Function;
}> = ({
  dismissOnBackdropClick = true,
  id = undefined,
  defaultOpen = true,
  title = undefined,
  dismissText = undefined,
  onBottomScroll = undefined,
  onCurrentValue = undefined,
  showCloseButton = true,
  buttons = [],
  draggable = false,
  center = false,
  backdrop = true,
  className = undefined,
  children,
  onClose = undefined,
}) => {
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
        onCurrentValue && onCurrentValue(false);
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

  return (
    <>
      <div
        id={id}
        className={`oph-modal ${className} ${center && "center"} ${
          !open && "hidden"
        }`}
        onClick={(e) => {
          checkMouseInBoundByRef(e, ModalRef, (inside) => {
            dismissOnBackdropClick && !inside
              ? (onCurrentValue && onCurrentValue(false), setOpen(false))
              : undefined;
          });
          onClose && onClose();
        }}
        style={{ transform: `translateY(${currentY}px)` }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <div className="oph-modal-subclass">
          <div className="oph-modal-subclass-container" ref={ModalRef}>
            {showCloseButton && (
              <div
                className="oph-modal-subclass-container-close"
                onClick={(e: any) => {
                  closeModal(e);
                  onCurrentValue && onCurrentValue(false);
                  onClose && onClose();
                }}
              >
                <Icon
                  name="azClose"
                  color="#768892"
                  size={24}
                  className="oph-modal-subclass-container-close-icon"
                />
              </div>
            )}
            {draggable && (
              <div
                className="oph-modal-subclass-container-draggable group"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
              >
                <div className="oph-modal-subclass-container-draggable-content"></div>
              </div>
            )}
            {title && (
              <div className="oph-modal-subclass-container-header">
                <h3 className="oph-modal-subclass-container-header-title">
                  {title}
                </h3>
              </div>
            )}
            <div
              className="oph-modal-subclass-container-body"
              ref={ModalBodyRef}
              onScroll={(e) => onScrollModalBody(e)}
            >
              {children}
            </div>
            {buttons?.length >= 1 && (
              <div className="oph-modal-subclass-container-footer">
                {buttons?.map((item, i) => {
                  return (
                    <button
                      key={i}
                      disabled={item.disabled}
                      onClick={(e) => buttonClick(e, item)}
                      type={item.type ?? "button"}
                      className={
                        item.className +
                        " " +
                        "oph-modal-subclass-container-footer-button" +
                        " " +
                        (item.disabled &&
                          "oph-modal-subclass-container-footer-buttonDisabled")
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
                    className="oph-modal-subclass-container-footer-dismissButton"
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
