import React, { useState } from "react";
import MenuClass from "./MenuClass";
import MenuItem from "./MenuItem";
import MenuItemClass from "./MenuItemClass";
import AppClient from "../../AppClient";

const Menu: React.FC<MenuProps> = React.memo(
  ({
    menu,
    AppClient,
    stateKey,
    id,
    searchKey,
    children,
    setMenuCollapsed,
    menuCollapsed,
  }) => {
    const [selectedItems, setSelectedItems] = useState(
      new Array<MenuItemClass>()
    );
    if (!menu) return <ul></ul>;

    const childEventListener = {
      onSelect: (subItems: Array<MenuItemClass>) => {
        menu.UnselectItems(menu);
        subItems.forEach((item) => (item.Selected = true));
        setSelectedItems(subItems);
      },
      onUnselect: (subItems: Array<MenuItemClass>) => {
        menu.UnselectItems(menu);
        setSelectedItems([]);
      },
      onRightIconClick: (subItem: MenuItemClass) => {},
      onLeftIconClick: (subItem: MenuItemClass) => {},
    };

    return (
      <div id={id} className={`oph-menu`} key={id}>
        {menu.Items?.map((item, i) => {
          item.Level = 1;
          if(!item.TranslatedText) item.TranslatedText = AppClient?.Translate(item.Text);
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
              AppClient={AppClient}
            />
          );
        })}
        {children}
      </div>
    );
  }
);
Menu.displayName = "Menu";
export default Menu;

var menuProps: {
  menu: MenuClass;
  searchKey?: string;
  stateKey?: any;
  setMenuCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  menuCollapsed: boolean;
  id?: string;
  children?: React.ReactNode;
  AppClient?: AppClient;
};
export type MenuProps = typeof menuProps;
