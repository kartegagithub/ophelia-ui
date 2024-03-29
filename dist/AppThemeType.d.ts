import React from "react";
import { AlertTheme } from "./Components/Alert/Alert";
import { TabsTheme } from "./Components/Tabs/Tab";
import { CarouselTheme } from "./Components/Carousel/Carousel";
import { PaginationTheme } from "./Components/Pagination/Pagination";
import { SearchbarTheme } from "./Components/Searchbar/Searchbar";
import { TableTheme } from "./Components/Table/Table";
import { ModalTheme } from "./Components/Modal/Modal";
import { DropdownTheme } from "./Components/Dropdown/Dropdown";
import { AccordionTheme } from "./Components/Accordion/Accordion";
import { ProgressTheme } from "./Components/Progress/Progress";
import { SpeedDialTheme } from "./Components/SpeedDial/SpeedDial";
import { ToastTheme } from "./Components/Toast/Toast";
import { NotificationTheme } from "./Components/Notification/Notification";
import { ShortcutListTheme } from "./Components/ShortcutList/Shortcutlist";
import { InputsTheme } from "./Components/Inputs/Theme";
import { IconRatingTheme } from "./Components/IconRating/IconRating";
import { SpinnerTheme } from "./Components/Spinner/Spinner";
import { InputFieldsTheme } from "./Components/InputFields/Theme";
import { SidebarTheme } from "./Components/Sidebar/Sidebar";
import { GridTheme } from "./Components/Grid/Grid";
import { MenuTheme } from "./Components/Menu/Menu";
import { PanelTheme } from "./Components/Panel/Panel";
import { DrawerTheme } from "./Components/Drawer/Drawer";
declare var appThemeType: {
    Common?: {
        Backdrop?: string;
    };
    Alert?: AlertTheme;
    Binders?: {
        SubBinderModal?: {
            Class?: string;
        };
    };
    InputFields?: InputFieldsTheme;
    Tabs?: TabsTheme;
    Buttons?: {
        default?: string;
        primary?: string;
    };
    Drawer?: DrawerTheme;
    Panel?: PanelTheme;
    Pagination?: PaginationTheme;
    Carousel?: CarouselTheme;
    Inputs?: InputsTheme;
    Searchbar?: SearchbarTheme;
    ShortcutList?: ShortcutListTheme;
    Menu?: MenuTheme;
    Sidebar?: SidebarTheme;
    Table?: TableTheme;
    Grid?: GridTheme;
    Spinner?: SpinnerTheme;
    IconRating?: IconRatingTheme;
    Toast?: ToastTheme;
    Notification?: NotificationTheme;
    SpeedDial?: SpeedDialTheme;
    Progress?: ProgressTheme;
    Modal?: ModalTheme;
    Dropdown?: DropdownTheme;
    Accordion?: AccordionTheme;
    Highlight?: {
        Languages?: Array<string>;
    };
    Quill?: {
        Formats?: Array<string>;
        Toolbar?: Array<any>;
        ImageHandler?: ((fileName: string, size: number, buffer: ArrayBuffer, base64: string | undefined) => Promise<string | undefined>);
    };
    Icons?: {
        DefaultSize?: string;
        getCustomIconSvg?: ((iconName: string, size?: string, className?: string, strokeColor?: string, fillColor?: string, ext1?: string, ext2?: string, ext3?: string) => React.JSX.Element | string);
        getIconSvg?: ((iconName: string, size?: string, className?: string, strokeColor?: string, fillColor?: string, ext1?: string, ext2?: string, ext3?: string) => React.JSX.Element | string);
    };
};
export declare type AppThemeType = typeof appThemeType;
export {};
