import React, {
  KeyboardEventHandler,
  useEffect,
  useMemo,
  useState
} from 'react'
import SidebarMenuClass from './SidebarMenuClass'
import Menu from '../Menu/Menu'
import { usePathname, useSearchParams } from 'next/navigation'
import Icon from '../Icon'
import { getImageComponent } from '../Image/Extensions'
import MenuClass from '../Menu/MenuClass'
import AppClient from '../../AppClient'
import { useRouter } from 'next/router'

const Sidebar: React.FC<{
  menu: SidebarMenuClass
  id?: string
  stateKey?: any
  sidebarToggle?: boolean
  children?: React.ReactNode
  AppClient?: AppClient
}> = React.memo(
  ({ menu, AppClient, stateKey, id, sidebarToggle, children }) => {
    const [currentState, setCurrentState] = useState({
      menu: new SidebarMenuClass(),
      searchKey: '',
      stateKey: false
    })
    function getRelevantPath(path: string, searchParams: URLSearchParams) {
      const allowed = [
        'MenuCode',
        'folderID',
        'folderTypeID',
        'folderName',
        'parentFolderName'
      ]
      const params: string[] = []
      allowed.forEach((key) => {
        const value = searchParams.get(key)
        if (value !== null) params.push(`${key}=${value}`)
      })
      return params.length > 0 ? `${path}?${params.join('&')}` : path
    }
    const [menuCollapsed, setMenuCollapsed] = useState<boolean>(false)
    const [mobile, setMobile] = useState<boolean>(false)
    const path = usePathname()
    const searchParams = useSearchParams()
    const initialPath = getRelevantPath(
      path,
      new URLSearchParams(searchParams.toString())
    )
    const router = useRouter()

    useEffect(() => {
      setCurrentState({
        menu: menu,
        searchKey: '',
        stateKey: stateKey
      })
      if (!menu.Init) menu.Init = new MenuClass().Init
      if (menu.Init) menu.Init(menu, initialPath)
    }, [stateKey, menu])

    useEffect(() => {
      setMenuCollapsed((prev) => !prev)
    }, [sidebarToggle])

    const searchTextInMenu: KeyboardEventHandler<HTMLInputElement> = (e) => {
      var text = e.currentTarget.value
      if (menu.Search) {
        setCurrentState({
          stateKey: currentState.stateKey,
          menu: menu.Search(AppClient, menu, text),
          searchKey: text
        })
      }
    }

    var iconComponent = getImageComponent(currentState.menu.SearchIcon)
    const searchArea = useMemo(() => {
      return (
        <div className='oph-sidebarSearch' key='search-area'>
          <label className='oph-sidebarSearch-label'>
            {currentState.menu.SearchIconPosition === 'left' && (
              <span
                className={`oph-sidebarSearch-label-searchIcon ${
                  menuCollapsed && 'collapsed'
                }`}
                onClick={() => setMenuCollapsed(false)}
              >
                {iconComponent}
              </span>
            )}
            <input
              type='text'
              onKeyUp={searchTextInMenu}
              placeholder='Search'
              className={`oph-sidebarSearch-label-input ${
                menuCollapsed && 'collapsed'
              }`}
            />
            {currentState.menu.SearchIconPosition === 'right' && (
              <span className='oph-sidebarSearch-label-right'>
                {iconComponent}
              </span>
            )}
          </label>
        </div>
      )
    }, [menuCollapsed])

    if (!currentState.menu) return <div></div>
    if (!id) id = 'sidebar'
    return (
      <>
        <button
          className={`oph-sidebar-mobileSwitchButton ${mobile && 'hidden'}`}
          onClick={() => {
            setMobile(!mobile), setMenuCollapsed(false)
          }}
        >
          <Icon name='collapsedMenu' color='black' />
        </button>
        <div
          className={`oph-sidebar ${!menuCollapsed ? 'open' : 'collapsed'} ${
            mobile && 'mobile'
          }`}
          key={id}
          id={id}
        >
          <div className='oph-sidebar-linksContainer'>
            <button
              className='oph-sidebar-linksContainer-link'
              onClick={() =>
                menuCollapsed ? setMenuCollapsed(false) : router.push('/')
              }
            >
              {menu.AppIcon && typeof menu.AppIcon == 'string' && (
                <Icon
                  name={menuCollapsed ? menu.CollapsedMenuIcon : menu.AppIcon}
                  className='oph-sidebar-linksContainer-link-appIcon'
                  size={24}
                />
              )}
              {menu.AppIcon && typeof menu.AppIcon !== 'string' && menu.AppIcon}
              {!menuCollapsed &&
                menu.AppTitle &&
                typeof menu.AppTitle == 'string' && (
                  <p className='oph-sidebar-linksContainer-link-title'>
                    {menu.AppTitle}
                  </p>
                )}
              {!menuCollapsed &&
                menu.AppTitle &&
                typeof menu.AppTitle !== 'string' &&
                menu.AppTitle}
            </button>
            {!menuCollapsed &&
              menu.ToggleButtonIcon &&
              typeof menu.AppTitle == 'string' && (
                <button
                  onClick={() => {
                    setMenuCollapsed(!menuCollapsed), !open && setMobile(false)
                  }}
                >
                  <Icon name={menu.ToggleButtonIcon} color='#E1E1F5' />
                </button>
              )}
          </div>
          {currentState.menu.EnableSearch && searchArea}
          <Menu
            menu={currentState.menu}
            id='menu'
            searchKey={currentState.searchKey}
            stateKey={currentState.stateKey}
            setMenuCollapsed={setMenuCollapsed}
            menuCollapsed={menuCollapsed}
            AppClient={AppClient}
          />
          {children}
        </div>
      </>
    )
  }
)
Sidebar.displayName = 'Sidebar'
export default Sidebar
