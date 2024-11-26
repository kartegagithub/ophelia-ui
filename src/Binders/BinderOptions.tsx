import { FileData } from "../Models";

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
  AllowImport?: boolean = false;
  AllowSave?: boolean = true;
  AllowSettings?: boolean = true;
  AllowRefresh?: boolean = true;
  AllowDelete?: boolean = true;
  AllowCopyAndSave?: boolean = false;
  IsNewEntity?: boolean = false;
  AllowEdit?: boolean = true;
  DrawViewLinkInsteadOfEdit?: boolean = false;
  UpdateContent?: string = undefined;
  Visible?: boolean = true;
  PageTitleVisibility?: boolean = true;
  Export?: {
    Types?: Array<ExportOption>;
    Mode?: "remote" | "screenshot" | "custom";
    Callback?: (option: ExportOption) => Promise<ArrayBuffer>;
  } = {
    Types: [
      {
        extension: "xls",
        name: "Excel",
        icon: { name: "excel", fill: "#5B6782" },
      },
    ],
    Mode: "screenshot",
  };
  Import?: {
    FileTypes?: string;
    Message?: string | React.JSX.Element;
    SampleFile?: string | React.JSX.Element;
    Callback?: (file: FileData) => Promise<ArrayBuffer>;
  } = { FileTypes: "*.xlsx,*.csv" };
}

var exportType: { extension?: string; name?: string; icon?: string | any };
export type ExportOption = typeof exportType;
