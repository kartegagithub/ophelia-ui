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
import { getQueryParam, queryParamsAsObject, pascalize, replaceQueryParam, removeLastPropName, formatString, camelize } from "../../Extensions/StringExtensions";
import QuerySorter from "./query/querySorter";
import QueryData from "./query/queryData";
import { getAppTheme } from "../../AppTheme";
import { getObjectValue, randomId, randomKey, setObjectValue, validateKeyName } from "../../Extensions/ReflectionExtensions";
import { resolveMimeType } from "../../Extensions/MimeTypeResolver";
import { ExcelExporter } from "../../Exporters/ExcelExporter";
import Modal from "../../Components/Modal";
import EntityBinder from "../EntityBinder/entityBinder";
import { raiseCustomEvent } from "../../Extensions/DocumentExtension";
import { EntityOperations } from "../EntityOperations";
import Drawer from "../../Components/Drawer";
import ContentLoading from "../../Components/ContentLoading";
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
export default class CollectionBinder<P> extends React.Component<P & CollectionBinderProps, {dataIndex: number, path: string, initialized: boolean, clickedRowIndex: number, loadingState: LoadingState, totalDatacount: number, page: number, pageSize: number, filter: any, manualFilter: any, sorter: QuerySorter, data: any, messages: Array<ServiceMessage>, languageID: number, childState: any, importState: {data?: any, isImporting: boolean, importKey?: string}, viewId?: string}> {

