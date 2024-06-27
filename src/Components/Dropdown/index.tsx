import { getAppTheme } from "../../AppTheme";
import React, { useEffect, useState } from "react";
import { getImageComponent } from "../Image/Extensions";
import {
  filterInArray,
  findInArray,
  removeAtIndex,
  selectDefaultValues,
} from "../../Extensions/ArrayExtensions";
import Link from "next/link";
import Icon, { IconProps } from "../Icon";
import {
  registerDocumentMouseDown,
  unregisterDocumentMouseDown,
} from "../../Extensions/DocumentExtension";
import { getObjectValue, setObjectValue } from "../../Extensions";
import Button from "../Button";
import Navigation from "../Navigation";
import Backdrop from "../Backdrop";
import { useRouter } from "next/router";
const Dropdown: React.FC<DropdownProps> = ({
  id = "",
  multipleSelection = undefined,
  visible = false,
  enableSearch = false,
  searchPlaceholder = "Search",
  onSearch = undefined,
  onSelectionChange = undefined,
  children = undefined,
  options = [],
  buttons = [],
  optionTemplateFn = undefined,
  defaultValue = undefined,
  button = undefined,
  positionClass = "", // left | right | top | bottom
  urlProp = undefined,
  iconProp = "icon",
  displayProp = "text",
  valueProp = "value",
  selectedItemDisplayProp = undefined,
  selectedItemValueProp = undefined,
  contentTopClass = undefined,
  label = "",
  backdrop = false,
  theme = undefined,
  handleOutboundClick = true,
  visibilityCallback = undefined,
  refreshSearchList = false,
  listHeight = undefined,
  ...props
}) => {
  const [selectedOptions, setSelectedOptions] = useState(new Array<any>());
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const Theme = getAppTheme({ Dropdown: theme }).Dropdown;
  const SearchRef = React.createRef<HTMLInputElement>();
  var Timer: any;
  const RootRef = React.createRef<HTMLDivElement>();
  const ListRef = React.createRef<HTMLUListElement>();
  const { pathname } = useRouter();

  if (!selectedItemValueProp) selectedItemValueProp = valueProp;
  if (!selectedItemDisplayProp) selectedItemDisplayProp = displayProp;

  useEffect(() => {
    setOpen(false);
    //url değişirse dropdown kapansın.
  }, [pathname]);

  const onSearchKeyup = async (
    e?: React.KeyboardEvent<HTMLInputElement>,
    searchedPage: number = 1
  ) => {
    if (searching) return;
    setSearching(true);

    if (Timer) clearTimeout(Timer);
    var key = SearchRef.current?.value ?? "";
    Timer = setTimeout(async () => {
      var result: Array<any> | undefined = undefined;
      if (onSearch) {
        result = await onSearch(key, searchedPage);
      }
      if (!onSearch || result == undefined) {
        result = filterInArray(options, key, displayProp);
      }
      if (result != undefined) {
        if (searchedPage > 1) result = filteredOptions.concat(result);
        setFilteredOptions(result);
      }
      setSearching(false);
    }, 500);
  };

  const onButtonClick = (e: any, button: any) => {
    e.preventDefault();
    if (button.type == "dismiss") {
      setOpen(false);
      if (visibilityCallback) visibilityCallback(false);
      return;
    } else if (button.type == "reset") {
      if (defaultValue)
        setSelectedOptions(
          selectDefaultValues(defaultValue, valueProp, options)
        );
      return;
    } else {
      if (onSelectionChange) onSelectionChange(selectedOptions, button);
      if (button.hideDropdownOnClick === true) {
        setOpen(false);
        if (visibilityCallback) visibilityCallback(false);
      }
    }
  };

  const onOptionSelectionChanged = (e: any, option: any) => {
    if (multipleSelection == undefined) {
      if (onSelectionChange) onSelectionChange(option);
      return;
    }
    var tmpOptions = JSON.parse(JSON.stringify(selectedOptions));
    var findResult = findInArray(
      tmpOptions,
      option,
      selectedItemValueProp,
      valueProp
    );
    if (multipleSelection == false) {
      tmpOptions = [];
      findResult.index = -1;
    }
    if (findResult.index > -1) {
      removeAtIndex(tmpOptions, findResult.index);
    } else {
      var newOption = {};
      setObjectValue(
        newOption,
        selectedItemDisplayProp,
        getObjectValue(option, displayProp)
      );
      setObjectValue(
        newOption,
        selectedItemValueProp,
        getObjectValue(option, valueProp)
      );
      tmpOptions.push(newOption);
    }
    setSelectedOptions(tmpOptions);
    if (onSelectionChange) onSelectionChange(tmpOptions);
    if (multipleSelection == false) {
      setOpen(false);
      if (visibilityCallback) visibilityCallback(false);
    }
  };
  const onListScrolled = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    if (ListRef.current && !searching) {
      if (
        ListRef.current.scrollTop + ListRef.current.offsetHeight + 20 >=
        ListRef.current.scrollHeight
      ) {
        onSearchKeyup(undefined, page + 1);
        setPage(page + 1);
      }
    }
  };
  const handleMainButtonClick = (e: any, button: any) => {
    if (
      (filteredOptions && filteredOptions.length > 0) ||
      children ||
      enableSearch
    ) {
      if (button.dropdownAction != "hover") {
        setOpen(!open);
        visibilityCallback && visibilityCallback(!open);
      }
    } else {
      if (onSelectionChange) onSelectionChange(button);
    }
  };
  const mouseDown = (inbound: boolean) => {
    if (open && !inbound) {
      setOpen(false);
      if (visibilityCallback) visibilityCallback(false);
    }
  };
  useEffect(() => {
    if (defaultValue) {
      var values = selectDefaultValues(defaultValue, valueProp, options);
      setSelectedOptions(values);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (handleOutboundClick == true) {
      registerDocumentMouseDown(mouseDown, RootRef.current);
      return () => unregisterDocumentMouseDown(mouseDown, RootRef.current);
    }
    return undefined;
  }, [mouseDown, RootRef, handleOutboundClick]);

  useEffect(() => {
    setOpen(visible);
    setPage(1);
    if (visibilityCallback) visibilityCallback(visible);
    if (
      visible &&
      (!filteredOptions || filteredOptions.length == 0 || refreshSearchList)
    )
      onSearchKeyup();
    if (enableSearch && visible && refreshSearchList != true) {
      setTimeout(function () {
        SearchRef.current?.focus();
      }, 200);
    }
  }, [setOpen, visible, refreshSearchList]);

  return (
    <>
      {button && (
        <Navigation
          className={button.className ?? getAppTheme().Buttons?.primary}
          id={`${id}_button`}
          data-testid={`${id}_button`}
          onClick={(e) => handleMainButtonClick(e, button)}
          text={button.text}
          leftIcon={button.leftIcon}
          rawClass={button.rawClass}
          rightIcon={button.rightIcon}
          size={button.size ?? "small"}
          onMouseOver={() => {
            if (button.dropdownAction == "hover") {
              setOpen(true);
              visibilityCallback && visibilityCallback(true);
            }
          }}
        >
          {button.btnChildren && button.btnChildren}
        </Navigation>
      )}
      <div
        id={id}
        key={id}
        className={`${Theme?.Class} ${positionClass || "left-0"} ${
          open
            ? "opacity-100 max-h-[800px]"
            : "opacity-0 max-h-0 overflow-hidden"
        } ${contentTopClass}`}
        ref={RootRef}
      >
        {enableSearch && (
          <div className="p-6">
            <div className="relative">
              <input
                onKeyUp={(e) => {
                  setPage(1);
                  onSearchKeyup(e, 1);
                }}
                type="text"
                ref={SearchRef}
                className="bg-transparent border border-pastelBlue rounded-lg p-4 text-black text-sm appearance-none focus:border-darkSky block w-full peer focus:outline-none focus:ring-0"
                placeholder={searchPlaceholder}
              />
              <div className="absolute inset-y-0 rtl:inset-r-0 end-4 flex items-center">
                <Icon name="azSearch" color="#0D222E" size={24} />
              </div>
            </div>
          </div>
        )}
        {label && (
          <p className="text-manatee text-[10px] font-normal mb-1.5">{label}</p>
        )}

        {filteredOptions && filteredOptions.length > 0 && (
          <ul
            ref={ListRef}
            onScroll={(e) => onListScrolled(e)}
            className={`${Theme?.ContentClass} ${listHeight} ${
              open ? "opacity-100" : "opacity-0 max-h-0"
            }`}
            aria-labelledby="dropdownSearchButton"
          >
            {filteredOptions.map((option, i) => {
              var checked =
                findInArray(
                  selectedOptions,
                  option,
                  selectedItemValueProp,
                  valueProp
                ).index > -1;
              return (
                <li key={i}>
                  <Link
                    href={
                      urlProp && option[urlProp] != undefined
                        ? option[urlProp]
                        : "javascript:void(0)"
                    }
                  >
                    <div
                      id={`${id}_option_${i}`}
                      className={Theme?.ItemClass}
                      onClick={(e) => onOptionSelectionChanged(e, option)}
                    >
                      {iconProp &&
                        getObjectValue(option, iconProp) &&
                        getImageComponent(getObjectValue(option, iconProp))}
                      {multipleSelection != undefined && (
                        <input
                          disabled
                          id={`${id}_selectedvalue_${i}`}
                          name={`${id}_selectedvalue`}
                          type={multipleSelection ? "checkbox" : "radio"}
                          value={getObjectValue(option, valueProp)}
                          checked={checked}
                          className={
                            multipleSelection
                              ? Theme?.CheckboxClass ??
                                getAppTheme().Inputs?.checkbox
                              : Theme?.RadioClass ?? getAppTheme().Inputs?.radio
                          }
                        />
                      )}
                      {!optionTemplateFn && (
                        <label className={Theme?.ItemLabelClass}>
                          {getObjectValue(option, displayProp)}
                        </label>
                      )}
                      {optionTemplateFn && optionTemplateFn(option)}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        {children}
        {buttons && buttons.length > 0 && (
          <div className={Theme?.ButtonContainerClass}>
            {buttons.map((button, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => onButtonClick(e, button)}
                className={button.className ?? Theme?.ButtonClass}
              >
                {button.icon && getImageComponent(button.icon)}
                {button.text}
              </a>
            ))}
          </div>
        )}
      </div>
      <Backdrop visible={open && backdrop} />
    </>
  );
};
export default Dropdown;

var dropdownProps: {
  id?: string;
  visible?: boolean;
  enableSearch?: boolean;
  searchPlaceholder?: string;
  multipleSelection?: boolean;
  positionClass?: string;
  contentTopClass?: string;
  button?: {
    id?: string;
    className?: string;
    text?: string;
    dropdownAction?: "click" | "hover";
    leftIcon?: IconProps | string | React.JSX.Element;
    rightIcon?: IconProps | string | React.JSX.Element;
    size?: string;
    rawClass?: string;
    btnChildren?: React.JSX.Element;
  };
  newBtn?: React.JSX.Element;
  onSearch?: (key?: string, page?: number) => Promise<Array<any> | undefined>;
  onSelectionChange?: (value?: any | Array<any>, clickedButton?: any) => void;
  backdrop?: boolean;
  children?: React.ReactNode;
  defaultValue?: Array<any> | any;
  options?: Array<any>;
  buttons?: Array<{
    id?: string | number;
    text?: string;
    icon?: string | React.JSX.Element;
    type?: "dismiss" | "reset" | "button";
    className?: string;
    hideDropdownOnClick?: boolean;
    color?:
      | "inherit"
      | "primary"
      | "secondary"
      | "success"
      | "error"
      | "info"
      | "warning"
      | string;
  }>;
  optionTemplateFn?: (item: any) => React.JSX.Element;
  displayProp?: string;
  valueProp?: string;
  selectedItemDisplayProp?: string;
  selectedItemValueProp?: string;
  urlProp?: string;
  iconProp?: string;
  label?: string;
  theme?: DropdownTheme;
  handleOutboundClick?: boolean;
  visibilityCallback?: (open: boolean) => void;
  refreshSearchList?: boolean;
  listHeight?: string;
};
export type DropdownProps = typeof dropdownProps;

var dropdownTheme: {
  Class?: string;
  ClassWhenInner?: string;
  ButtonContainerClass?: string;
  contentBasicText?: string;
  selectbox?: string;
  ButtonClass?: string;
  ContentClass?: string;
  SuccessClass?: string;
  ItemClass?: string;
  CheckboxClass?: string;
  RadioClass?: string;
  ItemLabelClass?: string;
  SearchIcon?: React.JSX.Element | string | undefined | IconProps;
};

export type DropdownTheme = typeof dropdownTheme;
