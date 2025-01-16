import Router from "next/router";
import { randomId, trimChars } from "../Extensions";

export class UrlHandlerClass {
  Initialized: boolean = false;
  LastRegisterDate?: number;
  RouteData: any = {};
  ReverseRouteData: any = {};
  OnRouteNotFound?: (path: string) => Promise<undefined | Array<RouteItem>>;
  LanguageKeys: Array<{ key: string; lang: string }> = [];
  DefaultLanguage?: string = undefined;
  InstanceID: string;

  constructor() {
    this.InstanceID = randomId();
  }

  CopyTo(handler: UrlHandlerClass) {
    handler.DefaultLanguage = this.DefaultLanguage;
    handler.LanguageKeys = this.LanguageKeys;
    handler.RouteData = this.RouteData;
    handler.Initialized = true;
  }
  Destroy() {
    this.DefaultLanguage = "";
    this.LanguageKeys = [];
    this.ResetRoutes();
  }
  ResetRoutes() {
    this.RouteData = {};
    this.ReverseRouteData = {};
  }
  Init(languageKeys: Array<{ key: string; lang: string }>, defaultLan: string) {
    if (!this.Initialized) {
      this.LanguageKeys = languageKeys;
      this.DefaultLanguage = defaultLan;
      if (UrlHandler.Current) this.RouteData = UrlHandler.Current.RouteData;
    }
    this.Initialized = true;
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

  Get(
    destination: string | undefined,
    lang: number | string | undefined,
    routeData?: any
  ) {
    if (!destination) return "";
    if (
      destination.toLowerCase().startsWith("http:") ||
      destination.toLowerCase().startsWith("https:")
    )
      return destination;

    if (!this.RouteData || Object.keys(this.RouteData).length == 0) {
      console.log("URL Mapping: Routes not registered: " + this.InstanceID);
      return destination;
    }
    if (lang) lang = lang.toString().toLocaleLowerCase();

    // console.log("destination: " + destination)
    var obj = this.RouteData[trimChars(destination.toLocaleLowerCase(), "/")];
    if (obj) {
      var item = obj[lang ?? this.DefaultLanguage ?? "default"] as RouteItem;
      //if(!item) item = obj[Object.keys(obj)[0]]
      if (item) {
        var source = item.source;
        if (this.DefaultLanguage)
          source = source.replace("/" + this.DefaultLanguage, "");

        destination = source;
      }
    }

    if (routeData) {
      // url pattern, parametrized url
      var keys = Object.keys(routeData);
      keys.forEach((key) => {
        destination = destination?.replaceAll(`:${key}`, routeData[key]);
      });
    }
    // console.log("destination-2: " + destination)
    return `/${trimChars(destination, "/")}`;
  }
  Log(...args: any) {
    //console.log(args);
  }
  async FindRoute(
    path: string,
    triggerNotFound: boolean = true,
    userLang: string | undefined = undefined,
    search: string | undefined = undefined,
    preventLoop: boolean = false
  ): Promise<RouteItem | undefined> {
    if (!path) return;

    try {
      if (userLang) userLang = userLang.toLowerCase();
      if (!userLang) userLang = this.DefaultLanguage;
      if (search && search.indexOf("?") == -1) search = "?" + search;
      if (!search) search = "";

      path = trimChars(path.toLocaleLowerCase(), "/");

      var item: RouteItem | undefined = this.ReverseRouteData[
        path
      ] as RouteItem;
      this.Log(
        "item: " +
          path +
          search +
          " - " +
          userLang +
          " - " +
          item?.destination +
          " - " +
          item?.language
      );
      //console.log(JSON.stringify(this.RouteData))

      if (!item && triggerNotFound) {
        if (this.OnRouteNotFound) {
          var newRoutes = await this.OnRouteNotFound(path);
          if (newRoutes) this.RegisterItems(newRoutes);
        }
        item = await this.FindRoute(path, false);
      }
      // If user language is different, redirect to language specific urls
      if (userLang && (!item || userLang != item.language)) {
        var keys = Object.keys(this.ReverseRouteData);

        var rewrite = false;
        for (let index = 0; index < keys.length; index++) {
          const key = keys[index];
          var tmpItem: RouteItem = this.ReverseRouteData[key];
          if (tmpItem.language == userLang) {
            if (tmpItem.destination.toLocaleLowerCase() == path) {
              this.Log(
                "Redirecting-1: " + path + " => " + JSON.stringify(tmpItem)
              );
              item = {
                permanent: false,
                destination: tmpItem.source,
                source: path,
                language: tmpItem.language,
              };
              break;
            } else if (
              tmpItem.plainSource == path &&
              tmpItem.plainDestination
            ) {
              this.Log(
                "Rewrited-1: " + path + " => " + JSON.stringify(tmpItem)
              );
              rewrite = true;
              item = {
                destination: tmpItem.plainDestination,
                source: path,
                language: tmpItem.language,
              };
              break;
            }
          } else if (tmpItem.plainSource == path && tmpItem.plainDestination) {
            // Language is different, redirect to related page
            var rewriteItem = this.RouteData[tmpItem.destination][userLang];
            if (rewriteItem && rewriteItem.plainSource) {
              this.Log(
                "Redirecting-2: " + path + " => " + JSON.stringify(rewriteItem)
              );
              item = {
                permanent: false,
                destination: rewriteItem.source,
                source: path,
                language: rewriteItem.language,
              };
              break;
            }
          }
        }
        if (item && userLang != item.language && !rewrite) {
          this.Log("Redirecting-3: " + path + " => " + JSON.stringify(item));
          var looping = false;
          if (!preventLoop) {
            var routedItem = await this.FindRoute(
              item.destination,
              false,
              userLang,
              "",
              true
            );
            this.Log(
              "Checking loop: " +
                path +
                " => " +
                item.destination +
                " => " +
                JSON.stringify(routedItem)
            );
            if (routedItem && trimChars(routedItem.destination, "/") == path) {
              looping = true;
              this.Log("Loop detected");
            }
          }
          if (looping) item = undefined;
          else
            item = {
              permanent: false,
              destination: item.destination,
              source: path,
              language: item.language,
            };
        }

        // check for pattern
        if (!item) {
          var splittedPath = path.split(/[/]/);
          if (splittedPath && splittedPath.length > 1) {
            var url = splittedPath.slice(0, splittedPath.length - 1).join("/");

            console.log("url: " + url);
            var key = keys.find(
              (op) => op.startsWith(url) && op.indexOf(":") > -1
            );
            if (key) {
              tmpItem = this.ReverseRouteData[key];
              var tmpSplited = tmpItem.destination.split(/[/]/);
              url = tmpSplited.slice(0, tmpSplited.length - 1).join("/");
              rewrite = true;
              console.log(
                "[url, splittedPath[splittedPath.length - 1]].join('/'): " +
                  [url, splittedPath[splittedPath.length - 1]].join("/")
              );
              return {
                permanent: undefined,
                destination: [url, splittedPath[splittedPath.length - 1]].join(
                  "/"
                ),
                source: path,
                language: tmpItem.language,
              };
            }
          }
        }
      }
      if (item) {
        this.Log("Formatting: " + JSON.stringify(item));
        item = {
          source: "/" + trimChars(item.source, "/"),
          destination: "/" + trimChars(item.destination, "/") + (search ?? ""),
          permanent: item.permanent,
        };
        this.Log("Formatted: " + JSON.stringify(item));
      }
    } catch (error) {
      console.error(error);
    }
    if (path == this.DefaultLanguage) {
      return { destination: "/", source: path, permanent: true };
    }
    if (
      item &&
      (item.destination == "/" + this.DefaultLanguage ||
        item.source == item.destination)
    ) {
      this.Log("Route reset-1: " + path + " => " + JSON.stringify(item));
      item = undefined;
    }
    if (item && item.destination.toLocaleLowerCase() == path) {
      this.Log("Route reset-2: " + path + " => " + JSON.stringify(item));
      item = undefined;
    }
    this.Log("Routing: " + JSON.stringify(item));
    return item;
  }

  Register(item: RouteItem | undefined) {
    if (!item) return;
    if (!item.source) return;

    item.source = trimChars(item.source.toLocaleLowerCase(), "/");
    if (item.source.indexOf("?") > -1)
      item.plainSource = item.source.substring(0, item.source.indexOf("?"));
    else item.plainSource = item.source;

    item.destination = trimChars(item.destination, "/");
    if (item.destination.indexOf("?") > -1)
      item.plainDestination = item.destination.substring(
        0,
        item.destination.indexOf("?")
      );
    else item.plainDestination = item.destination;

    if (!item.language) {
      item.language = this.DefaultLanguage;
      for (let index = 0; index < this.LanguageKeys.length; index++) {
        const element = this.LanguageKeys[index];
        if (
          item.source.startsWith(element.key) ||
          item.source.startsWith(element.lang)
        ) {
          item.language = element.lang.toLowerCase();
          break;
        }
      }
    } else item.language = item.language?.toLowerCase();

    var simpleItem = {
      plainSource: item.plainSource,
      plainDestination: item.plainDestination,
      source: item.source,
      destination: item.destination,
      language: item.language,
      permanent: item.permanent,
    };
    this.ReverseRouteData[item.source] = simpleItem;

    var destination = item.destination.toLocaleLowerCase();
    if (!this.RouteData[destination]) this.RouteData[destination] = {};
    this.RouteData[destination][
      item.language ?? this.DefaultLanguage ?? "default"
    ] = simpleItem;
  }

  RegisterItems(items: undefined | Array<RouteItem>) {
    if (!items || items.length == 0) return;
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      this.Register(element);
    }
  }
}

export class RouteItem {
  source: string = "";
  destination: string = "";
  plainSource?: string = "";
  plainDestination?: string = "";
  permanent?: boolean;
  language?: string | undefined;
}

const UrlHandler: { Current: UrlHandlerClass } = {
  Current: new UrlHandlerClass(),
};
export default UrlHandler;
