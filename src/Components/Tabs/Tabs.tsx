import React, { Children, ReactNode, useState } from "react";
import { deepMap } from "../../Extensions/ReflectionExtensions";
import Tab, { TabsTheme } from "./Tab";
import { getAppTheme } from "../../AppTheme";
const Tabs: React.FC<{
  id?: string;
  children?: React.ReactNode;
  theme?: TabsTheme
}> = ({ id, theme, children }) => {
  const Theme = getAppTheme({Tabs: theme}).Tabs;
  const [selectedTab, setSelectedTab] = useState("0")
  const onTabSelectedClick = (tab: any) => {
    setSelectedTab(tab.props.id)
  }
  var tabs: Array<any> = deepMap(children, ["Tab"])
  tabs = Children.map(tabs, (item: any, i) =>  {
    var isSelected = (!selectedTab && item.props.active === true) || item.props.id === selectedTab;
    return React.cloneElement(item, {
        active: isSelected,
        visible: item.props.visible,
        id: item.props.id,
        text: item.props.text,
        children: item.props.children
    });
  });
  return (
    <div className={Theme?.RootClass} key={id}>
      {tabs.length > 1 && <ul className={Theme?.TabHeaderClass} key="nav-tabs">
        {tabs.filter((tab) =>tab.props?.visible !== false).map((tab, i) => {
          var selected = tab.props.id === selectedTab || tabs.length == 1;
          return <li className={Theme?.TabHeaderButtonContainerClass} role="presentation" key={i} onClick={() => {onTabSelectedClick(tab) }}>
              <button className={selected ? Theme?.SelectedTabHeaderButtonClass : Theme?.TabHeaderButtonClass} key={tab.props?.id + "-tab"} id={tab.props?.id + "-tab"} data-tabs-target={"#" + tab.props?.id} type="button" role="tab" aria-controls={tab.props?.id} aria-selected={selected || tab.props?.active}>{tab.props?.text}</button>
          </li>
        })}
      </ul>}
      <div className={Theme?.TabContentClass}>
        {tabs.map((tab: any, i) => {
          var selected = tab.props.id === selectedTab || tabs.length == 1;
          var otherProps = (({ active, ...others }) => others)(tab.props)
          return <Tab theme={Theme} key={i} active={selected} {...otherProps}></Tab>
        })}
      </div>
    </div>
  );
};

export default Tabs;
