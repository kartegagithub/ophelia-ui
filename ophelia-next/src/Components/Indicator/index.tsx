import React, { useEffect, useState } from "react";
import { loopInRange } from "../../Extensions/ArrayExtensions";
const Indicator: React.FC<{
  id?: string;
  visible?: boolean;
  count?: number;
  activeIndex?: number;
  items?: Array<{
    text?: string;
    component?: React.JSX.Element | ((selected: boolean) => React.ReactNode);
  }>;
  onChange?: (index: number) => void;
}> = ({
  id = undefined,
  count = 0,
  activeIndex = 0,
  onChange = undefined,
  visible = true,
  items = [],
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedIndexChanged = (i: number) => {
    setSelectedIndex(i);
    if (onChange) onChange(i);
  };

  useEffect(() => {
    setSelectedIndex(activeIndex);
  }, [activeIndex, count, items]);

  if (!visible) return <></>;

  if (count > 0) {
    return (
      <div className="oph-indicator" id={id}>
        {loopInRange(0, count - 1, (i) => {
          return (
            <span
              className={`${selectedIndex == i ? "oph-indicator-selected" : "oph-indicator-unselected"}`}
              onClick={() => selectedIndexChanged(i)}
            >
              <span
                className={` ${selectedIndex == i ? "oph-indicator-selected-icon" : "oph-indicator-unselected-icon"} `}
              ></span>
            </span>
          );
        })}
      </div>
    );
  }
  if (items && items.length > 0) {
    return (
      <div className="oph-indicator" id={id}>
        {items.map((item, i) => {
          return (
            <div
              key={i}
              className={`${selectedIndex == i ? "oph-indicator-selected" : "oph-indicator-unselected"}`}
              onClick={() => selectedIndexChanged(i)}
            >
              <span
                className={` ${selectedIndex == i ? "oph-indicator-selected-icon" : "oph-indicator-unselected-icon"} `}
              ></span>
              {item.text != undefined && item.text}
              {item.component &&
                typeof item.component == "function" &&
                item.component(selectedIndex == i)}
              {item.component &&
                typeof item.component != "function" &&
                item.component}
            </div>
          );
        })}
      </div>
    );
  }
  return <></>;
};
export default Indicator;
