import Router from "next/router";
import { UrlHandlerClass as BaseUrlHandler } from "ophelia-core";

export class UrlHandlerClass extends BaseUrlHandler {
  constructor() {
    super();
  }

  Push(
    destination?: string | undefined,
    lang?: number | string | undefined,
    onSuccess?: Function
  ) {
    const url = this.Get(destination, lang);
    if (url === Router.asPath) return;
    return Router.push(url).then(() => onSuccess?.());
  }
}