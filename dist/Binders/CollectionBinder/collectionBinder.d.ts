import React from "react";
import Config from "./config";
import AppClient from "../../AppClient";
import BinderOptions, { ExportOption } from "../BinderOptions";
import TableColumnClass from "../../Components/Table/TableColumnClass";
import serviceCollectionResult from "../../Service/serviceCollectionResult";
import { LoadingState } from "../../Enums/loadingState";
import ServiceMessage from "../../Service/serviceMessage";
import QuerySorter from "./query/querySorter";
import EntityBinder from "../EntityBinder/entityBinder";
export declare class CollectionBinderProps {
    config?: Config;
    options?: BinderOptions;
    initialFilters?: any;
    data?: any;
    AppClient: AppClient | undefined;
    shownInParent?: boolean;
    pageTitle?: string;
    parent?: EntityBinder<{}> | CollectionBinder<{}>;
}
export default class CollectionBinder<P> extends React.Component<P & CollectionBinderProps, {
    path: string;
    initialized: boolean;
    clickedRowIndex: number;
    loadingState: LoadingState;
    totalDatacount: number;
    page: number;
    pageSize: number;
    filter: any;
    sorter: QuerySorter;
    data: any;
    messages: Array<ServiceMessage>;
    languageID: number;
}> {
    Config: Config;
    Options: BinderOptions;
    DefaultLanguageID: number;
    i18nProperty: string;
    Theme: Readonly<{
        Common?: {
            Backdrop?: string;
        };
        Alert?: {
            Class?: string;
            TextClass?: string;
            Types?: {
                info?: string;
                warning?: string;
                error?: string;
                success?: string;
            };
        };
        Binders?: {
            SubBinderModal?: {
                Class?: string;
            };
        };
        InputFields?: {
            RootClass?: string;
            LabelClass?: string;
            ErrorMessageClass?: string;
        };
        Tabs?: {
            RootClass?: string;
            TabHeaderClass?: string;
            TabContentClass?: string;
            TabHeaderButtonClass?: string;
            SelectedTabHeaderButtonClass?: string;
            TabHeaderButtonContainerClass?: string;
            TabPaneClass?: string;
        };
        Buttons?: {
            default?: string;
            primary?: string;
        };
        Drawer?: {
            Class?: string;
        };
        Panel?: {
            RootClass?: string;
            HeaderClass?: string;
            HeaderTextClass?: string;
        };
        Pagination?: {
            RootClass?: string;
            PageListClass?: string;
            PageListItemClass?: string;
            PageListItemSelectedClass?: string;
            PageSizeSelectionRootClass?: string;
            PageSizeSelectionClass?: string;
            PagesTitleClass?: string;
        };
        Carousel?: {
            Class?: string;
            IndicatorClass?: string;
            RightButtonClass?: string;
            LeftButtonClass?: string;
        };
        Inputs?: {
            text?: string;
            textarea?: string;
            selectbox?: string;
            filterbox?: string;
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
        Searchbar?: {
            InputClass?: string;
            SearchClass?: string;
            RightIconsWrapperClass?: string;
            SearchIcon?: string | React.JSX.Element | {
                name: string;
                color?: string;
                fill?: string;
                size?: number;
                className?: string;
                ext1?: string;
                ext2?: string;
                ext3?: string;
            };
            MicrophoneIcon?: string | React.JSX.Element | {
                name: string;
                color?: string;
                fill?: string;
                size?: number;
                className?: string;
                ext1?: string;
                ext2?: string;
                ext3?: string;
            };
            BarcodeIcon?: string | React.JSX.Element | {
                name: string;
                color?: string;
                fill?: string;
                size?: number;
                className?: string;
                ext1?: string;
                ext2?: string;
                ext3?: string;
            };
            BadgeClass?: string;
            ItemClass?: string;
            FocusedItemClass?: string;
            ItemIconClass?: string;
            ItemIconColor?: string;
            ItemsContainerClass?: string;
            ItemsScrollableAreaClass?: string;
            ItemTitleClass?: string;
        };
        ShortcutList?: {
            Class?: string;
            TitleClass?: string;
            ItemsClass?: string;
            ItemClass?: string;
            ItemIconClass?: string;
            ItemIconColor?: string;
            ItemTitleClass?: string;
            BadgeClass?: string;
        };
        Menu?: {
            Class?: string;
            Levels: {
                Selected: {
                    1?: string;
                    2?: string;
                    3?: string;
                };
            };
        };
        Sidebar?: {
            RootClass?: string;
            ToogleClass?: string;
        };
        Table?: {
            Icons?: {
                NotFiltered?: string | React.JSX.Element | {
                    name: string;
                    color?: string;
                    fill?: string;
                    size?: number;
                    className?: string;
                    ext1?: string;
                    ext2?: string;
                    ext3?: string;
                };
                Filtered?: string | React.JSX.Element | {
                    name: string;
                    color?: string;
                    fill?: string;
                    size?: number;
                    className?: string;
                    ext1?: string;
                    ext2?: string;
                    ext3?: string;
                };
                NotSorted?: string | React.JSX.Element | {
                    name: string;
                    color?: string;
                    fill?: string;
                    size?: number;
                    className?: string;
                    ext1?: string;
                    ext2?: string;
                    ext3?: string;
                };
                DescSorted?: string | React.JSX.Element | {
                    name: string;
                    color?: string;
                    fill?: string;
                    size?: number;
                    className?: string;
                    ext1?: string;
                    ext2?: string;
                    ext3?: string;
                };
                AscSorted?: string | React.JSX.Element | {
                    name: string;
                    color?: string;
                    fill?: string;
                    size?: number;
                    className?: string;
                    ext1?: string;
                    ext2?: string;
                    ext3?: string;
                };
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
        Grid?: {
            Class?: string;
            RowClass?: string;
            ColumnClass?: string;
            ContainerClass?: string;
            TopScrollClass?: string;
            TopScrollbarClass?: string;
        };
        Spinner?: {
            Class?: string;
            TextClass?: string;
            Image?: string | React.JSX.Element | {
                name: string;
                color?: string;
                fill?: string;
                size?: number;
                className?: string;
                ext1?: string;
                ext2?: string;
                ext3?: string;
            };
        };
        IconRating?: {
            Class?: string;
            TextClass?: string;
            Icon?: string | React.JSX.Element | {
                name: string;
                color?: string;
                fill?: string;
                size?: number;
                className?: string;
                ext1?: string;
                ext2?: string;
                ext3?: string;
            };
            FilledIcon?: string | React.JSX.Element | {
                name: string;
                color?: string;
                fill?: string;
                size?: number;
                className?: string;
                ext1?: string;
                ext2?: string;
                ext3?: string;
            };
        };
        Toast?: {
            Class?: string;
            TextClass?: string;
            CloseButtonClass?: string;
            ImageClass?: string;
            InfoImage?: string | React.JSX.Element | {
                name: string;
                color?: string;
                fill?: string;
                size?: number;
                className?: string;
                ext1?: string;
                ext2?: string;
                ext3?: string;
            };
            SuccessImage?: string | React.JSX.Element | {
                name: string;
                color?: string;
                fill?: string;
                size?: number;
                className?: string;
                ext1?: string;
                ext2?: string;
                ext3?: string;
            };
            ErrorImage?: string | React.JSX.Element | {
                name: string;
                color?: string;
                fill?: string;
                size?: number;
                className?: string;
                ext1?: string;
                ext2?: string;
                ext3?: string;
            };
            WarningImage?: string | React.JSX.Element | {
                name: string;
                color?: string;
                fill?: string;
                size?: number;
                className?: string;
                ext1?: string;
                ext2?: string;
                ext3?: string;
            };
        };
        Notification?: {
            InfoContainer?: string;
            ErrorContainer?: string;
            TitleContainer?: string;
            ContentClass?: string;
            ImageClass?: string;
            InfoImage?: string | React.JSX.Element | {
                name: string;
                color?: string;
                fill?: string;
                size?: number;
                className?: string;
                ext1?: string;
                ext2?: string;
                ext3?: string;
            };
            SuccessImage?: string | React.JSX.Element | {
                name: string;
                color?: string;
                fill?: string;
                size?: number;
                className?: string;
                ext1?: string;
                ext2?: string;
                ext3?: string;
            };
            ErrorImage?: string | React.JSX.Element | {
                name: string;
                color?: string;
                fill?: string;
                size?: number;
                className?: string;
                ext1?: string;
                ext2?: string;
                ext3?: string;
            };
            WarningImage?: string | React.JSX.Element | {
                name: string;
                color?: string;
                fill?: string;
                size?: number;
                className?: string;
                ext1?: string;
                ext2?: string;
                ext3?: string;
            };
        };
        SpeedDial?: {
            Class?: string;
            MenuClass?: string;
            MainButtonClass?: string;
            DialButtonClass?: string;
            Image?: string | React.JSX.Element | {
                name: string;
                color?: string;
                fill?: string;
                size?: number;
                className?: string;
                ext1?: string;
                ext2?: string;
                ext3?: string;
            };
        };
        Progress?: {
            Class?: string;
            BarClass?: string;
        };
        Modal?: {
            DefaultZIndex?: string | number;
            Class?: string;
            SubClass?: string;
            ContainerClass?: string;
            HeaderClass?: string;
            BodyClass?: string;
            FooterClass?: string;
            TitleClass?: string;
            ButtonClass?: string;
        };
        Dropdown?: {
            Class?: string;
            ClassWhenInner?: string;
            ButtonContainerClass?: string;
            ButtonClass?: string;
            ContentClass?: string;
            SuccessClass?: string;
            ItemClass?: string;
            CheckboxClass?: string;
            RadioClass?: string;
            ItemLabelClass?: string;
            SearchIcon?: string | React.JSX.Element | {
                name: string;
                color?: string;
                fill?: string;
                size?: number;
                className?: string;
                ext1?: string;
                ext2?: string;
                ext3?: string;
            };
        };
        Accordion?: {
            DetailClass?: string;
            SummaryClass?: string;
            TitleClass?: string;
            ContentClass?: string;
        };
        Highlight?: {
            Languages?: string[];
        };
        Quill?: {
            Formats?: string[];
            Toolbar?: any[];
            ImageHandler?: (fileName: string, size: number, buffer: ArrayBuffer, base64: string) => Promise<string>;
        };
        Icons?: {
            DefaultSize?: string;
            getCustomIconSvg?: (iconName: string, size?: string, className?: string, strokeColor?: string, fillColor?: string, ext1?: string, ext2?: string, ext3?: string) => string | React.JSX.Element;
            getIconSvg?: (iconName: string, size?: string, className?: string, strokeColor?: string, fillColor?: string, ext1?: string, ext2?: string, ext3?: string) => string | React.JSX.Element;
        };
    }>;
    RootElementRef: React.RefObject<HTMLDivElement>;
    Init(): void;
    Configure(): void;
    ProcessColumns(): void;
    SetColumns(columns: Array<TableColumnClass>): void;
    SetDataSource(schema: string, entity: string, pluralEntity?: string): void;
    SetDataSourcePath(path: string): void;
    componentDidMount(): void;
    setInitData(firstLoad?: boolean): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    setMetaTags(data: any): void;
    getData: () => Promise<serviceCollectionResult>;
    CreateService(): import("../../Service/apiService").default;
    OnBeforeRender(): void;
    getEditUrl(id?: number): string;
    getExportFileName(): string;
    onExportButtonClicked(option: ExportOption): Promise<void>;
    getViewUrl(id?: number): string;
    getBackUrl(): string;
    getLink: (record: any) => string;
    onButtonClicked: (key: string) => Promise<void>;
    onCellValueChanged(row: any, column: TableColumnClass): void;
    SaveEntity(data: any): Promise<void>;
    onCellClick(e: React.MouseEvent<HTMLTableCellElement>, row: any, column: TableColumnClass, rowIndex: number, columnIndex: number): void;
    onRowClick(e: any, index: number): void;
    renderEntityBinder(entity: any): React.JSX.Element;
    onChildAction(type: string): void;
    onPageChange(i: number): void;
    onPageSizeChange(i: number): void;
    onSortingChanged(column: TableColumnClass, direction: string): void;
    onFilteringChanged(filteredColumns: Array<TableColumnClass>): void;
    renderCellValue: (row: any, column: TableColumnClass, value?: string) => string | React.JSX.Element;
    renderHeader(): React.JSX.Element;
    renderFooter(): React.JSX.Element;
    render(): React.ReactNode;
}
