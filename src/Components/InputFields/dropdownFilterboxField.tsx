import FilterboxInput from "../Inputs/FilterboxInput";
import BaseField from "./baseField";
export default class DropdownFilterboxField<P> extends BaseField<
  P & {
    name: string;
    valueName?: string;
    text?: string;
    value?: string;
    placeholder?: string;
    allowNew?: boolean;
    newTextInputClassName?: string;
    newTextInputPlaceholder?: string;
    remoteDataSource?: {
      ExtraFilters?: any;
      DisplayProp?: string;
      ValueProp?: string;
      Hooks?: any;
      CallFunction: (
        input: string,
        page: number,
        pageSize: number,
        extraFilters?: any
      ) => Promise<any>;
    };
    displayProp?: string;
    valueProp?: string;
    displayFn?: (item: any) => React.JSX.Element
    listener?: any;
    multiple?: boolean;
    allowClear?: boolean;
    hideSelections?: boolean;
    dropDownDefaultOpen?: boolean;
    selectAllOptions?: boolean;
    selectAllOptionsTitle?: string;
    optionTemplateFn?: (item: any) => React.JSX.Element;
    getCollectionBinder?: (listener: any) => React.ReactNode
  }
> {
  constructor(props: any) {
    super(props);
  }
  Searching: boolean = false;
  onSearch = (input?: string, page: number = 1, pageSize: number = 10) => {
    if (
      !this.Searching &&
      this.props.remoteDataSource &&
      this.props.remoteDataSource.CallFunction
    ) {
      this.Searching = true;
      var data = this.props.remoteDataSource.CallFunction(
        input ?? "",
        page,
        pageSize,
        this.props.remoteDataSource.ExtraFilters
      );
      this.Searching = false;
      return data;
    }
    return undefined;
  };
  renderInput() {
    var props = this.GetProps();
    var pureProps = (({
      value,
      defaultValue,
      displayProp,
      valueProp,
      remoteDataSource,
      ...others
    }) => others)(props);
    return (
      <FilterboxInput
        hooks={this.props.remoteDataSource?.Hooks}
        alwaysOpen={this.props.dropDownDefaultOpen}
        hideSelections={this.props.hideSelections}
        optionTemplateFn={this.props.optionTemplateFn}
        getCollectionBinder={this.props.getCollectionBinder}
        displayFn={this.props.disabledFn}
        displayProp={
          this.props.displayProp ??
          this.props.remoteDataSource?.DisplayProp ??
          "name"
        }
        valueProp={
          this.props.valueProp ?? this.props.remoteDataSource?.ValueProp ?? "id"
        }
        dropDownDisplayProp={
          this.props.remoteDataSource?.DisplayProp ??
          this.props.displayProp ??
          "name"
        }
        dropDownValueProp={
          this.props.remoteDataSource?.ValueProp ?? this.props.valueProp ?? "id"
        }
        {...pureProps}
        searchFn={(key, page, pageSize) => this.onSearch(key, page, pageSize)}
        options={[]}
        defaultValue={props.defaultValue}
        
        dropDownDefaultOpen={this.props.dropDownDefaultOpen}
      />
    );
  }
}
