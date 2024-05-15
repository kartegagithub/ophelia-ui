export default class BinderOptions {
  PageTitle?: string = undefined;
  NewURL?: string = undefined;
  ActionURL?: string = undefined;
  EditURL?: string = undefined;
  ViewURL?: string = undefined;
  BackURL?: string = undefined;
  AllowBack?: boolean = true;
  AllowNew?: boolean = true;
  AllowExport?: boolean = true;
  AllowSave?: boolean = true;
  AllowDelete?: boolean = true;
  IsNewEntity?: boolean = false;
  AllowEdit?: boolean = true;
  DrawViewLinkInsteadOfEdit?: boolean = false;
  UpdateContent?: string = undefined;
  Visible?: boolean = true;
  PageTitleVisibility?: boolean = true
  ExportTypes?: Array<ExportOption> = [
    {extension: "xls", name: "Excel", icon:{name: "excel", fill: "#5B6782"}},
    {extension: "pdf", name: "PDF", icon: {name: "pdf", color: "#000", fill: "#5B6782"}}
  ];
  ExportMode?: "remote" | "screenshot" | "custom" = "screenshot";
  ExportCallback?: ((option: ExportOption) => Promise<ArrayBuffer>)
}

var exportType: {extension?: string, name?: string, icon?: string | any}
export type ExportOption = typeof exportType