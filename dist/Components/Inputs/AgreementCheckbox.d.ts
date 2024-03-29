import React, { InputHTMLAttributes } from "react";
export default class AgreementCheckbox<P> extends React.Component<P & Omit<InputHTMLAttributes<HTMLInputElement>, "checked"> & {
    agreementText: string;
    modalClassName?: string;
    modalTitle?: string;
    agreeButtonText?: string;
    agreeButtonClassName?: string;
    rejectButtonText?: string;
    rejectButtonClassName?: string;
    waitForBottomScroll?: boolean;
}, {
    showModal: boolean;
    checked: boolean;
    viewedAgreement: boolean;
}> {
    constructor(props: any);
    cbRef: React.RefObject<HTMLInputElement>;
    cbClick(e: React.MouseEvent<HTMLInputElement>): void;
    onButtonClick(e: any, item: any): void;
    render(): React.ReactNode;
}
