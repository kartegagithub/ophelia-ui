import React, { Children, useEffect, useState } from "react";
import { convertToBool, deepMap, getObjectValue, setObjectValue, typeCheck } from "../../Extensions/ReflectionExtensions";
import { BaseField } from "../InputFields";
import { findInArray, removeAtIndex } from "../../Extensions";
import { setFormListener } from "../InputFields/baseField";
const Form: React.FC<{
    action?: string;
    method?: "get" | "post";
    className?: string;
    encType?: string;
    onSubmit?: Function;
    target?: string;
    preventSubmitEvent?: boolean
    children?: React.ReactNode;
    keepDataChanges?: boolean;
    setFieldsEvenIfNotValid?: boolean;
    showSeperateFieldError?: boolean
    formData?: any;
    onFormDataChange?: (data: any, name: string, newVal?: any, isValid?: boolean) => void
    translateFn?: (key: string) => string
  }> = ({ showSeperateFieldError = true, setFieldsEvenIfNotValid = false, onFormDataChange = undefined, translateFn = undefined, target, keepDataChanges = true, formData, preventSubmitEvent = true, encType = "multipart/form-data", method = "post", action, onSubmit, className, children }) => {
    const [data, SetData] = useState(formData ?? {})
    const [fields, setFields] = useState(new Array<any>());

    if(formData != data){
      SetData(formData)
    }
    const listener = {
      errorDisplayFn: (name?: string, msg?: string)=>{
        if(showSeperateFieldError == false ){
          return "";
        }
        return "Skip"
      },
      getData: () => {
        return data;
      },
      translate: (key: string) => {
        if(translateFn) return translateFn(key)
        return key;
      },
      registerField: (field: any) => {
        var existing = undefined;
        if(field.props.id) existing = findInArray(fields, field, "props.id")
        else existing = findInArray(fields, field, "props.name")

        if(existing.index > -1){
          removeAtIndex(fields, existing.index)
        }
        fields.push(field)
      },
      setFieldData: (name: string, value: any) => {
        setObjectValue(data, name, value);
        if(onFormDataChange) onFormDataChange(data, name)
      },
      getFieldData: (field: any) => {
        return getObjectValue(data, field.props.name, "");
      },
      onChangeRequest: (name: string, value: any, isValid: boolean) => {
        if(isValid != true && setFieldsEvenIfNotValid == true) listener.setFieldData(name, value);
        else if (onFormDataChange) onFormDataChange(data, name, value, isValid)
      }
    };
    useEffect(() => {
      if(keepDataChanges)
        setFormListener(listener);
      return () => {
        setFormListener(undefined);
      };
    }, []);

    const onSubmitFn = (e: React.FormEvent) => {
        if(preventSubmitEvent === true)
            e.preventDefault();
        
        var isValid = true;
        var fieldStates = new Array<{name: string, valid: boolean, msg: string}>();
        if(fields && fields.length > 0){
          for (let index = 0; index < fields.length; index++) {
            const field: BaseField<{}> = fields[index];
            var tmpValid = field.Validate(listener.getFieldData(field))
            if(!tmpValid) isValid = false;
            fieldStates.push({name: field.props.name, valid: tmpValid, msg: field.state.message})
          }
        }
        if(onSubmit){
            return onSubmit(e, data, isValid, fieldStates)
        }
        return false;
    }
    return (
      <form action={action} target={target} method={method} onSubmit={(e) => onSubmitFn(e)} className={`oph-form ${className}`} encType={encType} autoComplete="off">
        {children}
      </form>
    );
  };
  
  export default Form;
  