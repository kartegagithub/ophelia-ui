import React, { useState } from "react";
import MenuItemClass from "./MenuItemClass";
import MenuClass from "./MenuClass";
import Link from "next/link";
import { getImageComponent } from "../Image/Extensions";
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
    AppClient = undefined,
  }) => {
    selected = selected && item.Selected;
    const [collapsed, setCollapsed] = useState(selected);

    const onClick = (e: any) => {
      if (item.Location) {
        item.Selected = true;
        return true;
      } else {
        e.preventDefault();
        if (!item.Selected) listener?.onSelect([item]);
        else listener?.onUnselect([item]);
        setCollapsed(item.Selected);
        return false;
      }
    };

    const childEventListener = {
      onSelect: (subItems: Array<MenuItemClass>) => {
        listener?.onSelect([item].concat(subItems));
      },
      onUnselect: (subItems: Array<MenuItemClass>) => {
        subItems.forEach((item) => (item.Selected = false));
      },
      onRightIconClick: (subItem: MenuItemClass) => {},
      onLeftIconClick: (subItem: MenuItemClass) => {},
    };

    if (!item) return <li></li>;
    var visible = item.Visible !== false || false;
    if (menu.ItemVisiblityFn) visible = menu.ItemVisiblityFn(menu, item);
    if (visible !== true) return <></>;
    if (menu.SearchInProgress === true && item.SearchVisiblity !== true)
      return <></>;

    if (item.Component) {
      var component = item.Component;
      if (typeof component == "function")
        component = component(menuCollapsed === true, menu);
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
    if (item.SubItems && item.SubItems?.length > 0 && !item.RightIcon) {
      RightIconComponent = getImageComponent(
        item.RightIcon ?? {
          name: "arrow-down",
          fill: "none",
          size: 16,
        },
        {
          className: `oph-menu-item-link-content-icon ${selected && "selected"}`,
        },
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

    var className = "oph-menu-item-link";

    if (selected && item.Level)
      className = `oph-menu-item-link selected${item.Level}`;

    if (menuCollapsed) {
      return (
        <div
          className="oph-menu-collapsed"
          onClick={() => {
            setMenuCollapsed && setMenuCollapsed(false);
            listener?.onSelect([item]);
          }}
        >
          {LeftIconComponent}
        </div>
      );
    }
    return (
      <div
        id={id}
        key={id}
        className="oph-menu-item"
        data-rtl={item.RTL || menu.RTL}
      >
        <Link
          key="item-link"
          className={className}
          href={item.Location ?? "#"}
          onClick={onClick}
        >
          <div className="oph-menu-item-link-content">
            <div>{LeftIconComponent}</div>
            {AppClient ? AppClient?.Translate(item.Text) : item.Text}
          </div>
          {RightIconComponent}
        </Link>
        {collapsed && selected && subMenuItems && (
          <div className="oph-menu-item-submenu">{subMenuItems}</div>
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
  AppClient?: AppClient;
  listener?: {
    onSelect: Function;
    onUnselect: Function;
    onRightIconClick: Function;
    onLeftIconClick: Function;
  };
};
export type MenuItemProps = typeof menuItemProps;
