import React from "react";
import TableClass from "./TableClass";
import AppClient from "../../AppClient";
import { IconProps } from "../Icon";
declare const Table: React.FC<TableProps>;
export default Table;
declare var tableProps: {
    table?: TableClass;
    data?: Array<any>;
    children?: React.ReactNode;
    appClient?: AppClient;
    theme?: TableTheme;
    listener?: {
        onCellClick?: Function;
        onRowClick?: Function;
        renderCellValue?: Function;
        onSortingChanged?: Function;
        onFilteringChanged?: Function;
        onCellValueChanged?: Function;
    };
};
export declare type TableProps = typeof tableProps;
declare var tableTheme: {
    Icons?: {
        NotFiltered?: React.JSX.Element | string | undefined | IconProps;
        Filtered?: React.JSX.Element | string | undefined | IconProps;
        NotSorted?: React.JSX.Element | string | undefined | IconProps;
        DescSorted?: React.JSX.Element | string | undefined | IconProps;
        AscSorted?: React.JSX.Element | string | undefined | IconProps;
    };
    Class?: string;
    RowClass?: string;
    SelectedRowClass?: string;
    ColumnsRowClass?: string;
    SelectedColumnClass?: string;
    ColumnClass?: string;
    ColumnRootComponentClass?: string;
    ColumnTitleClass?: string;
    ColumnButtonsClass?: string;
    ContainerClass?: string;
    TopScrollClass?: string;
    TopScrollbarClass?: string;
    SelectedCellClass?: string;
    CellClass?: string;
    HeadClass?: string;
    CellTypeClasses?: {
        text?: string;
        textarea?: string;
        selectbox?: string;
        checkbox?: string;
        radio?: string;
        boolean?: string;
        enum?: string;
        password?: string;
        richtext?: string;
        date?: string;
        datetime?: string;
        numeric?: string;
        label?: string;
        file?: string;
        month?: string;
        email?: string;
        phone?: string;
        url?: string;
        range?: string;
        time?: string;
        week?: string;
    };
};
export declare type TableTheme = typeof tableTheme;
