import React, { Children, ReactNode, useEffect, useState, useRef } from "react";
import { deepMap } from "../../Extensions";
import Tab from "./Tab";
import { useScrollInlineDynamically } from "../../Extensions";
import { useRouter } from "next/router";

const Tabs: React.FC<{
  id?: string;
  children?: React.ReactNode;
  tabPosition?: string | any;
  type?: string;
  InlineRootClass?: string;
  InlineTabHeaderClass?: string;
  InlineTabContentClass?: string;
  defaultSelected?: string;
  noContent?: boolean;
  noScroll?: boolean;
}> = ({
  id,
  children,
  type = "",
  InlineRootClass = "",
  InlineTabHeaderClass = "",
  InlineTabContentClass = "",
  defaultSelected,
  noContent = false,
  noScroll = false,
}) => {
  const [selectedTab, setSelectedTab] = useState(defaultSelected || "0");
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

  tabs = Children.map(tabs, (item: any, i) => {
    var isSelected;
    isSelected =
      ((!selectedTab || selectedTab == "0") && item.props.active === true) ||
      item.props.id === selectedTab;

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
      className={`oph-tabs ${type} ${InlineRootClass}`}
      key={id}
      ref={scrollContainerRef}
    >
      {tabs.length > 1 && (
        <ul
          className={`oph-tabs-header ${InlineTabHeaderClass} ${
            noScroll ? "" : "scrollable-tabs"
          }`}
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
                  className={`oph-tabs-header-buttonContainer ${
                    selected ? "selected" : ""
                  }`}
                  role="presentation"
                  key={i}
                  onClick={() => {
                    onTabSelectedClick(tab);
                  }}
                  ref={activeLinkRef}
                >
                  <button
                    className={`oph-tabs-header-button ${
                      selected ? "selected" : ""
                    }`}
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
      {!noContent && (
        <div className={`oph-tabs-content ${InlineTabContentClass}`}>
          {tabs.map((tab: any, i) => {
            var selected = tab.props.active || tabs.length == 1;
            var otherProps = (({ active, ...others }) => others)(tab.props);
            return (
              <Tab
                tabPaneClass={`oph-tabs-tabPane  ${selected ? "selected" : ""}`}
                key={i}
                active={selected}
                {...otherProps}
              ></Tab>
            );
          })}
        </div>
      )}
    </div>
  );
};
Tabs.displayName = "Tabs";
export default Tabs;
