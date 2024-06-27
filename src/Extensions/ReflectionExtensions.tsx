import { Children } from "react";
import { isNumeric, parseFloatIfCan } from "./StringExtensions";
import { merge as LodashMerge } from "lodash-es"

export function getKeyByValue(object: any, value: any) {
    return Object.keys(object).find((key) => object[key] === value);
};
export function getQueryString(object?: any, url: string = "", disableCache: boolean = false) {    
    var keys = "";
    if(object){
      keys = Object.keys(object)
      .map((key) => {
        if (!object[key]) return "";
        return encodeURIComponent(key) + "=" + encodeURIComponent(object[key]);
      })
      .join("&");
    }
    var cacheKey = "";
    if(disableCache)
      cacheKey= "&_=" + randomId() + randomId()
    if(url) {
        if(url.indexOf("?") === -1)
            return `${url}?${keys}${cacheKey}`
        else
            return `${url}&${keys}${cacheKey}`
    }
    return `${keys}${cacheKey}`;
};
export const randomId = () => {
  return Math.random().toString(36).substring(2, 100);
};

export const typeCheck = (element: any, typesToCheck: string[]) => {
  var elementType = typeof element
  var {type} = element
  if(type && type.displayName)
    elementType = type.displayName
  else if(type && type.name)
    elementType = type.name

  if(typesToCheck && typesToCheck.length > 0)
    return  typesToCheck.indexOf(elementType) > -1;
  return false;
}

export const deepMap = (children: any, types: string[]): Array<any> => {
  var result: Array<any> = []
  if(!children)
    return result;

  Children.forEach(children, (child) => {
    if (child === null) return null;

    if (typeCheck(child, types)) {
      result.push(child);
    }

    if (
      child.props &&
      child.props.children &&
      typeof child.props.children === 'object'
    ) {
      result = result.concat(deepMap(child.props.children, types))
    }
    return undefined
  });
  return result;
}

export const getReferencePath = (propName?: string) => {
  if (!propName) return propName

  if(propName.indexOf(".") > -1){
    var names = propName.split(".");
    var tmpNames = "";
    for (let index = 0; index < names.length - 1; index++) {
      const indexedName = names[index];
      if(index > 0) tmpNames += ".";
      tmpNames += indexedName
    }
    return tmpNames;
  }
  return propName;
}

export const getObjectValue = (obj: any, propName?: string, defaultValue: any = "") => {
  if (!propName || !obj) return defaultValue
  if(typeof obj !== "object") return obj;
  
  var value: any = defaultValue;
  if(propName.indexOf(".") > -1){
    var names = propName.split(".");
    var tmpObj = obj
    for (let index = 0; index < names.length - 1; index++) {
      const indexedName = names[index];
      if(tmpObj[indexedName]) tmpObj = tmpObj[indexedName];
    }
    if(tmpObj && tmpObj != obj) value = tmpObj[names[names.length - 1]]
  }
  else value = obj[propName];
  return value ?? defaultValue;
}

export const validateKeyName = (obj: any, key?: string) => {
  if(!key) return key;
  var tmpKey = key.toLocaleLowerCase();
  var existingKey = Object.keys(obj).find((key) => key.toLocaleLowerCase() == tmpKey)
  if(existingKey) return existingKey
  return key;
}
export const setObjectValue = (obj: any, propName?: string, value?: any) => {
  if (!propName || !obj) return

  if(propName.indexOf(".") > -1){
    var names = propName.split(".");
    var tmpObj = obj
    for (let index = 0; index < names.length - 1; index++) {
      const indexedName = names[index];
      if(!tmpObj[indexedName]) tmpObj[indexedName] = {}
      tmpObj = tmpObj[indexedName];
    }
    if(tmpObj) tmpObj[names[names.length - 1]] = value
  }
  else obj[propName] = value;
}

export function functionExists(obj?: any, funcName?: string){
  if(!obj || !funcName) return false;
  return typeof obj[funcName] === "function"
}

export function execInTry(fn: Function, catchFn: ((error: any) => void)){
  try {
    return fn()
  } catch (error) {
    catchFn(error)
  }
  return undefined;
}

export const removeEmptyProps = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") removeEmptyProps(obj[key])
    else if (obj[key] === undefined) delete obj[key]
  });
  return obj;
};

export const enumToArray = (type: any, translateFn?: (key: string) => string | undefined) => {
  return Object.keys(type).filter((key) => !isNumeric(key)).map((key) => {
    var text: string = key;
    if(translateFn) text = translateFn(key) ?? key
    return  {
      value: type[key], 
      text: text}
  });
}
export const convertToBool = (val?: any) => {
  if(val == undefined || val == null || val == "") return false;
  if(typeof val == "boolean") return val
  if(typeof val == "number") return val > 0
  if(typeof val == "bigint") return val > 0
  if(typeof val == "string"){
    if(val.toLocaleLowerCase() == "true") return true;
    if(val.toLocaleLowerCase() == "false") return false;
    if(val.toLocaleLowerCase() == "on") return true;
    return parseFloatIfCan(val) > 0
  }
  return false;
}

export const merge = (obj1: any, ...objs: Array<any>) => {
  var result: any = {};
  if(obj1) result = LodashMerge(result, obj1);
  if(objs && objs.length > 0){
    for (let index = 0; index < objs.length; index++) {
      const element = objs[index];
      result = LodashMerge(result, element);
    }
  }
  return result;
}

