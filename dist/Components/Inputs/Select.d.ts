import React, { SelectHTMLAttributes } from "react";
export default class Select<P> extends React.Component<P & SelectHTMLAttributes<HTMLSelectElement> & {
    placeholder?: string;
    options?: Array<{
        text: string;
        value: string;
    }>;
    low?: number;
    high?: number;
    displayProp?: string;
    valueProp?: string;
}, {}> {
    getOptions(): {
        text: string;
        value: string;
    }[];
    render(): React.ReactNode;
}
