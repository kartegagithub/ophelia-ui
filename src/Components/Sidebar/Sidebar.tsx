import React, {
  KeyboardEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SidebarMenuClass from "./SidebarMenuClass";
import Menu from "../Menu/Menu";
import { usePathname, useSearchParams } from "next/navigation";
import Icon from "../Icon";
import { getImageComponent } from "../Image/Extensions";
import MenuClass from "../Menu/MenuClass";
import AppClient from "../../AppClient";
import { useRouter } from "next/router";

const Sidebar: React.FC<{
  menu: SidebarMenuClass;
  id?: string;
  stateKey?: any;
  sidebarToggle?: boolean | null;
  children?: React.ReactNode;
  AppClient?: AppClient;
  /** Navigasyonda menüyü kapat */
  closeOnNavigate?: boolean;
  /** Dışarı tıklamada menüyü kapat */
  closeOnOutsideClick?: boolean;
  /** Sidebar default açık kapalı gelme durumu */
  defaultOpen?: boolean;
}> = React.memo(
  ({
    menu,
    AppClient,
    stateKey,
    id,
    sidebarToggle,
    children,
    closeOnNavigate,
    closeOnOutsideClick,
    defaultOpen = true,
  }) => {
    const [currentState, setCurrentState] = useState({
      menu: new SidebarMenuClass(),
      searchKey: "",
      stateKey: false,
    });
    const [menuCollapsed, setMenuCollapsed] = useState<boolean>(() => !defaultOpen);
    const [mobile, setMobile] = useState<boolean>(false);
    const path = usePathname();
    const searchParams = useSearchParams();
    const menuCode = searchParams.get("MenuCode");
    const initialPath = menuCode ? `${path}?MenuCode=${menuCode}` : path;
    const router = useRouter();

    useEffect(() => {
      setCurrentState({
        menu: menu,
        searchKey: "",
        stateKey: stateKey,
      });
      if (!menu.Init) menu.Init = new MenuClass().Init;
      if (menu.Init) menu.Init(menu, initialPath);
    }, [stateKey, menu]);

    useEffect(() => {
    if (sidebarToggle != null && sidebarToggle != undefined) {
      setMenuCollapsed((prev) => !prev);
    }
    }, [sidebarToggle]);

    // Dışarı tıklamada kapat
    useEffect(() => {
      if (closeOnOutsideClick !== true) return;
      const handleClickOutside = (event: MouseEvent) => {
        const sidebarElement = document.getElementById(id ?? "sidebar");
        if (!sidebarElement) return;
        if (!sidebarElement.contains(event.target as Node)) {
          setMenuCollapsed(true);
          setMobile(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [id, closeOnOutsideClick]);

    // Route değişiminde kapat (ilk render'da tetikleme)
    const didMountRef = useRef(false);
    useEffect(() => {
      if (closeOnNavigate !== true) return;
      if (!didMountRef.current) {
        didMountRef.current = true;
        return; // ilk yüklemede kapatma
      }
      setMenuCollapsed(true);
      setMobile(false);
    }, [path, menuCode]);

    const searchTextInMenu: KeyboardEventHandler<HTMLInputElement> = (e) => {
      var text = e.currentTarget.value;
      if (menu.Search) {
        setCurrentState({
          stateKey: currentState.stateKey,
          menu: menu.Search(AppClient, menu, text),
          searchKey: text,
        });
      }
    };

    var iconComponent = getImageComponent(currentState.menu.SearchIcon);
    const searchArea = useMemo(() => {
      return (
        <div className="oph-sidebarSearch" key="search-area">
          <label className="oph-sidebarSearch-label">
            {currentState.menu.SearchIconPosition === "left" && (
              <span
                className={`oph-sidebarSearch-label-searchIcon ${
                  menuCollapsed ? "collapsed" : ""
                }`}
                onClick={() => setMenuCollapsed(false)}
              >
                {iconComponent}
              </span>
            )}
            <input
              type="text"
              onKeyUp={searchTextInMenu}
              placeholder="Search"
              className={`oph-sidebarSearch-label-input ${
                menuCollapsed ? "collapsed" : ""
              }`}
            />
            {currentState.menu.SearchIconPosition === "right" && (
              <span className="oph-sidebarSearch-label-right">
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
        <button
          className={`oph-sidebar-mobileSwitchButton ${mobile ? "hidden" : ""}`}
          onClick={() => {
            setMobile(!mobile), setMenuCollapsed(false);
          }}
        >
          <Icon name="collapsedMenu" color="black" />
        </button>
        <div
          className={`oph-sidebar ${!menuCollapsed ? "open" : "collapsed"} ${
            mobile ? "mobile" : ""
          }`}
          key={id}
          id={id}
        >
          <div className="oph-sidebar-linksContainer">
            <button
              className="oph-sidebar-linksContainer-link"
              onClick={() =>
                menuCollapsed ? setMenuCollapsed(false) : router.push("/")
              }
            >
              {menu.AppIcon && typeof menu.AppIcon == "string" && (
                <Icon
                  name={menuCollapsed ? menu.CollapsedMenuIcon : menu.AppIcon}
                  className="oph-sidebar-linksContainer-link-appIcon"
                  size={24}
                />
              )}
              {menu.AppIcon && typeof menu.AppIcon !== "string" && menu.AppIcon}
              {!menuCollapsed &&
                menu.AppTitle &&
                typeof menu.AppTitle == "string" && (
                  <p className="oph-sidebar-linksContainer-link-title">
                    {menu.AppTitle}
                  </p>
                )}
              {!menuCollapsed &&
                menu.AppTitle &&
                typeof menu.AppTitle !== "string" &&
                menu.AppTitle}
            </button>
            {!menuCollapsed &&
              menu.ToggleButtonIcon &&
              typeof menu.AppTitle == "string" && (
                <button
                  onClick={() => {
                    setMenuCollapsed(!menuCollapsed), !open && setMobile(false);
                  }}
                >
                  <Icon name={menu.ToggleButtonIcon} color="#E1E1F5" />
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
  }
);
Sidebar.displayName = "Sidebar";
export default Sidebar;
