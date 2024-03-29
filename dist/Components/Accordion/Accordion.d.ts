import React from "react";
import { IconProps } from "../Icon/Icon";
declare const Accordion: React.FC<{
    title?: string;
    content?: string;
    iconProps?: IconProps;
    theme?: AccordionTheme;
}>;
export default Accordion;
declare var accordionTheme: {
    DetailClass?: string;
    SummaryClass?: string;
    TitleClass?: string;
    ContentClass?: string;
};
export declare type AccordionTheme = typeof accordionTheme;
