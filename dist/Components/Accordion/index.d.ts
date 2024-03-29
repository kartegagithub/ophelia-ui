import React from "react";
declare const Accordion: React.FC<AccordionProps>;
export default Accordion;
declare var accordionProps: {
    title?: string;
    content?: string | React.JSX.Element;
    theme?: AccordionTheme;
};
export declare type AccordionProps = typeof accordionProps;
declare var accordionTheme: {
    DetailClass?: string;
    SummaryClass?: string;
    TitleClass?: string;
    ContentClass?: string;
};
export declare type AccordionTheme = typeof accordionTheme;
