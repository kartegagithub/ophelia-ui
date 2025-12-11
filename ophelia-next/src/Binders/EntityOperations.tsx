import FileData from "../Models/FileData";
import { clone, camelize, isNullOrEmpty } from "../Extensions/StringExtensions";
import APIService from "../Service/apiService";
import ServiceResult from "../Service/serviceResult";
import { validateKeyName, setObjectValue, getObjectValue, isEqualValue } from "../Extensions/ReflectionExtensions";
import { readUploadedFile } from "../Extensions/InputExtensions";
import { removeAtIndex } from "../Extensions";

export class EntityOperations{
    Service: APIService = new APIService()
    UpdateURL: string = ""
    Entity: string = ""
    GetEntityURL: string = ""
    UseI18n: boolean = false
    i18nProperty: string = ""
    DefaultLanguageID: number = 0

    getPropertyValue = (data: any, name: string, languageID: number, i18n: boolean = false, keepBaseValue: boolean = false) => {
        if(!data) return "";
    
        if(name === "id") return data.id
        if(name === "uid") return data.uid
        if(name === "selectedLanguageID") return data.languageID
        if(name == "dateCreated") return data.dateCreated
        if(name == "dateModified") return data.dateModified
        if(name == "statusID") return data.statusID
    
        var propName = validateKeyName(data, name);
        var objValue = getObjectValue(data, propName, "");
        if(this.UseI18n && i18n == true){
          if(!this.i18nProperty) this.getI18NProperty(data)
          var i18nData = this.getI18NData(data, languageID)
          if(i18nData){
            objValue = getObjectValue(i18nData, propName, "")
          }
          else if(!keepBaseValue) objValue = "";
        }
        return objValue
      }

      getFieldData = (data: any, field: any, languageID: number) => {
        var value = this.getPropertyValue(data, field.props.name, languageID, field.props.i18n);
        return value;
      }
    
