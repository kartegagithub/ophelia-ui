import { AppTheme, getAppTheme } from "../../AppTheme";
import React, { ChangeEvent, MouseEventHandler, SelectHTMLAttributes } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { clone, parseFloatIfCan, toJson } from "../../Extensions/StringExtensions";
import { findInArray, selectDefaultValues } from "../../Extensions/ArrayExtensions";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default class Filterbox<P> extends React.Component<P & SelectHTMLAttributes<HTMLSelectElement> & {
  placeholder?: string;
  options?: Array<any>
  defaultValue?: Array<any>
  searchFn?: ((key?: string) => Promise<Array<any> | undefined>)
  low?: number
  high?: number
  displayProp?: string
  valueProp?: string,
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
}, {filteredOptions: Array<any>, selectedOptions: Array<any>, showDropdown: boolean}>{
  HiddenInputRef = React.createRef<HTMLInputElement>()
  SelectionLabelRef = React.createRef<HTMLDivElement>()
  Theme: AppTheme = getAppTheme()

  constructor(props: any){
    super(props)
    var selectedOptions = selectDefaultValues(props.defaultValue, "")
    this.state = {filteredOptions: props.options ?? [], showDropdown: props.dropDownDefaultOpen === true, selectedOptions: selectedOptions}
  }
  
  async onSearch(key?: string): Promise<Array<any> | undefined> {
    if(this.props.searchFn) return this.props.searchFn(key)
    return undefined
  }
  componentDidMount(){
    if(this.props.defaultValue){
      this.setState({filteredOptions: this.props.defaultValue})
      //this.onSelection(this.props.defaultValue)
    }
  }
  onSelection(value?: any, clickedButton?: any){
    if(this.props.applyText && !clickedButton) return

    var selectedOptions = selectDefaultValues(value, "")
    this.setState({selectedOptions: selectedOptions})
    
    if(!this.HiddenInputRef.current) return;
    if(Array.isArray(value)){
      var arr: Array<any> = value.map((item) => parseFloatIfCan(item[this.props.valueProp]) ?? parseFloatIfCan(item))
      if(arr && arr.length > 0) this.HiddenInputRef.current.value = JSON.stringify(arr);
      else this.HiddenInputRef.current.value = "";
    }
    else{
      this.HiddenInputRef.current.value = value[this.props.valueProp] ?? value ?? ""
    }
    if(this.props.onChange) {
      this.props.onChange({value: this.HiddenInputRef.current.value, currentTarget: this.HiddenInputRef.current, bubbles: true} as any);
    }
  }
  getItemDisplayText(item: any){
    return (<div className="relative flex gap-2 w-fit">
      <label>
        {typeof item == "string" && item}
        {typeof item != "string" && item[this.props.displayProp]}
      </label>
      <XMarkIcon onClick={() => this.removeItem(item)} width={12} height={12} className="cursor-pointer"></XMarkIcon>
    </div>)
  }
  removeItem(item: any){
    var findResult = findInArray(this.state.selectedOptions, item, this.props.valueProp);
    if(findResult.index > -1){
      var tmpOptions = clone(this.state.selectedOptions); 
      tmpOptions.splice(findResult.index, 1)
      this.setState({selectedOptions: tmpOptions})
    }
  }
  clear(){
    this.setState({selectedOptions: []})
  }
  toggleDropDown(){
    this.setState({ showDropdown: !this.state.showDropdown})
  }
  getButtons(){
    var buttons = new Array<any>;
    if(this.props.applyText) buttons.push({text: this.props.applyText, icon: this.props.applyIcon, type: "button", className: this.props.applyButtonClassName, hideDropdownOnClick: true})
    if(this.props.resetText) buttons.push({text: this.props.resetText, icon: this.props.resetIcon, type: "reset", className: this.props.resetButtonClassName, hideDropdownOnClick: true})
    return buttons
  }
  render(): React.ReactNode {
    return (
      <>
        <div>
          <input ref={this.HiddenInputRef} type="hidden" name={this.props.name} id={this.props.id} />
            {this.props.hideSelections != true && <div ref={this.SelectionLabelRef} className={`relative ${this.Theme.Inputs?.filterbox}`} onClick={() => this.toggleDropDown()}>
            {this.state.selectedOptions && this.state.selectedOptions.length > 0 && this.state.selectedOptions.map((item) => this.getItemDisplayText(item))}
            {this.props.multipleSelection == true && this.props.allowClear != false && <XMarkIcon onClick={() => this.clear()} width={13} height={13} className="cursor-pointer absolute right-1 top-1"></XMarkIcon>}
          </div>}
          <div className="relative">
            <Dropdown
              theme={{ Class: this.props.shownInDropdown == true ? this.Theme.Dropdown?.ClassWhenInner: this.Theme.Dropdown?.Class }}
              enableSearch={true} 
              buttons={this.getButtons()}
              onSearch={(key) => this.onSearch(key)}
              onSelectionChange={(value, button) => this.onSelection(value, button)}
              visible={this.state.showDropdown}
              options={this.state.filteredOptions} 
              defaultValue={this.state.selectedOptions}
              displayProp={this.props.displayProp}
              valueProp={this.props.valueProp}
              searchPlaceholder={this.props.searchPlaceholder}
              multipleSelection={this.props.multipleSelection ?? true} />
          </div>
          </div>
      </>
    );
  }
}