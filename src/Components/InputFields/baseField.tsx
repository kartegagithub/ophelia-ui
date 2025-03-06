import {
  convertToDate,
  isNullOrEmpty,
  parseFloatIfCan,
  validateRange,
  validateEmail,
} from "../../Extensions/StringExtensions";
import React, { SyntheticEvent } from "react";
import RawHTML from "../RawHTML";
import { convertToBool, randomId } from "../../Extensions/ReflectionExtensions";
import InputValidationRule from "./InputValidationRule";
import { FileData } from "../../Models";
export default class BaseField<P> extends React.Component<
  P & {
    id: string;
    name: string;
    lowValueName?: string;
    highValueName?: string;
    valueName?: string;
    languageKey?: string | number;
    text?: string;
    labelVisible?: boolean;
    value?: any;
    defaultValue?: any;
    checked?: boolean;
    labelType?: "seperated" | "floatingFixed" | "floating";
    errorClassName?: string;
    errorDisplayFn?: (name: string, msg?: string) => React.JSX.Element;
    validateCallback?: (isValid: boolean, value: any) => boolean;
    setDataCallback?: (value: any) => any | undefined;
    valueFormatter?: (value: any) => any;
    format?: string;
    listener?: any;
    type?: string;
    multipleSelection?: boolean;
    i18n?: boolean;
    required?: boolean;
    onChange?: Function;
    visible?: boolean | Function;
    rules?: InputValidationRule | Array<InputValidationRule>;
    rootStyle?: any;
    errorMessageText?: string;
    disabledFn?: Function;
    disabled?: boolean;
  },
  {
    hasValidationError: boolean;
    rerenderCount: number;
    message: any;
    messageDisplayFn: Function | undefined;
  }
