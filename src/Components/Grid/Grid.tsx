import React from "react";
import { getAppTheme } from "../../AppTheme";

const Grid: React.FC<{
  children?: React.ReactNode;
  className?: string
}> = React.memo(({ className, children }) => {
  const theme = getAppTheme();
  return (
    <>
      <div className={theme.Grid?.ContainerClass}>
        <div className={theme.Grid?.TopScrollClass}><div className={theme.Grid?.TopScrollbarClass}></div></div>
        <div className={className ?? theme.Grid?.Class}>
          {children}
        </div>
      </div>
    </>
  );
});

export default Grid;

var gridTheme: {
  Class?: string
  RowClass?: string
  ColumnClass?: string
  ContainerClass?: string
  TopScrollClass?: string
  TopScrollbarClass?: string,
}
export type GridTheme = typeof gridTheme