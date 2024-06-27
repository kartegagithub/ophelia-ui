import BaseField from "./baseField";
import { AgreementCheckboxInput } from "../Inputs";
export default class AgreementCheckboxField<P> extends BaseField<P>{
    renderInput(){
        return <AgreementCheckboxInput {...this.GetProps()} />;
    }
  }