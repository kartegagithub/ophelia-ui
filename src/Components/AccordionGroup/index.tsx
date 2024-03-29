import React from "react";
import { getAppTheme } from "../../AppTheme";
import { getImageComponent } from "../Image/Extensions";
import { AccordionTheme } from "../Accordion";

const AccordionGroup: React.FC<{
  title?: string;
  content?: string;
  count?: number;
  isOpen?: boolean;
  theme?: AccordionTheme
}> = ({
  title = undefined,
  content = undefined,
  isOpen = true,
  count = undefined,
  theme = undefined
}) => {
  const Theme = getAppTheme({Accordion: theme}).Accordion;
  return (
    <>
     <div className="flex flex-col gap-3">
      {Array(count).fill(0).map(_ => 
        <details className={Theme?.DetailClass}>
            <summary className={Theme?.SummaryClass}>
              <p className={Theme?.TitleClass}>{title}</p>
              {getImageComponent({name: "arrow-down", color:"#5B6782", size: 24})}
            </summary>
            <p className={Theme?.ContentClass}>{content}</p>
          </details>
        )}
    </div>
    </>
  
  )
}
export default AccordionGroup;