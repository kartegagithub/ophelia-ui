import React from "react";
const Tab: React.FC<TabsProps> = ({
  theme,
  visible,
  id,
  tabPaneClass,
  text,
  active,
  children,
}) => {
  if (visible === false) return <></>;

  return (
    <div
      id={id}
      key={id}
      role="tabpanel"
      aria-labelledby={id + "-tab"}
      className={`${active === true ? "block" : "hidden"} ${tabPaneClass}`}
    >
      {children}
    </div>
  );
};
Tab.displayName = "Tab";
export default Tab;

var tabsProps: {
  visible?: boolean;
  id?: string;
  text?: string;
  active?: boolean;
  tabPaneClass?: string;
  children?: React.ReactNode;
  theme?: TabsTheme;
  type?: "monochrome";
  onClick?: any;
};
export type TabsProps = typeof tabsProps;

var tabsTheme: {
  RootClass?: string;
  TabHeaderClass?: string;
  TabContentClass?: string;
  TabHeaderButtonClass?: string;
  SelectedTabHeaderButtonClass?: string;
  TabHeaderButtonContainerClass?: string;
  SelectedTabHeaderButtonContainerClass?: any;
  TabPaneClass?: string;
  Types?: {
    monochrome?: any;
    colorful?: any;
    rounded?: any;
    verticalColorful?: any;
    vertical?: any;
    inlineBasic?: any;
    bgColorful?: any;
    horizontal?: any;
  };
  SelectedTypes?: {
    monochrome?: string;
    colorful?: string;
    rounded?: string;
    inlineBasic?: any;
    verticalColorful?: string;
    vertical?: any;
    bgColorful?: string;
    horizontal?: any;
  };
};
export type TabsTheme = typeof tabsTheme;
