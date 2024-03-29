import React from "react";
declare const Pagination: React.FC<PaginationProps>;
export default Pagination;
declare var paginationProps: {
    totalDatacount: number;
    datacount: number;
    page: number;
    pageSize: number;
    pageSizes?: Array<number>;
    visible?: boolean;
    pagesTitle?: string;
    pageSizeSelectionText?: string;
    pageUrl: string;
    onChange?: Function;
    onPageSizeChange?: Function;
    children?: React.ReactNode;
    theme?: PaginationTheme;
};
export declare type PaginationProps = typeof paginationProps;
declare var paginationTheme: {
    RootClass?: string;
    PageListClass?: string;
    PageListItemClass?: string;
    PageListItemSelectedClass?: string;
    PageSizeSelectionRootClass?: string;
    PageSizeSelectionClass?: string;
    PagesTitleClass?: string;
};
export declare type PaginationTheme = typeof paginationTheme;
