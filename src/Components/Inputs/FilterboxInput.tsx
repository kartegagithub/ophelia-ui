import { AppTheme, getAppTheme } from "../../AppTheme";
import React, { ChangeEvent, MouseEventHandler, SelectHTMLAttributes } from "react";
import Dropdown, { DropdownTheme } from "../Dropdown";
import { clone, parseFloatIfCan, toJson } from "../../Extensions/StringExtensions";
import { findInArray, removeAtIndex, selectDefaultValues } from "../../Extensions/ArrayExtensions";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { getObjectValue } from "../../Extensions";
import TextInput from "./TextInput";

export default class FilterboxInput<P> extends React.Component<P & SelectHTMLAttributes<HTMLSelectElement> & {
  placeholder?: string;
  options?: Array<any>
  className?: string
  defaultValue?: Array<any>
  searchFn?: ((key?: string, page?: number) => Promise<Array<any> | undefined>)
  low?: number
  high?: number
  displayProp?: string
  valueProp?: string,
  dropDownDisplayProp?: string
  dropDownValueProp?: string,
  valueName?: string,
  searchPlaceholder?: string, 
  multipleSelection?: boolean,
  dropDownDefaultOpen?: boolean,
  applyText?: string
  resetText?: string
  applyButtonClassName?: string
  resetButtonClassName?: string
  applyIcon?: string | React.JSX.Element
  resetIcon?: string | React.JSX.Element
  allowClear?: boolean
  hideSelections?: boolean
  shownInDropdown?: boolean
  allowNew?: boolean;
  newTextInputClassName?: string;
  newTextInputPlaceholder?: string;
  onNewAction?: (text: string) => Promise<void>,
  dropdownTheme?: DropdownTheme,
  alwaysOpen?: boolean
}, {filteredOptions: Array<any>, selectedOptions: Array<any>, showDropdown: boolean, refreshSearchList: boolean}>{
  HiddenInputRef = React.createRef<HTMLInputElement>()
  SelectionLabelRef = React.createRef<HTMLDivElement>()
  Theme: AppTheme = getAppTheme()
  RootRef = React.createRef<HTMLDivElement>()

  constructor(props: any){
    super(props)
    var selectedOptions = selectDefaultValues(props.defaultValue, "")
    this.state = {filteredOptions: props.options ?? [], refreshSearchList: false, showDropdown: props.dropDownDefaultOpen === true, selectedOptions: selectedOptions}
  }
  
  async onSearch(key?: string, page: number = 1): Promise<Array<any> | undefined> {
    if(this.props.searchFn) return this.props.searchFn(key, page)
    return undefined
  }
  mouseDown = (inbound: boolean) => {
    if(this.state.showDropdown && !inbound) this.setState({ showDropdown: false})
  }
  componentDidMount(){
    if(this.props.defaultValue){
      this.setState({filteredOptions: this.props.defaultValue})
      this.setHiddenInputValue(this.props.defaultValue)
    }
  }
  componentWillUnmount(){

  }
  onSelection(value?: any, clickedButton?: any){
    if(this.props.applyText && !clickedButton) return
    if(!this.HiddenInputRef.current) return;

    this.setHiddenInputValue(value);
    if(this.props.onChange) {
      this.props.onChange({rawValue: value, value: this.HiddenInputRef.current.value, target: this.HiddenInputRef.current, bubbles: true} as any);
    }
  }
  setHiddenInputValue(value: any){
    var selectedOptions = selectDefaultValues(value, "")
    this.setState({selectedOptions: selectedOptions})
    
    if(!this.HiddenInputRef.current) return;
    if(Array.isArray(value)){
      var arr: Array<any> = value.map((item) => parseFloatIfCan(getObjectValue(item, this.props.valueProp)) ?? parseFloatIfCan(item))
      if(arr && arr.length > 0) {
        if(this.props.multipleSelection == false)
          this.HiddenInputRef.current.value = arr[0];
        else
          this.HiddenInputRef.current.value = JSON.stringify(arr);
      }
      else this.HiddenInputRef.current.value = "";
    }
    else{
      this.HiddenInputRef.current.value = getObjectValue(value, this.props.valueProp) ?? value ?? ""
    }
  }
  getItemDisplayText(item: any, i: number){
    return (<div className="relative flex gap-2 w-fit" key={i}>
      <label>
        {typeof item == "string" && item}
        {typeof item != "string" && getObjectValue(item, this.props.displayProp)}
      </label>
      <XMarkIcon onClick={() => this.removeItem(item)} width={12} height={12} className="cursor-pointer"></XMarkIcon>
    </div>)
  }
  getEmptyDisplayText(){
    return (<div className="relative flex gap-2 w-fit" key={-1}>
      <label>{this.props.placeholder ?? "Select"}</label>
    </div>)
  }
  removeItem(item: any){
    var findResult = findInArray(this.state.selectedOptions, item, this.props.valueProp);
    if(findResult.index > -1){
      var tmpOptions = clone(this.state.selectedOptions);
      removeAtIndex(tmpOptions, findResult.index)
      this.setState({selectedOptions: tmpOptions})
      this.onSelection(tmpOptions)
    }
  }
  clear(){
    this.setState({selectedOptions: []})
  }
  toggleDropDown(){
      this.setState({ showDropdown: !this.state.showDropdown})
  }
  getButtons(){
    var buttons = new Array<any>();
    if(this.props.applyText) buttons.push({text: this.props.applyText, icon: this.props.applyIcon, type: "button", className: this.props.applyButtonClassName, hideDropdownOnClick: true})
    if(this.props.resetText) buttons.push({text: this.props.resetText, icon: this.props.resetIcon, type: "reset", className: this.props.resetButtonClassName, hideDropdownOnClick: true})
    return buttons
  }
  async newTextInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>){
    if(e.key == "Enter"){
      var target: any = e.currentTarget ?? e.target
      if(target && target.value){
        if(this.props.onNewAction) await this.props.onNewAction(target.value)
        target.value = "";
        this.setState({refreshSearchList: true})
        setTimeout(() => {
          target.focus();
        }, 300);
      }
    }
    else{
      this.setState({refreshSearchList: false})
    }
  }
  render(): React.ReactNode {
    
    var _dropdownTheme: DropdownTheme = {
      ...{ Class: this.props.shownInDropdown == true ? this.Theme.Dropdown?.ClassWhenInner: this.Theme.Dropdown?.Class },
      ...this.props.dropdownTheme  
    }
    return (
      <>
        <div ref={this.RootRef}>
          <input ref={this.HiddenInputRef} type="hidden" name={this.props.valueName ?? this.props.name} id={this.props.valueName ?? this.props.name} />
            {this.props.hideSelections != true && <div ref={this.SelectionLabelRef} className={`relative ${this.props.className ?? this.Theme.Inputs?.filterbox}`} onClick={() => this.toggleDropDown()}>
            {this.state.selectedOptions && this.state.selectedOptions.length > 0 && this.state.selectedOptions.map((item, i) => this.getItemDisplayText(item, i))}
            {(!this.state.selectedOptions || this.state.selectedOptions.length == 0) && this.getEmptyDisplayText()}
            {this.props.multipleSelection == true && this.props.allowClear != false && <XMarkIcon onClick={() => this.clear()} width={13} height={13} className="cursor-pointer absolute right-1 top-1"></XMarkIcon>}
          </div>}
          <div className="relative">
            <Dropdown
              alwaysOpen={this.props.alwaysOpen}
              key={`${this.props.id}${this.props.name}-dropdown`}
              theme={_dropdownTheme}
              enableSearch={true} 
              buttons={this.getButtons()}
              onSearch={(key, page) => this.onSearch(key, page)}
              onSelectionChange={(value, button) => this.onSelection(value, button)}
              visible={this.state.showDropdown}
              options={this.state.filteredOptions} 
              defaultValue={this.state.selectedOptions}
              displayProp={this.props.dropDownDisplayProp}
              valueProp={this.props.dropDownValueProp}
              selectedItemDisplayProp={this.props.displayProp}
              selectedItemValueProp={this.props.valueProp}
              searchPlaceholder={this.props.searchPlaceholder}
              refreshSearchList={this.state.refreshSearchList}
              multipleSelection={this.props.multipleSelection ?? false}
              handleOutboundClick={true}
              listHeight="h-[200px]">
                {this.props.allowNew == true && <div className="p-2" key={`${this.props.name}_new_item`}>
                  <TextInput className={this.props.newTextInputClassName} placeholder={this.props.newTextInputPlaceholder} onKeyDown={(e) => this.newTextInputKeyDown(e)}/>
                </div>}
              </Dropdown>
          </div>
        </div>
      </>
    );
  }
}