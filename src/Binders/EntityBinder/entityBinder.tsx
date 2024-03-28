import React from "react";
import BinderOptions, { ExportOption } from "../BinderOptions";
import AppClient from "../../AppClient";
import Tab from "../..//Components/Tabs/Tab";
import Tabs from "../../Components/Tabs/Tabs";
import InputField from "../../Components/InputFields/inputField";
import Router from "next/router";
import ServiceMessageResult from "../../Service/serviceMessageResult";
import ServiceMessage from "../../Service/serviceMessage";
import { camelize, clone, pascalize, removeLastPropName } from "../../../Ophelia/Extensions/StringExtensions";
import { LoadingState } from "../../../Ophelia/Enums/loadingState";
import { getAppTheme } from "../../AppTheme";
import { getObjectValue, setObjectValue } from "../../Extensions/ReflectionExtensions";
import Panel from "../../Components/Panel/Panel";
import { PDFExporter } from "../../Exporters/PDFExporter";
import { resolveMimeType } from "../../../Ophelia/Extensions/MimeTypeResolver";
import { ExcelExporter } from "../../../Ophelia/Exporters/ExcelExporter";
import CollectionBinder from "../CollectionBinder/collectionBinder";
import { raiseCustomEvent } from "../../Extensions/DocumentExtension";
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
  {initialized: boolean, loadingState: LoadingState, id?: string | number | string[], data: any, messages: Array<ServiceMessage>, languageID: number}
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
  i18nProperty: string = ""
  Theme = getAppTheme()
  RootElementRef = React.createRef<HTMLDivElement>();
  constructor(props: P & EntityBinderProps){
    super(props)
  }
  
  Init() {
    if(this.state && this.state.initialized) return;
    if (this.props.Options)this.Options = { ...this.Options, ...this.props.Options };
    if(this.props.pageTitle && !this.Options.PageTitle) this.Options.PageTitle = this.props.pageTitle;
    this.Configure();
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
    var existing = this.InputFields.find((item: any) => item.props.name == field.props.name)
    if(!existing){
      this.InputFields.push(field)
    }
  }
  
  getI18NProperty(){
    if(!this.i18nProperty && this.UseI18n)
    {
      var i18nProp = Object.keys(this.state.data).find((item) => item.toLocaleUpperCase().indexOf("I18N") > -1)
      if(!i18nProp && this.UseI18n) i18nProp = camelize(this.Entity) + "_i18n"
      if(i18nProp){
        this.i18nProperty = i18nProp;  
        if(!this.state.data[this.i18nProperty]) this.state.data[this.i18nProperty] = [];
      }
    }
    return this.i18nProperty;
  }
  getI18NData(){
    if(this.i18nProperty && this.UseI18n && this.state && this.state.data && this.state.data[this.i18nProperty]){
      var data = (this.state.data[this.i18nProperty] as Array<any>).find((item) => item.languageID == this.state.languageID)
      return data;
    }
  }

  addI18NData(){
    if(this.i18nProperty && this.UseI18n && this.state && this.state.data && this.state.data[this.i18nProperty]){
      var list = this.state.data[this.i18nProperty] as Array<any>;
      var data = list.find((item) => item.languageID == this.state.languageID)
      if(data) return data;

      var data:any;
      if(list.length > 0)
        data = JSON.parse(JSON.stringify(list[0]))
      else
        data = JSON.parse(JSON.stringify(this.state.data))

      data.id = 0;
      data.languageID = this.state.languageID;
      delete data[this.i18nProperty]
      delete data["isImporting"]
      delete data["isSelected"]
      delete data["isValid"]
      delete data["userCreatedID"]
      delete data["userModifiedID"]
      delete data["dateCreated"]
      delete data["dateModified"]
      delete data["captcha"]
      list.push(data)
      return data;
    }
    return undefined;
  }

  getEditUrl = (id = 0) => {
    if (this.Options.EditURL) return this.Options.EditURL;

    return `/${this.Controller}/edit${this.Entity}/${id}`;
  };
  OnAfterSave() {}
  getBackUrl = () => {
    if (this.Options.BackURL) {
      return this.Options.BackURL;
    } else {
      return `/${this.Controller}/${camelize(this.Entity)}List`;
    }
  };
  getActionPath = () => {
    if (this.Options.ActionURL) {
      return this.Options.ActionURL;
    }
    return `Update${this.Entity}`;
  };
  useTabs(...children: React.ReactNode[]){
    return <Tabs key={this.Entity + "-tabs"} id={this.Entity + "-tabs"}>{children}</Tabs>
  }
  useTab(id: string, text?: string, active?: boolean, ...children: React.ReactNode[]){
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
    return <InputField translateFn={(key: string) => this.props.AppClient?.Translate(key)} key={this.Entity + "-field-" + props.name} {...props} listener={this}/>
  }
  useI18NLanguageSelection(){
    this.UseI18n = true; 
    var props = {id: "selectedLanguageID", text: this.props.AppClient?.Translate(pascalize("SelectedLanguageID")), name: "selectedLanguageID", value: this.state.languageID, type: "selectbox", options: this.Languages, displayProp: "name", valueProp: "id"}
    return <InputField key={this.Entity + "-field-" + props.name} {...props} listener={this}/>
  }
  CreateService() {
    return this.props.AppClient?.CreateService();
  }

  onButtonClicked = async (key: string, params?: any) => {
    if(key === "Save"){
      this.SaveEntity();
    }
    else if(key === "Delete" && confirm(this.props.AppClient?.Translate("AreYouSureToDelete"))){
      this.DeleteEntity()
    }
    if(key === "AddNew"){
      this.resetMetaTags()
      this.setInitData(false, true)
    }
  }
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
  resetMetaTags(){
    if(!this.props.AppClient) return
    if(!this.props.AppClient.DynamicSEO) this.props.AppClient.DynamicSEO = {};
    this.props.AppClient.DynamicSEO.Title = undefined
    this.Options.PageTitle = undefined
  }
  setMetaTags(data: any){
    if(!data || !this.props.AppClient) return
    if(!this.props.AppClient.DynamicSEO) this.props.AppClient.DynamicSEO = {};
    if(!this.props.AppClient.DynamicSEO.Title) this.props.AppClient.DynamicSEO.Title = this.props.AppClient.Translate(this.Entity) + " (#" + data.id + ")"
    if(!this.Options.PageTitle) this.Options.PageTitle = this.props.AppClient.DynamicSEO.Title;
    if(!this.Options.PageTitle) this.Options.PageTitle = this.props.AppClient.Translate(this.Entity);
  }
  validateFields(){
    var validForm = true;
    this.InputFields.forEach((field: any) => {
      if(field.Validate && !field.Validate()){
        validForm = false;
        // console.log("Empty", field.props)
      }
    })
    return validForm;
  }

  async GetEntity(id: any, data: any){
    if(!id && !data) return;
    if(data){
      this.setState({loadingState: LoadingState.Loaded})
      return {data: data, messages: []};
    }
    else if(this.Controller && this.Entity && id){
      this.setState({loadingState: LoadingState.Loading})
      try {
        let postData = {
          ...{
            Data: { id: id },
            id: id          
          }
        };

        var result = await this.CreateService()?.CreateEndpoint(
          `${this.Controller}/Get${this.Entity}`,
          { Payload: postData }
        ).call()
        this.setState({loadingState: LoadingState.Loaded})
        return result;
      } catch (error) { 
        console.error(error);
        this.setState({loadingState: LoadingState.Failed})
      }
    }
    return data;
  }
  async SaveEntity(){
      if(!this.validateFields()){
        return;
      }
      var redirect: boolean = true
      if (this.Options.IsNewEntity) {
        this.state.data.statusID = 1;
      }
      if (this.state.data.id && this.state.data.id > 0) {
        redirect = false;
      }

      let postData: any = { Data: this.state.data, languageID: this.state.languageID };
      try {
        postData = this.beforeSendRequest(postData);
        const result = await this.CreateService()?.CreateEndpoint(
          `${this.Controller}/${this.getActionPath()}`,
          { Payload: postData }
        ).call();
        if(result === undefined)
          return;

        if (!result.hasFailed) {
          this.setState({data: result.data});
          this.OnAfterSave();
          if (redirect && this.props.shownInParent !== true) {
            Router.push(this.getBackUrl())
          }
          if(this.props.parent != null) this.props.parent.onChildAction("refreshData")
          else if(!redirect){
            Router.push(this.getEditUrl(result.data.id))
          }
          raiseCustomEvent("notification", { type:"info", title: this.props.AppClient?.Translate("Info"), description: this.props.AppClient?.Translate("EntitySavedSuccessfully")  })
        } else {
          if (result.messages && result.messages.length > 0) {
            this.setState({messages: result.messages})
          }
        }
      } catch (error) {}
  }

  async DeleteEntity(){
    try {
      const service = this.CreateService();
      if(service === undefined)
        return;

      const postData: any = {
        Data: {...clone(this.state.data), ...{statusID: 2}},
      };
      const result = await this.CreateService()?.CreateEndpoint(
        `${this.Controller}/${this.getActionPath()}`,
        { Payload: postData }
      ).call();
      if(result){
        if (!result.hasFailed) {
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
  }

  getFieldData = (field: any) => {
    if(!this.state.data) return "";

    if(field.props.name === "id") return this.state.data.id
    if(field.props.name === "selectedLanguageID") return this.state.languageID
    
    var value = getObjectValue(this.state.data, field.props.name, "");
    if(this.UseI18n){
      if(!this.i18nProperty) this.getI18NProperty()
      var i18nData = this.getI18NData()
      if(!i18nData) i18nData = this.addI18NData();
      value = getObjectValue(i18nData, field.props.name, "")
    }
    return value
  }

  setFieldData(name: string, value: any){
    //console.log("setFieldData")
    if(!name && name === "id") return;
    if(name == "selectedLanguageID"){
      this.setState({languageID: parseInt(value)})
      return;
    }
    if(this.UseI18n){
      if(!this.i18nProperty) this.getI18NProperty()
      var i18nData = this.getI18NData()
      if(!i18nData) i18nData = this.addI18NData()
      if(i18nData) setObjectValue(i18nData, name, value)
      if(this.DefaultLanguageID == this.state.languageID) setObjectValue(this.state.data, name, value)
    }
    else setObjectValue(this.state.data, name, value)
  }

  setInitData(firstLoad: boolean = false, resetForNew: boolean = false){
    var id: string | undefined | number | string[] = this.props.id;
    if(resetForNew) id = 0;
    var data = undefined;
    if(firstLoad) data = this.props.Data 
    if(!id && this.props.shownInParent !== true) {
      var splittedURL = window.location.href.split("/");
      id = splittedURL[splittedURL.length - 1];
    }
    var isNew = false
    if (!data && (!id || id === "0")) {
      isNew = true
      data = {id: 0}
      id = 0;
      this.Options.IsNewEntity = true;
    }
    else this.Options.IsNewEntity = false;
    this.setState({loadingState: data? LoadingState.Loaded: LoadingState.Waiting, id: id, data: data, messages: [], languageID: this.DefaultLanguageID})
  }

  componentDidMount(){
    this.Options = new BinderOptions();
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
        if(data && data.data)
          this.setState({id: this.props.id, data: data.data, messages: data.messages, languageID: this.DefaultLanguageID})
        else if(data)
          this.setState({id: 0, data: {}, messages: data.messages})
      })
    }
    else{
      this.setMetaTags(this.state.data);
      if(!this.props.shownInParent) this.props.AppClient?.UpdateMetaTags();
    }
  }
  onChildAction(type: string){

  }
  render(): React.ReactNode {
    if(!this.state || !this.state.data)
      return <></>
    
    this.setMetaTags(this.state.data);
    return (<>
        {this.renderHeader()}
        <div className="entity-binder" key="entity-binder" ref={this.RootElementRef}>
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
