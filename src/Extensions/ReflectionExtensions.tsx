import React, { Children } from "react";
import { isNumeric } from "./StringExtensions";

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
    return null
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
  return typeof obj["indexOf"] === "function"
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