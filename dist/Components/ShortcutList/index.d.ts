import React from "react";
declare const Shortcutlist: React.FC<ShortcutListProps>;
export default Shortcutlist;
declare var shortcutListProps: {
    title?: string;
    showBadge?: boolean;
    visible?: boolean;
    allowNew?: boolean;
    newImage?: string | React.JSX.Element;
    newTitle?: string;
    onItemClick?: ((item: ShortcutItemType) => void);
    items?: Array<ShortcutItemType>;
    theme?: ShortcutListTheme;
};
export declare type ShortcutListProps = typeof shortcutListProps;
declare var shortcutListTheme: {
    Class?: string;
    TitleClass?: string;
    ItemsClass?: string;
    ItemClass?: string;
    ItemIconClass?: string;
    ItemIconColor?: string;
    ItemTitleClass?: string;
    BadgeClass?: string;
};
export declare type ShortcutListTheme = typeof shortcutListTheme;
declare var ShortcutItem: {
    id?: string | number;
    image?: string | React.JSX.Element;
    title?: string;
    location?: string;
    badgeText?: number | string;
};
export declare type ShortcutItemType = typeof ShortcutItem;
