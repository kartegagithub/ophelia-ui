import moment from "moment";
import { getCurrentRegionSetting } from "../Localization/RegionSetting";
import sanitizer from "sanitize-html";
import { getDaysInMonth } from "./DateExtensions";

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
  if (!email) return false;

  const re =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export function phoneMasking(val?: any) {
  const rawValue = val.replace(/\D/g, ""); // Sadece sayıları al
  let formattedValue = "0";

  if (rawValue.length > 1) {
    formattedValue += ` (${rawValue.substring(1, 4)}`;
  }
  if (rawValue.length >= 5) {
    formattedValue += `) ${rawValue.substring(4, 7)}`;
  }
  if (rawValue.length >= 8) {
    formattedValue += `-${rawValue.substring(7, 11)}`;
  }

  return formattedValue;
}

export function validateRange(val?: any, max?: any, min?: any) {
  if (!val || (min && val < min) || (max && val > max)) {
    return false;
  }
  return true;
}

export function camelize(str?: string) {
  if (!str) return "";
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}
export function pascalize(str?: string) {
  if (!str) return "";
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toUpperCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

export function removeLastPropName(
  str?: string,
  replaceBy: string = "",
  keepHierarchy: boolean = false
) {
  if (!str) return "";
  if (str.indexOf(".") == -1) return str;
  var splitted = str.split(".");

  var newStr = "";
  for (let index = 0; index < splitted.length - 1; index++) {
    const element = splitted[index];
    if (!keepHierarchy) newStr = element;
    else newStr += (index > 0 ? "." : "") + element;
  }
  if (replaceBy) return newStr + replaceBy;
  return newStr;
}

export function replaceQueryParam(param: string, value: string, url?: string) {
  var searchParams = "";
  if (!url) {
    url = document.location.pathname;
    searchParams = document.location.search;
  } else if (url.indexOf("?") > -1) {
    searchParams = url.substring(url.indexOf("?"), url.length);
    url = url.replace(searchParams, "");
  }
  var params = new URLSearchParams(searchParams);
  if (!value || value == "") params.delete(param);
  else params.set(param, value);

  searchParams = params
    .toString()
    .replaceAll("%2C", ",")
    .replaceAll("%5B", "[")
    .replaceAll("%5D", "]");
  return url + "?" + searchParams;
}

export function getQueryParam(param: string, defaultValue: any, url?: string) {
  var searchParams = "";
  if (!url) {
    searchParams = document.location.search;
  } else if (url.indexOf("?")) {
    searchParams = url.substring(url.indexOf("?"), url.length);
  }
  var params = new URLSearchParams(searchParams);
  return params.get(param) ?? defaultValue;
}

export function queryParamsAsObject(
  key: string,
  removeKey: boolean = false,
  url?: string
) {
  var searchParams = "";
  if (!url) {
    searchParams = document.location.search;
  } else if (url.indexOf("?")) {
    searchParams = url.substring(url.indexOf("?"), url.length);
  }
  var params = new URLSearchParams(searchParams);
  var returnValues: any = {};
  for (let [item, value] of Array.from(params.entries())) {
    if (item.indexOf(key) > -1) {
      var tmpKey = removeKey ? item.replace(key, "") : key;
      returnValues[tmpKey] = value;
      if (value) {
        if (value.startsWith("[") && value.endsWith("]")) {
          var arr: Array<any> = JSON.parse(value);
          if (arr && arr.length > 0) returnValues[tmpKey] = JSON.parse(value);
        }
      }
    }
  }
  return returnValues;
}

export function isValidDate(value?: string) {
  if (!value) return false;
  if (
    typeof value["indexOf"] === "function" &&
    value.indexOf(" ") == -1 &&
    value.indexOf(".") == -1 &&
    value.indexOf("/") == -1 &&
    value.indexOf("-") == -1
  )
    return false;
  if (typeof value === "object") return false;
  if (isNumeric(value)) return false;
  return isJsonDate(value);
  //return moment(value).isValid()
}
export function containsText(str?: string, regex: RegExp = /[a-zA-Z]/g) {
  if (!str) return false;
  return regex.test(str);
}
export function isJsonDate(str?: string) {
  if (!str) return false;

  var reISO =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
  var reISO2 = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))?$/;
  var reISO3 = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})?$/;
  var reISO4 = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})?$/;
  var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;
  if (reISO.exec(str)) return true;
  if (reISO2.exec(str)) return true;
  if (reISO3.exec(str)) return true;
  if (reISO4.exec(str)) return true;
  if (reMsAjax.exec(str)) return true;
  return false;
}
export function characterCountInString(str?: string, char?: string) {
  if (!str || !char) return 0;
  const regex = new RegExp(char, "g");
  return (str.match(regex) || []).length;
}
export function convertToDate(value?: string) {
  if (!value) return moment(new Date());
  var setting = getCurrentRegionSetting();
  moment.locale(setting?.Code.toLowerCase());
  return moment(value);
}
export function getFormattedDateString(
  value?: string,
  toFormat?: string,
  type:
    | "month"
    | "week"
    | "date"
    | "time"
    | "datetime"
    | undefined
    | string = "datetime"
) {
  var setting = getCurrentRegionSetting();
  moment.locale(setting?.Code.toLowerCase());

  var date = convertToDate(value);
  if (!toFormat) {
    if (type === "date" && setting?.DateFormat?.ShortDateFormat)
      toFormat = setting?.DateFormat?.ShortDateFormat;
    if (type === "datetime" && setting?.DateFormat?.LongDateFormat)
      toFormat = setting?.DateFormat?.LongDateFormat;
    if (type === "month" && setting?.DateFormat?.MonthFormat)
      toFormat = setting?.DateFormat?.MonthFormat;
    if (type === "time" && setting?.DateFormat?.TimeFormat)
      toFormat = setting?.DateFormat?.TimeFormat;
    if (type === "week" && setting?.DateFormat?.WeekFormat)
      toFormat = setting?.DateFormat?.WeekFormat;
  }
  if (!toFormat) toFormat = "MM/DD/YYYY";
  var returnValue = moment(date).format(toFormat);
  return returnValue;
}

