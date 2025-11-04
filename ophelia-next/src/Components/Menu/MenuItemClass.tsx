import { MouseEventHandler } from "react";
import MenuClass from "./MenuClass";
import { replaceQueryParam, urlMatch } from "ophelia-core";
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
  IsMenuCodeSelected?: boolean = false;
  Init? = (item: MenuItemClass, initialPath?: string) => {
    item.IsMenuCodeSelected = false;
    // MenuCode'u initialPath'ten çek
    function getMenuCode(url?: string) {
      if (!url) return null;
      const params = url.split("?")[1];
      if (!params) return null;
      const searchParams = new URLSearchParams(params);
      return searchParams.get("MenuCode");
    }
    const itemMenuCode = item.MenuCode;
    const pathMenuCode = getMenuCode(initialPath);
    if (itemMenuCode && pathMenuCode && itemMenuCode === pathMenuCode) {
      item.IsMenuCodeSelected = true;
    }
    item.SubItems?.forEach((subItem) => {
      if (!subItem.Init) subItem.Init = new MenuItemClass().Init;
      if (subItem.Init) subItem.Init(subItem, initialPath);
    });
  };
}
