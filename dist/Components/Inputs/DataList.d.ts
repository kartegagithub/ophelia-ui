import React, { InputHTMLAttributes } from "react";
export default class DataList<P> extends React.Component<P & InputHTMLAttributes<HTMLDataListElement> & {
    options?: string | string[];
}, {}> {
    render(): React.ReactNode;
}
