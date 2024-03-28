import React, { useState } from "react";
import { getAppTheme } from "../../AppTheme";
import { getImageComponent } from "../Image/Extensions";
import { IconProps } from "../Icon/Icon";

const Accordion: React.FC<{
  title?: string;
  content?: string;
  iconProps?: IconProps
  theme?: AccordionTheme
}> = ({
  title = undefined,
  content = undefined,
  iconProps = undefined,
  theme = undefined
}) => {
  const Theme = getAppTheme({Accordion: theme}).Accordion;
  return (
    <>
     <div className="flex flex-col gap-3">
      <details className={Theme?.DetailClass} open>
          <summary className={Theme?.SummaryClass}>
            <p className={Theme?.TitleClass}>{title}</p>
            {getImageComponent({name: "arrow-down", color:"#5B6782", size: 24})}
          </summary>
          <p className={Theme?.ContentClass}>{content}</p>
        </details>
      <details className={Theme?.DetailClass}>
          <summary className={Theme?.SummaryClass}>
            <p className={Theme?.TitleClass}>{title}</p>
            {getImageComponent({name: "arrow-down", color:"#5B6782", size: 24})}
          </summary>
          <p className={Theme?.ContentClass}>{content}</p>
        </details>
      <details className={Theme?.DetailClass}>
          <summary className={Theme?.SummaryClass}>
            <p className={Theme?.TitleClass}>{title}</p>
            {getImageComponent({name: "arrow-down", color:"#5B6782", size: 24})}
          </summary>
          <p className={Theme?.ContentClass}>{content}</p>
        </details>
    </div>
    </>
  
  )
}
export default Accordion;

var accordionTheme: {
  DetailClass?: string,
  SummaryClass?: string
  TitleClass?: string
  ContentClass?: string
}
export type AccordionTheme = typeof accordionTheme