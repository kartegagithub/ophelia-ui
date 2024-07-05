export const getLocalstorage = (propName: string) => {
    if(!globalThis.localStorage)
      return null;

    const getData = localStorage.getItem(propName);
    if(getData){
      try{
        return JSON.parse(getData);
      }
      catch(e){
        console.warn("getLocalstorage JSon parse edemedi.", e);
      }    
    }
    return null;
  };
  
  export const setLocalstorage = (propName: string, data: any) => {
    if(!globalThis.localStorage)
      return null;
    localStorage.setItem(propName, JSON.stringify(data));
    return undefined
  };
  
  export const removeLocalstorage = (propName: string) => {
    if(!globalThis.localStorage)
      return null;
    localStorage.removeItem(propName);
    return undefined
  };
  