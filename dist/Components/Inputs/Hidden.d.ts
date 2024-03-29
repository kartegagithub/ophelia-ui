import React, { InputHTMLAttributes } from "react";
export default class Hidden<P> extends React.Component<P & InputHTMLAttributes<HTMLInputElement>, {}> {
    render(): React.ReactNode;
}
