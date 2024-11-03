## AppClient
AppClient object is the base object of projects.
We use AppClient from request handling to processing of the page.
AppClient is created once at page life cycle and consumed by components top to bottom. Components share AppClient as prop with each other.

### Table of properties
| Property name | Type | Description |
|---|---|---|
| Region | string | Holds region info for user. Code must be registered as region |
| AppData | any | Required data for app flows | 
| Analytics | AnalyticsList | List of analytics | 
| DynamicSEO | {Title?: string, Description?: string, Custom?: Array<{Name: string, Description: string}>} | SEO info | 

### Table of functions
| Function name | Parameters | Description |
|---|---|---|
| Hydrate | N/A | Called when hydrating from server to client |
| ChangeUserRegion | code: string | Changes user region to one of the registered regions with given code |
| Translate | key: string | Returns related translation with key |
| CreateService | N/A | Returns Sub instance of APIService |
| RegisterAnalytics | analytic: IAnalytics | Registers custom analytics |
| UpdateMetaTags | N/A | Updates document headers from DynamicSEO property |
| PushURL | destination: string, onSuccess?: Function | Gets mapped url from UrlHandler and pushes to Router |
| GetURL | destination: string | Gets mapped url from UrlHandler |

### Extending AppClient
Each project should have its own ApplicationClient which extends AppClient.

Example:
```
import Settings from "../../appConstants"; //JSON config file

export default class ApplicationClient extends AppClient {
  AppData: AppSetting = new AppSetting();
  AppTitle: string = Settings.appTitle;
  AppDescription: string = Settings.appDescription;
  AppName: string = Settings.appName;
  AppServiceURL: string = Settings.apiURL;
  Region: string = Settings.appRegion;
  
  constructor() {
    super();
    this.Refresh();
  }
  Hydrate(): ApplicationClient {
    var viewClient = new ApplicationClient();
    viewClient.AppData = this.AppData;
    viewClient.Region = this.Region;
    viewClient.AppData.Translations = getCurrentRegionSetting()?.Translations;
    viewClient.AppData.RouteHandler = UrlHandler.Current;
    return viewClient;
  }
  Translate(key?: string | undefined): string {
    if (!key) return "";

    key = capitalizeFirstLetter(key);
    var setting = getCurrentRegionSetting();
    const translations = setting?.Translations;
    if (translations && key && key.indexOf(" ") === -1) {
      var tmpKey = this.AppName + "." + key";
      var translation = findValueByKey(translations, tmpKey);
      if (translation) {
        return translation;
      } else {
        // You can push translation to your api here
        translations[tmpKey] = key;
      }
    }
    return key;
  }
  CreateService() {
    return new Services(this);
  }
  Refresh = () => {
    if (!this.AppData) this.AppData = new AppSetting();
    this.AppData.langCode = getLanguageCode(this, this.AppData.userLanguageID);
    this.AppData.langID =
      this.AppData.userLanguageID === 0
        ? getLanguageID(this)
        : this.AppData.userLanguageID;
  };

  CheckMissingProperties() {
    if (globalThis.window && globalThis.window["OpheliaAppClient"]) return;

    var newClient = new ApplicationClient();
    this.IsClientSide = newClient.IsClientSide;
    this.Analytics = new AnalyticsList();
    this.Translate = newClient.Translate;
    this.Translate.bind(this);

    this.CreateService = newClient.CreateService;
    this.CreateService.bind(this);

    this.Hydrate = newClient.Hydrate;
    this.Hydrate.bind(this);

    this.ChangeUserRegion = newClient.ChangeUserRegion;
    this.ChangeUserRegion.bind(this);

    this.Refresh = newClient.Refresh;
    this.Refresh.bind(this);

    this.UpdateMetaTags = newClient.UpdateMetaTags;
    this.UpdateMetaTags.bind(this);

    this.SetUserInfo = newClient.SetUserInfo;
    this.SetUserInfo.bind(this);

    this.PushUrl = newClient.PushUrl;
    this.PushUrl.bind(this);

    this.GetUrl = newClient.GetUrl;
    this.GetUrl.bind(this);

    this.OnNotAuthorized = newClient.OnNotAuthorized;
    this.OnNotAuthorized.bind(this);

    if (this.AppData.token) setLocalstorage("authToken", this.AppData.token);
    if (this.AppData.langCode)
      setLocalstorage("language", this.AppData.langCode);
    if (globalThis.window) globalThis.window["OpheliaAppClient"] = this;
    this.ChangeUserRegion();
    var setting = getCurrentRegionSetting();
    if (setting) setting.Translations = this.AppData.Translations;
    this.AppData.Translations = null;

    if(this.AppData.RouteHandler){
      UrlHandler.Current.RouteData = this.AppData.RouteHandler.RouteData
      UrlHandler.Current.DefaultLanguage = this.AppData.RouteHandler.DefaultLanguage
      UrlHandler.Current.LanguageKeys = this.AppData.RouteHandler.LanguageKeys
      this.AppData.RouteHandler = null;
    }
  }

  async OnNotAuthorized(ep: Endpoint, data: any){
    if(this.SetHeaderProps){
      // Clear user based data here.
      setTimeout(() => {
        document.location.href = "/?autoRedir=1&redirURL=" + document.location.search
      }, 100);
    }
  }
  async SetUserInfo() {
    var services = this.CreateService();
    var userResponse = await services.Membership.getUserInformation().call();
    this.AppData.user = userResponse?.data;
    if (this.AppData.user) {
      this.AppData.isLoggedIn = true;
    } else this.AppData.isLoggedIn = false;
  }

  async RegisterURLs(){
    try {
      if(!UrlHandler.Current.Initialized){
        console.log("RegisterURLs running")
        UrlHandler.Current.Init([{key: "/en/", lang: "en"}], "az")
        UrlHandler.Current.OnRouteNotFound = async (path) => (await this.CreateService().Content.getURLData(path).call()).data;
        new RouteHandler().RegisterUrls(this);
      }
      return true;
    } catch (error) {
      console.log("RegisterURLs: Error " + JSON.stringify(error));
      return false;
    }
  }
}

export const getAppClient = (): ApplicationClient => {
  if (!globalThis.window) {
    return new ApplicationClient();
  } else {
    var client = window.OpheliaAppClient;
    if (!client) {
      client = new ApplicationClient();
      window.OpheliaAppClient = client;
    }
    return client;
  }
};

export const checkMissingProperties = (client?: ApplicationClient) => {
  if (client && !client.CheckMissingProperties) {
    client.CheckMissingProperties = new ApplicationClient().CheckMissingProperties;
    client.CheckMissingProperties();
  }
};
```
