import FileData from "../Models/FileData";
import { clone, camelize, isNullOrEmpty } from "../Extensions/StringExtensions";
import APIService from "../Service/apiService";
import ServiceResult from "../Service/serviceResult";
import { validateKeyName, setObjectValue, getObjectValue } from "../Extensions/ReflectionExtensions";
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
    
      setFieldData(data: any, name: string, value: any, languageID: number, uploadedFiles: Array<FileData>, multipleFile: boolean = false, i18n: boolean = false){
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
          for (let index = 0; index < files.length; index++) {
            const file = files[index];
            if(multipleFile != true){
              for (let index = uploadedFiles.length - 1; index >= 0; index--) {
                const element = uploadedFiles[index];
                if((element.LanguageID == 0 || element.LanguageID == languageID)){
                  removeAtIndex(uploadedFiles, index)
                }
              }
            }
            readUploadedFile(file, (name, size, base64, buffer) => {
              var fileData = new FileData();
              fileData.FileName = name;
              fileData.KeyName = propName;
              fileData.FileSize = size;
              fileData.Base64Data = base64;
              if(i18n) fileData.LanguageID = languageID;
              else fileData.LanguageID = 0;
              uploadedFiles.push(fileData);
            })
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
          var data = (data[this.i18nProperty] as Array<any>).find((item) => item.languageID == languageID)
          return data;
        }
        return undefined
      }
    
      addI18NData(parentData: any, name: string, languageID: number){
        if(this.i18nProperty && this.UseI18n && parentData){
          var list = parentData[this.i18nProperty] as Array<any> ?? new Array<any>();
          var data = list.find((item) => item.languageID == languageID)
          if(data) return data;
    
          var data:any = {};
          data.id = 0;
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
    async SaveEntity(languageID: number, data: any, files: Array<FileData>){
        var redirect: boolean = true
        if (data.id == 0 || data.id == undefined) {
          data.statusID = 1;
        }
        if (data.id && data.id > 0) {
          redirect = false;
        }
        this.validateReferencedProps(data);
        let postData: any = { data: data, languageID: languageID, files: files };
        try {
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

    async DeleteEntity(data: any){
        try {
            const postData: any = {
            Data: {...clone(data), ...{statusID: 2}},
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
    async GetEntity(id: any, data: any){
        if(id && !data){
            try {
                let postData = {
                    ...{
                    Data: { id: id },
                    id: id          
                    }
                };

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