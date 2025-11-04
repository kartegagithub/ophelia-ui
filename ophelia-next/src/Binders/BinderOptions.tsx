import { FileData } from "ophelia-core";
import { QueryDataModel } from "./CollectionBinder";

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
  AllowColumnSummarize?: boolean = false;
  AllowCopyAndSave?: boolean = false;
  AllowDetailNavigation?: boolean = true;
  SaveButtonVisibility?: boolean = true;
  DeleteButtonVisibility?: boolean = true;
  RefreshButtonVisibility?: boolean = true;
  IsNewEntity?: boolean = false;
  AllowEdit?: boolean = true;
  DrawViewLinkInsteadOfEdit?: boolean = false;
  UpdateContent?: string = undefined;
  Visible?: boolean = true;
  PageTitleVisibility?: boolean = true;
  HeaderVisibility?: boolean = true;
  UniqueKeyName?: string = "id";
  IsUniqueKeyNumeric?: boolean = true;
  Export?: {
    Types?: Array<ExportOption>;
    Mode?: "remote" | "screenshot" | "custom";
    Callback?: (option: ExportOption) => Promise<ArrayBuffer>;
  } = {
    Types: [
      {
        extension: "xlsx",
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

var exportType: { extension?: string; name?: string; icon?: string | any, columns?: Array<string | undefined>, columnProperties?: Array<{name: string, type: string, enumValues?: Array<{text?: string, value?: string}>}>, schema?: string, entity?: string, queryData?: QueryDataModel, filterEntity?: any };
export type ExportOption = typeof exportType;
