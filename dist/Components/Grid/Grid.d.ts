import React from "react";
declare const Grid: React.FC<{
    children?: React.ReactNode;
    className?: string;
}>;
export default Grid;
declare var gridTheme: {
    Class?: string;
    RowClass?: string;
    ColumnClass?: string;
    ContainerClass?: string;
    TopScrollClass?: string;
    TopScrollbarClass?: string;
};
export declare type GridTheme = typeof gridTheme;
