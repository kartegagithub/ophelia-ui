import React, { ButtonHTMLAttributes } from "react";
export default class Button<P> extends React.Component<P & ButtonHTMLAttributes<HTMLButtonElement>, {}> {
    render(): React.ReactNode;
}
