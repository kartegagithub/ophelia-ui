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
  },
  {
    hasValidationError: boolean;
    message: any;
    messageDisplayFn: Function | undefined;
  }
> {
  Visibility: boolean = true;
  ID: string = randomId();
  constructor(props: any) {
    super(props);
    this.state = {
      hasValidationError: false,
      message: undefined,
      messageDisplayFn: undefined,
    };
    if (this.props.listener?.registerField) {
      this.props.listener?.registerField(this);
    }
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
  getVisibility = () => this.Visibility;
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

        {!this.props.errorDisplayFn &&
          !this.state.messageDisplayFn &&
          this.state.hasValidationError && (
            <span className="oph-inputField-errorMessage">
              {this.state.message}
            </span>
          )}
        {!this.props.errorDisplayFn &&
          this.state.messageDisplayFn &&
          this.state.hasValidationError && (
            <>
              {this.state.messageDisplayFn(this.props.name, this.state.message)}
            </>
          )}
        {this.props.errorDisplayFn &&
          this.state.hasValidationError &&
          this.props.errorDisplayFn(this.props.name, this.state.message)}
      </div>
    );
  }

  renderInput() {
    return <></>;
  }

  async onValueChange(e: SyntheticEvent | any) {
    var inputEvent = e.nativeEvent as InputEvent;
    var value: string | number | boolean | undefined = "";
    var target: any = undefined;
    var deletedFile: FileData | undefined = undefined;
    if (inputEvent) {
      if (inputEvent.target) target = inputEvent.target;
      else if (inputEvent.currentTarget) target = inputEvent.currentTarget;
    } else if (e.target) target = e.target;
    else if (e.currentTarget) target = e.currentTarget;

    var parentData =
      this.props.listener && typeof this.props.listener["getData"] == "function"
        ? this.props.listener?.getData()
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
    if (this.props.onChange)
      this.props.onChange({ name: this.props.name, value, rawValue: e.rawValue });

    var isValid = this.Validate(value);
    if (this.props.listener?.onChangeRequest)
      this.props.listener?.onChangeRequest(
        this.props.valueName ?? this.props.name,
        value,
        isValid,
        this
      );
    if (isValid) {
      if (this.props.listener?.setFileDeleted && deletedFile) {
        deletedFile.KeyName = this.props.name;
        this.props.listener?.setFileDeleted(deletedFile);
      }
      if (this.props.listener?.setFieldData) {
        if(this.props.setDataCallback){
          var tmpVal = this.props.setDataCallback(value)
          if(tmpVal != undefined && tmpVal != null){
            value = tmpVal;
          }
        }
        this.props.listener?.setFieldData(
          this.props.valueName ?? this.props.name,
          value,
          this,
          e.rawValue
        );
      }
    }
    return true;
  }
  Validate = (val: any) => {
    var isEmpty = isNullOrEmpty(val);
    var rule: InputValidationRule | undefined = undefined;
    if (this.props.rules) {
      if (Array.isArray(this.props.rules)) {
        rule = this.props.rules.find(
          (r) =>
            (Array.isArray(r.field) && r.field.indexOf(this.props.name) > -1) ||
            r.field == this.props.name
        );
      } else {
        var tmpRule: any = this.props.rules;
        rule = tmpRule;
      }
    }
    if (!rule) {
      rule = {
        field: this.props.name,
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
        this.props.listener?.translate
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
            _IsValid = _rule(val, this.props.listener?.getData());
          }
          if (!_IsValid) isValid = false;
          if (rule.ruleSatisfaction) rule.ruleSatisfaction(index, _IsValid);
        }
      } else if (rule.rule && typeof rule.rule == "function") {
        isValid = rule.rule(val, this.props.listener?.getData());
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
    if (this.props.listener && this.props.listener.translate)
      msg = this.props.listener.translate(msg);

    if (msg && msg.indexOf("{") > -1 && msg.indexOf("}") > -1) {
      if (!rule.format) rule.format = (val: any) => val;
      if (rule.min)
        msg = msg.replace(
          "{min}",
          rule.format(rule.min, this.props.listener?.translate)
        );
      if (rule.max)
        msg = msg.replace(
          "{max}",
          rule.format(rule.max, this.props.listener?.translate)
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
      this.props.listener && this.props.listener.getFieldData
        ? this.props.listener.getFieldData(this)
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
      type,
      listener,
      onChange,
      value,
      rootStyle,
      errorMessageText = "FieldIsRequired",
      ...others
    }) => others)(this.props);
    var checked = this.props.checked ?? false;
    var value = this.GetValue();
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
    var props: any = {
      ...{
        id: otherProps.name,
        key: `${this.props.languageKey}_${this.props.name}`,
        errorClassName: this.state.hasValidationError
          ? "oph-inputField-inputError"
          : undefined,
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
