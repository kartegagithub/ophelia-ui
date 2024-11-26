import { getAppTheme } from "../../AppTheme";
import React, { useEffect, useState } from "react";
import Backdrop from "../Backdrop";
const Drawer: React.FC<DrawerProps> = ({
  id,
  swipe = true,
  swipeElement = undefined,
  backdrop = true,
  visible = true,
  children = undefined,
  fullWidth = true,
  position = "top-center",
  swipeButtonText = "Show Drawer",
  className = undefined,
}) => {
  if (position == "center") swipe = false;
  const [swipedData, setSwipedData] = useState(false);
  const swipeElementRef = React.createRef<HTMLDivElement>();
  const childrenRef = React.createRef<HTMLDivElement>();

  const getChildrenRect = () => {
    if (!childrenRef.current) return { width: 0, height: 0, top: 0, left: 0 };
    return {
      width: childrenRef.current.offsetWidth,
      height: childrenRef.current.offsetHeight,
      left: childrenRef.current.offsetLeft,
      top: childrenRef.current.offsetTop,
    };
  };

  const relocateSwipeElement = () => {
    if (swipeElementRef.current && childrenRef.current) {
      var rect = getChildrenRect();
      swipeElementRef.current.className = swipeElementRef.current?.className
        .replace("rotate-90", "")
        .replace("w-full", "")
        .replace("h-full", "");
      swipeElementRef.current.style.left = "";
      swipeElementRef.current.style.right = "";
      swipeElementRef.current.style.top = "";
      swipeElementRef.current.style.bottom = "";
      if (
        position == "bottom-left" ||
        position == "top-left" ||
        position == "left"
      ) {
        swipeElementRef.current.style.left = swipedData
          ? rect.width.toString() + "px"
          : "0px";
        swipeElementRef.current.className += " h-full";
      } else if (
        position == "bottom-right" ||
        position == "top-right" ||
        position == "right"
      ) {
        swipeElementRef.current.style.right = swipedData
          ? rect.width.toString() + "px"
          : "0px";
        swipeElementRef.current.className += " h-full";
      } else if (position == "top-center") {
        swipeElementRef.current.style.top = swipedData
          ? rect.height.toString() + "px"
          : "0px";
        swipeElementRef.current.className += " w-full";
      } else if (position == "bottom-center") {
        swipeElementRef.current.style.bottom = swipedData
          ? rect.height.toString() + "px"
          : "0px";
        swipeElementRef.current.className += " w-full";
      } else {
        swipeElementRef.current.className += " w-full";
      }

      if (
        position == "bottom-left" ||
        position == "bottom-right" ||
        position == "top-left" ||
        position == "top-right" ||
        position == "left" ||
        position == "right"
      )
        swipeElementRef.current.className += " rotate-90";
    }
  };

  if (swipe && !swipeElement) {
    swipeElement = (
      <button
        className="oph-drawer-swipeButton"
        type="button"
        data-drawer-target="drawer-example"
        data-drawer-show="drawer-example"
        aria-controls="drawer-example"
      >
        {swipeButtonText}
      </button>
    );
  }
  useEffect(() => {
    relocateSwipeElement();
  }, [relocateSwipeElement, swipedData, swipe, position, fullWidth]);

  return (
    <>
      <div
        id={id}
        className={`oph-drawer ${className} ${fullWidth ? `fullWidth ${position}` : `${position}`} ${!visible ? "hidden" : ""} ${backdrop ? "backdrop" : ""}`}
      >
        {swipe && (
          <div
            ref={swipeElementRef}
            className="oph-drawer-swipe"
            onClick={() => {
              setSwipedData(!swipedData);
            }}
          >
            {swipeElement}
          </div>
        )}
        <div
          ref={childrenRef}
          className={!swipe || swipedData ? "visible" : "invisible"}
        >
          {children}
        </div>
      </div>
      <Backdrop visible={backdrop && (!swipe || swipedData)} />
    </>
  );
};
export default Drawer;

var drawerProps: {
  id?: string;
  className?: string;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "left"
    | "right"
    | "center"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
    | "custom";
  backdrop?: boolean;
  visible?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
  swipe?: boolean;
  swipeElement?: string | React.JSX.Element;
  swipeButtonText?: string;
};

export type DrawerProps = typeof drawerProps;