  Config: Config = new Config();
  Options: BinderOptions = new BinderOptions();
  DefaultLanguageID: number = 0
  UserLanguageID: number = 0
  Theme = getAppTheme()
  RootElementRef = React.createRef<HTMLDivElement>();
  EntityOperations: EntityOperations
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
      this.setInitData(true) 
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
    this.Init();
  }

  setInitData(firstLoad: boolean = false){
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

    if(!this.props.shownInParent){
      this.setState({viewId: viewID, dataIndex: 0, path: Router.asPath, clickedRowIndex: -2, initialized: true, loadingState: data? LoadingState.Loaded: LoadingState.Waiting, page: page, pageSize: pageSize, filter: filters, sorter: {name: sortBy, ascending : sortDirection === "ASC"}, data: data, messages: [], languageID: this.UserLanguageID})
    }
    else{
      setTimeout(() => {
        this.setState({viewId: viewID, dataIndex: 0, path: Router.asPath, clickedRowIndex: -2, initialized: true, loadingState: data? LoadingState.Loaded: LoadingState.Waiting, page: page, pageSize: pageSize, filter: filters, sorter: {name: sortBy, ascending : sortDirection === "ASC"}, data: data, messages: [], languageID: this.UserLanguageID})
      }, 1000);
    }
  }

  componentDidUpdate(prevProps: any, prevState: any){
    try {
      //console.log("Reiniting binder", prevState, this.state)
      if(!this.state) return;
      if(this.state.path != Router.asPath || (this.state.loadingState == LoadingState.Loaded && !this.state.data)){
        this.setInitData()
        this.onAfterSetData();
      }
      else if(this.state.loadingState === LoadingState.Waiting){
        // console.log("loading binder data")
        this.getData().then((data) => {
          this.onAfterSetData();
          if(data && data.data){
            this.ValidateColumns(data.data)
            this.setState({dataIndex: this.state.dataIndex + 1, path: Router.asPath, data: data.data, totalDatacount: data.totalDataCount, messages: data.messages})
          }
          else if(data)
            this.setState({dataIndex: this.state.dataIndex + 1, path: Router.asPath, data: [], totalDatacount: 0, messages: data.messages})
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
      if(this.Options.ExportMode == "screenshot"){
        if(option.extension == "xls"){
          var xlsExporter = new ExcelExporter();
          xlsExporter.FileName = this.getExportFileName() + "." + option.extension;
          xlsExporter.HtmlElement = this.RootElementRef.current
          xlsExporter.Export();
        }
      }
      else if(this.Options.ExportMode == "remote" && this.Options.ExportCallback){
        var dataArray = await this.Options.ExportCallback(option);
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
      if(this.Config.RowClickOption == "showEntityBinder")
        this.setState({clickedRowIndex: -1})
      else
        Router.push(this.getLink({id: 0}))
    }
    else if(key == "Reload"){
      this.setState({loadingState: LoadingState.Waiting})
    }
  }
  onCellValueChanging(row: any, name?: string, value?: any, i18n: boolean = false){
    if(!name) return;
    this.EntityOperations.setFieldData(row, name, value, this.state.languageID, [], undefined, i18n)
  }
  onCellValueChanged(row: any, column: TableColumnClass){
    this.SaveEntity(row)
  }
  async SaveEntity(data: any){
    try {
      var result = await this.EntityOperations.SaveEntity(this.DefaultLanguageID, data, []);
      if (!result.hasFailed) {
        raiseCustomEvent("notification", { type: "info", title: this.props.AppClient?.Translate("Info"), description: this.props.AppClient?.Translate("EntitySavedSuccessfully")  })
      } else {
        raiseCustomEvent("notification", { type: "error", title: this.props.AppClient?.Translate("Error"), description: this.props.AppClient?.Translate("EntityCouldNotBeSaved")  })
      }
    } catch (error) {}
}
  onCellClick(e: React.MouseEvent<HTMLTableCellElement>, row: any, column: TableColumnClass, rowIndex: number, columnIndex: number){
    if(column.AllowEditing != true && this.Config.RowClickOption == "showEntityBinder" && !this.isImporting()){
      e.preventDefault();
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
  getCellProps(row: any, index: number, rowIndex?: number, columnIndex?: number){
    return {className: undefined}
  }
  renderCellValue(row: any, column: TableColumnClass, value?: string, rowIndex?: number, columnIndex?: number) {
    if(value){
      return <Link href={this.getLink(row)}>{value}</Link>
    }
    return value;
  }
  renderHeader(){
    return <></>
  }
  renderFooter(){
    return <></>
  }
  isImporting(){
    return this.state && this.state.importState && this.state.importState.isImporting
  }
  setImportState(isImporting: boolean, importKey?: string, data?: any){
    if(isImporting) this.setState({importState: { isImporting: true, importKey, data }, loadingState: LoadingState.Waiting})
    else this.setState({importState: {isImporting: false, importKey: undefined, data: undefined}, loadingState: LoadingState.Waiting})
  }
  renderChildBinder(){
    var data: any = {id: 0};
    if(this.state.clickedRowIndex >= 0) {
      data = this.state.data[this.state.clickedRowIndex];
    }
    if(this.props.initialFilters && data.id == 0) data = {...data, ...this.props.initialFilters}
    //console.log(this.state.clickedRowIndex)
    if(this.Config.ChildBinderContainer == "modal"){
      return <Modal key={this.state.clickedRowIndex} dismissOnBackdropClick={false} defaultOpen={true}>
        {this.renderEntityBinder(data)}
      </Modal>
    }
    else if(this.Config.ChildBinderContainer == "drawer"){
      return <Drawer key={this.state.clickedRowIndex} className="bg-white w-2/4 h-full overflow-y-scroll shadow-lg" backdrop={true} swipe={false} fullWidth={false} position="top-right" visible={true}>
        {this.renderEntityBinder(data)}
      </Drawer>
    }
    return <></>
  }
  renderChildAction(){
    return <></>
  }
  render(): React.ReactNode {
    try {
      //console.log("this.state.loadingState ", this.state?.loadingState )
      if(!this.Config.Table || !this.state)
        return <></>
  
      var stateData = this.state.data ?? []
      this.setMetaTags(stateData)
      this.OnBeforeRender();
      return <>
        <div className="oph-collectionBinders">
          <ContentLoading appClient={this.props.AppClient} loading={this.state.loadingState != LoadingState.Loaded && this.state.loadingState != LoadingState.Failed}>
            {this.renderHeader()}
            {this.state.clickedRowIndex > -2 && this.Config.RowClickOption == "showEntityBinder" && this.renderChildBinder()}
            <div className="oph-collectionBinders">
              <div ref={this.RootElementRef}>
                <Table refreshKey={this.state.dataIndex} applyRowValidation={this.state.importState?.isImporting} allowFiltering={!this.isImporting() && !this.props.shownInParent} allowSorting={!this.isImporting()} hierarchicalDisplay={this.Config.HierarchicalDisplay} hierarchyPropertyName={this.Config.HierarchyPropertyName} hierarchyParentValue={this.Config.HierarchyParentValue} appClient={this.props.AppClient} table={this.Config.Table} data={stateData} listener={this}/>
              </div>
              {this.state.totalDatacount > stateData.length  && <Pagination pagesTitle={this.props.AppClient?.Translate("{0}/{1}")} pageSizeSelectionText={this.props.AppClient?.Translate("PageSize")} pageUrl="" totalDatacount={this.state.totalDatacount} datacount={stateData.length} pageSize={this.state.pageSize} page={this.state.page} onChange={(e: any, i: number) => this.onPageChange(i)} onPageSizeChange={(e: any, i: number) => this.onPageSizeChange(i)} />}
            </div>
            {this.renderChildAction()}
            {this.renderFooter()}
          </ContentLoading>
        </div>
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
