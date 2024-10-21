import React, { Children, ReactNode, useEffect, useState, useRef } from "react";
import { deepMap } from "../../Extensions/ReflectionExtensions";
import Tab, { TabsTheme } from "./Tab";
import { getAppTheme } from "../../AppTheme";
import { useScrollInlineDynamically } from "../../Extensions";
import { useRouter } from "next/router";

const Tabs: React.FC<{
  id?: string;
  children?: React.ReactNode;
  tabPosition?: string | any;
  theme?: TabsTheme;
  type?: string;
  InlineRootClass?: string;
  InlineTabHeaderClass?: string;
  InlineTabContentClass?: string;
  defaultSelected?: string;
}> = ({
  id,
  theme,
  children,
  type = "monochrome",
  InlineRootClass,
  InlineTabHeaderClass,
  InlineTabContentClass,
  defaultSelected,
}) => {
  const Theme = getAppTheme({ Tabs: theme }).Tabs;
  const [selectedTab, setSelectedTab] = useState("0");
  const tabHeaderRef = useRef<HTMLUListElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const { pathname } = useRouter();
  const [scrollLeft, setScrollLeft] = useState(0);
  const { scrollContainerRef, activeLinkRef } =
    useScrollInlineDynamically(pathname);

  const onTabSelectedClick = (tab: any) => {
    setSelectedTab(tab.props.id);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    if (tabHeaderRef.current) {
      setScrollLeft(tabHeaderRef.current.scrollLeft);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchMoveX = e.touches[0].clientX;
    const diffX = touchMoveX - startX;

    if (tabHeaderRef.current) {
      tabHeaderRef.current.scrollLeft = scrollLeft - diffX;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (tabHeaderRef.current?.offsetLeft || 0));
    if (tabHeaderRef.current) {
      setScrollLeft(tabHeaderRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (tabHeaderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // Kaydırma hızını arttırmak için
    if (tabHeaderRef.current) {
      tabHeaderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUpOrLeave);
      document.addEventListener("mouseleave", handleMouseUpOrLeave);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUpOrLeave);
      document.removeEventListener("mouseleave", handleMouseUpOrLeave);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUpOrLeave);
      document.removeEventListener("mouseleave", handleMouseUpOrLeave);
    };
  }, [isDragging]);

  var tabs: Array<any> = deepMap(children, ["Tab"]);
  var typeTheme = (Theme?.Types as any)[type];

  var {
    TabHeaderButtonClass = Theme?.TabHeaderButtonClass,
    TabHeaderClass = Theme?.TabHeaderClass,
    RootClass = Theme?.RootClass,
    TabPaneClass = Theme?.TabPaneClass,
    TabContentClass = Theme?.TabContentClass,
    SelectedTabHeaderButtonClass = Theme?.SelectedTabHeaderButtonClass,
    SelectedTabHeaderButtonContainerClass = Theme?.SelectedTabHeaderButtonContainerClass,
    TabHeaderButtonContainerClass = Theme?.TabHeaderButtonContainerClass,
  } = Theme || {};

  if (typeTheme) {
    if (typeof typeTheme === "string") {
      TabHeaderButtonClass =
        TabHeaderClass =
        RootClass =
        TabPaneClass =
        TabContentClass =
        TabHeaderButtonContainerClass =
          typeTheme;
    } else {
      TabHeaderButtonClass = typeTheme.className ?? TabHeaderButtonClass;
      TabHeaderClass = typeTheme.TabHeaderClass ?? TabHeaderClass;
      RootClass = typeTheme.RootClass ?? RootClass;
      TabPaneClass = typeTheme.TabPaneClass ?? TabPaneClass;
      TabHeaderButtonContainerClass =
        typeTheme.TabHeaderButtonContainerClass ??
        TabHeaderButtonContainerClass;
      TabContentClass = typeTheme.TabContentClass ?? TabContentClass;
    }

    if (typeTheme.selected) {
      SelectedTabHeaderButtonClass =
        typeTheme.selected ?? SelectedTabHeaderButtonClass;
    }

    if (typeTheme.SelectedTabHeaderButtonContainerClass) {
      SelectedTabHeaderButtonContainerClass =
        typeTheme.SelectedTabHeaderButtonContainerClass ??
        SelectedTabHeaderButtonContainerClass;
    }
  }

  tabs = Children.map(tabs, (item: any, i) => {
    var isSelected;
    if (defaultSelected) {
      isSelected = item.props.id === defaultSelected;
    } else {
      isSelected =
        ((!selectedTab || selectedTab == "0") && item.props.active === true) ||
        item.props.id === selectedTab;
    }

    return React.cloneElement(item, {
      active: isSelected,
      visible: item.props.visible,
      id: item.props.id || `Tab${i}`,
      text: item.props.text,
      children: item.props.children,
      onClick: item.props.onClick && item.props.onClick,
    });
  });

  return (
    <div
      className={`${RootClass} ${InlineRootClass}`}
      key={id}
      ref={scrollContainerRef}
    >
      {tabs.length > 1 && (
        <ul
          className={`${TabHeaderClass} ${InlineTabHeaderClass} scrollable-tabs`}
          key="nav-tabs"
          ref={tabHeaderRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onMouseDown={handleMouseDown}
        >
          {tabs
            .filter((tab) => tab.props?.visible !== false)
            .map((tab, i) => {
              var selected = tab.props.active || tabs.length == 1;
              return (
                <li
                  className={
                    selected && SelectedTabHeaderButtonContainerClass
                      ? SelectedTabHeaderButtonContainerClass
                      : TabHeaderButtonContainerClass
                  }
                  role="presentation"
                  key={i}
                  onClick={() => {
                    onTabSelectedClick(tab);
                  }}
                  ref={activeLinkRef}
                >
                  <button
                    className={
                      selected
                        ? SelectedTabHeaderButtonClass
                        : TabHeaderButtonClass
                    }
                    key={tab.props?.id + "-tab"}
                    id={tab.props?.id + "-tab"}
                    data-tabs-target={"#" + tab.props?.id}
                    type="button"
                    role="tab"
                    aria-controls={tab.props?.id}
                    aria-selected={selected || tab.props?.active}
                    onClick={tab.props?.onClick && tab.props?.onClick}
                  >
                    {tab.props?.text}
                  </button>
                </li>
              );
            })}
        </ul>
      )}
      <div className={`${TabContentClass} ${InlineTabContentClass}`} >
        {tabs.map((tab: any, i) => {
          var selected = tab.props.active || tabs.length == 1;
          var otherProps = (({ active, ...others }) => others)(tab.props);
          return (
            <Tab
              theme={Theme}
              tabPaneClass={TabPaneClass}
              key={i}
              active={selected}
              {...otherProps}
            ></Tab>
          );
        })}
      </div>
    </div>
  );
};
Tabs.displayName = "Tabs";
export default Tabs;
