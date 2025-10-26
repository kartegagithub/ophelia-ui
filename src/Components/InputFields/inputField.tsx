import NumericField from "./numericField";
import DateField from "./dateField";
import BoolField from "./boolField";
import EnumSelectBoxField from "./enumSelectBoxField";
import TextField from "./textField";
import DropdownField from "./dropdownField";
import PasswordField from "./passwordField";
import LabelField from "./labelField";
import TextAreaField from "./textAreaField";
import RichTextField from "./richTextField";
import EmailField from "./emailField";
import PhoneField from "./phoneField";
import WeekField from "./weekField";
import MonthField from "./monthField";
import URLField from "./urlField";
import TimeField from "./timeField";
import FileField from "./fileField";
import DateTimeField from "./dateTimeField";
import RangeField from "./rangeField";
import ImageField from "./imageField";
import DropdownFilterboxField from "./dropdownFilterboxField";
import ColorField from "./colorField";
import CodeField from "./codeField";
import RadioField from "./radioField";
import AgreementCheckboxField from "./agreementCheckboxField";
import TimeRangeField from "./timeRangeField";
import DateRangeField from "./dateRangeField";

const InputField: React.FC<any> = (props) => {
  const {
    allowEdit,
    translateFn,
    remoteDataSource,
    enumSelectionType,
    key,
    ...pureProps
  } = props;
  if (props.allowEdit === false || props.type === "label")
    return <LabelField key={key} {...pureProps} />;
  return (
    <>
      {props.type === "numeric" && <NumericField key={key} {...pureProps} />}
      {props.type === "withCode" && <CodeField key={key} {...pureProps} />}
      {props.type === "date" && <DateField key={key} {...pureProps} />}
      {props.type === "time" && <TimeField key={key} {...pureProps} />}
      {props.type === "timerange" && <TimeRangeField key={key} {...pureProps} />}
      {props.type === "daterange" && <DateRangeField key={key} {...pureProps} />}
      {props.type === "agreementCheckbox" && (
        <AgreementCheckboxField key={key} {...pureProps} />
      )}
      {props.type === "datetime" && <DateTimeField key={key} {...pureProps} />}
      {(props.type === "checkbox" || props.type === "boolean") && (
        <BoolField key={key} {...pureProps} />
      )}
      {(props.type === "object" || props.type === "filterbox") && (
        <DropdownFilterboxField
          key={key}
          remoteDataSource={remoteDataSource}
          {...pureProps}
        />
      )}
      {props.type === "enum" && (
        <EnumSelectBoxField
          key={key}
          enumSelectionType={enumSelectionType}
          translateFn={props.translateFn}
          {...pureProps}
        />
      )}
      {props.type === "radio" && <RadioField key={key} {...pureProps} />}
      {props.type === "selectbox" && <DropdownField key={key} {...pureProps} />}
      {props.type === "password" && <PasswordField key={key} {...pureProps} />}
      {props.type === "text" && (
        <TextField key={key} value={props.value} isDate={props.isDate} {...pureProps} />
      )}
      {props.type === "richtext" && <RichTextField key={key} {...pureProps} />}
      {props.type === "textarea" && <TextAreaField key={key} {...pureProps} />}
      {props.type === "email" && <EmailField key={key} {...pureProps} />}
      {props.type === "color" && <ColorField key={key} {...pureProps} />}
      {(props.type === "phone" || props.type === "tel") && (
        <PhoneField key={key} {...pureProps} />
      )}
      {props.type === "week" && <WeekField key={key} {...pureProps} />}
      {props.type === "month" && <MonthField key={key} {...pureProps} />}
      {props.type === "url" && <URLField key={key} {...pureProps} />}
      {props.type === "file" && <FileField key={key} {...pureProps} />}
      {props.type === "range" && <RangeField key={key} {...pureProps} />}
      {props.type === "image" && <ImageField key={key} {...pureProps} />}
    </>
  );
};

InputField.displayName = "InputField";

export default InputField;
