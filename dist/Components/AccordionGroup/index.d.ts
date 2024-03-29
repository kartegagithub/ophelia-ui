import React from "react";
import { AccordionTheme } from "../Accordion";
declare const AccordionGroup: React.FC<{
    title?: string;
    content?: string;
    count?: number;
    isOpen?: boolean;
    theme?: AccordionTheme;
}>;
export default AccordionGroup;