export function stringToDateInputValue(
  value?: string | undefined,
  format: string = "YYYY-MM-DD"
) {
  if (!value) return "";
  var returnValue = getFormattedDateString(value, format);
  return returnValue;
}
export function isNumeric(str: string) {
  if (!str || str == "") return false;
  const re = /^\d*(\.\d+)?$/;
  return re.test(str);
}

export function parseFloatIfCan(str: string) {
  if (isNumeric(str)) return parseFloat(str);
  return -1;
}
export function getFileName(path?: string) {
  if (!path) return "";
  return path.split(/(\\|\/)/g).pop();
}
export function formatString(
  str: string,
  ...params: Array<string | number>
): string {
  if (!params || params.length == 0) return str;
  for (var i = 0; i < params.length; i++) {
    var reg = new RegExp("\\{" + i + "\\}", "gm");
    str = str.replace(reg, params[i].toString());
  }
  return str;
}

export function padLeft(
  val?: string,
  count?: number,
  seperator?: string
): string {
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
  if (!val) return {};
  return JSON.parse(val as string);
}

export function clone(val?: any): any {
  if (!val) return {};
  return JSON.parse(JSON.stringify(val));
}

export function trimSpaces(str?: string, regex: RegExp = /^\s+|\s+$/g) {
  if (!str) return str;
  return str.replace(regex, "");
}

export function trimChars(val?: string, c?: string): string {
  if (!val) return "";
  var re = new RegExp("^[" + c + "]+|[" + c + "]+$", "g");
  return val.replace(re, "");
}

export function replaceLowerTRChars(val?: string): string {
  if (!val) return "";
  return val
    .replaceAll("ı", "i")
    .replaceAll("ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c");
}

