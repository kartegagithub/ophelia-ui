import React from "react";
declare const Form: React.FC<{
    action?: string;
    method?: "get" | "post";
    className?: string;
    encType?: string;
    onSubmit?: Function;
    target?: string;
    preventSubmitEvent?: boolean;
    children?: React.ReactNode;
}>;
export default Form;
