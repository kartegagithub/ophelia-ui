import React, { useState } from "react";
import { getImageComponent } from "../Image/Extensions";
import RawHTML from "../RawHTML";
import { IconProps } from "../Icon";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const Accordion: React.FC<AccordionProps> = ({
  id,
  leftIcon = undefined,
  title = undefined,
  content = undefined,
  children = undefined,
  defaultOpen = false,
  iconSize = undefined,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <>
      <details
        id={id}
        className="oph-accordion"
        open={defaultOpen}
        onToggle={(e) => setIsOpen(e.currentTarget.open)}
      >
        <summary className="oph-accordion-summary">
          <p className="oph-accordion-title">
            {leftIcon && (
              <span className="mr-1">{getImageComponent(leftIcon)}</span>
            )}
            {title}
          </p>
          {isOpen && (
            <ChevronUpIcon
              width={iconSize ? iconSize : 24}
              height={iconSize ? iconSize : 24}
            />
          )}
          {!isOpen && (
            <ChevronDownIcon
              width={iconSize ? iconSize : 24}
              height={iconSize ? iconSize : 24}
            />
          )}
        </summary>
        <div className="oph-accordion-content">
          {content && <RawHTML html={content} />}
          {children}
        </div>
      </details>
    </>
  );
};
export default Accordion;

var accordionProps: {
  id?: string;
  title?: any;
  leftIcon?: IconProps | string | React.JSX.Element | Function;
  content?: string | React.JSX.Element;
  defaultOpen?: boolean;
  children?: React.ReactNode;
  iconSize?: number;
};
export type AccordionProps = typeof accordionProps;
