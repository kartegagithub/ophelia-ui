import React from "react";
import { IconProps } from "../Icon";
declare const Searchbar: React.FC<SearchbarProps>;
export default Searchbar;
declare var searchbarProps: {
    allowSpeechToText?: boolean;
    allowBarcodeRead?: boolean;
    searchOptions?: Array<SearchOptionType> | ((key: string) => Promise<Array<SearchOptionType>>);
    placeholder?: string;
    onSearch?: ((option: SearchOptionType, key?: string) => void);
    dismissText?: string;
    selectText?: string;
    navigateText?: string;
    theme?: SearchbarTheme;
};
export declare type SearchbarProps = typeof searchbarProps;
declare var searchbarTheme: {
    InputClass?: string;
    SearchClass?: string;
    RightIconsWrapperClass?: string;
    SearchIcon?: React.JSX.Element | string | undefined | IconProps;
    MicrophoneIcon?: React.JSX.Element | string | undefined | IconProps;
    BarcodeIcon?: React.JSX.Element | string | undefined | IconProps;
    BadgeClass?: string;
    ItemClass?: string;
    FocusedItemClass?: string;
    ItemIconClass?: string;
    ItemIconColor?: string;
    ItemsContainerClass?: string;
    ItemsScrollableAreaClass?: string;
    ItemTitleClass?: string;
};
export declare type SearchbarTheme = typeof searchbarTheme;
declare var SearchOption: {
    id?: string | number;
    image?: string | React.JSX.Element | any;
    title?: string;
    location?: string;
    badgeText?: number | string;
    shortCodeChar?: string;
};
export declare type SearchOptionType = typeof SearchOption;