export function replaceUpperTRChars(val?: string): string {
  if (!val) return "";
  return val
    .replaceAll("İ", "I")
    .replaceAll("Ş", "S")
    .replaceAll("Ğ", "G")
    .replaceAll("Ü", "U")
    .replaceAll("Ö", "O")
    .replaceAll("Ç", "C");
}

export function toSlug(val?: string): string {
  if (!val) return "";
  var $slug = "";
  var trimmed = replaceLowerTRChars(val.trim().toLowerCase());
  $slug = trimmed
    .replace(/[^a-z0-9-]/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return $slug;
}

export function cleanLineFeeds(val?: string) {
  if (!val) return "";
  return val.replace(/(\r\n|\n|\r)/gm, "");
}
export function cleanSpaces(val?: string) {
  if (!val) return "";
  return val.replace(/^\s+|\s+$/g, "");
}
export function urlMatch(url1?: string, url2?: string) {
  if (!url1 || !url2) return false;

  var index1 = url1.indexOf("?") ?? -1;
  var index2 = url2.indexOf("?") ?? -1;
  if (index1 != index2) return false;

  var left = url1;
  var right = url2;
  if (index1 > -1) left = url1.substring(0, index1);
  if (index2 > -1) right = url2.substring(0, index2);
  return left == right;
}

export function isNullOrEmpty(val?: any) {
  if (val == undefined || val == null || val == "") return true;
  return false;
}

export function removeHtml(str?: string) {
  if (!str) return "";
  if(globalThis.document){
    let decoder = document.createElement("div");
    decoder.innerHTML = str;
    return decoder.textContent;
  }
  else{
    return str.replaceAll("<[^>]*>", "");
  }
}

export function getSanitizeDefaults(): sanitizer.IDefaults {
  return sanitizer.defaults;
}

export function sanitizeHtml(
  html?: string,
  options?: sanitizer.IOptions
): string | undefined {
  if (!html) return "";
  return sanitizer(html, options) ?? html;
}

/**
 * 
 * @param val 12345678
 * @param mask (###) ### ## ##
 */
export function maskText(val?: string, mask?: string, maskChars: string | undefined = undefined, rules?: Array<string | Function>){
  if(!val) return "";
  if(!mask) return val
  if(!maskChars) maskChars = "()-. +/"
  var clean = val.replace(/\D/g,'')
  for (let index = 0; index < maskChars.length; index++) {
    const c = maskChars[index];
    clean = clean.replaceAll(c, "")
  }
  var counter = 0;
  var groups = []
  var group = "";
  for (let index = 0; index < mask.length; index++) {
    const c = mask[index];
    if(maskChars.indexOf(c) > -1){
      if(group) groups.push(group)
      groups.push(c)
      group = "";
    }
    else{
      if(counter < clean.length && maskChars.indexOf(c) == -1){
        if(c === "#" || c == clean[counter]){
          group += clean[counter];
          counter++;
        }
        else{
          group += c + clean[counter];
          counter++;
        }
      }
      else break;
    }
  }
  if(group) groups.push(group)
  var returnValue = checkRules(groups, maskChars, rules)
  return returnValue;
}

export function checkRules(groups: Array<string>, maskChars: string, rules?: Array<string | Function>){
  var value: string | undefined = groups.map((g) => g).join('');
  if(!rules) return value;

  var dataTypeRule: string | undefined = undefined
  var formatRule: string | undefined = undefined

  var newGroups = [];
  var atomicIndex = -1;
  var dataGroups = [];
  if(rules.length > 0){
    for (let index = 0; index < groups.length; index++) {
      const group = groups[index];
      if(maskChars.indexOf(group) == -1){
        atomicIndex++;
        var valid = true;
        for (let index = 0; index < rules.length; index++) {
          const rule = rules[index];
          if(typeof rule == "function"){
            var fn: any = rule;
            valid = fn(group)
          }
          else if(rule.startsWith("type")){
            dataTypeRule = rule.replace("type:", "")
          }
          else if(rule.startsWith("format")){
            formatRule = rule.replace("format:", "")
          }
          else{
            var matches = rule.match(/\[(.*?)\]/gm);
            //get rules inside parantheses
            if(matches && matches.length > atomicIndex){
              var match = matches[atomicIndex].replace("[", "").replace("]", "");
              if(match == "?" || match == "*"){
                continue;
              }
              var subRules = match.split(",")

              // split rules & check if group is valid for rule
              for (let index = 0; index < subRules.length; index++) {
                var subRule = subRules[index];
                if(subRule){
                  subRule = subRule.trim();
                  var cmd: "min" | "max" | undefined = undefined;
                  var params = "";
                  if(subRule.startsWith("min")) cmd = "min"
                  else if(subRule.startsWith("max")) cmd = "max"
                  params = subRule.replace(`${cmd}:`, "");

                  if(!cmd || !params) continue;

                  switch (cmd) {
                    case "min":
                      if(group.length >= params.length && parseFloatIfCan(group) > 0) valid = parseFloatIfCan(group) >= parseFloatIfCan(params)
                      break;
                    case "max":
                      if(group.length <= params.length && parseFloatIfCan(group) > 0) valid = parseFloatIfCan(group) <= parseFloatIfCan(params)
                      break;
                  }
                }
                if(!valid) break;
              }
              if(!valid) break;
            }
          }
        }
        if(valid){
          newGroups.push(group)
          dataGroups.push(group)
        }
        else{
          newGroups.push(group.substring(0, group.length - 1))
          dataGroups.push(group.substring(0, group.length - 1))
          break;
        } 
      }
      else newGroups.push(group)
    }
  }
  value = newGroups.map((g) => g).join('');
  if(dataTypeRule === "date"){
    if(!formatRule) formatRule = "DD/MM/YYYY";
    var splitter = "/";
    if(formatRule.indexOf(".") > -1) splitter = ".";
    if(formatRule.indexOf("-") > -1) splitter = "-";
    var dateParts = formatRule.split(splitter)
    var day: string | undefined = undefined;
    var month: string | undefined = undefined;
    var year: string | undefined = undefined;
    for (let index = 0; index < dateParts.length; index++) {
      const element = dateParts[index];
      if(element == "DD" && dataGroups.length > index) day = dataGroups[index]
      if(element == "MM" && dataGroups.length > index) month = dataGroups[index]
      if(element == "YYYY" && dataGroups.length > index) year = dataGroups[index]
    }
    if(day && parseInt(day) >= 1 && parseInt(day) <= 31){
      value = formatRule.replace("DD", day)
      if(month && parseInt(month) > 0 && parseInt(month) <= 12){
        if(parseInt(month) == 2 && parseInt(day) > 29){
          return trimChars(value.replace("DD", "").replace("MM", "").replace("YYYY", ""), splitter);
        }
        else if(parseInt(month) != 2){
          var daysInMonth = getDaysInMonth(parseInt(month) - 1)
          if(parseInt(day) > daysInMonth)
              return trimChars(value.replace("DD", "").replace("MM", "").replace("YYYY", ""), splitter)
        }
        if(year && parseInt(year) > 0){
          if(year.length == 4){
            var daysInMonth = getDaysInMonth(parseInt(month) - 1, parseInt(year))
            if(parseInt(day) > daysInMonth)
              return trimChars(value.replace("DD", "").replace("MM", "").replace("YYYY", ""), splitter)
          }
          value = value.replace("MM", month).replace("YYYY", year)
        }
        else if(year == "0"){
          value = value.replace("MM", month).replace("YYYY", year)
        }
        else value = value.replace("MM", month)
      }
      else if(month == "0")
        value = value.replace("MM", month)
    }
    else if(day == "0")
      value = day;
    else{
      value = "";
    }
    value = trimChars(value.replace("DD", "").replace("MM", "").replace("YYYY", ""), splitter)
  }
  return value;
}