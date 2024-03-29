import React from "react";
import BinderOptions, { ExportOption } from "../BinderOptions";
import AppClient from "../../AppClient";
import InputField from "../../Components/InputFields/inputField";
import ServiceMessage from "../../Service/serviceMessage";
import { LoadingState } from "../../Enums/loadingState";
import CollectionBinder from "../CollectionBinder/collectionBinder";
export declare class EntityBinderProps {
    Options?: BinderOptions;
    id?: string | number | string[];
    shownInParent?: boolean;
    Data?: any;
    AppClient: AppClient | undefined;
    useI18N?: boolean;
    parent?: EntityBinder<{}> | CollectionBinder<{}>;
    pageTitle?: string;
}
export default class EntityBinder<P> extends React.Component<P & EntityBinderProps, {
    initialized: boolean;
    loadingState: LoadingState;
    id?: string | number | string[];
    data: any;
    messages: Array<ServiceMessage>;
    languageID: number;
}> {
    Key: number;
    Controller: string;
    Entity: any;
    AjaxBinder: boolean;
    Options: BinderOptions;
    Renderer: any;
    InputFields: Array<typeof InputField>;
    UseI18n: boolean;
    Languages: Array<{
        id: number;
        name: string;
        isoCode: string;
    }>;
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
    constructor(props: P & EntityBinderProps);
    Init(): void;
    Configure(): void;
    beforeSendRequest(data: any): any;
    SetDataSource(controller: string, entity: string): void;
    registerField(field: any): void;
    getI18NProperty(): string;
    getI18NData(): any;
    addI18NData(): any;
    getEditUrl: (id?: number) => string;
    OnAfterSave(): void;
    getBackUrl: () => string;
    getActionPath: () => string;
    useTabs(...children: React.ReactNode[]): React.JSX.Element;
    useTab(id: string, text?: string, active?: boolean, ...children: React.ReactNode[]): React.JSX.Element;
    usePanel(text?: string, collapsed?: boolean, leftIcon?: string | React.JSX.Element, rightIcon?: string | React.JSX.Element, ...children: React.ReactNode[]): React.JSX.Element;
    useInput(props: any): React.JSX.Element;
    useI18NLanguageSelection(): React.JSX.Element;
    CreateService(): import("../../Service/apiService").default;
    onButtonClicked: (key: string, params?: any) => Promise<void>;
    getExportFileName(): string;
    onExportButtonClicked(option: ExportOption): Promise<void>;
    resetMetaTags(): void;
    setMetaTags(data: any): void;
    validateFields(): boolean;
    GetEntity(id: any, data: any): Promise<any>;
    SaveEntity(): Promise<void>;
    DeleteEntity(): Promise<void>;
    getFieldData: (field: any) => any;
    setFieldData(name: string, value: any): void;
    setInitData(firstLoad?: boolean, resetForNew?: boolean): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    onChildAction(type: string): void;
    render(): React.ReactNode;
    renderHeader(): React.JSX.Element;
    renderFooter(): React.JSX.Element;
    renderBinder(): React.ReactNode | React.ReactNode[];
}
