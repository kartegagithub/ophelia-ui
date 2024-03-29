import { AppTheme, getAppTheme } from "../../AppTheme";
import { getFormattedDateString, isValidDate } from "../../Extensions/StringExtensions";
import React, { SyntheticEvent } from "react";
import { InputFieldsTheme } from "./InputFieldsTheme";
export default class BaseField<P> extends React.Component<P & {
    name: string,
    text?: string,
    labelVisible?: boolean;
    value?: any,
    checked?: boolean,
    format?: string,
    listener?: any,
    type?: string
    required?: boolean
    theme?: InputFieldsTheme
  }, {hasValidationError: boolean, key: string, value: any}>{

    Theme?: InputFieldsTheme = getAppTheme({InputFields: this.props.theme}).InputFields
    constructor(props: any){
      super(props)
      this.state = {hasValidationError: false, key: "", value: undefined};
    }
    render(): React.ReactNode {
      if(this.props.listener?.registerField){
        this.props.listener?.registerField(this);
      }
      return (
        <div className={this.Theme?.RootClass}>
          {this.props.labelVisible != false && this.props.text && <label className={this.Theme?.LabelClass}>
            {this.props.text}
            {!this.state.hasValidationError && this.props.required === true? "*": ""}
          </label>}
          <div className="field-input">{this.renderInput()}</div>
            {this.state.hasValidationError && <span className={this.Theme?.ErrorMessageClass}>Please fill this area!</span>}
        </div>
      );
    }

    renderInput(){
      return <></>
    }

    async onChange(e: SyntheticEvent | any){
      //console.log("BaseField:onChange", e)
      var inputEvent = (e.nativeEvent as InputEvent)
      var value = ""
      if(inputEvent){
        if(inputEvent.target){
          var target: any = inputEvent.target
          value = target.value
        }
      }
      else if(e.value){
        value = e.value;
      }
      if((this.props as any).onChange) (this.props as any).onChange({name: this.props.name, value})
      if (this.props.listener?.setFieldData)
        this.props.listener?.setFieldData(this.props.name, value);
      this.Validate();
      return true;
    }
    Validate = () => {
      if(this.props.required === true){
        var value = this.GetValue()
        var valid = value !== undefined && value !== ""
        if(!valid){
          this.setState({hasValidationError: true})
          return false;
        }
      }
      this.setState({hasValidationError: false})
      return true;
    }
    GetValue(){
      var value = this.props.listener && this.props.listener.getFieldData ? this.props.listener.getFieldData(this): undefined
      if(isValidDate(value)){
        value = getFormattedDateString(value, this.props.format, this.props.type)
      }
      return value ?? undefined
    }
    GetProps(){
      var otherProps = (({ text, type, listener, value, ...others }) => others)(this.props)
      var props: any = {
        ...{
          id: otherProps.name,
          defaultValue: undefined,
          value: this.GetValue(),
          defaultChecked: undefined,
          checked: this.props.checked,
          onChange: (e: any) => {
            this.onChange(e);
          },
        },
        ...otherProps,
      };
      return props   
    }
  }