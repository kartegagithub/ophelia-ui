import React from "react";
import BinderOptions, { ExportOption } from "../BinderOptions";
import AppClient from "../../AppClient";
import Tab from "../..//Components/Tabs/Tab";
import Tabs from "../../Components/Tabs/Tabs";
import InputField from "../../Components/InputFields/inputField";
import Router from "next/router";
import ServiceMessageResult from "../../Service/serviceMessageResult";
import ServiceMessage from "../../Service/serviceMessage";
import { camelize, clone, pascalize, removeLastPropName } from "../../Extensions/StringExtensions";
import { LoadingState } from "../../Enums/loadingState";
import { getAppTheme } from "../../AppTheme";
import Panel from "../../Components/Panel";
import { resolveMimeType } from "../../Extensions/MimeTypeResolver";
import { ExcelExporter } from "../../Exporters/ExcelExporter";
import CollectionBinder from "../CollectionBinder/collectionBinder";
import { raiseCustomEvent } from "../../Extensions/DocumentExtension";
import FileData from "../../Models/FileData";
import { EntityOperations } from "../EntityOperations";
import { findInArray, getObjectValue, removeAtIndex } from "../../Extensions";
import ContentLoading from "../../Components/ContentLoading";
export class EntityBinderProps{
  Options?: BinderOptions
  id?: string | number | string[];
  shownInParent?: boolean
  Data?: any
  AppClient: AppClient | undefined
  useI18N?: boolean = false
  parent?: EntityBinder<{}> | CollectionBinder<{}>
  pageTitle?: string
}
export default class EntityBinder<P> extends React.Component<
  P & EntityBinderProps,
  {
    initialized: boolean, 
    loadingState: LoadingState, 
    id?: string | number | string[], 
    data: any, 
    messages: Array<ServiceMessage>, 
    languageID: number,
    rerenderCounter: number,
    processing: boolean
}
> {
  Key: number = 0;
  Controller: string = "";
  Entity: any;
  AjaxBinder = false;
  Options = new BinderOptions();
  Renderer = null;
  InputFields: Array<typeof InputField> = []
  UseI18n: boolean = false
  Languages: Array<{id: number, name: string, isoCode: string}> = []
  DefaultLanguageID: number = 0
  Theme = getAppTheme()
  RootElementRef = React.createRef<HTMLDivElement>();
  UploadFiles: Array<FileData> = new Array<FileData>();
  EntityOperations: EntityOperations
  constructor(props: P & EntityBinderProps){
    super(props)
    this.EntityOperations = new EntityOperations();
    if(props.AppClient) this.EntityOperations.Service = props.AppClient.CreateService()
  }
  
  Init() {
    if(this.state && this.state.initialized) return;
    if (this.props.Options)this.Options = { ...this.Options, ...this.props.Options };
    if(this.props.pageTitle && !this.Options.PageTitle) this.Options.PageTitle = this.props.pageTitle;
    this.Configure();
    this.EntityOperations.UpdateURL = `${this.Controller}/${this.getActionPath()}`
    this.EntityOperations.GetEntityURL = `${this.Controller}/Get${this.Entity}`
    this.EntityOperations.Entity = this.Entity;
    this.EntityOperations.UseI18n = this.UseI18n
    this.setInitData(true)
  }

  Configure() {}

  beforeSendRequest(data: any) {
    return data;
  }

  SetDataSource(controller: string, entity: string) {
    this.Controller = controller;
    this.Entity = entity;
  }

  registerField(field: any){
    var existing = findInArray(this.InputFields, field, "props.name")
    if(existing.index > -1){
      removeAtIndex(this.InputFields, existing.index)
    }
    this.InputFields.push(field)
  }
  
  getEditUrl(id = 0) {
    if (this.Options.EditURL) return this.Options.EditURL;

    return `/${this.Controller}/edit${this.Entity}/${id}`;
  };
  OnAfterSave(): {redirect: boolean, redirectURL?: string, } | undefined {
    return { redirect: true}
  }
  getBackUrl() {
    if (this.Options.BackURL) {
      return this.Options.BackURL;
    } else {
      return `/${this.Controller}/${camelize(this.Entity)}List`;
    }
  };
  getActionPath() {
    if (this.Options.ActionURL) {
      return this.Options.ActionURL;
    }
    return `Update${this.Entity}`;
  };
  useTabs(...children: React.ReactNode[]){
    return <Tabs key={this.Entity + "-tabs"} id={this.Entity + "-tabs"}>{children}</Tabs>
  }
  useTab(id: string, text?: string, visible?: boolean, active?: boolean, ...children: React.ReactNode[]){
    if(!visible) return <></>
    
    text = this.props.AppClient?.Translate(pascalize(text))
    return <Tab key={id} id={id} text={text} active={active}>{children}</Tab>
  }
  usePanel(text?: string, collapsed?: boolean, leftIcon?: string | React.JSX.Element, rightIcon?: string | React.JSX.Element, ...children: React.ReactNode[]){
    text = this.props.AppClient?.Translate(pascalize(text))
    return <Panel headerText={text} collapsed={collapsed} leftIcon={leftIcon} rightIcon={rightIcon}>{children}</Panel>
  }
  useInput(props: any){
    if(!props.text && props.name)
      props.text = this.props.AppClient?.Translate(pascalize(removeLastPropName(props.name, "ID")))
    if(props.type == "file"){
      props.accept = this.getAllowedFileExtensions(props.name)
    }
    if(props.type == "richtext"){
      props.imageHandler = (fileName: string, size: number, buffer: ArrayBuffer, base64: string | undefined) => this.ImageUploadHandler(fileName, size, buffer, base64)
    }
    if(props.i18n) props.languageKey = `${this.state.languageID}`
    else props.languageKey = "0";
    return <InputField languageID={this.state.languageID} translateFn={(key: string) => this.props.AppClient?.Translate(key)} key={this.Entity + this.state.id + "-field-" + props.name} {...props} listener={this}/>
  }
  async ImageUploadHandler(fileName: string, size: number, buffer: ArrayBuffer, base64: string | undefined){
    return undefined
  }
  useI18NLanguageSelection(){
    this.UseI18n = true; 
    var props = {id: "selectedLanguageID", labelVisible: false, text: this.props.AppClient?.Translate("SelectedLanguageID"), name: "selectedLanguageID", value: this.state.languageID, type: "selectbox", switchbox: true, options: this.Languages, displayProp: "name", valueProp: "id"}
    return <InputField key={this.Entity + "-field-" + props.name} {...props} listener={this}/>
  }
  getAllowedFileExtensions(name: string){
    if(name.toLocaleLowerCase().indexOf("image") > -1){
      return ".jpg,.jpeg,.png,.webp"
    }
    else if(name.toLocaleLowerCase().indexOf("video") > -1){
      return "video/*"
    }
    else
      return "image/*,video/*,.doc,.docx,.xls,.xlsx,.pdf"
  }
  CreateService() {
    return this.props.AppClient?.CreateService();
  }

  async onButtonClicked (key: string, params?: any) {
    if(key === "Save"){
      this.SaveEntity();
    }
    else if(key === "Delete" && confirm(this.props.AppClient?.Translate("AreYouSureToDelete"))){
      this.DeleteEntity()
    }
    else if(key === "AddNew"){
      this.resetMetaTags()
      this.setInitData(false, true)
    }
    else if(key === "Reload"){
      this.setInitData(false, false, this.state.data.id)
    }
  }
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
  resetMetaTags(){
    if(!this.props.AppClient) return
    if(!this.props.AppClient.DynamicSEO) this.props.AppClient.DynamicSEO = {};
    this.props.AppClient.DynamicSEO.Title = undefined
    this.Options.PageTitle = undefined
  }
  setMetaTags(data: any){
    if(!data || !this.props.AppClient) return
    if(!this.props.AppClient.DynamicSEO) this.props.AppClient.DynamicSEO = {};
    if(!this.props.AppClient.DynamicSEO.Title) this.props.AppClient.DynamicSEO.Title = this.props.AppClient?.Translate(this.Entity) + " (#" + data.id + ")"
    if(!this.Options.PageTitle) this.Options.PageTitle = this.props.AppClient.DynamicSEO.Title;
    if(!this.Options.PageTitle) this.Options.PageTitle = this.props.AppClient?.Translate(this.Entity);
  }
  validateFields(){
    var validForm = true;
    for (let index = 0; index < this.InputFields.length; index++) {
      const field: any = this.InputFields[index];
      if(field.Validate){
        var value = getObjectValue(this.state.data, field.props.name);
        if(field.props.type == "filterbox" && field.props.multipleSelection !== true) value = getObjectValue(this.state.data, field.props.name + "ID");
        if(field.props.type == "filterbox" && field.props.multipleSelection === true) value = getObjectValue(this.state.data, field.props.name);
        if(!value && field.props.type == "file"){
          value = this.UploadFiles.filter((file) => file.StatusID != 2 && file.KeyName == field.props.name && (file.LanguageID == 0 || file.LanguageID == this.state.languageID));
        }
        var valid = field.Validate(value)
        if(!valid) validForm = false;
      }
    }
    return validForm;
  }

  checkFieldVisibilities(){
    var rerender: boolean = false;
    this.InputFields.forEach((field: any) => {
      if(field.getVisibility == undefined) return;

      var visibility = true;
      if(typeof field.getVisibility == "function") visibility = field.getVisibility();
      else visibility = field.getVisibility;

      if(visibility != field.checkVisibility(false)){
        rerender = true;
        //console.log("getVisibility", field.getVisibility, field.checkVisibility(false));
      }
    })
    if(rerender) this.setState({rerenderCounter: this.state.rerenderCounter + 1})
  }
  async GetEntity(id: any, data: any){
    this.setState({loadingState: LoadingState.Loading})
    var result = await this.EntityOperations.GetEntity(id, data)
    this.UploadFiles = [];
    this.setState({loadingState: result.hasFailed? LoadingState.Failed: LoadingState.Loaded})
    return result;
  }
  async SaveEntity(){
      if(!this.validateFields()) return;
      var data: any = clone(this.state.data);
      var redirect: boolean = true
      if (data.id && data.id > 0) redirect = false;

      try {
        data = this.beforeSendRequest(data);
        this.setState({processing: true})
        var result = await this.EntityOperations.SaveEntity(this.state.languageID, data, this.UploadFiles);
        this.setState({processing: false})
        if(!result) {
          raiseCustomEvent("notification", { type:"info", title: this.props.AppClient?.Translate("Error"), description: this.props.AppClient?.Translate("CouldNotReachToAPI")  })
        }
        else{
          if (!result.hasFailed) {
            this.UploadFiles = [];
            this.setState({data: result.data});
            var saveResult = this.OnAfterSave();
            var redirectURL: string | undefined = undefined;
            if(saveResult && saveResult.redirect != undefined) redirect = saveResult.redirect;
            if(saveResult && saveResult.redirectURL != undefined) redirectURL = saveResult.redirectURL;

            if (redirect && this.props.shownInParent !== true) {
              if(redirectURL)
                Router.push(redirectURL)
              else
                Router.push(this.getBackUrl())
            }
            if(this.props.parent != null) this.props.parent.onChildAction("refreshData")
            else if(!redirect){
              if(redirectURL)
                Router.push(redirectURL)
              else
                Router.push(this.getEditUrl(result.data.id))
            }
            raiseCustomEvent("notification", { type:"info", title: this.props.AppClient?.Translate("Info"), description: this.props.AppClient?.Translate("EntitySavedSuccessfully")  })
          } else {
            if (result.messages && result.messages.length > 0) {
              this.setState({messages: result.messages})
            }
          }
        }
      } catch (error) {}
  }

  async DeleteEntity(){
    try {
      this.setState({processing: true})
      var result = await this.EntityOperations.DeleteEntity(this.state.data)
      if(result){
        if (!result.hasFailed) {
          this.UploadFiles = [];
          if (this.props.shownInParent !== true) {
            Router.push(this.getBackUrl())
          }
          else if(this.props.parent != null)
          {
            this.props.parent.onChildAction("refreshData")
          }
        } else {
          if (result.messages && result.messages.length > 0) {
            this.setState({messages: result.messages})
          }
        }
        raiseCustomEvent("notification", { type: "info", title: this.props.AppClient?.Translate("Info"), description: this.props.AppClient?.Translate("EntityDeletedSuccessfully")  })
      }
    } catch (error) {}
    this.setState({processing: false})
  }

  getFieldData(field: any) {
    var data = this.EntityOperations.getFieldData(this.state.data, field, this.state.languageID)
    if(this.UploadFiles && this.UploadFiles.length > 0 && field.props.name.endsWith("Path")){
      var fileList: Array<FileData> = []
      for (let index = 0; index < this.UploadFiles.length; index++) {
        const element = this.UploadFiles[index];
        if(element.StatusID != 2 && element.KeyName == field.props.name && (element.LanguageID == 0 || element.LanguageID == this.state.languageID)){
          fileList.push(element);
        }
      }
      if(data && fileList.length == 0){
        fileList.push(data);
      }
      return fileList
    }
    return data
  }

  translate(key: string){
    return this.props.AppClient?.Translate(key)
  }
  imageParsed(){
    this.setState({ rerenderCounter: this.state.rerenderCounter + 1})
  }
  setFieldData(name: string, value: any, field: any){
    if(name == "selectedLanguageID"){
      this.setState({languageID: parseInt(value)})
      return;
    }
    this.EntityOperations.setFieldData(this.state.data, name, value, this.state.languageID, this.UploadFiles, field?.props?.multiple, field?.props?.i18n, () => this.imageParsed())
    this.checkFieldVisibilities();
  }
  setFileDeleted(deletedFile: FileData){
    var existing = this.UploadFiles.find((file) => file.FileName == deletedFile.FileName)
    if(!existing){
      this.UploadFiles.push(deletedFile)
      existing = deletedFile;
    }
    existing.StatusID = 2;
  }

  setInitData(firstLoad: boolean = false, resetForNew: boolean = false, reloadID: any = undefined){
    var id: string | undefined | number | string[] = this.props.id;
    if(reloadID) id = reloadID;

    if(resetForNew) id = 0;
    var data: any = undefined;
    if(firstLoad) data = this.props.Data 
    if(!id && this.props.shownInParent !== true) {
      var splittedURL = window.location.href.split("/");
      id = splittedURL[splittedURL.length - 1];
    }
    if (!data && (!id || id === "0")) {
      data = {id: 0}
      id = 0;
      this.Options.IsNewEntity = true;
    }
    else {
      if(!data && id && parseInt(id as string) > 0)
        this.Options.IsNewEntity = false;
      else if(data)
        this.Options.IsNewEntity = data?.id == 0
    }
    this.setState({loadingState: data? LoadingState.Loaded: LoadingState.Waiting, id: id, data: data, messages: [], languageID: this.DefaultLanguageID})
    if(data) this.onAfterSetData(data);
  }

  componentDidMount(){
    this.Options = new BinderOptions();
    this.Options.AllowExport = false;
    this.UseI18n = this.props.useI18N === true;
    this.Key = Math.random() * (10000 - 1) + 1;
    this.Init();
  }

  componentDidUpdate(prevProps: any, prevState: any){
    if(this.state.loadingState == LoadingState.Loaded && (!prevProps || prevProps.id != this.props.id || !this.state.data)){
      this.setInitData()
    }
    else if(this.state.loadingState === LoadingState.Waiting){
      this.GetEntity(this.state.id, this.state.data).then((data) => {
        if(data && data.data){
          this.setState({id: this.props.id, data: data.data, messages: data.messages, languageID: this.DefaultLanguageID})
          this.onAfterSetData(data.data)
        }
        else if(data){
          this.setState({id: 0, data: {id: 0}, messages: data.messages})
          this.onAfterSetData({id: 0})
        }
      })
    }
    else{
      this.setMetaTags(this.state.data);
      if(!this.props.shownInParent) this.props.AppClient?.UpdateMetaTags();
    }
  }
  onAfterSetData(data: any){
    this.setMetaTags(data);
  }
  onChildAction(type: string){

  }
  render(): React.ReactNode {
    //console.log("EntityBinder render");
    if(!this.state || !this.state.data)
      return <></>
    
    this.setMetaTags(this.state.data);
    return (<>
        <ContentLoading appClient={this.props.AppClient} loading={this.state.processing || (this.state.loadingState != LoadingState.Failed && this.state.loadingState != LoadingState.Loaded)}>
          {this.renderHeader()}
          <div className="oph-entityBinders" key="entity-binder" ref={this.RootElementRef}>
            {this.state.processing === true && <div className="oph-entityBinders-label">
              <label>{this.props.AppClient?.Translate("ProcessingPleaseWait")}</label>
            </div>}
            {this.state.messages?.map((item: any, index: number) => (
              <ServiceMessageResult
                code={item.code}
                description={item.description}
                key={index}
                type={0}
              />
            ))}
            {this.renderBinder()}
          </div>
          {this.renderFooter()}
        </ContentLoading>
      </>
    )
  }
  renderHeader(){
    return <></>
  }
  renderFooter(){
    return <></>
  }
  renderBinder(): React.ReactNode | React.ReactNode[]{
    return <></>
  }
}
