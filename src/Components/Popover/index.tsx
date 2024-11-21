import React, { useState, useEffect, useRef } from "react";

const Popover: React.FC<PopoverProps> = ({
  content,
  trigger,
  position = "top-center",
  id,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div id={id} className="oph-popover">
      <div className="oph-popover-container" ref={popoverRef}>
        <div
          className="oph-popover-container-trigger"
          onClick={() => setIsVisible(!isVisible)}
        >
          {trigger}
        </div>
        {isVisible && (
          <div className={`oph-popover-container-content ${position}`}>
            <div className="py-1">{content}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popover;

var popoverProps: {
  id?: string;
  content: React.ReactNode;
  trigger: React.ReactNode;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
    | "right"
    | "left";
};
export type PopoverProps = typeof popoverProps;
