import React, {
  KeyboardEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";
import SidebarMenuClass from "./SidebarMenuClass";
import Menu from "../Menu/Menu";
import Image from "../Image/Image";
import { getAppTheme } from "../../AppTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../Icon";
import { getImageComponent } from "../Image/Extensions";
import MenuClass from "../Menu/MenuClass";
import AppClient from "../../AppClient";

const Sidebar: React.FC<{
  menu: SidebarMenuClass;
  id?: string;
  stateKey?: any;
  children?: React.ReactNode;
  AppClient?: AppClient
}> = React.memo(({ menu, AppClient, stateKey, id, children }) => {
  const [currentState, setCurrentState] = useState({
    menu: new SidebarMenuClass(),
    searchKey: "",
    stateKey: false,
  });
  const [menuCollapsed, setMenuCollapsed] = useState<boolean>(false);
  const [mobile, setMobile] = useState<boolean>(false);
  const path = usePathname();
  const theme = getAppTheme();

  useEffect(() => {
    setCurrentState({
      menu: menu,
      searchKey: "",
      stateKey: stateKey,
    });
    if(!menu.Init) menu.Init = new MenuClass().Init
    if(menu.Init) menu.Init(menu, path);
  }, [stateKey, menu]); 

  const searchTextInMenu: KeyboardEventHandler<HTMLInputElement> = (e) => {
    var text = e.currentTarget.value;
    if (menu.Search) {
      setCurrentState({
        stateKey: currentState.stateKey,
        menu: menu.Search(menu, text),
        searchKey: text,
      });
    }
  };

  var iconComponent = getImageComponent(currentState.menu.SearchIcon)
  const searchArea = useMemo(() => {
    return (
      <div className="mb-9" key="search-area">
        <label className="relative">
          {currentState.menu.SearchIconPosition === "left" && (
            <span
              className={`${
                menuCollapsed &&
                "bg-deepBlue w-12 h-12 flex items-center justify-center rounded-xl -ml-3 cursor-text"
              } absolute inset-y-0 left-0 flex items-center`}
              onClick={() => setMenuCollapsed(false)}
            >
              {iconComponent}
            </span>
          )}
          <input
            type="text"
            onKeyUp={searchTextInMenu}
            placeholder="Search"
            className={`${
              menuCollapsed ? "border-none" : "border-b"
            } flex p-3 w-full bg-blueZodiac text-white font-semibold text-[12px] border-blueBell tracking-[.42px] focus:outline-none focus:border-white pl-8`}
          />
          {currentState.menu.SearchIconPosition === "right" && (
            <span className="absolute inset-y-0 right-0 flex items-center">
              {iconComponent}
            </span>
          )}
        </label>
      </div>
    );
  }, [menuCollapsed]);

  if (!currentState.menu) return <div></div>;
  if (!id) id = "sidebar";
  return (
    <>
    <button className={`flex pl-6 pt-9 md:hidden ${mobile && 'hidden'}`} onClick={() => {setMobile(!mobile),setMenuCollapsed(false)}}>
      <Icon name="menu" color="black"/>            
    </button>
      <div
        className={`${!menuCollapsed ? `${theme.Sidebar?.RootClass}` : `${theme.Sidebar?.ToogleClass}`} ${mobile ? "max-md:block" : "max-md:hidden"}`}
        key={id}
      >
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="flex items-center gap-2.5">
            {menu.AppIcon && typeof menu.AppIcon == "string" && <Icon name={menu.AppIcon} className="app-icon h-[22px]" size={24}/>}
            {menu.AppIcon && typeof menu.AppIcon !== "string" && menu.AppIcon}
            {!menuCollapsed && menu.AppTitle && typeof menu.AppTitle == "string" && <p className="app-title text-white text-3xl">{menu.AppTitle}</p>}
            {!menuCollapsed && menu.AppTitle && typeof menu.AppTitle !== "string" && menu.AppTitle}
          </Link>
          {!menuCollapsed && (
            <button onClick={() => {setMenuCollapsed(!menuCollapsed), !open && setMobile(false)}}>
              <Icon name="menu" color="#E1E1F5"/>            
            </button>
          )}
        </div>
        {currentState.menu.EnableSearch && searchArea}
        <Menu
          menu={currentState.menu}
          id="menu"
          searchKey={currentState.searchKey}
          stateKey={currentState.stateKey}
          setMenuCollapsed={setMenuCollapsed}
          menuCollapsed={menuCollapsed}
          AppClient={AppClient}
        />
        {children}
      </div>
    </>
  );
});
Sidebar.displayName = "Sidebar";
export default Sidebar;

var sidebarTheme: {
  RootClass?: string,
  ToogleClass?: string,
}
export type SidebarTheme = typeof sidebarTheme