import React, { useEffect, useState } from "react";
import Backdrop from "../Backdrop";
import { getAppTheme } from "../../AppTheme";
import { checkMouseInBoundByRef } from "../../Extensions/ComponentExtensions";
const Modal: React.FC<{
  id?: string;
  className?: string;
  defaultOpen?: boolean;
  title?: string | React.ReactNode;
  backdrop?: boolean;
  dismissText?: string;
  dismissButtonClassName?: string;
  dismissOnBackdropClick?: boolean;
  buttons?: Array<{disabled?: boolean, className?: string, text: string | React.ReactNode, closeModalOnClick?: boolean, onClick?: ((e: React.MouseEvent<HTMLButtonElement>, item: any) => void)}>
  children?: React.ReactNode;
  onBottomScroll?: Function
}> = ({
  className = undefined,
  dismissButtonClassName = undefined,
  dismissOnBackdropClick = true,
  id = undefined,
  defaultOpen = true,
  title = undefined,
  dismissText = undefined,
  onBottomScroll = undefined,
  buttons = [],
  backdrop = true,
  children
}) => {
  const theme = getAppTheme();
  const ModalRef = React.createRef<HTMLDivElement>();
  const ModalBodyRef = React.createRef<HTMLDivElement>();
  const [open, setOpen] = useState(false)
  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    setOpen(false)
    return false;
  }
  const buttonClick =(e: React.MouseEvent<HTMLButtonElement>, item: any) =>{
    e.preventDefault();

    if(item.closeModalOnClick) {
      closeModal(e)
      setOpen(false)
    }
    if(item.onClick) item.onClick(e, item)

    return false;
  }
  const onScrollModalBody = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if(ModalBodyRef.current){
      if(onBottomScroll && ModalBodyRef.current.scrollTop + ModalBodyRef.current.offsetHeight + 20 >= ModalBodyRef.current.scrollHeight)
        onBottomScroll();
    }
  }

  useEffect(() => {
    setOpen(defaultOpen || !open)
    const close = (e: KeyboardEvent) => {
      if(e.key === "Escape"){
        dismissOnBackdropClick && setOpen(false)
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  },[])

  if(!open) return <></>

  if(!className) className = theme.Modal?.Class
  if(backdrop) className += " z-" + theme.Modal?.DefaultZIndex;
  //console.log(buttons)
  return (  
    <>
      <div id={id} className={className + " " + (open? "": "hidden")} onClick={(e) => { checkMouseInBoundByRef(e, ModalRef, (inside) => { dismissOnBackdropClick && !inside ? setOpen(false): undefined })  }}>
        <div className={theme.Modal?.SubClass}>
          <div className={theme.Modal?.ContainerClass} ref={ModalRef}>
            {title && <div className={theme.Modal?.HeaderClass}>
              <h3 className={theme.Modal?.TitleClass}>{title}</h3>
            </div>}
            <div className={theme.Modal?.BodyClass} ref={ModalBodyRef} onScroll={(e) => onScrollModalBody(e)}>{children}</div>
            <div className={theme.Modal?.FooterClass}>
              {buttons?.map((item) => {
                  return <button disabled={item.disabled} onClick={(e) => buttonClick(e, item)} type="button" className={(item.className ?? theme.Modal?.ButtonClass) + (item.disabled? " disabled:opacity-50": "")}>{item.text}</button>
              })}            
              {dismissText && <button data-modal-hide={id} type="button" className={dismissButtonClassName ?? theme.Modal?.ButtonClass} onClick={(e) => { closeModal(e) }}>
                {dismissText}
              </button>}
            </div>
          </div>
        </div>
      </div>
      <Backdrop visible={open && backdrop}/>
    </>
  );
};
export default Modal;

var modalTheme: {
  DefaultZIndex?: string | number,
  Class?: string,
  SubClass?: string,
  ContainerClass?: string,
  HeaderClass?: string,
  BodyClass?: string,
  FooterClass?: string,
  TitleClass?: string,
  ButtonClass?: string
}
export type ModalTheme = typeof modalTheme