/// <reference types="react" />
import BaseField from "./baseField";
export default class DropdownFilterboxField<P> extends BaseField<P & {
    name: string;
    text?: string;
    value?: string;
    placeholder?: string;
    remoteDataSource?: {
        DisplayProp?: string;
        ValueProp?: string;
        CallFunction: (input: string, page: number, pageSize: number) => Promise<any>;
    };
    displayProp?: string;
    valueProp?: string;
    listener?: any;
    multiple?: boolean;
    allowClear?: boolean;
    hideSelections?: boolean;
    dropDownDefaultOpen?: boolean;
}> {
    constructor(props: any);
    Searching: boolean;
    onSearch: (input?: string) => Promise<any>;
    renderInput(): import("react").JSX.Element;
}