      setFieldData(data: any, name: string, value: any, languageID: number, uploadedFiles: Array<FileData>, multipleFile: boolean = false, i18n: boolean = false, imageLoadCallback: Function | undefined = undefined){
        if(!name && name === "id") return;
        if(name === "selectedLanguageID") return
        if(name == "dateCreated") return
        if(name == "dateModified") return
        if(name == "statusID") {
          data.statusID = value;
          return
        }
        
        var propName = validateKeyName(data, name);
        if(typeof value == "object" && value.constructor && value.constructor.name == "FileList"){
          var files = (value as FileList);
          //First remove non-existing files. Files may be removed
          for (let index = uploadedFiles.length - 1; index >= 0; index--) {
            const element = uploadedFiles[index];
            if(element.FilePath) continue;
            if(element.KeyName != propName) continue;

            var found = 0;
            for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
              const file = files[fileIndex];
              if((element.LanguageID == 0 || element.LanguageID == languageID)){
                found = element.FileName == file.name ? 1 : -1;
                break;
              }
            }
            if(found == -1){
              removeAtIndex(uploadedFiles, index)
              console.log("File deleted (NOTEXISTS)", element, uploadedFiles)
            }
          }
          if(files.length == 0){
            this.setFieldData(data, name, undefined, languageID, uploadedFiles, multipleFile, i18n, imageLoadCallback);
          }
          else{
            for (let index = 0; index < files.length; index++) {
              const file = files[index];
              var existing = uploadedFiles.find((item) => item.FileName == file.name && (item.LanguageID == 0 || item.LanguageID == languageID) && item.KeyName == propName);
              if(existing){
                existing.StatusID = 1;
                console.log("Found existing image, not loaded new one", existing);
                continue;
              }
  
              if(multipleFile != true){
                for (let index = uploadedFiles.length - 1; index >= 0; index--) {
                  const element = uploadedFiles[index];
                  if((element.LanguageID == 0 || element.LanguageID == languageID) && element.KeyName == propName){
                    debugger;
                    removeAtIndex(uploadedFiles, index)
                    console.log("File deleted (SINGLE)", element, uploadedFiles)
                  }
                }
              }
              readUploadedFile(file, (name, size, base64, buffer) => {
                var fileData = new FileData();
                fileData.FileName = name;
                fileData.KeyName = propName;
                fileData.FileSize = size;
                fileData.StatusID = 1;
                fileData.Base64Data = base64;
                if(i18n) fileData.LanguageID = languageID;
                else fileData.LanguageID = 0;
                uploadedFiles.push(fileData);
                imageLoadCallback && imageLoadCallback()
                console.log("File uploaded (SINGLE)", uploadedFiles)
              })
            }
          }
        }
        else{
          if(this.UseI18n && i18n == true){
            if(!this.i18nProperty) this.getI18NProperty(data)
            var i18nData = this.getI18NData(data, languageID)
            if(!i18nData) i18nData = this.addI18NData(data, name, languageID)
            if(i18nData) setObjectValue(i18nData, propName, value)
            setObjectValue(data, propName, value)
          }
          else setObjectValue(data, propName, value)
        }
      }

      getI18NProperty(data: any){
        if(!this.i18nProperty && this.UseI18n)
        {
          var i18nProp = Object.keys(data).find((item) => item.toLocaleUpperCase().indexOf("I18N") > -1)
          if(!i18nProp && this.UseI18n) i18nProp = camelize(this.Entity) + "_i18n"
          if(i18nProp) this.i18nProperty = i18nProp;
        }
        return this.i18nProperty;
      }
      getI18NData(data: any, languageID: number){
        if(this.i18nProperty && this.UseI18n && data && data[this.i18nProperty]){
          var i18nData: Array<any> = data[this.i18nProperty]
          var tmpData = i18nData.filter((item) => isEqualValue(item, "languageID", languageID))
          if(tmpData.length > 0)
            return tmpData[0];
        }
        return undefined
      }
    
      addI18NData(parentData: any, name: string, languageID: number){
        if(this.i18nProperty && this.UseI18n && parentData){
          var list = parentData[this.i18nProperty] as Array<any> ?? new Array<any>();
          var data = list.find((item) => isEqualValue(item, "languageID", languageID))
          if(data) return data;
    
          var data:any = {};
          data.id = 0;
          data.uid = '';
          data[name] = undefined;
          data.languageID = languageID;
          delete data[this.i18nProperty]
          delete data["isImporting"]
          delete data["isSelected"]
          delete data["isValid"]
          delete data["userCreatedID"]
          delete data["userModifiedID"]
          delete data["dateCreated"]
          delete data["dateModified"]
          delete data["captcha"]
          list.push(data)
    
          parentData[this.i18nProperty] = list;
          return data;
        }
        return undefined;
      }
    
    validateReferencedProps(data: any){
      var keys = Object.keys(data)
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        if(key.endsWith("ID") && isNullOrEmpty(data[key]) ){
          var refProp = key.substring(0, key.length - 2)
          if(data[refProp]) data[refProp] = null;
        }
      }
    }
    async SaveEntity(languageID: number, data: any, files: Array<FileData>, keyName: string = "id"){
        if(!keyName) keyName = "id";
        var redirect: boolean = true
        if (data[keyName] == 0 || isNullOrEmpty(data[keyName])) {
          data.statusID = 1;
        }
        if (data[keyName] && (data[keyName] > 0 || !isNullOrEmpty(data[keyName]))) {
          redirect = false;
        }
        this.validateReferencedProps(data);
        let postData: any = { data: data, languageID: languageID, files: files };
        try {
          const result = await this.Service.CreateEndpoint(this.UpdateURL,
            { Payload: postData, EnableConcurrentRequests: true }
          ).call();
          return result;
        } catch (error) {
            var result = new ServiceResult();
            result.hasFailed = true;
            result.messages = [{ code: "API_FAIL", description: "API_CALL_FAILED", type: 100}]
            return result;
        }
    }

    async DeleteEntity(data: any){
        try {
            const postData: any = {
              data: {...clone(data), ...{statusID: 2}},
            };
            const result = await this.Service.CreateEndpoint(this.UpdateURL,
            { Payload: postData }
            ).call();
            return result;
        } catch (error) {
            var result = new ServiceResult();
            result.hasFailed = true;
            result.messages = [{ code: "API_FAIL", description: "API_CALL_FAILED", type: 100}]
            return result;
        }
    }
    async GetEntity(id: any, data: any, extraFilters?: any, keyName?: string): Promise<ServiceResult>{
        if(!keyName) keyName = "id";
        if(id && !data){
            try {
                let postData = {
                    ...{
                    Data: {...extraFilters, ...{ [keyName]: id }},
                    }
                };
                postData[keyName] = id;
                var result = await this.Service.CreateEndpoint(this.GetEntityURL, { Payload: postData } ).call()
                return result;
            } catch (error) { 
                var result = new ServiceResult();
                result.hasFailed = true;
                result.messages = [{ code: "API_FAIL", description: "API_CALL_FAILED", type: 100}]
                return result;
            }
        }
        var result = new ServiceResult();
        result.data = data;
        result.hasFailed = !id && !data
        return result;
    }
}