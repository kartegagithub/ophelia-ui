import React, { useState } from "react";
import { getAppTheme } from "../../AppTheme";
import { getImageComponent } from "../Image/Extensions";
import { IconProps } from "../Icon";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const Accordion: React.FC<AccordionProps> = ({
  leftIcon = undefined,
  title = undefined,
  content = undefined,
  theme = undefined,
  children = undefined,
  defaultOpen = false,
  titleClass = undefined,
  className = undefined,
  iconClass = undefined,
  iconSize = undefined,
}) => {
  const Theme = getAppTheme({ Accordion: theme }).Accordion;
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <>
      <details
        className={`${Theme?.DetailClass} ${className}`}
        open={defaultOpen}
        onToggle={(e) => setIsOpen(e.currentTarget.open)}
      >
        <summary className={Theme?.SummaryClass}>
          <p className={titleClass ? titleClass : Theme?.TitleClass}>
            {leftIcon && (
              <span className="mr-1">{getImageComponent(leftIcon)}</span>
            )}
            {title}
          </p>
          {isOpen && (
            <ChevronUpIcon
              width={iconSize ? iconSize : 24}
              height={iconSize ? iconSize : 24}
              className={iconClass ? iconClass : Theme?.OpenIconClass}
            />
          )}
          {!isOpen && (
            <ChevronDownIcon
              width={iconSize ? iconSize : 24}
              height={iconSize ? iconSize : 24}
              className={iconClass ? iconClass : Theme?.ClosedIconClass}
            />
          )}
        </summary>
        <div className={Theme?.ContentClass}>
          {content && typeof content == "string" && <div dangerouslySetInnerHTML={{ __html: content }} />}
          {content && typeof content != "string" && <div>{content}</div>}
          {children}
        </div>
      </details>
    </>
  );
};
export default Accordion;

var accordionProps: {
  title?: any;
  titleClass?: string;
  className?: string;
  leftIcon?: IconProps | string | React.JSX.Element | Function;
  content?: string | React.JSX.Element;
  defaultOpen?: boolean;
  theme?: AccordionTheme;
  children?: React.ReactNode;
  iconClass?: string;
  iconSize?: number;
};
export type AccordionProps = typeof accordionProps;

var accordionTheme: {
  DetailClass?: string;
  SummaryClass?: string;
  TitleClass?: string;
  OpenIconClass?: string;
  ClosedIconClass?: string;
  ContentClass?: string;
};
export type AccordionTheme = typeof accordionTheme;
