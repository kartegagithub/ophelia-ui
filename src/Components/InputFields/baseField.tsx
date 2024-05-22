import { AppTheme, getAppTheme } from "../../AppTheme";
import {
  getFormattedDateString,
  isNullOrEmpty,
  isValidDate,
  parseFloatIfCan,
  validateEmail,
} from "../../Extensions/StringExtensions";
import React, { SyntheticEvent } from "react";
import { InputFieldsTheme } from "./InputFieldsTheme";
import RawHTML from "../RawHTML";
import { randomId } from "../../Extensions/ReflectionExtensions"
export default class BaseField<P> extends React.Component<
  P & {
    name: string;
    valueName?: string;
    languageKey?: string | number;
    text?: string;
    labelVisible?: boolean;
    value?: any;
    defaultValue?: any;
    checked?: boolean;
    labelType?: "seperated" | "floatingFixed" | "floating";
    errorClassName?: string;
    format?: string;
    listener?: any;
    type?: string;
    multipleSelection?: boolean;
    i18n?: boolean;
    required?: boolean;
    theme?: InputFieldsTheme;
    onChange?: Function,
    visible?: boolean | Function
  },
  { hasValidationError: boolean; message: any }
> {
  Theme?: InputFieldsTheme = getAppTheme({ InputFields: this.props.theme }).InputFields;
  Visibility: boolean = true
  ID: string = randomId();
  constructor(props: any) {
    super(props);
    this.state = {
      hasValidationError: false,
      message: undefined
    };
    if (this.props.listener?.registerField) {
      this.props.listener?.registerField(this);
      //console.info("registerField", this.props.name, this.ID)
    }
  }
  componentDidMount(){
    //console.info("componentDidMount", this.props.name, this.ID)
  }
  checkVisibility = (setLocalvalue: boolean = true) => {
    var visibility: boolean = true
    if(!visibility) visibility = true;
    if(this.props.visible != undefined && typeof this.props.visible == "boolean") visibility = this.props.visible == true;
    else if(this.props.visible != undefined && typeof this.props.visible == "function"){
      var fn: any = this.props.visible;
      visibility = fn()
    }
    if(setLocalvalue) this.Visibility = visibility;
    return visibility
  }
  getVisibility = () => this.Visibility;
  render(): React.ReactNode {
    if(!this.checkVisibility()) return <></>

    return (
      <div className={this.Theme?.RootClass}>
        <div className={`field-input relative ${(!this.props.labelType || this.props.labelType == "seperated") && "flex flex-col-reverse"}`}>
          {this.renderInput()}
          {this.props.labelVisible != false && this.props.text && (
            <label
              className={
                this.props.labelType == "floatingFixed"
                  ? getAppTheme().Inputs?.floatingFixedLabel
                  : this.props.labelType == "floating"
                    ? getAppTheme().Inputs?.inputLabel
                    : getAppTheme().Inputs?.seperatedLabel
              }
            >
              <RawHTML
                html={`${this.props.text} ${this.props.required === true ? "*" : ""}`}
              />
            </label>
          )}
        </div>
        {this.state.hasValidationError && (
          <span className={this.Theme?.ErrorMessageClass}>
            {this.state.message}
          </span>
        )}
      </div>
    );
  }

  renderInput() {
    return <></>;
  }

  async onValueChange(e: SyntheticEvent | any) {
    //console.log("giriş");
    
    var inputEvent = e.nativeEvent as InputEvent;
    var value: string | number = "";
    var target: any = undefined;
    if (inputEvent) {
      if (inputEvent.target) target = inputEvent.target;
      else if (inputEvent.currentTarget) target = inputEvent.currentTarget;
    } else if (e.target) target = e.target;
    else if (e.currentTarget) target = e.currentTarget;

    if (target) {
      value = target.value;
      if (
        this.props.type === "radio" ||
        this.props.type === "checkbox" ||
        this.props.type === "boolean"
      ) {
        value = target.checked ? 1 : 0;
      } else if (this.props.type === "file") {
        value = target.files;
      } else if (this.props.type === "filterbox" && (this.props.multipleSelection == true)) {
        if(e.rawValue && !this.props.name.endsWith("ID")) value = e.rawValue
      }
    } else if (e.value) {
      value = e.value;
    }

    if (this.props.onChange)
      this.props.onChange({ name: this.props.name, value });

    if(this.Validate(value)){
      if (this.props.listener?.setFieldData) {
        this.props.listener?.setFieldData(
          this.props.valueName ?? this.props.name,
          value,
          this
        );
      }
    }
    return true;
  }
  Validate(val: any) {
    var isEmpty = isNullOrEmpty(val);
    var message: string = "";
    var isValid: boolean = !isEmpty || this.props.required !== true;
    if (isValid) {
      if (this.props.type === "email") {
        isValid = validateEmail(val);
        if (!isValid) message = "Invalid email";
      }
    }
    if (!isValid && isNullOrEmpty(message)) message = "Please fill";
    if(!isValid != this.state.hasValidationError){
      //console.info("Validate", this.props.name, this.ID)
      this.setState({
        hasValidationError: !isValid,
        message: isValid ? undefined : message,
      });
    }
    return isValid;
  };
  GetValue() {
    var value =
      this.props.listener && this.props.listener.getFieldData
        ? this.props.listener.getFieldData(this)
        : undefined;
    return value ?? this.props.value ?? this.props.defaultValue;
  }
  GetProps() {
    var otherProps = (({ text, i18n, languageKey, visible, errorClassName, type, listener, onChange, value, ...others }) => others)(
      this.props
    );
    var checked = this.props.checked ?? false;
    var value = this.GetValue();
    if (
      value &&
      !checked &&
      (this.props.type === "radio" ||
        this.props.type === "checkbox" ||
        this.props.type === "boolean")
    ) {
      if (typeof value == "boolean") checked = value;
      else if (typeof value == "string")
        checked = value.toUpperCase() == "TRUE" || value.toUpperCase() == "YES";
      else if (parseFloatIfCan(value) > 0) checked = true;
      value = undefined;
    }
    var props: any = {
      ...{
        id: otherProps.name,
        key: `${this.props.languageKey}_${this.props.name}`,
        errorClassName: this.state.hasValidationError? this.Theme?.InputErrorClass: undefined,
        defaultValue: value,
        value: undefined,
        defaultChecked: checked,
        checked: undefined,
        onChange: (e: any) => {
          this.onValueChange(e);
        },
      },
      ...otherProps,
    };
    return props;
  }
}
