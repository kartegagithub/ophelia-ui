import React, { useEffect, useState } from "react";
import { getAppTheme } from "../../AppTheme";
import { getImageComponent } from "../Image/Extensions";
import RawHTML from "../RawHTML";
import { IconProps } from "../Icon";
import { ChevronDownIcon,ChevronUpIcon } from "@heroicons/react/24/solid";

const Accordion: React.FC<AccordionProps> = ({
  leftIcon = undefined,
  title = undefined,
  content = undefined,
  theme = undefined,
  children = undefined,
  defaultOpen = false
}) => {
  const Theme = getAppTheme({Accordion: theme}).Accordion;
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <>
      <details className={`${Theme?.DetailClass}`} open={defaultOpen} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
        <summary className={Theme?.SummaryClass}>
          <p className={Theme?.TitleClass}>
          {leftIcon && (
              <span className="mr-1">{getImageComponent(leftIcon)}</span>
            )}
          {title}
          </p>
          {isOpen && <ChevronUpIcon width={24} height={24} className={Theme?.OpenIconClass}/>}
          {!isOpen && <ChevronDownIcon width={24} height={24} className={Theme?.ClosedIconClass}/>}
        </summary>
        <div className={Theme?.ContentClass}>
          {content && <RawHTML html={content} />}
          {children}
        </div>
      </details>
    </>
  
  )
}
export default Accordion;

var accordionProps: {
  title?: string;
  leftIcon?: IconProps | string | React.JSX.Element | Function
  content?: string | React.JSX.Element;
  defaultOpen?: boolean;
  theme?: AccordionTheme
  children?: React.ReactNode
}
export type AccordionProps = typeof accordionProps

var accordionTheme: {
  DetailClass?: string,
  SummaryClass?: string
  TitleClass?: string
  OpenIconClass?: string
  ClosedIconClass?: string
  ContentClass?: string
}
export type AccordionTheme = typeof accordionTheme