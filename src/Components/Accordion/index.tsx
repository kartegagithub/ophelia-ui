import React from "react";
import { getAppTheme } from "../../AppTheme";
import { getImageComponent } from "../Image/Extensions";

const Accordion: React.FC<AccordionProps> = ({
  title = undefined,
  content = undefined,
  theme = undefined
}) => {
  const Theme = getAppTheme({Accordion: theme}).Accordion;
  return (
    <>
      <details className={Theme?.DetailClass}>
        <summary className={Theme?.SummaryClass}>
          <p className={Theme?.TitleClass}>{title}</p>
          {getImageComponent({name: "arrow-down", color:"#5B6782", size: 24})}
        </summary>
        <p className={Theme?.ContentClass}>{content}</p>
      </details>
    </>
  
  )
}
export default Accordion;

var accordionProps: {
  title?: string;
  content?: string | React.JSX.Element;
  theme?: AccordionTheme
}
export type AccordionProps = typeof accordionProps

var accordionTheme: {
  DetailClass?: string,
  SummaryClass?: string
  TitleClass?: string
  ContentClass?: string
}
export type AccordionTheme = typeof accordionTheme