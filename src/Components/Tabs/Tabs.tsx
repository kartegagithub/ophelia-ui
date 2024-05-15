import React, { Children, ReactNode, useState } from "react";
import { deepMap } from "../../Extensions/ReflectionExtensions";
import Tab, { TabsTheme } from "./Tab";
import { getAppTheme } from "../../AppTheme";
const Tabs: React.FC<{
  id?: string;
  children?: React.ReactNode;
  theme?: TabsTheme;
  type?: string;
}> = ({ id, theme, children, type="monochrome" }) => {
  const Theme = getAppTheme({Tabs: theme}).Tabs;
  const [selectedTab, setSelectedTab] = useState("0")
  const onTabSelectedClick = (tab: any) => {
    setSelectedTab(tab.props.id)
  }
  var tabs: Array<any> = deepMap(children, ["Tab"])
  const TabHeaderButtonClass = (Theme?.Types as any)[type] ?? Theme?.TabHeaderButtonClass
  const SelectedTabHeaderButtonClass = (Theme?.SelectedTypes as any)[type] ?? Theme?.SelectedTabHeaderButtonClass
  tabs = Children.map(tabs, (item: any, i) =>  {
    var isSelected = ((!selectedTab || selectedTab == "0") && item.props.active === true) || item.props.id === selectedTab;
    return React.cloneElement(item, {
        active: isSelected,
        visible: item.props.visible,
        id: item.props.id || `Tab${i}`,
        text: item.props.text,
        children: item.props.children
    });
  });
  return (
    <div className={Theme?.RootClass} key={id}>
      {tabs.length > 1 && <ul className={Theme?.TabHeaderClass} key="nav-tabs">
        {tabs.filter((tab) =>tab.props?.visible !== false).map((tab, i) => {
          var selected = tab.props.active || tabs.length == 1;
          return <li className={Theme?.TabHeaderButtonContainerClass} role="presentation" key={i} onClick={() => {onTabSelectedClick(tab) }}>
              <button className={selected ? SelectedTabHeaderButtonClass : TabHeaderButtonClass} key={tab.props?.id + "-tab"} id={tab.props?.id + "-tab"} data-tabs-target={"#" + tab.props?.id} type="button" role="tab" aria-controls={tab.props?.id} aria-selected={selected || tab.props?.active}>{tab.props?.text}</button>
          </li>
        })}
      </ul>}
      <div className={Theme?.TabContentClass}>
        {tabs.map((tab: any, i) => {
          var selected = tab.props.active || tabs.length == 1;
          var otherProps = (({ active, ...others }) => others)(tab.props)
          return <Tab theme={Theme} key={i} active={selected} {...otherProps}></Tab>
        })}
      </div>
    </div>
  );
};
Tabs.displayName = "Tabs";
export default Tabs;
