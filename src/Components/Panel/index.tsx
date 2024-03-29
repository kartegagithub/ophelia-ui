import { getAppTheme } from "../../AppTheme";
import React, { KeyboardEventHandler, useMemo } from "react";
import { getImageComponent } from "../Image/Extensions";
const Panel: React.FC<{
  headerText?: string,
  leftIcon?: string | React.JSX.Element | undefined,
  rightIcon?: string | React.JSX.Element | undefined,
  collapsed?: boolean
  id?:string;
  children?: React.ReactNode;
}> = React.memo(({ id, leftIcon = undefined, rightIcon = undefined, collapsed = false, headerText, children }) => {
  const theme = getAppTheme();

  return (
    <>
        <div id={id} className={theme.Panel?.RootClass}>
            {headerText && <div className={theme.Panel?.HeaderClass}>
                {leftIcon && getImageComponent(leftIcon)}
                <div className={theme.Panel?.HeaderTextClass}>
                  {headerText}
                </div>
                {rightIcon && getImageComponent(rightIcon)}
            </div>}
            {children}
        </div>
    </>
  );
});

export default Panel;

var panelTheme: {
  RootClass?: string,
  HeaderClass?: string,
  HeaderTextClass?: string,
}

export type PanelTheme = typeof panelTheme