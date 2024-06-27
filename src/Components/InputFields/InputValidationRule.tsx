export default class InputValidationRule {
  field: string | string[] = "";
  rule?: RegExp | Array<RegExp | ((val?: any, formData?: any) => boolean)> | ((val?: any, formData?: any) => boolean);
  max?: number | Date
  min?: number | Date
  message?: string | ((val?: any, max?: number | Date, min?: number | Date, translateFn?: (key: string) => string) => string);
  messageDisplayFn?: Function;
  format?: (value?: any, translateFn?: (key: string) => string) => string;
  ruleSatisfaction?: (index: number, satisfied: boolean) => void
}
