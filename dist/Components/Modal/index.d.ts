import React from "react";
declare const Modal: React.FC<{
    id?: string;
    className?: string;
    defaultOpen?: boolean;
    title?: string | React.ReactNode;
    backdrop?: boolean;
    dismissText?: string;
    dismissButtonClassName?: string;
    dismissOnBackdropClick?: boolean;
    buttons?: Array<{
        disabled?: boolean;
        className?: string;
        text: string | React.ReactNode;
        closeModalOnClick?: boolean;
        onClick?: ((e: React.MouseEvent<HTMLButtonElement>, item: any) => void);
    }>;
    children?: React.ReactNode;
    onBottomScroll?: Function;
}>;
export default Modal;
declare var modalTheme: {
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
export declare type ModalTheme = typeof modalTheme;
