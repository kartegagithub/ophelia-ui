import React from "react";
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
Tab.displayName = "Tab";
export default Tab;

var tabsProps: {
  visible?: boolean;
  id?: string;
  text?: string;
  active?: boolean;
  children?: React.ReactNode;
  theme?: TabsTheme;
  type?: "monochrome";
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
  Types?: { monochrome?: string, colorful?: string, rounded?: string, verticalColorful?: string},
  SelectedTypes?: { monochrome?: string, colorful?: string, rounded?: string, verticalColorful?: string},

}
export type TabsTheme = typeof tabsTheme