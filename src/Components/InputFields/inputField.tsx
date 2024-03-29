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

const InputField = (props: any) => {
    if(props.visible){
      if(props.visible === false) return <></>
      if(typeof props.visible == "function"){
        var visible = props.visible()
        if(!visible) return <></>
      }
    }
    const {allowEdit, ...pureProps} = props  
    if(props.allowEdit === false || props.type === "label") return  <LabelField {...pureProps} />
    return (
      <>
        {props.type === "numeric" && <NumericField {...pureProps} />}
        {props.type === "date" && <DateField {...pureProps} />}
        {props.type === "time" && <TimeField {...pureProps} />}
        {props.type === "datetime" && <DateTimeField {...pureProps} />}
        {(props.type === "checkbox" || props.type === "boolean") && <BoolField {...pureProps} />}
        {props.type === "radio" && <BoolField {...pureProps} />}
        {(props.type === "object" || props.type === "filterbox") && <DropdownFilterboxField {...pureProps} />}
        {props.type === "enum" && <EnumSelectBoxField translateFn={props.translateFn} {...pureProps} />}
        {props.type === "selectbox" && <DropdownField {...pureProps} />}
        {props.type === "password" && <PasswordField {...pureProps} />}
        {props.type === "text" && <TextField {...pureProps} />}
        {props.type === "richtext" && <RichTextField {...pureProps} />}
        {props.type === "textarea" && <TextAreaField {...pureProps} />}
        {props.type === "email" && <EmailField {...pureProps} />}
        {(props.type === "phone" || props.type === "tel") && <PhoneField {...pureProps} />}
        {props.type === "week" && <WeekField {...pureProps} />}
        {props.type === "month" && <MonthField {...pureProps} />}
        {props.type === "url" && <URLField {...pureProps} />}
        {props.type === "file" && <FileField {...pureProps} />}
        {props.type === "range" && <RangeField {...pureProps} />}
        {props.type === "image" && <ImageField {...pureProps} />}
    </>)
};

export default InputField;
