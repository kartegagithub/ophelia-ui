import { AppTheme } from "../../AppTheme";
import React, { SelectHTMLAttributes } from "react";
export default class FilterboxInput<P> extends React.Component<P & SelectHTMLAttributes<HTMLSelectElement> & {
    placeholder?: string;
    options?: Array<any>;
    defaultValue?: Array<any>;
    searchFn?: ((key?: string) => Promise<Array<any> | undefined>);
    low?: number;
    high?: number;
    displayProp?: string;
    valueProp?: string;
    searchPlaceholder?: string;
    multipleSelection?: boolean;
    dropDownDefaultOpen?: boolean;
    applyText?: string;
    resetText?: string;
    applyButtonClassName?: string;
    resetButtonClassName?: string;
    applyIcon?: string | React.JSX.Element;
    resetIcon?: string | React.JSX.Element;
    allowClear?: boolean;
    hideSelections?: boolean;
    shownInDropdown?: boolean;
}, {
    filteredOptions: Array<any>;
    selectedOptions: Array<any>;
    showDropdown: boolean;
}> {
    HiddenInputRef: React.RefObject<HTMLInputElement>;
    SelectionLabelRef: React.RefObject<HTMLDivElement>;
    Theme: AppTheme;
    constructor(props: any);
    onSearch(key?: string): Promise<Array<any> | undefined>;
    componentDidMount(): void;
    onSelection(value?: any, clickedButton?: any): void;
    getItemDisplayText(item: any): React.JSX.Element;
    removeItem(item: any): void;
    clear(): void;
    toggleDropDown(): void;
    getButtons(): any[];
    render(): React.ReactNode;
}
