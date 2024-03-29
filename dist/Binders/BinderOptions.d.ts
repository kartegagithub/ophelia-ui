export default class BinderOptions {
    PageTitle?: string;
    NewURL?: string;
    ActionURL?: string;
    EditURL?: string;
    ViewURL?: string;
    BackURL?: string;
    AllowBack?: boolean;
    AllowNew?: boolean;
    AllowExport?: boolean;
    AllowSave?: boolean;
    AllowDelete?: boolean;
    IsNewEntity?: boolean;
    AllowEdit?: boolean;
    DrawViewLinkInsteadOfEdit?: boolean;
    UpdateContent?: string;
    Visible?: boolean;
    ExportTypes?: Array<ExportOption>;
    ExportMode?: "remote" | "screenshot" | "custom";
    ExportCallback?: ((option: ExportOption) => Promise<ArrayBuffer>);
}
declare var exportType: {
    extension?: string;
    name?: string;
    icon?: string | any;
};
export declare type ExportOption = typeof exportType;
export {};
