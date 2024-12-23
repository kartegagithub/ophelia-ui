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
import { insertToIndex } from "../../Extensions";
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
  persistentSettings?: PersistentConfig,
  showingSettingsModal?: boolean,
  rerenderKey?: any,
  checkedItems?: Array<any>
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
        if(filters[column.Filtering.Name]){
          column.IsFiltered = true;
          column.Filtering.Value = filters[column.Filtering.Name]
          if(comparisons[column.Filtering.Name]) column.Filtering.Comparison = parseInt(comparisons[column.Filtering.Name]);
          return;
        }
      }
      column.IsFiltered = false;
      column.Filtering.Value = undefined
    })   

    var persistentSettings = this.state?.persistentSettings;
    if(!persistentSettings){
      var path = Router.asPath;
      if(path.indexOf("?") > 1) path = path.substring(0, path.indexOf("?")).replace("?", "");
      
      persistentSettings = await this.GetPersistentSetting(path, this.Config.DataSourcePath);
      if(!persistentSettings) persistentSettings = { PageURL: path, BinderName: this.Config.DataSourcePath, Columns: []};
      if(!persistentSettings.Columns) persistentSettings.Columns = [];
      if(!persistentSettings.PageURL) persistentSettings.PageURL = path;
      if(!persistentSettings.PageURL) persistentSettings.BinderName = this.Config.DataSourcePath;
      this.ApplySettings(persistentSettings);
    }

    if(!this.props.shownInParent){
      this.setState({checkedItems: [], persistentSettings: persistentSettings, viewId: viewID, dataIndex: 0, path: Router.asPath, clickedRowIndex: -2, initialized: true, loadingState: data? LoadingState.Loaded: LoadingState.Waiting, page: page, pageSize: pageSize, filter: filters, sorter: {name: sortBy, ascending : sortDirection === "ASC"}, data: data, messages: [], languageID: this.UserLanguageID})
    }
    else{
      setTimeout(() => {
        this.setState({checkedItems: [], persistentSettings: persistentSettings, viewId: viewID, dataIndex: 0, path: Router.asPath, clickedRowIndex: -2, initialized: true, loadingState: data? LoadingState.Loaded: LoadingState.Waiting, page: page, pageSize: pageSize, filter: filters, sorter: {name: sortBy, ascending : sortDirection === "ASC"}, data: data, messages: [], languageID: this.UserLanguageID})
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
          if(typeof column.Visible == "boolean") column.Visible = item.Visible != false? true : false;
          else if(column.Visible != undefined && column.Visible()) column.Visible = item.Visible;
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
      //console.log("Reiniting binder", prevState, this.state)
      if(!this.state) return;
      if(this.state.path != Router.asPath || (this.state.loadingState == LoadingState.Loaded && !this.state.data)){
        this.setInitData().then(() => this.onAfterSetData());
      }
      else if(this.state.loadingState === LoadingState.Waiting){
        // console.log("loading binder data")
        this.getData().then((data) => {
          this.onAfterSetData();
          if(data && data.data){
            this.ValidateColumns(data.data)
            this.setState({dataIndex: this.state.dataIndex + 1, checkedItems: [], path: Router.asPath, data: data.data, totalDatacount: data.totalDataCount, messages: data.messages})
          }
          else if(data)
            this.setState({dataIndex: this.state.dataIndex + 1, checkedItems: [], path: Router.asPath, data: [], totalDatacount: 0, messages: data.messages})
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
          queryData.processQuery(this.Config.Table?.Columns, this.state.filter, this.state.sorter, this.props.manualFilters)
        
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
          return {data: [], totalDataCount: 0, messages: [ msg]}
        }
        return data;
      } catch (error) {
        raiseCustomEvent("notification", { type: "error", title: this.props.AppClient?.Translate("Error"), description: this.props.AppClient?.Translate("CouldNotRetrieveData")  })
        this.setState({loadingState: LoadingState.Failed })
        var msg = new ServiceMessage();
        msg.description = this.props.AppClient?.Translate("CouldNotRetrieveData") ?? ""
        return {data: [], totalDataCount: 0, messages: [ msg]}
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
    return this.Options.PageTitle ?? "File";
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
      else if(this.Options.Export?.Mode == "remote" && this.Options.Export?.Callback){
        var dataArray = await this.Options.Export.Callback(option);
        if(dataArray){
          var type = resolveMimeType(option.extension);
          if(typeof type == "string"){
            var blob = new Blob([dataArray], { type: type });
            var url = URL.createObjectURL(blob);
            window.open(url);
          }
        }
      }
    }
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
  async onButtonClicked(key: string){
    if(key == "AddNew"){
      if(this.Options.AllowNew != false){
        if(this.Config.NewEntityMethod == "Default"){
          if(this.Config.RowClickOption == "showEntityBinder")
            this.setState({clickedRowIndex: -1})
          else
            Router.push(this.getLink({id: 0}))
        }
        else{
          this.AddNewRow("ButtonClick");
        }
      }
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
    else if(key == "Save"){
      if(this.Config.SaveActionType == "SaveButtonClick"){
        var unsavedItems = this.state.data.filter((item: any) => item.hasUnsavedChanges == true)
        var length = unsavedItems.length;
        if(length >= 2) raiseCustomEvent("notification", { type: "info", title: this.props.AppClient?.Translate("Info"), description: this.props.AppClient?.Translate("ProcessingPleaseWait")  })
        for (let index = 0; index < unsavedItems.length; index++) {
          const item = unsavedItems[index];
          await this.SaveEntity(item, item.viewOrderIndex, length)
          length--; 
        }
      }
    }
  }
  CanAddNewRow(action: string, list?: Array<any>){
    if(!list) list = this.state.data;
    return list?.filter(op => op.isNewRow == true).length == 0;
  }
  AddNewRow(action: "AfterSaveEntity" | "ButtonClick", list?: Array<any>, forceStateChange: boolean = false){
    if(!list) list = this.state.data;
    var newData = clone(list) as Array<any>
    if(this.CanAddNewRow(action, list) && this.Config.NewEntityMethod == "Row"){
      var newRow = this.OnNewRowAdded({id: 0, isNewRow: true});
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
    }
    else if(forceStateChange){
      this.setState({data: newData, clickedRowIndex: -2, rerenderKey: randomKey(5)});
    }
  }
  OnNewRowAdded(data: any){
    return data;
  }
  isImporting(){
    return this.state && this.state.importState && this.state.importState.isImporting
  }
  setImportState(isImporting: boolean, importKey?: string, data?: any){
    if(isImporting) this.setState({importState: { isImporting: true, importKey, data }, loadingState: LoadingState.Waiting})
    else this.setState({importState: {isImporting: false, importRequested: false, importKey: undefined, data: undefined}, loadingState: LoadingState.Waiting})
  }
  async approveImport(): Promise<any>{ 
    
  }
  async rejectImport(): Promise<any>{
      
  }
  async uploadFiles(data: any, files: Array<FileData>){
 
  }
  onCellValueChanging(row: any, name?: string, value?: any, i18n: boolean = false, rowIndex?: number, columnIndex?: number, field?: any){
    if(!name) return;
    this.EntityOperations.setFieldData(row, name, value, this.state.languageID, [], undefined, i18n)
  }
  onCellValueChanged(row: any, column: TableColumnClass, rowIndex: number, columnIndex: number, key: string){
    if(row.isNewRow == true && key != "Enter") return;
    if(this.Config.SaveActionType == "EnterKey")
      this.SaveEntity(row, rowIndex)
    else {
      row.hasUnsavedChanges = true;
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
    }
  }
  private async SaveSettings(): Promise<PersistentConfig | undefined>{
    if(!this.state.persistentSettings) return undefined;

    var data = await this.OnSaveSettings(this.state.persistentSettings);
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
  async SaveEntity(data: any, rowIndex: number, updateQueueLength: number = 0){
    try {
      var canExecuteAdditionalActions = updateQueueLength <= 1;
      if(canExecuteAdditionalActions) raiseCustomEvent("notification", { type: "info", title: this.props.AppClient?.Translate("Info"), description: this.props.AppClient?.Translate("ProcessingPleaseWait")  })
      var canSaveResult = await this.CanSaveEntity(data);
      if(canSaveResult && !canSaveResult.canSave){
        if(canSaveResult.showMessage != false)
          raiseCustomEvent("notification", { type: "error", title: this.props.AppClient?.Translate("Error"), description: this.props.AppClient?.Translate(canSaveResult.message ?? "EntityCouldNotBeSaved")  })
        return;
      }

      var result = await this.EntityOperations.SaveEntity(this.DefaultLanguageID, data, []);
      if (!result.hasFailed && result.data) {
        var newData = clone(this.state.data) as Array<any>;
        newData.splice(rowIndex, 1, result.data);
        if(data.isNewRow == true && canExecuteAdditionalActions) this.AddNewRow("AfterSaveEntity", newData, true);
        if(canExecuteAdditionalActions) raiseCustomEvent("notification", { type: "info", title: this.props.AppClient?.Translate("Info"), description: this.props.AppClient?.Translate("EntitySavedSuccessfully")  })
      } else {
        data.isValid = false;
        this.setState({rerenderKey: randomKey(5)})
        raiseCustomEvent("notification", { type: "error", title: this.props.AppClient?.Translate("Error"), description: this.props.AppClient?.Translate("EntityCouldNotBeSaved")  })
      }
    } catch (error) {}
    return;
  }
  async onCellClick(e: React.MouseEvent<HTMLTableCellElement> | undefined, row: any, column: TableColumnClass, rowIndex: number, columnIndex: number){
    if(!this.isImporting() && this.state.clickedRowIndex > 0 && this.state.data[this.state.clickedRowIndex].isNewRow == true && this.state.clickedRowIndex != rowIndex){
      if(this.Config.SaveActionType == "EnterKey")
        await this.SaveEntity(this.state.data[this.state.clickedRowIndex], this.state.clickedRowIndex);
    }
    if(column.AllowEditing != true && this.Config.RowClickOption == "showEntityBinder" && !this.isImporting()){
      e?.preventDefault();
      this.setState({clickedRowIndex: rowIndex})
    }
  }
  onRowClick(e: any, index: number){
    
  }
  renderEntityBinder(entity:any){
    return <></>
  }
  onChildAction(type: string){
    if(type == "back"){
      this.setState({clickedRowIndex: -2})
    }
    else if(type == "refreshData"){
      this.setState({clickedRowIndex: -2, loadingState: LoadingState.Waiting})
    }
  }
  refreshData(){
    this.setState({clickedRowIndex: -2, loadingState: LoadingState.Waiting})
  }
  onPageChange(i: number){
    Router.push("", replaceQueryParam(this.state.viewId + "page", i.toString()), { shallow: true })
  }
  onPageSizeChange(i: number){
    Router.push("", replaceQueryParam(this.state.viewId + "pageSize", i.toString()), { shallow: true })
  }
  onSortingChanged(column: TableColumnClass, direction: string){
    if(column.PropertyName){
      Router.push("", replaceQueryParam(this.state.viewId + "sortDirection", direction, replaceQueryParam(this.state.viewId + "sortBy", column.PropertyName)), { shallow: true })
    }
  }
  onFilteringChanged(filteredColumns: Array<TableColumnClass>){
    var filters: any = {}
    var url = "";
    filteredColumns.forEach(column => {
      if(!column.Filtering) return;
      if(!column.Filtering?.Value || column.Filtering.Value == "") column.Filtering.Value = undefined;
      if(column.Filtering?.Name){
        setObjectValue(filters, column.Filtering.Name, column.Filtering.Value)
        url = replaceQueryParam(this.state.viewId + "Filters." + column.Filtering.Name, column.Filtering.Value, url)
        if(column.IsFiltered === true) {
          if(column.Filtering.Comparison || column.Filtering.Comparison == 0) url = replaceQueryParam(this.state.viewId + "Comp." + column.Filtering.Name, column.Filtering.Comparison.toString(), url)
        }
        else{
          url = replaceQueryParam(this.state.viewId + "Comp." + column.Filtering.Name, "", url)
        }
      }
    });
    Router.push("", url, { shallow: true }) 
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
    if(value){
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
    if(state == "ALL") this.setState({checkedItems: this.state.data.map((item: any) => this.getUniqueID(item))});
    else if(state == "NONE") this.setState({checkedItems: []});
    else if(row && !row.isNewRow && this.state.checkedItems){
      var uniqueID = this.getUniqueID(row);
      var index = this.state.checkedItems.indexOf(uniqueID);
      if(state == false && index > -1){
        var newItems: Array<any> = clone(this.state.checkedItems);
        newItems.splice(index, 1);
        this.setState({checkedItems: newItems});
      }
      else if(state == true && index == -1){
        var newItems: Array<any> = clone(this.state.checkedItems);
        newItems.push(uniqueID);
        this.setState({checkedItems: newItems});
      }
    }
  }
  getUniqueID(row: any){
    return row.id;
  }
  isChecked(row: any, rowIndex: number){
    if(!this.state.checkedItems) return false;

    var uniqueID = this.getUniqueID(row);
    var index = this.state.checkedItems.indexOf(uniqueID);
    return index > -1;
  }
  renderChildBinder(){
    var data: any = {id: 0};
    if(this.state.clickedRowIndex >= 0) {
      data = this.state.data[this.state.clickedRowIndex];
    }
    if(data && data.isNewRow == true) return <></>;

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
            onSubmit={(data, files) => this.uploadFiles(data, files)}
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
    if(!this.state.persistentSettings) return;
    
    var elem = document.querySelectorAll(`.dragging`)[0] as HTMLDivElement
    elem.classList.remove("dragging");
    if(!elem.parentElement?.classList.contains("oph-collectionBinders-settings-columns")) return;

    var colums = this.state.persistentSettings?.Columns ?? [];
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
      var newSettings = clone(this.state.persistentSettings);
      newSettings.Columns = newColumns;
      this.setState({persistentSettings: newSettings});
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
    var setting = await this.GetPersistentSetting(this.state.path);
    this.setState({showingSettingsModal: false, persistentSettings: setting ?? {PageURL: this.state.path, Columns: [], BinderName: this.Config.DataSourcePath}})
  }
  renderSettingsModal(){
    if(!this.Config.Table) return <></>;
    if(!this.state.persistentSettings) return <></>;

    if(!this.state.persistentSettings.Columns || this.state.persistentSettings.Columns.length == 0){
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
      var newSettings = clone(this.state.persistentSettings);
      newSettings.Columns = columns;
      this.setState({persistentSettings: newSettings});
    }

    return <Drawer key="SettingsModal" className="oph-collectionBinders-settings" backdrop={true} swipe={false} fullWidth={false} position="top-right" visible={true}>
        <div className="oph-collectionBinders-settings-title">
          <div onClick={() => this.CancelSettingsModal()} className="oph-collectionBinders-settings-title-back-button">
            {getImageComponent({name: "arrow-left", size: 16, color: "#5B6782"})}
          </div>
          {this.props.AppClient?.Translate("Settings")}
        </div>
        <div className="oph-collectionBinders-settings-columns" onDrop={(e) => this.onSettingsColumnDrop(e)} onDragOver={(e) => this.onSettingsColumnDragOver(e)}>
          {this.state.persistentSettings?.Columns?.map((column, i) => <div className="oph-collectionBinders-settings-columns-column"
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
  
      console.log(this.state.checkedItems)
      var stateData = this.state.data ?? []
      this.setMetaTags(stateData)
      this.OnBeforeRender();
      return <>
        <div className="oph-collectionBinders" key={this.state.rerenderKey}>
          <ContentLoading appClient={this.props.AppClient} loading={this.state.loadingState != LoadingState.Loaded && this.state.loadingState != LoadingState.Failed}>
            {this.renderHeader()}
            {this.state.clickedRowIndex > -2 && this.Config.RowClickOption == "showEntityBinder" && this.renderChildBinder()}
            <div className="oph-collectionBinders-body">
              <div ref={this.RootElementRef}>
                <Table 
                 checkboxes={this.Config.Checkboxes}
                 checkedItems={this.state.checkedItems}
                 emptyColumnToBeginning={this.Config.EmptyColumnSelection == "Beginning" || this.Config.EmptyColumnSelection == "Both"}
                 emptyColumnToEnd={this.Config.EmptyColumnSelection == "End" || this.Config.EmptyColumnSelection == "Both"}
                 focusForNewRow={this.Config.NewEntityMethod == "Row"} 
                 refreshKey={`${this.state.dataIndex}${this.state.rerenderKey}`} 
                 applyRowValidation={this.state.importState?.isImporting} 
                 allowFiltering={!this.isImporting() && !this.props.shownInParent} 
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
