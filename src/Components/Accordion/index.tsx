import React, { useEffect, useState } from "react";
import { getAppTheme } from "../../AppTheme";
import { getImageComponent } from "../Image/Extensions";
import RawHTML from "../RawHTML";
import { IconProps } from "../Icon";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

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
          <span className="mr-1">{leftIcon && getImageComponent(leftIcon)}</span>
          {title}
          </p>
          {isOpen && <ChevronDownIcon width={24} height={24} />}
          {!isOpen && <ChevronRightIcon width={24} height={24}/>}
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
  ContentClass?: string
}
export type AccordionTheme = typeof accordionTheme