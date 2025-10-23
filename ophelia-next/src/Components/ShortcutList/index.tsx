import React from "react";
import { getAppTheme } from "../../AppTheme";
import { getImageComponent } from "../Image/Extensions";

const Shortcutlist: React.FC<ShortcutListProps> = React.memo(
  ({
    onItemClick = undefined,
    newImage = undefined,
    allowNew = true,
    title = undefined,
    showBadge = true,
    visible = true,
    newTitle = undefined,
    items = [],
    id,
  }) => {
    if (!visible) return <></>;
    return (
      <>
        <div id={id} className={"oph-shortcutlist"}>
          {title && <p className={"oph-shortcutlist-title"}>{title}</p>}
          <div className={"oph-shortcutlist-items"}>
            {items.map((item, i) => {
              return (
                <div
                  key={i}
                  className={"oph-shortcutlist-item"}
                  id={item.id?.toString()}
                  onClick={() => onItemClick && onItemClick(item)}
                >
                  {showBadge && item.badgeText && (
                    <span className={"oph-shortcutlist-item-badge"}>
                      {item.badgeText}
                    </span>
                  )}
                  {item.image && (
                    <div className={"oph-shortcutlist-item-icon"}>
                      {getImageComponent(item.image, {
                        color: "#252387",
                        width: 15,
                        height: 15,
                      })}
                    </div>
                  )}
                  {item.title && (
                    <p className={"oph-shortcutlist-item-title"}>
                      {item.title}
                    </p>
                  )}
                </div>
              );
            })}
            {allowNew && (
              <div
                className={"oph-shortcutlist-item"}
                onClick={() => onItemClick && onItemClick({ id: -1 })}
              >
                {newImage && (
                  <div className={"oph-shortcutlist-item-icon"}>
                    {getImageComponent(
                      newImage,
                      { color: "#252387", width: 15, height: 15 },
                      "new-shortcut-icon"
                    )}
                  </div>
                )}
                {newTitle && (
                  <p className={"oph-shortcutlist-item-title"}>{newTitle}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);

Shortcutlist.displayName = "Shortcutlist";
export default Shortcutlist;

var shortcutListProps: {
  title?: string;
  showBadge?: boolean;
  visible?: boolean;
  allowNew?: boolean;
  newImage?: string | React.JSX.Element;
  newTitle?: string;
  onItemClick?: (item: ShortcutItemType) => void;
  items?: Array<ShortcutItemType>;
  id?: string;
};
export type ShortcutListProps = typeof shortcutListProps;
var ShortcutItem: {
  id?: string | number;
  image?: string | React.JSX.Element;
  title?: string;
  location?: string;
  badgeText?: number | string;
};
export type ShortcutItemType = typeof ShortcutItem;
