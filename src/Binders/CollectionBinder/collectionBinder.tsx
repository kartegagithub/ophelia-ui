import React from "react";
import Config from "./config";
import AppClient from "../../AppClient";
import BinderOptions, { ExportOption } from "../BinderOptions";
import TableColumnClass from "../../Components/Table/TableColumnClass";
import Table from "../../Components/Table/Table";
import Link from "next/link";
import serviceCollectionResult from "../../Service/serviceCollectionResult";
import { LoadingState } from "../../Enums/loadingState";
import ServiceMessage from "../../Service/serviceMessage";
import Pluralize from 'pluralize';
import Pagination from "../../Components/Pagination";
import Router from "next/router";
import { getQueryParam, queryParamsAsObject, pascalize, replaceQueryParam, removeLastPropName, formatString, clone } from "../../Extensions/StringExtensions";
import QuerySorter from "./query/querySorter";
import QueryData from "./query/queryData";
import { getAppTheme } from "../../AppTheme";
import { randomKey, setObjectValue, validateKeyName } from "../../Extensions/ReflectionExtensions";
import { resolveMimeType } from "../../Extensions/MimeTypeResolver";
import { ExcelExporter } from "../../Exporters/ExcelExporter";
import Modal from "../../Components/Modal";
import EntityBinder from "../EntityBinder/entityBinder";
import { raiseCustomEvent } from "../../Extensions/DocumentExtension";
import { EntityOperations } from "../EntityOperations";
import Drawer from "../../Components/Drawer";
import ContentLoading from "../../Components/ContentLoading";
import ImportModal from "../../Components/Modal/ImportModal";
import { FileData } from "../../Models";
import PersistentConfig from "./layout/persistentConfig";
import PersistentColumnConfig from "./layout/persistentColumnConfig";
import { Button, CheckboxInput, getImageComponent, Label } from "../../Components";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { base64ToArrayBuffer, enumToArray, getObjectValue, insertToIndex } from "../../Extensions";
import { DataComparison } from "./query/queryFilter";
import moment from "moment";
export class CollectionBinderProps{
  config?: Config
  options?: BinderOptions
  initialFilters?: any
  manualFilters?: Array<string>
  data?: any
  AppClient: AppClient | undefined
  shownInParent?: boolean
  pageTitle?: string
  parent?: EntityBinder<{}> | CollectionBinder<{}>
  viewId?: string
  checkedItems?: Array<any>
  className?: string
  readonly?: boolean
  listener?: {
    onCheckedItemsChanged?: (items: Array<any>) => void,
    onCellClick?: (e: any, row: any, column: TableColumnClass, rowIndex: number, columnIndex: number) => void
    onDataChanged?: (data?: Array<any>) => void
  }
}
export default class CollectionBinder<P> extends React.Component<P & CollectionBinderProps, {
  dataIndex: number, 
  path: string, 
  initialized: boolean, 
  clickedRowIndex: number, 
  loadingState: LoadingState, 
  totalDatacount: number, 
  page: number, 
  pageSize: number, 
  filter: any, 
  manualFilter: any, 
  sorter: QuerySorter, 
  data: any, 
  messages: Array<ServiceMessage>, 
  languageID: number, 
  childState: any, 
  viewId?: string,
  showingSettingsModal?: boolean,
  rerenderKey?: any,
  checkedItems?: Array<any>
  columnData?: any, 
  summarizeState?: boolean,
  importState: {
    data?: any, 
    isImporting?: boolean, 
    importKey?: string, 
    importRequested?: boolean
  }}> {

  Config: Config = new Config();
  Options: BinderOptions = new BinderOptions();
  DefaultLanguageID: number = 0
  UserLanguageID: number = 0
  Theme = getAppTheme()
  RootElementRef = React.createRef<HTMLDivElement>();
  EntityOperations: EntityOperations
  Mounted: boolean = false;
  PersistentSettings?: PersistentConfig
  private exPersistentSettings?: PersistentConfig
  constructor(props: P & CollectionBinderProps){
    super(props)
    this.EntityOperations = new EntityOperations();
    if(props.AppClient) this.EntityOperations.Service = props.AppClient.CreateService()
  }

  Init(){
    try {
      if(this.state && this.state.initialized) return;

      var newConfig = new Config();
      if(this.props.config)
        newConfig = { ...newConfig, ...this.props.config };
      this.Config = newConfig;
      if(this.props.options)
        this.Options = { ...this.Options, ...this.props.options };
      this.Options.AllowSave = false;
      this.Options.AllowDelete = false;
      if(this.props.pageTitle && !this.Options.PageTitle) this.Options.PageTitle = this.props.pageTitle;
      this.Configure();
      this.EntityOperations.UpdateURL = `${this.Config.Schema}/update${this.Config.Entity}`
      this.EntityOperations.GetEntityURL = `${this.Config.Schema}/get${this.Config.Entity}`
      if(this.Config.Entity) this.EntityOperations.Entity = this.Config.Entity;
      this.EntityOperations.UseI18n = true
      if(this.props.readonly == true){
        this.Options.AllowEdit = false;
        this.Options.AllowSave = false;
        this.Options.AllowDelete = false;
        this.Options.AllowSettings = false;
      }
      this.ProcessColumns();
      this.setInitData(true); 
    } catch (error) {
      console.error(error);
    }
  }
  Configure() {
    
  }
  ProcessColumns(){
    if(this.Config.Table){
      this.Config.Table.Columns.forEach((column) => {
        if(!column.HeaderText)
          column.HeaderText = this.props.AppClient?.Translate(pascalize(removeLastPropName(column.PropertyName, "ID")))
        if(column.AllowFiltering){
          if(!column.Filtering) column.Filtering = {};
        }
        if(this.props.readonly == true){
          column.AllowEditing = false;
        }
      });
    }
  }
  ValidateColumns(data: Array<any>){
    if(this.Config.Table && data && data.length > 0){
      this.Config.Table.Columns.forEach((column) => {
        column.PropertyName = validateKeyName(data[0], column.PropertyName);
      });
    }
  }
  SetColumns(columns: Array<TableColumnClass>){
    if(this.Config.Table)
      this.Config.Table.Columns = columns;
  }
  SetDataSource(schema: string, entity: string, pluralEntity: string = "") {
    this.Config.Entity = entity;
    this.Config.Schema = schema;
    if(!pluralEntity) pluralEntity = Pluralize(entity);
    this.SetDataSourcePath(schema + "/Get" + this.ValidatePluralize(entity, pluralEntity))
  }
  ValidatePluralize(name: string, plural: string){
    return plural;
  }
  SetDataSourcePath(path: string) {
    this.Config.DataSourcePath = path;
  }

  componentDidMount(){
    this.Mounted = true;
    this.Init();
  }

  async setInitData(firstLoad: boolean = false){
    if(!firstLoad) return;

    var data: any = undefined;
    if(firstLoad) data = this.props.data 
    var viewID: string = "";
    if(!this.state?.viewId) viewID = this.props.shownInParent ? randomKey(4): "";
    else viewID = this.state.viewId;

    var page = parseInt(getQueryParam(viewID + "page", 1));
    var pageSize = parseInt(getQueryParam(viewID + "pageSize", 25));
    var sortBy = getQueryParam(viewID + "sortBy", "");
    var sortDirection = getQueryParam(viewID + "sortDirection", "");
    var filters = queryParamsAsObject(viewID + "Filters.", true)
    var comparisons = queryParamsAsObject(viewID + "Comp.", true)
    var sortedColumn = this.Config?.Table?.Columns.find((column) => column.PropertyName === sortBy)
    if(sortedColumn){
      sortedColumn.IsSorted = true;
      sortedColumn.SortDirection = sortDirection;
    }
    this.Config?.Table?.Columns?.forEach((column) => {
      if(!column.Filtering) column.Filtering = {};
      if(!column.Filtering.Name) column.Filtering.Name = removeLastPropName(column.PropertyName, "ID", true)
      if(filters){
        var fieldName = column.Filtering?.ValueName ?? column.Filtering?.Name ?? column.PropertyName;
        if(comparisons[fieldName] && parseInt(comparisons[fieldName]) == DataComparison.Between){
          column.IsFiltered = true;
          column.Filtering.LowValue = filters[fieldName + "Low"]
          column.Filtering.HighValue = filters[fieldName + "High"]
          column.Filtering.Comparison = parseInt(comparisons[fieldName]);
          return;
        }
        else if(filters[fieldName]){
          column.IsFiltered = true;
          column.Filtering.Value = filters[fieldName]
          if(comparisons[fieldName]) column.Filtering.Comparison = parseInt(comparisons[fieldName]);
          return;
        }
      }
      column.IsFiltered = false;
      column.Filtering.Value = undefined
    })   

    if(!this.PersistentSettings){
      this.PersistentSettings = {};
      var path = Router.asPath;
      if(path.indexOf("?") > 1) path = path.substring(0, path.indexOf("?")).replace("?", "");
      
      this.PersistentSettings = await this.GetPersistentSetting(path, this.Config.DataSourcePath);
      if(!this.PersistentSettings) this.PersistentSettings = { PageURL: path, BinderName: this.Config.DataSourcePath, Columns: []};
      if(!this.PersistentSettings.Columns) this.PersistentSettings.Columns = [];
      if(!this.PersistentSettings.PageURL) this.PersistentSettings.PageURL = path;
      if(!this.PersistentSettings.PageURL) this.PersistentSettings.BinderName = this.Config.DataSourcePath;
      this.ApplySettings(this.PersistentSettings);
    }

    var loadingState = data? LoadingState.Loaded: LoadingState.Waiting;
    if(this.state && this.state.loadingState == LoadingState.Loading)
      loadingState = LoadingState.Loading;

    if(!this.props.shownInParent){
      this.setState({checkedItems: this.props.checkedItems ?? [], viewId: viewID, dataIndex: 0, path: Router.asPath, clickedRowIndex: -2, initialized: true, loadingState: loadingState, page: page, pageSize: pageSize, filter: filters, sorter: {name: sortBy, ascending : sortDirection === "ASC"}, data: data, messages: [], languageID: this.UserLanguageID})
    }
    else{
      setTimeout(() => {
        this.setState({checkedItems: this.props.checkedItems ?? [], viewId: viewID, dataIndex: 0, path: Router.asPath, clickedRowIndex: -2, initialized: true, loadingState: loadingState, page: page, pageSize: pageSize, filter: filters, sorter: {name: sortBy, ascending : sortDirection === "ASC"}, data: data, messages: [], languageID: this.UserLanguageID})
      }, 1000);
    }
  }
  ApplySettings(persistentSettings: PersistentConfig){
    if(persistentSettings.Columns && persistentSettings.Columns.length > 0 && this.Config.Table?.Columns){
      persistentSettings.Columns.forEach((item) =>{
        var column = this.Config.Table?.Columns.find((col) => col.PropertyName == item.Name);
        if(column){
          if(item.Width) column.Width = item.Width;
          if(item.SortOrder) column.SortOrder = item.SortOrder;
          if(item.Visible != undefined) column.Visible = item.Visible;
          else column.Visible = true;
          item.Text = column.HeaderText;
        }
      });

      this.Config.Table.Columns = this.Config.Table.Columns.sort((a,b) => (a.SortOrder ?? 0) - (b.SortOrder ?? 0))
    }
  }
  async GetPersistentSetting(pageURL: string, binderName?: string): Promise<PersistentConfig | undefined> {
    return undefined;
  }
  componentDidUpdate(prevProps: any, prevState: any){
    try {
      if(!this.state) return;
      if(this.state.path != Router.asPath || (this.state.loadingState == LoadingState.Loaded && !this.state.data)){
        this.setInitData(!this.props.shownInParent && this.state.path != Router.asPath).then(() => this.onAfterSetData());
      }
      else if(this.state.loadingState === LoadingState.Waiting){
        // console.log("loading binder data")
        //console.log("Reiniting binder", prevState, this.state)
        this.getData().then((data) => {
          this.onAfterSetData();
          if(data && data.data){
            this.ValidateColumns(data.data)
            this.setState({dataIndex: this.state.dataIndex + 1, columnData: data.columnData, checkedItems: this.state.checkedItems, path: Router.asPath, data: data.data, totalDatacount: data.totalDataCount, messages: data.messages})
          }
          else if(data)
            this.setState({dataIndex: this.state.dataIndex + 1, columnData: data.columnData, checkedItems: this.state.checkedItems, path: Router.asPath, data: [], totalDatacount: 0, messages: data.messages})
        })
      }
      else{
        if(!this.props.shownInParent) this.props.AppClient?.UpdateMetaTags();
      } 
    } catch (error) {
      console.error(error)
    }
  }
  onAfterSetData(){

  }
  setMetaTags(data: any){
    if(!this.state.data || !this.props.AppClient || !this.Config.Entity) return
    if(!this.props.AppClient.DynamicSEO){
      this.props.AppClient.DynamicSEO = {};
    } 
    if(!this.props.AppClient.DynamicSEO.Title) this.props.AppClient.DynamicSEO.Title = Pluralize(this.Config.Entity)

    if(!this.Options.PageTitle) this.Options.PageTitle = this.props.AppClient.DynamicSEO.Title;
    if(!this.Options.PageTitle) this.Options.PageTitle = this.props.AppClient?.Translate(this.Config.Entity + "List");
  }

  async getData () {
    //console.log("getdata", this.state)
    if(this.state?.importState && this.state.importState.isImporting && this.state.importState.data){
      const data = new serviceCollectionResult();
      data.data = this.state.importState.data 
      data.totalDataCount = this.state.importState.data?.length
      this.setState({loadingState: LoadingState.Loaded})
      return data;
    }
    if(this.props.data){
      const data = new serviceCollectionResult();
      data.data = this.props.data 
      data.totalDataCount = this.props.data?.length
      this.setState({loadingState: LoadingState.Loaded})
      return data;
    }
    else if(this.Config.DataSourcePath){
      this.setState({loadingState: LoadingState.Loading})
      try {
        var queryData = new QueryData()
        if(this.Config.Table?.Columns)
          queryData.processQuery(this.Config.Table?.Columns, this.state.filter, this.state.sorter, this.props.manualFilters, this.Options.AllowColumnSummarize && this.state.summarizeState)
        
        var initialFilters = this.props.initialFilters ?? {};
        if(this.state.filter && this.props.manualFilters && this.props.manualFilters.length > 0){
          var manualFilters: any = {};
          for (let index = 0; index < Object.keys(this.state.filter).length; index++) {
            const key = Object.keys(this.state.filter)[index];
            if(this.props.manualFilters.indexOf(key) > -1){
              manualFilters[key] = this.state.filter[key];
            }            
          }
          initialFilters = {...initialFilters, ...manualFilters};
        }
        var postData = {
          Page: this.state.page,
          PageSize: this.state.pageSize,
          Data: initialFilters,
          QueryData: queryData.model
        }

        if(this.Config.beforeSendRequest)
          postData = this.Config.beforeSendRequest(postData);
        
        const data = await this.props.AppClient?.CreateService()?.CreateEndpoint(
          this.Config.DataSourcePath,
          { Payload: postData }
        ).call() as serviceCollectionResult;
        this.setState({loadingState: LoadingState.Loaded})
        if(!data){
          raiseCustomEvent("notification", { type: "error", title: this.props.AppClient?.Translate("Error"), description: this.props.AppClient?.Translate("CouldNotRetrieveData")  })
          var msg = new ServiceMessage();
          msg.description = this.props.AppClient?.Translate("CouldNotRetrieveData") ?? ""
          return {data: [], columnData: undefined, totalDataCount: 0, messages: [ msg]}
        }
        else this.props.parent?.onChildAction("ListChanged", {newData: data.data, columnData: data.columnData, key: this.props.viewId});
        if(this.props.listener && this.props.listener.onDataChanged) this.props.listener.onDataChanged(data.data)
        return data;
      } catch (error) {
        raiseCustomEvent("notification", { type: "error", title: this.props.AppClient?.Translate("Error"), description: this.props.AppClient?.Translate("CouldNotRetrieveData")  })
        this.setState({loadingState: LoadingState.Failed })
        var msg = new ServiceMessage();
        msg.description = this.props.AppClient?.Translate("CouldNotRetrieveData") ?? ""
        return {data: [], columnData: undefined, totalDataCount: 0, messages: [ msg]}
      }
    }
    return undefined
  }

  CreateService(){
    return this.props.AppClient?.CreateService();
  }
  OnBeforeRender(){

  }
  getEditUrl (id: number = 0) {
    if(this.Options?.EditURL)
      return formatString(this.Options.EditURL, id.toString());
    
    return `/${this.Config.Schema}/edit${this.Config.Entity}/${id}`;
  };

  getExportFileName(){
    if(this.Options.PageTitle)
      return this.Options.PageTitle + "_" + moment(new Date()).format("YYYYMMDD_HHmm");
    else 
      return "File";
  }

  async onExportButtonClicked(option: ExportOption){
    if(this.RootElementRef.current){
      if(this.Options.Export?.Mode == "screenshot"){
        if(option.extension == "xls"){
          var xlsExporter = new ExcelExporter();
          xlsExporter.FileName = this.getExportFileName() + "." + option.extension;
          xlsExporter.HtmlElement = this.RootElementRef.current
          xlsExporter.Export();
        }
      }
      else if(this.Options.Export?.Mode == "remote"){
        option.entity = this.Config.Entity;
        option.schema = this.Config.Schema;
        option.columns = this.Config.Table?.Columns.filter((col) => ((typeof col.Visible != "function" && col.Visible != false) || (typeof col.Visible == "function" && col.Visible())) && !!col.PropertyName).map((col) => col.PropertyName)
        option.columnProperties = this.Config.Table?.Columns.filter((col) => ((typeof col.Visible != "function" && col.Visible != false) || (typeof col.Visible == "function" && col.Visible())) && !!col.PropertyName).map((col) => {
          return {
          name: col.PropertyName ?? "",
          type: col.Type ?? "",
          enumValues: col.Filtering?.EnumSelectionType? enumToArray(col.Filtering.EnumSelectionType, (key: string) => this.props.AppClient?.Translate(key)): undefined
        }});
        var queryData = new QueryData()
        if(this.Config.Table?.Columns)
          queryData.processQuery(this.Config.Table?.Columns, this.state.filter, this.state.sorter, this.props.manualFilters)
        option.queryData = queryData.model;

        var initialFilters = this.props.initialFilters ?? {};
        if(this.state.filter && this.props.manualFilters && this.props.manualFilters.length > 0){
          var manualFilters: any = {};
          for (let index = 0; index < Object.keys(this.state.filter).length; index++) {
            const key = Object.keys(this.state.filter)[index];
            if(this.props.manualFilters.indexOf(key) > -1){
              manualFilters[key] = this.state.filter[key];
            }            
          }
          initialFilters = {...initialFilters, ...manualFilters};
        }
        option.filterEntity = initialFilters;

        var dataArray: ArrayBuffer | undefined;
        raiseCustomEvent("notification", { type: "info", title: this.props.AppClient?.Translate("Info"), description: this.props.AppClient?.Translate("PleaseWaitWhileExporting")  })
        if(this.Options.Export.Callback) dataArray = await this.Options.Export.Callback(option);
        else {
          var base64 = (await this.props.AppClient?.CreateService().CreateEndpoint(this.getExportCallbackUrl(), { Payload: {data: option} } ).call())?.data
          if(!base64){
            raiseCustomEvent("notification", { type: "error", title: this.props.AppClient?.Translate("Error"), description: this.props.AppClient?.Translate("CouldNotExport")  })
            return;
          }
          dataArray = base64ToArrayBuffer(base64);
        }
        if(dataArray){
          var type = resolveMimeType(option.extension);
          if(typeof type == "string"){
            var blob = new Blob([dataArray], { type: type });
            var url = URL.createObjectURL(blob);

            var fileName = this.getExportFileName() + "." + option.extension;
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style.display = "none";
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          }
        }
      }
    }
  }
  getExportCallbackUrl(){
    return "configuration/export"
  }
  getViewUrl (id = 0){
    if (this.Options?.ViewURL)
      return formatString(this.Options.ViewURL, id.toString());
    return `/${this.Config.Schema}/view${this.Config.Entity}/${id}`;
  };
  getBackUrl() {
    if (this.Options?.BackURL) {
      return this.Options.BackURL;
    }
    return "/";
  };
  getLink = (record: any) => {
    if(this.Config.RowClickOption == "showEntityBinder") return "javascript:void(0)"
    if(this.Options?.DrawViewLinkInsteadOfEdit)
      return this.getViewUrl(record.id)
    else
      return this.getEditUrl(record.id)
  };
  goBack(){
    if(this.props.shownInParent == true) {
      this.props.parent?.onChildAction("back")
      return;
    }
    else Router.back();
  }
  async onButtonClicked(key: string){
    if(key == "AddNew"){
      if(this.Options.AllowNew != false){
        if(this.Config.NewEntityMethod == "Default"){
          if(this.Config.RowClickOption == "showEntityBinder")
            this.setState({clickedRowIndex: -1})
          else
            Router.push(this.getLink(this.CreateEntity()))
        }
        else{
          this.AddNewRow("ButtonClick");
        }
      }
    }
    else if(key == "Summarize"){
      this.setState({clickedRowIndex: -2, loadingState: LoadingState.Waiting, summarizeState: !this.state.summarizeState})
    }
    else if(key == "Reload"){
      if(this.Options.AllowRefresh != false)
        this.setState({clickedRowIndex: -2, loadingState: LoadingState.Waiting})
    }
    else if(key == "Settings"){
      if(this.Options.AllowSettings != false)
        this.setState({showingSettingsModal: true})
    }
    else if(key == "Import"){
      if(this.Options.AllowImport == true)
        this.setState({importState: { importRequested: true}})
    }
    else if(key == "ApproveImport"){
      if(this.Options.AllowImport == true){
        await this.approveImport();
        this.setImportState(false)
      }
    }
    else if(key == "RejectImport"){
      if(this.Options.AllowImport == true){
        this.rejectImport();
        this.setImportState(false)
      }
    }
    else if(key == "Delete"){
      if(this.Options.AllowDelete == true && this.state.checkedItems && this.state.checkedItems.length > 0){
        if(confirm(this.props.AppClient?.Translate("AreYouSureToDelete"))){
          var deletedItemCount = 0;
          var newData = clone(this.state.data) as Array<any>;
          for (let index = 0; index < this.state.checkedItems.length; index++) {
            const element = this.state.checkedItems[index];
            var itemIndex = 0;
            var item = newData.find((i, index) => {
              var isEqual = this.getUniqueID(i) == element
              if(isEqual) itemIndex = index;
              return isEqual;
            })
            if(!item) return;
            
            var canDelete = (await this.CanDeleteEntity(item))
            if(canDelete && !item.isNewRow){
              this.SetAsDeleted(item);
              if(!this.props.data)
                await this.SaveEntity(item, item.viewOrderIndex, length)
              deletedItemCount++;
            } 
          }
          if(!this.props.data)
            this.refreshData();
          else{
            this.setState({data: newData, checkedItems: [], clickedRowIndex: -2})
            this.props.parent?.onChildAction("ListChanged", {newData: newData, key: this.props.viewId});
          }
        }
      }
    }
    else if(key == "Save"){
      if(this.Config.SaveActionType == "SaveButtonClick"){
        this.SaveUnsavedItems("SaveButtonClick");
      }
    }
  }
  SaveTimer: any
  SaveTimerInterval: number = 1000
  SaveUnsavedItems(sender: string){
    var saveFn = () => {
      var unsavedItems = clone(this.state.data.filter((item: any) => item.hasUnsavedChanges == true))
      var length = unsavedItems.length;
      if(length > 0){
        if(length >= 2) raiseCustomEvent("notification", { type: "info", title: this.props.AppClient?.Translate("Info"), description: this.props.AppClient?.Translate("ProcessingPleaseWait")  })
        for (let index = 0; index < unsavedItems.length; index++) {
          const item = unsavedItems[index];
          this.SaveEntity(item, item.viewOrderIndex, length)
          length--; 
        }
      }
      else if(sender == "SaveButtonClick"){
        raiseCustomEvent("notification", { type: "info", title: this.props.AppClient?.Translate("Info"), description: this.props.AppClient?.Translate("EntitySavedSuccessfully")  })
      }
    }
    if(this.SaveTimer) clearTimeout(this.SaveTimer);
    this.SaveTimer = setTimeout(saveFn, this.SaveTimerInterval);
  }
  SetAsDeleted(data: any){
    data.isDeleted = true;
  }
  CanAddNewRow(action: string, list?: Array<any>){
    if(!list) list = this.state.data;
    if(this.Config.SaveActionType == "EnterKey")
      return list?.filter(op => op.isNewRow == true).length == 0;
    else return true;
  }
  AddNewRow(action: "AfterSaveEntity" | "ButtonClick", list?: Array<any>, forceStateChange: boolean = false){
    if(!list) list = this.state.data;
    var newData = clone(list) as Array<any>
    if(this.CanAddNewRow(action, list) && this.Config.NewEntityMethod == "Row"){
      var newRow = this.OnNewRowAdded(this.CreateEntity());
      newRow.hasUnsavedChanges = true;
      if(this.props.initialFilters) newRow = {...this.props.initialFilters, ...newRow}
      var index = 0;
      if(this.Config.NewEntityLocation == "End"){
        newData.push(newRow)
        index = newData.length - 1;
      }
      else{
        insertToIndex(newData, 0, newRow);
        index = 0;
      }
      this.setState({data: newData, clickedRowIndex: index, rerenderKey: randomKey(5)});
      this.props.parent?.onChildAction("ListChanged", {newData: newData, key: this.props.viewId});
    }
    else if(forceStateChange){
      this.setState({data: newData, clickedRowIndex: -2, rerenderKey: randomKey(5)});
      this.props.parent?.onChildAction("ListChanged", {newData: newData, key: this.props.viewId});
    }
  }
  canRenderRow(row: any, index: number){
    return row && row.isDeleted != true
  }
  OnNewRowAdded(data: any){
    return data;
  }
  isImporting(){
    return this.state && this.state.importState && this.state.importState.isImporting
  }
  setImportState(isImporting: boolean, importKey?: string, data?: any){
    //console.log("setImportState", isImporting, importKey)
    if(isImporting) this.setState({importState: { isImporting: true, importKey, data }, loadingState: LoadingState.Waiting})
    else this.setState({importState: {isImporting: false, importRequested: false, importKey: undefined, data: undefined}, loadingState: LoadingState.Waiting})
  }
  async approveImport(): Promise<any>{ 
    
  }
  async rejectImport(): Promise<any>{
      
  }
  async uploadFiles(data: any, files: Array<FileData>, isValid: boolean){
 
  }
  onCellValueChanging(row: any,  name?: string, value?: any, i18n: boolean = false, rowIndex?: number, columnIndex?: number, field?: any, rawValue?: any){
    if(!name) return;
    if(!row.dataTracker) row.dataTracker = { changes: {}};

    row.dataTracker.changes[name] = {oldValue: this.EntityOperations.getPropertyValue(row, name, this.state.languageID, i18n, true), newValue: value};

    this.EntityOperations.setFieldData(row, name, value, this.state.languageID, [], undefined, i18n)
    row.hasUnsavedChanges = true;
    
    if(this.Config.SaveOnCellValueChange == true && rowIndex != undefined && rowIndex >= 0){
      this.SaveUnsavedItems("onCellValueChanging");
    }
  }
  onCellValueChanged(row: any, column: TableColumnClass, rowIndex: number, columnIndex: number, key: string){
    if(row.isNewRow == true && key != "Enter") return;
    if(this.Config.SaveActionType == "EnterKey")
      this.SaveEntity(row, rowIndex)
    else {
      raiseCustomEvent("notification", { type: "warning", title: this.props.AppClient?.Translate("Info"), description: this.props.AppClient?.Translate("PleaseUseSaveButtonToSaveChanges")  })
    }
  }
  async ConfirmDeletion(newRow: boolean = false){
    return confirm(this.props.AppClient?.Translate("AreYouSureToDelete"))
  }
  async onCellValueCancelled(row: any, column: TableColumnClass, rowIndex: number, columnIndex: number){
    if(row.isNewRow == true && await this.ConfirmDeletion()){
      var newData = clone(this.state.data) as Array<any>;
      newData.splice(rowIndex, 1);
      this.setState({clickedRowIndex: -2, data: newData, rerenderKey: randomKey(5)});
      this.props.parent?.onChildAction("ListChanged", {newData: newData, key: this.props.viewId});
    }
  }
  private async SaveSettings(): Promise<PersistentConfig | undefined>{
    if(!this.PersistentSettings) return undefined;
    this.exPersistentSettings = undefined;
    var data = await this.OnSaveSettings(this.PersistentSettings);
    if(data) this.ApplySettings(data)
    this.setState({showingSettingsModal: false, rerenderKey: randomKey(5)});
    return undefined;
  }
  async OnSaveSettings(settingsData: PersistentConfig): Promise<PersistentConfig | undefined>{
    return undefined;
  }
  async CanSaveEntity(data: any): Promise<{canSave: boolean, showMessage?: boolean, message?: string}> {
    return {canSave: true, showMessage: true};
  }
  async CanDeleteEntity(data: any): Promise<boolean> {
    return true
  }
  async SaveEntity(data: any, rowIndex: number, updateQueueLength: number = 0){
    try {
      //console.log("SAving", data)
      var canExecuteAdditionalActions = updateQueueLength <= 1;
      if(canExecuteAdditionalActions) raiseCustomEvent("notification", { type: "info", title: this.props.AppClient?.Translate("Info"), description: this.props.AppClient?.Translate("ProcessingPleaseWait")  })
      var canSaveResult = await this.CanSaveEntity(data);
      if(canSaveResult && !canSaveResult.canSave){
        if(canSaveResult.showMessage != false)
          raiseCustomEvent("notification", { type: "error", title: this.props.AppClient?.Translate("Error"), description: this.props.AppClient?.Translate(canSaveResult.message ?? "EntityCouldNotBeSaved")  })
        //console.log("not SAving", data)
        return;
      }

      //console.log("calling SAving 2", data)
      var result = await this.EntityOperations.SaveEntity(this.DefaultLanguageID, data, []);
      if (!result.hasFailed && result.data) {
        var newData = clone(this.state.data) as Array<any>;
        newData.splice(rowIndex, 1, result.data);
        if(data.isNewRow == true && canExecuteAdditionalActions) this.AddNewRow("AfterSaveEntity", newData, true);
        else this.setState({data: newData});

        if(canExecuteAdditionalActions) raiseCustomEvent("notification", { type: "info", title: this.props.AppClient?.Translate("Info"), description: this.props.AppClient?.Translate("EntitySavedSuccessfully")  })
        if(data.dataTracker && data.dataTracker.changes){
          var changes = Object.keys(data.dataTracker.changes);
          for (let index = 0; index < changes.length; index++) {
            const changeKey = changes[index];
            var savedValue = this.EntityOperations.getPropertyValue(result.data, changeKey, this.state.languageID, true, true);
            var change = data.dataTracker.changes[changeKey];
            if(change){
              var isDifferent = this.isDifferentValues(savedValue, change.newValue);
              if(isDifferent){
                console.log("Could not save value", changeKey, data, result.data);
                raiseCustomEvent("notification", { type: "info", title: this.props.AppClient?.Translate("Warning"), description: this.props.AppClient?.Translate("CouldNotSaveValue")  })
              }
            }
          }
        }
      } else { 
        data.isValid = false;
        this.setState({rerenderKey: randomKey(5)})
        if (result.messages && result.messages.length > 0) {
          raiseCustomEvent("notification", { type: "error", title: this.props.AppClient?.Translate("Error"), description: result.messages[0].description  })
        }
        else
          raiseCustomEvent("notification", { type: "error", title: this.props.AppClient?.Translate("Error"), description: this.props.AppClient?.Translate("EntityCouldNotBeSaved")  })
      }
    } catch (error) {}
    return;
  }
  isDifferentValues(value1: any, value2: any) {
    var isDifferent = false;
 
    if (value1 === "" || (Array.isArray(value1) && value1.length === 0)) {
      value1 = null;
    }
    if (value2 === "" || (Array.isArray(value2) && value2.length === 0)) {
      value2 = null;
    }
 
    if (!value1 && value2) isDifferent = true;
    else if (value1 && !value2) isDifferent = true;
    else if (typeof value1 == "string" && value1.indexOf(":") > -1) isDifferent = !value1.startsWith(value2) && !value2.startsWith(value1);
    else if(typeof value2 == typeof value1 && typeof value2 == "object"){
      isDifferent = this.getUniqueID(value1) != this.getUniqueID(value2)
    }
    else if(typeof value2 == typeof value1) isDifferent = value2 != value1;
    return isDifferent;
  }
  async onCellClick(e: React.MouseEvent<HTMLTableCellElement> | undefined, row: any, column: TableColumnClass, rowIndex: number, columnIndex: number){
    if(!this.isImporting() && this.state.clickedRowIndex > 0 && this.state.data[this.state.clickedRowIndex].isNewRow == true && this.state.clickedRowIndex != rowIndex){
      if(this.Config.SaveActionType == "EnterKey")
        await this.SaveEntity(this.state.data[this.state.clickedRowIndex], this.state.clickedRowIndex);
    }
    if(column.AllowEditing != true && this.Config.RowClickOption == "showEntityBinder" && !this.isImporting()){
      e?.preventDefault();
      if(row.isNewRow && this.Config.NewEntityMethod == "Row"){
        return;
      }
      this.setState({clickedRowIndex: rowIndex})
      if(this.props.listener?.onCellClick)
        this.props.listener?.onCellClick(e, row, column, rowIndex, columnIndex);
    }
  }
  onRowClick(e: any, index: number){
    
  }
  renderEntityBinder(entity:any){
    return <></>
  }
  onChildAction(type: string, param?: any){
    if(type == "back"){
      if(param)
        this.refreshData(param);
      this.setState({clickedRowIndex: -2})
    }
    else if(type == "refreshData"){
      this.refreshData(param);
    }
  }
  refreshData(savedData?: any){
    if(savedData){
      var existingIndex = -1;
      var existing = (this.state.data as Array<any>).find((op: any, index: number) => {
        var isSame = op.id == savedData.id;
        if(isSame) existingIndex = index;
        return isSame;
      })
      if(existing && existingIndex > -1){
        var newData = clone(this.state.data) as Array<any>;
        newData.splice(existingIndex, 1, savedData);
        this.setState({clickedRowIndex: existingIndex, data: newData});
        this.props.parent?.onChildAction("ListChanged", {newData: newData, key: this.props.viewId});
      }
      else{
        var newData = clone(this.state.data) as Array<any>;
        insertToIndex(newData, 0, savedData);
        this.setState({clickedRowIndex: 0, data: newData});
        this.props.parent?.onChildAction("ListChanged", {newData: newData, key: this.props.viewId});
      }
    }
    else
      this.setState({clickedRowIndex: -2, loadingState: LoadingState.Waiting})
  }
  onPageChange(i: number){
    //console.log("Page is changing: " + this.state?.page + " => " + i);
    if(!this.props.shownInParent)
      Router.push("", replaceQueryParam(this.state.viewId + "page", i.toString()), { shallow: true })
    else this.setState({page: i, loadingState: LoadingState.Waiting});
  }
  onPageSizeChange(i: number){
    //console.log("PageSize is changing: " + this.state?.pageSize + " => " + i);
    if(!this.props.shownInParent)
      Router.push("", replaceQueryParam(this.state.viewId + "pageSize", i.toString()), { shallow: true })
    else this.setState({pageSize: i, loadingState: LoadingState.Waiting});
  }
  onSortingChanged(column: TableColumnClass, direction: string){
    //console.log("Sorting is changing: " + this.state?.sorter?.name + " => " + column.PropertyName);
    if(column.PropertyName){
      if(!this.props.shownInParent)
        Router.push("", replaceQueryParam(this.state.viewId + "sortDirection", direction, replaceQueryParam(this.state.viewId + "sortBy", column.PropertyName)), { shallow: true })
      else this.setState({sorter: { name: column.PropertyName, ascending: direction != "DESC"}, loadingState: LoadingState.Waiting})
    }
  }
  onFilteringChanged(filteredColumns: Array<TableColumnClass>){
    var filters: any = {}
    var url = "";
    filteredColumns.forEach(column => {
      if(!column.Filtering) return;
      var fieldName = column.Filtering.ValueName ?? column.Filtering.Name ?? column.PropertyName;
      if(!fieldName) return;

      if(column.Filtering.Comparison == DataComparison.Between){
        setObjectValue(filters, fieldName + "Low", column.Filtering.LowValue ?? "")
        url = replaceQueryParam(this.state.viewId + "Filters." + fieldName + "Low", column.Filtering.LowValue ?? "", url)

        setObjectValue(filters, fieldName + "High", column.Filtering.HighValue ?? "")
        url = replaceQueryParam(this.state.viewId + "Filters." + fieldName + "High", column.Filtering.HighValue ?? "", url)

        if(column.Filtering.HighValue || column.Filtering.LowValue)
          url = replaceQueryParam(this.state.viewId + "Comp." + fieldName, column.Filtering.Comparison.toString(), url)
        else
          url = replaceQueryParam(this.state.viewId + "Comp." + fieldName, "", url)
      }
      else{
        if(!column.Filtering?.Value || column.Filtering.Value == "") column.Filtering.Value = undefined;
        setObjectValue(filters, fieldName, column.Filtering.Value)
        if(Array.isArray(column.Filtering.Value))
          url = replaceQueryParam(this.state.viewId + "Filters." + fieldName, JSON.stringify(column.Filtering.Value), url)
        else
          url = replaceQueryParam(this.state.viewId + "Filters." + fieldName, column.Filtering.Value, url)
        if(column.IsFiltered === true) {
          if(column.Filtering.Comparison || column.Filtering.Comparison == 0) url = replaceQueryParam(this.state.viewId + "Comp." + fieldName, column.Filtering.Comparison.toString(), url)
        }
        else{
          url = replaceQueryParam(this.state.viewId + "Comp." + fieldName, "", url)
        }
      }
    });
    if(!this.props.shownInParent)
      Router.push("", url, { shallow: true }) 
    else this.setState({ loadingState: LoadingState.Waiting, filter: filters });
  }
  getItemPropertyValue(row: any, name: string, i18n: boolean = false) {
    return this.EntityOperations.getPropertyValue(row, name, this.state.languageID, i18n, true);
  }
  getRowProps(row: any, index: number){
    return {className: undefined}
  }
  getCellProps(row: any, column: TableColumnClass, rowIndex?: number, columnIndex?: number){
    return {className: undefined}
  }
  renderCellValue(row: any, column: TableColumnClass, value?: string, rowIndex?: number, columnIndex?: number) {
    if(value && !row.isNewRow && column.AllowEditing != true && this.Options.AllowDetailNavigation != false){
      return <Link href={this.getLink(row)}>{value}</Link>
    }
    return value;
  }
  renderEmptyCell(row: any, beginningColumn: boolean, rowIndex?: number) {
    return <></>
  }
  renderHeader(){
    return <></>
  }
  renderFooter(){
    return <></>
  }
  setCheckedItems(row: any, rowIndex: number, state: "ALL" | "NONE" | boolean){
    var checkedItems: any
    if(state == "ALL") {
      checkedItems = this.state.data.map((item: any) => this.getUniqueID(item));
    }
    else if(state == "NONE") checkedItems = [];
    else if(row && !row.isNewRow && this.state.checkedItems){
      var uniqueID = this.getUniqueID(row);
      var index = this.state.checkedItems.indexOf(uniqueID);
      if(state == false && index > -1){
        var newItems: Array<any> = clone(this.state.checkedItems);
        newItems.splice(index, 1);
        checkedItems = newItems;
      }
      else if(state == true && index == -1){
        var newItems: Array<any> = clone(this.state.checkedItems);
        newItems.push(uniqueID);
        checkedItems = newItems;
      }
    }
    if(checkedItems){
      this.setState({checkedItems: checkedItems});
      if(this.props.listener?.onCheckedItemsChanged){
        this.props.listener?.onCheckedItemsChanged(checkedItems)
      }
    }
  }
  getUniqueID(row: any){
    return row.id;
  }
  isChecked(row: any, rowIndex: number){
    if(!this.state.checkedItems || this.state.checkedItems.length == 0) return false;

    var uniqueID = this.getUniqueID(row);
    var index = this.state.checkedItems.indexOf(uniqueID);
    return index > -1;
  }
  CreateEntity(): any{
    if(this.Config.NewEntityMethod == "Row")
      return {id: 0, isNewRow: true};
    return {id: 0};
  }
  renderChildBinder(){
    var data: any = this.CreateEntity();
    if(this.state.clickedRowIndex >= 0) {
      data = this.state.data[this.state.clickedRowIndex];
    }
    if(data && (data.isNewRow == true || this.Options.AllowDetailNavigation == false)) return <></>;

    if(this.props.initialFilters && data.id == 0) data = {...data, ...this.props.initialFilters}
    //console.log(this.state.clickedRowIndex)
    if(this.Config.ChildBinderContainer == "modal"){
      return <Modal key={this.state.clickedRowIndex} dismissOnBackdropClick={false} defaultOpen={true}>
        {this.renderEntityBinder(data)}
      </Modal>
    }
    else if(this.Config.ChildBinderContainer == "drawer"){
      return <Drawer key={this.state.clickedRowIndex} className="oph-collectionBinders-child-binder" backdrop={true} swipe={false} fullWidth={false} position="top-right" visible={true}>
        {this.renderEntityBinder(data)}
      </Drawer>
    }
    return <></>
  }
  renderImportPanel(children?: React.ReactNode){
    return <ImportModal 
            title={this.props.AppClient?.Translate("UploadFile")}
            fileName="FilePath" 
            AppClient={this.props.AppClient} 
            onSubmit={(data, files, isValid) => this.uploadFiles(data, files, isValid)}
            onVisibilityChange={(val) => this.setImportState(false)}
            sampleFilePath={this.Options.Import?.SampleFile}
            message={this.Options.Import?.Message}
            >
              {children}
            </ImportModal>
  }
  renderChildAction(){
    return <></>
  }

  onSettingsColumnDrop(e: React.DragEvent<HTMLDivElement>){
    e.preventDefault();
    if(!this.PersistentSettings) return;
    
    if(!this.exPersistentSettings)
      this.exPersistentSettings = clone(this.PersistentSettings)

    var elem = document.querySelectorAll(`.dragging`)[0] as HTMLDivElement
    elem.classList.remove("dragging");
    if(!elem.parentElement?.classList.contains("oph-collectionBinders-settings-columns")) return;

    var colums = this.PersistentSettings?.Columns ?? [];
    var indexedItem = colums[parseInt(elem.ariaColIndex ?? "-1")];
    if (indexedItem) {
      var newColumns: Array<any> = [];
      var itemInjected = false;
      var sortOrder: number = 0;
      for (let i = 0; i < colums.length; i++) {
        if(i == parseInt(elem.ariaColIndex ?? "-1")) continue;

        const element = colums[i];
        var tmpElems = document.querySelectorAll(`[aria-colindex='${i}']`)
        for (let elemIndex = 0; elemIndex < tmpElems.length; elemIndex++) {
          const tmpElem = tmpElems[elemIndex];
          if(tmpElem.parentNode == elem.parentNode){
            if((tmpElem.getBoundingClientRect().top + tmpElem.getBoundingClientRect().height / 2) < e.clientY){
              element.SortOrder = sortOrder;
              newColumns.push(element);
              sortOrder++;
            }
            else {
              if(!itemInjected){
                indexedItem.SortOrder = sortOrder;
                newColumns.push(indexedItem)
                itemInjected = true;
                sortOrder++;
              }
              element.SortOrder = sortOrder;
              sortOrder++;
              newColumns.push(element)
            } 
            break;
          } 
        }
      }
      if(!itemInjected) {
        indexedItem.SortOrder = sortOrder;
        newColumns.push(indexedItem);
      }
      newColumns.forEach((col) => {
        var tableCol = this.Config.Table?.Columns.find((tableCol) => tableCol.PropertyName == col.Name);
        if(tableCol) tableCol.SortOrder = col.SortOrder;
      });
      var newSettings = clone(this.PersistentSettings);
      newSettings.Columns = newColumns;
      this.PersistentSettings = newSettings;
      this.setState({rerenderKey: randomKey(5)});
      this.ApplySettings(newSettings);
    }
  }
  onSettingsColumnDragOver(e: React.DragEvent<HTMLDivElement>){
    e.preventDefault();
  }
  onSettingsColumnDrag(e: React.DragEvent<HTMLDivElement>, item: any, index: number){
    e.currentTarget.classList.add("dragging")
  }
  onSettingsColumnDragEnd(e: React.DragEvent<HTMLDivElement>){
    e.currentTarget.classList.remove("dragging")
  }
  async CancelSettingsModal(){
    this.PersistentSettings = this.exPersistentSettings ?? (await this.GetPersistentSetting(this.state.path)) ?? {PageURL: this.state.path, Columns: [], BinderName: this.Config.DataSourcePath};
    this.exPersistentSettings = undefined;
    this.ApplySettings(this.PersistentSettings);
    this.setState({showingSettingsModal: false, rerenderKey: randomKey(5) })
  }
  renderSettingsModal(){
    if(!this.Config.Table) return <></>;
    if(!this.PersistentSettings) return <></>;

    if(!this.PersistentSettings.Columns || this.PersistentSettings.Columns.length == 0){
      var columns: Array<PersistentColumnConfig> = this.Config.Table.Columns.map((item, i) => {
        var column: PersistentColumnConfig = { 
          Name: item.PropertyName,
          SortOrder: i,
          Width: item.Width,
          Text: item.HeaderText ?? item.PropertyName,
          Visible: item.Visible == undefined || (typeof item.Visible == "boolean"? item.Visible != false: item.Visible())
        };
        return column;
      })
      var newSettings = clone(this.PersistentSettings);
      newSettings.Columns = columns;
      this.PersistentSettings = newSettings;
      this.setState({rerenderKey: randomKey(5)});
    }

    return <Drawer key="SettingsModal" className="oph-collectionBinders-settings" backdrop={true} swipe={false} fullWidth={false} position="top-right" visible={true}>
        <div className="oph-collectionBinders-settings-title">
          <div onClick={() => this.CancelSettingsModal()} className="oph-collectionBinders-settings-title-back-button">
            {getImageComponent({name: "arrow-left", size: 16, color: "#5B6782"})}
          </div>
          {this.props.AppClient?.Translate("Settings")}
        </div>
        <div className="oph-collectionBinders-settings-columns" onDrop={(e) => this.onSettingsColumnDrop(e)} onDragOver={(e) => this.onSettingsColumnDragOver(e)}>
          {this.PersistentSettings?.Columns?.map((column, i) => <div className="oph-collectionBinders-settings-columns-column"
            key={i}
            draggable={true} 
            onDragEnd={(e) => this.onSettingsColumnDragEnd(e)} 
            onDragStart={(e) => this.onSettingsColumnDrag(e, column, i)} aria-colindex={i}
            >
              <div className="oph-collectionBinders-settings-columns-column-left">
                <label className="oph-collectionBinders-settings-columns-column-left-move"><Bars3Icon width={16} height={16}></Bars3Icon></label>
                <label>{column.Text}</label>
              </div>
              <CheckboxInput switchbox={true} onChange={(e) => {column.Visible = e.target.checked;} } defaultChecked={column.Visible} name={column.Name} id={"col_" + column.Name}></CheckboxInput>
          </div>)}
        </div>
        <div className="oph-collectionBinders-settings-buttons">
          <Button id="accept-button" onClick={() => this.SaveSettings()} className="oph-collectionBinders-settings-button" text={this.props.AppClient?.Translate("Save")}></Button>
          <Button id="cancel-button" onClick={() => this.CancelSettingsModal()} className="oph-collectionBinders-settings-button" text={this.props.AppClient?.Translate("Cancel")}></Button>
        </div>
    </Drawer>
  }
  render(): React.ReactNode {
    try {
      //console.log("this.state.loadingState ", this.state?.loadingState )
      if(!this.Config.Table || !this.state)
        return <></>
  
      //console.log(this.state.checkedItems)
      var stateData = this.state.data ?? []
      this.setMetaTags(stateData)
      this.OnBeforeRender();
      return <>
        <div className={`oph-collectionBinders ${this.props.className ?? ""}`} key={this.state.rerenderKey}>
          <ContentLoading appClient={this.props.AppClient} loading={this.state.loadingState != LoadingState.Loaded && this.state.loadingState != LoadingState.Failed}>
            {this.renderHeader()}
            {this.state.clickedRowIndex > -2 && this.Config.RowClickOption == "showEntityBinder" && this.renderChildBinder()}
            <div className="oph-collectionBinders-body">
              <div ref={this.RootElementRef}>
                <Table 
                 isHeaderSticky={this.Config.StickyHeader}
                 columnData={this.state.columnData}
                 checkboxes={this.Config.Checkboxes}
                 checkedItems={this.state.checkedItems}
                 emptyColumnToBeginning={this.Config.EmptyColumnSelection == "Beginning" || this.Config.EmptyColumnSelection == "Both"}
                 emptyColumnToEnd={this.Config.EmptyColumnSelection == "End" || this.Config.EmptyColumnSelection == "Both"}
                 focusForNewRow={this.Config.NewEntityMethod == "Row"} 
                 refreshKey={`${this.state.dataIndex}${this.state.rerenderKey}`} 
                 applyRowValidation={this.state.importState?.isImporting} 
                 allowFiltering={!this.isImporting()} 
                 allowSorting={!this.isImporting()} 
                 hierarchicalDisplay={this.Config.HierarchicalDisplay} 
                 hierarchyPropertyName={this.Config.HierarchyPropertyName} 
                 hierarchyParentValue={this.Config.HierarchyParentValue} 
                 appClient={this.props.AppClient} 
                 table={this.Config.Table} 
                 data={stateData} listener={this}/>
              </div>
              {this.state.totalDatacount > 0 && <Pagination pagesTitle={this.props.AppClient?.Translate("{0}/{1}")} pageSizeSelectionText={this.props.AppClient?.Translate("PageSize")} pageUrl="" totalDatacount={this.state.totalDatacount} datacount={stateData.length} pageSize={this.state.pageSize} page={this.state.page} onChange={(e: any, i: number) => this.onPageChange(i)} onPageSizeChange={(e: any, i: number) => this.onPageSizeChange(i)} />}
            </div>
            {this.renderChildAction()}
            {!this.state.importState?.isImporting && this.state.showingSettingsModal && this.renderSettingsModal()}
            {this.renderFooter()}
          </ContentLoading>
        </div>
        {this.state.importState?.importRequested && this.renderImportPanel()}
      </>
    } catch (error) {
      console.error(error);
      return <div>
        <div>Location: CollectionBinder</div>
        <div>Type: RenderError</div>
        <div>{JSON.stringify(error)}</div>
      </div>
    }    
  }
}
