import { NextPageContext } from "next";
import AnalyticsList from "./Metrics/AnalyticsList";
import IAnalytics from "./Metrics/IAnalytics";
import APIService from "./Service/apiService";
import { AppTheme } from "./AppTheme";
import { changeRegion } from "./Localization/RegionSetting";

export default class AppClient {
  Region: string = "EN"
  AppTitle: string = ""
  AppDescription: string = ""
  AppData: any
  Analytics: AnalyticsList = new AnalyticsList();
  IsClientSide: boolean = false
  Context?: NextPageContext
  Theme?: AppTheme
  DynamicSEO?: any = {}
  Hydrate() {

  }
  ChangeUserRegion = (code?: string) => {
    if(!code) code = this.Region
    if(!code) return;
    this.Region = code;
    changeRegion(code)
  }
  Translate(key?: string) {
    return key;
  }

  CreateService (): APIService {
    return new APIService();
  }
  RegisterAnalytics = (analytic: IAnalytics) => {
    this.Analytics.push(analytic);
  }
  UpdateMetaTags = () => {
    if(!this.DynamicSEO) return
    var seo = this.DynamicSEO;
    var head = document.getElementsByTagName("head")[0]

    var titleTag = head.getElementsByTagName("title")[0]
    if(!titleTag) head.append("<title></title>")
    if(seo.Title) head.getElementsByTagName("title")[0].innerHTML = seo.Title

    var metaTags = head.getElementsByTagName("meta")
    for (let index = 0; index < metaTags.length; index++) {
      const element = metaTags[index] as HTMLMetaElement;
      if(seo.Description && element.name === "description") element.content = seo.Description
      if(seo.Custom){
        seo.Custom.map((item: any) => {
            if(item.Name == element.name) element.content = item.Description
        })
      }
    }
    
  }
  constructor(){
    this.IsClientSide = global.window !== undefined;
  }
}