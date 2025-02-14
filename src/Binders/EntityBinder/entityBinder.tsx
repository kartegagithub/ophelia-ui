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
import { findInArray, getCaseLocale, getObjectValue, removeAtIndex, setObjectValue } from "../../Extensions";
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
  initialFilters?: any
  onDataChange?: ((data: any) => void)
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
    processing: boolean,
    rerenderKey?: any,
    customStateData?: any
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
  AfterSaveAction: "BackToList" | "PreviousPage" | "RefreshData" = "RefreshData"
  RefreshDataOnLoad: boolean = false;
  PreviousStateData: any;

  constructor(props: P & EntityBinderProps){
    super(props)
    this.EntityOperations = new EntityOperations();
    if(props.AppClient) this.EntityOperations.Service = props.AppClient.CreateService()
  }
  
  async Init() {
    if(this.state && this.state.initialized) return;
    if (this.props.Options)this.Options = { ...this.Options, ...this.props.Options };
    if(this.props.pageTitle && !this.Options.PageTitle) this.Options.PageTitle = this.props.pageTitle;
    this.Configure();
    this.EntityOperations.UpdateURL = `${this.Controller}/${this.getActionPath()}`
    this.EntityOperations.GetEntityURL = `${this.Controller}/Get${this.Entity}`
    this.EntityOperations.Entity = this.Entity;
    this.EntityOperations.UseI18n = this.UseI18n
    await this.setInitData(true)
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
  async OnAfterSave(): Promise<{redirect: boolean, redirectURL?: string, } | undefined> {
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
  validateFileUpload(file: File){
    return true;
  }
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
      if(!props.validateFile){
        props.validateFile = (file: File) => {
          return this.validateFileUpload(file);
        }
      }
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
    if(name.toLocaleLowerCase(getCaseLocale()).indexOf("image") > -1){
      return ".jpg,.jpeg,.png,.webp"
    }
    else if(name.toLocaleLowerCase(getCaseLocale()).indexOf("video") > -1){
      return "video/*"
    }
    else
      return "image/*,video/*,.doc,.docx,.xls,.xlsx,.pdf"
  }
  CreateService() {
    return this.props.AppClient?.CreateService();
  }
  ProcessCopiedData(data: any){
    return data;
  }
  async ConfirmDeletion(){
    return confirm(this.props.AppClient?.Translate("AreYouSureToDelete"))
  }
  async onButtonClicked (key: string, params?: any) {
    if(key === "Save"){
      if(this.Options.AllowSave != false)
        this.SaveEntity();
    }
    else if(key === "Delete" && await this.ConfirmDeletion()){
      if(this.Options.AllowDelete != false)
        this.DeleteEntity()
    }
    else if(key === "CopyAndSave" && !this.Options.IsNewEntity && this.Options.AllowCopyAndSave == true){
      this.resetMetaTags();
      this.setState({processing: true});
      var newData = this.ProcessCopiedData(clone(this.state.data));
      newData.id = 0;
      if(Object.hasOwn(newData, "name")) newData.name += " (Copy)";
      else if(Object.hasOwn(newData, "title")) newData.title += " (Copy)";
      else if(Object.hasOwn(newData, "text")) newData.text += " (Copy)";
      var result = await this.EntityOperations.SaveEntity(this.state.languageID, newData, []);
      this.setState({processing: false});
      if(result.data){
        if(this.props.shownInParent == true){
          this.props.parent?.onChildAction("refreshData", this.AfterSaveAction == "RefreshData"? (await this.GetEntity(result.data.id, undefined)).data: undefined);
        }
        else
          Router.push(this.getEditUrl(result.data.id))
      }
      else if (result.messages && result.messages.length > 0) {
        this.setState({messages: result.messages})
      }
    }
    else if(key === "AddNew"){
      if(this.Options.AllowSave != false){
        this.resetMetaTags()
        await this.setInitData(false, true)
      }
    }
    else if(key === "Reload"){
      if(this.Options.AllowRefresh != false){
        await this.setInitData(false, false, this.state.data.id)
      }
    }
  }
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

  // checkFieldVisibilities(){
  //   var rerender: boolean = false;
  //   this.InputFields.forEach((field: any) => {
  //     if(field.getVisibility != undefined){
  //       var visibility = true;
  //       if(typeof field.getVisibility == "function") visibility = field.getVisibility();
  //       else visibility = field.getVisibility;
  
  //       if(visibility != field.checkVisibility(false)){
  //         rerender = true;
  //         //console.log("getVisibility", field.getVisibility, field.checkVisibility(false));
  //       }
  //     }
  //     if(field.getDisabled != undefined){
  //       if(field.getDisabled() != field.checkDisabled()){
  //         rerender = true;
  //         //console.log("getVisibility", field.getVisibility, field.checkVisibility(false));
  //       }
  //     }
      
  //   })
  //   if(rerender) this.setState({rerenderCounter: this.state.rerenderCounter + 1})
  // }
  async GetEntity(id: any, data: any): Promise<any>{
    this.setState({loadingState: LoadingState.Loading})
    var result = await this.EntityOperations.GetEntity(id, data, this.props.initialFilters)
    this.PreviousStateData = clone(result.data);

    this.UploadFiles = [];
    if(result.data){
      this.setState({loadingState: LoadingState.Loaded, id: this.props.id, data: result.data, messages: result.messages, languageID: this.DefaultLanguageID})
      this.onAfterSetData(result.data)
    }
    else
      this.setState({loadingState: LoadingState.Failed})
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
            var saveResult = await this.OnAfterSave();
            var redirectURL: string | undefined = undefined;
            if(saveResult && saveResult.redirect != undefined) redirect = saveResult.redirect;
            if(saveResult && saveResult.redirectURL != undefined) redirectURL = saveResult.redirectURL;

            if (redirect && this.props.shownInParent !== true) {
              if(redirectURL)
                Router.push(redirectURL)
              else{
                if(this.AfterSaveAction == "RefreshData"){
                  await this.GetEntity(result.data.id, undefined)
                }
                if(this.AfterSaveAction == "PreviousPage"){
                  Router.back();
                }
                else
                  Router.push(this.getBackUrl())
              }
            }
            else{
              if(this.props.parent != null){
                this.props.parent.onChildAction("refreshData", this.AfterSaveAction == "RefreshData"? (await this.GetEntity(result.data.id, undefined)).data: undefined)
              }
              else if(!redirect){
                if(redirectURL)
                  Router.push(redirectURL)
                else
                  await this.GetEntity(result.data.id, undefined)
              }
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
            if(this.AfterSaveAction == "BackToList")
              Router.push(this.getBackUrl())
            else
              Router.back();
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
  async goBack(){
    if(this.state.data?.hasUnsavedChanges){
      if(!confirm(this.props.AppClient?.Translate("AreYouSureToGoBackWithoutSaving")))
        return;
      else{
        if(this.props.shownInParent == true) {
          this.props.parent?.onChildAction("back", this.PreviousStateData)
          return;
        }
        else Router.back();
      }
      return;
    }
    if(this.props.shownInParent == true) {
      this.props.parent?.onChildAction("back")
      return;
    }
    else Router.back();
  }
  setFieldData(name: string, value: any, field: any, rawValue?: any){
    if(name == "selectedLanguageID"){
      this.setState({languageID: parseInt(value)})
      return;
    }
    setObjectValue(this.state.data, "hasUnsavedChanges", true)
    this.EntityOperations.setFieldData(this.state.data, name, value, this.state.languageID, this.UploadFiles, field?.props?.multiple, field?.props?.i18n, () => this.imageParsed())
    if(field && field.props.type == "filterbox" && field.props.multipleSelection !== true){
      var idName = field.props.name;
      if(idName.indexOf("ID") > -1) 
        idName = idName.substring(0, idName.length - 2);
      if(Array.isArray(rawValue))
      {
        if(rawValue.length > 0)
          this.EntityOperations.setFieldData(this.state.data, idName, rawValue[0], this.state.languageID, [], field?.props?.multiple, field?.props?.i18n)
        else
          this.EntityOperations.setFieldData(this.state.data, idName, undefined, this.state.languageID, [], field?.props?.multiple, field?.props?.i18n)
      }
      else
        this.EntityOperations.setFieldData(this.state.data, idName, rawValue, this.state.languageID, [], field?.props?.multiple, field?.props?.i18n)
    }
    //this.checkFieldVisibilities();
    this.setState({rerenderCounter: this.state.rerenderCounter + 1})
    if(this.props.onDataChange)
      this.props.onDataChange(this.state.data);
  }
  setFileDeleted(deletedFile: FileData){
    var existing = this.UploadFiles.find((file) => file.FileName == deletedFile.FileName)
    if(!existing){
      this.UploadFiles.push(deletedFile)
      existing = deletedFile;
    }
    existing.StatusID = 2;
  }

  async setInitData(firstLoad: boolean = false, resetForNew: boolean = false, reloadID: any = undefined){
    var id: string | undefined | number | string[] = this.props.id;
    if(reloadID) id = reloadID;

    if(resetForNew) id = 0;
    var data: any = undefined;
    if(firstLoad){
      if(this.RefreshDataOnLoad && this.props.Data?.id > 0){
        id = this.props.Data?.id;
      }
      else
        data = this.props.Data 
    }
    if(!id && this.props.shownInParent !== true) {
      var splittedURL = window.location.href.split("/");
      id = splittedURL[splittedURL.length - 1];
    }
    if (!data && (!id || id === "0")) {
      data = await this.CreateEntity();
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
    if(data){
      this.PreviousStateData = clone(data);
    }
    if(data) this.onAfterSetData(data);
  }

  async CreateEntity(): Promise<any>{
    if(this.props.initialFilters)
      return {...this.props.initialFilters, ...{ id: 0 }};
    else
      return { id: 0 };
  }
  async componentDidMount(){
    this.Options = new BinderOptions();
    this.Options.AllowExport = false;
    this.UseI18n = this.props.useI18N === true;
    this.Key = Math.random() * (10000 - 1) + 1;
    await this.Init();
  }

  async componentDidUpdate(prevProps: any, prevState: any){
    if(this.state.loadingState == LoadingState.Loaded && (!prevProps || prevProps.id != this.props.id || !this.state.data)){
      await this.setInitData()
    }
    else if(this.state.loadingState === LoadingState.Waiting){
      this.GetEntity(this.state.id, this.state.data)
    }
    else{
      this.setMetaTags(this.state.data);
      if(!this.props.shownInParent) this.props.AppClient?.UpdateMetaTags();
    }
  }
  onAfterSetData(data: any){
    this.setMetaTags(data);
  }
  onChildAction(type: string, param?: any){
    
  }
  render(): React.ReactNode {
    //console.log("EntityBinder render");
    if(!this.state || !this.state.data)
      return <></>
    
    this.setMetaTags(this.state.data);
    return (<>
        <ContentLoading appClient={this.props.AppClient} loading={this.state.processing || (this.state.loadingState != LoadingState.Failed && this.state.loadingState != LoadingState.Loaded)}>
          {this.renderHeader()}
          <div className={`oph-entityBinders ${this.state.data.hasUnsavedChanges? "modified": ""}`} key="entity-binder" ref={this.RootElementRef}>
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
