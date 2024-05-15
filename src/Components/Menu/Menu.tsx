import React, { useState } from "react";
import MenuClass from "./MenuClass";
import MenuItem from "./MenuItem";
import MenuItemClass from "./MenuItemClass";
import { getAppTheme } from "../../AppTheme";
import AppClient from "../../AppClient";

const Menu: React.FC<MenuProps> = React.memo(({ menu, AppClient, stateKey, id, searchKey, children, setMenuCollapsed, menuCollapsed, theme = undefined }) => {
  const Theme = getAppTheme({Menu: theme}).Menu;
  const [selectedItems, setSelectedItems] = useState(new Array<MenuItemClass>());
  if (!menu) return <ul></ul>;
  
  const childEventListener = {
    onSelect: (subItems: Array<MenuItemClass>) => {
      menu.UnselectItems(menu);
      subItems.forEach((item) => item.Selected = true)
      setSelectedItems(subItems)
    },
    onRightIconClick: (subItem: MenuItemClass) => {

    },
    onLeftIconClick: (subItem: MenuItemClass) => {

    }
  }

  return (
    <div    
      className={menu.ClassName ?? Theme?.Class} key={id} 
      style={{ scrollbarWidth: "none" , height: "calc(100% - 240px)"}}>
      {menu.Items?.map((item, i) => {
        item.Level = 1;
        return (
          <MenuItem
            searchKey={searchKey}
            stateKey={stateKey}
            key={i}
            id={i.toString()}
            menu={menu}
            item={item}
            listener={childEventListener}
            selected={item.Selected}
            setMenuCollapsed={setMenuCollapsed}
            menuCollapsed={menuCollapsed}
            theme={Theme}
            AppClient={AppClient}
          />
        );
      })}
      {children}
    </div>
  );
});
Menu.displayName = "Menu";
export default Menu;

var menuProps : {
  menu: MenuClass;
  searchKey?: string;
  stateKey?: any;
  setMenuCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  menuCollapsed: boolean;
  id?: string;
  children?: React.ReactNode;
  theme?: MenuTheme
  AppClient?: AppClient
}
export type MenuProps = typeof menuProps

var menuTheme: {
  Class?: string,
  Levels:{
    Selected:{
      "1"?: string,
      "2"?: string,
      "3"?: string,
    }
  }
}
export type MenuTheme = typeof menuTheme