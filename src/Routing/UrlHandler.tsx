import Router from "next/router";
import { clone, randomId, trimChars } from "../Extensions";

export class UrlHandlerClass{
    Initialized: boolean = false
    RouteData: any = {};
    ReverseRouteData: any = {};
    OnRouteNotFound?: (path: string) => Promise<undefined | Array<RouteItem>>;
    LanguageKeys: Array<{key: string, lang: string | number}> = []
    DefaultLanguage?: string = undefined
    InstanceID: string
    
    constructor(){
        this.InstanceID = randomId();
    }

    CopyTo(handler: UrlHandlerClass){
        handler.DefaultLanguage = this.DefaultLanguage;
        handler.LanguageKeys = this.LanguageKeys;
        handler.RouteData = this.RouteData;
        handler.Initialized = true;
    }
    Destroy(){
        this.DefaultLanguage = "";
        this.LanguageKeys = [];
        this.RouteData = {};
    }
    Init(languageKeys: Array<{key: string, lang: string | number}>, defaultLan: string){
        if(!this.Initialized){
            this.LanguageKeys = languageKeys;
            this.DefaultLanguage = defaultLan;
            if(UrlHandler.Current) this.RouteData = UrlHandler.Current.RouteData;
        }
        this.Initialized = true;
    }

    Push(destination: string | undefined, lang: number | string | undefined, onSuccess?: Function){
        destination = this.Get(destination, lang);
        return Router.push(destination ?? "").then(() => onSuccess && onSuccess());
    }

    Get(destination: string | undefined, lang: number | string | undefined, routeData?: any){
        if(!destination) return "";
        if(!this.RouteData || Object.keys(this.RouteData).length == 0){
            console.log("URL Mapping: Routes not registered: " + this.InstanceID);
            return destination;
        }
        if(lang) lang = lang.toString().toLocaleLowerCase();
                
        var obj = this.RouteData[trimChars(destination.toLocaleLowerCase(), "/")];
        if(obj){
            var item = obj[lang ?? this.DefaultLanguage ?? "default"] as RouteItem
            //if(!item) item = obj[Object.keys(obj)[0]]
            if(item){
                var source = item.source;
                if(this.DefaultLanguage)
                    source = source.replace("/" + this.DefaultLanguage, "");

                if(routeData){ // url pattern, parametrized url
                    var keys = Object.keys(routeData)
                    keys.forEach(key => {
                        source = source.replaceAll(`:${key}`, routeData[key])
                    });
                }
                return source;
            }

        }
        return destination;
    }

    async FindRoute(path: string, triggerNotFound: boolean = true, userLang: string | undefined = undefined, search: string | undefined = undefined): Promise<RouteItem | undefined>{
        if(!path) return;

        try {
            if(userLang) userLang = userLang.toLowerCase();
            if(!userLang) userLang = this.DefaultLanguage;
            if(search && search.indexOf("?") == -1) search = "?" + search;
            if(!search) search = "";

            path = trimChars(path.toLocaleLowerCase(), "/");

            var item: RouteItem | undefined = this.ReverseRouteData[path] as RouteItem;
            //console.log("item: " + path + search + " - " + userLang + " - " + item?.destination + " - " + item?.language)
            //console.log(JSON.stringify(this.RouteData))

            if(!item && triggerNotFound){
                if(this.OnRouteNotFound){
                    var newRoutes = await this.OnRouteNotFound(path);
                    if(newRoutes)
                        this.RegisterItems(newRoutes);
                }
                item = await this.FindRoute(path, false);
            }
            if(!item || (userLang && userLang != item.language)){
                var keys = Object.keys(this.ReverseRouteData);
                var rewrite = false;
                for (let index = 0; index < keys.length; index++) {
                    const key = keys[index];
                    var tmpItem: RouteItem = this.ReverseRouteData[key];
                    if(tmpItem.destination.toLocaleLowerCase() == path && tmpItem.language == userLang){
                        //console.log("Redirecting: " + path + " => " + tmpItem.source + search)
                        item = { permanent: false, destination: tmpItem.source, source: "/" + path};;
                        break;
                    }
                    else if(tmpItem.plainSource == path && tmpItem.language == userLang && tmpItem.plainDestination){
                        //console.log("Rewrited: " + path + " => " + tmpItem.plainDestination)
                        rewrite = true;
                        item = { destination: tmpItem.plainDestination, source: "/" + path};;
                        break;
                    }
                    else if(tmpItem.plainSource == path && tmpItem.language !== userLang && userLang && tmpItem.plainDestination){
                        var rewriteItem = this.RouteData[tmpItem.destination][userLang]
                        if(rewriteItem && rewriteItem.plainSource){
                            item = { destination: rewriteItem.plainSource, source: "/" + path};;
                            break;
                        }
                    }
                }
                if(item && userLang && userLang != item.language && !rewrite){
                    item = { permanent: false, destination: item.destination, source: "/" + path};
                }
            }
            if(item && item.destination.toLocaleLowerCase() == path) return undefined;
            if(item && item.destination == this.DefaultLanguage){
                return undefined;
            }

            if(item) return {source: "/" + path, destination: "/" + item.destination + search, permanent: item.permanent};
        } catch (error) {
            console.error(error);
        }
        return undefined;
    }

    Register(item: RouteItem | undefined){
        if(!item) return;
        if(!item.source && !item.fromURL) return;

        if(!item.source && item.fromURL) item.source = item.fromURL;
        if(!item.destination && item.toURL) item.destination = item.toURL;
        if(item.code == 301) item.permanent = true;
        if(item.code == 302) item.permanent = false;

        item.source = trimChars(item.source.toLocaleLowerCase(), "/");
        if(item.source.indexOf("?") > -1)
            item.plainSource = item.source.substring(0, item.source.indexOf("?"))

        item.destination = trimChars(item.destination, "/");
        if(item.destination.indexOf("?") > -1)
            item.plainDestination = item.destination.substring(0, item.destination.indexOf("?"))

        item.language = this.DefaultLanguage;
        for (let index = 0; index < this.LanguageKeys.length; index++) {
            const element = this.LanguageKeys[index];
            if(item.source.startsWith(element.key) || trimChars(item.source, "/").startsWith(trimChars(element.key, "/"))){
                item.language = element.lang.toString().toLowerCase();
                break;
            }
        }
        this.ReverseRouteData[item.source] = item;

        var destination = item.destination.toLocaleLowerCase();
        if(!this.RouteData[destination])
            this.RouteData[destination] = {};
        this.RouteData[destination][item.language ?? this.DefaultLanguage ?? "default"] = item;
    }

    RegisterItems(items: undefined | Array<RouteItem>){
        if(!items || items.length == 0) return;
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            this.Register(element);
        }
    }
}

export class RouteItem {
    source: string = ""
    destination: string = ""
    plainSource?: string = ""
    plainDestination?: string = ""
    fromURL?: string
    toURL?: string
    permanent?: boolean
    code?: number
    language?: number | string | undefined
}

const UrlHandler: { Current: UrlHandlerClass } = {
    Current: new UrlHandlerClass()
}
export default UrlHandler 