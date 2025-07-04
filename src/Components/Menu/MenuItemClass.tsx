import { MouseEventHandler } from "react";
import MenuClass from "./MenuClass";
import { replaceQueryParam, urlMatch } from "../../Extensions/StringExtensions";
import React from "react";

export default class MenuItemClass {
  ID?: string
  Text?: string = undefined;
  TranslatedText?: string = undefined;
  LeftIcon?:
    | string
    | React.JSX.Element
    | undefined
    | ((selected: boolean) => undefined);
  RightIcon?: string | React.JSX.Element | undefined;
  IconClassName?: string = undefined;
  ClassName?: string = undefined;
  Location?: string = undefined;
  RequireLogin?: boolean = true;
  CustomData?: any = {};
  Role?: string | number | undefined | string[] | number[];
  OnClick?: MouseEventHandler<HTMLAnchorElement>;
  SubItems?: Array<MenuItemClass> = [];
  WillLoadOnDemand?: boolean;
  Component?:
    | React.JSX.Element
    | ((menuCollapsed: boolean, menu: MenuClass) => React.JSX.Element)
    | undefined;
  RTL?: boolean = false;
  Visible?: boolean = true;
  SearchVisiblity?: boolean = true;
  Selected?: boolean = false;
  MenuCode?: string = undefined;
  Level?: number;
  Init? = (item: MenuItemClass, initialPath?: string) => {
    if (item.Location && item.MenuCode) {
      item.Location = replaceQueryParam(
        "MenuCode",
        item.MenuCode,
        item.Location
      );
    }
    item.Selected = false;
    if (
      initialPath &&
      item.MenuCode &&
      initialPath.indexOf("MenuCode=" + item.MenuCode) > -1
    )
      item.Selected = true;
    else if (urlMatch(initialPath, item.Location)) item.Selected = true;
    item.SubItems?.forEach((subItem) => {
      if (!subItem.Init) subItem.Init = new MenuItemClass().Init;
      if (subItem.Init) subItem.Init(subItem, initialPath);
      if (subItem.Selected) item.Selected = true;
    });
  };
}
