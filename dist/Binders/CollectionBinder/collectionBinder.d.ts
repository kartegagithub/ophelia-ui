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
            Backdrop?: string | undefined;
        } | undefined;
        Alert?: {
            Class?: string | undefined;
            TextClass?: string | undefined;
            Types?: {
                info?: string | undefined;
                warning?: string | undefined;
                error?: string | undefined;
                success?: string | undefined;
            } | undefined;
        } | undefined;
        Binders?: {
            SubBinderModal?: {
                Class?: string | undefined;
            } | undefined;
        } | undefined;
        InputFields?: {
            RootClass?: string | undefined;
            LabelClass?: string | undefined;
            ErrorMessageClass?: string | undefined;
        } | undefined;
        Tabs?: {
            RootClass?: string | undefined;
            TabHeaderClass?: string | undefined;
            TabContentClass?: string | undefined;
            TabHeaderButtonClass?: string | undefined;
            SelectedTabHeaderButtonClass?: string | undefined;
            TabHeaderButtonContainerClass?: string | undefined;
            TabPaneClass?: string | undefined;
        } | undefined;
        Buttons?: {
            default?: string | undefined;
            primary?: string | undefined;
        } | undefined;
        Drawer?: {
            Class?: string | undefined;
        } | undefined;
        Panel?: {
            RootClass?: string | undefined;
            HeaderClass?: string | undefined;
            HeaderTextClass?: string | undefined;
        } | undefined;
        Pagination?: {
            RootClass?: string | undefined;
            PageListClass?: string | undefined;
            PageListItemClass?: string | undefined;
            PageListItemSelectedClass?: string | undefined;
            PageSizeSelectionRootClass?: string | undefined;
            PageSizeSelectionClass?: string | undefined;
            PagesTitleClass?: string | undefined;
        } | undefined;
        Carousel?: {
            Class?: string | undefined;
            IndicatorClass?: string | undefined;
            RightButtonClass?: string | undefined;
            LeftButtonClass?: string | undefined;
        } | undefined;
        Inputs?: {
            text?: string | undefined;
            textarea?: string | undefined;
            selectbox?: string | undefined;
            filterbox?: string | undefined;
            checkbox?: string | undefined;
            radio?: string | undefined;
            boolean?: string | undefined;
            enum?: string | undefined;
            password?: string | undefined;
            richtext?: string | undefined;
            date?: string | undefined;
            datetime?: string | undefined;
            numeric?: string | undefined;
            label?: string | undefined;
            file?: string | undefined;
            month?: string | undefined;
            email?: string | undefined;
            phone?: string | undefined;
            url?: string | undefined;
            range?: string | undefined;
            time?: string | undefined;
            week?: string | undefined;
        } | undefined;
        Searchbar?: {
            InputClass?: string | undefined;
            SearchClass?: string | undefined;
            RightIconsWrapperClass?: string | undefined;
            SearchIcon?: string | React.JSX.Element | {
                name: string;
                color?: string | undefined;
                fill?: string | undefined;
                size?: number | undefined;
                className?: string | undefined;
                ext1?: string | undefined;
                ext2?: string | undefined;
                ext3?: string | undefined;
            } | undefined;
            MicrophoneIcon?: string | React.JSX.Element | {
                name: string;
                color?: string | undefined;
                fill?: string | undefined;
                size?: number | undefined;
                className?: string | undefined;
                ext1?: string | undefined;
                ext2?: string | undefined;
                ext3?: string | undefined;
            } | undefined;
            BarcodeIcon?: string | React.JSX.Element | {
                name: string;
                color?: string | undefined;
                fill?: string | undefined;
                size?: number | undefined;
                className?: string | undefined;
                ext1?: string | undefined;
                ext2?: string | undefined;
                ext3?: string | undefined;
            } | undefined;
            BadgeClass?: string | undefined;
            ItemClass?: string | undefined;
            FocusedItemClass?: string | undefined;
            ItemIconClass?: string | undefined;
            ItemIconColor?: string | undefined;
            ItemsContainerClass?: string | undefined;
            ItemsScrollableAreaClass?: string | undefined;
            ItemTitleClass?: string | undefined;
        } | undefined;
        ShortcutList?: {
            Class?: string | undefined;
            TitleClass?: string | undefined;
            ItemsClass?: string | undefined;
            ItemClass?: string | undefined;
            ItemIconClass?: string | undefined;
            ItemIconColor?: string | undefined;
            ItemTitleClass?: string | undefined;
            BadgeClass?: string | undefined;
        } | undefined;
        Menu?: {
            Class?: string | undefined;
            Levels: {
                Selected: {
                    1?: string | undefined;
                    2?: string | undefined;
                    3?: string | undefined;
                };
            };
        } | undefined;
        Sidebar?: {
            RootClass?: string | undefined;
            ToogleClass?: string | undefined;
        } | undefined;
        Table?: {
            Icons?: {
                NotFiltered?: string | React.JSX.Element | {
                    name: string;
                    color?: string | undefined;
                    fill?: string | undefined;
                    size?: number | undefined;
                    className?: string | undefined;
                    ext1?: string | undefined;
                    ext2?: string | undefined;
                    ext3?: string | undefined;
                } | undefined;
                Filtered?: string | React.JSX.Element | {
                    name: string;
                    color?: string | undefined;
                    fill?: string | undefined;
                    size?: number | undefined;
                    className?: string | undefined;
                    ext1?: string | undefined;
                    ext2?: string | undefined;
                    ext3?: string | undefined;
                } | undefined;
                NotSorted?: string | React.JSX.Element | {
                    name: string;
                    color?: string | undefined;
                    fill?: string | undefined;
                    size?: number | undefined;
                    className?: string | undefined;
                    ext1?: string | undefined;
                    ext2?: string | undefined;
                    ext3?: string | undefined;
                } | undefined;
                DescSorted?: string | React.JSX.Element | {
                    name: string;
                    color?: string | undefined;
                    fill?: string | undefined;
                    size?: number | undefined;
                    className?: string | undefined;
                    ext1?: string | undefined;
                    ext2?: string | undefined;
                    ext3?: string | undefined;
                } | undefined;
                AscSorted?: string | React.JSX.Element | {
                    name: string;
                    color?: string | undefined;
                    fill?: string | undefined;
                    size?: number | undefined;
                    className?: string | undefined;
                    ext1?: string | undefined;
                    ext2?: string | undefined;
                    ext3?: string | undefined;
                } | undefined;
            } | undefined;
            Class?: string | undefined;
            RowClass?: string | undefined;
            SelectedRowClass?: string | undefined;
            ColumnsRowClass?: string | undefined;
            SelectedColumnClass?: string | undefined;
            ColumnClass?: string | undefined;
            ColumnRootComponentClass?: string | undefined;
            ColumnTitleClass?: string | undefined;
            ColumnButtonsClass?: string | undefined;
            ContainerClass?: string | undefined;
            TopScrollClass?: string | undefined;
            TopScrollbarClass?: string | undefined;
            SelectedCellClass?: string | undefined;
            CellClass?: string | undefined;
            HeadClass?: string | undefined;
            CellTypeClasses?: {
                text?: string | undefined;
                textarea?: string | undefined;
                selectbox?: string | undefined;
                checkbox?: string | undefined;
                radio?: string | undefined;
                boolean?: string | undefined;
                enum?: string | undefined;
                password?: string | undefined;
                richtext?: string | undefined;
                date?: string | undefined;
                datetime?: string | undefined;
                numeric?: string | undefined;
                label?: string | undefined;
                file?: string | undefined;
                month?: string | undefined;
                email?: string | undefined;
                phone?: string | undefined;
                url?: string | undefined;
                range?: string | undefined;
                time?: string | undefined;
                week?: string | undefined;
            } | undefined;
        } | undefined;
        Grid?: {
            Class?: string | undefined;
            RowClass?: string | undefined;
            ColumnClass?: string | undefined;
            ContainerClass?: string | undefined;
            TopScrollClass?: string | undefined;
            TopScrollbarClass?: string | undefined;
        } | undefined;
        Spinner?: {
            Class?: string | undefined;
            TextClass?: string | undefined;
            Image?: string | React.JSX.Element | {
                name: string;
                color?: string | undefined;
                fill?: string | undefined;
                size?: number | undefined;
                className?: string | undefined;
                ext1?: string | undefined;
                ext2?: string | undefined;
                ext3?: string | undefined;
            } | undefined;
        } | undefined;
        IconRating?: {
            Class?: string | undefined;
            TextClass?: string | undefined;
            Icon?: string | React.JSX.Element | {
                name: string;
                color?: string | undefined;
                fill?: string | undefined;
                size?: number | undefined;
                className?: string | undefined;
                ext1?: string | undefined;
                ext2?: string | undefined;
                ext3?: string | undefined;
            } | undefined;
            FilledIcon?: string | React.JSX.Element | {
                name: string;
                color?: string | undefined;
                fill?: string | undefined;
                size?: number | undefined;
                className?: string | undefined;
                ext1?: string | undefined;
                ext2?: string | undefined;
                ext3?: string | undefined;
            } | undefined;
        } | undefined;
        Toast?: {
            Class?: string | undefined;
            TextClass?: string | undefined;
            CloseButtonClass?: string | undefined;
            ImageClass?: string | undefined;
            InfoImage?: string | React.JSX.Element | {
                name: string;
                color?: string | undefined;
                fill?: string | undefined;
                size?: number | undefined;
                className?: string | undefined;
                ext1?: string | undefined;
                ext2?: string | undefined;
                ext3?: string | undefined;
            } | undefined;
            SuccessImage?: string | React.JSX.Element | {
                name: string;
                color?: string | undefined;
                fill?: string | undefined;
                size?: number | undefined;
                className?: string | undefined;
                ext1?: string | undefined;
                ext2?: string | undefined;
                ext3?: string | undefined;
            } | undefined;
            ErrorImage?: string | React.JSX.Element | {
                name: string;
                color?: string | undefined;
                fill?: string | undefined;
                size?: number | undefined;
                className?: string | undefined;
                ext1?: string | undefined;
                ext2?: string | undefined;
                ext3?: string | undefined;
            } | undefined;
            WarningImage?: string | React.JSX.Element | {
                name: string;
                color?: string | undefined;
                fill?: string | undefined;
                size?: number | undefined;
                className?: string | undefined;
                ext1?: string | undefined;
                ext2?: string | undefined;
                ext3?: string | undefined;
            } | undefined;
        } | undefined;
        Notification?: {
            InfoContainer?: string | undefined;
            ErrorContainer?: string | undefined;
            TitleContainer?: string | undefined;
            ContentClass?: string | undefined;
            ImageClass?: string | undefined;
            InfoImage?: string | React.JSX.Element | {
                name: string;
                color?: string | undefined;
                fill?: string | undefined;
                size?: number | undefined;
                className?: string | undefined;
                ext1?: string | undefined;
                ext2?: string | undefined;
                ext3?: string | undefined;
            } | undefined;
            SuccessImage?: string | React.JSX.Element | {
                name: string;
                color?: string | undefined;
                fill?: string | undefined;
                size?: number | undefined;
                className?: string | undefined;
                ext1?: string | undefined;
                ext2?: string | undefined;
                ext3?: string | undefined;
            } | undefined;
            ErrorImage?: string | React.JSX.Element | {
                name: string;
                color?: string | undefined;
                fill?: string | undefined;
                size?: number | undefined;
                className?: string | undefined;
                ext1?: string | undefined;
                ext2?: string | undefined;
                ext3?: string | undefined;
            } | undefined;
            WarningImage?: string | React.JSX.Element | {
                name: string;
                color?: string | undefined;
                fill?: string | undefined;
                size?: number | undefined;
                className?: string | undefined;
                ext1?: string | undefined;
                ext2?: string | undefined;
                ext3?: string | undefined;
            } | undefined;
        } | undefined;
        SpeedDial?: {
            Class?: string | undefined;
            MenuClass?: string | undefined;
            MainButtonClass?: string | undefined;
            DialButtonClass?: string | undefined;
            Image?: string | React.JSX.Element | {
                name: string;
                color?: string | undefined;
                fill?: string | undefined;
                size?: number | undefined;
                className?: string | undefined;
                ext1?: string | undefined;
                ext2?: string | undefined;
                ext3?: string | undefined;
            } | undefined;
        } | undefined;
        Progress?: {
            Class?: string | undefined;
            BarClass?: string | undefined;
        } | undefined;
        Modal?: {
            DefaultZIndex?: string | number | undefined;
            Class?: string | undefined;
            SubClass?: string | undefined;
            ContainerClass?: string | undefined;
            HeaderClass?: string | undefined;
            BodyClass?: string | undefined;
            FooterClass?: string | undefined;
            TitleClass?: string | undefined;
            ButtonClass?: string | undefined;
        } | undefined;
        Dropdown?: {
            Class?: string | undefined;
            ClassWhenInner?: string | undefined;
            ButtonContainerClass?: string | undefined;
            ButtonClass?: string | undefined;
            ContentClass?: string | undefined;
            SuccessClass?: string | undefined;
            ItemClass?: string | undefined;
            CheckboxClass?: string | undefined;
            RadioClass?: string | undefined;
            ItemLabelClass?: string | undefined;
            SearchIcon?: string | React.JSX.Element | {
                name: string;
                color?: string | undefined;
                fill?: string | undefined;
                size?: number | undefined;
                className?: string | undefined;
                ext1?: string | undefined;
                ext2?: string | undefined;
                ext3?: string | undefined;
            } | undefined;
        } | undefined;
        Accordion?: {
            DetailClass?: string | undefined;
            SummaryClass?: string | undefined;
            TitleClass?: string | undefined;
            ContentClass?: string | undefined;
        } | undefined;
        Highlight?: {
            Languages?: string[] | undefined;
        } | undefined;
        Quill?: {
            Formats?: string[] | undefined;
            Toolbar?: any[] | undefined;
            ImageHandler?: ((fileName: string, size: number, buffer: ArrayBuffer, base64: string | undefined) => Promise<string | undefined>) | undefined;
        } | undefined;
        Icons?: {
            DefaultSize?: string | undefined;
            getCustomIconSvg?: ((iconName: string, size?: string | undefined, className?: string | undefined, strokeColor?: string | undefined, fillColor?: string | undefined, ext1?: string | undefined, ext2?: string | undefined, ext3?: string | undefined) => string | React.JSX.Element) | undefined;
            getIconSvg?: ((iconName: string, size?: string | undefined, className?: string | undefined, strokeColor?: string | undefined, fillColor?: string | undefined, ext1?: string | undefined, ext2?: string | undefined, ext3?: string | undefined) => string | React.JSX.Element) | undefined;
        } | undefined;
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
    getData: () => Promise<serviceCollectionResult | undefined>;
    CreateService(): import("../../Service/apiService").default | undefined;
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
    renderCellValue: (row: any, column: TableColumnClass, value?: string | undefined) => string | React.JSX.Element | undefined;
    renderHeader(): React.JSX.Element;
    renderFooter(): React.JSX.Element;
    render(): React.ReactNode;
}
