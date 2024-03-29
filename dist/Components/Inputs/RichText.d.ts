import React from "react";
import "react-quill/dist/quill.snow.css";
declare const RichText: React.FC<{
    id?: string;
    className?: string;
    name?: string;
    value?: string;
    visible?: boolean;
    onChange: Function;
}>;
export default RichText;