> {
  Visibility: boolean = true;
  Disabled: boolean = false;
  ID: string = randomId();
  constructor(props: any) {
    super(props);
    this.state = {
      hasValidationError: false,
      message: undefined,
      messageDisplayFn: undefined,
      rerenderCount: 0
    };
    if (this.getListener()?.registerField) {
      this.getListener()?.registerField(this);
    }
  }
  getListener = () => {
    if(this.props.listener) return this.props.listener;
    var listener = getFormListener();
    return listener
  }
  checkVisibility = (setLocalvalue: boolean = true) => {
    var visibility: boolean = true;
    if (!visibility) visibility = true;
    if (
      this.props.visible != undefined &&
      typeof this.props.visible == "boolean"
    )
      visibility = this.props.visible == true;
    else if (
      this.props.visible != undefined &&
      typeof this.props.visible == "function"
    ) {
      var fn: any = this.props.visible;
      visibility = fn();
    }
    if (setLocalvalue) this.Visibility = visibility;
    return visibility;
  };
  checkDisabled = (setLocalvalue: boolean = true) => {
    var disabled: boolean = false;
    if (this.props.disabled != undefined)
      disabled = this.props.disabled == true;
    if(this.props.disabledFn)
      disabled = this.props.disabledFn();

    if (setLocalvalue) this.Disabled = disabled;
    return disabled;
  };
  showError = () => {
    var errFn = this.props.errorDisplayFn ?? this.getListener()?.errorDisplayFn;
    if(errFn && this.state.hasValidationError){
      var msg = errFn(this.props.name, this.state.message)
      if(msg !== "Skip")
        return msg;
    }
    if(!errFn && !this.state.messageDisplayFn && this.state.hasValidationError){
      return (<span className="oph-inputField-errorMessage">
        {this.state.message}
      </span>)
    }
    
    if(!errFn && this.state.messageDisplayFn && this.state.hasValidationError){
      return <>
        {this.state.messageDisplayFn(this.props.name, this.state.message)}
      </>
    }
      
    return <></>;
  }
  getVisibility = () => this.Visibility;
  getDisabled = () => this.Disabled;
  render(): React.ReactNode {
    if (!this.checkVisibility()) return <></>;
    return (
      <div id={this.props.id} className="oph-inputField">
        <div
          className={`oph-inputField-field ${
            !this.props.labelType || this.props.labelType == "seperated"
              ? "seperated"
              : ""
          } ${this.state.hasValidationError ? "error" : ""}`}
        >
          {this.renderInput()}
          {this.props.labelVisible != false && this.props.text && (
            <label
              htmlFor={this.props.name}
              className={`oph-inputField-field-label ${
                this.props.labelType == "floatingFixed"
                  ? "floatingFixed"
                  : this.props.labelType == "floating"
                    ? "inputLabel"
                    : "seperatedLabel"
              }`}
            >
              <RawHTML
                html={`${this.props.text} ${
                  this.props.required === true ? "*" : ""
                }`}
              />
            </label>
          )}
        </div>

        {this.showError()}
      </div>
    );
  }

  renderInput() {
    return <></>;
  }

  async onValueChange(e: SyntheticEvent | any) {
    var inputEvent = e.nativeEvent as InputEvent;
    var value: string | number | boolean | undefined = "";
    var lowValue: string | number | boolean | undefined = "";
    var highValue: string | number | boolean | undefined = "";
    var target: any = undefined;
    var deletedFile: FileData | undefined = undefined;
    if (inputEvent) {
      if (inputEvent.target) target = inputEvent.target;
      else if (inputEvent.currentTarget) target = inputEvent.currentTarget;
    } else if (e.target) target = e.target;
    else if (e.currentTarget) target = e.currentTarget;

    var parentData =
      this.getListener() && typeof this.getListener()["getData"] == "function"
        ? this.getListener()?.getData()
        : undefined;
    if (target) {
      value = target.value;
      if (
        this.props.type === "radio" ||
        this.props.type === "checkbox" ||
        this.props.type === "agreementCheckbox" ||
        this.props.type === "boolean"
      ) {
        var tmpValue = target.checked
          ? ((isNullOrEmpty(value) ? 1 : value) ?? 1)
          : undefined;
        if (parentData && (parentData as any).hasOwnProperty(this.props.name)) {
          if (typeof parentData[this.props.name] == "boolean")
            value = convertToBool(tmpValue);
          else if (typeof parentData[this.props.name] == "number") {
            if (tmpValue === true) value = 1;
            else if (tmpValue === false || tmpValue === undefined) value = 0;
            else value = tmpValue;
          } else value = tmpValue;
        } else value = tmpValue;
      } else if (this.props.type === "file") {
        value = target.files;
        deletedFile = e.deletedFile;
      } else if (
        this.props.type === "filterbox" &&
        this.props.multipleSelection == true
      ) {
        if (e.rawValue && !this.props.name.endsWith("ID")) value = e.rawValue;
      }
    } else if (e.value) {
      value = e.value;
    }
    if(e.rawValue && (e.rawValue.low || e.rawValue.high)){
      lowValue = e.rawValue.low
      highValue = e.rawValue.high
    }
    if (this.props.onChange) {
      this.props.onChange({ name: this.props.name, value: value ?? this.props.value, rawValue: e.rawValue });
    }

    var isValid = true;
    if(this.props.lowValueName) {
      isValid = this.Validate(lowValue, this.props.lowValueName);
      if (this.getListener()?.onChangeRequest){
        this.getListener()?.onChangeRequest(
          this.props.lowValueName,
          lowValue,
          isValid,
          this
        );
      }
      if (isValid) {
        if (this.getListener()?.setFieldData) {
          if(this.props.setDataCallback){
            var tmpVal = this.props.setDataCallback(lowValue)
            if(tmpVal != undefined && tmpVal != null){
              lowValue = tmpVal;
            }
          }
          this.getListener()?.setFieldData(
            this.props.lowValueName,
            lowValue,
            this,
            e.rawValue
          );
        }
      }
    }
    if(this.props.highValueName){
      isValid = this.Validate(highValue, this.props.highValueName);
      if (this.getListener()?.onChangeRequest){
        this.getListener()?.onChangeRequest(
          this.props.highValueName,
          highValue,
          isValid,
          this
        );
      }
      if (isValid) {
        if (this.getListener()?.setFieldData) {
          if(this.props.setDataCallback){
            var tmpVal = this.props.setDataCallback(highValue)
            if(tmpVal != undefined && tmpVal != null){
              highValue = tmpVal;
            }
          }
          this.getListener()?.setFieldData(
            this.props.highValueName,
            highValue,
            this,
            e.rawValue
          );
        }
      }
    }
    if(!this.props.lowValueName && !this.props.highValueName){
      isValid = this.Validate(value);
      if (this.getListener()?.onChangeRequest){
        this.getListener()?.onChangeRequest(
          this.props.valueName ?? this.props.name,
          value,
          isValid,
          this
        );
      }
      if (isValid) {
        if (this.getListener()?.setFileDeleted && deletedFile) {
          deletedFile.KeyName = this.props.name;
          this.getListener()?.setFileDeleted(deletedFile);
        }
        if (this.getListener()?.setFieldData) {
          if(this.props.setDataCallback){
            var tmpVal = this.props.setDataCallback(value)
            if(tmpVal != undefined && tmpVal != null){
              value = tmpVal;
            }
          }
          this.getListener()?.setFieldData(
            this.props.valueName ?? this.props.name,
            value,
            this,
            e.rawValue
          );
        }
      }
    }
    return true;
  }
  Validate = (val: any, propName?: string) => {
    if(!propName) propName = this.props.name;

    var isEmpty = isNullOrEmpty(val);
    var rule: InputValidationRule | undefined = undefined;
    if (this.props.rules) {
      if (Array.isArray(this.props.rules)) {
        rule = this.props.rules.find(
          (r) =>
            (Array.isArray(r.field) && r.field.indexOf(this.props.name) > -1) ||
            r.field == propName
        );
      } else {
        var tmpRule: any = this.props.rules;
        rule = tmpRule;
      }
    }
    if (!rule) {
      rule = {
        field: propName,
      };
    }

    var isValid: boolean = !isEmpty || this.props.required !== true;
    var isDateTextValid: boolean = !isEmpty || this.props.required !== true;

    var msg = "";
    if (typeof rule.message == "string") {
      msg = rule.message;
    } else if (rule.message) {
      msg = rule.message(
        val,
        rule.max,
        rule.min,
        this.getListener()?.translate
      );
    }
    if (isValid) {
      if (rule.rule && rule.rule.constructor.name == "RegExp") {
        isValid = (rule.rule as RegExp).test(val);
        if (rule.ruleSatisfaction) rule.ruleSatisfaction(0, isValid);
      } else if (Array.isArray(rule.rule)) {
        for (let index = 0; index < rule.rule.length; index++) {
          const _rule = rule.rule[index];
          if (!_rule) continue;

          var _IsValid = true;
          if (_rule && _rule.constructor.name == "RegExp") {
            _IsValid = (_rule as RegExp).test(val);
          } else if (typeof _rule == "function") {
            _IsValid = _rule(val, this.getListener()?.getData());
          }
          if (!_IsValid) isValid = false;
          if (rule.ruleSatisfaction) rule.ruleSatisfaction(index, _IsValid);
        }
      } else if (rule.rule && typeof rule.rule == "function") {
        isValid = rule.rule(val, this.getListener()?.getData());
        if (rule.ruleSatisfaction) rule.ruleSatisfaction(0, isValid);
      }
      if (
        isValid &&
        this.props.required === true &&
        this.props.type === "filterbox" &&
        this.props.multipleSelection == true
      )
        isValid = val && val.length > 0;
      if (isValid && val && this.props.type === "email"){
        isValid = validateEmail(val);
      }
      if (isValid && (rule.max || rule.min)) {
        if (
          this.props.type === "date" ||
          this.props.type === "datetime" ||
          this.props.type === "text"
        ) {
          isValid = validateRange(
            convertToDate(val).toDate(),
            rule.max as Date,
            rule.min as Date
          );
        } else isValid = validateRange(val, rule.max, rule.min);
      }
      if (isValid && (rule.max || rule.min)) {
        if (this.props.type === "date" || this.props.type === "datetime") {
          isValid = validateRange(
            convertToDate(val).toDate(),
            rule.max as Date,
            rule.min as Date
          );
        } else isValid = validateRange(val, rule.max, rule.min);
      } else if (isDateTextValid && (rule.max || rule.min)) {
        if (this.props.type === "text") {
          const newRule = rule?.rule as RegExp;
          isValid =
            newRule.test(val) &&
            validateRange(
              convertToDate(val).toDate(),
              rule.max as Date,
              rule.min as Date
            );
        }
      }
    }

    if (!msg) msg = this.props.errorMessageText ?? "FieldIsRequired";
    if (this.getListener() && this.getListener().translate)
      msg = this.getListener().translate(msg);

    if (msg && msg.indexOf("{") > -1 && msg.indexOf("}") > -1) {
      if (!rule.format) rule.format = (val: any) => val;
      if (rule.min)
        msg = msg.replace(
          "{min}",
          rule.format(rule.min, this.getListener()?.translate)
        );
      if (rule.max)
        msg = msg.replace(
          "{max}",
          rule.format(rule.max, this.getListener()?.translate)
        );
    }

    if (!isValid != this.state.hasValidationError) {
      if(this.props.validateCallback){
        isValid = this.props.validateCallback(isValid, val)
      }
      this.setState({
        hasValidationError: !isValid,
        message: isValid ? undefined : msg,
        messageDisplayFn: isValid ? undefined : rule.messageDisplayFn,
      });
    }
    return isValid;
  };
  GetValue() {
    var value =
    this.getListener() && this.getListener().getFieldData
        ? this.getListener().getFieldData(this)
        : undefined;
    return value ?? this.props.value ?? this.props.defaultValue;
  }
  GetProps() {
    var otherProps = (({
      rules,
      required,
      text,
      i18n,
      languageKey,
      visible,
      errorClassName,
      valueFormatter,
      type,
      listener,
      onChange,
      value,
      rootStyle,
      disabledFn,
      disabled,
      errorMessageText = "FieldIsRequired",
      ...others
    }) => others)(this.props);
    var checked = this.props.checked ?? false;
    var value = this.GetValue();
    if(this.props.valueFormatter)
      value = this.props.valueFormatter(value);

    if (
      value !== undefined &&
      value !== null &&
      !checked &&
      (this.props.type === "radio" ||
        this.props.type === "checkbox" ||
        this.props.type === "agreementCheckbox" ||
        this.props.type === "boolean")
    ) {
      if (typeof value == "boolean") checked = value;
      else if (typeof value == "string")
        checked = value.toUpperCase() == "TRUE" || value.toUpperCase() == "YES";
      else if (parseFloatIfCan(value) > 0) checked = true;
      value = undefined;
    }
    var disabled = this.checkDisabled();;
    var props: any = {
      ...{
        id: otherProps.name,
        key: `${this.props.languageKey}_${this.props.name}_${this.state.rerenderCount}`,
        errorClassName: this.state.hasValidationError
          ? "oph-inputField-inputError"
          : undefined,
        defaultValue: value,
        value: undefined,
        defaultChecked: checked,
        checked: undefined,
        disabled: disabled,
        onChange: (e: any) => {
          this.onValueChange(e);
        },
      },
      ...otherProps,
    };
    return props;
  }
}

var FormListener: any
export const setFormListener = (listener: any) => {
  if(globalThis.window){
    FormListener = listener;
  }
}
export const getFormListener = () => {
  return FormListener;
}