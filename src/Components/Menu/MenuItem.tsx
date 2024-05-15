import React, { MouseEventHandler, useState } from "react";
import MenuItemClass from "./MenuItemClass";
import MenuClass from "./MenuClass";
import Link from "next/link";
import { getImageComponent } from "../Image/Extensions";
import { MenuTheme } from "./Menu";
import AppClient from "../../AppClient";

const MenuItem: React.FC<MenuItemProps> = React.memo(
  ({
    selected,
    menu,
    id,
    item,
    stateKey,
    setMenuCollapsed,
    menuCollapsed,
    listener,
    children,
    theme = undefined,
    AppClient = undefined
  }) => {
    selected = selected && item.Selected;
    const [collapsed, setCollapsed] = useState(selected);

    const onClick = () => {
      if(!item.Selected) listener?.onSelect([item]);
      setCollapsed(!collapsed)
    };

    const childEventListener = {
      onSelect: (subItems: Array<MenuItemClass>) => {
        listener?.onSelect([item].concat(subItems));
      },
      onRightIconClick: (subItem: MenuItemClass) => {},
      onLeftIconClick: (subItem: MenuItemClass) => {},
    };

    if (!item) return <li></li>;
    var visible = item.Visible !== false ?? false;
    if (menu.ItemVisiblityFn) visible = menu.ItemVisiblityFn(menu, item);
    if (visible !== true) return <></>;
    if (menu.SearchInProgress === true && item.SearchVisiblity !== true)
      return <></>;

    if (item.Component) {
      var component  = item.Component;
      if(typeof component == "function") component = component(menuCollapsed === true, menu)
      return (
        <div
          key={id}
          className={item.ClassName || menu.ItemClassConfig?.className}
          data-rtl={item.RTL || menu.RTL}
        >
          {component}
        </div>
      );
    }
    var LeftIconComponent = getImageComponent(
      item.LeftIcon,
      { className: item.IconClassName },
      selected
    );
    var RightIconComponent = getImageComponent(
      item.RightIcon,
      { className: item.IconClassName },
      selected
    );
    if(item.SubItems && item.SubItems?.length > 0 && !item.RightIcon){
      RightIconComponent = getImageComponent(
        item.RightIcon ?? {name: "arrow-down", color: selected ? "#fff" : "#A6A5E3", fill: "none", size: 16},
        { className: item.IconClassName },
        selected
      );
    }
    const subMenuItems = item.SubItems?.map((subItem, i) => {
      subItem.Level = (item.Level ?? 0) + 1;
      return (
        <MenuItem
          key={i}
          id={i.toString()}
          menu={menu}
          item={subItem}
          listener={childEventListener}
          stateKey={stateKey}
          selected={selected}
          setMenuCollapsed={setMenuCollapsed}
          menuCollapsed={menuCollapsed}
          AppClient={AppClient}
        />
      );
    });

    var className = "flex items-center justify-between py-4 text-lavenderBlue hover:text-white";
    if (selected && item.Level && theme?.Levels?.Selected) {
      var tmpClassName = (theme?.Levels?.Selected as any)[item.Level.toString()];
      if (tmpClassName) className = tmpClassName;
    }

    if(menuCollapsed){
      return <div className="mb-5 cursor-pointer" onClick={() => {setMenuCollapsed && setMenuCollapsed(false),listener?.onSelect([item]);}}>
        {LeftIconComponent}
      </div>
    }
    return (
      <div
            key={id}
            className={item.ClassName || menu.ItemClassConfig?.className}
            data-rtl={item.RTL || menu.RTL}
          >
            <Link
              key="item-link"
              className={className}
              href={item.Location || ""}
              onClick={onClick}
            >
              <div className="flex items-center gap-3">
                <div>{LeftIconComponent}</div>
                {AppClient? AppClient.Translate(item.Text): item.Text}
              </div>
              {RightIconComponent}
            </Link>
            {collapsed && selected && subMenuItems && (
              <div className={`${menu.SubMenuClassName}`}>{subMenuItems}</div>
            )}
            {children}
          </div>
    );
  }
);
MenuItem.displayName = "MenuItem";
export default MenuItem;

var menuItemProps: {
  menu: MenuClass;
  item: MenuItemClass;
  id?: string;
  searchKey?: string;
  stateKey?: any;
  setMenuCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
  menuCollapsed?: boolean;
  children?: React.ReactNode;
  selected?: boolean;
  AppClient?: AppClient
  listener?: {
    onSelect: Function;
    onRightIconClick: Function;
    onLeftIconClick: Function;
  };
  theme?: MenuTheme
}
export type MenuItemProps = typeof menuItemProps