import { getAppTheme } from "../../AppTheme";
import React, { useEffect, useState } from "react";
import { loopInRange } from "../../Extensions/ArrayExtensions";
const Indicator: React.FC<{
  rootClassName?: string;
  className?: string;
  iconClassName?: string,
  selectedClassName?: string,
  selectedIconClassName?: string,
  visible?: boolean;
  count?: number;
  activeIndex?: number;
  items?: Array<{text?: string, className?: string, selectedClassName?: string, iconClassName?: string, selectedIconClassName?: string, component?: React.JSX.Element | ((selected: boolean) => React.ReactNode)}>
  onChange?: (index: number) => void
}> = ({
  className = undefined,
  count = 0,
  rootClassName = undefined,
  iconClassName = undefined,
  selectedClassName = undefined,
  selectedIconClassName = undefined,
  activeIndex = 0,
  onChange = undefined,
  visible = true,
  items = []
}) => {
  const theme = getAppTheme();
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedIndexChanged = (i: number) => {
    setSelectedIndex(i)
    if(onChange) onChange(i);
  }

  useEffect(() => {
    setSelectedIndex(activeIndex)
  }, [activeIndex, count, items])

  if (!visible) return <></>;

  if (!rootClassName) rootClassName = "flex center-content" 
  if (!className) className = "flex items-center text-sm font-medium text-gray-900 dark:text-white";
  if (!iconClassName) iconClassName = "flex w-2 h-2 bg-white opacity-50 rounded-full"
  if (!selectedClassName) selectedClassName = className;
  if (!selectedIconClassName) selectedIconClassName = "flex w-2 h-2 me-1 bg-white rounded-full";

  if (count > 0) {
    return (
      <div className={rootClassName}>
        {loopInRange(0, count - 1, (i) => {
          return <span className={selectedIndex == i? selectedClassName : className} onClick={() => selectedIndexChanged(i)}>
            <span className={selectedIndex == i? selectedIconClassName : iconClassName}></span>
          </span>;
        })}
      </div>
    );
  }
  if(items && items.length > 0){
    return (
      <div className={rootClassName}>
        {items.map((item, i) => {
          return <div key={i} className={(selectedIndex == i? (item.selectedClassName ?? selectedClassName): (item.className ?? className))} onClick={() => selectedIndexChanged(i)}>
            <span className={selectedIndex == i? (item.selectedIconClassName ?? selectedIconClassName) : (item.iconClassName ?? iconClassName)}></span>
            {item.text != undefined && item.text}
            {item.component && typeof item.component == "function" && item.component(selectedIndex == i)}
            {item.component && typeof item.component != "function" && item.component}
          </div>;
        })}
      </div>
    );
  }
  return <></>;
};
export default Indicator;
