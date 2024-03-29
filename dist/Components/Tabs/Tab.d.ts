import React from "react";
declare const Tab: React.FC<TabsProps>;
export default Tab;
declare var tabsProps: {
    visible?: boolean;
    id?: string;
    text?: string;
    active?: boolean;
    children?: React.ReactNode;
    theme?: TabsTheme;
};
export declare type TabsProps = typeof tabsProps;
declare var tabsTheme: {
    RootClass?: string;
    TabHeaderClass?: string;
    TabContentClass?: string;
    TabHeaderButtonClass?: string;
    SelectedTabHeaderButtonClass?: string;
    TabHeaderButtonContainerClass?: string;
    TabPaneClass?: string;
};
export declare type TabsTheme = typeof tabsTheme;
