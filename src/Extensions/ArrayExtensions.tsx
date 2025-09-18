import { convertToDate, isNullOrEmpty } from "./StringExtensions";
import { getObjectValue } from "./ReflectionExtensions";

var CaseLocale = "en-US";
export function setCaseLocale(locale: string) {
  CaseLocale = locale;
}
export function getCaseLocale() {
  return CaseLocale;
}

/**
 * Compares case insensitive array items via given key with value.
 * 
 * usage: findData(myArrayOfTextValue, "text", "test", "index") == -1.
 * 
 * usage: findData(myArrayOfTextValue, "text", "test", "object").value == 1.
 * 
 * @param data           Array of any type.
 * @param propOne        object key to check.
 * @param value          value to check with object value at key
 * @param resultType     key for return type. index returns item index, object returns item itself
 */
export function findData(data: Array<any>, propOne: string, value: any, resultType: "index" | "object" = "object") {
  var result = undefined;
  var index = -1;
  if (data && propOne && value) {
    result = data.find((item, i) => {
      var isEqual = String(item[propOne])?.toLocaleLowerCase(getCaseLocale()) === String(value).toLocaleLowerCase(getCaseLocale())
      if(isEqual) index = i
      return isEqual
    });
  }
  // console.log(resultType == "index"? index: result, value)
  return resultType == "index"? index: result;
}

/**
 * Checks all keys of object, compares keys case insensitive with lower case and returns original key name in object.
 * @param data Json object
 * @param key object key
 * @returns 
 */
export function findKeyInObject(data: any, key: string) {
    if(!data) return "";
    key = key.toLocaleLowerCase(getCaseLocale());
    var originalKey = Object.keys(data).find((item) => item.toLocaleLowerCase(getCaseLocale()) === key);
    return originalKey;
}


export function findValueByKey(data: any, key: string) {
    if(!data) return ""
    var originalKey = findKeyInObject(data, key)
    if(isNullOrEmpty(originalKey) || !originalKey) return "";
    return data[originalKey];
}

//filter yapıyor
//equals eşit olanları döndürmak için true yollanmalı
export function filterData(
  data: Array<any>,
  propOne: string,
  value: any,
  equals: boolean
) {
  if (data && propOne && value) {
    return data.filter((item) => {
      if (equals) {
        return (
          String(item[propOne])?.toLocaleLowerCase(getCaseLocale()) ===
          String(value).toLocaleLowerCase(getCaseLocale())
        );
      }
      return (
        String(item[propOne])?.toLocaleLowerCase(getCaseLocale()) !==
        String(value).toLocaleLowerCase(getCaseLocale())
      );
    });
  }
  return false;
}

/**
 * Loops in range and maps callback function return values.
 * @param from from index
 * @param to to index
 * @param fn callback function, return value is pushed to array
 * @returns mapped callback function return value
 */
export const loopInRange = (from: number, to: number, fn = (i:number): any => { }) => {
  var result = []
  for (let index = from; index <= to; index++) {
    result.push(fn(index))
  }
  return result.map((item) => item)
}

/**
 * Finds value in array and returns index and object.
 * 
 * usage: var item = findInArray(selectedFiles, file, "FileName").
 * 
 * usage: var checked = findInArray(selectedOptions, option, valueProp).index > -1.
 * 
 * @param arr Array of any
 * @param find value to check (object or primitive)
 * @param arrItemProp object key to check in array item
 * @param findItemProp object key to check in find item
 * @returns value and index
 */
export const findInArray = (arr: Array<any>, find: any, arrItemProp?: string, findItemProp?: string):  {value: any, index: number} => {
  var result = {value: undefined, index: -1};
  if(!findItemProp) findItemProp = arrItemProp;
  arr.forEach((item, i) => {
    if((arrItemProp && (getObjectValue(item, arrItemProp) == getObjectValue(find, findItemProp) || item == getObjectValue(find, findItemProp) || getObjectValue(item, arrItemProp) == find)) || (item == find)){
      result.value = item;
      result.index = i;
    }
  });
  return result;
}

export const selectDefaultValues = (selectedValue: any, prop: string, allValues?: Array<any>, splitters: RegExp = /[,;]/): Array<any> => {
  if(selectedValue){
    if(Array.isArray(selectedValue)){
      return selectedValue
    }
    else if(allValues && Array.isArray(allValues) && allValues.length > 0){
      var tmpOptions = new Array<any>();
      allValues.forEach((option) => {
        if(getObjectValue(option, prop) == selectedValue || (getObjectValue(selectedValue, prop) == getObjectValue(option, prop))) tmpOptions.push(option)
      })
      return tmpOptions
    }
    else if(typeof selectedValue == "string"){
      if(selectedValue.startsWith("[") && selectedValue.endsWith("]")) return JSON.parse(selectedValue)
      
      var splittedValues = selectedValue.split(splitters)
      return splittedValues;
    }
    else return [selectedValue]
  }
  return []
}

export const filterInArray = (arr: Array<any>, find: string, prop?: string): Array<any> => {
  if(!find) return arr;
  find = find.toLocaleLowerCase(getCaseLocale());

  var result = new Array<any>();
  arr.forEach((item, i) => {
    var text: string = "";
    if(typeof item == "string" || typeof item == "boolean" || typeof item == "number") text = item.toString()
    if(prop) text = getObjectValue(item, prop, "");
    if(text && text.toLocaleLowerCase(getCaseLocale()).indexOf(find) > -1)
      result.push(item);
  });
  return result;
}

export const getNextElement = (arr?: Array<any>, lastIndex?: number) => {
  if(!arr || !lastIndex) return undefined
  if(lastIndex + 1 >= arr.length) return arr[0]
  return arr[lastIndex + 1]
}

export const insertToIndex = (arr: Array<any>, index: number, ...objs: Array<any>) => {
  var endIndex: number = index + objs.length;
  for (let i = index; i < endIndex; i++) {
    var objIndex = i - index;
    arr.splice(i, 0, objs[objIndex]);
  }
  //console.log(arr, objs)
  return arr;
}
export const removeAtIndex = (arr: Array<any>, fromIndex: number, count: number = 1) => {
  arr.splice(fromIndex, count);
  return arr;
}

export function base64ToArrayBuffer(base64: string) {
  const binaryString = atob(base64);

  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
}

export function sortByKey(arr: Array<any>, key: string, order = "asc", type?: "text" | "numeric" | "date", lang: string = "tr") {
  if(!order) order = "asc";
  if(!arr) return arr;
  if(!lang) lang = "en-US"
  return arr.sort((a: any, b: any) => {
    if (a[key] === undefined || b[key] === undefined) return 0;

    let comparison = 0;
    var valA = a[key];
    var valB = b[key];
    if(type == "date"){
      try {
        valA = convertToDate(valA);  
      } catch (error) {
        
      }
      try {
       valB = convertToDate(valB); 
      } catch (error) {
        
      }
    }
    if (typeof valA === "string" && typeof valB === "string") {
      comparison = valA.localeCompare(valB, lang, { sensitivity: "base" });
    } else {
      comparison = valA > valB ? 1 : valA < valB ? -1 : 0;
    }

    return order.toLowerCase() === "desc" ? -comparison : comparison;
  });
}

export function paginate(array: Array<any>, page: number, pageSize: number): Array<any> {
  const start = (page - 1) * pageSize;
  return array.slice(start, start + pageSize);
}