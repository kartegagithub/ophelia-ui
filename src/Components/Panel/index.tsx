import React from "react";
import { getImageComponent } from "../Image/Extensions";
const Panel: React.FC<{
  headerText?: string;
  leftIcon?: string | React.JSX.Element | undefined;
  rightIcon?: string | React.JSX.Element | undefined;
  collapsed?: boolean;
  id?: string;
  children?: React.ReactNode;
}> = React.memo(
  ({
    id,
    leftIcon = undefined,
    rightIcon = undefined,
    headerText,
    children,
  }) => {
    return (
      <>
        <div id={id} className="oph-panel">
          {headerText && (
            <div className="oph-panel-header">
              {leftIcon && getImageComponent(leftIcon)}
              <div className="oph-panel-header-text">{headerText}</div>
              {rightIcon && getImageComponent(rightIcon)}
            </div>
          )}
          {children}
        </div>
      </>
    );
  }
);
Panel.displayName = "Panel";
export default Panel;
