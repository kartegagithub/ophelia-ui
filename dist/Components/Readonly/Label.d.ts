import React from "react";
export default class Label<P> extends React.Component<P & {
    id?: string;
    name?: string;
    className?: string;
    value?: string;
    for?: string;
    children?: React.ReactNode;
}, {}> {
    render(): React.ReactNode;
}
