import React from "react";
import _ from "lodash-es"
import { AppThemeType } from "./AppThemeType";
import { removeEmptyProps } from "./Extensions/ReflectionExtensions";

var AppThemeConfig: AppThemeType = {
  Common:{
    Backdrop: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30"
  },
  Alert:{
    Class: "flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-100 dark:bg-gray-800 dark:text-blue-400",
    TextClass: "ms-3 text-sm font-medium",
    Types: {
      info: "flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-100 dark:bg-gray-800 dark:text-blue-400",
      warning: "flex items-center p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
      error: "flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",
      success: "flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
    }
  },
  Binders: {
    SubBinderModal:{
      Class: "fixed left-0 top-10 w-full overflow-y-auto overflow-x-hidden outline-none"
    }
  },
  InputFields:{
    RootClass: "mb-5",
    LabelClass: "text-[12px] tracking-[.36px] text-manatee",
    ErrorMessageClass: "text-[11px] text-pomegranate tracking-[.36px]",
  },
  Tabs:{
    RootClass: "flex flex-col gap-4 bg-white text-sm font-medium text-gray-500",
    TabHeaderClass: "flex items-center p-2 text-sm text-gray-500",
    TabContentClass: "text-medium text-gray-500 rounded-lg w-full",
    TabHeaderButtonClass: "p-2 border-b-2 rounded-t-lg text-blueZodiac ",
    SelectedTabHeaderButtonClass: "p-2 border-b-2 border-blueZodiac rounded-t-lg text-blueZodiac ",
    TabHeaderButtonContainerClass: "me-2",
    TabPaneClass: "p-4 rounded-lg"
  },
  Buttons:{
    default: "",
    primary: "",
  },
  Panel: {
    RootClass: "bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700",
    HeaderClass: "flex flex-1 items-center justify-between border-b border-gray-300 px-3 py-4 md:py-5" ,
    HeaderTextClass: "flex flex-1 items-center justify-between"
  },
  Pagination: {
    RootClass: "bg-white mb-12 p-5 flex flex-col xl:flex-row items-center justify-between gap-y-5",
    PageListClass: "flex gap-4",
    PageListItemClass: "flex items-center gap-2 text-[14px] text-slateGray",
    PageListItemSelectedClass: "text-[14px] text-blueZodiac font-bold bg-gainsboro px-3 py-1.5 rounded-lg",
    PageSizeSelectionRootClass: "flex items-center gap-6 text-[14px] text-slateGray tracking-[.5px]",
    PageSizeSelectionClass: "px-3 py-2 bg-blackHaze rounded-lg",
    PagesTitleClass: "text-slateGray text-[14px] tracking-[.5px]",
  },
  Carousel:{
    Class: "relative w-full",
    IndicatorClass: "absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse",
    RightButtonClass: "absolute start-0 rotate-180 z-30 flex -mx-4 items-center justify-center top-2/4 cursor-pointer group focus:outline-none",
    LeftButtonClass: "absolute end-0 rotate-180 z-30 flex -mx-4 items-center justify-center top-2/4 cursor-pointer group focus:outline-none"
  },
  Inputs: {
    text: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    textarea: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    selectbox: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    filterbox: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2 flex gap-3",
    checkbox: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block py-2",
    radio: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    boolean: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    enum: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    password: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    richtext: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    date: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    datetime: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    numeric: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    label: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    file: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    month: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    email: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    phone: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    url: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    range: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    time: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    week: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
  },
  Searchbar: {
    InputClass:"h-16 bg-white border border-wildBlueYonder text-slateGray text-base rounded-2xl focus:outline-none block w-full p-2.5 pl-14 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400",
    SearchClass: "absolute left-6 top-5 z-10",
    RightIconsWrapperClass: "flex gap-4 absolute right-6 top-5 z-10",
    SearchIcon:  {name:"search", size: 24, color: "#5B6782"},
    MicrophoneIcon: {name: "microphone", size: 24, color:"#D6DAE2"},
    BarcodeIcon: {name:"qrCode", size:24, color: "#D6DAE2"},
    BadgeClass: "w-8 h-6 bg-terraCotta text-white text-center rounded-2xl",
    ItemClass: "flex items-center justify-between mb-1 cursor-pointer hover:bg-gainsboro",
    FocusedItemClass: "flex items-center justify-between p-2 mb-6 rounded-[18px] bg-gainsboro",
    ItemIconClass: "bg-blackHaze opacity-80 p-6 hover:bg-gainsboro cursor-pointer",
    ItemIconColor: "#252387",
    ItemsContainerClass: "absolute w-full h-80 bg-white border-b border-x border-wildBlueYonder rounded-b-2xl z-20",
    ItemsScrollableAreaClass: "h-60 overflow-auto",
    ItemTitleClass: "text-[12px] text-outerSpace group-hover:text-blueZodiac tracking-[.42px]",
  },
  ShortcutList: {
    Class: "mt-14 container",
    TitleClass: "text-blueZodiac text-[14px] font-bold mb-5",
    ItemsClass: "flex items-center flex-wrap gap-10",
    ItemClass: "group flex flex-col items-center gap-5 relative",
    ItemIconClass: "bg-blackHaze opacity-80 p-6 rounded-[18px] hover:bg-gainsboro cursor-pointer",
    ItemIconColor: "#252387",
    ItemTitleClass: "text-[12px] text-outerSpace group-hover:text-blueZodiac tracking-[.42px]",
    BadgeClass: "absolute -right-1 -top-1 w-8 h-6 bg-terraCotta text-white text-center rounded-2xl z-10"
  },
  Menu: {
    Class: "overflow-y-auto overflow-x-hidden px-3 -mx-3",
    Levels:{
      Selected:{
        "1": "flex items-center justify-between py-4 text-white px-3 -mx-3 bg-deepBlue rounded-xl",
        "2": "flex items-center justify-between py-4 text-white px-3 -mx-3 mt-2 bg-deepBlue opacity-80 rounded-xl",
        "3": "flex items-center justify-between py-4 text-white px-3 -mx-3 mt-2 bg-deepBlue opacity-60 rounded-xl"
      }
    }
  },
  Sidebar: {
    RootClass: "h-full min-w-[300px] bg-blueZodiac px-5 pt-9 pb-6 text-[12px]",
    ToogleClass: "h-full w-[64px] bg-blueZodiac px-5 pt-11 pb-6"
  },
  Table: {
    Icons: {
      NotFiltered: <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.8 4H5.2a1 1 0 0 0-.7 1.7l5.3 6 .2.7v4.8c0 .2 0 .4.2.4l3 2.3c.3.2.8 0 .8-.4v-7.1c0-.3 0-.5.2-.7l5.3-6a1 1 0 0 0-.7-1.7Z"/></svg>,
      Filtered: <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3a2 2 0 0 0-1.5 3.3l5.4 6v5c0 .4.3.9.6 1.1l3.1 2.3c1 .7 2.5 0 2.5-1.2v-7.1l5.4-6C21.6 5 20.7 3 19 3H5Z"/></svg>,
      NotSorted: <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/></svg>,
      DescSorted: <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 10 4 4 4-4"/></svg>,
      AscSorted: <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16 14-4-4-4 4"/></svg>,
    },
    Class: "w-full text-[12px] text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-1",
    RowClass: "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-paleSilver",
    SelectedRowClass: "px-4 py-2 whitespace-nowrap bg-paleSilver",
    ColumnsRowClass: "",
    SelectedColumnClass: "relative px-4 py-2 whitespace-nowrap border-r",
    ColumnClass: "relative px-4 py-2 whitespace-nowrap border-r",
    ColumnRootComponentClass: "relative sm:flex sm:flex-1 sm:justify-between items-center gap-6",
    ColumnTitleClass: "",
    ColumnButtonsClass: "sm:flex gap-2",
    ContainerClass: "relative min-h-[250px] overflow-x-auto scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded",
    TopScrollClass: "scrollbar scrollbar-thumb-gray-300 scrollbar-thumb-rounded scrollbar-thin rounded-lg w-full overflow-x-auto bg-gray-200",
    TopScrollbarClass: "h-[0.5px]",
    SelectedCellClass: "px-4 py-2 selected whitespace-nowrap border-r",
    CellClass: "px-4 py-2 whitespace-nowrap border-r",
    HeadClass: "bg-aliceBlue",
    CellTypeClasses:{
      text: "",
      textarea: "",
      selectbox: "",
      checkbox: "",
      radio: "",
      boolean: "text-right",
      enum: "",
      password: "hidden",
      richtext: "",
      date: "",
      datetime: "text-right",
      numeric: "",
      label: "",
      file: "",
      month: "text-right",
      email: "",
      phone: "text-right",
      url: "",
      range: "",
      time: "text-right",
      week: "text-right",
    }
  },
  Grid: {
    Class: "grid w-full",
    RowClass: "flex flex-nowrap",
    ColumnClass: "",
    ContainerClass: "relative overflow-x-auto"
  },
  Spinner:{
    Class: "",
    TextClass: "sr-only",
    Image: {name: "spinner", size: 18, className: "w-8 h-8 text-gray animate-spin dark:text-gray fill-blueBell"}
  },
  IconRating: {
    Class: "flex items-center mb-5",
    TextClass: "ms-1 text-sm font-medium text-gray-500 dark:text-gray-400",
    Icon: {name: "star", className: "w-4 h-4 ms-1 text-gray-300", size: 12},
    FilledIcon: {name: "star", className: "w-4 h-4 ms-1 text-yellow-300", size: 12}
  },
  Toast:{
    Class: "flex items-center w-full max-w-xs p-4 text-gray-200 bg-white rounded-lg shadow dark:text-gray-900 dark:bg-gray",
    TextClass: "ms-3 text-sm font-normal text-white",
    CloseButtonClass: "ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700",
    ImageClass: "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200",
    InfoImage: {name: "info", size: 18},
    SuccessImage: {name: "success", size: 18},
    ErrorImage: {name: "error", size: 18},
    WarningImage: {name: "warning", size: 18}
  },
  Notification: {
    InfoContainer: "absolute top-16 right-6 py-2 px-4 min-w-72 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 z-10",
    ErrorContainer: "absolute top-16 right-6 py-2 px-4 min-w-72 text-red-800 border border-red-300 rounded-lg bg-red-50 z-10",
    TitleContainer: "flex items-center gap-2",
    ContentClass: "my-2 text-sm",
    InfoImage: {name: "info", size: 18, color:"blue"},
    SuccessImage: {name: "success", size: 18},
    ErrorImage: {name: "error", size: 18,  color:"red",},
    WarningImage: {name: "warning", size: 18}
  },
  SpeedDial:{
    Class: "fixed end-6 bottom-6 group",
    MenuClass: "flex flex-col items-center mb-4 space-y-2",
    MainButtonClass: "flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800",
    DialButtonClass: "flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400",
    Image: <svg className="w-5 h-5 transition-transform group-hover:rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
  </svg>
  },
  Progress:{
    Class: "w-full bg-gray-200 rounded-full dark:bg-gray-700",
    BarClass: "bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
  },
  Modal:{
    DefaultZIndex: "40",
    Class: "fixed left-0 top-10 w-full overflow-y-auto overflow-x-hidden outline-none",
    SubClass: "pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center transition-all duration-300 ease-in-out sm:mx-auto sm:mt-15 sm:min-h-[calc(100%-3.5rem)] sm:max-w-[800px]",
    ContainerClass: "pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark",
    HeaderClass: "flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10",
    BodyClass: "relative p-4 max-h-[400px] overflow-y-auto",
    FooterClass: "flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10",
    TitleClass: "text-xl font-semibold text-gray-900",
    ButtonClass: "py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:text-blue-700 focus:z-10 focus:ring-4"
  },
  Dropdown:{
    Class: "absolute top-0 left-0 z-10 bg-white shadow w-50 dark:bg-gray-700",
    ClassWhenInner: "bg-white shadow w-50 dark:bg-gray-700",
    ButtonContainerClass: "w-full flex items-center",
    ButtonClass: "flex items-center p-3 text-sm font-medium text-black border border-gray-200 bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline",
    ContentClass: "overflow-y-auto text-sm text-gray-700 dark:text-gray-200",
    SuccessClass: "flex items-center p-3 text-sm font-medium text-black border border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 bg-red-500",
    ItemClass: "flex ps-2 items-center rounded hover:bg-gray-100 dark:hover:bg-gray-600",
    CheckboxClass: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500",
    RadioClass: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500",
    ItemLabelClass: "w-full py-2 ms-2 text-[12px] text-cadetBlue rounded cursor-pointer",
    SearchIcon:  {name:"search", size: 16, color: "#5B6782"},

  },
  Accordion:{
    DetailClass: "w-full px-5 py-6 border border-darkBlue rounded-2xl",
    SummaryClass: "flex items-center justify-between gap-10 cursor-pointer",
    TitleClass: "text-base font-bold",
    ContentClass:"text-[22px]/[30px] pt-2.5 pr-5"

  },
  Highlight:{
    Languages: ['javascript', 'ruby', 'python', 'rust', 'json', 'c#', '']
  },
  Quill: {
    Formats: [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "color",
      "clean",
    ],
    Toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean']
    ],
    ImageHandler: async (fileName: string, size: number, buffer: ArrayBuffer, base64: string | undefined) => undefined
  },
  Icons:{
    DefaultSize: "18px",
    getCustomIconSvg: (iconName: string, size?: string, className?: string, strokeColor: string | undefined = undefined, fillColor: string | undefined = undefined, ext1?: string, ext2?: string, ext3?: string): React.JSX.Element | string => {
      return ""
    },
    getIconSvg: (iconName: string, size?: string, className?: string, strokeColor: string | undefined = undefined, fillColor: string | undefined = undefined, ext1?: string, ext2?: string, ext3?: string) => {
      if(!strokeColor) strokeColor = "none"
      if(!fillColor) fillColor = "none"
      var theme = getAppTheme();
      if(theme.Icons && theme.Icons.getCustomIconSvg){
        var icon = theme.Icons.getCustomIconSvg(iconName, size, className, strokeColor, fillColor, ext1, ext2, ext3)
        if(icon && icon != "") return icon
      }
      
      switch (iconName) {
        case "spinner":
          return <svg width={size} height={size} className={className} viewBox="0 0 100 101" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill={strokeColor}/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill={ext1} />
          </svg>
        case "home":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 24 24" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 8.5c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v7c0 3.5-2 5-5 5H7" stroke="${strokeColor}" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="m17 9-3.13 2.5c-1.03.82-2.72.82-3.75 0L7 9M2 16.5h6M2 12.5h3" stroke="${strokeColor}" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        case "menu":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 24 24" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="m6 18-2.756-2.47a.698.698 0 0 1 0-1.06L6 12" stroke="${strokeColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 6h18M10 12h11M10 18h11" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round"/></svg>`;
        case "search":
          return `<svg  width="${size}" class="${className}" height="${size}" viewBox="0 0 24 24" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10.429" cy="10.429" r="7.179" stroke="${strokeColor}" stroke-width="1.5"/>
          <path d="m16.244 15.184-.53-.53-1.06 1.06.53.53 1.06-1.06zm4.225 6.346a.75.75 0 1 0 1.06-1.06l-1.06 1.06zm-5.286-5.286 5.286 5.286 1.06-1.06-5.285-5.286-1.06 1.06z" fill="${strokeColor}"/>
      </svg>
      `;
        case "bell":
          return `<svg  width="${size}" class="${className}" height="${size}" viewBox="0 0 24 24" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.295 10.172c0-2.933-2.422-5.312-5.41-5.312s-5.41 2.379-5.41 5.312v.799c0 2.075-.624 4.103-1.79 5.82A.863.863 0 0 0 5.4 18.14h12.97a.863.863 0 0 0 .714-1.349 10.362 10.362 0 0 1-1.789-5.82v-.799z" stroke="#fff" stroke-linejoin="round"/>
          <path d="M10.41 20.354c.196.245.766.737 1.475.737.708 0 1.279-.492 1.475-.738" stroke="${strokeColor}" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="16.312" cy="5.598" r="3.689" fill="${ext1}"/>
      </svg>
      `;
        case "settings":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 20 20" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" stroke="${strokeColor}" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1.667 10.733V9.266c0-.866.708-1.583 1.583-1.583 1.508 0 2.125-1.067 1.367-2.375A1.583 1.583 0 0 1 5.2 3.15l1.442-.825c.658-.392 1.508-.159 1.9.5l.091.158c.75 1.308 1.984 1.308 2.742 0l.092-.158c.391-.659 1.241-.892 1.9-.5l1.441.825a1.582 1.582 0 0 1 .584 2.158c-.759 1.308-.142 2.375 1.366 2.375.867 0 1.584.708 1.584 1.583v1.467c0 .867-.709 1.583-1.584 1.583-1.508 0-2.125 1.067-1.366 2.375a1.58 1.58 0 0 1-.584 2.158l-1.441.825c-.659.392-1.509.159-1.9-.5l-.092-.158c-.75-1.308-1.983-1.308-2.742 0l-.091.159c-.392.658-1.242.891-1.9.5L5.2 16.848a1.582 1.582 0 0 1-.583-2.158c.758-1.308.141-2.375-1.367-2.375a1.588 1.588 0 0 1-1.583-1.583z" stroke="#fff" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `;
        case "wallet":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 24 24" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 9.5v5c0 3-2 5-5 5H7c-3 0-5-2-5-5v-5c0-2.72 1.64-4.62 4.19-4.94.26-.04.53-.06.81-.06h10c.26 0 .51.01.75.05C20.33 4.85 22 6.76 22 9.5z" stroke="${strokeColor}" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M22 10h-3c-1.1 0-2 .9-2 2s.9 2 2 2h3" stroke="${strokeColor}" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>    
      `;
        case "arrow-down":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 16 16" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="m13.28 5.967-4.347 4.346a1.324 1.324 0 0 1-1.867 0L2.72 5.967" stroke="${strokeColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>   
      `;
        case "arrow-up":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 16 16" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="m2.72 10.033 4.347-4.346a1.324 1.324 0 0 1 1.867 0l4.346 4.346" stroke="${strokeColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `;
        case "arrow-left":
          return `<svg width="${size}" class="${className}" height="${size}" xmlns="http://www.w3.org/2000/svg" fill="${fillColor}" viewBox="0 0 24 24" stroke-width="1.5" stroke="${strokeColor}" >
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>

      `;
        case "arrow-right":
          return `<svg width="${size}" class="${className}" height="${size}" xmlns="http://www.w3.org/2000/svg" fill="${fillColor}" viewBox="0 0 24 24" stroke-width="1.5" stroke="${strokeColor}">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>`;
        case "bag":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 24 24" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.81 2 5.19 5.63M15.19 2l3.62 3.63" stroke="${strokeColor}" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 7.85c0-1.85.99-2 2.22-2h15.56c1.23 0 2.22.15 2.22 2 0 2.15-.99 2-2.22 2H4.22C2.99 9.85 2 10 2 7.85z" stroke="${strokeColor}"/>
          <path d="M9.76 14v3.55M14.36 14v3.55M3.5 10l1.41 8.64C5.23 20.58 6 22 8.86 22h6.03c3.11 0 3.57-1.36 3.93-3.24L20.5 10" stroke="${strokeColor}" stroke-linecap="round"/>
      </svg>
      `;
        case "box":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 24 24" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.17 7.44 12 12.55l8.77-5.08M12 21.61v-9.07" stroke="${strokeColor}" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9.93 2.48 4.59 5.44c-1.21.67-2.2 2.35-2.2 3.73v5.65c0 1.38.99 3.06 2.2 3.73l5.34 2.97c1.14.63 3.01.63 4.15 0l5.34-2.97c1.21-.67 2.2-2.35 2.2-3.73V9.17c0-1.38-.99-3.06-2.2-3.73l-5.34-2.97c-1.15-.63-3.01-.63-4.15.01z" stroke="${strokeColor}" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `;
        case "personel-card":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 20 20" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.167 17.5H5.833c-3.333 0-4.166-.833-4.166-4.167V6.667c0-3.334.833-4.167 4.166-4.167h8.334c3.333 0 4.166.833 4.166 4.167v6.666c0 3.334-.833 4.167-4.166 4.167zM11.667 6.667h4.166M12.5 10h3.333M14.167 13.333h1.666" stroke="${strokeColor}" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.083 9.408a1.508 1.508 0 1 0 0-3.016 1.508 1.508 0 0 0 0 3.016zM10 13.608a2.517 2.517 0 0 0-2.283-2.266 6.428 6.428 0 0 0-1.267 0 2.524 2.524 0 0 0-2.283 2.266" stroke="${strokeColor}" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `;
        case "profile":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 24 24" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.16 10.87c-.1-.01-.22-.01-.33 0a4.42 4.42 0 0 1-4.27-4.43C7.56 3.99 9.54 2 12 2a4.435 4.435 0 0 1 .16 8.87zM7.16 14.56c-2.42 1.62-2.42 4.26 0 5.87 2.75 1.84 7.26 1.84 10.01 0 2.42-1.62 2.42-4.26 0-5.87-2.74-1.83-7.25-1.83-10.01 0z" stroke="${strokeColor}" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>    
      `;
        case "plus":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 18 18" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.134 9h11.733M9 14.867V3.134" stroke=${strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
      </svg>    
      `;
        case "box-add":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 40 40" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M38.333 30c0 1.25-.35 2.433-.966 3.433-.35.6-.8 1.133-1.317 1.567a6.508 6.508 0 0 1-4.383 1.666 6.57 6.57 0 0 1-5.05-2.35c-.034-.05-.084-.083-.117-.133a4.708 4.708 0 0 1-.533-.75A6.534 6.534 0 0 1 25 30c0-2.1.967-3.984 2.5-5.2a6.671 6.671 0 0 1 4.167-1.467c1.666 0 3.166.6 4.333 1.617.2.15.383.333.55.516 1.1 1.2 1.783 2.784 1.783 4.534zM34.15 29.967h-4.967M31.667 27.533v4.983" stroke="${strokeColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5.283 12.4 20 20.915l14.617-8.467M20 36.016V20.9" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M36.017 15.283v9.433c0 .084 0 .15-.017.234a6.535 6.535 0 0 0-4.333-1.617c-1.567 0-3.017.55-4.167 1.467A6.618 6.618 0 0 0 25 30c0 1.25.35 2.433.967 3.433.15.267.333.517.533.75l-3.05 1.683c-1.9 1.067-5 1.067-6.9 0l-8.9-4.933c-2.017-1.117-3.667-3.917-3.667-6.217v-9.433c0-2.3 1.65-5.1 3.667-6.217l8.9-4.933c1.9-1.067 5-1.067 6.9 0l8.9 4.933c2.017 1.117 3.667 3.917 3.667 6.217z" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>    
      `;
        case "chart":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 40 40" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.7 9.95A16.61 16.61 0 0 0 3.333 20c0 9.2 7.467 16.666 16.667 16.666 9.2 0 16.667-7.466 16.667-16.666S29.2 3.333 20 3.333" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8.333 20c0 6.45 5.217 11.666 11.667 11.666S31.667 26.45 31.667 20 26.45 8.333 20 8.333" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20 26.666A6.665 6.665 0 0 0 26.667 20 6.665 6.665 0 0 0 20 13.333" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>    
      `;
        case "direct":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 40 40" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 36.666h10c8.333 0 11.667-3.333 11.667-11.666V15c0-8.334-3.334-11.667-11.667-11.667H15C6.667 3.333 3.333 6.666 3.333 15v10c0 8.333 3.334 11.666 11.667 11.666z" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3.333 21.667H9.6c1.267 0 2.417.717 2.983 1.85l1.484 2.983c.933 1.834 2.6 1.834 3 1.834h5.883a3.333 3.333 0 0 0 2.983-1.85l1.484-2.984a3.333 3.333 0 0 1 2.983-1.85h6.233M17.233 11.667h5.55M15.833 16.667h8.334" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>    
      `;
        case "shop":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 40 40" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.017 18.7v7.483c0 7.484 3 10.484 10.483 10.484h8.983c7.484 0 10.484-3 10.484-10.484V18.7" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20 20c3.05 0 5.3-2.484 5-5.534L23.9 3.333h-7.783L15 14.466C14.7 17.516 16.95 20 20 20z" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M30.517 20c3.366 0 5.833-2.734 5.5-6.084l-.467-4.583c-.6-4.333-2.267-6-6.633-6h-5.084L25 15.016c.283 2.75 2.767 4.984 5.517 4.984zM9.4 20c2.75 0 5.233-2.234 5.5-4.984l.367-3.683.8-8h-5.084c-4.366 0-6.033 1.667-6.633 6l-.45 4.583C3.567 17.266 6.033 20 9.4 20zM20 28.333c-2.783 0-4.167 1.383-4.167 4.167v4.166h8.334V32.5c0-2.784-1.384-4.167-4.167-4.167z" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `;
        case "task-square":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 40 40" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.617 14.8h8.75M10.634 14.8l1.25 1.25 3.75-3.75M20.105 26.043h8.75M10.634 26.468l1.25 1.25 3.75-3.75" stroke="${strokeColor}" stroke-width="1.649" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15 36.667h10c8.334 0 11.667-3.333 11.667-11.666V15c0-8.334-3.333-11.667-11.666-11.667H15c-8.333 0-11.667 3.333-11.667 11.667v10c0 8.333 3.334 11.666 11.667 11.666z" stroke="${strokeColor}" stroke-width="1.649" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `;
        case "suitcase":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 40 40" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M36.667 20v8.334c0 5-3.334 8.333-8.334 8.333H11.667c-5 0-8.334-3.333-8.334-8.333V20c0-4.533 2.734-7.7 6.984-8.233.433-.067.883-.1 1.35-.1h16.666c.434 0 .85.017 1.25.083 4.3.5 7.084 3.684 7.084 8.25z" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M29.586 11.75a7.618 7.618 0 0 0-1.25-.084H11.669c-.467 0-.917.034-1.35.1.233-.466.567-.9.967-1.3l5.416-5.433a5.875 5.875 0 0 1 8.267 0l2.917 2.95a5.623 5.623 0 0 1 1.7 3.767zM36.667 20.833h-5a3.343 3.343 0 0 0-3.334 3.333c0 1.834 1.5 3.334 3.334 3.334h5" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `;
        case "shipping":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 40 40" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 23.333h1.667C23.5 23.333 25 21.833 25 20V3.333H10A6.66 6.66 0 0 0 4.183 6.75" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3.333 28.333c0 2.767 2.234 5 5 5H10C10 31.5 11.5 30 13.333 30c1.834 0 3.334 1.5 3.334 3.333h6.666c0-1.833 1.5-3.333 3.334-3.333C28.5 30 30 31.5 30 33.333h1.667c2.766 0 5-2.233 5-5v-5h-5c-.917 0-1.667-.75-1.667-1.667v-5c0-.916.75-1.666 1.667-1.666h2.15l-2.85-4.984a3.36 3.36 0 0 0-2.9-1.683H25V20c0 1.833-1.5 3.333-3.333 3.333H20" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.333 36.667a3.333 3.333 0 1 0 0-6.667 3.333 3.333 0 0 0 0 6.667zM26.667 36.667a3.333 3.333 0 1 0 0-6.667 3.333 3.333 0 0 0 0 6.667zM36.667 20v3.333h-5c-.917 0-1.667-.75-1.667-1.666v-5c0-.917.75-1.667 1.667-1.667h2.15l2.85 5zM3.333 13.333h10M3.333 18.333H10M3.333 23.333h3.334" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
          
      `;
        case "diagram":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 40 40" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.333 3.333v28.333c0 2.767 2.234 5 5 5h28.334" stroke="${strokeColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="m8.333 28.334 7.65-8.934c1.267-1.466 3.517-1.566 4.884-.183L22.45 20.8a3.34 3.34 0 0 0 4.883-.183L35 11.667" stroke="${strokeColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
          
      `;
        case "graph":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 40 40" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M30.532 20c4.334 0 6.134-1.666 4.534-7.133-1.084-3.683-4.25-6.85-7.934-7.933-5.466-1.6-7.133.2-7.133 4.533v4.8c0 4.067 1.667 5.734 5 5.734h5.534z" stroke="${strokeColor}" stroke-width="1.649" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M33.333 24.501a15.152 15.152 0 0 1-17.367 11.95c-6.316-1.016-11.4-6.1-12.433-12.416a15.168 15.168 0 0 1 11.9-17.35" stroke="${strokeColor}" stroke-width="1.649" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      
      `;
        case "shop":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 40 40" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.017 18.7v7.483c0 7.484 3 10.484 10.483 10.484h8.983c7.484 0 10.484-3 10.484-10.484V18.7" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20 20c3.05 0 5.3-2.484 5-5.534L23.9 3.333h-7.783L15 14.466C14.7 17.516 16.95 20 20 20z" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M30.517 20c3.366 0 5.833-2.734 5.5-6.084l-.467-4.583c-.6-4.333-2.267-6-6.633-6h-5.084L25 15.016c.283 2.75 2.767 4.984 5.517 4.984zM9.4 20c2.75 0 5.233-2.234 5.5-4.984l.367-3.683.8-8h-5.084c-4.366 0-6.033 1.667-6.633 6l-.45 4.583C3.567 17.266 6.033 20 9.4 20zM20 28.333c-2.783 0-4.167 1.383-4.167 4.167v4.166h8.334V32.5c0-2.784-1.384-4.167-4.167-4.167z" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>    
      `;
        case "microphone":
          return `<svg width="${size}" class="${className}" height="${size}" viewBox="0 0 24 24" fill="${strokeColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.12 9.12c-.39 0-.7.31-.7.7v1.58c0 3.54-2.88 6.42-6.42 6.42s-6.42-2.88-6.42-6.42V9.81c0-.39-.31-.7-.7-.7-.39 0-.7.31-.7.7v1.58c0 4.07 3.13 7.42 7.12 7.78v2.13c0 .39.31.7.7.7.39 0 .7-.31.7-.7v-2.13c3.98-.35 7.12-3.71 7.12-7.78V9.81a.707.707 0 0 0-.7-.69z" fill="${strokeColor}"/>
          <path d="M12 2C9.56 2 7.58 3.98 7.58 6.42v5.12c0 2.44 1.98 4.42 4.42 4.42s4.42-1.98 4.42-4.42V6.42C16.42 3.98 14.44 2 12 2zm1.31 6.95c-.07.26-.3.43-.56.43-.05 0-.1-.01-.15-.02-.39-.11-.8-.11-1.19 0-.32.09-.63-.1-.71-.41-.09-.31.1-.63.41-.71.59-.16 1.21-.16 1.8 0 .3.08.48.4.4.71zm.53-1.94a.58.58 0 0 1-.55.38c-.07 0-.13-.01-.2-.03-.7-.26-1.48-.26-2.18 0a.59.59 0 0 1-.75-.35c-.11-.3.05-.64.35-.74a4.36 4.36 0 0 1 2.98 0c.3.11.46.44.35.74z" fill="${strokeColor}"/>
      </svg>   
      `;
        case "qrCode":
          return `<svg width="${size}" class="${className}" height="${size}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${strokeColor}">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
        </svg>
        
      `;
      case "redo":
          return `<svg width="${size}" class="${className}" height="${size}" class="${className}" viewBox="0 0 24 24" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.13 5.69h8c2.76 0 5 2.24 5 5s-2.24 5-5 5h-11" stroke="${strokeColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="m6.43 13.19-2.56 2.56 2.56 2.56" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `;
      case "info":
        return <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" fill={fillColor} viewBox="0 0 24 24" stroke-width="1.5" stroke={strokeColor} className={className}>
          <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>;
      case "warning":
        return <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" fill={fillColor} viewBox="0 0 24 24" stroke-width="1.5" stroke={strokeColor} className={className}>
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>; 
      case "success":
        return <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" fill={fillColor} viewBox="0 0 24 24" stroke-width="1.5" stroke={strokeColor} className={className}>
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>;   
      case "star":
        return <svg width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg" fill={strokeColor} viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>;
      case "export":
        return <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m13 11 8.2-8.2m.8 4V2h-4.8M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
      </svg>;    
      case "excel":
        return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} className={className} fill={fillColor} viewBox="0 0 256 256"><path d="M200,24H72A16,16,0,0,0,56,40V64H40A16,16,0,0,0,24,80v96a16,16,0,0,0,16,16H56v24a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24Zm-40,80h40v48H160Zm40-16H160V80a16,16,0,0,0-16-16V40h56ZM72,40h56V64H72ZM40,80H144v79.83c0,.06,0,.11,0,.17s0,.11,0,.17V176H40ZM72,192h56v24H72Zm72,24V192a16,16,0,0,0,16-16v-8h40v48ZM65.85,146.88,81.59,128,65.85,109.12a8,8,0,0,1,12.3-10.24L92,115.5l13.85-16.62a8,8,0,1,1,12.3,10.24L102.41,128l15.74,18.88a8,8,0,0,1-12.3,10.24L92,140.5,78.15,157.12a8,8,0,0,1-12.3-10.24Z"/></svg>
        
      case "pdf":
        return <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} stroke={strokeColor} fill={fillColor} viewBox="0 0 256 256"><path d="M224,152a8,8,0,0,1-8,8H192v16h16a8,8,0,0,1,0,16H192v16a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8h32A8,8,0,0,1,224,152ZM92,172a28,28,0,0,1-28,28H56v8a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8H64A28,28,0,0,1,92,172Zm-16,0a12,12,0,0,0-12-12H56v24h8A12,12,0,0,0,76,172Zm88,8a36,36,0,0,1-36,36H112a8,8,0,0,1-8-8V152a8,8,0,0,1,8-8h16A36,36,0,0,1,164,180Zm-16,0a20,20,0,0,0-20-20h-8v40h8A20,20,0,0,0,148,180ZM40,112V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0ZM160,80h28.69L160,51.31Z"></path></svg>
      case "error":
        return <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" fill={fillColor} viewBox="0 0 24 24" stroke-width="1.5" stroke={strokeColor} className={className}>
          <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>;      
        // Diğer ikonlar buraya eklenebilir... 
        default:
          return "";
      }
    }
  }
};

export type AppTheme = typeof AppThemeConfig

let currentAppTheme = AppThemeConfig
export function getAppTheme(config?: any): Readonly<AppTheme>{
    if(config) 
    {
      var tmpValue = _.merge(currentAppTheme, removeEmptyProps(config))
      return tmpValue;
    }
    return currentAppTheme;
}
export function useAppTheme(theme: any){
    currentAppTheme = _.merge(currentAppTheme, theme)
    return currentAppTheme;
}