import { getObjectValue } from "./ReflectionExtensions";

//find yapıyor
export function findData(data: Array<any>, propOne: string, value: any, resultType: "index" | "object" = "object") {
  var result = undefined;
  var index = -1;
  if (data && propOne && value) {
    result = data.find((item, i) => {
      var isEqual = String(item[propOne])?.toLocaleLowerCase() === String(value).toLocaleLowerCase()
      if(isEqual) index = i
      return isEqual
    });
  }
  // console.log(resultType == "index"? index: result, value)
  return resultType == "index"? index: result;
}
export function findKeyInObject(data: any, key: string) {
  if(!data)
    return "";
    key = key.toLocaleLowerCase();
    return Object.keys(data).find((item) => item.toLocaleLowerCase() === key);
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
          String(item[propOne])?.toLocaleLowerCase() ===
          String(value).toLocaleLowerCase()
        );
      }
      return (
        String(item[propOne])?.toLocaleLowerCase() !==
        String(value).toLocaleLowerCase()
      );
    });
  }
  return false;
}

export const yearSelectBox = (startDate: any) => {
  const newDate = new Date();
  const thisYear = newDate.getFullYear();
  const arrayDate = [{ id: startDate, name: startDate }];
  for (let index = startDate; index < thisYear; index++) {
    arrayDate.unshift({ id: arrayDate[0].id + 1, name: arrayDate[0].id + 1 });
  }
  return arrayDate;
};

export const loopInRange = (from: number, to: number, fn = (i:number): any => { }) => {
  var result = []
  for (let index = from; index <= to; index++) {
    result.push(fn(index))
  }
  return result.map((item) => item)
}

export const findInArray = (arr: Array<any>, find: any, prop?: string):  {value: any, index: number} => {
  var result = {value: undefined, index: -1};
  arr.forEach((item, i) => {
    if((prop && (item[prop] == find[prop] || item == find[prop] || item[prop] == find)) || (item == find)){
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
        if(option[prop] == selectedValue || (selectedValue[prop] == option[prop])) tmpOptions.push(option)
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
  find = find.toLocaleLowerCase();

  var result = new Array<any>();
  arr.forEach((item, i) => {
    var text: string = "";
    if(typeof item == "string" || typeof item == "boolean" || typeof item == "number") text = item.toString()
    if(prop) text = getObjectValue(item, prop, "");
    if(text && text.toLocaleLowerCase().indexOf(find) > -1)
      result.push(item);
  });
  return result;
}

export const getNextElement = (arr?: Array<any>, lastIndex?: number) => {
  if(!arr || !lastIndex) return undefined
  if(lastIndex + 1 >= arr.length) return arr[0]
  return arr[lastIndex + 1]
}