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
import { getQueryParam, queryParamsAsObject, pascalize, replaceQueryParam, removeLastPropName, formatString } from "../../Extensions/StringExtensions";
import QuerySorter from "./query/querySorter";
import QueryData from "./query/queryData";
import { getAppTheme } from "../../AppTheme";
import { setObjectValue } from "../../Extensions/ReflectionExtensions";
import { PDFExporter } from "../../Exporters/PDFExporter";
import { resolveMimeType } from "../../Extensions/MimeTypeResolver";
import { ExcelExporter } from "../../Exporters/ExcelExporter";
import Modal from "../../Components/Modal";
import EntityBinder from "../EntityBinder/entityBinder";
import { raiseCustomEvent } from "../../Extensions/DocumentExtension";
export class CollectionBinderProps{
  config?: Config
  options?: BinderOptions
  initialFilters?: any
  data?: any
  AppClient: AppClient | undefined
  shownInParent?: boolean
  pageTitle?: string
  parent?: EntityBinder<{}> | CollectionBinder<{}>
}
export default class CollectionBinder<P> extends React.Component<P & CollectionBinderProps, {path: string, initialized: boolean, clickedRowIndex: number, loadingState: LoadingState, totalDatacount: number, page: number, pageSize: number, filter: any, sorter: QuerySorter, data: any, messages: Array<ServiceMessage>, languageID: number}> {

