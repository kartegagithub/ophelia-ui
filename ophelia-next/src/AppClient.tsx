import { AppTheme } from "./AppTheme";
import { UrlHandler } from "ophelia-core";
import { NextPageContext } from "next/types";
import AppClientBase from "ophelia-core";
import { UrlHandlerClass } from "./Routing";

export default class AppClient extends AppClientBase {
  Context?: NextPageContext
  Theme?: AppTheme
  
  PushUrl(destination: string, onSuccess?: Function) {
    return (UrlHandler.Current as UrlHandlerClass).Push(destination, this.Region, onSuccess);
  }

  constructor(){
    super();
  }
}