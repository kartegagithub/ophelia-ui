import React from "react";
import { AppThemeType } from "./AppThemeType";
import { merge, removeEmptyProps } from "./Extensions/ReflectionExtensions";

var AppThemeConfig: AppThemeType = {
  Common: {
    Backdrop:
      "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30 transition delay-125",
  },
  Alert: {
    Class:
      "flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-100 dark:bg-gray-800 dark:text-blue-400",
    TextClass: "ms-3 text-sm font-medium",
    ImageClass: "mr-2",
    InfoImage: { name: "info", size: 18, color: "rgb(118, 169, 250)" },
    SuccessImage: { name: "success", size: 18, color: "rgb(49, 196, 141)" },
    ErrorImage: { name: "azError", size: 18, color: "#F00034" },
    WarningImage: { name: "warning", size: 18, color: "rgb(250, 202, 21)" },
    Types: {
      info: "flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-100 dark:bg-gray-800 dark:text-blue-400",
      warning:
        "flex items-center p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
      error:
        "flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",
      success:
        "flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400",
    },
  },
  Binders: {
    SubBinderModal: {
      Class:
        "fixed left-0 top-10 w-full overflow-y-auto overflow-x-hidden outline-none",
    },
  },
  InputFields: {
    RootClass: "w-full",
    LabelClass: "text-[12px] tracking-[.36px] text-manatee",
    ErrorMessageClass: "text-xxs text-azRed",
    InputErrorClass: "border-red-500 hover:border-red-500",
  },
  Tabs: {
    RootClass: "flex gap-4 bg-white text-sm font-medium text-gray-500",
    TabHeaderClass: "flex items-center p-2 text-sm text-gray-500",
    TabContentClass: "text-medium text-gray-500 rounded-lg w-full",
    TabHeaderButtonClass: "p-2 border-b-2 rounded-t-lg text-blueZodiac ",
    SelectedTabHeaderButtonClass:
      "p-2 border-b-2 border-blueZodiac rounded-t-lg text-blueZodiac ",
    TabHeaderButtonContainerClass: "me-4",
    TabPaneClass: "p-4 rounded-lg",
    Types: {
      monochrome: "text-azGray text-xs sm:text-base min-w-30",
      colorful: "text-azBlack text-xs sm:text-base min-w-30",
      rounded:
        "bg-lightSky rounded-md sm:rounded-lg text-azBlack text-xs sm:text-base p-2 sm:p-3 min-w-30",
    },
    SelectedTypes: {
      monochrome:
        "text-azBlack text-xs sm:text-base border-b-2 border-azBlack px-2 py-3 sm:px-4 sm:py-4 min-w-30",
      colorful:
        "text-azBlue text-xs sm:text-base border-b-2 border-azBlue px-2 py-3 sm:px-4 sm:py-4 min-w-30",
      rounded:
        "bg-sky rounded-md sm:rounded-lg text-azBlue border border-azBlue text-xs sm:text-base p-2 sm:p-3 min-w-30",
    },
  },
  Buttons: {
    Priority: {
      primary: "",
      secondary: "border",
      tertiary: "",
    },
    Size: {
      medium: "py-3 sm:py-4 px-5 sm:px-6 text-sm sm:text-base rounded-lg",
      small: "py-2 px-3 text-xxs sm:text-sm rounded-md",
    },
    Background: {
      red: "bg-azRed text-white hover:shadow-primary",
      white:
        "bg-white hover:bg-lightSky text-black hover:text-azRed border-#FFFFFF80",
      stroke:
        "bg-transparent border-pastelBlue hover:border-blue text-black hover:text-azBlue",
      sky: "bg-sky text-black hover:text-azBlue",
      none: "text-black hover:text-azBlue",
    },
  },
  Navigation: {
    Size: {
      medium:
        "text-sm text-azBlack hover:text-cyan py-2 px-3 hover:bg-lightSky hover:rounded font-medium",
      small: "text-xs text-azBlack hover:text-cyan py-1",
    },
    Direction: {
      default:
        "border-2 border-pastelBlue hover:border-black w-12 h-12 rounded-full justify-center",
      filled:
        "border-2 border-black hover:border-azBlue bg-white w-12 h-12 rounded-full justify-center",
      dark: "bg-black w-8 sm:w-12 h-8 sm:h-12 rounded-full justify-center shadow-dark",
      question:
        "border border-pastelBlue bg-white w-8 sm:w-12 h-8 sm:h-12 rounded-full justify-center shadow-dark",
      disableDefault:
        "border-2 border-pastelBlue bg-gray-100 w-12 h-12 rounded-full justify-center",
      disableFilled:
        "border-2 border-pastelBlue bg-white w-12 h-12 rounded-full justify-center",
    },
  },
  Panel: {
    RootClass:
      "bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700",
    HeaderClass:
      "flex flex-1 items-center justify-between border-b border-gray-300 px-3 py-4 md:py-5",
    HeaderTextClass: "flex flex-1 items-center justify-between",
  },
  Pagination: {
    RootClass:
      "bg-white mb-12 p-5 flex flex-col xl:flex-row items-center justify-between gap-y-5",
    PageListClass: "flex gap-4",
    PageListItemClass: "flex items-center gap-2 text-[14px] text-slateGray",
    PageListItemSelectedClass:
      "text-[14px] text-blueZodiac font-bold bg-gainsboro px-3 py-1.5 rounded-lg",
    PageSizeSelectionRootClass:
      "flex items-center gap-6 text-[14px] text-slateGray tracking-[.5px]",
    PageSizeSelectionClass: "px-3 py-2 bg-blackHaze rounded-lg",
    PagesTitleClass: "text-slateGray text-[14px] tracking-[.5px]",
  },
  Carousel: {
    Class: "relative w-full",
    IndicatorClass: "absolute z-30 flex bottom-5 space-x-3 rtl:space-x-reverse",
    RightButtonClass:
      "absolute z-30  -mx-4 items-center justify-center cursor-pointer group focus:outline-none",
    LeftButtonClass:
      "absolute  z-30  -mx-4 items-center justify-center cursor-pointer group focus:outline-none",
  },

  Inputs: {
    text: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    textarea:
      "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    selectboxClass:
      "flex flex-row items-center bg-transparent border border-pastelBlue rounded-lg p-4 text-black text-sm appearance-none focus:border-darkSky block w-full peer focus:outline-none focus:ring-0",
    selectbox:
      "mx-2 bg-transparent border-0  text-black text-sm appearance-none focus:border-none block w-full peer focus:outline-none focus:ring-0",
    filterbox:
      "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2 flex gap-3",
    checkbox:
      "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block py-2",
    radio:
      "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    boolean:
      "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    enum: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    password:
      "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    richtext:
      "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    date: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    datetime:
      "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    numeric:
      "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    label:
      "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    file: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    month:
      "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    email:
      "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full p-2",
    inputLabel:
      "absolute text-xs text-[#9BA0A4] duration-300 transform -translate-y-5 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-2 peer-focus:text-darkSky peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
    floatingFixedLabel:
      "flex gap-x-1 absolute text-xxs text-[#35576B] px-1 z-10 origin-[0] bg-white -top-3 left-3 peer-focus:text-darkSky",
    seperatedLabel: "block mb-2 text-sm font-medium leading-6 text-gray-900",
    phone:
      "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    url: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    range:
      "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    time: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    week: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
  },
  Searchbar: {
    InputClass:
      "h-16 bg-white border border-wildBlueYonder text-slateGray text-base rounded-2xl focus:outline-none block w-full p-2.5 pl-14 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400",
    SearchClass: "absolute left-6 top-5 z-10",
    RightIconsWrapperClass: "flex gap-4 absolute right-6 top-5 z-10",
    SearchIcon: { name: "search", size: 24, color: "#5B6782" },
    MicrophoneIcon: { name: "microphone", size: 24, color: "#D6DAE2" },
    BarcodeIcon: { name: "qrCode", size: 24, color: "#D6DAE2" },
    BadgeClass: "w-8 h-6 bg-terraCotta text-white text-center rounded-2xl",
    ItemClass:
      "flex items-center justify-between mb-1 cursor-pointer hover:bg-gainsboro",
    FocusedItemClass:
      "flex items-center justify-between p-2 mb-6 rounded-[18px] bg-gainsboro",
    ItemIconClass:
      "bg-blackHaze opacity-80 p-6 hover:bg-gainsboro cursor-pointer",
    ItemIconColor: "#252387",
    ItemsContainerClass:
      "absolute w-full h-80 bg-white border-b border-x border-wildBlueYonder rounded-b-2xl z-20",
    ItemsScrollableAreaClass: "h-60 overflow-auto",
    ItemTitleClass:
      "text-[12px] text-outerSpace group-hover:text-blueZodiac tracking-[.42px]",
  },
  ShortcutList: {
    Class: "mt-14 container",
    TitleClass: "text-blueZodiac text-[14px] font-bold mb-5",
    ItemsClass: "flex items-center flex-wrap gap-10",
    ItemClass: "group flex flex-col items-center gap-5 relative",
    ItemIconClass:
      "bg-blackHaze opacity-80 p-6 rounded-[18px] hover:bg-gainsboro cursor-pointer",
    ItemIconColor: "#252387",
    ItemTitleClass:
      "text-[12px] text-outerSpace group-hover:text-blueZodiac tracking-[.42px]",
    BadgeClass:
      "absolute -right-1 -top-1 w-8 h-6 bg-terraCotta text-white text-center rounded-2xl z-10",
  },
  Menu: {
    Class: "overflow-y-auto overflow-x-hidden px-3 -mx-3",
    Levels: {
      Selected: {
        "1": "flex items-center justify-between py-4 text-white px-3 -mx-3 bg-deepBlue rounded-xl",
        "2": "flex items-center justify-between py-4 text-white px-3 -mx-3 mt-2 bg-deepBlue opacity-80 rounded-xl",
        "3": "flex items-center justify-between py-4 text-white px-3 -mx-3 mt-2 bg-deepBlue opacity-60 rounded-xl",
      },
    },
  },
  Sidebar: {
    RootClass: "h-full min-w-[300px] bg-blueZodiac px-5 pt-9 pb-6 text-[12px]",
    ToogleClass: "h-full w-[64px] bg-blueZodiac px-5 pt-11 pb-6",
  },
  Table: {
    Icons: {
      NotFiltered: (
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M18.8 4H5.2a1 1 0 0 0-.7 1.7l5.3 6 .2.7v4.8c0 .2 0 .4.2.4l3 2.3c.3.2.8 0 .8-.4v-7.1c0-.3 0-.5.2-.7l5.3-6a1 1 0 0 0-.7-1.7Z"
          />
        </svg>
      ),
      Filtered: (
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M5 3a2 2 0 0 0-1.5 3.3l5.4 6v5c0 .4.3.9.6 1.1l3.1 2.3c1 .7 2.5 0 2.5-1.2v-7.1l5.4-6C21.6 5 20.7 3 19 3H5Z" />
        </svg>
      ),
      NotSorted: (
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m8 15 4 4 4-4m0-6-4-4-4 4"
          />
        </svg>
      ),
      DescSorted: (
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m8 10 4 4 4-4"
          />
        </svg>
      ),
      AscSorted: (
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m16 14-4-4-4 4"
          />
        </svg>
      ),
    },
    Class:
      "w-full text-[12px] text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-1",
    RowClass:
      "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-paleSilver",
    SelectedRowClass: "px-4 py-2 whitespace-nowrap bg-paleSilver",
    ColumnsRowClass: "",
    SelectedColumnClass:
      "px-4 py-2 whitespace-nowrap border-r border-r-zinc-300",
    ColumnClass: "px-4 py-2 whitespace-nowrap border-r border-r-zinc-300",
    ColumnRootComponentClass:
      "relative sm:flex sm:flex-1 sm:justify-between items-center gap-6",
    ColumnTitleClass: "",
    ColumnButtonsClass: "sm:flex gap-2",
    ContainerClass:
      "relative min-h-[250px] overflow-x-auto scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded",
    TopScrollClass:
      "scrollbar scrollbar-thumb-gray-300 scrollbar-thumb-rounded scrollbar-thin rounded-lg w-full overflow-x-auto bg-gray-200",
    TopScrollbarClass: "h-[0.5px]",
    SelectedCellClass: "px-4 py-2 selected whitespace-nowrap border-r",
    CellClass: "px-4 py-2 whitespace-nowrap border-r",
    HeadClass: "bg-aliceBlue",
    CellTypeClasses: {
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
    },
  },
  Grid: {
    Class: "grid w-full",
    RowClass: "flex flex-nowrap",
    ColumnClass: "",
    ContainerClass: "relative overflow-x-auto",
  },
  Spinner: {
    Class: "",
    TextClass: "sr-only",
    Image: {
      name: "spinner",
      size: 18,
      className: "w-8 h-8 text-gray animate-spin dark:text-gray fill-blueBell",
    },
  },
  IconRating: {
    Class: "flex items-center mb-5",
    TextClass: "ms-1 text-sm font-medium text-gray-500 dark:text-gray-400",
    Icon: { name: "star", className: "w-4 h-4 ms-1 text-gray-300", size: 12 },
    FilledIcon: {
      name: "star",
      className: "w-4 h-4 ms-1 text-yellow-300",
      size: 12,
    },
  },
  Toast: {
    Class:
      "flex items-center w-full max-w-xs p-4 text-gray-200 bg-white rounded-lg shadow dark:text-gray-900 dark:bg-gray",
    TextClass: "ms-3 text-sm font-normal text-white",
    CloseButtonClass:
      "ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700",
    ImageClass:
      "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200",
    InfoImage: { name: "info", size: 18, color: "rgb(118, 169, 250)" },
    SuccessImage: { name: "success", size: 18, color: "rgb(49, 196, 141)" },
    ErrorImage: { name: "error", size: 18, color: "rgb(249, 128, 128)" },
    WarningImage: { name: "warning", size: 18, color: "rgb(250, 202, 21)" },
  },
  Notification: {
    InfoContainer:
      "absolute top-16 right-6 py-2 px-4 min-w-72 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 z-10",
    ErrorContainer:
      "absolute top-16 right-6 py-2 px-4 min-w-72 text-red-800 border border-red-300 rounded-lg bg-red-50 z-10",
    TitleContainer: "flex items-center gap-2",
    ContentClass: "my-2 text-sm",
    InfoImage: { name: "info", size: 18, color: "rgb(118, 169, 250)" },
    SuccessImage: { name: "success", size: 18, color: "rgb(49, 196, 141)" },
    ErrorImage: { name: "error", size: 18, color: "rgb(249, 128, 128)" },
    WarningImage: { name: "warning", size: 18, color: "rgb(250, 202, 21)" },
  },
  SpeedDial: {
    Class: "fixed end-6 bottom-6 group",
    MenuClass: "flex flex-col items-center mb-4 space-y-2",
    MainButtonClass:
      "flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800",
    DialButtonClass:
      "flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400",
    Image: (
      <svg
        className="w-5 h-5 transition-transform group-hover:rotate-45"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 18 18"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 1v16M1 9h16"
        />
      </svg>
    ),
  },
  Progress: {
    Class: "w-full bg-gray-200 rounded-full dark:bg-gray-700",
    BarClass:
      "bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full",
  },
  Modal: {
    DefaultZIndex: "40",
    Class:
      "fixed left-0 top-10 w-full overflow-y-auto overflow-x-hidden outline-none",
    SubClass:
      "pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center transition-all duration-300 ease-in-out sm:mx-auto sm:mt-15 sm:min-h-[calc(100%-3.5rem)] sm:max-w-[800px] w-full",
    ContainerClass:
      "pointer-events-auto  mx-4 relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark",
    HeaderClass:
      "flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10",
    BodyClass: "relative p-4 max-h-[400px] overflow-y-auto",
    FooterClass:
      "flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10",
    TitleClass: "text-xl font-semibold text-gray-900",
    ButtonClass:
      "py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:text-blue-700 focus:z-10 focus:ring-4",
  },
  Dropdown: {
    Class:
      "absolute top-0 left-0 z-10 bg-white shadow w-50 dark:bg-gray-700 transition delay-150",
    ClassWhenInner: "bg-white shadow w-full dark:bg-gray-700",
    ButtonContainerClass: "w-full flex items-center",
    ButtonClass:
      "flex items-center p-3 text-sm font-medium text-black border border-gray-200 bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline",
    ContentClass: "overflow-y-auto text-sm text-gray-700 dark:text-gray-200",
    SuccessClass:
      "flex items-center p-3 text-sm font-medium text-black border border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 bg-red-500",
    ItemClass:
      "flex ps-2 items-center rounded hover:bg-gray-100 dark:hover:bg-gray-600",
    CheckboxClass:
      "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500",
    RadioClass:
      "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500",
    ItemLabelClass:
      "w-full py-2 ms-2 text-[12px] text-cadetBlue rounded cursor-pointer",
    SearchIcon: { name: "search", size: 16, color: "#5B6782" },
  },
  Accordion: {
    DetailClass: "w-full px-5 py-4 border border-darkBlue",
    SummaryClass: "flex items-center justify-between cursor-pointer",
    TitleClass: "flex items-center justify-between font-bold",
    ContentClass: "pt-2.5 pr-5",
  },
  Highlight: {
    Languages: ["javascript", "ruby", "python", "rust", "json", "c#", ""],
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
      "table",
      "clean",
    ],
    Toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  },
  Icons: {
    DefaultSize: "18px",
    getCustomIconSvg: (
      iconName: string,
      size?: string,
      className?: string,
      strokeColor: string | undefined = undefined,
      fillColor: string | undefined = undefined,
      ext1?: string,
      ext2?: string,
      ext3?: string
    ): React.JSX.Element | string => {
      return "";
    },
    getIconSvg: (
      iconName: string,
      size?: string,
      className?: string,
      strokeColor: string | undefined = undefined,
      fillColor: string | undefined = undefined,
      ext1?: string,
      ext2?: string,
      ext3?: string
    ) => {
      if (!strokeColor) strokeColor = "none";
      if (!fillColor) fillColor = "none";
      var theme = getAppTheme();
      if (theme.Icons && theme.Icons.getCustomIconSvg) {
        var icon = theme.Icons.getCustomIconSvg(
          iconName,
          size,
          className,
          strokeColor,
          fillColor,
          ext1,
          ext2,
          ext3
        );
        if (icon && icon != "") return icon;
      }

      switch (iconName) {
        case "spinner":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 100 101"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill={strokeColor}
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill={ext1}
              />
            </svg>
          );
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
          <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" stroke="${strokeColor}" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" class="${ext1}"/>
          <path d="M1.667 10.733V9.266c0-.866.708-1.583 1.583-1.583 1.508 0 2.125-1.067 1.367-2.375A1.583 1.583 0 0 1 5.2 3.15l1.442-.825c.658-.392 1.508-.159 1.9.5l.091.158c.75 1.308 1.984 1.308 2.742 0l.092-.158c.391-.659 1.241-.892 1.9-.5l1.441.825a1.582 1.582 0 0 1 .584 2.158c-.759 1.308-.142 2.375 1.366 2.375.867 0 1.584.708 1.584 1.583v1.467c0 .867-.709 1.583-1.584 1.583-1.508 0-2.125 1.067-1.366 2.375a1.58 1.58 0 0 1-.584 2.158l-1.441.825c-.659.392-1.509.159-1.9-.5l-.092-.158c-.75-1.308-1.983-1.308-2.742 0l-.091.159c-.392.658-1.242.891-1.9.5L5.2 16.848a1.582 1.582 0 0 1-.583-2.158c.758-1.308.141-2.375-1.367-2.375a1.588 1.588 0 0 1-1.583-1.583z" stroke="${
            strokeColor || "white"
          }" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" class="${ext1}"/>
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
          return (
            <svg
              width={size}
              height={size}
              xmlns="http://www.w3.org/2000/svg"
              fill={fillColor}
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke={strokeColor}
              className={className}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          );
        case "warning":
          return (
            <svg
              width={size}
              height={size}
              xmlns="http://www.w3.org/2000/svg"
              fill={fillColor}
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke={strokeColor}
              className={className}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          );
        case "success":
          return (
            <svg
              width={size}
              height={size}
              xmlns="http://www.w3.org/2000/svg"
              fill={fillColor}
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke={strokeColor}
              className={className}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          );
        case "star":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              xmlns="http://www.w3.org/2000/svg"
              fill={strokeColor}
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          );
        case "export":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m13 11 8.2-8.2m.8 4V2h-4.8M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2"
                stroke={strokeColor}
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          );
        case "excel":
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              className={className}
              fill={fillColor}
              viewBox="0 0 256 256"
            >
              <path d="M200,24H72A16,16,0,0,0,56,40V64H40A16,16,0,0,0,24,80v96a16,16,0,0,0,16,16H56v24a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24Zm-40,80h40v48H160Zm40-16H160V80a16,16,0,0,0-16-16V40h56ZM72,40h56V64H72ZM40,80H144v79.83c0,.06,0,.11,0,.17s0,.11,0,.17V176H40ZM72,192h56v24H72Zm72,24V192a16,16,0,0,0,16-16v-8h40v48ZM65.85,146.88,81.59,128,65.85,109.12a8,8,0,0,1,12.3-10.24L92,115.5l13.85-16.62a8,8,0,1,1,12.3,10.24L102.41,128l15.74,18.88a8,8,0,0,1-12.3,10.24L92,140.5,78.15,157.12a8,8,0,0,1-12.3-10.24Z" />
            </svg>
          );

        case "pdf":
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={size}
              width={size}
              stroke={strokeColor}
              fill={fillColor}
              viewBox="0 0 256 256"
            >
              <path d="M224,152a8,8,0,0,1-8,8H192v16h16a8,8,0,0,1,0,16H192v16a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8h32A8,8,0,0,1,224,152ZM92,172a28,28,0,0,1-28,28H56v8a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8H64A28,28,0,0,1,92,172Zm-16,0a12,12,0,0,0-12-12H56v24h8A12,12,0,0,0,76,172Zm88,8a36,36,0,0,1-36,36H112a8,8,0,0,1-8-8V152a8,8,0,0,1,8-8h16A36,36,0,0,1,164,180Zm-16,0a20,20,0,0,0-20-20h-8v40h8A20,20,0,0,0,148,180ZM40,112V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0ZM160,80h28.69L160,51.31Z"></path>
            </svg>
          );
        case "error":
          return (
            <svg
              width={size}
              height={size}
              xmlns="http://www.w3.org/2000/svg"
              fill={fillColor}
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke={strokeColor}
              className={className}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          );
        case "azError":
          return (
            <svg
              width={size}
              height={size}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_6605_86643"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="1"
                y="1"
                width="14"
                height="14"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.00016 1.33398C4.32016 1.33398 1.3335 4.32065 1.3335 8.00065C1.3335 11.6807 4.32016 14.6673 8.00016 14.6673C11.6802 14.6673 14.6668 11.6807 14.6668 8.00065C14.6668 4.32065 11.6802 1.33398 8.00016 1.33398ZM8.00016 8.66732C7.6335 8.66732 7.3335 8.36732 7.3335 8.00065V5.33398C7.3335 4.96732 7.6335 4.66732 8.00016 4.66732C8.36683 4.66732 8.66683 4.96732 8.66683 5.33398V8.00065C8.66683 8.36732 8.36683 8.66732 8.00016 8.66732ZM7.3335 10.0007V11.334H8.66683V10.0007H7.3335Z"
                  fill="black"
                />
              </mask>
              <g mask="url(#mask0_6605_86643)">
                <rect width={size} height={size} fill={strokeColor} />
              </g>
            </svg>
          );
        case "azArrowRight":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32.35 26H8V22H32.35L21.15 10.8L24 8L40 24L24 40L21.15 37.2L32.35 26Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azArrowLeft":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.65 26H40V22H15.65L26.85 10.8L24 8L8 24L24 40L26.85 37.2L15.65 26Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azCheck":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.2 33.2L35.3 19.1L32.5 16.3L21.2 27.6L15.5 21.9L12.7 24.7L21.2 33.2ZM24 44C21.2333 44 18.6333 43.475 16.2 42.425C13.7667 41.375 11.65 39.95 9.85 38.15C8.05 36.35 6.625 34.2333 5.575 31.8C4.525 29.3667 4 26.7667 4 24C4 21.2333 4.525 18.6333 5.575 16.2C6.625 13.7667 8.05 11.65 9.85 9.85C11.65 8.05 13.7667 6.625 16.2 5.575C18.6333 4.525 21.2333 4 24 4C26.7667 4 29.3667 4.525 31.8 5.575C34.2333 6.625 36.35 8.05 38.15 9.85C39.95 11.65 41.375 13.7667 42.425 16.2C43.475 18.6333 44 21.2333 44 24C44 26.7667 43.475 29.3667 42.425 31.8C41.375 34.2333 39.95 36.35 38.15 38.15C36.35 39.95 34.2333 41.375 31.8 42.425C29.3667 43.475 26.7667 44 24 44ZM24 40C28.4667 40 32.25 38.45 35.35 35.35C38.45 32.25 40 28.4667 40 24C40 19.5333 38.45 15.75 35.35 12.65C32.25 9.55 28.4667 8 24 8C19.5333 8 15.75 9.55 12.65 12.65C9.55 15.75 8 19.5333 8 24C8 28.4667 9.55 32.25 12.65 35.35C15.75 38.45 19.5333 40 24 40Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azCongrat":
          return (
            <svg
              width="65"
              height="65"
              viewBox="0 0 65 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="32.5" cy="32.5" r="32.5" fill="#31D265" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M29.1838 41.8128C28.7554 41.8128 28.3457 41.6359 28.0524 41.324L20.5052 33.2863C19.917 32.6625 19.9496 31.6801 20.5734 31.0934C21.1989 30.5068 22.1813 30.5378 22.7664 31.1617L29.1682 37.9764L42.2172 23.6952C42.7976 23.0604 43.7784 23.0185 44.4116 23.5959C45.0433 24.1732 45.0868 25.1556 44.5094 25.7872L30.3291 41.3069C30.0389 41.6266 29.6261 41.8097 29.1946 41.8128H29.1838Z"
                fill="white"
              />
            </svg>
          );
        case "azLocation":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 24C25.1 24 26.0417 23.6083 26.825 22.825C27.6083 22.0417 28 21.1 28 20C28 18.9 27.6083 17.9583 26.825 17.175C26.0417 16.3917 25.1 16 24 16C22.9 16 21.9583 16.3917 21.175 17.175C20.3917 17.9583 20 18.9 20 20C20 21.1 20.3917 22.0417 21.175 22.825C21.9583 23.6083 22.9 24 24 24ZM24 38.7C28.0667 34.9667 31.0833 31.575 33.05 28.525C35.0167 25.475 36 22.7667 36 20.4C36 16.7667 34.8417 13.7917 32.525 11.475C30.2083 9.15833 27.3667 8 24 8C20.6333 8 17.7917 9.15833 15.475 11.475C13.1583 13.7917 12 16.7667 12 20.4C12 22.7667 12.9833 25.475 14.95 28.525C16.9167 31.575 19.9333 34.9667 24 38.7ZM24 44C18.6333 39.4333 14.625 35.1917 11.975 31.275C9.325 27.3583 8 23.7333 8 20.4C8 15.4 9.60833 11.4167 12.825 8.45C16.0417 5.48333 19.7667 4 24 4C28.2333 4 31.9583 5.48333 35.175 8.45C38.3917 11.4167 40 15.4 40 20.4C40 23.7333 38.675 27.3583 36.025 31.275C33.375 35.1917 29.3667 39.4333 24 44Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azSearch":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M39.2 42L26.6 29.4C25.6 30.2 24.45 30.8333 23.15 31.3C21.85 31.7667 20.4667 32 19 32C15.3667 32 12.2917 30.7417 9.775 28.225C7.25833 25.7083 6 22.6333 6 19C6 15.3667 7.25833 12.2917 9.775 9.775C12.2917 7.25833 15.3667 6 19 6C22.6333 6 25.7083 7.25833 28.225 9.775C30.7417 12.2917 32 15.3667 32 19C32 20.4667 31.7667 21.85 31.3 23.15C30.8333 24.45 30.2 25.6 29.4 26.6L42 39.2L39.2 42ZM19 28C21.5 28 23.625 27.125 25.375 25.375C27.125 23.625 28 21.5 28 19C28 16.5 27.125 14.375 25.375 12.625C23.625 10.875 21.5 10 19 10C16.5 10 14.375 10.875 12.625 12.625C10.875 14.375 10 16.5 10 19C10 21.5 10.875 23.625 12.625 25.375C14.375 27.125 16.5 28 19 28Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azNavigate":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.8 42L20.1 27.9L6 22.2V19.4L42 6L28.6 42H25.8ZM27.1 34.6L35.2 12.8L13.4 20.9L23.2 24.8L27.1 34.6Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azChevronDown":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 28.2667L36.2667 16L40 19.7333L24 35.7333L8 19.7333L11.7333 16L24 28.2667Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azChevronDownSm":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 11.5833L13.8333 7.75L15 8.91667L10 13.9167L5 8.91667L6.16667 7.75L10 11.5833Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azChevronUp":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 19.7333L36.2667 32L40 28.2667L24 12.2667L8 28.2667L11.7333 32L24 19.7333Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azChevronRight":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.2667 24L16 11.7333L19.7333 8L35.7333 24L19.7333 40L16 36.2667L28.2667 24Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azChevronLeft":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.7333 24L32 11.7333L28.2667 8L12.2667 24L28.2667 40L32 36.2667L19.7333 24Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azStore":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M42.0939 22.1V38C42.0939 39.1 41.7022 40.0417 40.9189 40.825C40.1355 41.6083 39.1939 42 38.0939 42H10.0939C8.99388 42 8.05221 41.6083 7.26888 40.825C6.48554 40.0417 6.09388 39.1 6.09388 38V22.1C5.32721 21.4 4.73554 20.5 4.31888 19.4C3.90221 18.3 3.89388 17.1 4.29388 15.8L6.39388 9C6.66054 8.13333 7.13554 7.41667 7.81888 6.85C8.50221 6.28333 9.29388 6 10.1939 6H37.9939C38.8939 6 39.6772 6.275 40.3439 6.825C41.0105 7.375 41.4939 8.1 41.7939 9L43.8939 15.8C44.2939 17.1 44.2855 18.2833 43.8689 19.35C43.4522 20.4167 42.8605 21.3333 42.0939 22.1ZM28.4939 20C29.3939 20 30.0772 19.6917 30.5439 19.075C31.0105 18.4583 31.1939 17.7667 31.0939 17L29.9939 10H26.0939V17.4C26.0939 18.1 26.3272 18.7083 26.7939 19.225C27.2605 19.7417 27.8272 20 28.4939 20ZM19.4939 20C20.2605 20 20.8855 19.7417 21.3689 19.225C21.8522 18.7083 22.0939 18.1 22.0939 17.4V10H18.1939L17.0939 17C16.9605 17.8 17.1355 18.5 17.6189 19.1C18.1022 19.7 18.7272 20 19.4939 20ZM10.5939 20C11.1939 20 11.7189 19.7833 12.1689 19.35C12.6189 18.9167 12.8939 18.3667 12.9939 17.7L14.0939 10H10.1939L8.19388 16.7C7.99388 17.3667 8.10221 18.0833 8.51888 18.85C8.93554 19.6167 9.62721 20 10.5939 20ZM37.5939 20C38.5605 20 39.2605 19.6167 39.6939 18.85C40.1272 18.0833 40.2272 17.3667 39.9939 16.7L37.8939 10H34.0939L35.1939 17.7C35.2939 18.3667 35.5689 18.9167 36.0189 19.35C36.4689 19.7833 36.9939 20 37.5939 20ZM10.0939 38H38.0939V23.9C37.9272 23.9667 37.8189 24 37.7689 24H37.5939C36.6939 24 35.9022 23.85 35.2189 23.55C34.5355 23.25 33.8605 22.7667 33.1939 22.1C32.5939 22.7 31.9105 23.1667 31.1439 23.5C30.3772 23.8333 29.5605 24 28.6939 24C27.7939 24 26.9522 23.8333 26.1689 23.5C25.3855 23.1667 24.6939 22.7 24.0939 22.1C23.5272 22.7 22.8689 23.1667 22.1189 23.5C21.3689 23.8333 20.5605 24 19.6939 24C18.7272 24 17.8522 23.8333 17.0689 23.5C16.2855 23.1667 15.5939 22.7 14.9939 22.1C14.2939 22.8 13.6022 23.2917 12.9189 23.575C12.2355 23.8583 11.4605 24 10.5939 24H10.3689C10.2855 24 10.1939 23.9667 10.0939 23.9V38Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azLottery":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.4 32L24 27.8L29.5 32L27.4 25.2L33 20.8H26.2L24 14L21.8 20.8H15L20.5 25.2L18.4 32ZM8 40C6.9 40 5.95833 39.6083 5.175 38.825C4.39167 38.0417 4 37.1 4 36V29.25C4 28.8833 4.11667 28.5667 4.35 28.3C4.58333 28.0333 4.88333 27.8667 5.25 27.8C6.05 27.5333 6.70833 27.05 7.225 26.35C7.74167 25.65 8 24.8667 8 24C8 23.1333 7.74167 22.35 7.225 21.65C6.70833 20.95 6.05 20.4667 5.25 20.2C4.88333 20.1333 4.58333 19.9667 4.35 19.7C4.11667 19.4333 4 19.1167 4 18.75V12C4 10.9 4.39167 9.95833 5.175 9.175C5.95833 8.39167 6.9 8 8 8H40C41.1 8 42.0417 8.39167 42.825 9.175C43.6083 9.95833 44 10.9 44 12V18.75C44 19.1167 43.8833 19.4333 43.65 19.7C43.4167 19.9667 43.1167 20.1333 42.75 20.2C41.95 20.4667 41.2917 20.95 40.775 21.65C40.2583 22.35 40 23.1333 40 24C40 24.8667 40.2583 25.65 40.775 26.35C41.2917 27.05 41.95 27.5333 42.75 27.8C43.1167 27.8667 43.4167 28.0333 43.65 28.3C43.8833 28.5667 44 28.8833 44 29.25V36C44 37.1 43.6083 38.0417 42.825 38.825C42.0417 39.6083 41.1 40 40 40H8ZM8 36H40V30.9C38.7667 30.1667 37.7917 29.1917 37.075 27.975C36.3583 26.7583 36 25.4333 36 24C36 22.5667 36.3583 21.2417 37.075 20.025C37.7917 18.8083 38.7667 17.8333 40 17.1V12H8V17.1C9.23333 17.8333 10.2083 18.8083 10.925 20.025C11.6417 21.2417 12 22.5667 12 24C12 25.4333 11.6417 26.7583 10.925 27.975C10.2083 29.1917 9.23333 30.1667 8 30.9V36Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azTime":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.6 33.4L33.4 30.6L26 23.2V14H22V24.8L30.6 33.4ZM24 44C21.2333 44 18.6333 43.475 16.2 42.425C13.7667 41.375 11.65 39.95 9.85 38.15C8.05 36.35 6.625 34.2333 5.575 31.8C4.525 29.3667 4 26.7667 4 24C4 21.2333 4.525 18.6333 5.575 16.2C6.625 13.7667 8.05 11.65 9.85 9.85C11.65 8.05 13.7667 6.625 16.2 5.575C18.6333 4.525 21.2333 4 24 4C26.7667 4 29.3667 4.525 31.8 5.575C34.2333 6.625 36.35 8.05 38.15 9.85C39.95 11.65 41.375 13.7667 42.425 16.2C43.475 18.6333 44 21.2333 44 24C44 26.7667 43.475 29.3667 42.425 31.8C41.375 34.2333 39.95 36.35 38.15 38.15C36.35 39.95 34.2333 41.375 31.8 42.425C29.3667 43.475 26.7667 44 24 44ZM24 40C28.4333 40 32.2083 38.4417 35.325 35.325C38.4417 32.2083 40 28.4333 40 24C40 19.5667 38.4417 15.7917 35.325 12.675C32.2083 9.55833 28.4333 8 24 8C19.5667 8 15.7917 9.55833 12.675 12.675C9.55833 15.7917 8 19.5667 8 24C8 28.4333 9.55833 32.2083 12.675 35.325C15.7917 38.4417 19.5667 40 24 40Z"
                fill={fillColor}
                className={ext1}
              />
            </svg>
          );
        case "azPrize":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28 26C26.3333 26 24.9167 25.4167 23.75 24.25C22.5833 23.0833 22 21.6667 22 20C22 18.3333 22.5833 16.9167 23.75 15.75C24.9167 14.5833 26.3333 14 28 14C29.6667 14 31.0833 14.5833 32.25 15.75C33.4167 16.9167 34 18.3333 34 20C34 21.6667 33.4167 23.0833 32.25 24.25C31.0833 25.4167 29.6667 26 28 26ZM14 32C12.9 32 11.9583 31.6083 11.175 30.825C10.3917 30.0417 10 29.1 10 28V12C10 10.9 10.3917 9.95833 11.175 9.175C11.9583 8.39167 12.9 8 14 8H42C43.1 8 44.0417 8.39167 44.825 9.175C45.6083 9.95833 46 10.9 46 12V28C46 29.1 45.6083 30.0417 44.825 30.825C44.0417 31.6083 43.1 32 42 32H14ZM18 28H38C38 26.9 38.3917 25.9583 39.175 25.175C39.9583 24.3917 40.9 24 42 24V16C40.9 16 39.9583 15.6083 39.175 14.825C38.3917 14.0417 38 13.1 38 12H18C18 13.1 17.6083 14.0417 16.825 14.825C16.0417 15.6083 15.1 16 14 16V24C15.1 24 16.0417 24.3917 16.825 25.175C17.6083 25.9583 18 26.9 18 28ZM40 40H6C4.9 40 3.95833 39.6083 3.175 38.825C2.39167 38.0417 2 37.1 2 36V14H6V36H40V40Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azFun":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 35C26.2667 35 28.325 34.3583 30.175 33.075C32.025 31.7917 33.3667 30.1 34.2 28H13.8C14.6333 30.1 15.975 31.7917 17.825 33.075C19.675 34.3583 21.7333 35 24 35ZM15.6 22L17.8 19.9L19.9 22L22 19.9L17.8 15.6L13.5 19.9L15.6 22ZM28.1 22L30.2 19.9L32.4 22L34.5 19.9L30.2 15.6L26 19.9L28.1 22ZM24 44C21.2333 44 18.6333 43.475 16.2 42.425C13.7667 41.375 11.65 39.95 9.85 38.15C8.05 36.35 6.625 34.2333 5.575 31.8C4.525 29.3667 4 26.7667 4 24C4 21.2333 4.525 18.6333 5.575 16.2C6.625 13.7667 8.05 11.65 9.85 9.85C11.65 8.05 13.7667 6.625 16.2 5.575C18.6333 4.525 21.2333 4 24 4C26.7667 4 29.3667 4.525 31.8 5.575C34.2333 6.625 36.35 8.05 38.15 9.85C39.95 11.65 41.375 13.7667 42.425 16.2C43.475 18.6333 44 21.2333 44 24C44 26.7667 43.475 29.3667 42.425 31.8C41.375 34.2333 39.95 36.35 38.15 38.15C36.35 39.95 34.2333 41.375 31.8 42.425C29.3667 43.475 26.7667 44 24 44ZM24 40C28.4667 40 32.25 38.45 35.35 35.35C38.45 32.25 40 28.4667 40 24C40 19.5333 38.45 15.75 35.35 12.65C32.25 9.55 28.4667 8 24 8C19.5333 8 15.75 9.55 12.65 12.65C9.55 15.75 8 19.5333 8 24C8 28.4667 9.55 32.25 12.65 35.35C15.75 38.45 19.5333 40 24 40Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              // fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 34H26V22H22V34ZM24 18C24.5667 18 25.0417 17.8083 25.425 17.425C25.8083 17.0417 26 16.5667 26 16C26 15.4333 25.8083 14.9583 25.425 14.575C25.0417 14.1917 24.5667 14 24 14C23.4333 14 22.9583 14.1917 22.575 14.575C22.1917 14.9583 22 15.4333 22 16C22 16.5667 22.1917 17.0417 22.575 17.425C22.9583 17.8083 23.4333 18 24 18ZM24 44C21.2333 44 18.6333 43.475 16.2 42.425C13.7667 41.375 11.65 39.95 9.85 38.15C8.05 36.35 6.625 34.2333 5.575 31.8C4.525 29.3667 4 26.7667 4 24C4 21.2333 4.525 18.6333 5.575 16.2C6.625 13.7667 8.05 11.65 9.85 9.85C11.65 8.05 13.7667 6.625 16.2 5.575C18.6333 4.525 21.2333 4 24 4C26.7667 4 29.3667 4.525 31.8 5.575C34.2333 6.625 36.35 8.05 38.15 9.85C39.95 11.65 41.375 13.7667 42.425 16.2C43.475 18.6333 44 21.2333 44 24C44 26.7667 43.475 29.3667 42.425 31.8C41.375 34.2333 39.95 36.35 38.15 38.15C36.35 39.95 34.2333 41.375 31.8 42.425C29.3667 43.475 26.7667 44 24 44ZM24 40C28.4667 40 32.25 38.45 35.35 35.35C38.45 32.25 40 28.4667 40 24C40 19.5333 38.45 15.75 35.35 12.65C32.25 9.55 28.4667 8 24 8C19.5333 8 15.75 9.55 12.65 12.65C9.55 15.75 8 19.5333 8 24C8 28.4667 9.55 32.25 12.65 35.35C15.75 38.45 19.5333 40 24 40Z"
                fill={fillColor}
                // className={ext1}
              />
            </svg>
          );
        case "az18+":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.6001 43.5996C20.8334 43.5996 18.2334 43.0746 15.8001 42.0246C13.3668 40.9746 11.2501 39.5496 9.4501 37.7496C7.6501 35.9496 6.2251 33.8329 5.1751 31.3996C4.1251 28.9663 3.6001 26.3663 3.6001 23.5996C3.6001 20.8329 4.1251 18.2329 5.1751 15.7996C6.2251 13.3663 7.6501 11.2496 9.4501 9.44961C11.2501 7.64961 13.3668 6.22461 15.8001 5.17461C18.2334 4.12461 20.8334 3.59961 23.6001 3.59961C26.3668 3.59961 28.9668 4.12461 31.4001 5.17461C33.8334 6.22461 35.9501 7.64961 37.7501 9.44961C39.5501 11.2496 40.9751 13.3663 42.0251 15.7996C43.0751 18.2329 43.6001 20.8329 43.6001 23.5996C43.6001 26.3663 43.0751 28.9663 42.0251 31.3996C40.9751 33.8329 39.5501 35.9496 37.7501 37.7496C35.9501 39.5496 33.8334 40.9746 31.4001 42.0246C28.9668 43.0746 26.3668 43.5996 23.6001 43.5996ZM23.6001 39.5996C28.0334 39.5996 31.8084 38.0413 34.9251 34.9246C38.0418 31.8079 39.6001 28.0329 39.6001 23.5996C39.6001 19.1663 38.0418 15.3913 34.9251 12.2746C31.8084 9.15794 28.0334 7.59961 23.6001 7.59961C19.1668 7.59961 15.3918 9.15794 12.2751 12.2746C9.15843 15.3913 7.6001 19.1663 7.6001 23.5996C7.6001 28.0329 9.15843 31.8079 12.2751 34.9246C15.3918 38.0413 19.1668 39.5996 23.6001 39.5996Z"
                fill={strokeColor}
                className={ext1}
              />
              <path
                d="M20.3999 30H17.3999V21H14.3999V18H20.3999V30Z"
                fill={strokeColor}
                className={ext1}
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M30.3999 30H25.3999C24.8332 30 24.3582 29.8083 23.9749 29.425C23.5916 29.0417 23.3999 28.5667 23.3999 28V20C23.3999 19.4333 23.5916 18.9583 23.9749 18.575C24.3582 18.1917 24.8332 18 25.3999 18H30.3999C30.9666 18 31.4416 18.1917 31.8249 18.575C32.2082 18.9583 32.3999 19.4333 32.3999 20V28C32.3999 28.5667 32.2082 29.0417 31.8249 29.425C31.4416 29.8083 30.9666 30 30.3999 30ZM26.3999 23V20H29.3999V23H26.3999ZM26.3999 25V28H29.3999V25H26.3999Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azClose":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8 38L10 35.2L21.2 24L10 12.8L12.8 10L24 21.2L35.2 10L38 12.8L26.8 24L38 35.2L35.2 38L24 26.8L12.8 38Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azTel":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M39.9 42C35.7333 42 31.6167 41.0917 27.55 39.275C23.4833 37.4583 19.7833 34.8833 16.45 31.55C13.1167 28.2167 10.5417 24.5167 8.725 20.45C6.90833 16.3833 6 12.2667 6 8.1C6 7.5 6.2 7 6.6 6.6C7 6.2 7.5 6 8.1 6H16.2C16.6667 6 17.0833 6.15833 17.45 6.475C17.8167 6.79167 18.0333 7.16667 18.1 7.6L19.4 14.6C19.4667 15.1333 19.45 15.5833 19.35 15.95C19.25 16.3167 19.0667 16.6333 18.8 16.9L13.95 21.8C14.6167 23.0333 15.4083 24.225 16.325 25.375C17.2417 26.525 18.25 27.6333 19.35 28.7C20.3833 29.7333 21.4667 30.6917 22.6 31.575C23.7333 32.4583 24.9333 33.2667 26.2 34L30.9 29.3C31.2 29 31.5917 28.775 32.075 28.625C32.5583 28.475 33.0333 28.4333 33.5 28.5L40.4 29.9C40.8667 30.0333 41.25 30.275 41.55 30.625C41.85 30.975 42 31.3667 42 31.8V39.9C42 40.5 41.8 41 41.4 41.4C41 41.8 40.5 42 39.9 42ZM12.05 18L15.35 14.7L14.5 10H10.05C10.2167 11.3667 10.45 12.7167 10.75 14.05C11.05 15.3833 11.4833 16.7 12.05 18ZM29.95 35.9C31.25 36.4667 32.575 36.9167 33.925 37.25C35.275 37.5833 36.6333 37.8 38 37.9V33.5L33.3 32.55L29.95 35.9Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azGames":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.3 27.0004L22 15.7004L33.3 4.40039L44.6 15.7004L33.3 27.0004ZM6 23.0004V7.00039H22V23.0004H6ZM26 43.0004V27.0004H42V43.0004H26ZM6 43.0004V27.0004H22V43.0004H6ZM10 19.0004H18V11.0004H10V19.0004ZM33.35 21.4004L39 15.7504L33.35 10.1004L27.7 15.7504L33.35 21.4004ZM30 39.0004H38V31.0004H30V39.0004ZM10 39.0004H18V31.0004H10V39.0004Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azHamburger":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.76758 36V32H39.7676V36H7.76758ZM7.76758 26V22H39.7676V26H7.76758ZM7.76758 16V12H39.7676V16H7.76758Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azGames":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.3 27.0004L22 15.7004L33.3 4.40039L44.6 15.7004L33.3 27.0004ZM6 23.0004V7.00039H22V23.0004H6ZM26 43.0004V27.0004H42V43.0004H26ZM6 43.0004V27.0004H22V43.0004H6Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azFilledCheck":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.2 33.2L35.3 19.1L32.5 16.3L21.2 27.6L15.5 21.9L12.7 24.7L21.2 33.2ZM24 44C21.2333 44 18.6333 43.475 16.2 42.425C13.7667 41.375 11.65 39.95 9.85 38.15C8.05 36.35 6.625 34.2333 5.575 31.8C4.525 29.3667 4 26.7667 4 24C4 21.2333 4.525 18.6333 5.575 16.2C6.625 13.7667 8.05 11.65 9.85 9.85C11.65 8.05 13.7667 6.625 16.2 5.575C18.6333 4.525 21.2333 4 24 4C26.7667 4 29.3667 4.525 31.8 5.575C34.2333 6.625 36.35 8.05 38.15 9.85C39.95 11.65 41.375 13.7667 42.425 16.2C43.475 18.6333 44 21.2333 44 24C44 26.7667 43.475 29.3667 42.425 31.8C41.375 34.2333 39.95 36.35 38.15 38.15C36.35 39.95 34.2333 41.375 31.8 42.425C29.3667 43.475 26.7667 44 24 44Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azFilledLocation":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 24C25.1 24 26.0417 23.6083 26.825 22.825C27.6083 22.0417 28 21.1 28 20C28 18.9 27.6083 17.9583 26.825 17.175C26.0417 16.3917 25.1 16 24 16C22.9 16 21.9583 16.3917 21.175 17.175C20.3917 17.9583 20 18.9 20 20C20 21.1 20.3917 22.0417 21.175 22.825C21.9583 23.6083 22.9 24 24 24ZM24 44C18.6333 39.4333 14.625 35.1917 11.975 31.275C9.325 27.3583 8 23.7333 8 20.4C8 15.4 9.60833 11.4167 12.825 8.45C16.0417 5.48333 19.7667 4 24 4C28.2333 4 31.9583 5.48333 35.175 8.45C38.3917 11.4167 40 15.4 40 20.4C40 23.7333 38.675 27.3583 36.025 31.275C33.375 35.1917 29.3667 39.4333 24 44Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azArchive":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 20H34V16H24V20ZM24 32H34V28H24V32ZM18 22C19.1 22 20.0417 21.6083 20.825 20.825C21.6083 20.0417 22 19.1 22 18C22 16.9 21.6083 15.9583 20.825 15.175C20.0417 14.3917 19.1 14 18 14C16.9 14 15.9583 14.3917 15.175 15.175C14.3917 15.9583 14 16.9 14 18C14 19.1 14.3917 20.0417 15.175 20.825C15.9583 21.6083 16.9 22 18 22ZM18 34C19.1 34 20.0417 33.6083 20.825 32.825C21.6083 32.0417 22 31.1 22 30C22 28.9 21.6083 27.9583 20.825 27.175C20.0417 26.3917 19.1 26 18 26C16.9 26 15.9583 26.3917 15.175 27.175C14.3917 27.9583 14 28.9 14 30C14 31.1 14.3917 32.0417 15.175 32.825C15.9583 33.6083 16.9 34 18 34ZM10 42C8.9 42 7.95833 41.6083 7.175 40.825C6.39167 40.0417 6 39.1 6 38V10C6 8.9 6.39167 7.95833 7.175 7.175C7.95833 6.39167 8.9 6 10 6H38C39.1 6 40.0417 6.39167 40.825 7.175C41.6083 7.95833 42 8.9 42 10V38C42 39.1 41.6083 40.0417 40.825 40.825C40.0417 41.6083 39.1 42 38 42H10ZM10 38H38V10H10V38Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azTv":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 42V38H20V34H8C6.9 34 5.95833 33.6083 5.175 32.825C4.39167 32.0417 4 31.1 4 30V10C4 8.9 4.39167 7.95833 5.175 7.175C5.95833 6.39167 6.9 6 8 6H40C41.1 6 42.0417 6.39167 42.825 7.175C43.6083 7.95833 44 8.9 44 10V30C44 31.1 43.6083 32.0417 42.825 32.825C42.0417 33.6083 41.1 34 40 34H28V38H32V42H16ZM8 30H40V10H8V30Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azArrowUp":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 40V15.65L10.8 26.85L8 24L24 8L40 24L37.2 26.85L26 15.65V40H22Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azQuestion":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.2001 31C21.2001 28.3 21.4418 26.3583 21.9251 25.175C22.4084 23.9917 23.4334 22.7 25.0001 21.3C26.3668 20.1 27.4084 19.0583 28.1251 18.175C28.8418 17.2917 29.2001 16.2833 29.2001 15.15C29.2001 13.7833 28.7418 12.65 27.8251 11.75C26.9084 10.85 25.6334 10.4 24.0001 10.4C22.3001 10.4 21.0084 10.9167 20.1251 11.95C19.2418 12.9833 18.6168 14.0333 18.2501 15.1L13.1001 12.9C13.8001 10.7667 15.0834 8.91667 16.9501 7.35C18.8168 5.78333 21.1668 5 24.0001 5C27.5001 5 30.1918 5.975 32.0751 7.925C33.9584 9.875 34.9001 12.2167 34.9001 14.95C34.9001 16.6167 34.5418 18.0417 33.8251 19.225C33.1084 20.4083 31.9834 21.75 30.4501 23.25C28.8168 24.8167 27.8251 26.0083 27.4751 26.825C27.1251 27.6417 26.9501 29.0333 26.9501 31H21.2001ZM24.0001 43C22.9001 43 21.9584 42.6083 21.1751 41.825C20.3918 41.0417 20.0001 40.1 20.0001 39C20.0001 37.9 20.3918 36.9583 21.1751 36.175C21.9584 35.3917 22.9001 35 24.0001 35C25.1001 35 26.0418 35.3917 26.8251 36.175C27.6084 36.9583 28.0001 37.9 28.0001 39C28.0001 40.1 27.6084 41.0417 26.8251 41.825C26.0418 42.6083 25.1001 43 24.0001 43Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azNotification":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 38V34H12V20C12 17.2333 12.8333 14.775 14.5 12.625C16.1667 10.475 18.3333 9.06667 21 8.4V7C21 6.16667 21.2917 5.45833 21.875 4.875C22.4583 4.29167 23.1667 4 24 4C24.8333 4 25.5417 4.29167 26.125 4.875C26.7083 5.45833 27 6.16667 27 7V8.4C29.6667 9.06667 31.8333 10.475 33.5 12.625C35.1667 14.775 36 17.2333 36 20V34H40V38H8ZM24 44C22.9 44 21.9583 43.6083 21.175 42.825C20.3917 42.0417 20 41.1 20 40H28C28 41.1 27.6083 42.0417 26.825 42.825C26.0417 43.6083 25.1 44 24 44ZM16 34H32V20C32 17.8 31.2167 15.9167 29.65 14.35C28.0833 12.7833 26.2 12 24 12C21.8 12 19.9167 12.7833 18.35 14.35C16.7833 15.9167 16 17.8 16 20V34Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azFilter":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 42V30H26V34H42V38H26V42H22ZM6 38V34H18V38H6ZM14 30V26H6V22H14V18H18V30H14ZM22 26V22H42V26H22ZM30 18V6H34V10H42V14H34V18H30ZM6 14V10H26V14H6Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azSorting":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 36V32H18V36H6ZM6 26V22H30V26H6ZM6 16V12H42V16H6Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azPlay":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 38V10L38 24L16 38ZM20 30.7L30.5 24L20 17.3V30.7Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azFilledPlay":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 38V10L38 24L16 38Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azPlayCircle":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 33L33 24L19 15V33ZM24 44C21.2333 44 18.6333 43.475 16.2 42.425C13.7667 41.375 11.65 39.95 9.85 38.15C8.05 36.35 6.625 34.2333 5.575 31.8C4.525 29.3667 4 26.7667 4 24C4 21.2333 4.525 18.6333 5.575 16.2C6.625 13.7667 8.05 11.65 9.85 9.85C11.65 8.05 13.7667 6.625 16.2 5.575C18.6333 4.525 21.2333 4 24 4C26.7667 4 29.3667 4.525 31.8 5.575C34.2333 6.625 36.35 8.05 38.15 9.85C39.95 11.65 41.375 13.7667 42.425 16.2C43.475 18.6333 44 21.2333 44 24C44 26.7667 43.475 29.3667 42.425 31.8C41.375 34.2333 39.95 36.35 38.15 38.15C36.35 39.95 34.2333 41.375 31.8 42.425C29.3667 43.475 26.7667 44 24 44ZM24 40C28.4667 40 32.25 38.45 35.35 35.35C38.45 32.25 40 28.4667 40 24C40 19.5333 38.45 15.75 35.35 12.65C32.25 9.55 28.4667 8 24 8C19.5333 8 15.75 9.55 12.65 12.65C9.55 15.75 8 19.5333 8 24C8 28.4667 9.55 32.25 12.65 35.35C15.75 38.45 19.5333 40 24 40Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azQrScan":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 14V4H14V8H8V14H4ZM4 44V34H8V40H14V44H4ZM34 44V40H40V34H44V44H34ZM40 14V8H34V4H44V14H40ZM35 35H38V38H35V35ZM35 29H38V32H35V29ZM32 32H35V35H32V32ZM29 35H32V38H29V35ZM26 32H29V35H26V32ZM32 26H35V29H32V26ZM29 29H32V32H29V29ZM26 26H29V29H26V26ZM38 10V22H26V10H38ZM22 26V38H10V26H22ZM22 10V22H10V10H22ZM19 35V29H13V35H19ZM19 19V13H13V19H19ZM35 19V13H29V19H35Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azBarcodeScan":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 42V32H6V38H12V42H2ZM36 42V38H42V32H46V42H36ZM8 36V12H12V36H8ZM14 36V12H16V36H14ZM20 36V12H24V36H20ZM26 36V12H32V36H26ZM34 36V12H36V36H34ZM38 36V12H40V36H38ZM2 16V6H12V10H6V16H2ZM42 16V10H36V6H46V16H42Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azTicketCheck":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.6 37.6L41.65 30.55L40.25 29.15L34.6 34.8L31.75 31.95L30.35 33.35L34.6 37.6ZM36 43C34.6167 43 33.3167 42.7375 32.1 42.2125C30.8833 41.6875 29.825 40.975 28.925 40.075C28.025 39.175 27.3125 38.1167 26.7875 36.9C26.2625 35.6833 26 34.3833 26 33C26 31.6167 26.2625 30.3167 26.7875 29.1C27.3125 27.8833 28.025 26.825 28.925 25.925C29.825 25.025 30.8833 24.3125 32.1 23.7875C33.3167 23.2625 34.6167 23 36 23C37.3833 23 38.6833 23.2625 39.9 23.7875C41.1167 24.3125 42.175 25.025 43.075 25.925C43.975 26.825 44.6875 27.8833 45.2125 29.1C45.7375 30.3167 46 31.6167 46 33C46 34.3833 45.7375 35.6833 45.2125 36.9C44.6875 38.1167 43.975 39.175 43.075 40.075C42.175 40.975 41.1167 41.6875 39.9 42.2125C38.6833 42.7375 37.3833 43 36 43Z"
                fill={strokeColor}
                className={ext1}
              />
              <path
                d="M23.425 30.425C23.0417 30.8083 22.5667 31 22 31C21.4333 31 20.9583 30.8083 20.575 30.425C20.1917 30.0417 20 29.5667 20 29C20 28.4333 20.1917 27.9583 20.575 27.575C20.9583 27.1917 21.4333 27 22 27C22.5667 27 23.0417 27.1917 23.425 27.575C23.8083 27.9583 24 28.4333 24 29C24 29.5667 23.8083 30.0417 23.425 30.425Z"
                fill={strokeColor}
                className={ext1}
              />
              <path
                d="M23.425 22.425C23.0417 22.8083 22.5667 23 22 23C21.4333 23 20.9583 22.8083 20.575 22.425C20.1917 22.0417 20 21.5667 20 21C20 20.4333 20.1917 19.9583 20.575 19.575C20.9583 19.1917 21.4333 19 22 19C22.5667 19 23.0417 19.1917 23.425 19.575C23.8083 19.9583 24 20.4333 24 21C24 21.5667 23.8083 22.0417 23.425 22.425Z"
                fill={strokeColor}
                className={ext1}
              />
              <path
                d="M23.425 14.425C23.0417 14.8083 22.5667 15 22 15C21.4333 15 20.9583 14.8083 20.575 14.425C20.1917 14.0417 20 13.5667 20 13C20 12.4333 20.1917 11.9583 20.575 11.575C20.9583 11.1917 21.4333 11 22 11C22.5667 11 23.0417 11.1917 23.425 11.575C23.8083 11.9583 24 12.4333 24 13C24 13.5667 23.8083 14.0417 23.425 14.425Z"
                fill={strokeColor}
                className={ext1}
              />
              <path
                d="M35.2 37H38C39.1 37 40.0417 36.6083 40.825 35.825C41.6083 35.0417 42 34.1 42 33V25C40.9 25 39.9583 24.6083 39.175 23.825C39.0346 23.6846 38.9068 23.5391 38.7915 23.3885C37.9021 23.1295 36.9716 23 36 23C35.4146 23 34.8442 23.047 34.2887 23.141C34.4676 23.7775 34.7297 24.3888 35.075 24.975C35.7917 26.1917 36.7667 27.1667 38 27.9V31.4L40.25 29.15L41.65 30.55L35.2 37Z"
                fill={strokeColor}
                className={ext1}
              />
              <path
                d="M34 37L30.35 33.35L30.7 33H26C26 34.3833 26.2625 35.6833 26.7875 36.9C26.8019 36.9335 26.8165 36.9668 26.8312 37H34Z"
                fill={strokeColor}
                className={ext1}
              />
              <path
                d="M24.6785 37H6C4.9 37 3.95833 36.6083 3.175 35.825C2.39167 35.0417 2 34.1 2 33V25C3.1 25 4.04167 24.6083 4.825 23.825C5.60833 23.0417 6 22.1 6 21C6 19.9 5.60833 18.9583 4.825 18.175C4.04167 17.3917 3.1 17 2 17V9C2 7.9 2.39167 6.95833 3.175 6.175C3.95833 5.39167 4.9 5 6 5H38C39.1 5 40.0417 5.39167 40.825 6.175C41.6083 6.95833 42 7.9 42 9V17C40.9 17 39.9583 17.3917 39.175 18.175C38.3917 18.9583 38 19.9 38 21C38 21.0544 38.001 21.1084 38.0029 21.162C37.3487 21.0537 36.6806 21 36 21C35.3209 21 34.6543 21.0535 34.0015 21.1613C34.0005 21.1077 34 21.0539 34 21C34 19.5667 34.3583 18.2417 35.075 17.025C35.7917 15.8083 36.7667 14.8333 38 14.1V9H6V14.1C7.23333 14.8333 8.20833 15.8083 8.925 17.025C9.64167 18.2417 10 19.5667 10 21C10 22.4333 9.64167 23.7583 8.925 24.975C8.20833 26.1917 7.23333 27.1667 6 27.9V33H24C24 34.3894 24.224 35.7268 24.6785 37Z"
                fill={strokeColor}
                className={ext1}
              />
              <path
                d="M32.8 33L34.6 34.8L36.4 33H32.8Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azTicket":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 34C24.5667 34 25.0417 33.8083 25.425 33.425C25.8083 33.0417 26 32.5667 26 32C26 31.4333 25.8083 30.9583 25.425 30.575C25.0417 30.1917 24.5667 30 24 30C23.4333 30 22.9583 30.1917 22.575 30.575C22.1917 30.9583 22 31.4333 22 32C22 32.5667 22.1917 33.0417 22.575 33.425C22.9583 33.8083 23.4333 34 24 34ZM24 26C24.5667 26 25.0417 25.8083 25.425 25.425C25.8083 25.0417 26 24.5667 26 24C26 23.4333 25.8083 22.9583 25.425 22.575C25.0417 22.1917 24.5667 22 24 22C23.4333 22 22.9583 22.1917 22.575 22.575C22.1917 22.9583 22 23.4333 22 24C22 24.5667 22.1917 25.0417 22.575 25.425C22.9583 25.8083 23.4333 26 24 26ZM24 18C24.5667 18 25.0417 17.8083 25.425 17.425C25.8083 17.0417 26 16.5667 26 16C26 15.4333 25.8083 14.9583 25.425 14.575C25.0417 14.1917 24.5667 14 24 14C23.4333 14 22.9583 14.1917 22.575 14.575C22.1917 14.9583 22 15.4333 22 16C22 16.5667 22.1917 17.0417 22.575 17.425C22.9583 17.8083 23.4333 18 24 18ZM40 40H8C6.9 40 5.95833 39.6083 5.175 38.825C4.39167 38.0417 4 37.1 4 36V28C5.1 28 6.04167 27.6083 6.825 26.825C7.60833 26.0417 8 25.1 8 24C8 22.9 7.60833 21.9583 6.825 21.175C6.04167 20.3917 5.1 20 4 20V12C4 10.9 4.39167 9.95833 5.175 9.175C5.95833 8.39167 6.9 8 8 8H40C41.1 8 42.0417 8.39167 42.825 9.175C43.6083 9.95833 44 10.9 44 12V20C42.9 20 41.9583 20.3917 41.175 21.175C40.3917 21.9583 40 22.9 40 24C40 25.1 40.3917 26.0417 41.175 26.825C41.9583 27.6083 42.9 28 44 28V36C44 37.1 43.6083 38.0417 42.825 38.825C42.0417 39.6083 41.1 40 40 40ZM40 36V30.9C38.7667 30.1667 37.7917 29.1917 37.075 27.975C36.3583 26.7583 36 25.4333 36 24C36 22.5667 36.3583 21.2417 37.075 20.025C37.7917 18.8083 38.7667 17.8333 40 17.1V12H8V17.1C9.23333 17.8333 10.2083 18.8083 10.925 20.025C11.6417 21.2417 12 22.5667 12 24C12 25.4333 11.6417 26.7583 10.925 27.975C10.2083 29.1917 9.23333 30.1667 8 30.9V36H40Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azVisible":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 33C26.5 33 28.625 32.125 30.375 30.375C32.125 28.625 33 26.5 33 24C33 21.5 32.125 19.375 30.375 17.625C28.625 15.875 26.5 15 24 15C21.5 15 19.375 15.875 17.625 17.625C15.875 19.375 15 21.5 15 24C15 26.5 15.875 28.625 17.625 30.375C19.375 32.125 21.5 33 24 33ZM24 29.4C22.5 29.4 21.225 28.875 20.175 27.825C19.125 26.775 18.6 25.5 18.6 24C18.6 22.5 19.125 21.225 20.175 20.175C21.225 19.125 22.5 18.6 24 18.6C25.5 18.6 26.775 19.125 27.825 20.175C28.875 21.225 29.4 22.5 29.4 24C29.4 25.5 28.875 26.775 27.825 27.825C26.775 28.875 25.5 29.4 24 29.4ZM24 39C19.1333 39 14.7 37.6417 10.7 34.925C6.7 32.2083 3.8 28.5667 2 24C3.8 19.4333 6.7 15.7917 10.7 13.075C14.7 10.3583 19.1333 9 24 9C28.8667 9 33.3 10.3583 37.3 13.075C41.3 15.7917 44.2 19.4333 46 24C44.2 28.5667 41.3 32.2083 37.3 34.925C33.3 37.6417 28.8667 39 24 39ZM24 35C27.7667 35 31.225 34.0083 34.375 32.025C37.525 30.0417 39.9333 27.3667 41.6 24C39.9333 20.6333 37.525 17.9583 34.375 15.975C31.225 13.9917 27.7667 13 24 13C20.2333 13 16.775 13.9917 13.625 15.975C10.475 17.9583 8.06667 20.6333 6.4 24C8.06667 27.3667 10.475 30.0417 13.625 32.025C16.775 34.0083 20.2333 35 24 35Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azInfo":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.33707 7.33831C7.33689 6.97031 7.6354 6.67149 8.0034 6.67131C8.3714 6.67112 8.67022 6.96964 8.6704 7.33764L8.67207 10.671C8.67226 11.039 8.37374 11.3378 8.00574 11.338C7.63774 11.3382 7.33892 11.0396 7.33874 10.6716L7.33707 7.33831ZM8.0024 4.67131C8.3704 4.67112 8.66922 4.96964 8.6694 5.33764C8.66959 5.70564 8.37107 6.00445 8.00307 6.00464C7.63507 6.00482 7.33625 5.7063 7.33607 5.3383C7.33589 4.97031 7.6344 4.67149 8.0024 4.67131ZM8.00741 14.6713C11.6894 14.6695 14.6726 11.6833 14.6707 8.0013C14.6689 4.3193 11.6827 1.33613 8.00074 1.33797C4.31874 1.33981 1.33556 4.32597 1.3374 8.00797C1.33925 11.69 4.32541 14.6731 8.00741 14.6713Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azGreenCheck":
          return (
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="10" height="10" rx="5" fill="#00C620" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.07784 7.25245C3.98003 7.25245 3.88647 7.21205 3.8195 7.14082L2.09617 5.30552C1.96186 5.16306 1.9693 4.93874 2.11176 4.80478C2.25458 4.67083 2.4789 4.67792 2.6125 4.82038L4.07429 6.37644L7.05388 3.11548C7.18641 2.97054 7.41038 2.96097 7.55496 3.0928C7.69919 3.22463 7.70912 3.44895 7.57729 3.59318L4.33936 7.13693C4.2731 7.20993 4.17883 7.25174 4.08032 7.25245H4.07784Z"
                fill="#FCFFFC"
              />
            </svg>
          );
        case "azRedCross":
          return (
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="10" height="10" rx="5" fill="#FF1200" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.47131 5L6.90225 3.56906C7.03258 3.43873 7.03258 3.22807 6.90225 3.09775C6.77193 2.96742 6.56127 2.96742 6.43094 3.09775L5 4.52869L3.56906 3.09775C3.43873 2.96742 3.22807 2.96742 3.09775 3.09775C2.96742 3.22807 2.96742 3.43873 3.09775 3.56906L4.52869 5L3.09775 6.43094C2.96742 6.56127 2.96742 6.77193 3.09775 6.90225C3.16274 6.96725 3.24807 6.99992 3.3334 6.99992C3.41873 6.99992 3.50406 6.96725 3.56906 6.90225L5 5.47131L6.43094 6.90225C6.49594 6.96725 6.58127 6.99992 6.6666 6.99992C6.75193 6.99992 6.83726 6.96725 6.90225 6.90225C7.03258 6.77193 7.03258 6.56127 6.90225 6.43094L5.47131 5Z"
                fill="white"
              />
            </svg>
          );
        case "azWhiteLine":
          return (
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="10" height="10" rx="5" fill="white" />
              <path
                d="M3 5H7"
                stroke="black"
                stroke-width="0.7"
                stroke-linecap="round"
              />
            </svg>
          );
        case "azNotVisible":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32.2 25.5996L29.3 22.6996C29.6 21.1329 29.15 19.6663 27.95 18.2996C26.75 16.9329 25.2 16.3996 23.3 16.6996L20.4 13.7996C20.9667 13.5329 21.5417 13.3329 22.125 13.1996C22.7083 13.0663 23.3333 12.9996 24 12.9996C26.5 12.9996 28.625 13.8746 30.375 15.6246C32.125 17.3746 33 19.4996 33 21.9996C33 22.6663 32.9333 23.2913 32.8 23.8746C32.6667 24.4579 32.4667 25.0329 32.2 25.5996ZM38.6 31.8996L35.7 29.0996C36.9667 28.1329 38.0917 27.0746 39.075 25.9246C40.0583 24.7746 40.9 23.4663 41.6 21.9996C39.9333 18.6329 37.5417 15.9579 34.425 13.9746C31.3083 11.9913 27.8333 10.9996 24 10.9996C23.0333 10.9996 22.0833 11.0663 21.15 11.1996C20.2167 11.3329 19.3 11.5329 18.4 11.7996L15.3 8.69961C16.6667 8.13294 18.0667 7.70794 19.5 7.42461C20.9333 7.14128 22.4333 6.99961 24 6.99961C29.0333 6.99961 33.5167 8.39128 37.45 11.1746C41.3833 13.9579 44.2333 17.5663 46 21.9996C45.2333 23.9663 44.225 25.7913 42.975 27.4746C41.725 29.1579 40.2667 30.6329 38.6 31.8996ZM39.6 44.1996L31.2 35.8996C30.0333 36.2663 28.8583 36.5413 27.675 36.7246C26.4917 36.9079 25.2667 36.9996 24 36.9996C18.9667 36.9996 14.4833 35.6079 10.55 32.8246C6.61667 30.0413 3.76667 26.4329 2 21.9996C2.7 20.2329 3.58333 18.5913 4.65 17.0746C5.71667 15.5579 6.93333 14.1996 8.3 12.9996L2.8 7.39961L5.6 4.59961L42.4 41.3996L39.6 44.1996ZM11.1 15.7996C10.1333 16.6663 9.25 17.6163 8.45 18.6496C7.65 19.6829 6.96667 20.7996 6.4 21.9996C8.06667 25.3663 10.4583 28.0413 13.575 30.0246C16.6917 32.0079 20.1667 32.9996 24 32.9996C24.6667 32.9996 25.3167 32.9579 25.95 32.8746C26.5833 32.7913 27.2333 32.6996 27.9 32.5996L26.1 30.6996C25.7333 30.7996 25.3833 30.8746 25.05 30.9246C24.7167 30.9746 24.3667 30.9996 24 30.9996C21.5 30.9996 19.375 30.1246 17.625 28.3746C15.875 26.6246 15 24.4996 15 21.9996C15 21.6329 15.025 21.2829 15.075 20.9496C15.125 20.6163 15.2 20.2663 15.3 19.8996L11.1 15.7996Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azPeople":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 36V32.85C0 31.4167 0.733333 30.25 2.2 29.35C3.66667 28.45 5.6 28 8 28C8.43333 28 8.85 28.0083 9.25 28.025C9.65 28.0417 10.0333 28.0833 10.4 28.15C9.93333 28.85 9.58333 29.5833 9.35 30.35C9.11667 31.1167 9 31.9167 9 32.75V36H0ZM12 36V32.75C12 31.6833 12.2917 30.7083 12.875 29.825C13.4583 28.9417 14.2833 28.1667 15.35 27.5C16.4167 26.8333 17.6917 26.3333 19.175 26C20.6583 25.6667 22.2667 25.5 24 25.5C25.7667 25.5 27.3917 25.6667 28.875 26C30.3583 26.3333 31.6333 26.8333 32.7 27.5C33.7667 28.1667 34.5833 28.9417 35.15 29.825C35.7167 30.7083 36 31.6833 36 32.75V36H12ZM39 36V32.75C39 31.8833 38.8917 31.0667 38.675 30.3C38.4583 29.5333 38.1333 28.8167 37.7 28.15C38.0667 28.0833 38.4417 28.0417 38.825 28.025C39.2083 28.0083 39.6 28 40 28C42.4 28 44.3333 28.4417 45.8 29.325C47.2667 30.2083 48 31.3833 48 32.85V36H39ZM16.25 32H31.8C31.4667 31.3333 30.5417 30.75 29.025 30.25C27.5083 29.75 25.8333 29.5 24 29.5C22.1667 29.5 20.4917 29.75 18.975 30.25C17.4583 30.75 16.55 31.3333 16.25 32ZM8 26C6.9 26 5.95833 25.6083 5.175 24.825C4.39167 24.0417 4 23.1 4 22C4 20.8667 4.39167 19.9167 5.175 19.15C5.95833 18.3833 6.9 18 8 18C9.13333 18 10.0833 18.3833 10.85 19.15C11.6167 19.9167 12 20.8667 12 22C12 23.1 11.6167 24.0417 10.85 24.825C10.0833 25.6083 9.13333 26 8 26ZM40 26C38.9 26 37.9583 25.6083 37.175 24.825C36.3917 24.0417 36 23.1 36 22C36 20.8667 36.3917 19.9167 37.175 19.15C37.9583 18.3833 38.9 18 40 18C41.1333 18 42.0833 18.3833 42.85 19.15C43.6167 19.9167 44 20.8667 44 22C44 23.1 43.6167 24.0417 42.85 24.825C42.0833 25.6083 41.1333 26 40 26ZM24 24C22.3333 24 20.9167 23.4167 19.75 22.25C18.5833 21.0833 18 19.6667 18 18C18 16.3 18.5833 14.875 19.75 13.725C20.9167 12.575 22.3333 12 24 12C25.7 12 27.125 12.575 28.275 13.725C29.425 14.875 30 16.3 30 18C30 19.6667 29.425 21.0833 28.275 22.25C27.125 23.4167 25.7 24 24 24ZM24 20C24.5667 20 25.0417 19.8083 25.425 19.425C25.8083 19.0417 26 18.5667 26 18C26 17.4333 25.8083 16.9583 25.425 16.575C25.0417 16.1917 24.5667 16 24 16C23.4333 16 22.9583 16.1917 22.575 16.575C22.1917 16.9583 22 17.4333 22 18C22 18.5667 22.1917 19.0417 22.575 19.425C22.9583 19.8083 23.4333 20 24 20Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azHome":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 38H18V26H30V38H36V20L24 11L12 20V38ZM8 42V18L24 6L40 18V42H26V30H22V42H8Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azFilledHome":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 42V18L24 6L40 18V42H28V28H20V42H8Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azMedia":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 42C6.9 42 5.95833 41.6083 5.175 40.825C4.39167 40.0417 4 39.1 4 38V10C4 8.9 4.39167 7.95833 5.175 7.175C5.95833 6.39167 6.9 6 8 6H40C41.1 6 42.0417 6.39167 42.825 7.175C43.6083 7.95833 44 8.9 44 10V38C44 39.1 43.6083 40.0417 42.825 40.825C42.0417 41.6083 41.1 42 40 42H8ZM8 38H40V10H8V38ZM12 34H36V30H12V34ZM12 26H20V14H12V26ZM24 26H36V22H24V26ZM24 18H36V14H24V18Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azWinner":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 42V38H22V31.8C20.3667 31.4333 18.9083 30.7417 17.625 29.725C16.3417 28.7083 15.4 27.4333 14.8 25.9C12.3 25.6 10.2083 24.5083 8.525 22.625C6.84167 20.7417 6 18.5333 6 16V14C6 12.9 6.39167 11.9583 7.175 11.175C7.95833 10.3917 8.9 10 10 10H14V6H34V10H38C39.1 10 40.0417 10.3917 40.825 11.175C41.6083 11.9583 42 12.9 42 14V16C42 18.5333 41.1583 20.7417 39.475 22.625C37.7917 24.5083 35.7 25.6 33.2 25.9C32.6 27.4333 31.6583 28.7083 30.375 29.725C29.0917 30.7417 27.6333 31.4333 26 31.8V38H34V42H14ZM14 21.6V14H10V16C10 17.2667 10.3667 18.4083 11.1 19.425C11.8333 20.4417 12.8 21.1667 14 21.6ZM24 28C25.6667 28 27.0833 27.4167 28.25 26.25C29.4167 25.0833 30 23.6667 30 22V10H18V22C18 23.6667 18.5833 25.0833 19.75 26.25C20.9167 27.4167 22.3333 28 24 28ZM34 21.6C35.2 21.1667 36.1667 20.4417 36.9 19.425C37.6333 18.4083 38 17.2667 38 16V14H34V21.6Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azCampaign":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.2425 43.3531V30.5896H8.91014C7.27965 30.5896 5.88699 30.0123 4.73216 28.8575C3.57739 27.7026 3 26.31 3 24.6795V19.6496C3 18.0191 3.57739 16.6264 4.73216 15.4716C5.88699 14.3168 7.27965 13.7395 8.91014 13.7395H21.5479L36.1975 5V39.3291L21.5479 30.5896H17.1466V43.3531H12.2425ZM31.2934 30.6149V13.7142L22.9059 18.6436H8.91014C8.65866 18.6436 8.42811 18.7484 8.21848 18.9579C8.00891 19.1676 7.90412 19.3981 7.90412 19.6496V24.6795C7.90412 24.931 8.00891 25.1615 8.21848 25.3712C8.42811 25.5807 8.65866 25.6855 8.91014 25.6855H22.9059L31.2934 30.6149ZM40.7245 32.3628V11.9663C42.0072 13.1274 43.0404 14.5903 43.8242 16.3549C44.6081 18.1196 45 20.0562 45 22.1645C45 24.2729 44.6081 26.2094 43.8242 27.9741C43.0404 29.7388 42.0072 31.2017 40.7245 32.3628Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azResponsible":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33 26L24.7 17.9C23.6667 16.9 22.7917 15.7917 22.075 14.575C21.3583 13.3583 21 12.0333 21 10.6C21 8.76667 21.6417 7.20833 22.925 5.925C24.2083 4.64167 25.7667 4 27.6 4C28.6667 4 29.6667 4.225 30.6 4.675C31.5333 5.125 32.3333 5.73333 33 6.5C33.6667 5.73333 34.4667 5.125 35.4 4.675C36.3333 4.225 37.3333 4 38.4 4C40.2333 4 41.7917 4.64167 43.075 5.925C44.3583 7.20833 45 8.76667 45 10.6C45 12.0333 44.65 13.3583 43.95 14.575C43.25 15.7917 42.3833 16.9 41.35 17.9L33 26ZM33 20.4L38.45 15.05C39.0833 14.4167 39.6667 13.7417 40.2 13.025C40.7333 12.3083 41 11.5 41 10.6C41 9.86667 40.75 9.25 40.25 8.75C39.75 8.25 39.1333 8 38.4 8C37.9333 8 37.4917 8.09167 37.075 8.275C36.6583 8.45833 36.3 8.73333 36 9.1L33 12.7L30 9.1C29.7 8.73333 29.3417 8.45833 28.925 8.275C28.5083 8.09167 28.0667 8 27.6 8C26.8667 8 26.25 8.25 25.75 8.75C25.25 9.25 25 9.86667 25 10.6C25 11.5 25.2667 12.3083 25.8 13.025C26.3333 13.7417 26.9167 14.4167 27.55 15.05L33 20.4ZM15 37L28.9 40.8L40.8 37.1C40.6333 36.8 40.3917 36.5417 40.075 36.325C39.7583 36.1083 39.4 36 39 36H28.9C28 36 27.2833 35.9667 26.75 35.9C26.2167 35.8333 25.6667 35.7 25.1 35.5L20.45 33.95L21.55 30.05L25.6 31.4C26.1667 31.5667 26.8333 31.7 27.6 31.8C28.3667 31.9 29.5 31.9667 31 32C31 31.6333 30.8917 31.2833 30.675 30.95C30.4583 30.6167 30.2 30.4 29.9 30.3L18.2 26H15V37ZM3 44V22H18.2C18.4333 22 18.6667 22.025 18.9 22.075C19.1333 22.125 19.35 22.1833 19.55 22.25L31.3 26.6C32.4 27 33.2917 27.7 33.975 28.7C34.6583 29.7 35 30.8 35 32H39C40.6667 32 42.0833 32.55 43.25 33.65C44.4167 34.75 45 36.2 45 38V40L29 45L15 41.1V44H3ZM7 40H11V26H7V40Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azCart":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 45C14.9 45 13.9583 44.6083 13.175 43.825C12.3917 43.0417 12 42.1 12 41C12 39.9 12.3917 38.9583 13.175 38.175C13.9583 37.3917 14.9 37 16 37C17.1 37 18.0417 37.3917 18.825 38.175C19.6083 38.9583 20 39.9 20 41C20 42.1 19.6083 43.0417 18.825 43.825C18.0417 44.6083 17.1 45 16 45ZM36 45C34.9 45 33.9583 44.6083 33.175 43.825C32.3917 43.0417 32 42.1 32 41C32 39.9 32.3917 38.9583 33.175 38.175C33.9583 37.3917 34.9 37 36 37C37.1 37 38.0417 37.3917 38.825 38.175C39.6083 38.9583 40 39.9 40 41C40 42.1 39.6083 43.0417 38.825 43.825C38.0417 44.6083 37.1 45 36 45ZM14.3 13L19.1 23H33.1L38.6 13H14.3ZM12.4 9H41.9C42.6667 9 43.25 9.34167 43.65 10.025C44.05 10.7083 44.0667 11.4 43.7 12.1L36.6 24.9C36.2333 25.5667 35.7417 26.0833 35.125 26.45C34.5083 26.8167 33.8333 27 33.1 27H18.2L16 31H40V35H16C14.5 35 13.3667 34.3417 12.6 33.025C11.8333 31.7083 11.8 30.4 12.5 29.1L15.2 24.2L8 9H4V5H10.5L12.4 9Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azPhone":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 46C12.9 46 11.9583 45.6083 11.175 44.825C10.3917 44.0417 10 43.1 10 42V6C10 4.9 10.3917 3.95833 11.175 3.175C11.9583 2.39167 12.9 2 14 2H34C35.1 2 36.0417 2.39167 36.825 3.175C37.6083 3.95833 38 4.9 38 6V42C38 43.1 37.6083 44.0417 36.825 44.825C36.0417 45.6083 35.1 46 34 46H14ZM14 40V42H34V40H14ZM14 36H34V12H14V36ZM14 8H34V6H14V8Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azGift":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 45V23H4V11H14.4C14.2333 10.7 14.125 10.3833 14.075 10.05C14.025 9.71667 14 9.36667 14 9C14 7.33333 14.5833 5.91667 15.75 4.75C16.9167 3.58333 18.3333 3 20 3C20.7667 3 21.4833 3.14167 22.15 3.425C22.8167 3.70833 23.4333 4.1 24 4.6C24.5667 4.06667 25.1833 3.66667 25.85 3.4C26.5167 3.13333 27.2333 3 28 3C29.6667 3 31.0833 3.58333 32.25 4.75C33.4167 5.91667 34 7.33333 34 9C34 9.36667 33.9667 9.70833 33.9 10.025C33.8333 10.3417 33.7333 10.6667 33.6 11H44V23H40V45H8ZM28 7C27.4333 7 26.9583 7.19167 26.575 7.575C26.1917 7.95833 26 8.43333 26 9C26 9.56667 26.1917 10.0417 26.575 10.425C26.9583 10.8083 27.4333 11 28 11C28.5667 11 29.0417 10.8083 29.425 10.425C29.8083 10.0417 30 9.56667 30 9C30 8.43333 29.8083 7.95833 29.425 7.575C29.0417 7.19167 28.5667 7 28 7ZM18 9C18 9.56667 18.1917 10.0417 18.575 10.425C18.9583 10.8083 19.4333 11 20 11C20.5667 11 21.0417 10.8083 21.425 10.425C21.8083 10.0417 22 9.56667 22 9C22 8.43333 21.8083 7.95833 21.425 7.575C21.0417 7.19167 20.5667 7 20 7C19.4333 7 18.9583 7.19167 18.575 7.575C18.1917 7.95833 18 8.43333 18 9ZM8 15V19H22V15H8ZM22 41V23H12V41H22ZM26 41H36V23H26V41ZM40 19V15H26V19H40Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azEmail":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 40C6.9 40 5.95833 39.6083 5.175 38.825C4.39167 38.0417 4 37.1 4 36V12C4 10.9 4.39167 9.95833 5.175 9.175C5.95833 8.39167 6.9 8 8 8H40C41.1 8 42.0417 8.39167 42.825 9.175C43.6083 9.95833 44 10.9 44 12V36C44 37.1 43.6083 38.0417 42.825 38.825C42.0417 39.6083 41.1 40 40 40H8ZM24 26L8 16V36H40V16L24 26ZM24 22L40 12H8L24 22ZM8 16V12V36V16Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azAttach":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37 31.5C37 34.9667 35.7833 37.9167 33.35 40.35C30.9167 42.7833 27.9667 44 24.5 44C21.0333 44 18.0833 42.7833 15.65 40.35C13.2167 37.9167 12 34.9667 12 31.5V13C12 10.5 12.875 8.375 14.625 6.625C16.375 4.875 18.5 4 21 4C23.5 4 25.625 4.875 27.375 6.625C29.125 8.375 30 10.5 30 13V30.5C30 32.0333 29.4667 33.3333 28.4 34.4C27.3333 35.4667 26.0333 36 24.5 36C22.9667 36 21.6667 35.4667 20.6 34.4C19.5333 33.3333 19 32.0333 19 30.5V12H23V30.5C23 30.9333 23.1417 31.2917 23.425 31.575C23.7083 31.8583 24.0667 32 24.5 32C24.9333 32 25.2917 31.8583 25.575 31.575C25.8583 31.2917 26 30.9333 26 30.5V13C25.9667 11.6 25.475 10.4167 24.525 9.45C23.575 8.48333 22.4 8 21 8C19.6 8 18.4167 8.48333 17.45 9.45C16.4833 10.4167 16 11.6 16 13V31.5C15.9667 33.8667 16.7833 35.875 18.45 37.525C20.1167 39.175 22.1333 40 24.5 40C26.8333 40 28.8167 39.175 30.45 37.525C32.0833 35.875 32.9333 33.8667 33 31.5V12H37V31.5Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azDownload":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 32L15 22L17.8 19.1L23 24.3V8H27V24.3L32.2 19.1L35 22L25 32ZM13 40C11.9 40 10.9583 39.6083 10.175 38.825C9.39167 38.0417 9 37.1 9 36V30H13V36H37V30H41V36C41 37.1 40.6083 38.0417 39.825 38.825C39.0417 39.6083 38.1 40 37 40H13Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azEducation":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 42L10 34.4V22.4L2 18L24 6L46 18V34H42V20.2L38 22.4V34.4L24 42ZM24 25.4L37.7 18L24 10.6L10.3 18L24 25.4ZM24 37.45L34 32.05V24.5L24 30L14 24.5V32.05L24 37.45Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azSport":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 44C21.2333 44 18.6333 43.475 16.2 42.425C13.7667 41.375 11.65 39.95 9.85 38.15C8.05 36.35 6.625 34.2333 5.575 31.8C4.525 29.3667 4 26.7667 4 24C4 21.2333 4.525 18.6333 5.575 16.2C6.625 13.7667 8.05 11.65 9.85 9.85C11.65 8.05 13.7667 6.625 16.2 5.575C18.6333 4.525 21.2333 4 24 4C26.7667 4 29.3667 4.525 31.8 5.575C34.2333 6.625 36.35 8.05 38.15 9.85C39.95 11.65 41.375 13.7667 42.425 16.2C43.475 18.6333 44 21.2333 44 24C44 26.7667 43.475 29.3667 42.425 31.8C41.375 34.2333 39.95 36.35 38.15 38.15C36.35 39.95 34.2333 41.375 31.8 42.425C29.3667 43.475 26.7667 44 24 44ZM34 19L36.7 18.1L37.5 15.4C36.4333 13.8 35.15 12.425 33.65 11.275C32.15 10.125 30.5 9.26667 28.7 8.7L26 10.6V13.4L34 19ZM14 19L22 13.4V10.6L19.3 8.7C17.5 9.26667 15.85 10.125 14.35 11.275C12.85 12.425 11.5667 13.8 10.5 15.4L11.3 18.1L14 19ZM11.9 34.4L14.2 34.2L15.7 31.5L12.8 22.8L10 21.8L8 23.3C8 25.4667 8.3 27.4417 8.9 29.225C9.5 31.0083 10.5 32.7333 11.9 34.4ZM24 40C24.8667 40 25.7167 39.9333 26.55 39.8C27.3833 39.6667 28.2 39.4667 29 39.2L30.4 36.2L29.1 34H18.9L17.6 36.2L19 39.2C19.8 39.4667 20.6167 39.6667 21.45 39.8C22.2833 39.9333 23.1333 40 24 40ZM19.5 30H28.5L31.3 22L24 16.9L16.8 22L19.5 30ZM36.1 34.4C37.5 32.7333 38.5 31.0083 39.1 29.225C39.7 27.4417 40 25.4667 40 23.3L38 21.9L35.2 22.8L32.3 31.5L33.8 34.2L36.1 34.4Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azCopy":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 19 19"
              fill={fillColor}
            >
              <path
                d="M18.6484 2.74609C18.8594 2.95703 19 3.23828 19 3.55469V11.5C19 12.7656 17.9805 13.75 16.75 13.75H10C8.73438 13.75 7.75 12.7656 7.71484 11.5V2.5C7.71484 1.26953 8.69922 0.25 9.96484 0.25H15.6953C16.0117 0.25 16.293 0.390625 16.5039 0.601562L18.6484 2.74609ZM17.3125 11.5H17.2773V4.75H15.625C14.9922 4.75 14.5 4.25781 14.5 3.625L14.4648 1.97266H9.96484C9.64844 1.97266 9.40234 2.21875 9.40234 2.53516V11.5C9.40234 11.8164 9.64844 12.0625 9.96484 12.0625H16.75C17.0312 12.0625 17.3125 11.8164 17.3125 11.5ZM10.5625 16V14.875H12.25V16C12.25 17.2656 11.2305 18.25 10 18.25H3.25C1.98438 18.25 1 17.2656 1 16L0.964844 7C0.964844 5.76953 1.98438 4.75 3.21484 4.75H6.625V6.47266H3.21484C2.93359 6.47266 2.65234 6.71875 2.65234 7.03516V16C2.65234 16.3164 2.89844 16.5625 3.21484 16.5625H10C10.2812 16.5625 10.5625 16.3164 10.5625 16Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azInnovation":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 44C22.9 44 21.9583 43.6083 21.175 42.825C20.3917 42.0417 20 41.1 20 40H28C28 41.1 27.6083 42.0417 26.825 42.825C26.0417 43.6083 25.1 44 24 44ZM16 38V34H32V38H16ZM16.5 32C14.2 30.6333 12.375 28.8 11.025 26.5C9.675 24.2 9 21.7 9 19C9 14.8333 10.4583 11.2917 13.375 8.375C16.2917 5.45833 19.8333 4 24 4C28.1667 4 31.7083 5.45833 34.625 8.375C37.5417 11.2917 39 14.8333 39 19C39 21.7 38.325 24.2 36.975 26.5C35.625 28.8 33.8 30.6333 31.5 32H16.5ZM17.7 28H30.3C31.8 26.9333 32.9583 25.6167 33.775 24.05C34.5917 22.4833 35 20.8 35 19C35 15.9333 33.9333 13.3333 31.8 11.2C29.6667 9.06667 27.0667 8 24 8C20.9333 8 18.3333 9.06667 16.2 11.2C14.0667 13.3333 13 15.9333 13 19C13 20.8 13.4083 22.4833 14.225 24.05C15.0417 25.6167 16.2 26.9333 17.7 28Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azMoney":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 22 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 9C12.1667 9 11.4583 8.70833 10.875 8.125C10.2917 7.54167 10 6.83333 10 6C10 5.16667 10.2917 4.45833 10.875 3.875C11.4583 3.29167 12.1667 3 13 3C13.8333 3 14.5417 3.29167 15.125 3.875C15.7083 4.45833 16 5.16667 16 6C16 6.83333 15.7083 7.54167 15.125 8.125C14.5417 8.70833 13.8333 9 13 9ZM6 12C5.45 12 4.97917 11.8042 4.5875 11.4125C4.19583 11.0208 4 10.55 4 10V2C4 1.45 4.19583 0.979167 4.5875 0.5875C4.97917 0.195833 5.45 0 6 0H20C20.55 0 21.0208 0.195833 21.4125 0.5875C21.8042 0.979167 22 1.45 22 2V10C22 10.55 21.8042 11.0208 21.4125 11.4125C21.0208 11.8042 20.55 12 20 12H6ZM8 10H18C18 9.45 18.1958 8.97917 18.5875 8.5875C18.9792 8.19583 19.45 8 20 8V4C19.45 4 18.9792 3.80417 18.5875 3.4125C18.1958 3.02083 18 2.55 18 2H8C8 2.55 7.80417 3.02083 7.4125 3.4125C7.02083 3.80417 6.55 4 6 4V8C6.55 8 7.02083 8.19583 7.4125 8.5875C7.80417 8.97917 8 9.45 8 10ZM19 16H2C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V3H2V14H19V16Z"
                fill={fillColor}
              />
            </svg>
          );
        case "azMoneyIn":
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              viewBox="0 0 26 29"
              fill={fillColor}
            >
              <path
                d="M7.35484 23L11.0639 23C11.3133 23 11.5155 22.7868 11.5155 22.5238C11.5155 22.2608 11.3133 22.0476 11.0639 22.0476L9.5805 22.0476C9.38187 20.59 8.28561 19.4341 6.90323 19.2246L6.90323 16.7754C8.28564 16.5659 9.38187 15.41 9.5805 13.9524L16.4195 13.9524C16.6181 15.41 17.7144 16.5659 19.0968 16.7754L19.0968 19.2246C17.7144 19.4341 16.6181 20.59 16.4195 22.0476L10.7064 22.0476C10.457 22.0476 10.2548 22.2608 10.2548 22.5238C10.2548 22.7868 10.457 23 10.7064 23L18.6452 23C19.3922 23 20 22.3592 20 21.5714L20 14.4286C20 13.6408 19.3922 13 18.6452 13L7.35484 13C6.60776 13 6 13.6408 6 14.4286L6 21.5714C6 22.3592 6.60776 23 7.35484 23ZM8.66424 22.0476L7.35484 22.0476C7.10583 22.0476 6.90323 21.834 6.90323 21.5714L6.90323 20.1908C7.7867 20.3806 8.48418 21.1161 8.66424 22.0476ZM18.6452 22.0476L17.3358 22.0476C17.5158 21.1161 18.2133 20.3806 19.0968 20.1908L19.0968 21.5714C19.0968 21.834 18.8942 22.0476 18.6452 22.0476ZM19.0968 14.4286L19.0968 15.8092C18.2133 15.6194 17.5158 14.8839 17.3358 13.9524L18.6452 13.9524C18.8942 13.9524 19.0968 14.166 19.0968 14.4286ZM7.35484 13.9524L8.66424 13.9524C8.48418 14.8839 7.78669 15.6194 6.90323 15.8092L6.90323 14.4286C6.90323 14.166 7.10583 13.9524 7.35484 13.9524ZM15.4839 18C15.4839 16.5559 14.3696 15.381 13 15.381C11.6304 15.381 10.5161 16.5559 10.5161 18C10.5161 19.4441 11.6304 20.619 13 20.619C14.3696 20.619 15.4839 19.4442 15.4839 18ZM11.4194 18C11.4194 17.081 12.1284 16.3333 13 16.3333C13.8716 16.3333 14.5806 17.081 14.5806 18C14.5806 18.919 13.8716 19.6667 13 19.6667C12.1284 19.6667 11.4194 18.919 11.4194 18ZM16.6129 18.4762C16.3635 18.4762 16.1613 18.263 16.1613 18C16.1613 17.737 16.3635 17.5238 16.6129 17.5238L16.8387 17.5238C17.0881 17.5238 17.2903 17.737 17.2903 18C17.2903 18.263 17.0881 18.4762 16.8387 18.4762L16.6129 18.4762ZM9.3871 17.5238C9.63653 17.5238 9.83871 17.737 9.83871 18C9.83871 18.263 9.63653 18.4762 9.3871 18.4762L9.16129 18.4762C8.91186 18.4762 8.70968 18.263 8.70968 18C8.70968 17.737 8.91186 17.5238 9.16129 17.5238L9.3871 17.5238Z"
                fill={strokeColor}
                className={ext1}
              />
              <path
                d="M21 8V8C23.2091 8 25 9.79086 25 12L25 24C25 26.2091 23.2091 28 21 28L5 28C2.79086 28 1 26.2091 1 24L1 11.5C1 9.567 2.567 8 4.5 8V8"
                stroke={ext2}
                stroke-linecap="round"
                fill={strokeColor}
              />
              <path
                d="M16.035 7.21484L13 10.2498L9.96497 7.21484"
                stroke={ext2}
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill={strokeColor}
              />
              <path
                d="M13 3V10"
                stroke={ext2}
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill={strokeColor}
              />
            </svg>
          );
        case "azMoneyOut":
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              viewBox="0 0 26 29"
              fill={fillColor}
            >
              <path
                d="M18.6452 6H14.9361C14.6867 6 14.4845 6.21318 14.4845 6.47619C14.4845 6.7392 14.6867 6.95238 14.9361 6.95238H16.4195C16.6181 8.41003 17.7144 9.56592 19.0968 9.77536V12.2246C17.7144 12.4341 16.6181 13.59 16.4195 15.0476H9.5805C9.38187 13.59 8.28561 12.4341 6.90323 12.2246V9.77536C8.28564 9.56592 9.38187 8.41003 9.5805 6.95238H15.2936C15.543 6.95238 15.7452 6.7392 15.7452 6.47619C15.7452 6.21318 15.543 6 15.2936 6H7.35484C6.60776 6 6 6.64083 6 7.42857V14.5714C6 15.3592 6.60776 16 7.35484 16H18.6452C19.3922 16 20 15.3592 20 14.5714V7.42857C20 6.64083 19.3922 6 18.6452 6ZM17.3358 6.95238H18.6452C18.8942 6.95238 19.0968 7.16601 19.0968 7.42857V8.80923C18.2133 8.61937 17.5158 7.88393 17.3358 6.95238ZM7.35484 6.95238H8.66423C8.48418 7.88393 7.78669 8.61937 6.90323 8.80923V7.42857C6.90323 7.16598 7.10583 6.95238 7.35484 6.95238ZM6.90323 14.5714V13.1908C7.78669 13.3806 8.48418 14.1161 8.66423 15.0476H7.35484C7.10583 15.0476 6.90323 14.834 6.90323 14.5714ZM18.6452 15.0476H17.3358C17.5158 14.1161 18.2133 13.3806 19.0968 13.1908V14.5714C19.0968 14.834 18.8942 15.0476 18.6452 15.0476ZM10.5161 11C10.5161 12.4441 11.6304 13.619 13 13.619C14.3696 13.619 15.4839 12.4441 15.4839 11C15.4839 9.55586 14.3696 8.38095 13 8.38095C11.6304 8.38095 10.5161 9.55583 10.5161 11ZM14.5806 11C14.5806 11.919 13.8716 12.6667 13 12.6667C12.1284 12.6667 11.4194 11.919 11.4194 11C11.4194 10.081 12.1284 9.33333 13 9.33333C13.8716 9.33333 14.5806 10.081 14.5806 11ZM9.3871 10.5238C9.63653 10.5238 9.83871 10.737 9.83871 11C9.83871 11.263 9.63653 11.4762 9.3871 11.4762H9.16129C8.91186 11.4762 8.70968 11.263 8.70968 11C8.70968 10.737 8.91186 10.5238 9.16129 10.5238H9.3871ZM16.6129 11.4762C16.3635 11.4762 16.1613 11.263 16.1613 11C16.1613 10.737 16.3635 10.5238 16.6129 10.5238H16.8387C17.0881 10.5238 17.2903 10.737 17.2903 11C17.2903 11.263 17.0881 11.4762 16.8387 11.4762H16.6129Z"
                fill={strokeColor}
                className={ext1}
              />
              <path
                d="M5 21V21C2.79086 21 1 19.2091 1 17V5C1 2.79086 2.79086 1 5 1H21C23.2091 1 25 2.79086 25 5V17.5C25 19.433 23.433 21 21.5 21V21"
                stroke={ext2}
                stroke-linecap="round"
                fill={strokeColor}
              />
              <path
                d="M16.035 24.2148L13 27.2498L9.96497 24.2148"
                stroke={ext2}
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill={strokeColor}
              />
              <path
                d="M13 20V27"
                stroke={ext2}
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill={strokeColor}
              />
            </svg>
          );
        case "azEco":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.8 36.1846C10.3 34.6846 9.125 32.9513 8.275 30.9846C7.425 29.0179 7 26.9846 7 24.8846C7 22.7846 7.4 20.7096 8.2 18.6596C9 16.6096 10.3 14.6846 12.1 12.8846C13.2667 11.7179 14.7083 10.7179 16.425 9.88462C18.1417 9.05128 20.175 8.39295 22.525 7.90962C24.875 7.42628 27.5583 7.13462 30.575 7.03462C33.5917 6.93462 36.9667 7.05128 40.7 7.38462C40.9667 10.9179 41.05 14.1679 40.95 17.1346C40.85 20.1013 40.575 22.7763 40.125 25.1596C39.675 27.5429 39.0417 29.6263 38.225 31.4096C37.4083 33.1929 36.4 34.6846 35.2 35.8846C33.4333 37.6513 31.5583 38.9429 29.575 39.7596C27.5917 40.5763 25.5667 40.9846 23.5 40.9846C21.3333 40.9846 19.2167 40.5596 17.15 39.7096C15.0833 38.8596 13.3 37.6846 11.8 36.1846ZM17.4 35.3846C18.3667 35.9513 19.3583 36.3596 20.375 36.6096C21.3917 36.8596 22.4333 36.9846 23.5 36.9846C25.0333 36.9846 26.55 36.6763 28.05 36.0596C29.55 35.4429 30.9833 34.4513 32.35 33.0846C32.95 32.4846 33.5583 31.6429 34.175 30.5596C34.7917 29.4763 35.325 28.0596 35.775 26.3096C36.225 24.5596 36.5667 22.4429 36.8 19.9596C37.0333 17.4763 37.0667 14.5179 36.9 11.0846C35.2667 11.0179 33.425 10.9929 31.375 11.0096C29.325 11.0263 27.2833 11.1846 25.25 11.4846C23.2167 11.7846 21.2833 12.2679 19.45 12.9346C17.6167 13.6013 16.1167 14.5179 14.95 15.6846C13.45 17.1846 12.4167 18.6679 11.85 20.1346C11.2833 21.6013 11 23.0179 11 24.3846C11 26.3513 11.375 28.0763 12.125 29.5596C12.875 31.0429 13.5333 32.0846 14.1 32.6846C15.5 30.0179 17.35 27.4596 19.65 25.0096C21.95 22.5596 24.6333 20.5513 27.7 18.9846C25.3 21.0846 23.2083 23.4596 21.425 26.1096C19.6417 28.7596 18.3 31.8513 17.4 35.3846Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azContinuous":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.0455 38.7727C14.8939 37.3182 12.3333 35.1212 10.3636 32.1818C8.39394 29.2424 7.40909 25.9242 7.40909 22.2273C7.40909 21.4394 7.44697 20.6667 7.52273 19.9091C7.59848 19.1515 7.72727 18.4091 7.90909 17.6818L5.81818 18.9091L4 15.7727L12.6818 10.7727L17.6818 19.4091L14.5 21.2273L12.0455 16.9545C11.7121 17.7727 11.4621 18.6212 11.2955 19.5C11.1288 20.3788 11.0455 21.2879 11.0455 22.2273C11.0455 25.1667 11.8485 27.8409 13.4545 30.25C15.0606 32.6591 17.197 34.4394 19.8636 35.5909L18.0455 38.7727ZM31.9545 16.7273V13.0909H36.9091C35.5152 11.3636 33.8333 10.0227 31.8636 9.06818C29.8939 8.11364 27.803 7.63636 25.5909 7.63636C23.9242 7.63636 22.3485 7.89394 20.8636 8.40909C19.3788 8.92424 18.0152 9.65152 16.7727 10.5909L14.9545 7.40909C16.4697 6.34848 18.1212 5.51515 19.9091 4.90909C21.697 4.30303 23.5909 4 25.5909 4C27.9848 4 30.2727 4.44697 32.4545 5.34091C34.6364 6.23485 36.5909 7.5303 38.3182 9.22727V6.72727H41.9545V16.7273H31.9545ZM30.7727 44L22.0909 39L27.0909 30.3636L30.2273 32.1818L27.6364 36.6364C31.2121 36.1212 34.1894 34.5 36.5682 31.7727C38.947 29.0455 40.1364 25.8485 40.1364 22.1818C40.1364 21.8485 40.1288 21.5379 40.1136 21.25C40.0985 20.9621 40.0606 20.6667 40 20.3636H43.6818C43.7121 20.6667 43.7348 20.9621 43.75 21.25C43.7652 21.5379 43.7727 21.8485 43.7727 22.1818C43.7727 26.2727 42.553 29.9318 40.1136 33.1591C37.6742 36.3864 34.5 38.5606 30.5909 39.6818L32.5909 40.8636L30.7727 44Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azUtility":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3333 23.0476L10.7619 20.1905C10.381 20.0317 10.0238 19.8651 9.69048 19.6905C9.35714 19.5159 9.01587 19.3016 8.66667 19.0476L5.90476 19.9048L4 16.6667L6.19048 14.7619C6.12698 14.3492 6.09524 13.9365 6.09524 13.5238C6.09524 13.1111 6.12698 12.6984 6.19048 12.2857L4 10.381L5.90476 7.14286L8.66667 8C9.01587 7.74603 9.35714 7.53175 9.69048 7.35714C10.0238 7.18254 10.381 7.01587 10.7619 6.85714L11.3333 4H15.1429L15.7143 6.85714C16.0952 7.01587 16.4524 7.18254 16.7857 7.35714C17.119 7.53175 17.4603 7.74603 17.8095 8L20.5714 7.14286L22.4762 10.381L20.2857 12.2857C20.3492 12.6984 20.381 13.1111 20.381 13.5238C20.381 13.9365 20.3492 14.3492 20.2857 14.7619L22.4762 16.6667L20.5714 19.9048L17.8095 19.0476C17.4603 19.3016 17.119 19.5159 16.7857 19.6905C16.4524 19.8651 16.0952 20.0317 15.7143 20.1905L15.1429 23.0476H11.3333ZM13.2381 17.3333C14.2857 17.3333 15.1825 16.9603 15.9286 16.2143C16.6746 15.4683 17.0476 14.5714 17.0476 13.5238C17.0476 12.4762 16.6746 11.5794 15.9286 10.8333C15.1825 10.0873 14.2857 9.71429 13.2381 9.71429C12.1905 9.71429 11.2937 10.0873 10.5476 10.8333C9.80159 11.5794 9.42857 12.4762 9.42857 13.5238C9.42857 14.5714 9.80159 15.4683 10.5476 16.2143C11.2937 16.9603 12.1905 17.3333 13.2381 17.3333ZM28.381 44L27.5238 40C26.9841 39.8095 26.4841 39.5794 26.0238 39.3095C25.5635 39.0397 25.1111 38.7302 24.6667 38.381L20.8571 39.619L18.1905 35.0476L21.2381 32.381C21.1746 31.8095 21.1429 31.2381 21.1429 30.6667C21.1429 30.0952 21.1746 29.5238 21.2381 28.9524L18.1905 26.2857L20.8571 21.7143L24.6667 22.9524C25.1111 22.6032 25.5635 22.2937 26.0238 22.0238C26.4841 21.754 26.9841 21.5238 27.5238 21.3333L28.381 17.3333H33.7143L34.5714 21.3333C35.1111 21.5238 35.6111 21.754 36.0714 22.0238C36.5317 22.2937 36.9841 22.6032 37.4286 22.9524L41.2381 21.7143L43.9048 26.2857L40.8571 28.9524C40.9206 29.5238 40.9524 30.0952 40.9524 30.6667C40.9524 31.2381 40.9206 31.8095 40.8571 32.381L43.9048 35.0476L41.2381 39.619L37.4286 38.381C36.9841 38.7302 36.5317 39.0397 36.0714 39.3095C35.6111 39.5794 35.1111 39.8095 34.5714 40L33.7143 44H28.381ZM31.0476 36.381C32.6349 36.381 33.9841 35.8254 35.0952 34.7143C36.2063 33.6032 36.7619 32.254 36.7619 30.6667C36.7619 29.0794 36.2063 27.7302 35.0952 26.619C33.9841 25.5079 32.6349 24.9524 31.0476 24.9524C29.4603 24.9524 28.1111 25.5079 27 26.619C25.8889 27.7302 25.3333 29.0794 25.3333 30.6667C25.3333 32.254 25.8889 33.6032 27 34.7143C28.1111 35.8254 29.4603 36.381 31.0476 36.381Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azMeasure":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill={fillColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 40V28H15V40H9ZM21 40V18H27V40H21ZM33 40V8H39V40H33Z"
                fill={strokeColor}
                className={ext1}
              />
            </svg>
          );
        case "azPdf":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width={size}
                height={size}
                className={className}
                rx="8.66667"
                fill="#F40F02"
              />
              <path
                d="M11.6427 21.3H17.3867C18.3254 21.3 19.0827 21.5667 19.6587 22.1C20.2347 22.6227 20.5227 23.316 20.5227 24.18V25.716C20.5227 26.6227 20.2187 27.3533 19.6107 27.908C19.0134 28.452 18.224 28.724 17.2427 28.724H13.5147V32.5H11.6427V21.3ZM17.2107 27.092C17.648 27.092 17.9947 26.9587 18.2507 26.692C18.5174 26.4253 18.6507 26.0787 18.6507 25.652V24.228C18.6507 23.8333 18.5334 23.5187 18.2987 23.284C18.064 23.0493 17.7494 22.932 17.3547 22.932H13.5147V27.092H17.2107ZM23.2999 32.5C22.8839 32.5 22.5479 32.3773 22.2919 32.132C22.0466 31.8867 21.9239 31.5613 21.9239 31.156V21.3H27.0279C27.8599 21.3 28.5906 21.46 29.2199 21.78C29.8599 22.0893 30.3506 22.532 30.6919 23.108C31.0439 23.684 31.2199 24.3507 31.2199 25.108V28.372C31.2199 29.7267 30.8679 30.756 30.1639 31.46C29.4706 32.1533 28.4466 32.5 27.0919 32.5H23.2999ZM27.0439 30.852C27.8013 30.852 28.3719 30.6387 28.7559 30.212C29.1506 29.7747 29.3479 29.14 29.3479 28.308V25.172C29.3479 24.5107 29.1293 23.9773 28.6919 23.572C28.2546 23.156 27.6839 22.948 26.9799 22.948H23.7959V30.852H27.0439ZM33.0177 21.3H41.0657V22.932H34.8897V26.308H40.4737V27.94H34.8897V32.5H33.0177V21.3Z"
                fill="white"
              />
            </svg>
          );
        case "azDoc":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width={size}
                height={size}
                className={className}
                rx="8.66667"
                fill="#1B5EBE"
              />
              <path
                d="M11.7687 32.5C11.3527 32.5 11.0167 32.3773 10.7607 32.132C10.5154 31.8867 10.3927 31.5613 10.3927 31.156V21.3H15.4967C16.3287 21.3 17.0594 21.46 17.6887 21.78C18.3287 22.0893 18.8194 22.532 19.1607 23.108C19.5127 23.684 19.6887 24.3507 19.6887 25.108V28.372C19.6887 29.7267 19.3367 30.756 18.6327 31.46C17.9394 32.1533 16.9154 32.5 15.5607 32.5H11.7687ZM15.5127 30.852C16.27 30.852 16.8407 30.6387 17.2247 30.212C17.6194 29.7747 17.8167 29.14 17.8167 28.308V25.172C17.8167 24.5107 17.598 23.9773 17.1607 23.572C16.7234 23.156 16.1527 22.948 15.4487 22.948H12.2647V30.852H15.5127ZM25.2624 32.628C24.4518 32.628 23.7371 32.4573 23.1184 32.116C22.4998 31.764 22.0198 31.2733 21.6784 30.644C21.3371 30.004 21.1664 29.268 21.1664 28.436V25.364C21.1664 24.532 21.3371 23.8013 21.6784 23.172C22.0198 22.532 22.4998 22.0413 23.1184 21.7C23.7371 21.348 24.4518 21.172 25.2624 21.172H26.9584C27.7691 21.172 28.4838 21.348 29.1024 21.7C29.7318 22.0413 30.2171 22.532 30.5584 23.172C30.8998 23.8013 31.0704 24.532 31.0704 25.364V28.436C31.0704 29.268 30.8998 30.004 30.5584 30.644C30.2171 31.2733 29.7318 31.764 29.1024 32.116C28.4838 32.4573 27.7691 32.628 26.9584 32.628H25.2624ZM26.9584 30.98C27.6198 30.98 28.1584 30.74 28.5744 30.26C28.9904 29.78 29.1984 29.1507 29.1984 28.372V25.428C29.1984 24.6493 28.9904 24.02 28.5744 23.54C28.1691 23.06 27.6304 22.82 26.9584 22.82H25.2784C24.6064 22.82 24.0624 23.06 23.6464 23.54C23.2411 24.02 23.0384 24.6493 23.0384 25.428V28.372C23.0384 29.1507 23.2411 29.78 23.6464 30.26C24.0624 30.74 24.6064 30.98 25.2784 30.98H26.9584ZM36.5719 32.628C35.7826 32.628 35.0893 32.4573 34.4919 32.116C33.8946 31.764 33.4306 31.2733 33.0999 30.644C32.7693 30.004 32.6039 29.268 32.6039 28.436V25.364C32.6039 24.532 32.7693 23.8013 33.0999 23.172C33.4413 22.532 33.9159 22.0413 34.5239 21.7C35.1319 21.348 35.8359 21.172 36.6359 21.172H38.3319C39.0893 21.172 39.7613 21.3373 40.3479 21.668C40.9346 21.988 41.3879 22.4467 41.7079 23.044C42.0279 23.6307 42.1879 24.3133 42.1879 25.092H40.3479C40.3479 24.4093 40.1613 23.86 39.7879 23.444C39.4146 23.028 38.9293 22.82 38.3319 22.82H36.6359C35.9853 22.82 35.4626 23.06 35.0679 23.54C34.6733 24.02 34.4759 24.6493 34.4759 25.428V28.372C34.4759 29.1613 34.6679 29.796 35.0519 30.276C35.4359 30.7453 35.9426 30.98 36.5719 30.98H38.2999C38.9186 30.98 39.4199 30.7453 39.8039 30.276C40.1879 29.8067 40.3799 29.1987 40.3799 28.452H42.2199C42.2199 29.284 42.0546 30.0147 41.7239 30.644C41.4039 31.2733 40.9453 31.764 40.3479 32.116C39.7613 32.4573 39.0786 32.628 38.2999 32.628H36.5719Z"
                fill="white"
              />
            </svg>
          );
        case "azXls":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width={size}
                height={size}
                className={className}
                rx="8.66667"
                fill="#1D6F42"
              />
              <path
                d="M15.3043 26.788L11.5443 21.3H13.6563L16.3763 25.252L19.0963 21.3H21.1923L17.4323 26.788L21.3523 32.5H19.2403L16.3763 28.308L13.4963 32.5H11.3843L15.3043 26.788ZM23.7843 32.5C23.3576 32.5 23.0216 32.3773 22.7763 32.132C22.531 31.8867 22.4083 31.5613 22.4083 31.156V21.3H24.2803V30.868H30.3603V32.5H23.7843ZM34.6239 32.628C33.5146 32.628 32.6399 32.308 31.9999 31.668C31.3599 31.028 31.0399 30.1533 31.0399 29.044H32.8799C32.8799 29.6413 33.0346 30.116 33.3439 30.468C33.6639 30.8093 34.1013 30.98 34.6559 30.98H36.4319C36.9546 30.98 37.3759 30.868 37.6959 30.644C38.0159 30.4093 38.1759 30.1053 38.1759 29.732V29.028C38.1759 28.74 38.0639 28.5 37.8399 28.308C37.6159 28.116 37.2959 27.9827 36.8799 27.908L33.9679 27.412C33.0613 27.2627 32.3626 26.964 31.8719 26.516C31.3919 26.068 31.1519 25.4973 31.1519 24.804V23.924C31.1519 23.38 31.2959 22.9 31.5839 22.484C31.8826 22.068 32.2986 21.748 32.8319 21.524C33.3653 21.2893 33.9839 21.172 34.6879 21.172H36.4959C37.1573 21.172 37.7386 21.3107 38.2399 21.588C38.7519 21.8547 39.1466 22.2387 39.4239 22.74C39.7013 23.2413 39.8399 23.8173 39.8399 24.468H38.0159C38.0159 23.9773 37.8719 23.5827 37.5839 23.284C37.3066 22.9747 36.9439 22.82 36.4959 22.82H34.6879C34.1866 22.82 33.7813 22.932 33.4719 23.156C33.1733 23.3693 33.0239 23.6627 33.0239 24.036V24.612C33.0239 24.9107 33.1306 25.1613 33.3439 25.364C33.5573 25.556 33.8666 25.684 34.2719 25.748L37.1839 26.26C38.1013 26.42 38.8053 26.7187 39.2959 27.156C39.7973 27.5827 40.0479 28.132 40.0479 28.804V29.844C40.0479 30.388 39.8986 30.8733 39.5999 31.3C39.3013 31.716 38.8799 32.0413 38.3359 32.276C37.7919 32.5107 37.1679 32.628 36.4639 32.628H34.6239Z"
                fill="white"
              />
            </svg>
          );
        case "azSvg":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width={size}
                height={size}
                className={className}
                rx="8.66667"
                fill="#E57E25"
              />
              <path
                d="M14.4521 32.628C13.3427 32.628 12.4681 32.308 11.8281 31.668C11.1881 31.028 10.8681 30.1533 10.8681 29.044H12.7081C12.7081 29.6413 12.8627 30.116 13.1721 30.468C13.4921 30.8093 13.9294 30.98 14.4841 30.98H16.2601C16.7827 30.98 17.2041 30.868 17.5241 30.644C17.8441 30.4093 18.0041 30.1053 18.0041 29.732V29.028C18.0041 28.74 17.8921 28.5 17.6681 28.308C17.4441 28.116 17.1241 27.9827 16.7081 27.908L13.7961 27.412C12.8894 27.2627 12.1907 26.964 11.7001 26.516C11.2201 26.068 10.9801 25.4973 10.9801 24.804V23.924C10.9801 23.38 11.1241 22.9 11.4121 22.484C11.7107 22.068 12.1267 21.748 12.6601 21.524C13.1934 21.2893 13.8121 21.172 14.5161 21.172H16.3241C16.9854 21.172 17.5667 21.3107 18.0681 21.588C18.5801 21.8547 18.9747 22.2387 19.2521 22.74C19.5294 23.2413 19.6681 23.8173 19.6681 24.468H17.8441C17.8441 23.9773 17.7001 23.5827 17.4121 23.284C17.1347 22.9747 16.7721 22.82 16.3241 22.82H14.5161C14.0147 22.82 13.6094 22.932 13.3001 23.156C13.0014 23.3693 12.8521 23.6627 12.8521 24.036V24.612C12.8521 24.9107 12.9587 25.1613 13.1721 25.364C13.3854 25.556 13.6947 25.684 14.1001 25.748L17.0121 26.26C17.9294 26.42 18.6334 26.7187 19.1241 27.156C19.6254 27.5827 19.8761 28.132 19.8761 28.804V29.844C19.8761 30.388 19.7267 30.8733 19.4281 31.3C19.1294 31.716 18.7081 32.0413 18.1641 32.276C17.6201 32.5107 16.9961 32.628 16.2921 32.628H14.4521ZM25.5821 32.5C25.0487 32.5 24.6594 32.1907 24.4141 31.572L20.5741 21.3H22.5101L25.6461 30.164H25.6621L28.8141 21.3H30.7341L26.4781 32.5H25.5821ZM35.3539 32.628C34.5539 32.628 33.8499 32.4573 33.2419 32.116C32.6446 31.764 32.1806 31.2733 31.8499 30.644C31.5193 30.004 31.3539 29.268 31.3539 28.436V25.364C31.3539 24.532 31.5193 23.8013 31.8499 23.172C32.1913 22.532 32.6659 22.0413 33.2739 21.7C33.8926 21.348 34.6019 21.172 35.4019 21.172H37.1619C37.9299 21.172 38.6073 21.332 39.1939 21.652C39.7806 21.9613 40.2339 22.404 40.5539 22.98C40.8739 23.5453 41.0339 24.2013 41.0339 24.948H39.1939C39.1939 24.308 39.0073 23.796 38.6339 23.412C38.2606 23.0173 37.7699 22.82 37.1619 22.82H35.4019C34.7513 22.82 34.2233 23.06 33.8179 23.54C33.4233 24.0093 33.2259 24.6387 33.2259 25.428V28.372C33.2259 29.1613 33.4179 29.796 33.8019 30.276C34.1966 30.7453 34.7139 30.98 35.3539 30.98H37.1779C37.7966 30.98 38.3033 30.7613 38.6979 30.324C39.0926 29.8867 39.2899 29.3267 39.2899 28.644V28.1H36.1859V26.468H41.1299V28.644C41.1299 29.4227 40.9646 30.116 40.6339 30.724C40.3033 31.3213 39.8393 31.7907 39.2419 32.132C38.6446 32.4627 37.9566 32.628 37.1779 32.628H35.3539Z"
                fill="white"
              />
            </svg>
          );
        case "azJpg":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width={size}
                height={size}
                className={className}
                rx="8.66667"
                fill="#39B54A"
              />
              <path
                d="M14.2768 32.628C13.5941 32.628 12.9914 32.468 12.4688 32.148C11.9461 31.8173 11.5408 31.3587 11.2528 30.772C10.9648 30.1747 10.8208 29.492 10.8208 28.724H12.6608C12.6608 29.4067 12.8101 29.956 13.1088 30.372C13.4074 30.7773 13.7968 30.98 14.2768 30.98H15.5568C16.0474 30.98 16.4368 30.7667 16.7248 30.34C17.0234 29.9027 17.1728 29.3213 17.1728 28.596V21.3H19.0448V28.66C19.0448 29.46 18.9008 30.1587 18.6128 30.756C18.3354 31.3533 17.9354 31.8173 17.4128 32.148C16.9008 32.468 16.3034 32.628 15.6208 32.628H14.2768ZM21.088 21.3H26.832C27.7707 21.3 28.528 21.5667 29.104 22.1C29.68 22.6227 29.968 23.316 29.968 24.18V25.716C29.968 26.6227 29.664 27.3533 29.056 27.908C28.4587 28.452 27.6693 28.724 26.688 28.724H22.96V32.5H21.088V21.3ZM26.656 27.092C27.0933 27.092 27.44 26.9587 27.696 26.692C27.9627 26.4253 28.096 26.0787 28.096 25.652V24.228C28.096 23.8333 27.9787 23.5187 27.744 23.284C27.5093 23.0493 27.1947 22.932 26.8 22.932H22.96V27.092H26.656ZM35.0493 32.628C34.2493 32.628 33.5453 32.4573 32.9373 32.116C32.3399 31.764 31.8759 31.2733 31.5453 30.644C31.2146 30.004 31.0493 29.268 31.0493 28.436V25.364C31.0493 24.532 31.2146 23.8013 31.5453 23.172C31.8866 22.532 32.3613 22.0413 32.9693 21.7C33.5879 21.348 34.2973 21.172 35.0973 21.172H36.8573C37.6253 21.172 38.3026 21.332 38.8893 21.652C39.4759 21.9613 39.9293 22.404 40.2493 22.98C40.5693 23.5453 40.7293 24.2013 40.7293 24.948H38.8893C38.8893 24.308 38.7026 23.796 38.3293 23.412C37.9559 23.0173 37.4653 22.82 36.8573 22.82H35.0973C34.4466 22.82 33.9186 23.06 33.5133 23.54C33.1186 24.0093 32.9213 24.6387 32.9213 25.428V28.372C32.9213 29.1613 33.1133 29.796 33.4973 30.276C33.8919 30.7453 34.4093 30.98 35.0493 30.98H36.8733C37.4919 30.98 37.9986 30.7613 38.3933 30.324C38.7879 29.8867 38.9853 29.3267 38.9853 28.644V28.1H35.8813V26.468H40.8253V28.644C40.8253 29.4227 40.6599 30.116 40.3293 30.724C39.9986 31.3213 39.5346 31.7907 38.9373 32.132C38.3399 32.4627 37.6519 32.628 36.8733 32.628H35.0493Z"
                fill="white"
              />
            </svg>
          );
        case "azPng":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width={size}
                height={size}
                className={className}
                rx="8.66667"
                fill="#FF4B4B"
              />
              <path
                d="M10.6505 21.3H16.3945C17.3332 21.3 18.0905 21.5667 18.6665 22.1C19.2425 22.6227 19.5305 23.316 19.5305 24.18V25.716C19.5305 26.6227 19.2265 27.3533 18.6185 27.908C18.0212 28.452 17.2318 28.724 16.2505 28.724H12.5225V32.5H10.6505V21.3ZM16.2185 27.092C16.6558 27.092 17.0025 26.9587 17.2585 26.692C17.5252 26.4253 17.6585 26.0787 17.6585 25.652V24.228C17.6585 23.8333 17.5412 23.5187 17.3065 23.284C17.0718 23.0493 16.7572 22.932 16.3625 22.932H12.5225V27.092H16.2185ZM20.9318 21.3H22.6118L28.2758 29.492V21.3H30.0998V32.5H28.4038L22.7558 24.34V32.5H20.9318V21.3ZM35.9555 32.628C35.1555 32.628 34.4515 32.4573 33.8435 32.116C33.2462 31.764 32.7822 31.2733 32.4515 30.644C32.1208 30.004 31.9555 29.268 31.9555 28.436V25.364C31.9555 24.532 32.1208 23.8013 32.4515 23.172C32.7928 22.532 33.2675 22.0413 33.8755 21.7C34.4942 21.348 35.2035 21.172 36.0035 21.172H37.7635C38.5315 21.172 39.2088 21.332 39.7955 21.652C40.3822 21.9613 40.8355 22.404 41.1555 22.98C41.4755 23.5453 41.6355 24.2013 41.6355 24.948H39.7955C39.7955 24.308 39.6088 23.796 39.2355 23.412C38.8622 23.0173 38.3715 22.82 37.7635 22.82H36.0035C35.3528 22.82 34.8248 23.06 34.4195 23.54C34.0248 24.0093 33.8275 24.6387 33.8275 25.428V28.372C33.8275 29.1613 34.0195 29.796 34.4035 30.276C34.7982 30.7453 35.3155 30.98 35.9555 30.98H37.7795C38.3982 30.98 38.9048 30.7613 39.2995 30.324C39.6942 29.8867 39.8915 29.3267 39.8915 28.644V28.1H36.7875V26.468H41.7315V28.644C41.7315 29.4227 41.5662 30.116 41.2355 30.724C40.9048 31.3213 40.4408 31.7907 39.8435 32.132C39.2462 32.4627 38.5582 32.628 37.7795 32.628H35.9555Z"
                fill="white"
              />
            </svg>
          );
        case "azAi":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width={size}
                height={size}
                className={className}
                rx="8.66667"
                fill="#330000"
              />
              <path
                d="M25.9903 29.732H21.5423L20.5023 32.5H18.5663L22.9183 21.3H23.7663C24.3423 21.3 24.7423 21.5827 24.9663 22.148L28.9663 32.5H27.0143L25.9903 29.732ZM22.0703 28.164H25.4623L23.7823 23.62H23.7663L22.0703 28.164ZM31.349 23.62C30.9863 23.62 30.693 23.5133 30.469 23.3C30.2557 23.076 30.149 22.7933 30.149 22.452C30.149 22.1107 30.2557 21.8333 30.469 21.62C30.693 21.396 30.9863 21.284 31.349 21.284C31.7117 21.284 32.005 21.396 32.229 21.62C32.453 21.8333 32.565 22.1107 32.565 22.452C32.565 22.7933 32.453 23.076 32.229 23.3C32.005 23.5133 31.7117 23.62 31.349 23.62ZM30.437 24.516H32.277V32.5H30.437V24.516Z"
                fill="#FF9A00"
              />
            </svg>
          );
        case "azPsd":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width={size}
                height={size}
                className={className}
                rx="8.66667"
                fill="#001E36"
              />
              <path
                d="M11.2286 21.3H16.9726C17.9113 21.3 18.6686 21.5667 19.2446 22.1C19.8206 22.6227 20.1086 23.316 20.1086 24.18V25.716C20.1086 26.6227 19.8046 27.3533 19.1966 27.908C18.5993 28.452 17.81 28.724 16.8286 28.724H13.1006V32.5H11.2286V21.3ZM16.7966 27.092C17.234 27.092 17.5806 26.9587 17.8366 26.692C18.1033 26.4253 18.2366 26.0787 18.2366 25.652V24.228C18.2366 23.8333 18.1193 23.5187 17.8846 23.284C17.65 23.0493 17.3353 22.932 16.9406 22.932H13.1006V27.092H16.7966ZM24.7099 32.628C23.6005 32.628 22.7259 32.308 22.0859 31.668C21.4459 31.028 21.1259 30.1533 21.1259 29.044H22.9659C22.9659 29.6413 23.1205 30.116 23.4299 30.468C23.7499 30.8093 24.1872 30.98 24.7419 30.98H26.5179C27.0405 30.98 27.4619 30.868 27.7819 30.644C28.1019 30.4093 28.2619 30.1053 28.2619 29.732V29.028C28.2619 28.74 28.1499 28.5 27.9259 28.308C27.7019 28.116 27.3819 27.9827 26.9659 27.908L24.0539 27.412C23.1472 27.2627 22.4485 26.964 21.9579 26.516C21.4779 26.068 21.2379 25.4973 21.2379 24.804V23.924C21.2379 23.38 21.3819 22.9 21.6699 22.484C21.9685 22.068 22.3845 21.748 22.9179 21.524C23.4512 21.2893 24.0699 21.172 24.7739 21.172H26.5819C27.2432 21.172 27.8245 21.3107 28.3259 21.588C28.8379 21.8547 29.2325 22.2387 29.5099 22.74C29.7872 23.2413 29.9259 23.8173 29.9259 24.468H28.1019C28.1019 23.9773 27.9579 23.5827 27.6699 23.284C27.3925 22.9747 27.0299 22.82 26.5819 22.82H24.7739C24.2725 22.82 23.8672 22.932 23.5579 23.156C23.2592 23.3693 23.1099 23.6627 23.1099 24.036V24.612C23.1099 24.9107 23.2165 25.1613 23.4299 25.364C23.6432 25.556 23.9525 25.684 24.3579 25.748L27.2699 26.26C28.1872 26.42 28.8912 26.7187 29.3819 27.156C29.8832 27.5827 30.1339 28.132 30.1339 28.804V29.844C30.1339 30.388 29.9845 30.8733 29.6859 31.3C29.3872 31.716 28.9659 32.0413 28.4219 32.276C27.8779 32.5107 27.2539 32.628 26.5499 32.628H24.7099ZM33.2296 32.5C32.8136 32.5 32.4776 32.3773 32.2216 32.132C31.9763 31.8867 31.8536 31.5613 31.8536 31.156V21.3H36.9576C37.7896 21.3 38.5203 21.46 39.1496 21.78C39.7896 22.0893 40.2803 22.532 40.6216 23.108C40.9736 23.684 41.1496 24.3507 41.1496 25.108V28.372C41.1496 29.7267 40.7976 30.756 40.0936 31.46C39.4003 32.1533 38.3763 32.5 37.0216 32.5H33.2296ZM36.9736 30.852C37.731 30.852 38.3016 30.6387 38.6856 30.212C39.0803 29.7747 39.2776 29.14 39.2776 28.308V25.172C39.2776 24.5107 39.059 23.9773 38.6216 23.572C38.1843 23.156 37.6136 22.948 36.9096 22.948H33.7256V30.852H36.9736Z"
                fill="#31A8FF"
              />
            </svg>
          );
        case "azFacebook":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="48px"
                height="48px"
                className={className}
                rx="24"
                fill={fillColor}
              />
              <path
                d="M30.6299 20.4001H26.3999V18.0001C26.3999 16.7617 26.5007 15.9817 28.2755 15.9817H30.5171V12.1657C29.4263 12.0529 28.3295 11.9977 27.2315 12.0001C23.9759 12.0001 21.5999 13.9885 21.5999 17.6389V20.4001H17.9999V25.2001L21.5999 25.1989V36.0001H26.3999V25.1965L30.0791 25.1953L30.6299 20.4001Z"
                fill="#41A8E4"
              />
            </svg>
          );
        case "azInstagram":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="48px"
                height="48px"
                className={className}
                rx="24"
                fill={fillColor}
              />
              <path
                d="M19.2 13.1992C15.8868 13.1992 13.2 15.886 13.2 19.1992V28.7992C13.2 32.1124 15.8868 34.7992 19.2 34.7992H28.8C32.1132 34.7992 34.8 32.1124 34.8 28.7992V19.1992C34.8 15.886 32.1132 13.1992 28.8 13.1992H19.2ZM31.2 15.5992C31.8624 15.5992 32.4 16.1368 32.4 16.7992C32.4 17.4616 31.8624 17.9992 31.2 17.9992C30.5376 17.9992 30 17.4616 30 16.7992C30 16.1368 30.5376 15.5992 31.2 15.5992ZM24 17.9992C27.3132 17.9992 30 20.686 30 23.9992C30 27.3124 27.3132 29.9992 24 29.9992C20.6868 29.9992 18 27.3124 18 23.9992C18 20.686 20.6868 17.9992 24 17.9992ZM24 20.3992C22.0117 20.3992 20.4 22.011 20.4 23.9992C20.4 25.9874 22.0117 27.5992 24 27.5992C25.9882 27.5992 27.6 25.9874 27.6 23.9992C27.6 22.011 25.9882 20.3992 24 20.3992Z"
                fill="#41A8E4"
              />
            </svg>
          );
        case "azYoutube":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="48px"
                height="48px"
                className={className}
                rx="24"
                fill={fillColor}
              />
              <path
                d="M35.4984 17.0236C35.2224 15.9916 34.4088 15.178 33.3768 14.902C31.5048 14.4004 24 14.4004 24 14.4004C24 14.4004 16.4952 14.4004 14.6232 14.902C13.5912 15.178 12.7776 15.9916 12.5016 17.0236C12 18.8956 12 24.0004 12 24.0004C12 24.0004 12 29.1052 12.5016 30.9772C12.7776 32.0092 13.5912 32.8228 14.6232 33.0988C16.4952 33.6004 24 33.6004 24 33.6004C24 33.6004 31.5048 33.6004 33.3768 33.0988C34.41 32.8228 35.2224 32.0092 35.4984 30.9772C36 29.1052 36 24.0004 36 24.0004C36 24.0004 36 18.8956 35.4984 17.0236ZM21.6 28.1572V19.8436L28.8 24.0004L21.6 28.1572Z"
                fill="#41A8E4"
              />
            </svg>
          );
        case "azLinkedin":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="48px"
                height="48px"
                className={className}
                rx="24"
                fill={fillColor}
              />
              <path
                d="M32.4 13.1992H15.6C14.274 13.1992 13.2 14.2732 13.2 15.5992V32.3992C13.2 33.7252 14.274 34.7992 15.6 34.7992H32.4C33.726 34.7992 34.8 33.7252 34.8 32.3992V15.5992C34.8 14.2732 33.726 13.1992 32.4 13.1992ZM20.4 29.9992H17.3724V21.5992H20.4V29.9992ZM18.8328 20.0596C17.9076 20.0596 17.2896 19.4428 17.2896 18.6196C17.2896 17.7964 17.9064 17.1796 18.9348 17.1796C19.86 17.1796 20.478 17.7964 20.478 18.6196C20.478 19.4428 19.8612 20.0596 18.8328 20.0596ZM31.2 29.9992H28.2696V25.408C28.2696 24.1384 27.4884 23.8456 27.1956 23.8456C26.9028 23.8456 25.926 24.0412 25.926 25.408C25.926 25.6036 25.926 29.9992 25.926 29.9992H22.8984V21.5992H25.926V22.7716C26.316 22.0876 27.0972 21.5992 28.5624 21.5992C30.0276 21.5992 31.2 22.7716 31.2 25.408V29.9992Z"
                fill="#41A8E4"
              />
            </svg>
          );
        case "azPulKöçür":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.12157 15.334L8.69269 15.334C8.86559 15.334 9.00575 15.1919 9.00575 15.0165C9.00575 14.8412 8.86559 14.6991 8.69269 14.6991L7.6644 14.6991C7.52672 13.7273 6.76679 12.9567 5.80852 12.8171L5.80852 11.1842C6.76681 11.0446 7.52672 10.274 7.6644 9.30225L12.4052 9.30225C12.5429 10.274 13.3028 11.0446 14.2611 11.1842L14.2611 12.8171C13.3028 12.9567 12.5429 13.7273 12.4052 14.6991L8.44489 14.6991C8.27198 14.6991 8.13183 14.8412 8.13183 15.0165C8.13183 15.1919 8.27198 15.334 8.44489 15.334L13.948 15.334C14.4659 15.334 14.8872 14.9068 14.8872 14.3816L14.8872 9.61971C14.8872 9.09455 14.4659 8.66733 13.948 8.66733L6.12157 8.66733C5.6037 8.66733 5.1824 9.09455 5.1824 9.61971L5.1824 14.3816C5.1824 14.9068 5.6037 15.334 6.12157 15.334ZM7.02925 14.6991L6.12157 14.6991C5.94896 14.6991 5.80852 14.5566 5.80852 14.3816L5.80852 13.4612C6.42094 13.5877 6.90444 14.078 7.02925 14.6991ZM13.948 14.6991L13.0404 14.6991C13.1652 14.078 13.6487 13.5877 14.2611 13.4612L14.2611 14.3816C14.2611 14.5567 14.1206 14.6991 13.948 14.6991ZM14.2611 9.61971L14.2611 10.5401C13.6487 10.4136 13.1652 9.92328 13.0404 9.30225L13.948 9.30225C14.1206 9.30225 14.2611 9.44467 14.2611 9.61971ZM6.12157 9.30225L7.02925 9.30225C6.90444 9.92328 6.42094 10.4136 5.80852 10.5401L5.80852 9.61971C5.80852 9.44467 5.94896 9.30225 6.12157 9.30225ZM11.7566 12.0007C11.7566 11.0379 10.9842 10.2546 10.0348 10.2546C9.08539 10.2546 8.31298 11.0379 8.31298 12.0007C8.31298 12.9634 9.08539 13.7467 10.0348 13.7467C10.9842 13.7467 11.7566 12.9634 11.7566 12.0007ZM8.9391 12.0007C8.9391 11.388 9.43062 10.8895 10.0348 10.8895C10.639 10.8895 11.1305 11.388 11.1305 12.0007C11.1305 12.6133 10.639 13.1118 10.0348 13.1118C9.43062 13.1118 8.9391 12.6133 8.9391 12.0007ZM12.5393 12.3181C12.3664 12.3181 12.2262 12.176 12.2262 12.0007C12.2262 11.8253 12.3664 11.6832 12.5393 11.6832L12.6958 11.6832C12.8687 11.6832 13.0089 11.8253 13.0089 12.0007C13.0089 12.176 12.8687 12.3181 12.6958 12.3181L12.5393 12.3181ZM7.53034 11.6832C7.70324 11.6832 7.84339 11.8253 7.84339 12.0007C7.84339 12.176 7.70324 12.3181 7.53034 12.3181L7.37381 12.3181C7.2009 12.3181 7.06075 12.176 7.06075 12.0007C7.06075 11.8253 7.2009 11.6832 7.37381 11.6832L7.53034 11.6832Z"
                fill={fillColor}
                className={ext1}
              />
              <path
                d="M14.3333 5.33268V5.33268C15.8061 5.33268 17 6.52659 17 7.99935L17 15.666C17 17.3229 15.6569 18.666 14 18.666L4 18.666C2.34315 18.666 1 17.3229 1 15.666L1 7.66601C1 6.37735 2.04467 5.33268 3.33333 5.33268V5.33268"
                stroke={strokeColor}
                className={ext2}
                stroke-width="0.8"
                stroke-linecap="round"
              />
              <path
                d="M11.0234 4.81055L9.00002 6.83388L6.97668 4.81055"
                stroke={strokeColor}
                className={ext2}
                stroke-width="0.8"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 2V6.66667"
                stroke={strokeColor}
                className={ext2}
                stroke-width="0.8"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          );
        case "azPulGötür":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.948 4.33594H11.3769C11.204 4.33594 11.0638 4.47806 11.0638 4.6534C11.0638 4.82873 11.204 4.97086 11.3769 4.97086H12.4052C12.5429 5.94262 13.3028 6.71322 14.2611 6.85284V8.48569C13.3028 8.62532 12.5429 9.39591 12.4052 10.3677H7.66438C7.52669 9.39591 6.76676 8.62532 5.80849 8.48569V6.85284C6.76678 6.71322 7.52669 5.94262 7.66438 4.97086H11.6247C11.7976 4.97086 11.9377 4.82873 11.9377 4.6534C11.9377 4.47806 11.7976 4.33594 11.6247 4.33594H6.12155C5.60367 4.33594 5.18237 4.76316 5.18237 5.28832V10.0502C5.18237 10.5754 5.60367 11.0026 6.12155 11.0026H13.948C14.4659 11.0026 14.8872 10.5754 14.8872 10.0502V5.28832C14.8872 4.76316 14.4659 4.33594 13.948 4.33594ZM13.0403 4.97086H13.948C14.1206 4.97086 14.2611 5.11328 14.2611 5.28832V6.20875C13.6486 6.08218 13.1651 5.59189 13.0403 4.97086ZM6.12155 4.97086H7.02922C6.90441 5.59189 6.42091 6.08218 5.80849 6.20875V5.28832C5.80849 5.11326 5.94894 4.97086 6.12155 4.97086ZM5.80849 10.0502V9.12978C6.42091 9.25635 6.90441 9.74664 7.02922 10.3677H6.12155C5.94894 10.3677 5.80849 10.2253 5.80849 10.0502ZM13.948 10.3677H13.0403C13.1651 9.74664 13.6486 9.25635 14.2611 9.12978V10.0502C14.2611 10.2253 14.1206 10.3677 13.948 10.3677ZM8.31296 7.66927C8.31296 8.63202 9.08537 9.4153 10.0348 9.4153C10.9842 9.4153 11.7566 8.63202 11.7566 7.66927C11.7566 6.70651 10.9842 5.92324 10.0348 5.92324C9.08537 5.92324 8.31296 6.70649 8.31296 7.66927ZM11.1305 7.66927C11.1305 8.28194 10.639 8.78038 10.0348 8.78038C9.43059 8.78038 8.93907 8.28194 8.93907 7.66927C8.93907 7.05659 9.43059 6.55816 10.0348 6.55816C10.639 6.55816 11.1305 7.05659 11.1305 7.66927ZM7.53031 7.35181C7.70322 7.35181 7.84337 7.49393 7.84337 7.66927C7.84337 7.8446 7.70322 7.98673 7.53031 7.98673H7.37378C7.20088 7.98673 7.06072 7.8446 7.06072 7.66927C7.06072 7.49393 7.20088 7.35181 7.37378 7.35181H7.53031ZM12.5392 7.98673C12.3663 7.98673 12.2262 7.8446 12.2262 7.66927C12.2262 7.49393 12.3663 7.35181 12.5392 7.35181H12.6958C12.8687 7.35181 13.0088 7.49393 13.0088 7.66927C13.0088 7.8446 12.8687 7.98673 12.6958 7.98673H12.5392Z"
                fill={fillColor}
                className={ext1}
              />
              <path
                d="M3.66667 14.3333V14.3333C2.19391 14.3333 1 13.1394 1 11.6667V5C1 2.79086 2.79086 1 5 1H13C15.2091 1 17 2.79086 17 5V12C17 13.2887 15.9553 14.3333 14.6667 14.3333V14.3333"
                stroke={strokeColor}
                className={ext2}
                stroke-width="0.8"
                stroke-linecap="round"
              />
              <path
                d="M11.0234 16.4785L9.00002 18.5018L6.97668 16.4785"
                stroke={strokeColor}
                className={ext2}
                stroke-width="0.8"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 13.668V18.3346"
                stroke={strokeColor}
                className={ext2}
                stroke-width="0.8"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          );
        case "azClock1":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.8504 13.4135L12.6197 11.7405V8.33254C12.6197 7.98987 12.3427 7.71289 12 7.71289C11.6574 7.71289 11.3804 7.98987 11.3804 8.33254V12.0504C11.3804 12.2456 11.4721 12.4296 11.6282 12.5461L14.1068 14.405C14.2183 14.4887 14.3484 14.5289 14.4779 14.5289C14.6669 14.5289 14.8528 14.444 14.9743 14.2805C15.1801 14.0072 15.1243 13.6187 14.8504 13.4135Z"
                fill={fillColor}
                className={ext1}
              />
              <path
                d="M11.9995 4C7.58804 4 3.99951 7.58853 3.99951 12C3.99951 16.4115 7.58804 20 11.9995 20C16.411 20 19.9995 16.4115 19.9995 12C19.9995 7.58853 16.411 4 11.9995 4ZM11.9995 18.7607C8.27217 18.7607 5.23886 15.7273 5.23886 12C5.23886 8.27266 8.27217 5.23934 11.9995 5.23934C15.7275 5.23934 18.7602 8.27266 18.7602 12C18.7602 15.7273 15.7269 18.7607 11.9995 18.7607Z"
                fill={fillColor}
                className={ext1}
              />
            </svg>
          );
        case "azPerson":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.3413 4.66667C10.3413 3.93133 9.71954 3.33333 8.95494 3.33333C8.19034 3.33333 7.56854 3.93133 7.56854 4.66667C7.56854 5.402 8.19034 6 8.95494 6C9.71954 6 10.3413 5.402 10.3413 4.66667ZM11.7277 4.66667C11.7277 6.13733 10.4841 7.33333 8.95494 7.33333C7.42574 7.33333 6.18214 6.13733 6.18214 4.66667C6.18214 3.196 7.42574 2 8.95494 2C10.4841 2 11.7277 3.196 11.7277 4.66667ZM4.10254 13.3333C4.10254 10.76 6.27988 8.66667 8.95494 8.66667C11.63 8.66667 13.8073 10.76 13.8073 13.3333C13.8073 13.7013 13.4975 14 13.1141 14C12.7308 14 12.4209 13.7013 12.4209 13.3333C12.4209 11.4953 10.8661 10 8.95494 10C7.04379 10 5.48894 11.4953 5.48894 13.3333C5.48894 13.7013 5.17908 14 4.79574 14C4.4124 14 4.10254 13.7013 4.10254 13.3333Z"
                fill={fillColor}
                className={ext1}
              />
            </svg>
          );
        case "azCheckMark":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.1917 7.31665H15.1938C15.5757 7.31665 15.8863 7.61398 15.887 7.98132C15.8925 9.76198 15.1765 11.4387 13.8705 12.7013C12.5652 13.964 10.8266 14.662 8.97509 14.6673H8.95499C7.11038 14.6673 5.3753 13.9793 4.06723 12.728C2.75431 11.4727 2.02853 9.80065 2.02298 8.01998C2.01744 6.23865 2.73351 4.56265 4.0395 3.29998C5.3448 2.03732 7.08335 1.33932 8.93489 1.33398C9.48598 1.34198 10.0475 1.39532 10.5854 1.51932C10.957 1.60598 11.1864 1.96598 11.0963 2.32398C11.0069 2.68132 10.6305 2.90132 10.2603 2.81598C9.82981 2.71598 9.37299 2.67398 8.93904 2.66732C7.45767 2.67132 6.06642 3.22998 5.02246 4.23998C3.97781 5.24998 3.40522 6.59132 3.40938 8.01598C3.41354 9.44065 3.99444 10.778 5.04464 11.7827C6.09138 12.7833 7.47916 13.334 8.95499 13.334H8.97093C10.4523 13.33 11.8436 12.7713 12.8875 11.7613C13.9322 10.7507 14.5048 9.40998 14.5006 7.98532C14.4999 7.61732 14.8091 7.31732 15.1917 7.31665ZM6.38529 7.52925C6.65633 7.26858 7.09444 7.26858 7.36548 7.52925L8.92102 9.02525L13.2861 4.22792C13.5384 3.95258 13.9758 3.92325 14.2642 4.16592C14.5519 4.40792 14.581 4.82925 14.3287 5.10658L9.47628 10.4399C9.35011 10.5786 9.16988 10.6606 8.97786 10.6673H8.95499C8.77129 10.6673 8.59522 10.5973 8.4649 10.4719L6.38529 8.47192C6.11425 8.21125 6.11425 7.78992 6.38529 7.52925Z"
                fill={fillColor}
                className={ext1}
              />
            </svg>
          );
        case "azPassword":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2961_44606)">
                <path
                  d="M7.99976 10.5H8.99976M12.4998 8.5V7.5C12.4998 7.23478 12.3944 6.98043 12.2069 6.79289C12.0193 6.60536 11.765 6.5 11.4998 6.5H1.49976C1.23454 6.5 0.980185 6.60536 0.792649 6.79289C0.605113 6.98043 0.499756 7.23478 0.499756 7.5V13.5C0.499756 13.7652 0.605113 14.0196 0.792649 14.2071C0.980185 14.3946 1.23454 14.5 1.49976 14.5H11.4998C11.765 14.5 12.0193 14.3946 12.2069 14.2071C12.3944 14.0196 12.4998 13.7652 12.4998 13.5V12.5V8.5ZM12.4998 8.5H8.49976C7.96932 8.5 7.46061 8.71071 7.08554 9.08579C6.71047 9.46086 6.49976 9.96957 6.49976 10.5C6.49976 11.0304 6.71047 11.5391 7.08554 11.9142C7.46061 12.2893 7.96932 12.5 8.49976 12.5H12.4998V8.5ZM12.4998 8.5C13.0302 8.5 13.5389 8.71071 13.914 9.08579C14.289 9.46086 14.4998 9.96957 14.4998 10.5C14.4998 11.0304 14.289 11.5391 13.914 11.9142C13.5389 12.2893 13.0302 12.5 12.4998 12.5V8.5ZM3.49976 6.5V3.5C3.49976 2.70435 3.81583 1.94129 4.37844 1.37868C4.94104 0.81607 5.70411 0.5 6.49976 0.5C7.29541 0.5 8.05847 0.81607 8.62108 1.37868C9.18369 1.94129 9.49976 2.70435 9.49976 3.5V6.5H3.49976ZM11.9998 10.5H12.9998H11.9998ZM9.99976 10.5H10.9998H9.99976Z"
                  stroke={strokeColor}
                  className={ext2}
                />
              </g>
              <defs>
                <clipPath id="clip0_2961_44606">
                  <rect
                    width="15"
                    height="15"
                    fill="white"
                    transform="translate(-0.000244141)"
                  />
                </clipPath>
              </defs>
            </svg>
          );
        case "azBell":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 15 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.56546 11.5003L3.4177 10.6137C3.69071 10.3302 3.84093 9.95362 3.84093 9.55308V6.04495C3.84093 5.02709 4.26705 4.05424 5.01096 3.37767C5.76064 2.69509 6.71544 2.39506 7.70996 2.53083C9.3906 2.7626 10.6581 4.34077 10.6581 6.20247V9.55308C10.6581 9.95362 10.8084 10.3302 11.0806 10.6129L11.9336 11.5003H2.56546ZM8.69332 13.2562C8.69332 13.9305 8.03175 14.5006 7.24884 14.5006C6.46594 14.5006 5.80437 13.9305 5.80437 13.2562V13.0004H8.69332V13.2562ZM13.4033 10.9062L12.1026 9.55306V6.20245C12.1026 3.59142 10.2956 1.37343 7.89917 1.04415C6.51103 0.852127 5.10989 1.29242 4.05903 2.24953C3.00168 3.21113 2.39644 4.59428 2.39644 6.04493L2.39572 9.55306L1.09497 10.9062C0.756244 11.2587 0.655853 11.783 0.839301 12.2428C1.02347 12.7034 1.45176 13.0004 1.93132 13.0004H4.36021V13.2562C4.36021 14.7699 5.6559 16.0008 7.24915 16.0008C8.84241 16.0008 10.1381 14.7699 10.1381 13.2562V13.0004H12.567C13.0465 13.0004 13.4741 12.7034 13.6576 12.2436C13.8417 11.783 13.7421 11.258 13.4033 10.9062Z"
                fill={fillColor}
                className={ext1}
              />
              <path
                d="M2.56546 11.5003L2.45732 11.3963L2.21321 11.6503H2.56546V11.5003ZM3.4177 10.6137L3.30965 10.5097L3.30956 10.5097L3.4177 10.6137ZM5.01096 3.37767L5.11188 3.48864L5.11194 3.48858L5.01096 3.37767ZM7.70996 2.53083L7.73045 2.38223L7.73025 2.38221L7.70996 2.53083ZM11.0806 10.6129L11.1888 10.509L11.1887 10.5089L11.0806 10.6129ZM11.9336 11.5003V11.6503H12.2858L12.0417 11.3963L11.9336 11.5003ZM5.80437 13.0004V12.8504H5.65437V13.0004H5.80437ZM8.69332 13.0004H8.84332V12.8504H8.69332V13.0004ZM12.1026 9.55306H11.9526V9.61346L11.9944 9.65701L12.1026 9.55306ZM7.89917 1.04415L7.87861 1.19273L7.87875 1.19275L7.89917 1.04415ZM4.05903 2.24953L4.15996 2.3605L4.16004 2.36042L4.05903 2.24953ZM2.39644 6.04493L2.54644 6.04496V6.04493H2.39644ZM2.39572 9.55306L2.50386 9.65701L2.54571 9.61348L2.54572 9.55309L2.39572 9.55306ZM1.09497 10.9062L0.986834 10.8023L0.98681 10.8023L1.09497 10.9062ZM0.839301 12.2428L0.69998 12.2984L0.700024 12.2985L0.839301 12.2428ZM4.36021 13.0004H4.51021V12.8504H4.36021V13.0004ZM10.1381 13.0004V12.8504H9.9881V13.0004H10.1381ZM13.6576 12.2436L13.5183 12.1879L13.5182 12.188L13.6576 12.2436ZM2.6736 11.6042L3.52584 10.7176L3.30956 10.5097L2.45732 11.3963L2.6736 11.6042ZM3.52575 10.7177C3.82621 10.4057 3.99093 9.99165 3.99093 9.55308H3.69093C3.69093 9.9156 3.55521 10.2546 3.30965 10.5097L3.52575 10.7177ZM3.99093 9.55308V6.04495H3.69093V9.55308H3.99093ZM3.99093 6.04495C3.99093 5.06865 4.39974 4.13632 5.11188 3.48864L4.91003 3.2667C4.13436 3.97216 3.69093 4.98553 3.69093 6.04495H3.99093ZM5.11194 3.48858C5.82922 2.83551 6.73975 2.54977 7.68967 2.67945L7.73025 2.38221C6.69112 2.24035 5.69206 2.55468 4.90997 3.26675L5.11194 3.48858ZM7.68946 2.67942C9.28554 2.89953 10.5081 4.40476 10.5081 6.20247H10.8081C10.8081 4.27678 9.49566 2.62567 7.73045 2.38223L7.68946 2.67942ZM10.5081 6.20247V9.55308H10.8081V6.20247H10.5081ZM10.5081 9.55308C10.5081 9.99159 10.6728 10.4057 10.9726 10.717L11.1887 10.5089C10.9439 10.2547 10.8081 9.91565 10.8081 9.55308H10.5081ZM10.9725 10.7169L11.8255 11.6042L12.0417 11.3963L11.1888 10.509L10.9725 10.7169ZM11.9336 11.3503H2.56546V11.6503H11.9336V11.3503ZM8.54332 13.2562C8.54332 13.8275 7.97066 14.3506 7.24884 14.3506V14.6506C8.09283 14.6506 8.84332 14.0336 8.84332 13.2562H8.54332ZM7.24884 14.3506C6.52702 14.3506 5.95437 13.8275 5.95437 13.2562H5.65437C5.65437 14.0336 6.40485 14.6506 7.24884 14.6506V14.3506ZM5.95437 13.2562V13.0004H5.65437V13.2562H5.95437ZM5.80437 13.1504H8.69332V12.8504H5.80437V13.1504ZM8.54332 13.0004V13.2562H8.84332V13.0004H8.54332ZM13.5115 10.8023L12.2107 9.44911L11.9944 9.65701L13.2952 11.0102L13.5115 10.8023ZM12.2526 9.55306V6.20245H11.9526V9.55306H12.2526ZM12.2526 6.20245C12.2526 3.5255 10.3988 1.23622 7.91959 0.895544L7.87875 1.19275C10.1923 1.51065 11.9526 3.65734 11.9526 6.20245H12.2526ZM7.91972 0.895562C6.48669 0.697332 5.04121 1.15208 3.95803 2.13863L4.16004 2.36042C5.17856 1.43277 6.53536 1.00692 7.87861 1.19273L7.91972 0.895562ZM3.95811 2.13855C2.86891 3.12912 2.24644 4.55282 2.24644 6.04493H2.54644C2.54644 4.63573 3.13444 3.29314 4.15996 2.3605L3.95811 2.13855ZM2.24644 6.0449L2.24572 9.55303L2.54572 9.55309L2.54644 6.04496L2.24644 6.0449ZM2.28758 9.44911L0.986834 10.8023L1.20311 11.0102L2.50386 9.65701L2.28758 9.44911ZM0.98681 10.8023C0.60666 11.1979 0.495058 11.7848 0.69998 12.2984L0.978622 12.1873C0.816648 11.7813 0.905827 11.3196 1.20314 11.0101L0.98681 10.8023ZM0.700024 12.2985C0.905951 12.8135 1.38771 13.1504 1.93132 13.1504V12.8504C1.5158 12.8504 1.14099 12.5933 0.978578 12.1872L0.700024 12.2985ZM1.93132 13.1504H4.36021V12.8504H1.93132V13.1504ZM4.21021 13.0004V13.2562H4.51021V13.0004H4.21021ZM4.21021 13.2562C4.21021 14.8599 5.5804 16.1508 7.24915 16.1508V15.8508C5.7314 15.8508 4.51021 14.6799 4.51021 13.2562H4.21021ZM7.24915 16.1508C8.91791 16.1508 10.2881 14.8599 10.2881 13.2562H9.9881C9.9881 14.6799 8.76691 15.8508 7.24915 15.8508V16.1508ZM10.2881 13.2562V13.0004H9.9881V13.2562H10.2881ZM10.1381 13.1504H12.567V12.8504H10.1381V13.1504ZM12.567 13.1504C13.1106 13.1504 13.5917 12.8135 13.7969 12.2992L13.5182 12.188C13.3565 12.5933 12.9825 12.8504 12.567 12.8504V13.1504ZM13.7968 12.2993C14.0024 11.7852 13.8919 11.1973 13.5114 10.8022L13.2953 11.0102C13.5922 11.3187 13.681 11.7809 13.5183 12.1879L13.7968 12.2993Z"
                fill={fillColor}
                className={ext1}
              />
            </svg>
          );
        case "azPersonX":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_6531_83358)">
                <path
                  d="M11 13.246H11.251L11.25 12.995C11.2487 12.6852 11.0709 11.8813 10.3448 11.1552C9.63717 10.4476 8.34186 9.75 6 9.75C3.65712 9.75 2.36282 10.4476 1.65522 11.1552C0.928757 11.8817 0.752517 12.6854 0.750008 12.994L0.747959 13.246H1H11ZM7.94454 6.94454C7.42882 7.46027 6.72935 7.75 6 7.75C5.27065 7.75 4.57118 7.46027 4.05546 6.94454C3.53973 6.42882 3.25 5.72935 3.25 5C3.25 4.27065 3.53973 3.57118 4.05546 3.05546C4.57118 2.53973 5.27065 2.25 6 2.25C6.72935 2.25 7.42882 2.53973 7.94454 3.05546C8.46027 3.57118 8.75 4.27065 8.75 5C8.75 5.72935 8.46027 6.42882 7.94454 6.94454ZM7.59099 6.59099C8.01295 6.16903 8.25 5.59674 8.25 5C8.25 4.40326 8.01295 3.83097 7.59099 3.40901C7.16903 2.98705 6.59674 2.75 6 2.75C5.40326 2.75 4.83097 2.98705 4.40901 3.40901C3.98705 3.83097 3.75 4.40326 3.75 5C3.75 5.59674 3.98705 6.16903 4.40901 6.59099C4.83097 7.01295 5.40326 7.25 6 7.25C6.59674 7.25 7.16903 7.01295 7.59099 6.59099ZM11.75 13C11.75 13.2063 11.6992 13.3443 11.6357 13.4395L1.0008 13.75L1.00044 13.75H1.00023L0.997098 13.7499C0.992722 13.7497 0.985149 13.7494 0.974843 13.7487C0.954146 13.7472 0.922946 13.7441 0.88485 13.7378C0.807473 13.7249 0.708125 13.6996 0.611803 13.6514C0.516461 13.6037 0.428723 13.5361 0.364263 13.4395C0.300845 13.3443 0.25 13.2063 0.25 13C0.25 12.5642 0.475136 11.6284 1.30178 10.8018C2.12109 9.98246 3.55272 9.25 6 9.25C8.44728 9.25 9.87891 9.98246 10.6982 10.8018C11.5249 11.6284 11.75 12.5642 11.75 13Z"
                  fill={fillColor}
                  className={ext2}
                  stroke={strokeColor}
                  stroke-width="0.5"
                />
                <path
                  d="M12.3226 5.32389L12.3226 5.32389C12.2993 5.34712 12.2808 5.3747 12.2682 5.40508C12.2556 5.43545 12.2491 5.46801 12.2491 5.50089C12.2491 5.53378 12.2556 5.56634 12.2682 5.59671C12.2808 5.62708 12.2993 5.65467 12.3226 5.67789L12.3227 5.67804L13.4697 6.82404L13.6467 7.00089L13.4697 7.17775L12.3228 8.32367L12.3226 5.32389ZM12.3226 5.32389L12.323 5.32345M12.3226 5.32389L12.323 5.32345M12.323 5.32345C12.3463 5.30017 12.3738 5.28169 12.4042 5.26909C12.4346 5.25649 12.4672 5.25 12.5 5.25C12.5329 5.25 12.5655 5.25649 12.5959 5.26909C12.6262 5.28169 12.6538 5.30017 12.677 5.32345L12.6772 5.32359M12.323 5.32345L12.6772 5.32359M12.6772 5.32359L13.8232 6.47059L14 6.6476M12.6772 5.32359L14 6.6476M14 6.6476L14.1769 6.47059M14 6.6476L14.1769 6.47059M14.1769 6.47059L15.3228 5.32367M14.1769 6.47059L15.3228 5.32367M14.3533 7.00089L14.5303 6.82404L15.6773 5.67812L14.3533 7.00089ZM14.3533 7.00089L14.5303 7.17775M14.3533 7.00089L14.5303 7.17775M14.5303 7.17775L15.6773 8.32367L14.5303 7.17775ZM14 7.35419L14.1769 7.53119L15.3228 8.67812L14 7.35419ZM14 7.35419L13.8232 7.53119M14 7.35419L13.8232 7.53119M13.8232 7.53119L12.6773 8.67812L13.8232 7.53119ZM15.3228 5.32367L15.3229 5.32359M15.3228 5.32367L15.3229 5.32359M15.3229 5.32359C15.3699 5.27664 15.4336 5.25026 15.5 5.25026M15.3229 5.32359L15.5 5.25026M15.5 5.25026C15.5665 5.25026 15.6303 5.27667 15.6773 5.32367M15.5 5.25026L15.6773 5.32367M15.6773 5.32367C15.7243 5.37067 15.7507 5.43442 15.7507 5.50089M15.6773 5.32367L15.7507 5.50089M15.7507 5.50089C15.7507 5.56733 15.7243 5.63105 15.6773 5.67804L15.7507 5.50089ZM15.7507 8.50089C15.7507 8.43446 15.7243 8.37074 15.6773 8.32375L15.7507 8.50089ZM15.7507 8.50089C15.7507 8.56737 15.7243 8.63111 15.6773 8.67812M15.7507 8.50089L15.6773 8.67812M15.6773 8.67812C15.6303 8.72512 15.5665 8.75152 15.5 8.75152M15.6773 8.67812L15.5 8.75152M15.5 8.75152C15.4336 8.75152 15.3699 8.72515 15.3229 8.67819L15.5 8.75152ZM12.5 8.75152C12.5665 8.75152 12.6302 8.72515 12.6772 8.67819L12.5 8.75152ZM12.5 8.75152C12.4336 8.75152 12.3698 8.72512 12.3228 8.67812M12.5 8.75152L12.3228 8.67812M12.3228 8.67812C12.2758 8.63111 12.2494 8.56737 12.2494 8.50089M12.3228 8.67812L12.2494 8.50089M12.2494 8.50089C12.2494 8.43446 12.2758 8.37074 12.3227 8.32375L12.2494 8.50089Z"
                  fill={fillColor}
                  className={ext2}
                  stroke={strokeColor}
                  stroke-width="0.5"
                />
              </g>
              <defs>
                <clipPath id="clip0_6531_83358">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          );
        case "azCamera":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.3325 5.50481H17.1485C16.7368 5.50481 16.3672 5.25248 16.2172 4.86905L15.7592 3.69795C15.6625 3.44826 15.4924 3.23349 15.2711 3.08177C15.0499 2.93005 14.7878 2.84845 14.5192 2.84766H9.47919C9.20946 2.84711 8.94591 2.92808 8.72333 3.07989C8.50076 3.2317 8.32962 3.4472 8.23252 3.69795L7.77998 4.86606C7.63082 5.25106 7.26039 5.50481 6.84751 5.50481H2.66585C2.31223 5.50481 1.97309 5.64479 1.72304 5.89394C1.473 6.1431 1.33252 6.48103 1.33252 6.83339V20.1192C1.33252 20.4715 1.473 20.8094 1.72304 21.0586C1.97309 21.3078 2.31223 21.4477 2.66585 21.4477H21.3325C21.6861 21.4477 22.0253 21.3078 22.2753 21.0586C22.5254 20.8094 22.6658 20.4715 22.6658 20.1192V6.83339C22.6658 6.48103 22.5254 6.1431 22.2753 5.89394C22.0253 5.64479 21.6861 5.50481 21.3325 5.50481ZM21.3325 19.1192C21.3325 19.6714 20.8848 20.1192 20.3325 20.1192H3.66585C3.11357 20.1192 2.66585 19.6714 2.66585 19.1191V7.83339C2.66585 7.2811 3.11357 6.83339 3.66585 6.83339H7.76178C8.1742 6.83339 8.54431 6.5802 8.69379 6.19583L9.23125 4.81379C9.38073 4.42942 9.75084 4.17624 10.1633 4.17624H13.8351C14.2475 4.17624 14.6176 4.42942 14.7671 4.81379L15.3046 6.19583C15.4541 6.5802 15.8242 6.83339 16.2366 6.83339H20.3325C20.8848 6.83339 21.3325 7.2811 21.3325 7.83339V19.1192Z"
                fill={fillColor}
              />
              <path
                d="M5.99902 12.8126C5.99902 13.995 6.35092 15.1509 7.01021 16.1341C7.66949 17.1173 8.60657 17.8836 9.70292 18.3361C10.7993 18.7886 12.0057 18.907 13.1696 18.6763C14.3335 18.4456 15.4025 17.8762 16.2417 17.0401C17.0808 16.204 17.6522 15.1387 17.8837 13.9789C18.1152 12.8192 17.9964 11.6171 17.5423 10.5247C17.0882 9.43222 16.3191 8.49849 15.3324 7.84156C14.3457 7.18462 13.1857 6.83398 11.999 6.83398C10.4077 6.83398 8.8816 7.46387 7.75638 8.58507C6.63116 9.70628 5.99902 11.227 5.99902 12.8126ZM16.9324 12.8126C16.9324 13.7848 16.643 14.7352 16.1009 15.5436C15.5589 16.352 14.7884 16.9821 13.8869 17.3541C12.9855 17.7262 11.9936 17.8235 11.0366 17.6339C10.0796 17.4442 9.20057 16.976 8.51063 16.2885C7.82069 15.601 7.35084 14.7251 7.16048 13.7716C6.97013 12.818 7.06783 11.8296 7.44122 10.9314C7.81461 10.0332 8.44693 9.26544 9.25821 8.7253C10.0695 8.18515 11.0233 7.89685 11.999 7.89685C13.3069 7.8986 14.5607 8.41707 15.4855 9.33857C16.4103 10.2601 16.9306 11.5094 16.9324 12.8126Z"
                fill={fillColor}
              />
              <path
                d="M6.24577 8.71502C6.24577 8.57408 6.18958 8.43891 6.08956 8.33925C5.98954 8.23958 5.85388 8.18359 5.71243 8.18359H4.11244C3.97099 8.18359 3.83533 8.23958 3.73531 8.33925C3.63529 8.43891 3.5791 8.57408 3.5791 8.71502C3.5791 8.85597 3.63529 8.99114 3.73531 9.0908C3.83533 9.19046 3.97099 9.24645 4.11244 9.24645H5.71243C5.85388 9.24645 5.98954 9.19046 6.08956 9.0908C6.18958 8.99114 6.24577 8.85597 6.24577 8.71502Z"
                fill={fillColor}
              />
              <path
                d="M8.22568 12.8137C8.23318 13.5144 8.44016 14.1984 8.82254 14.7864C9.12489 15.2514 9.52709 15.6411 9.99795 15.9287C10.2123 16.0597 10.4852 15.9754 10.618 15.7621C10.7885 15.4882 10.655 15.1271 10.3815 14.956C10.221 14.8557 10.0712 14.7382 9.93491 14.6054C9.64706 14.325 9.42666 13.9833 9.29025 13.6058C9.15384 13.2284 9.10496 12.8251 9.14728 12.4262C9.18959 12.0273 9.322 11.6431 9.53458 11.3024C9.74715 10.9618 10.0344 10.6735 10.3747 10.4592C10.715 10.2449 11.0996 10.1102 11.4997 10.0652C11.8997 10.0201 12.3048 10.0659 12.6845 10.1991C12.8636 10.2619 13.0348 10.3433 13.1955 10.4417C13.4722 10.6112 13.8568 10.5712 14.0289 10.2961C14.164 10.08 14.1183 9.7936 13.9021 9.65849C13.437 9.36772 12.9111 9.18253 12.362 9.11866C11.6643 9.03751 10.9579 9.15557 10.3249 9.45908C9.69196 9.76259 9.15858 10.2391 8.78693 10.833C8.41527 11.4269 8.22063 12.1138 8.22568 12.8137Z"
                fill={fillColor}
              />
            </svg>
          );
        case "azWarning":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.6504 9C11.6504 8.448 12.0984 8 12.6504 8C13.2024 8 13.6504 8.448 13.6504 9V13C13.6504 13.552 13.2024 14 12.6504 14C12.0984 14 11.6504 13.552 11.6504 13V9ZM11.6504 16C11.6504 15.448 12.0984 15 12.6504 15C13.2024 15 13.6504 15.448 13.6504 16C13.6504 16.552 13.2024 17 12.6504 17C12.0984 17 11.6504 16.552 11.6504 16ZM21.5151 18.353C21.2861 18.758 20.8401 19 20.3221 19H4.97809C4.46009 19 4.01409 18.758 3.78609 18.353C3.67809 18.163 3.53609 17.776 3.80309 17.336L11.4741 4.618C11.9411 3.844 13.3591 3.844 13.8261 4.618L21.4981 17.336C21.7641 17.776 21.6231 18.163 21.5151 18.353ZM23.2111 16.303L15.5391 3.584C14.9401 2.592 13.8601 2 12.6501 2C11.4401 2 10.3601 2.592 9.76209 3.584L2.09009 16.303C1.52109 17.246 1.50409 18.38 2.04409 19.336C2.62309 20.363 3.74809 21 4.97809 21H20.3221C21.5531 21 22.6771 20.363 23.2571 19.336C23.7971 18.38 23.7801 17.246 23.2111 16.303Z"
                fill={fillColor}
              />
            </svg>
          );
        case "azUpload":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" fill={fillColor} />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.9895 3.5C12.1905 3.5 12.3915 3.561 12.5645 3.68199L16.5645 6.49586C17.0165 6.81385 17.1255 7.43782 16.8075 7.8888C16.4895 8.34078 15.8665 8.44978 15.4145 8.13179L13.0008 6.43389C13.0022 6.45568 13.0029 6.47766 13.0029 6.49981V14.4995C13.0029 15.0514 12.5559 15.4994 12.0029 15.4994C11.4499 15.4994 11.0029 15.0514 11.0029 14.4995V6.49981C11.0029 6.49653 11.0029 6.49324 11.003 6.48996L8.58953 8.29978C8.14753 8.63277 7.52053 8.54177 7.18953 8.09979C6.85753 7.65781 6.94753 7.03084 7.38953 6.69986L11.3895 3.69999C11.5665 3.567 11.7785 3.5 11.9895 3.5ZM6 17.5001V18.5H18V17.5001C18 16.9501 18.45 16.5002 19 16.5002C19.55 16.5002 20 16.9501 20 17.5001V19.5V19.5C20 19.5688 19.993 19.6359 19.9796 19.7009C19.9653 19.7703 19.9437 19.8371 19.9158 19.9005L19.9112 19.9109L19.9064 19.9212C19.7467 20.2623 19.3998 20.5 19 20.5L18.9915 20.5H5.00855L5 20.5C4.45 20.5 4 20.05 4 19.5V19.5V17.5001C4 16.9501 4.45 16.5002 5 16.5002C5.55 16.5002 6 16.9501 6 17.5001Z"
                fill={ext1}
              />
            </svg>
          );
        case "azInfoOutlined":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 1.5C4.8544 1.5 1.5 4.8547 1.5 9C1.5 13.1456 4.8547 16.5 9 16.5C13.1456 16.5 16.5 13.1453 16.5 9C16.5 4.8544 13.1453 1.5 9 1.5ZM9 15.3281C5.50216 15.3281 2.67188 12.4976 2.67188 9C2.67188 5.50216 5.50239 2.67188 9 2.67188C12.4978 2.67188 15.3281 5.50239 15.3281 9C15.3281 12.4978 12.4976 15.3281 9 15.3281Z"
                fill={fillColor}
              />
              <path
                d="M9 7.7793C8.67639 7.7793 8.41406 8.04162 8.41406 8.36523V12.1385C8.41406 12.4621 8.67639 12.7244 9 12.7244C9.32361 12.7244 9.58594 12.4621 9.58594 12.1384V8.36523C9.58594 8.04162 9.32361 7.7793 9 7.7793Z"
                fill={fillColor}
              />
              <path
                d="M9 7.0625C9.43687 7.0625 9.79102 6.70835 9.79102 6.27148C9.79102 5.83462 9.43687 5.48047 9 5.48047C8.56313 5.48047 8.20898 5.83462 8.20898 6.27148C8.20898 6.70835 8.56313 7.0625 9 7.0625Z"
                fill={fillColor}
              />
            </svg>
          );
        case "editTicket": {
          return (
            <svg
              className={className}
              viewBox="0 0 16 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.98314 5.32428L2.36614 10.9413L2.10214 13.8973L5.07914 13.6263L10.6791 8.02028L7.98314 5.32428ZM13.9661 4.73028L11.2711 2.03628L9.32314 3.98428L12.0181 6.68028L13.9661 4.73028ZM1.09114 15.9973C1.06014 16.0003 1.03014 16.0013 1.00014 16.0013C0.736142 16.0013 0.481142 15.8973 0.293142 15.7083C0.0831418 15.4983 -0.0228583 15.2063 0.00414175 14.9113L0.383142 10.7403C0.425142 10.2833 0.627142 9.85228 0.952142 9.52728L9.94814 0.530279C10.6501 -0.173721 11.9241 -0.138721 12.6641 0.600279L15.4021 3.33828H15.4031C16.1691 4.10528 16.1991 5.32228 15.4711 6.05228L6.47414 15.0493C6.14914 15.3753 5.71914 15.5763 5.26114 15.6183L1.09114 15.9973ZM1 18.0014H15C15.55 18.0014 16 18.4514 16 19.0014C16 19.5514 15.55 20.0014 15 20.0014H1C0.45 20.0014 0 19.5514 0 19.0014C0 18.4514 0.45 18.0014 1 18.0014Z"
              />
            </svg>
          );
        }
        case "deleteTicket": {
          return (
            <svg
              viewBox="0 0 21 21"
              xmlns="http://www.w3.org/2000/svg"
              className={className}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.43766 14.7618C8.43766 15.3118 7.98766 15.7618 7.43766 15.7618C6.88766 15.7618 6.43766 15.3118 6.43766 14.7618V10.7618C6.43766 10.2118 6.88766 9.76176 7.43766 9.76176C7.98766 9.76176 8.43766 10.2118 8.43766 10.7618V14.7618ZM14.4373 14.7618C14.4373 15.3118 13.9873 15.7618 13.4373 15.7618C12.8873 15.7618 12.4373 15.3118 12.4373 14.7618V10.7618C12.4373 10.2118 12.8873 9.7618 13.4373 9.7618C13.9873 9.7618 14.4373 10.2118 14.4373 10.7618V14.7618ZM16.4373 17.7617C16.4373 18.3127 15.9893 18.7617 15.4373 18.7617H5.43734C4.88534 18.7617 4.43734 18.3127 4.43734 17.7617V6.76168H16.4373V17.7617ZM8.43758 3.08964C8.43758 2.93464 8.65158 2.76164 8.93758 2.76164H11.9376C12.2236 2.76164 12.4376 2.93464 12.4376 3.08964V4.76164H8.43758V3.08964ZM19.4375 4.76172H18.4375H14.4375V3.08972C14.4375 1.80572 13.3165 0.761719 11.9375 0.761719H8.9375C7.5585 0.761719 6.4375 1.80572 6.4375 3.08972V4.76172H2.4375H1.4375C0.8875 4.76172 0.4375 5.21172 0.4375 5.76172C0.4375 6.31172 0.8875 6.76172 1.4375 6.76172H2.4375V17.7617C2.4375 19.4157 3.7835 20.7617 5.4375 20.7617H15.4375C17.0915 20.7617 18.4375 19.4157 18.4375 17.7617V6.76172H19.4375C19.9875 6.76172 20.4375 6.31172 20.4375 5.76172C20.4375 5.21172 19.9875 4.76172 19.4375 4.76172Z"
              />
            </svg>
          );
        }
        case "outlinedTrash":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.82825 11.8203C7.82825 12.2328 7.49075 12.5703 7.07825 12.5703C6.66575 12.5703 6.32825 12.2328 6.32825 11.8203V8.82034C6.32825 8.40784 6.66575 8.07034 7.07825 8.07034C7.49075 8.07034 7.82825 8.40784 7.82825 8.82034V11.8203ZM12.328 11.8204C12.328 12.2329 11.9905 12.5704 11.578 12.5704C11.1655 12.5704 10.828 12.2329 10.828 11.8204V8.82037C10.828 8.40787 11.1655 8.07037 11.578 8.07037C11.9905 8.07037 12.328 8.40787 12.328 8.82037V11.8204ZM13.828 14.0703C13.828 14.4835 13.492 14.8203 13.078 14.8203H5.578C5.164 14.8203 4.828 14.4835 4.828 14.0703V5.82028H13.828V14.0703ZM7.82819 3.06625C7.82819 2.95 7.98869 2.82025 8.20319 2.82025H10.4532C10.6677 2.82025 10.8282 2.95 10.8282 3.06625V4.32025H7.82819V3.06625ZM16.0781 4.32031H15.3281H12.3281V3.06631C12.3281 2.10331 11.4874 1.32031 10.4531 1.32031H8.20312C7.16888 1.32031 6.32812 2.10331 6.32812 3.06631V4.32031H3.32812H2.57812C2.16562 4.32031 1.82812 4.65781 1.82812 5.07031C1.82812 5.48281 2.16562 5.82031 2.57812 5.82031H3.32812V14.0703C3.32812 15.3108 4.33763 16.3203 5.57812 16.3203H13.0781C14.3186 16.3203 15.3281 15.3108 15.3281 14.0703V5.82031H16.0781C16.4906 5.82031 16.8281 5.48281 16.8281 5.07031C16.8281 4.65781 16.4906 4.32031 16.0781 4.32031Z"
                fill={fillColor}
              />
            </svg>
          );
        case "filledPlus":
          return (
            <svg
              width={size}
              height={size}
              className={className}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="6.125" fill={fillColor} />
              <path
                d="M7.65625 12.25H16.8438"
                stroke={ext2}
                stroke-width="1.14844"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.25 16.8438V7.65625"
                stroke={ext2}
                stroke-width="1.14844"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          );
        case "bankCard":
          return (
            <svg
            width={size}
            height={size}
            className={className}
              viewBox="0 0 38 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.418 23.1257H11.0846C10.2138 23.1257 9.5013 22.4319 9.5013 21.584C9.5013 20.7361 10.2138 20.0423 11.0846 20.0423H17.418C18.2888 20.0423 19.0013 20.7361 19.0013 21.584C19.0013 22.4319 18.2888 23.1257 17.418 23.1257ZM26.918 23.1257H23.7513C22.8805 23.1257 22.168 22.4319 22.168 21.584C22.168 20.7361 22.8805 20.0423 23.7513 20.0423H26.918C27.7888 20.0423 28.5013 20.7361 28.5013 21.584C28.5013 22.4319 27.7888 23.1257 26.918 23.1257ZM31.668 24.6673C31.668 25.5168 30.9586 26.209 30.0846 26.209H7.91797C7.04397 26.209 6.33464 25.5168 6.33464 24.6673V16.959H31.668V24.6673ZM6.33464 12.334C6.33464 11.4845 7.04397 10.7923 7.91797 10.7923H30.0846C30.9586 10.7923 31.668 11.4845 31.668 12.334V13.8757H6.33464V12.334ZM30.0846 7.70898H7.91797C5.29914 7.70898 3.16797 9.78407 3.16797 12.334V24.6673C3.16797 27.2172 5.29914 29.2923 7.91797 29.2923H30.0846C32.7035 29.2923 34.8346 27.2172 34.8346 24.6673V12.334C34.8346 9.78407 32.7035 7.70898 30.0846 7.70898Z"
                fill={fillColor}
              />
            </svg>
          );
        case "":
          return <svg></svg>;

        // Diğer ikonlar buraya eklenebilir...
        default:
          return "";
      }
    },
  },
};

export type AppTheme = typeof AppThemeConfig;

let currentAppTheme = AppThemeConfig;
export function getAppTheme(config?: any): Readonly<AppTheme> {
  if (config) {
    var tmpValue = merge(currentAppTheme, removeEmptyProps(config));
    return tmpValue;
  }
  return currentAppTheme;
}
export function changeAppTheme(theme: any) {
  currentAppTheme = merge(currentAppTheme, theme);
  return currentAppTheme;
}
