import { AppTheme, getAppTheme } from "../../AppTheme";
import React, { SelectHTMLAttributes } from "react";
import { createPortal } from "react-dom";
import Dropdown from "../Dropdown";
import {
  clone,
  formatString,
  parseFloatIfCan,
} from "ophelia-core";
import {
  findInArray,
  removeAtIndex,
  selectDefaultValues,
} from "ophelia-core";
import {
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { getObjectValue, randomKey } from "ophelia-core";
import TextInput from "./TextInput";
import Link from "next/link";
import Icon from "../Icon";
export default class FilterboxInput<P> extends React.Component<
  P &
    SelectHTMLAttributes<HTMLSelectElement> & {
      placeholder?: string;
      options?: Array<any>;
      className?: string;
      defaultValue?: Array<any>;
      searchFn?: (
        key?: string,
        page?: number,
        pageSize?: number
      ) => Promise<Array<any> | undefined>;
      low?: number;
      high?: number;
      displayProp?: string;
      valueProp?: string;
      displayFn?: (item: any) => React.JSX.Element;
      dropDownDisplayProp?: string;
      dropDownValueProp?: string;
      valueName?: string;
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
      allowNew?: boolean;
      enableSearch?: boolean;
      allowSorting?: boolean;
      selectedOptionDetailUrlPattern?: string | ((item: any) => string);
      newTextInputPlaceholder?: string;
      onNewAction?: (text: string) => Promise<void>;
      hooks?: any;
      id?: string;
      alwaysOpen?: boolean;
      refreshOnOpen?: boolean;
      getCollectionBinder?: (listener: any) => React.ReactNode;
      selectAllOptions?: boolean;
      selectAllOptionsTitle?: string;
      optionTemplateFn?: (item: any) => React.JSX.Element;
      usePortal?: boolean;
    },
  {
    filteredOptions: Array<any>;
    selectedOptions: Array<any>;
    showDropdown: boolean;
    refreshSearchList: boolean;
    refreshKey?: string;
    id?: string;
    dropdownPosition: { top: number; left: number; width: number };
  }
> {
  HiddenInputRef = React.createRef<HTMLInputElement>();
  SelectionLabelRef = React.createRef<HTMLDivElement>();
  Theme: AppTheme = getAppTheme();
  RootRef = React.createRef<HTMLDivElement>();

  constructor(props: any) {
    super(props);
    var selectedOptions = selectDefaultValues(props.defaultValue, "");
    this.state = {
      filteredOptions: props.options ?? [],
      refreshSearchList: false,
      showDropdown: props.dropDownDefaultOpen === true,
      selectedOptions: selectedOptions,
      dropdownPosition: { top: 0, left: 0, width: 0 },
    };
  }
  updateDropdownPosition = () => {
    if (this.RootRef.current) {
      const rect = this.RootRef.current.getBoundingClientRect();
      let top = rect.bottom + window.scrollY;
      let left = rect.left + window.scrollX;

      const newPosition = {
        top,
        left,
        width: rect.width,
      };

      const { dropdownPosition } = this.state;

      if (
        dropdownPosition.top !== newPosition.top ||
        dropdownPosition.left !== newPosition.left ||
        dropdownPosition.width !== newPosition.width
      ) {
        this.setState({
          dropdownPosition: newPosition,
        });
      }
    }
  };

  async onSearch(
    key?: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<Array<any> | undefined> {
    if (this.props.searchFn) return this.props.searchFn(key, page, pageSize);
    return undefined;
  }
  mouseDown = (inbound: boolean) => {
    if (this.state.showDropdown && !inbound)
      this.setState({ showDropdown: false });
  };
  componentDidMount() {
    if (this.props.defaultValue) {
      this.setState({ filteredOptions: this.props.defaultValue });
      this.setHiddenInputValue(this.props.defaultValue);
    }
    window.addEventListener("scroll", this.updateDropdownPosition, true);
    window.addEventListener("resize", this.updateDropdownPosition);
  }
  componentDidUpdate(
    prevProps: Readonly<any>,
    prevState: Readonly<any>,
    snapshot?: any
  ): void {
    if (prevProps && prevProps.defaultValue != this.props.defaultValue) {
      if (this.props.defaultValue)
        this.setState({ filteredOptions: this.props.defaultValue });
      else this.setState({ filteredOptions: [] });
      this.setHiddenInputValue(this.props.defaultValue);
    }
    // Update dropdown position if dropdown is visible
    if (this.state.showDropdown) {
      this.updateDropdownPosition();
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateDropdownPosition, true);
    window.removeEventListener("resize", this.updateDropdownPosition);
  }
  onSelection(value?: any, clickedButton?: any) {
    if (this.props.applyText && !clickedButton) return;
    if (!this.HiddenInputRef.current) return;

    this.setHiddenInputValue(value);
    if (this.props.onChange) {
      this.props.onChange({
        rawValue: value,
        value: this.HiddenInputRef.current.value,
        target: this.HiddenInputRef.current,
        bubbles: true,
      } as any);
    }
  }
  setHiddenInputValue(value: any) {
    var selectedOptions = selectDefaultValues(value, "");
    this.setState({ selectedOptions: selectedOptions });

    if (!this.HiddenInputRef.current) return;
    if (Array.isArray(value)) {
      var arr: Array<any> = value.map((item) => {
        if (
          typeof item == "bigint" ||
          typeof item == "boolean" ||
          typeof item == "number"
        )
          return item;

        var convertedValue: any;
        if (typeof item == "string") {
          convertedValue = parseFloatIfCan(item);
          if (convertedValue == -1) return item;
          return convertedValue;
        }

        if (typeof item == "object") {
          convertedValue = parseFloatIfCan(
            getObjectValue(item, this.props.valueProp)
          );
          if (convertedValue == -1)
            convertedValue = getObjectValue(item, this.props.valueProp);
        }

        if (convertedValue == -1) return item;
        else return convertedValue;
      });
      if (arr && arr.length > 0) {
        if (this.props.multipleSelection == false)
          this.HiddenInputRef.current.value = arr[0];
        else this.HiddenInputRef.current.value = JSON.stringify(arr);
      } else this.HiddenInputRef.current.value = "";
    } else {
      this.HiddenInputRef.current.value =
        getObjectValue(value, this.props.valueProp) ?? value ?? "";
    }
  }
  getSelectedOptionDetailUrl(item: any) {
    if (typeof this.props.selectedOptionDetailUrlPattern == "string")
      return formatString(
        this.props.selectedOptionDetailUrlPattern,
        getObjectValue(item, this.props.valueProp)
      );
    else if (typeof this.props.selectedOptionDetailUrlPattern == "function")
      return this.props.selectedOptionDetailUrlPattern(item);
    return "";
  }
  getItemDisplayText(item: any, i: number) {
    this.props.hooks?.onItemDisplayText?.(item, i);
    var displayComponent: string | React.JSX.Element = "";
    if (typeof item == "string") displayComponent = item;
    else if (typeof item != "string" && !this.props.displayFn)
      displayComponent = getObjectValue(item, this.props.displayProp);
    else if (item != "string" && this.props.displayFn)
      displayComponent = this.props.displayFn(item);

    return (
      <div
        className="oph-filterboxInput-display"
        key={i}
        style={{
          cursor:
            this.props.allowSorting != false &&
            this.props.multipleSelection == true
              ? "move"
              : "default",
        }}
        draggable={true}
        onDragEnd={(e) => this.onDragEnd(e)}
        onDragStart={(e) => this.onDrag(e, item, i)}
        aria-colindex={i}
      >
        <label
          style={{
            cursor:
              this.props.allowSorting != false &&
              this.props.multipleSelection == true
                ? "move"
                : "default",
          }}
        >
          {displayComponent}
        </label>
        {this.props.disabled != true && (
          <XMarkIcon
            onClick={() => this.removeItem(item)}
            width={12}
            height={12}
            className="oph-filterboxInput-display-icon"
          ></XMarkIcon>
        )}
        {this.props.selectedOptionDetailUrlPattern && (
          <Link
            className="oph-filterboxInput-display-url"
            href={this.getSelectedOptionDetailUrl(item)}
            target="_blank"
          >
            <ArrowTopRightOnSquareIcon
              width={12}
              height={12}
            ></ArrowTopRightOnSquareIcon>
          </Link>
        )}
      </div>
    );
  }
  getEmptyDisplayText() {
    return (
      <div className="oph-filterboxInput-display-empty" key={-1}>
        <label>{this.props.placeholder ?? "Select"}</label>
      </div>
    );
  }
  removeItem(item: any) {
    this.props.hooks?.onItemRemove?.(item);
    var findResult = findInArray(
      this.state.selectedOptions,
      item,
      this.props.valueProp
    );
    if (findResult.index > -1) {
      var tmpOptions = clone(this.state.selectedOptions);
      removeAtIndex(tmpOptions, findResult.index);
      this.setState({ selectedOptions: tmpOptions });
      this.onSelection(tmpOptions);
    }
  }
  clear() {
    this.setState({ selectedOptions: [] });
  }
  toggleDropDown() {
    this.setState({ showDropdown: !this.state.showDropdown }, () => {
      if (!this.state.showDropdown) return;
      this.updateDropdownPosition();
    });
  }
  onDrop(e: React.DragEvent<HTMLDivElement>) {
    if (this.props.multipleSelection != true) return;
    e.preventDefault();
    var elem = document.querySelectorAll(`.dragging`)[0] as HTMLDivElement;
    elem.classList.remove("dragging");
    if (elem.parentNode != this.SelectionLabelRef.current) return;
    var indexedItem =
      this.state.selectedOptions[parseInt(elem.ariaColIndex ?? "-1")];
    if (indexedItem) {
      var newOptions: Array<any> = [];
      var itemInjected = false;
      for (let i = 0; i < this.state.selectedOptions.length; i++) {
        if (i == parseInt(elem.ariaColIndex ?? "-1")) continue;

        const element = this.state.selectedOptions[i];
        var tmpElems = document.querySelectorAll(`[aria-colindex='${i}']`);
        for (let elemIndex = 0; elemIndex < tmpElems.length; elemIndex++) {
          const tmpElem = tmpElems[elemIndex];
          if (tmpElem.parentNode == elem.parentNode) {
            if (
              tmpElem.getBoundingClientRect().left +
                tmpElem.getBoundingClientRect().width / 2 <
              e.clientX
            ) {
              newOptions.push(element);
            } else {
              if (!itemInjected) {
                newOptions.push(indexedItem);
                itemInjected = true;
              }
              newOptions.push(element);
            }
            break;
          }
        }
      }
      if (!itemInjected) newOptions.push(indexedItem);
      this.setState({ selectedOptions: newOptions });
      this.onSelection(newOptions);
    }
    //(e.target as HTMLDivElement).appendChild(document.querySelectorAll("aria-col"));
  }
  onDragOver(e: React.DragEvent<HTMLDivElement>) {
    if (this.props.multipleSelection != true) return;
    e.preventDefault();
  }
  onDrag(e: React.DragEvent<HTMLDivElement>, item: any, index: number) {
    if (this.props.multipleSelection != true) return;
    e.currentTarget.classList.add("dragging");
  }
  onDragEnd(e: React.DragEvent<HTMLDivElement>) {
    if (this.props.multipleSelection != true) return;
    e.currentTarget.classList.remove("dragging");
  }
  getButtons() {
    var buttons = new Array<any>();
    if (this.props.applyText)
      buttons.push({
        text: this.props.applyText,
        icon: this.props.applyIcon,
        type: "button",
        className: this.props.applyButtonClassName,
        hideDropdownOnClick: true,
      });
    if (this.props.resetText)
      buttons.push({
        text: this.props.resetText,
        icon: this.props.resetIcon,
        type: "reset",
        className: this.props.resetButtonClassName,
        hideDropdownOnClick: true,
      });
    return buttons;
  }
  async newTextInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter") {
      var target: any = e.currentTarget ?? e.target;
      if (target && target.value) {
        if (this.props.onNewAction) await this.props.onNewAction(target.value);
        target.value = "";
        this.setState({ refreshSearchList: true, refreshKey: randomKey(5) });
        setTimeout(() => {
          target.focus();
          this.setState({ refreshSearchList: false, refreshKey: undefined });
        }, 300);
      }
    } else {
      this.setState({ refreshSearchList: false });
    }
  }
  render(): React.ReactNode {
    var _dropdownTheme =
      this.props.shownInDropdown == true
        ? "filterBoxDropdownInner" //"filterBoxDropdownInner"
        : "filterBoxDropdown"; //"filterBoxDropdown"

    return (
      <>
        <div
          id={this.props?.id}
          ref={this.RootRef}
          className={`oph-filterboxInput ${
            this.props.disabled == true ? "disabled" : ""
          }`}
          onDrop={(e) => this.onDrop(e)}
          onDragOver={(e) => this.onDragOver(e)}
        >
          <input
            ref={this.HiddenInputRef}
            type="hidden"
            name={this.props.valueName ?? this.props.name}
            id={this.props.valueName ?? this.props.name}
          />
          {this.props.hideSelections != true && (
            <div
              ref={this.SelectionLabelRef}
              className="oph-filterboxInput-box"
              onClick={() => this.toggleDropDown()}
            >
              <Icon
                name={this.state.showDropdown ? "arrow-up" : "arrow-down"}
                size={16}
                className="oph-filterboxInput-box-arrow"
              />
              {this.state.selectedOptions &&
                this.state.selectedOptions.length > 0 &&
                this.state.selectedOptions.map((item, i) =>
                  this.getItemDisplayText(item, i)
                )}
              {(!this.state.selectedOptions ||
                this.state.selectedOptions.length == 0) &&
                this.getEmptyDisplayText()}
              {this.props.multipleSelection == true &&
                // this.props.allowClear != false && ( // kullanıcı allowclear derse hepsini silebilsin
                this.props.allowClear &&
                this.props.disabled != true &&
                this.state.selectedOptions?.length > 0 && (
                  <XMarkIcon
                    onClick={() => this.clear()}
                    width={13}
                    height={13}
                    className="oph-filterboxInput-box-icon"
                  ></XMarkIcon>
                )}
            </div>
          )}
          {this.props.disabled !== true &&
            this.state.showDropdown &&
            (this.props.usePortal === true ? (
              createPortal(
                <div
                  className="oph-filterboxInput-dropdown z-[9999] absolute"
                  style={{
                    position: "absolute",
                    top: this.state.dropdownPosition.top,
                    left: this.state.dropdownPosition.left,
                    width: this.state.dropdownPosition.width,
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <Dropdown
                    key={`${this.props.id}${this.props.name}-dropdown`}
                    alwaysOpen={this.props.alwaysOpen}
                    optionTemplateFn={this.props.optionTemplateFn}
                    id={_dropdownTheme as string}
                    enableSearch={this.props.enableSearch != false}
                    buttons={this.getButtons()}
                    onSearch={(key, page, pageSize) =>
                      this.onSearch(key, page, pageSize)
                    }
                    onSelectionChange={(value, button) =>
                      this.onSelection(value, button)
                    }
                    visibilityCallback={(open) => {
                      this.setState({ showDropdown: open }, () => {
                        if (open) this.updateDropdownPosition();
                      });
                    }}
                    visible={this.state.showDropdown}
                    options={this.state.filteredOptions}
                    defaultValue={this.state.selectedOptions}
                    displayProp={this.props.dropDownDisplayProp}
                    valueProp={this.props.dropDownValueProp}
                    selectedItemDisplayProp={this.props.displayProp}
                    selectedItemValueProp={this.props.valueProp}
                    searchPlaceholder={this.props.searchPlaceholder}
                    getCollectionBinder={this.props.getCollectionBinder}
                    refreshSearchList={
                      this.props.refreshOnOpen != false ||
                      this.state.refreshSearchList
                    }
                    multipleSelection={this.props.multipleSelection ?? false}
                    refreshKey={this.state.refreshKey}
                    handleOutboundClick={true}
                    selectAllOptions={this.props.selectAllOptions}
                    selectAllOptionsTitle={this.props.selectAllOptionsTitle}
                  >
                    {this.props.allowNew == true && (
                      <div
                        className="oph-filterboxInput-dropdown-allowNew"
                        key={`${this.props.name}_new_item`}
                      >
                        <TextInput
                          className="oph-filterboxInput-dropdown-allowNew-input"
                          placeholder={this.props.newTextInputPlaceholder}
                          onKeyDown={(e) => this.newTextInputKeyDown(e)}
                        />
                      </div>
                    )}
                  </Dropdown>
                </div>,
                document.body
              )
            ) : (
              <div className="oph-filterboxInput-dropdown">
                <Dropdown
                  key={`${this.props.id}${this.props.name}-dropdown`}
                  alwaysOpen={this.props.alwaysOpen}
                  optionTemplateFn={this.props.optionTemplateFn}
                  id={_dropdownTheme as string}
                  enableSearch={this.props.enableSearch != false}
                  buttons={this.getButtons()}
                  onSearch={(key, page, pageSize) =>
                    this.onSearch(key, page, pageSize)
                  }
                  onSelectionChange={(value, button) =>
                    this.onSelection(value, button)
                  }
                  visibilityCallback={(open) => {
                    this.setState({ showDropdown: open }, () => {
                      if (open) this.updateDropdownPosition();
                    });
                  }}
                  visible={this.state.showDropdown}
                  options={this.state.filteredOptions}
                  defaultValue={this.state.selectedOptions}
                  displayProp={this.props.dropDownDisplayProp}
                  valueProp={this.props.dropDownValueProp}
                  selectedItemDisplayProp={this.props.displayProp}
                  selectedItemValueProp={this.props.valueProp}
                  searchPlaceholder={this.props.searchPlaceholder}
                  getCollectionBinder={this.props.getCollectionBinder}
                  refreshSearchList={
                    this.props.refreshOnOpen != false ||
                    this.state.refreshSearchList
                  }
                  multipleSelection={this.props.multipleSelection ?? false}
                  refreshKey={this.state.refreshKey}
                  handleOutboundClick={true}
                  selectAllOptions={this.props.selectAllOptions}
                  selectAllOptionsTitle={this.props.selectAllOptionsTitle}
                >
                  {this.props.allowNew == true && (
                    <div
                      className="oph-filterboxInput-dropdown-allowNew"
                      key={`${this.props.name}_new_item`}
                    >
                      <TextInput
                        className="oph-filterboxInput-dropdown-allowNew-input"
                        placeholder={this.props.newTextInputPlaceholder}
                        onKeyDown={(e) => this.newTextInputKeyDown(e)}
                      />
                    </div>
                  )}
                </Dropdown>
              </div>
            ))}
        </div>
      </>
    );
  }
}
