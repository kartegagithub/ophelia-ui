import { getAppTheme } from "../../AppTheme";
import React, { useState } from "react";
const Tab: React.FC<TabsProps> = ({ theme, visible, id, text, active, children }) => {  
  if(visible === false) return <></>
  
  return (
    <div
      id={id}
      key={id}
      role="tabpanel"
      aria-labelledby={id + "-tab"}
      className={`${active === true ? "block" : "hidden"} ${theme?.TabPaneClass}`}
    >
      {children}
    </div>
  );
}
export default Tab;

var tabsProps: {
  visible?: boolean;
  id?: string;
  text?: string;
  active?: boolean;
  children?: React.ReactNode;
  theme?: TabsTheme
}
export type TabsProps = typeof tabsProps

var tabsTheme:  {
  RootClass?: string,
  TabHeaderClass?: string,
  TabContentClass?: string,
  TabHeaderButtonClass?: string,
  SelectedTabHeaderButtonClass?: string,
  TabHeaderButtonContainerClass?: string,
  TabPaneClass?: string,
}
export type TabsTheme = typeof tabsTheme