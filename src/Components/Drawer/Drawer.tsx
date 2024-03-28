import { getAppTheme } from "../../AppTheme";
import React, { useEffect, useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
const Drawer: React.FC<DrawerProps> = ({
  swipe = true,
  swipeElement = undefined,
  theme = undefined,
  backdrop = true,
  visible = true,
  children = undefined,
  id = undefined,
  fullWidth = true,
  position = "top-center",
}) => {
  if(position == "center") swipe = false;
  const [swipedData, setSwipedData] = useState(false);
  const swipeElementRef = React.createRef<HTMLDivElement>();
  const childrenRef = React.createRef<HTMLDivElement>();
  const Theme = getAppTheme({Drawer: theme}).Drawer;

  const getChildrenRect = () => {
    if(!childrenRef.current) return {width:0, height: 0, top: 0, left: 0};
    return { width: childrenRef.current.offsetWidth, height: childrenRef.current.offsetHeight, left: childrenRef.current.offsetLeft, top: childrenRef.current.offsetTop }
  }

  const relocateSwipeElement = () => {
    if(swipeElementRef.current && childrenRef.current){
      var rect = getChildrenRect();
      swipeElementRef.current.className = swipeElementRef.current?.className.replace("rotate-90", "").replace("w-full", "").replace("h-full", "")
      swipeElementRef.current.style.left = "";
      swipeElementRef.current.style.right = "";
      swipeElementRef.current.style.top = "";
      swipeElementRef.current.style.bottom = "";
      if(position == "bottom-left" || position == "top-left" || position == "left"){
        swipeElementRef.current.style.left = swipedData? rect.width.toString() + "px": "0px";
        swipeElementRef.current.className += " h-full"
      }
      else if(position == "bottom-right" || position == "top-right" || position == "right"){
        swipeElementRef.current.style.right = swipedData? rect.width.toString() + "px": "0px";
        swipeElementRef.current.className += " h-full"
      }
      else if(position == "top-center"){
        swipeElementRef.current.style.top = swipedData? rect.height.toString() + "px": "0px";
        swipeElementRef.current.className += " w-full"
      }
      else if(position == "bottom-center"){
        swipeElementRef.current.style.bottom = swipedData? rect.height.toString() + "px": "0px";
        swipeElementRef.current.className += " w-full"
      }
      else{
        swipeElementRef.current.className += " w-full"
      }
      
      if(position == "bottom-left" || position == "bottom-right" || position == "top-left" || position == "top-right"|| position == "left" || position == "right") swipeElementRef.current.className += " rotate-90"
    }
  }

  const getComponentClass = () => {
    var componentClass = "fixed ";
    var className = "";
    if(!visible) componentClass += " hidden";
    if(className) componentClass += Theme?.Class;
    if(backdrop) componentClass += "z-40"
  
    if(fullWidth){
      componentClass += " left-0"
      if(position == "top-left" || position == "top-center" || position == "top-right") componentClass += " top-0";
      else if(position == "bottom-left" || position == "bottom-center" || position == "bottom-right") componentClass += " bottom-0";
    }
    else{
      if(position == "left") componentClass += " left-0";
      else if(position == "right") componentClass += " right-0";
      else if(position == "center") componentClass += " mx-auto";
      else if(position == "top-left") componentClass += " top-0 left-0";
      else if(position == "top-center") componentClass += " top-0 mx-auto";
      else if(position == "top-right") componentClass += " top-0 right-0";
      else if(position == "bottom-center") componentClass += " bottom-0 mx-auto";
      else if(position == "bottom-left") componentClass += " bottom-0 left-0";
      else if(position == "bottom-right") componentClass += " bottom-0 right-0";
    }
  
    if(fullWidth) componentClass += " w-full overflow";
    return componentClass
  }
  
  
  if(swipe && !swipeElement){
    // var swipeElementClass = "p-4 w-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700";
    // swipeElement = <div className={swipeElementClass}>
    //                   <span className="absolute w-8 h-1 -translate-x-1/2 bg-gray-300 rounded-lg top-3 left-1/2 dark:bg-gray-600"></span>
    //               </div> 
    var swipeElementClass = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
    swipeElement = <button className={swipeElementClass} type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example">Show drawer</button>
  }
  useEffect(() => {
    relocateSwipeElement()
  }, [swipedData, swipe, position, fullWidth])

  return (
    <>
      <div id={id} className={getComponentClass()}>
        {swipe && <div ref={swipeElementRef} className="absolute" onClick={() => { setSwipedData(!swipedData)}}>{swipeElement}</div>}
        <div ref={childrenRef} className={!swipe || swipedData? "visible": "invisible"}>{children}</div>
      </div>
      <Backdrop visible={backdrop && (!swipe || swipedData)}/>
    </>
  );
};
export default Drawer;

var drawerProps : {
  id?: string;
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
  swipe?: boolean
  swipeElement?: string | React.JSX.Element
  theme?: DrawerTheme
}

export type DrawerProps = typeof drawerProps

var drawerTheme: {
  Class?: string
}
export type DrawerTheme = typeof drawerTheme