import React, { KeyboardEventHandler, MouseEventHandler, useMemo, useState } from "react";
import TableClass from "../Table/TableClass";
import TableColumnClass from "../Table/TableColumnClass";
import InputField from "../InputFields/inputField";
import Modal from "../Modal/Modal";
import { getObjectValue, randomId } from "../../../Ophelia/Extensions/ReflectionExtensions";
import { getAppTheme } from "../../AppTheme";
import { getImageComponent } from "../Image/Extensions";
import GridRow from "./GridRow";
import GridColumn from "./GridColumn";

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