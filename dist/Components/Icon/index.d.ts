import React from "react";
declare var iconProps: {
    name: string;
    color?: string;
    fill?: string;
    size?: number;
    className?: string;
    ext1?: string;
    ext2?: string;
    ext3?: string;
};
export declare type IconProps = typeof iconProps;
declare const Icon: React.FC<IconProps>;
export default Icon;
