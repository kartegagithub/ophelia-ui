import React from "react";
declare const Indicator: React.FC<{
    rootClassName?: string;
    className?: string;
    iconClassName?: string;
    selectedClassName?: string;
    selectedIconClassName?: string;
    visible?: boolean;
    count?: number;
    activeIndex?: number;
    items?: Array<{
        text?: string;
        className?: string;
        selectedClassName?: string;
        iconClassName?: string;
        selectedIconClassName?: string;
        component?: React.JSX.Element | ((selected: boolean) => React.ReactNode);
    }>;
    onChange?: (index: number) => void;
}>;
export default Indicator;
