import React from "react";
import { AlertTheme } from "./Components/Alert"
import { IconProps } from "./Components/Icon";
import { TabsTheme } from "./Components/Tabs/Tab";
import { CarouselTheme } from "./Components/Carousel";
import { PaginationTheme } from "./Components/Pagination";
import { SearchbarTheme } from "./Components/Searchbar";
import { TableTheme } from "./Components/Table/Table";
import { ModalTheme } from "./Components/Modal";
import { DropdownTheme } from "./Components/Dropdown";
import { AccordionTheme } from "./Components/Accordion";
import { ProgressTheme } from "./Components/Progress";
import { SpeedDialTheme } from "./Components/SpeedDial";
import { ToastTheme } from "./Components/Toast";
import { NotificationTheme } from "./Components/Notification";
import { ShortcutListTheme } from "./Components/ShortcutList";
import { InputsTheme } from "./Components/Inputs/InputsTheme";
import { IconRatingTheme } from "./Components/IconRating";
import { SpinnerTheme } from "./Components/Spinner";
import { InputFieldsTheme } from "./Components/InputFields/InputFieldsTheme";
import { SidebarTheme } from "./Components/Sidebar/Sidebar";
import { GridTheme } from "./Components/Grid/Grid";
import { MenuTheme } from "./Components/Menu/Menu";
import { PanelTheme } from "./Components/Panel";
import { DrawerTheme } from "./Components/Drawer";

var appThemeType: {
  Common?:{
    Backdrop?: string
  },
  Alert?: AlertTheme,
  Binders?: {
    SubBinderModal?:{
      Class?: string
    }
  },
  InputFields?: InputFieldsTheme,
  Tabs?: TabsTheme,
  Buttons?:{
    default?: string
    primary?: string
  },
  Drawer?: DrawerTheme,
  Panel?: PanelTheme,
  Pagination?: PaginationTheme,
  Carousel?: CarouselTheme,
  Inputs?: InputsTheme,
  Searchbar?: SearchbarTheme,
  ShortcutList?: ShortcutListTheme,
  Menu?: MenuTheme,
  Sidebar?: SidebarTheme,
  Table?: TableTheme,
  Grid?: GridTheme,
  Spinner?: SpinnerTheme,
  IconRating?: IconRatingTheme,
  Toast?: ToastTheme,
  Notification?: NotificationTheme,
  SpeedDial?: SpeedDialTheme,
  Progress?: ProgressTheme,
  Modal?: ModalTheme,
  Dropdown?: DropdownTheme,
  Accordion?: AccordionTheme,
  Highlight?:{
    Languages?: Array<string>
  },
  Quill?: {
    Formats?: Array<string>,
    Toolbar?: Array<any>,
    ImageHandler?: ((fileName: string, size: number, buffer: ArrayBuffer, base64: string | undefined) => Promise<string | undefined>)
  },
  Icons?:{
    DefaultSize?: string,
    getCustomIconSvg?: ((iconName: string, size?: string, className?: string, strokeColor?: string, fillColor?: string, ext1?: string, ext2?: string, ext3?: string) => React.JSX.Element | string),
    getIconSvg?: ((iconName: string, size?: string, className?: string, strokeColor?: string, fillColor?: string, ext1?: string, ext2?: string, ext3?: string) => React.JSX.Element | string)
  }
};

export type AppThemeType = typeof appThemeType