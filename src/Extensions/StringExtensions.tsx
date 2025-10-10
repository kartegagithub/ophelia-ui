import moment from "moment-timezone";
import "moment/locale/az";
import { getCurrentRegionSetting } from "../Localization/RegionSetting";
import sanitizer from "sanitize-html";
import { getDaysInMonth } from "./DateExtensions";
import { randomId } from "./ReflectionExtensions";
import { getCaseLocale } from "./ArrayExtensions";
import ISanitizeOptions from "../Models/ISanitizeOptions";

export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
export function getSeoDescription(seoTag: any, sliceLength: number) {
  if (!seoTag?.description) return "";

  // Strip HTML tags and get plain text
  const plainText = seoTag.description.replace(/<[^>]*>/g, "");

  // Limit to the first 150 characters
  return plainText.slice(0, sliceLength);
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
  if (
    !val ||
    (min && min.setHours && val < min.setHours(0, 0, 0, 0)) ||
    (max && max.setHours && val > max.setHours(0, 0, 0, 0))
  ) {
    return false;
  }
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

export function removeQueryParam(param: string, url?: string) {
  var searchParams = "";
  if (!url) {
    if (globalThis.window) searchParams = document.location.search;
  } else if (url.indexOf("?")) {
    searchParams = url.substring(url.indexOf("?"), url.length);
  }
  if (!searchParams) return "";

  var params = new URLSearchParams(searchParams);
  params.delete(param);
  return params.toString();
}

export function queryParamsAsObject(
  key: string,
  removeKey: boolean = false,
  url?: string
) {
  var searchParams = "";
  if (!url && globalThis.window) {
    searchParams = document.location.search;
  } else if (url && url.indexOf("?")) {
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

export function queryAsObject(url: string) {
  var searchParams = "";
  if (url && url.indexOf("?")) {
    searchParams = url.substring(url.indexOf("?"), url.length);
  }
  var params = new URLSearchParams(searchParams);
  var returnValues: any = {};
  for (let [item, value] of Array.from(params.entries())) {
    if (item) returnValues[item] = value;
  }
  return returnValues;
}

export function isValidDate(value?: string) {
  if (!value || !value.indexOf) {
    if ((value as any).getDate) return true;
    return false;
  }
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
export function convertToDate(
  value?: string | Date | number | (string | number)[]
): moment.Moment {
  if (!value) return moment(new Date());

  if (moment(value, moment.ISO_8601, true).isValid()) {
    return moment(value);
  }

  if (Array.isArray(value)) {
    value = value[0];
  }

  if (value instanceof Date) {
    return moment(value);
  }

  if (typeof value === "number") {
    return moment(value);
  }

  if (typeof value === "string") {
    var setting = getCurrentRegionSetting();
    moment.locale(setting?.Code.toLowerCase());

    if (
      value.indexOf(".") === -1 &&
      value.indexOf("/") === -1 &&
      value.indexOf("-") === -1 &&
      (value.split(":").length === 2 || value.split(":").length === 3)
    ) {
      value = "1/1/1970 " + value;
    }

    return moment(value);
  }
  throw new Error("Invalid input: Expected string, Date, or number");
}

export function getFormattedDateString(
  value?: any,
  toFormat?: string,
  type:
    | "month"
    | "week"
    | "date"
    | "time"
    | "datetime"
    | undefined
    | string = "datetime",
  tz: string | undefined = undefined
) {
  const setting = getCurrentRegionSetting();
  moment.locale(setting?.Code.toLowerCase());

  //const date = parseDate(value);
  var date = convertToDate(value);
  if (!date.isValid()) return "";

  if (!date.isValid()) return "";
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
  if (!toFormat) toFormat = "MM/DD/YYYY HH:mm";

  // Dil bazlı saat dilimi ayarı
  let timezone = tz; // Varsayılan olarak UTC
  if (!timezone && setting?.TimeZone) timezone = setting?.TimeZone;
  if (!timezone) timezone = "UTC";

  // UTC'den belirlenen timezone'a çeviri
  return date.tz(timezone).format(toFormat);
}

function parseDate(value: any) {
  if (!value) return moment.invalid();

  // ISO formatı (YYYY-MM-DD)
  if (moment(value, moment.ISO_8601, true).isValid()) {
    return moment(value);
  }

  // Lokal format (DD.MM.YYYY)
  if (moment(value, "DD.MM.YYYY", true).isValid()) {
    return moment(value, "DD.MM.YYYY");
  }

  return moment(value);
}

// azerbaycan date format
export const formatToAzerbaijani = (dateRange: string): string => {
  const months: Record<string, string> = {
    Ocak: "Yanvar",
    Şubat: "Fevral",
    Mart: "Mart",
    Nisan: "Aprel",
    Mayıs: "May",
    Haziran: "İyun",
    Temmuz: "İyul",
    Ağustos: "Avqust",
    Eylül: "Sentyabr",
    Ekim: "Oktyabr",
    Kasım: "Noyabr",
    Aralık: "Dekabr",
  };

  const [startDate, endDate] = dateRange.split(" - ");
  const replaceMonth = (date: string) => {
    const [day, month, year] = date.split(" ");
    const azerbaijaniMonth = months[month] || month;
    return `${day} ${azerbaijaniMonth} ${year}`;
  };

  return `${replaceMonth(startDate)} - ${replaceMonth(endDate)}`;
};

// bugün ile verilen gün farkını bul timeStamp cinsinden
export function getRemainingDays(timestamp: number) {
  const targetDate = new Date(timestamp);
  const today = new Date();

  const targetDateUTC = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );
  const todayUTC = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const differenceInTime = targetDateUTC.getTime() - todayUTC.getTime();

  const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

  return Math.max(0, differenceInDays);
}

export function stringToDateInputValue(
  value?: string | undefined,
  format: string = "YYYY-MM-DD"
) {
  if (!value) return "";
  var returnValue = getFormattedDateString(value, format);
  return returnValue;
}
export function EuropeanDateFormat(
  value?: string | undefined,
  format: string = "DD/MM/YYYY"
) {
  if (!value) return "";
  var returnValue = getFormattedDateString(value, format);
  return returnValue;
}
export function EuropeanDateDotFormat(
  value?: any,
  format: string = "DD.MM.YYYY"
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
//format date with moment for locale language
export function formatDateByLocale(
  date: any,
  language: string,
  format: string
) {
  moment.locale(language);
  const localTime = moment.utc(date);
  return localTime.format(format);
}

export const getTimestamps = (day: number) => {
  const now = new Date();
  const toDate = now.setHours(23, 59, 59, 999);
  const fromDate = new Date(now);
  fromDate.setDate(fromDate.getDate() - day);
  fromDate.setHours(0, 0, 0, 0);

  return {
    fromDate: fromDate.getTime(),
    toDate: toDate,
  };
};

export function formatTimestampToDateTime(
  timestamp: any,
  onlyHour?: string,
  onlyDate?: boolean
) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (onlyHour) {
    return `${hours}:${minutes}`;
  }
  if (onlyDate) {
    return `${day}.${month}.${year}`;
  }
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
export function formatMoneyTr(value: any) {
  // Gelen değerden boşlukları kaldırıp sayıya çevirmeyi dener.
  const numericValue = parseFloat(
    String(value).replace(/\s+/g, "").replace(",", ".")
  );

  if (numericValue && isNaN(numericValue)) {
    throw new Error("Geçersiz sayı formatı");
  }

  // Türkiye formatına göre virgül ve nokta ayracı kullanarak sayıyı biçimlendirir.
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
}
export function formatMoneyAzl(value: any) {
  // Sayıya dönüştür ve geçersiz girişleri kontrol et.
  const numericValue = parseInt(String(value).replace(/\s+/g, ""), 10);

  if (isNaN(numericValue)) {
    throw new Error("Geçərsiz ədəd formatı");
  }

  // Sayıyı 100'e bölerek virgülden önceki ve sonraki kısmı hesapla.
  const mainPart = Math.floor(numericValue / 100);
  const fractionPart = numericValue % 100;

  // Binlik ayracı ekle
  const formattedMainPart = mainPart
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Fractional kısmı sıfır ise sadece ana kısmı döndür.
  if (fractionPart === 0) {
    return formattedMainPart;
  }

  // Fractional kısmı varsa sıfırları at ve birleştir.
  const formattedFractionPart = fractionPart.toString().replace(/0+$/, "");

  return `${formattedMainPart},${formattedFractionPart}`;
}
// resim url düzeltip boyutunu ayarlıyor
export function imagesReplace(imgURl: any, size?: any) {
  if (imgURl && !size) {
    return imgURl.replace(/{size}/, "original");
  } else if (imgURl && size) {
    return imgURl.replace(/{size}/, size);
  }

  return undefined;
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
  ...params: Array<string | undefined>
): string {
  if (!params || params.length == 0) return str;
  for (var i = 0; i < params.length; i++) {
    var reg = new RegExp("\\{" + i + "\\}", "gm");
    str = str.replace(reg, params[i]?.toString() ?? "");
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
  if (!val || !c || c == "") return val ?? "";
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

//null || undefined || "" olursa true döner.
export const isNullOrEmpty = (val?: any) => (val ?? "") === "";

export function removeHtml(str?: string) {
  if (!str) return "";
  if (globalThis.document) {
    let decoder = document.createElement("div");
    decoder.innerHTML = str;
    return decoder.textContent;
  } else {
    return str.replaceAll("<[^>]*>", "");
  }
}

export function getSanitizeDefaults(): sanitizer.IDefaults {
  return sanitizer.defaults;
}

export function sanitizeHtml(
  html?: string,
  options?: ISanitizeOptions
): string | undefined {
  if (!html) return "";

  if (!options) options = {};
  if (getSanitizeDefaults().allowedTags.indexOf("img") == -1) {
    options.allowedTags = getSanitizeDefaults().allowedTags.concat(["img"]);
    //getSanitizeDefaults().allowedAttributes["img"] = ["src"]
    options.allowedSchemes = ["data", "http", "https"];
  }
  return sanitizer(html, options as any) ?? html;
}

/**
 *
 * @param val 12345678
 * @param mask (###) ### ## ##
 */
export function maskText(
  val?: string,
  mask?: string,
  maskChars: string | undefined = undefined,
  rules?: Array<string | Function>
) {
  if (!val) return "";
  if (!mask) return val;
  if (!maskChars) maskChars = "()-. +/";
  var clean = val.replace(/\D/g, "");
  for (let index = 0; index < maskChars.length; index++) {
    const c = maskChars[index];
    clean = clean.replaceAll(c, "");
  }
  var counter = 0;
  var groups = [];
  var group = "";
  for (let index = 0; index < mask.length; index++) {
    const c = mask[index];
    if (maskChars.indexOf(c) > -1) {
      if (group) groups.push(group);
      groups.push(c);
      group = "";
    } else {
      if (counter < clean.length && maskChars.indexOf(c) == -1) {
        if (c === "#" || c == clean[counter]) {
          group += clean[counter];
          counter++;
        } else {
          group += c + clean[counter];
          counter++;
        }
      } else break;
    }
  }
  if (group) groups.push(group);
  var returnValue = checkRules(groups, maskChars, rules);
  return returnValue;
}

export function removeNonNumeric(val?: string) {
  if (!val) return "";
  return val.replace(/\D/g, "");
}
export function checkRules(
  groups: Array<string>,
  maskChars: string,
  rules?: Array<string | Function>
) {
  var value: string | undefined = groups.map((g) => g).join("");
  if (!rules) return value;

  var dataTypeRule: string | undefined = undefined;
  var formatRule: string | undefined = undefined;

  var newGroups = [];
  var atomicIndex = -1;
  var dataGroups = [];
  if (rules.length > 0) {
    for (let index = 0; index < groups.length; index++) {
      const group = groups[index];
      if (maskChars.indexOf(group) == -1) {
        atomicIndex++;
        var valid = true;
        for (let index = 0; index < rules.length; index++) {
          const rule = rules[index];
          if (typeof rule == "function") {
            var fn: any = rule;
            valid = fn(group);
          } else if (rule.startsWith("type")) {
            dataTypeRule = rule.replace("type:", "");
          } else if (rule.startsWith("format")) {
            formatRule = rule.replace("format:", "");
          } else {
            var matches = rule.match(/\[(.*?)\]/gm);
            //get rules inside parantheses
            if (matches && matches.length > atomicIndex) {
              var match = matches[atomicIndex]
                .replace("[", "")
                .replace("]", "");
              if (match == "?" || match == "*") {
                continue;
              }
              var subRules = match.split(",");

              // split rules & check if group is valid for rule
              for (let index = 0; index < subRules.length; index++) {
                var subRule = subRules[index];
                if (subRule) {
                  subRule = subRule.trim();
                  var cmd: "min" | "max" | undefined = undefined;
                  var params = "";
                  if (subRule.startsWith("min")) cmd = "min";
                  else if (subRule.startsWith("max")) cmd = "max";
                  params = subRule.replace(`${cmd}:`, "");

                  if (!cmd || !params) continue;

                  switch (cmd) {
                    case "min":
                      if (
                        group.length >= params.length &&
                        parseFloatIfCan(group) > 0
                      )
                        valid =
                          parseFloatIfCan(group) >= parseFloatIfCan(params);
                      break;
                    case "max":
                      if (
                        group.length <= params.length &&
                        parseFloatIfCan(group) > 0
                      )
                        valid =
                          parseFloatIfCan(group) <= parseFloatIfCan(params);
                      break;
                  }
                }
                if (!valid) break;
              }
              if (!valid) break;
            }
          }
        }
        if (valid) {
          newGroups.push(group);
          dataGroups.push(group);
        } else {
          newGroups.push(group.substring(0, group.length - 1));
          dataGroups.push(group.substring(0, group.length - 1));
          break;
        }
      } else newGroups.push(group);
    }
  }
  value = newGroups.map((g) => g).join("");
  if (dataTypeRule === "date") {
    if (!formatRule) formatRule = "DD/MM/YYYY";
    var splitter = "/";
    if (formatRule.indexOf(".") > -1) splitter = ".";
    if (formatRule.indexOf("-") > -1) splitter = "-";
    var dateParts = formatRule.split(splitter);
    var day: string | undefined = undefined;
    var month: string | undefined = undefined;
    var year: string | undefined = undefined;
    for (let index = 0; index < dateParts.length; index++) {
      const element = dateParts[index];
      if (element == "DD" && dataGroups.length > index) day = dataGroups[index];
      if (element == "MM" && dataGroups.length > index)
        month = dataGroups[index];
      if (element == "YYYY" && dataGroups.length > index)
        year = dataGroups[index];
    }
    if (day && parseInt(day) >= 1 && parseInt(day) <= 31) {
      value = formatRule.replace("DD", day);
      if (month && parseInt(month) > 0 && parseInt(month) <= 12) {
        if (parseInt(month) == 2 && parseInt(day) > 29) {
          return trimChars(
            value.replace("DD", "").replace("MM", "").replace("YYYY", ""),
            splitter
          );
        } else if (parseInt(month) != 2) {
          var daysInMonth = getDaysInMonth(parseInt(month) - 1);
          if (parseInt(day) > daysInMonth)
            return trimChars(
              value.replace("DD", "").replace("MM", "").replace("YYYY", ""),
              splitter
            );
        }
        if (year && parseInt(year) > 0) {
          if (year.length == 4) {
            var daysInMonth = getDaysInMonth(
              parseInt(month) - 1,
              parseInt(year)
            );
            if (parseInt(day) > daysInMonth)
              return trimChars(
                value.replace("DD", "").replace("MM", "").replace("YYYY", ""),
                splitter
              );
          }
          value = value.replace("MM", month).replace("YYYY", year);
        } else if (year == "0") {
          value = value.replace("MM", month).replace("YYYY", year);
        } else value = value.replace("MM", month);
      } else if (month == "0") value = value.replace("MM", month);
    } else if (day == "0") value = day;
    else {
      value = "";
    }
    value = trimChars(
      value.replace("DD", "").replace("MM", "").replace("YYYY", ""),
      splitter
    );
  }
  if (formatRule === "HH:MM") {
    const parts = value.split(":");
    if (parts.length === 2) {
      let [hour, minute] = parts.map(Number);
      if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return "";
    }
  }
  return value;
}
export const dataUrlToFile = (
  dataUrl: string,
  filename: string
): File | null => {
  if (!dataUrl || !dataUrl.startsWith("data:")) {
    console.error("Geçersiz Data URL");
    return null;
  }
  const [header, base64Data] = dataUrl.split(",");
  if (!header || !base64Data) {
    console.error("Data URL bölünemedi");
    return null;
  }

  const mimeMatch = header.match(/:(.*?);/);
  if (!mimeMatch || mimeMatch.length < 2) {
    console.error("MIME tipi bulunamadı");
    return null;
  }
  const mime = mimeMatch[1];

  // Base64 verisini binary veriye dönüştürme
  const binaryString = atob(base64Data);
  const array = Array.from(binaryString).map((char) => char.charCodeAt(0));
  const uint8Array = new Uint8Array(array);

  return new File([uint8Array], filename, { type: mime });
};

// bugün ile verilen ay farkını bul timeStamp cinsinden
export const getRemainingMonths = (targetDate: number) => {
  const now = new Date();
  const target = new Date(targetDate);

  const yearsDifference = target.getFullYear() - now.getFullYear();
  const monthsDifference = target.getMonth() - now.getMonth();

  const totalMonthsDifference = yearsDifference * 12 + monthsDifference;

  return totalMonthsDifference;
};

//verilen second cinsinden zamanı dakika ve saniye olarak döner
export const formatTimeTotalSecond = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};
export function getTimeUntil(nextDrawTime: string): string {
  const now = new Date();

  if (!nextDrawTime || !nextDrawTime.includes(":")) {
    throw new Error("Invalid nextDrawTime format. Expected 'HH:mm' string.");
  }

  const [targetHours, targetMinutes] = nextDrawTime.split(":").map(Number);

  if (isNaN(targetHours) || isNaN(targetMinutes)) {
    throw new Error("Invalid time values. Ensure 'HH:mm' format.");
  }

  // Hedef zamanı oluştur
  const targetTime = new Date();
  targetTime.setHours(targetHours, targetMinutes, 0, 0);

  // Eğer hedef zaman geçmişse, bir gün sonraki aynı zamanı hesapla
  if (targetTime < now) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  const difference = targetTime.getTime() - now.getTime(); // Fark milisaniye cinsinden

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  // Değerleri iki basamaklı hale getirme
  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
    seconds
  )}`;
}

export const createHtmlIndex = (
  val: string | undefined,
  indexTags: string = "h2"
) => {
  var indexData: {
    val: string | undefined;
    index: Array<{ text: string; id: string; type: string }>;
  } = { val: val, index: [] };
  if (!indexData.val) return indexData;

  var tags = indexTags.split(",");
  for (let index = 0; index < tags.length; index++) {
    const tag = tags[index];
    var exp = `<${tag}>(.*?)<\\/${tag}>`;
    var matches = indexData.val.match(new RegExp(exp, "g"));
    if (matches && matches.length > 0) {
      matches.forEach((element) => {
        var text = removeHtml(element);
        if (text && text.replaceAll("&nbsp;", "").trim() != "") {
          var index = { id: randomId(), text: text, type: tag };
          indexData.index.push(index);
          indexData.val = indexData.val?.replace(
            element,
            `<a class="scroll-mt-[70px]" id="${index.id}">${element}</a>`
          );
        }
      });
    }
  }
  return indexData;
};

export const slugify = (text?: string): string => {
  if (!text) return "";
  text = text.toLowerCase().trim();

  const sets = [
    { to: "a", from: "[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶἀə]" },
    { to: "b", from: "[б]" },
    { to: "c", from: "[ÇĆĈČ]" },
    { to: "d", from: "[ÐĎĐÞд]" },
    { to: "e", from: "[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆе]" },
    { to: "f", from: "[ф]" },
    { to: "g", from: "[ĜĞĢǴг]" },
    { to: "h", from: "[ĤḦ]" },
    { to: "i", from: "[ÌÍÎÏĨĪĮİỈỊı]" },
    { to: "j", from: "[Ĵй]" },
    { to: "ij", from: "[Ĳ]" },
    { to: "k", from: "[Ķк]" },
    { to: "l", from: "[ĹĻĽŁл]" },
    { to: "m", from: "[Ḿм]" },
    { to: "n", from: "[ÑŃŅŇин]" },
    { to: "o", from: "[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠо]" },
    { to: "oe", from: "[Œ]" },
    { to: "p", from: "[ṕп]" },
    { to: "r", from: "[ŔŖŘр]" },
    { to: "s", from: "[ßŚŜŞŠȘс]" },
    { to: "t", from: "[ŢŤт]" },
    { to: "u", from: "[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯу]" },
    { to: "v", from: "[в]" },
    { to: "w", from: "[ẂŴẀẄ]" },
    { to: "x", from: "[ẍ]" },
    { to: "y", from: "[ÝŶŸỲỴỶỸ]" },
    { to: "z", from: "[ŹŻŽз]" },
    { to: "yo", from: "[ё]" },
    { to: "zh", from: "[ж]" },
    { to: "kh", from: "[х]" },
    { to: "ts", from: "[ц]" },
    { to: "ch", from: "[ч]" },
    { to: "sh", from: "[ш]" },
    { to: "shh", from: "[щ]" },
    { to: "", from: "[ъ]" },
    { to: "y", from: "[ы]" },
    { to: "", from: "[ь]" },
    { to: "ee", from: "[э]" },
    { to: "yu", from: "[ю]" },
    { to: "ya", from: "[я]" },
    { to: "-", from: "[·/_,:;']" },
  ];

  sets.forEach((set) => {
    text = text?.replace(new RegExp(set.from, "gi"), set.to);
  });

  return text
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^-a-z0-9а-я\u0370-\u03ff\u1f00-\u1fff]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export const isImageFile = (fileName?: string): boolean => {
  if (!fileName || fileName.indexOf(".") == -1) return false;
  var imgExtensions = ["gif", "png", "jpg", "jpeg", "bmp", "webp"];
  var extension = fileName
    .substring(fileName.indexOf("."), fileName.length)
    .replaceAll(".", "")
    .toLocaleLowerCase(getCaseLocale());
  return imgExtensions.indexOf(extension) > -1;
};

export const hexToRgb = (hex: string): string => {
  const sanitizedHex = hex.replace("#", "");
  const r = parseInt(sanitizedHex.substring(0, 2), 16);
  const g = parseInt(sanitizedHex.substring(2, 4), 16);
  const b = parseInt(sanitizedHex.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
};

export const formatDataToString = (value: any, decimalPlaces: number = 2) => {
  var locale = getCurrentRegionSetting()?.Code ?? "en";
  if(!value) return value;
  if (typeof value == "number" && value.toFixed && value.toLocaleString) {
      var tmpValue = value.toString();
      if(tmpValue.indexOf(".") > -1 || tmpValue.indexOf(",")>-1){
        return value.toLocaleString(
          locale,
          { minimumFractionDigits: decimalPlaces ?? 2 }
        );
      }
      return tmpValue;
    }
    return value;
}