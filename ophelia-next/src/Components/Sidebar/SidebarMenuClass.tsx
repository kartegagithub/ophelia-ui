import Icon from "../Icon";
import MenuClass from "../Menu/MenuClass";
import React from "react";

export default class SidebarMenuClass extends MenuClass {
  Name?: string = "Sidebar";
  EnableSearch?: boolean = true;
  AppIcon?: string | React.JSX.Element;
  CollapsedMenuIcon?: string | React.JSX.Element = "collapsedMenu";
  ToggleButtonIcon?: string | React.JSX.Element = "menu";
  AppTitle?: string | React.JSX.Element;
  SearchIcon?: string | React.JSX.Element = (
    <Icon name="search" color="#A6A5E3" fill="none" />
  );
  SearchIconPosition?: "left" | "right" = "left";
}
