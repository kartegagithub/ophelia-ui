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
import { getObjectValue, randomKey, setObjectValue } from "../../Extensions";
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
  className = undefined,
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
  label = "",
  backdrop = false,
  handleOutboundClick = true,
  visibilityCallback = undefined,
  refreshSearchList = false,
  alwaysOpen = false,
  refreshKey = undefined,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(new Array<any>());
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [uniqueID, setUniqueID] = useState(randomKey(5));
  const [page, setPage] = useState(1);
  const [loadedPage, setLoadedPage] = useState(0);
  const [timer, setTimer] = useState<any>(setTimeout(() => 0, 0));
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchText, setSearchText] = useState<string | undefined>("");
  const RootRef = React.createRef<HTMLDivElement>();
  const ListRef = React.createRef<HTMLUListElement>();
  const { pathname, events } = useRouter();

  if (!selectedItemValueProp) selectedItemValueProp = valueProp;
  if (!selectedItemDisplayProp) selectedItemDisplayProp = displayProp;

  useEffect(() => {
    if (!alwaysOpen) setOpen(false);
    //url değişirse dropdown kapansın.
  }, [pathname]);

  const onSearchKeyup = async (
    e?: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e?.key == "Escape") {
      setSearching(false);
      setOpen(false);
      if (visibilityCallback) visibilityCallback(false);
    }
    if(e?.target){
      setSearchText((e.target as any).value ?? "");
    }
  };

  useEffect(() => {
    if (searching || !open || (!onSearch && !options)) return;

    if (timer){
      clearTimeout(timer)
    }
    var Timer = setTimeout(async () => {
      setSearching(true);
      var result: Array<any> | undefined = undefined;
      if (onSearch) {
        result = await onSearch(searchText, page);
        setLoadedPage(page)
      }
      if (!onSearch || result == undefined) {
        result = filterInArray(options, searchText ?? "", displayProp);
      }
      if (result != undefined) {
        if (page > 1) result = filteredOptions.concat(result);
        setFilteredOptions(result);
      }
      setSearching(false);
    }, 500);
    setTimer(Timer)
  }, [searchText, page, open]);

  useEffect(() => {
    const handleRouteChange = () => {
      setOpen(false);
      if (visibilityCallback) visibilityCallback(false);
    };

    events.on("routeChangeStart", handleRouteChange);

    return () => {
      events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

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
        if(!searching)
          setPage(loadedPage + 1);
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
    if (!alwaysOpen && open && !inbound) {
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
    if (enableSearch && visible && refreshSearchList != true) {
      setTimeout(function () {
        var elem = document.getElementById(`${uniqueID}-search-input`) as HTMLInputElement; 
        if(!elem) return;
        elem.focus();
      }, 500);
    }
  }, [visible, refreshSearchList, refreshKey]);

  return (
    <>
      {button && (
        <Navigation
          id={`${id}_button`}
          data-testid={`${id}_button`}
          onClick={(e) => handleMainButtonClick(e, button)}
          extraClass={button.extraClass}
          text={button.text}
          leftIcon={button.leftIcon}
          rightIcon={button.rightIcon}
          size={button.size ?? "small"}
          isOpen={open}
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
        className={`oph-dropdown ${className} ${positionClass || "left"} ${
          open ? "open" : ""
        } `}
        ref={RootRef}
      >
        {enableSearch && (
          <div className="oph-dropdown-search">
            <div className="oph-dropdown-search-container">
              <input
                onKeyUp={(e) => {
                  setPage(1);
                  onSearchKeyup(e);
                }}
                id={`${uniqueID}-search-input`}
                type="text"
                className="oph-dropdown-search-container-searchInput"
                placeholder={searchPlaceholder}
              />
              {!searching && <div className="oph-dropdown-search-container-content">
                <Icon name="azSearch" color="#0D222E" size={24} />
              </div>}
              {searching && <div className="oph-dropdown-search-container-content"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg></div>}
            </div>
          </div>
        )}
        {label && <p className="oph-dropdown-label">{label}</p>}

        {filteredOptions && filteredOptions.length > 0 && (
          <ul
            ref={ListRef}
            onScroll={(e) => onListScrolled(e)}
            className={`oph-dropdown-options ${open ? "" : "open"}`}
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
                      className={"oph-dropdown-options-item"}
                      onClick={(e) => onOptionSelectionChanged(e, option)}
                    >
                      {iconProp &&
                        getObjectValue(option, iconProp) &&
                        getImageComponent(getObjectValue(option, iconProp))}
                      {multipleSelection != undefined && (
                        <input
                          // disabled
                          id={`${id}_selectedvalue_${i}`}
                          name={`${id}_selectedvalue`}
                          type={multipleSelection ? "checkbox" : "radio"}
                          value={getObjectValue(option, valueProp)}
                          checked={checked}
                          className={multipleSelection ? "checkbox" : "radio"}
                        />
                      )}
                      {!optionTemplateFn && (
                        <label className={"oph-dropdown-options-item-label"}>
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
        {!searching && buttons && buttons.length > 0 && (
          <div className={"oph-dropdown-footerbutton"}>
            {buttons.map((button, i) => (
              <a key={i} href="#" onClick={(e) => onButtonClick(e, button)}>
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
  positionClass?: "left" | "right" | "top" | "bottom" | "custom";
  contentTopClass?: string;
  button?: {
    id?: string;
    className?: string;
    text?: string;
    dropdownAction?: "click" | "hover";
    leftIcon?: IconProps | string | React.JSX.Element;
    rightIcon?: IconProps | string | React.JSX.Element;
    size?: string;
    extraClass?: string;
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
  className?: string;
  handleOutboundClick?: boolean;
  visibilityCallback?: (open: boolean) => void;
  refreshSearchList?: boolean;
  refreshKey?: number | string
  listHeight?: string;
  alwaysOpen?: boolean;
};
export type DropdownProps = typeof dropdownProps;
