import React, { useEffect, useState } from "react";
import { getAppTheme } from "../../AppTheme";
import Icon, { IconProps } from "../Icon";
import { getImageComponent } from "../Image/Extensions";
import { SpeechRecognizer, speechRecognitionSupported } from "../../Exporters/SpeechRecognizer";
import { getCurrentRegionSetting } from "../../Localization/RegionSetting";
import { ClientBarcodeReader } from "../../Exporters/BarcodeReader";

const Searchbar: React.FC<SearchbarProps> = React.memo(({ 
  navigateText, 
  selectText, 
  dismissText, 
  allowSpeechToText = true, 
  allowBarcodeRead = true, 
  searchOptions = [], 
  placeholder, 
  onSearch = undefined,
  theme = undefined 
}) => {
  const [searchValue, setSearchValue] = useState("");
  const videoRef = React.createRef<HTMLVideoElement>();
  const SearchboxRef = React.createRef<HTMLInputElement>();
  const moveRef = React.createRef<HTMLDivElement>();

  const [speechRecognitionSupportedFlag, setSpeechRecognitionSupportedFlag] = useState(false)
  const [barcodeReadingEnabled, setBarcodeReadingEnabled] = useState(false)
  const [barcodeReader, setBarcodeReader] = useState(new ClientBarcodeReader());
  const [options, setOptions] = useState(new Array<SearchOptionType>());
  const [searchOptionsVisible, setSearchOptionsVisible] = useState(false);
  const [selectedSearchOption, setSelectedSearchOption] = useState({} as SearchOptionType);
  const [focusedDropdownItem, setFocusedDropdownItem] = useState(-1);
  const Theme = getAppTheme({Searchbar: theme}).Searchbar;
  
  useEffect(() => {
    if(focusedDropdownItem > -1 && moveRef.current) {
      moveRef.current.scrollTo(0, 107*focusedDropdownItem)
    }
  },[focusedDropdownItem])

  useEffect(() => {
    setSpeechRecognitionSupportedFlag(speechRecognitionSupported());
    (async() => {
      if(Array.isArray(searchOptions)) setOptions(searchOptions)
      else setOptions(await searchOptions(searchValue))
    })();
  }, [searchValue])

  const onKeyUp = (e: React.KeyboardEvent<HTMLElement>) =>{
    var value = "";
    if(SearchboxRef.current?.value) value = SearchboxRef.current.value;
    if(value){
      var selectedOption = options.find((option) => option.shortCodeChar && option.shortCodeChar == value)
      if(selectedOption){
        onSearchOptionClick(selectedOption)
        if(SearchboxRef.current && selectedOption.shortCodeChar)
        SearchboxRef.current.value = value.replace(selectedOption.shortCodeChar, "");
        return;
      }
    }
    setSearchValue(value);
    if(searchOptionsVisible){
      if(e.key == "ArrowDown"){
        var index = focusedDropdownItem + 1;
        if(index >= options?.length) index = options?.length - 1;
        setFocusedDropdownItem(index)
      }
      else if(e.key == "ArrowUp"){
        var index = focusedDropdownItem - 1;
        if(index < 0) index = 0
        setFocusedDropdownItem(index)
      }
      else if(e.key == "Escape"){
        toggleSearchOptions(false);
        setBarcodeReadingEnabled(false)
      }
    }
    else if(e.key == "ArrowDown"){
      toggleSearchOptions(true);
    }
    if(e.key == "Enter"){
      if(focusedDropdownItem > -1 && focusedDropdownItem < options.length) onSearchOptionClick(options[focusedDropdownItem])
      if(onSearch) onSearch(selectedSearchOption, value);
    }
  }

  const onSearchOptionClick = (option: any) =>{
    setSelectedSearchOption(option)
    toggleSearchOptions(false);
  }
  const toggleSearchOptions = (focus: boolean) =>{
    setTimeout(() => {
      setSearchOptionsVisible(focus)
    }, 100)
  }
  const recognizeSpeech = () =>{
    var region = getCurrentRegionSetting()
    if(!region) return;

    var recognizer = new SpeechRecognizer();
    recognizer.Init()
    recognizer.Language = region.Tag;
    recognizer.OnResult = (text) =>{
      if(text && SearchboxRef.current) SearchboxRef.current.value = text;
    };
    recognizer.Start();
  }
  const readBarcode = async () =>{
    if(barcodeReadingEnabled){
      barcodeReader.Destroy()  
    }
    else{
      barcodeReader.VideoElement = videoRef
      var sb = SearchboxRef.current;
      barcodeReader.onResult = (text, format) => {
        if(sb) sb.value = text;
        setSearchValue(text);
        setBarcodeReadingEnabled(false)
      };
      barcodeReader.onError = (err) =>{
        setBarcodeReadingEnabled(false)
      };
      barcodeReader.Detect()
      setTimeout(() => {
        sb?.focus();
      }, 500);
    }
    setBarcodeReadingEnabled(!barcodeReadingEnabled)
  }
  return (
    <>
      <div className="relative w-full">
        <div className={Theme?.SearchClass}>
          {selectedSearchOption && selectedSearchOption.image && getImageComponent(selectedSearchOption.image, { color: Theme?.ItemIconColor})}
          {(!selectedSearchOption || !selectedSearchOption.image) && getImageComponent(Theme?.SearchIcon)}
        </div>
        <div className={Theme?.RightIconsWrapperClass}>
          {allowSpeechToText && <div className={`cursor-pointer ${speechRecognitionSupportedFlag? "": "hidden"}`} onClick={() => recognizeSpeech()}>{getImageComponent(Theme?.MicrophoneIcon)}</div>}
          {allowBarcodeRead && <div className="cursor-pointer" onClick={() => readBarcode()}>{getImageComponent(Theme?.BarcodeIcon)}</div>}
        </div>
        <div className="relative">
          <input
            type="text"
            className={`${Theme?.InputClass} ${searchOptionsVisible && "rounded-b-none"}`}
            placeholder={placeholder}
            onKeyUp={(e) => onKeyUp(e)}
            onFocus={() => toggleSearchOptions(true)}
            onBlur={() => {toggleSearchOptions(false)}}
            ref={SearchboxRef}
          />
          <video ref={videoRef} className={barcodeReadingEnabled? "absolute z-20": "hidden"} onKeyUp={(e) => onKeyUp(e)}></video>
          {searchOptionsVisible && !barcodeReadingEnabled && options && options.length > 0 && (
            <div className={Theme?.ItemsContainerClass}>
              <div className={Theme?.ItemsScrollableAreaClass} ref={moveRef}>
                {options.map((item, i) => {
                  return <div key={i} onFocus={() => setFocusedDropdownItem(i)} className={focusedDropdownItem == i? Theme?.FocusedItemClass: Theme?.ItemClass} id={item.id?.toString()} onClick={() => onSearchOptionClick(item)}>
                    <div className="flex items-center gap-5">
                      {item.image && <div className={Theme?.ItemIconClass}>
                        {getImageComponent(item.image, {color: Theme?.ItemIconColor})}
                      </div>}
                      {item.title && <p className={Theme?.ItemTitleClass}>
                        {item.title}
                      </p>}
                    </div>
                    {item.badgeText && <span className={Theme?.BadgeClass}>{item.badgeText}</span>}
                  </div>
                })}
              </div>
              <div className="absolute flex items-center justify-between w-full py-5 bottom-0 border-t border-blackHaze">
                <div className="flex gap-2 pl-6">
                  <div className="flex items-center justify-center bg-gainsboro p-1 rounded" 
                    // onClick={(e) => {focusedDropdownItem < options?.length - 1 && setFocusedDropdownItem(focusedDropdownItem + 1)}}
                  >
                    <Icon name="arrow-down" color="#5b6782" size={24}/>
                  </div>
                  <div className="flex items-center justify-center bg-gainsboro p-1 rounded" 
                  // onClick={(e) => { setFocusedDropdownItem(focusedDropdownItem > 0 ? focusedDropdownItem - 1 : 0) }}
                  >
                    <Icon name="arrow-up" color="#5b6782" size={24}/>
                  </div>
                  {navigateText && <p className="text-cadetBlue">{navigateText}</p>}
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center justify-center bg-gainsboro p-1 rounded">
                    <Icon name="redo" color="#5b6782" size={24}/>
                  </div>
                  {selectText && <p className="text-cadetBlue">{selectText}</p>}
                </div>
                <div className="flex gap-2 pr-6">
                  <div className="flex items-center justify-center bg-gainsboro p-1 rounded">
                    <p className="text-cadetBlue w-6 h-6">esc</p>
                  </div>
                  {dismissText && <p className="text-cadetBlue">{dismissText}</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

Searchbar.displayName = "Searchbar";
export default Searchbar;

var searchbarProps: {
  allowSpeechToText?: boolean;
  allowBarcodeRead?: boolean;
  searchOptions?: Array<SearchOptionType> | ((key: string) => Promise<Array<SearchOptionType>>)
  placeholder?: string;
  onSearch?: ((option: SearchOptionType, key?: string) => void),
  dismissText?: string
  selectText?: string
  navigateText?: string
  theme?:SearchbarTheme
}
export type SearchbarProps = typeof searchbarProps

var searchbarTheme: {
  InputClass?: string,
  SearchClass?: string,
  RightIconsWrapperClass?: string,
  SearchIcon?:  React.JSX.Element | string | undefined | IconProps,
  MicrophoneIcon?: React.JSX.Element | string | undefined | IconProps,
  BarcodeIcon?: React.JSX.Element | string | undefined | IconProps,
  BadgeClass?: string,
  ItemClass?: string,
  FocusedItemClass?: string,
  ItemIconClass?: string,
  ItemIconColor?: string,
  ItemsContainerClass?: string,
  ItemsScrollableAreaClass?: string,
  ItemTitleClass?: string,
}
export type SearchbarTheme = typeof searchbarTheme

var SearchOption: {
  id?: string | number,
  image?: string | React.JSX.Element | any, 
  title?: string, 
  location?: string, 
  badgeText?: number | string,
  shortCodeChar?: string
}
export type SearchOptionType = typeof SearchOption