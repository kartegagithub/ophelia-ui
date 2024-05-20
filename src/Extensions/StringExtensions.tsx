import moment from 'moment'
import { getCurrentRegionSetting } from '../Localization/RegionSetting';
import sanitizer from 'sanitize-html';

export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function shortenText(
  text: string,
  length: number,
  hyphenActive: boolean
) {
  if (length && text?.length >= length) {
    return text.substring(0, length) + "...";
  }

  return text ? text : hyphenActive ? "-" : "";
}

export function validateEmail(email?: string) {
  if(!email) return false;

  const re =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export function camelize(str?: string) {
  if(!str) return "";
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}
export function pascalize(str?: string) {
  if(!str) return "";
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toUpperCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

export function removeLastPropName(str?: string, replaceBy: string = "", keepHierarchy: boolean = false) {
  if(!str) return "";
  if(str.indexOf(".") == -1) return str;
  var splitted = str.split(".")

  var newStr = "";
  for (let index = 0; index < splitted.length - 1; index++) {
    const element = splitted[index];
    if(!keepHierarchy) newStr = element;
    else newStr += (index > 0? ".": "") + element;
  }
  if(replaceBy) return newStr + replaceBy;
  return newStr;
}

export function replaceQueryParam(param: string, value: string, url?: string){
  var searchParams = "";
  if(!url){
    url = document.location.pathname;
    searchParams = document.location.search
  } 
  else if(url.indexOf("?") > -1){
    searchParams = url.substring(url.indexOf("?"), url.length)
    url = url.replace(searchParams, "")
  }
  var params = new URLSearchParams(searchParams);
  if(!value || value == "") params.delete(param)
  else params.set(param, value);

  searchParams = params.toString().replaceAll("%2C", ",").replaceAll("%5B", "[").replaceAll("%5D", "]");
  return url + "?" + searchParams;
}

export function getQueryParam(param: string, defaultValue: any, url?: string){
  var searchParams = "";
  if(!url){
    searchParams = document.location.search
  } 
  else if(url.indexOf("?")){
    searchParams = url.substring(url.indexOf("?"), url.length)
  }
  var params = new URLSearchParams(searchParams);
  return params.get(param) ?? defaultValue;
}

export function queryParamsAsObject(key: string, removeKey: boolean = false, url?: string){
  var searchParams = "";
  if(!url){
    searchParams = document.location.search
  } 
  else if(url.indexOf("?")){
    searchParams = url.substring(url.indexOf("?"), url.length)
  }
  var params = new URLSearchParams(searchParams);
  var returnValues: any = {}
  for (let [item, value] of Array.from(params.entries())) {
    if(item.indexOf(key) > -1){
      var tmpKey = removeKey? item.replace(key, ""): key;
      returnValues[tmpKey] = value
      if(value){
        if(value.startsWith("[") && value.endsWith("]")){
          var arr: Array<any> = JSON.parse(value)
          if(arr && arr.length > 0) returnValues[tmpKey] = JSON.parse(value)
        }
      }
    }
  }
  return returnValues;
}

export function isValidDate(value?: string){
  if(!value) return false;
  if(typeof value["indexOf"] === "function" && value.indexOf(" ") == -1 && value.indexOf(".") == -1 && value.indexOf("/") == -1 && value.indexOf("-") == -1) return false;
  if(typeof value === "object") return false;
  if(isNumeric(value)) return false;
  return isJsonDate(value);
  //return moment(value).isValid() 
}
export function containsText(str?: string, regex: RegExp = /[a-zA-Z]/g){
  if(!str) return false;
  return regex.test(str);
}
export function isJsonDate(str?: string){
  if(!str) return false

  var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
  var reISO2 = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))?$/;
  var reISO3 = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})?$/;
  var reISO4 = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})?$/;
  var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;
  if(reISO.exec(str)) return true
  if(reISO2.exec(str)) return true
  if(reISO3.exec(str)) return true
  if(reISO4.exec(str)) return true
  if(reMsAjax.exec(str)) return true
  return false
}
export function characterCountInString(str?: string, char?: string) {
  if(!str || !char) return 0;
  const regex = new RegExp(char, "g");
  return (str.match(regex) || []).length;;
}
export function convertToDate(value?: string){
  if(!value) return moment(new Date());
  var setting = getCurrentRegionSetting();
  moment.locale(setting?.Code.toLowerCase())
  return moment(value) 
}

