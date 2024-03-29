import React from "react";
import { getAppTheme } from "../../AppTheme";
import { getImageComponent } from "../Image/Extensions";

const Shortcutlist: React.FC<ShortcutListProps> = React.memo(({ 
  onItemClick = undefined,
  newImage = undefined,
  allowNew = true,
  title = undefined,
  showBadge = true,
  visible = true,
  newTitle = undefined,
  theme = undefined,
  items = []
}) => {
  const Theme = getAppTheme({ShortcutList: theme}).ShortcutList;

  if(!visible) return <></>
  return (
    <>
    <div className={Theme?.Class}>
        {title && <p className={Theme?.TitleClass}>{title}</p>}
        <div className={Theme?.ItemsClass}>
          {items.map((item) => {
            return (
              <div className={Theme?.ItemClass} id={item.id?.toString()} onClick={() => onItemClick && onItemClick(item)}>
                {showBadge && item.badgeText && <span className={Theme?.BadgeClass}>{item.badgeText}</span>}
                {item.image && <div className={Theme?.ItemIconClass}>
                  {getImageComponent(item.image, {color: Theme?.ItemIconColor})}
                </div>}
                {item.title && <p className={Theme?.ItemTitleClass}>{item.title}</p>}
              </div>
            );
          })}
          {allowNew && <div className={Theme?.ItemClass} onClick={() => onItemClick && onItemClick({id: -1})}>
            {(newImage) && <div className={Theme?.ItemIconClass}>
              {getImageComponent(newImage, {color: Theme?.ItemIconColor}, "new-shortcut-icon")}
            </div>}
            {newTitle && <p className={Theme?.ItemTitleClass}>{newTitle}</p>}
          </div>}
        </div>
      </div>
    </>
  );
});

export default Shortcutlist;

var shortcutListProps:{
  title?: string
  showBadge?: boolean,
  visible?: boolean
  allowNew?: boolean
  newImage?: string | React.JSX.Element,
  newTitle?: string,
  onItemClick?: ((item: ShortcutItemType) => void)
  items?: Array<ShortcutItemType>
  theme?: ShortcutListTheme
}
export type ShortcutListProps = typeof shortcutListProps

var shortcutListTheme: {
  Class?: string,
  TitleClass?: string,
  ItemsClass?: string,
  ItemClass?: string,
  ItemIconClass?: string,
  ItemIconColor?: string,
  ItemTitleClass?: string,
  BadgeClass?: string,
}
export type ShortcutListTheme = typeof shortcutListTheme

var ShortcutItem: {
  id?: string | number,
  image?: string | React.JSX.Element, 
  title?: string, 
  location?: string, 
  badgeText?: number | string
}
export type ShortcutItemType = typeof ShortcutItem