  Config: Config = new Config();
  Options: BinderOptions = new BinderOptions();
  DefaultLanguageID: number = 0
  i18nProperty: string = ""
  Theme = getAppTheme()
  RootElementRef = React.createRef<HTMLDivElement>();
  Init(){
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
    this.ProcessColumns();
    this.setInitData()
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
  SetColumns(columns: Array<TableColumnClass>){
    if(this.Config.Table)
      this.Config.Table.Columns = columns;
  }
  SetDataSource(schema: string, entity: string, pluralEntity: string = "") {
    this.Config.Entity = entity;
    this.Config.Schema = schema;
    if(!pluralEntity) pluralEntity = Pluralize(entity);
    this.SetDataSourcePath(schema + "/Get" + pluralEntity)
  }
  SetDataSourcePath(path: string) {
    this.Config.DataSourcePath = path;
  }

  componentDidMount(){
    this.Init();
  }

  setInitData(firstLoad: boolean = false){
    var data = undefined;
    if(firstLoad) data = this.props.data 
    var page = parseInt(getQueryParam("page", 1));
    var pageSize = parseInt(getQueryParam("pageSize", 25));
    var sortBy = getQueryParam("sortBy", "");
    var sortDirection = getQueryParam("sortDirection", "");
    var filters = queryParamsAsObject("Filters.", true)
    var comparisons = queryParamsAsObject("Comp.", true)
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

    this.setState({path: Router.asPath, clickedRowIndex: -2, initialized: true, loadingState: data? LoadingState.Loaded: LoadingState.Waiting, page: page, pageSize: pageSize, filter: filters, sorter: {name: sortBy, ascending : sortDirection === "ASC"}, data: data, messages: [], languageID: this.DefaultLanguageID})
  }

  componentDidUpdate(prevProps: any, prevState: any){
    // console.log("Reiniting binder", prevState, this.state)
    if(this.state.path != Router.asPath || (this.state.loadingState == LoadingState.Loaded && !this.state.data)){
      this.setInitData()
    }
    else if(this.state.loadingState === LoadingState.Waiting){
      // console.log("loading binder data")
      this.getData().then((data) => {
        if(data && data.data)
          this.setState({path: Router.asPath, data: data.data, totalDatacount: data.totalDataCount, messages: data.messages})
        else if(data)
          this.setState({path: Router.asPath, data: [], totalDatacount: 0, messages: data.messages})
      })
    }
    else{
      if(!this.props.shownInParent) this.props.AppClient?.UpdateMetaTags();
    }
  }

  setMetaTags(data: any){
    if(!this.state.data || !this.props.AppClient || !this.Config.Entity) return
    if(!this.props.AppClient.DynamicSEO){
      this.props.AppClient.DynamicSEO = {};
    } 
    if(!this.props.AppClient.DynamicSEO.Title) this.props.AppClient.DynamicSEO.Title = Pluralize(this.Config.Entity)

    if(!this.Options.PageTitle) this.Options.PageTitle = this.props.AppClient.DynamicSEO.Title;
    if(!this.Options.PageTitle) this.Options.PageTitle = this.props.AppClient.Translate(this.Config.Entity + "List");
  }

  getData = async () => {
    // console.log("binder.Config.Data", binder.Config.Data)
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
          queryData.processQuery(this.Config.Table?.Columns, this.state.filter, this.state.sorter)
        
        var initialFilters = this.props.initialFilters ?? {};
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
        return data;
      } catch (error) {
        this.setState({loadingState: LoadingState.Failed })
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
      return formatString(this.Options.EditURL, id);
    
    return `/${this.Config.Schema}/edit${this.Config.Entity}/${id}`;
  };

  getExportFileName(){
    return this.Options.PageTitle ?? "File";
  }

  async onExportButtonClicked(option: ExportOption){
    if(this.RootElementRef.current){
      if(this.Options.ExportMode == "screenshot"){
        if(option.extension == "pdf"){
          var exporter = new PDFExporter();
          exporter.HtmlElement = this.RootElementRef.current
          exporter.FileName = this.getExportFileName() + "." + option.extension;
          exporter.Export();
        }
        else if(option.extension == "xls"){
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
      return formatString(this.Options.ViewURL, id);
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
  onButtonClicked = async (key: string) => {
    if(key == "AddNew"){
      this.setState({clickedRowIndex: -1})
    }
  }
  onCellValueChanged(row: any, column: TableColumnClass){
    this.SaveEntity(row)
  }
  async SaveEntity(data: any){
    let postData: any = { Data: data, languageID: this.state.languageID };
    try {
      const result = await this.CreateService()?.CreateEndpoint(
        `${this.Config.Schema}/update${this.Config.Entity}`,
        { Payload: postData }
      ).call();
      if(result === undefined)
        return;

      if (!result.hasFailed) {
        raiseCustomEvent("notification", { type: "info", title: this.props.AppClient?.Translate("Info"), description: this.props.AppClient?.Translate("EntitySavedSuccessfully")  })
      } else {
        raiseCustomEvent("notification", { type: "error", title: this.props.AppClient?.Translate("Error"), description: this.props.AppClient?.Translate("EntityCouldNotBeSaved")  })
      }
    } catch (error) {}
}
  onCellClick(e: React.MouseEvent<HTMLTableCellElement>, row: any, column: TableColumnClass, rowIndex: number, columnIndex: number){
    if(column.AllowEditing != true && this.Config.RowClickOption == "showEntityBinder"){
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
  onPageChange(i: number){
    Router.push("", replaceQueryParam("page", i.toString()), { shallow: true })
  }
  onPageSizeChange(i: number){
    Router.push("", replaceQueryParam("pageSize", i.toString()), { shallow: true })
  }
  onSortingChanged(column: TableColumnClass, direction: string){
    if(column.PropertyName){
      Router.push("", replaceQueryParam("sortDirection", direction, replaceQueryParam("sortBy", column.PropertyName)), { shallow: true })
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
        url = replaceQueryParam("Filters." + column.Filtering.Name, column.Filtering.Value, url)
        if(column.IsFiltered === true) {
          if(column.Filtering.Comparison || column.Filtering.Comparison == 0) url = replaceQueryParam("Comp." + column.Filtering.Name, column.Filtering.Comparison.toString(), url)
        }
        else{
          url = replaceQueryParam("Comp." + column.Filtering.Name, "", url)
        }
      }
    });
    Router.push("", url, { shallow: true }) 
  }
  renderCellValue = (row: any, column: TableColumnClass, value?: string) => {
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
  render(): React.ReactNode {
    if(!this.Config.Table || !this.state || !this.state.data)
      return <></>

    this.setMetaTags(this.state.data)
    this.OnBeforeRender();
    return <>
      {this.renderHeader()}
      {this.state.clickedRowIndex > -2 && this.Config.RowClickOption == "showEntityBinder" && <Modal className={this.Theme.Binders?.SubBinderModal?.Class} key={this.state.clickedRowIndex} dismissOnBackdropClick={true} defaultOpen={true}>
        {this.state.clickedRowIndex >= 0 && this.renderEntityBinder(this.state.data[this.state.clickedRowIndex])}
        {this.state.clickedRowIndex == -1 && this.renderEntityBinder({id:0})}
      </Modal>}
      <div className="collection-binder">
        <div ref={this.RootElementRef}>
          <Table appClient={this.props.AppClient} table={this.Config.Table} data={this.state.data} listener={this}/>
        </div>
        <Pagination pagesTitle={this.props.AppClient?.Translate("{0}/{1}")} pageSizeSelectionText={this.props.AppClient?.Translate("Results per page")} pageUrl="" totalDatacount={this.state.totalDatacount} datacount={this.state.data.length} pageSize={this.state.pageSize} page={this.state.page} onChange={(e: any, i: number) => this.onPageChange(i)} onPageSizeChange={(e: any, i: number) => this.onPageSizeChange(i)} />
      </div>
      {this.renderFooter()}
    </>
  }
}