export function getFormattedDateString(value?: string, toFormat?: string, type: "month" | "week" | "date" | "time" | "datetime" | undefined | string = "datetime"){
  var setting = getCurrentRegionSetting();
  moment.locale(setting?.Code.toLowerCase())

  var date = convertToDate(value);
  if(!toFormat) {
    if(type === "date" && setting?.DateFormat?.ShortDateFormat) toFormat = setting?.DateFormat?.ShortDateFormat
    if(type === "datetime" && setting?.DateFormat?.LongDateFormat) toFormat = setting?.DateFormat?.LongDateFormat
    if(type === "month" && setting?.DateFormat?.MonthFormat) toFormat = setting?.DateFormat?.MonthFormat
    if(type === "time" && setting?.DateFormat?.TimeFormat) toFormat = setting?.DateFormat?.TimeFormat
    if(type === "week" && setting?.DateFormat?.WeekFormat) toFormat = setting?.DateFormat?.WeekFormat
  }
  if(!toFormat) toFormat = "MM/DD/YYYY"
  var returnValue = moment(date).format(toFormat)
  return returnValue
}

export function stringToDateInputValue(value?: string | undefined, format: string = "YYYY-MM-DD"){
  if(!value) return "";
  var returnValue = getFormattedDateString(value, format)
  return returnValue;
}
export function isNumeric(str: string) {
  if(!str || str == "") return false;
  const re = /^\d*(\.\d+)?$/
  return re.test(str)
}

export function parseFloatIfCan(str: string) {
  if(isNumeric(str)) return parseFloat(str)
  return -1;
}
export function getFileName(path?: string){
  if(!path) return ""
  return path.split(/(\\|\/)/g).pop()
}
export function formatString(str: string, ...params: Array<string | number>): string {
  if(!params || params.length == 0) return str;
  for (var i = 0; i < params.length; i++) {
      var reg = new RegExp("\\{" + i + "\\}", "gm");
      str = str.replace(reg, params[i].toString());
  }
  return str;
};

export function padLeft(val?: string, count?: number, seperator?: string): string {
  val = (val ?? "").toString();
  count = count ?? 1;
  seperator = seperator ?? " ";
  seperator = seperator + "";
  var val2 = val + "";
  for (var i = val.length; i < count; i++) {
    val2 = seperator + "" + val2;
  }
  return val2 as string;
}

export function toJson(val?: string): any {
  if(!val) return {}
  return JSON.parse(val as string);
};

export function clone(val?: any): any {
  if(!val) return {}
  return JSON.parse(JSON.stringify(val));
};

export function trimSpaces(str?: string, regex: RegExp = /^\s+|\s+$/g ){
  if(!str) return str
  return str.replace(regex, "");
}

export function trimChars(val?: string, c?: string): string {
  if(!val) return "";
  var re = new RegExp("^[" + c + "]+|[" + c + "]+$", "g");
  return val.replace(re, "");
}

export function replaceLowerTRChars(val?: string): string {
  if(!val) return "";
  return val.replaceAll("ı", "i")
    .replaceAll("ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c");
};

export function replaceUpperTRChars(val?: string): string {
  if(!val) return "";
  return val.replaceAll("İ", "I")
    .replaceAll("Ş", "S")
    .replaceAll("Ğ", "G")
    .replaceAll("Ü", "U")
    .replaceAll("Ö", "O")
    .replaceAll("Ç", "C");
}

export function toSlug(val?: string): string {
  if(!val) return "";
  var $slug = "";
  var trimmed = replaceLowerTRChars(val.trim().toLowerCase());
  $slug = trimmed
    .replace(/[^a-z0-9-]/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return $slug;
}

export function cleanLineFeeds(val?: string) {
  if(!val) return "";
  return val.replace(/(\r\n|\n|\r)/gm, "")
}
export function cleanSpaces(val?: string) {
  if(!val) return "";
  return val.replace(/^\s+|\s+$/g, "");
}
export function urlMatch(url1?: string, url2?: string) {
  if(!url1 || !url2) return false;
  
  var index1 = url1.indexOf("?") ?? -1;
  var index2 = url2.indexOf("?") ?? -1;
  if(index1 != index2) return false;

  var left = url1;
  var right = url2;
  if(index1 > -1) left = url1.substring(0, index1);
  if(index2 > -1) right = url2.substring(0, index2);
  return left == right
}

export function isNullOrEmpty(val?: any){
  if(val == undefined || val == null || val == "") return true;
  return false;
}

export function removeHtml(str?: string){
  if(!str) return "";
  let decoder = document.createElement('div')
  decoder.innerHTML = str
  return decoder.textContent
}

export function getSanitizeDefaults(): sanitizer.IDefaults{
  return sanitizer.defaults
}

export function sanitizeHtml(html?: string, options?: sanitizer.IOptions): string | undefined{
  if(!html) return "";
  return sanitizer(html, options) ?? html
}