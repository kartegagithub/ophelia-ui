function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

function _interopNamespace(e) {
  if (e && e.__esModule) { return e; } else {
    var n = {};
    if (e) {
      Object.keys(e).forEach(function (k) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      });
    }
    n['default'] = e;
    return n;
  }
}

var React$1 = require('react');
var React$1__default = _interopDefault(React$1);
var moment = _interopDefault(require('moment'));
var _ = _interopDefault(require('lodash-es'));
require('react-quill/dist/quill.snow.css');
var hljs = _interopDefault(require('highlight.js'));
var dynamic = _interopDefault(require('next/dynamic'));
var Link = _interopDefault(require('next/link'));
var solid = require('@heroicons/react/24/solid');
var Router = _interopDefault(require('next/router'));
var jspdf = require('jspdf');
var html2canvas = _interopDefault(require('html2canvas'));
var mime = _interopDefault(require('mime-types'));
var Pluralize = _interopDefault(require('pluralize'));
var library = require('@zxing/library');
var useSWR = _interopDefault(require('swr'));
require('recharts');
require('react-select/async');
var navigation = require('next/navigation');

var SystemLog = function SystemLog() {
  var _this = this;
  this.Enabled = true;
  this.OriginalLog = function (message) {};
  this.OriginalWarning = function (message) {};
  this.OriginalError = function (message) {};
  this.OriginalInfo = function (message) {};
  this.OriginalDebug = function (message) {};
  this.log = function (message) {
    if (!_this.Enabled) return _this;
    for (var _len = arguments.length, optionalParams = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      optionalParams[_key - 1] = arguments[_key];
    }
    if (_this.OriginalLog != null) _this.OriginalLog(message, optionalParams);
    return _this;
  };
  this.warn = function (message) {
    if (!_this.Enabled) return _this;
    for (var _len2 = arguments.length, optionalParams = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      optionalParams[_key2 - 1] = arguments[_key2];
    }
    if (_this.OriginalWarning != null) _this.OriginalWarning(message, optionalParams);
    return _this;
  };
  this.error = function (message) {
    if (!_this.Enabled) return _this;
    for (var _len3 = arguments.length, optionalParams = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      optionalParams[_key3 - 1] = arguments[_key3];
    }
    if (_this.OriginalError != null) _this.OriginalError(message, optionalParams);
    return _this;
  };
  this.info = function (message) {
    if (!_this.Enabled) return _this;
    for (var _len4 = arguments.length, optionalParams = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      optionalParams[_key4 - 1] = arguments[_key4];
    }
    if (_this.OriginalInfo != null) _this.OriginalInfo(message, optionalParams);
    return _this;
  };
  this.debug = function (message) {
    if (!_this.Enabled) return _this;
    for (var _len5 = arguments.length, optionalParams = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      optionalParams[_key5 - 1] = arguments[_key5];
    }
    if (_this.OriginalDebug != null) _this.OriginalDebug(message, optionalParams);
    return _this;
  };
  this.enable = function () {
    _this.Enabled = true;
  };
  this.disable = function () {
    _this.Enabled = false;
  };
};

var AnalyticsList = /*#__PURE__*/function () {
  function AnalyticsList() {
    this.InnerList = new Array();
  }
  var _proto = AnalyticsList.prototype;
  _proto.push = function push(item) {
    this.Add(item);
  };
  _proto.Add = function Add(item) {
    this.InnerList.push(item);
  };
  _proto.ReportEvent = function ReportEvent(eventType, data) {
    this.InnerList.forEach(function (item) {
      item.ReportEvent(eventType, data);
    });
  };
  return AnalyticsList;
}();

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var Region_EN = {
  Code: "en",
  Tag: "en_US",
  DateFormat: {
    FirstDayOfWeek: "Sunday",
    LongDateFormat: "MM/DD/YYYY HH:mm",
    ShortDateFormat: "MM/DD/YYYY",
    TimeFormat: "HH:mm",
    WeekFormat: "WW",
    MonthFormat: "MMMM"
  },
  NumberFormat: {
    DecimalSeperator: ".",
    ThousandGrouper: ","
  },
  Currency: {
    Symbol: "$"
  },
  Translations: null
};

var Region_TR = {
  Code: "tr",
  Tag: "en_TR",
  DateFormat: {
    FirstDayOfWeek: "Monday",
    LongDateFormat: "DD.MM.YYYY HH:mm",
    ShortDateFormat: "DD.MM.YYYY",
    TimeFormat: "HH:mm",
    WeekFormat: "WW",
    MonthFormat: "MMMM"
  },
  NumberFormat: {
    DecimalSeperator: ",",
    ThousandGrouper: "."
  },
  Currency: {
    Symbol: "₺"
  },
  Translations: null
};

var currentRegion = "en";
var registeredRegions = {};
function registerRegionSetting(code, setting) {
  code = code.toLocaleLowerCase();
  registeredRegions[code] = setting;
}
function getRegionSetting(code) {
  code = code.toLocaleLowerCase();
  if (registeredRegions[code]) return registeredRegions[code];
  return undefined;
}
function getCurrentRegionSetting() {
  return getRegionSetting(currentRegion.toLocaleLowerCase());
}
function changeRegion(code) {
  currentRegion = code.toLocaleLowerCase();
}
registerRegionSetting("EN", Region_EN);
registerRegionSetting("TR", Region_TR);
changeRegion("EN");

function capitalizeFirstLetter(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
function shortenText(text, length, hyphenActive) {
  if (length && (text === null || text === void 0 ? void 0 : text.length) >= length) {
    return text.substring(0, length) + "...";
  }
  return text ? text : hyphenActive ? "-" : "";
}
function validateEmail(email) {
  if (!email) return false;
  var re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function camelize(str) {
  if (!str) return "";
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}
function pascalize(str) {
  if (!str) return "";
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toUpperCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}
function removeLastPropName(str, replaceBy, keepHierarchy) {
  if (replaceBy === void 0) {
    replaceBy = "";
  }
  if (keepHierarchy === void 0) {
    keepHierarchy = false;
  }
  if (!str) return "";
  if (str.indexOf(".") == -1) return str;
  var splitted = str.split(".");
  var newStr = "";
  for (var index = 0; index < splitted.length - 1; index++) {
    var element = splitted[index];
    if (!keepHierarchy) newStr = element;else newStr += (index > 0 ? "." : "") + element;
  }
  if (replaceBy) return newStr + replaceBy;
  return newStr;
}
function replaceQueryParam(param, value, url) {
  var searchParams = "";
  if (!url) {
    url = document.location.pathname;
    searchParams = document.location.search;
  } else if (url.indexOf("?") > -1) {
    searchParams = url.substring(url.indexOf("?"), url.length);
    url = url.replace(searchParams, "");
  }
  var params = new URLSearchParams(searchParams);
  if (!value || value == "") params["delete"](param);else params.set(param, value);
  searchParams = params.toString().replaceAll("%2C", ",").replaceAll("%5B", "[").replaceAll("%5D", "]");
  return url + "?" + searchParams;
}
function getQueryParam(param, defaultValue, url) {
  var _params$get;
  var searchParams = "";
  if (!url) {
    searchParams = document.location.search;
  } else if (url.indexOf("?")) {
    searchParams = url.substring(url.indexOf("?"), url.length);
  }
  var params = new URLSearchParams(searchParams);
  return (_params$get = params.get(param)) != null ? _params$get : defaultValue;
}
function queryParamsAsObject(key, removeKey, url) {
  if (removeKey === void 0) {
    removeKey = false;
  }
  var searchParams = "";
  if (!url) {
    searchParams = document.location.search;
  } else if (url.indexOf("?")) {
    searchParams = url.substring(url.indexOf("?"), url.length);
  }
  var params = new URLSearchParams(searchParams);
  var returnValues = {};
  for (var _i = 0, _Array$from = Array.from(params.entries()); _i < _Array$from.length; _i++) {
    var _Array$from$_i = _Array$from[_i],
      item = _Array$from$_i[0],
      value = _Array$from$_i[1];
    if (item.indexOf(key) > -1) {
      var tmpKey = removeKey ? item.replace(key, "") : key;
      returnValues[tmpKey] = value;
      if (value) {
        if (value.startsWith("[") && value.endsWith("]")) {
          var arr = JSON.parse(value);
          if (arr && arr.length > 0) returnValues[tmpKey] = JSON.parse(value);
        }
      }
    }
  }
  return returnValues;
}
function isValidDate(value) {
  if (!value) return false;
  if (functionExists(value, "indexOf") && value.indexOf(" ") == -1 && value.indexOf(".") == -1 && value.indexOf("/") == -1 && value.indexOf("-") == -1) return false;
  if (typeof value === "object") return false;
  if (isNumeric(value)) return false;
  return moment(value).isValid();
}
function convertToDate(value) {
  if (!value) return moment(new Date());
  var setting = getCurrentRegionSetting();
  moment.locale(setting === null || setting === void 0 ? void 0 : setting.Code.toLowerCase());
  return moment(value);
}
function getFormattedDateString(value, toFormat, type) {
  if (type === void 0) {
    type = "datetime";
  }
  var setting = getCurrentRegionSetting();
  moment.locale(setting === null || setting === void 0 ? void 0 : setting.Code.toLowerCase());
  var date = convertToDate(value);
  if (!toFormat) {
    var _setting$DateFormat, _setting$DateFormat2, _setting$DateFormat3, _setting$DateFormat4, _setting$DateFormat5, _setting$DateFormat6, _setting$DateFormat7, _setting$DateFormat8, _setting$DateFormat9, _setting$DateFormat10;
    if (type === "date" && setting !== null && setting !== void 0 && (_setting$DateFormat = setting.DateFormat) !== null && _setting$DateFormat !== void 0 && _setting$DateFormat.ShortDateFormat) toFormat = setting === null || setting === void 0 ? void 0 : (_setting$DateFormat2 = setting.DateFormat) === null || _setting$DateFormat2 === void 0 ? void 0 : _setting$DateFormat2.ShortDateFormat;
    if (type === "datetime" && setting !== null && setting !== void 0 && (_setting$DateFormat3 = setting.DateFormat) !== null && _setting$DateFormat3 !== void 0 && _setting$DateFormat3.LongDateFormat) toFormat = setting === null || setting === void 0 ? void 0 : (_setting$DateFormat4 = setting.DateFormat) === null || _setting$DateFormat4 === void 0 ? void 0 : _setting$DateFormat4.LongDateFormat;
    if (type === "month" && setting !== null && setting !== void 0 && (_setting$DateFormat5 = setting.DateFormat) !== null && _setting$DateFormat5 !== void 0 && _setting$DateFormat5.MonthFormat) toFormat = setting === null || setting === void 0 ? void 0 : (_setting$DateFormat6 = setting.DateFormat) === null || _setting$DateFormat6 === void 0 ? void 0 : _setting$DateFormat6.MonthFormat;
    if (type === "time" && setting !== null && setting !== void 0 && (_setting$DateFormat7 = setting.DateFormat) !== null && _setting$DateFormat7 !== void 0 && _setting$DateFormat7.TimeFormat) toFormat = setting === null || setting === void 0 ? void 0 : (_setting$DateFormat8 = setting.DateFormat) === null || _setting$DateFormat8 === void 0 ? void 0 : _setting$DateFormat8.TimeFormat;
    if (type === "week" && setting !== null && setting !== void 0 && (_setting$DateFormat9 = setting.DateFormat) !== null && _setting$DateFormat9 !== void 0 && _setting$DateFormat9.WeekFormat) toFormat = setting === null || setting === void 0 ? void 0 : (_setting$DateFormat10 = setting.DateFormat) === null || _setting$DateFormat10 === void 0 ? void 0 : _setting$DateFormat10.WeekFormat;
  }
  if (!toFormat) toFormat = "MM/DD/YYYY";
  return moment(date).format(toFormat);
}
function isNumeric(str) {
  if (!str || str == "") return false;
  var re = /^\d*(\.\d+)?$/;
  return re.test(str);
}
function parseFloatIfCan(str) {
  if (isNumeric(str)) return parseFloat(str);
  return -1;
}
function formatString(str) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }
  if (!params || params.length == 0) return str;
  for (var i = 0; i < params.length; i++) {
    var reg = new RegExp("\\{" + i + "\\}", "gm");
    str = str.replace(reg, params[i].toString());
  }
  return str;
}
function padLeft(val, count, seperator) {
  var _val, _count, _seperator;
  val = (_val = val) != null ? _val : "";
  count = (_count = count) != null ? _count : 1;
  seperator = (_seperator = seperator) != null ? _seperator : " ";
  seperator = seperator + "";
  var val2 = val;
  for (var i = val.length; i < count; i++) {
    val2 = seperator + "" + val2;
  }
  return val2;
}
function toJson(val) {
  if (!val) return {};
  return JSON.parse(val);
}
function clone(val) {
  if (!val) return {};
  return JSON.parse(JSON.stringify(val));
}
function trimChars(val, c) {
  if (!val) return "";
  var re = new RegExp("^[" + c + "]+|[" + c + "]+$", "g");
  return val.replace(re, "");
}
function replaceLowerTRChars(val) {
  if (!val) return "";
  return val.replaceAll("ı", "i").replaceAll("ş", "s").replaceAll("ğ", "g").replaceAll("ü", "u").replaceAll("ö", "o").replaceAll("ç", "c");
}
function replaceUpperTRChars(val) {
  if (!val) return "";
  return val.replaceAll("İ", "I").replaceAll("Ş", "S").replaceAll("Ğ", "G").replaceAll("Ü", "U").replaceAll("Ö", "O").replaceAll("Ç", "C");
}
function toSlug(val) {
  if (!val) return "";
  var $slug = "";
  var trimmed = replaceLowerTRChars(val.trim().toLowerCase());
  $slug = trimmed.replace(/[^a-z0-9-]/gi, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return $slug;
}
function cleanLineFeeds(val) {
  if (!val) return "";
  return val.replace(/(\r\n|\n|\r)/gm, "");
}
function cleanSpaces(val) {
  if (!val) return "";
  return val.replace(/^\s+|\s+$/g, "");
}
function urlMatch(url1, url2) {
  var _url1$indexOf, _url2$indexOf;
  if (!url1 || !url2) return false;
  var index1 = (_url1$indexOf = url1.indexOf("?")) != null ? _url1$indexOf : -1;
  var index2 = (_url2$indexOf = url2.indexOf("?")) != null ? _url2$indexOf : -1;
  if (index1 != index2) return false;
  var left = url1;
  var right = url2;
  if (index1 > -1) left = url1.substring(0, index1);
  if (index2 > -1) right = url2.substring(0, index2);
  return left == right;
}
function isNullOrEmpty(val) {
  if (isNaN(val) || val == undefined || val == null || val == "") return true;
  return false;
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(function (key) {
    return object[key] === value;
  });
}
function getQueryString(object, url, disableCache) {
  if (url === void 0) {
    url = "";
  }
  if (disableCache === void 0) {
    disableCache = false;
  }
  var keys = "";
  if (object) {
    keys = Object.keys(object).map(function (key) {
      if (!object[key]) return "";
      return encodeURIComponent(key) + "=" + encodeURIComponent(object[key]);
    }).join("&");
  }
  var cacheKey = "";
  if (disableCache) cacheKey = "&_=" + randomId() + randomId();
  if (url) {
    if (url.indexOf("?") === -1) return url + "?" + keys + cacheKey;else return url + "&" + keys + cacheKey;
  }
  return "" + keys + cacheKey;
}
var randomId = function randomId() {
  return Math.random().toString(36).substring(2, 100);
};
var typeCheck = function typeCheck(element, typesToCheck) {
  var elementType = typeof element;
  var type = element.type;
  if (type && type.displayName) elementType = type.displayName;else if (type && type.name) elementType = type.name;
  if (typesToCheck && typesToCheck.length > 0) return typesToCheck.indexOf(elementType) > -1;
  return false;
};
var deepMap = function deepMap(children, types) {
  var result = [];
  if (!children) return result;
  React$1.Children.forEach(children, function (child) {
    if (child === null) return null;
    if (typeCheck(child, types)) {
      result.push(child);
    }
    if (child.props && child.props.children && typeof child.props.children === 'object') {
      result = result.concat(deepMap(child.props.children, types));
    }
    return undefined;
  });
  return result;
};
var getReferencePath = function getReferencePath(propName) {
  if (!propName) return propName;
  if (propName.indexOf(".") > -1) {
    var names = propName.split(".");
    var tmpNames = "";
    for (var index = 0; index < names.length - 1; index++) {
      var indexedName = names[index];
      if (index > 0) tmpNames += ".";
      tmpNames += indexedName;
    }
    return tmpNames;
  }
  return propName;
};
var getObjectValue = function getObjectValue(obj, propName, defaultValue) {
  var _value;
  if (defaultValue === void 0) {
    defaultValue = "";
  }
  if (!propName || !obj) return defaultValue;
  var value = defaultValue;
  if (propName.indexOf(".") > -1) {
    var names = propName.split(".");
    var tmpObj = obj;
    for (var index = 0; index < names.length - 1; index++) {
      var indexedName = names[index];
      if (tmpObj[indexedName]) tmpObj = tmpObj[indexedName];
    }
    if (tmpObj && tmpObj != obj) value = tmpObj[names[names.length - 1]];
  } else value = obj[propName];
  return (_value = value) != null ? _value : defaultValue;
};
var setObjectValue = function setObjectValue(obj, propName, value) {
  if (!propName || !obj) return;
  if (propName.indexOf(".") > -1) {
    var names = propName.split(".");
    var tmpObj = obj;
    for (var index = 0; index < names.length - 1; index++) {
      var indexedName = names[index];
      if (!tmpObj[indexedName]) tmpObj[indexedName] = {};
      tmpObj = tmpObj[indexedName];
    }
    if (tmpObj) tmpObj[names[names.length - 1]] = value;
  } else obj[propName] = value;
};
function functionExists(obj, funcName) {
  if (!obj || !funcName) return false;
  return typeof obj["indexOf"] === "function";
}
function execInTry(fn, catchFn) {
  try {
    return fn();
  } catch (error) {
    catchFn(error);
  }
  return undefined;
}
var removeEmptyProps = function removeEmptyProps(obj) {
  Object.keys(obj).forEach(function (key) {
    if (typeof obj[key] === "object") removeEmptyProps(obj[key]);else if (obj[key] === undefined) delete obj[key];
  });
  return obj;
};
var enumToArray = function enumToArray(type, translateFn) {
  return Object.keys(type).filter(function (key) {
    return !isNumeric(key);
  }).map(function (key) {
    var _translateFn;
    var text = key;
    if (translateFn) text = (_translateFn = translateFn(key)) != null ? _translateFn : key;
    return {
      value: type[key],
      text: text
    };
  });
};

var Endpoint = /*#__PURE__*/function () {
  function Endpoint(service, url, options) {
    this.URL = "";
    this.Options = new EndpointOptions();
    this.Status = exports.ServiceStatus.NotInitialized;
    this.RetreivedFromCache = false;
    this.RequestID = "";
    this.Data = {};
    this.Service = service;
    this.URL = url;
    if (!this.Options) this.Options = new EndpointOptions();
    this.Options = _extends({}, this.Options, options);
    this.RequestID = randomId() + randomId();
  }
  var _proto = Endpoint.prototype;
  _proto.call = function call() {
    return this.Service.invokeEndpoint(this);
  };
  return Endpoint;
}();
var EndpointOptions = function EndpointOptions() {
  var _this = this;
  this.Parameters = undefined;
  this.Payload = undefined;
  this.Method = exports.RequestMethod.POST;
  this.ContentType = "application/json";
  this.CanBeCached = false;
  this.CacheDuration = 0;
  this.Headers = [];
  this.ValidateCache = undefined;
  this.toString = function (apiURL) {
    return apiURL + "_" + _this.Method + "_" + JSON.stringify(_this.Parameters);
  };
};
(function (ServiceStatus) {
  ServiceStatus["Success"] = "success";
  ServiceStatus["NotModified"] = "notmodified";
  ServiceStatus["Error"] = "error";
  ServiceStatus["Timeout"] = "timeout";
  ServiceStatus["Abort"] = "abort";
  ServiceStatus["ParseError"] = "parserror";
  ServiceStatus["Unknown"] = "unknown";
  ServiceStatus["NotInitialized"] = "";
  ServiceStatus["Fetching"] = "";
})(exports.ServiceStatus || (exports.ServiceStatus = {}));
(function (RequestMethod) {
  RequestMethod["GET"] = "GET";
  RequestMethod["POST"] = "POST";
  RequestMethod["PATCH"] = "PATCH";
  RequestMethod["PUT"] = "PUT";
  RequestMethod["HEAD"] = "HEAD";
  RequestMethod["TRACE"] = "TRACE";
  RequestMethod["OPTIONS"] = "OPTIONS";
  RequestMethod["CONNECT"] = "CONNECT";
  RequestMethod["DELETE"] = "DELETE";
})(exports.RequestMethod || (exports.RequestMethod = {}));

var APIService = /*#__PURE__*/function () {
  function APIService(client) {
    this.RootURL = "";
    this.Client = client;
  }
  var _proto = APIService.prototype;
  _proto.getURL = function getURL(url) {
    if (url.startsWith("http")) return url;
    if (!this.RootURL.endsWith('/')) this.RootURL += "/";
    if (url.startsWith('/')) url = url.substring(1, url.length);
    return this.RootURL + url;
  };
  _proto.invokeEndpoint = function invokeEndpoint(endpoint) {
    try {
      var _this = this;
      _this.OnBeforeRequest(endpoint);
      endpoint.Status = exports.ServiceStatus.Fetching;
      var options = {
        body: endpoint.Options.Payload ? JSON.stringify(endpoint.Options.Payload) : null,
        cache: "no-cache",
        headers: endpoint.Options.Headers,
        credentials: "same-origin",
        method: endpoint.Options.Method
      };
      options = _extends({}, options, _this.GetRequestOptions(endpoint));
      var url = getQueryString(endpoint.Options.Parameters, endpoint.URL);
      var fetcher = fetch(url, options).then(function (res) {
        return res.json();
      })["catch"](function (reason) {
        console.error(url, reason);
        endpoint.Status = exports.ServiceStatus.Error;
        _this.OnErrorResponse(endpoint, reason);
      });
      return Promise.resolve(fetcher).then(function (data) {
        endpoint.Status = exports.ServiceStatus.Success;
        endpoint.Data = data;
        _this.onAfterResponse(endpoint, data);
        return data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.GetRequestOptions = function GetRequestOptions(endpoint) {
    return {};
  };
  _proto.CreateEndpoint = function CreateEndpoint(api, options) {
    return new Endpoint(this, api, options);
  };
  _proto.CallEndpoint = function CallEndpoint(api, options) {
    return new Endpoint(this, api, options).call();
  };
  _proto.OnBeforeRequest = function OnBeforeRequest(endpoint) {};
  _proto.onAfterResponse = function onAfterResponse(endpoint, data) {};
  _proto.OnErrorResponse = function OnErrorResponse(endpoint, reason) {};
  _proto.AddToCache = function AddToCache(endpoint, val) {
    if (this.Client && endpoint.Data && endpoint.Options.CanBeCached && endpoint.Options.CacheDuration && endpoint.Options.CacheDuration > 0) {
      try {
        if (endpoint.Options.ValidateCache == null || endpoint.Options.ValidateCache(val)) {
          if (!this.Client.AppData.Cache) this.Client.AppData.Cache = {};
          if (endpoint.Options.toString) {
            var optionKey = endpoint.Options.toString(endpoint.URL);
            this.Client.AppData.Cache[optionKey] = {
              Data: endpoint.Data,
              DateCreated: new Date()
            };
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  _proto.GetFromCache = function GetFromCache(endpoint) {
    if (this.Client && endpoint.Options.CanBeCached && endpoint.Options.CacheDuration && endpoint.Options.toString) {
      try {
        if (!this.Client.AppData.Cache) this.Client.AppData.Cache = {};
        var optionKey = endpoint.Options.toString(endpoint.URL);
        if (this.Client.AppData.Cache.hasOwnProperty(optionKey)) {
          var data = this.Client.AppData.Cache[optionKey];
          if (!data) return false;
          var cacheDate = convertToDate(data.DateCreated);
          if (cacheDate.milliseconds() + endpoint.Options.CacheDuration * 60 * 1000 > Date.now()) {
            endpoint.Data = data.Data;
            endpoint.Status = exports.ServiceStatus.Success;
            endpoint.RetreivedFromCache = true;
            return true;
          }
          this.RemoveFromCache(optionKey);
        }
      } catch (e) {
        console.error(e);
      }
    }
    return false;
  };
  _proto.RemoveFromCache = function RemoveFromCache(key) {
    if (this.Client) {
      if (!this.Client.AppData.Cache) this.Client.AppData.Cache = {};
      delete this.Client.AppData.Cache[key];
    }
  };
  return APIService;
}();

var AppClient = /*#__PURE__*/function () {
  function AppClient() {
    var _this = this;
    this.Region = "EN";
    this.Logger = new SystemLog();
    this.Analytics = new AnalyticsList();
    this.IsClientSide = false;
    this.DynamicSEO = {};
    this.ChangeUserRegion = function (code) {
      if (!code) code = _this.Region;
      if (!code) return;
      _this.Region = code;
      changeRegion(code);
    };
    this.RegisterAnalytics = function (analytic) {
      _this.Analytics.push(analytic);
    };
    this.UpdateMetaTags = function () {
      if (!_this.DynamicSEO) return;
      var seo = _this.DynamicSEO;
      var head = document.getElementsByTagName("head")[0];
      var titleTag = head.getElementsByTagName("title")[0];
      if (!titleTag) head.append("<title></title>");
      if (seo.Title) head.getElementsByTagName("title")[0].innerHTML = seo.Title;
      var metaTags = head.getElementsByTagName("meta");
      var _loop = function _loop() {
        var element = metaTags[index];
        if (seo.Description && element.name === "description") element.content = seo.Description;
        if (seo.Custom) {
          seo.Custom.map(function (item) {
            if (item.Name == element.name) element.content = item.Description;
          });
        }
      };
      for (var index = 0; index < metaTags.length; index++) {
        _loop();
      }
    };
    this.IsClientSide = global.window !== undefined;
  }
  var _proto = AppClient.prototype;
  _proto.Hydrate = function Hydrate() {};
  _proto.Translate = function Translate(key) {
    return key;
  };
  _proto.CreateService = function CreateService() {
    return new APIService();
  };
  return AppClient;
}();

var AppThemeConfig = {
  Common: {
    Backdrop: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30"
  },
  Alert: {
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
    SubBinderModal: {
      Class: "fixed left-0 top-10 w-full overflow-y-auto overflow-x-hidden outline-none"
    }
  },
  InputFields: {
    RootClass: "mb-5",
    LabelClass: "text-[12px] tracking-[.36px] text-manatee",
    ErrorMessageClass: "text-[11px] text-pomegranate tracking-[.36px]"
  },
  Tabs: {
    RootClass: "flex flex-col gap-4 bg-white text-sm font-medium text-gray-500",
    TabHeaderClass: "flex items-center p-2 text-sm text-gray-500",
    TabContentClass: "text-medium text-gray-500 rounded-lg w-full",
    TabHeaderButtonClass: "p-2 border-b-2 rounded-t-lg text-blueZodiac ",
    SelectedTabHeaderButtonClass: "p-2 border-b-2 border-blueZodiac rounded-t-lg text-blueZodiac ",
    TabHeaderButtonContainerClass: "me-2",
    TabPaneClass: "p-4 rounded-lg"
  },
  Buttons: {
    "default": "",
    primary: ""
  },
  Panel: {
    RootClass: "bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700",
    HeaderClass: "flex flex-1 items-center justify-between border-b border-gray-300 px-3 py-4 md:py-5",
    HeaderTextClass: "flex flex-1 items-center justify-between"
  },
  Pagination: {
    RootClass: "bg-white mb-12 p-5 flex flex-col xl:flex-row items-center justify-between gap-y-5",
    PageListClass: "flex gap-4",
    PageListItemClass: "flex items-center gap-2 text-[14px] text-slateGray",
    PageListItemSelectedClass: "text-[14px] text-blueZodiac font-bold bg-gainsboro px-3 py-1.5 rounded-lg",
    PageSizeSelectionRootClass: "flex items-center gap-6 text-[14px] text-slateGray tracking-[.5px]",
    PageSizeSelectionClass: "px-3 py-2 bg-blackHaze rounded-lg",
    PagesTitleClass: "text-slateGray text-[14px] tracking-[.5px]"
  },
  Carousel: {
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
    "boolean": "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
    "enum": "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2",
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
    week: "border-b border-wildBlueYonder text-black text-sm focus:border-black outline-none block w-full py-2"
  },
  Searchbar: {
    InputClass: "h-16 bg-white border border-wildBlueYonder text-slateGray text-base rounded-2xl focus:outline-none block w-full p-2.5 pl-14 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400",
    SearchClass: "absolute left-6 top-5 z-10",
    RightIconsWrapperClass: "flex gap-4 absolute right-6 top-5 z-10",
    SearchIcon: {
      name: "search",
      size: 24,
      color: "#5B6782"
    },
    MicrophoneIcon: {
      name: "microphone",
      size: 24,
      color: "#D6DAE2"
    },
    BarcodeIcon: {
      name: "qrCode",
      size: 24,
      color: "#D6DAE2"
    },
    BadgeClass: "w-8 h-6 bg-terraCotta text-white text-center rounded-2xl",
    ItemClass: "flex items-center justify-between mb-1 cursor-pointer hover:bg-gainsboro",
    FocusedItemClass: "flex items-center justify-between p-2 mb-6 rounded-[18px] bg-gainsboro",
    ItemIconClass: "bg-blackHaze opacity-80 p-6 hover:bg-gainsboro cursor-pointer",
    ItemIconColor: "#252387",
    ItemsContainerClass: "absolute w-full h-80 bg-white border-b border-x border-wildBlueYonder rounded-b-2xl z-20",
    ItemsScrollableAreaClass: "h-60 overflow-auto",
    ItemTitleClass: "text-[12px] text-outerSpace group-hover:text-blueZodiac tracking-[.42px]"
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
    Levels: {
      Selected: {
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
      NotFiltered: /*#__PURE__*/React$1__default.createElement("svg", {
        className: "w-4 h-4",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/React$1__default.createElement("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeWidth: "2",
        d: "M18.8 4H5.2a1 1 0 0 0-.7 1.7l5.3 6 .2.7v4.8c0 .2 0 .4.2.4l3 2.3c.3.2.8 0 .8-.4v-7.1c0-.3 0-.5.2-.7l5.3-6a1 1 0 0 0-.7-1.7Z"
      })),
      Filtered: /*#__PURE__*/React$1__default.createElement("svg", {
        className: "w-4 h-4",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "currentColor",
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/React$1__default.createElement("path", {
        d: "M5 3a2 2 0 0 0-1.5 3.3l5.4 6v5c0 .4.3.9.6 1.1l3.1 2.3c1 .7 2.5 0 2.5-1.2v-7.1l5.4-6C21.6 5 20.7 3 19 3H5Z"
      })),
      NotSorted: /*#__PURE__*/React$1__default.createElement("svg", {
        className: "w-4 h-4",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/React$1__default.createElement("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "m8 15 4 4 4-4m0-6-4-4-4 4"
      })),
      DescSorted: /*#__PURE__*/React$1__default.createElement("svg", {
        className: "w-4 h-4",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/React$1__default.createElement("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "m8 10 4 4 4-4"
      })),
      AscSorted: /*#__PURE__*/React$1__default.createElement("svg", {
        className: "w-4 h-4",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/React$1__default.createElement("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "m16 14-4-4-4 4"
      }))
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
    CellTypeClasses: {
      text: "",
      textarea: "",
      selectbox: "",
      checkbox: "",
      radio: "",
      "boolean": "text-right",
      "enum": "",
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
      week: "text-right"
    }
  },
  Grid: {
    Class: "grid w-full",
    RowClass: "flex flex-nowrap",
    ColumnClass: "",
    ContainerClass: "relative overflow-x-auto"
  },
  Spinner: {
    Class: "",
    TextClass: "sr-only",
    Image: {
      name: "spinner",
      size: 18,
      className: "w-8 h-8 text-gray animate-spin dark:text-gray fill-blueBell"
    }
  },
  IconRating: {
    Class: "flex items-center mb-5",
    TextClass: "ms-1 text-sm font-medium text-gray-500 dark:text-gray-400",
    Icon: {
      name: "star",
      className: "w-4 h-4 ms-1 text-gray-300",
      size: 12
    },
    FilledIcon: {
      name: "star",
      className: "w-4 h-4 ms-1 text-yellow-300",
      size: 12
    }
  },
  Toast: {
    Class: "flex items-center w-full max-w-xs p-4 text-gray-200 bg-white rounded-lg shadow dark:text-gray-900 dark:bg-gray",
    TextClass: "ms-3 text-sm font-normal text-white",
    CloseButtonClass: "ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700",
    ImageClass: "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200",
    InfoImage: {
      name: "info",
      size: 18
    },
    SuccessImage: {
      name: "success",
      size: 18
    },
    ErrorImage: {
      name: "error",
      size: 18
    },
    WarningImage: {
      name: "warning",
      size: 18
    }
  },
  Notification: {
    InfoContainer: "absolute top-16 right-6 py-2 px-4 min-w-72 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 z-10",
    ErrorContainer: "absolute top-16 right-6 py-2 px-4 min-w-72 text-red-800 border border-red-300 rounded-lg bg-red-50 z-10",
    TitleContainer: "flex items-center gap-2",
    ContentClass: "my-2 text-sm",
    InfoImage: {
      name: "info",
      size: 18,
      color: "blue"
    },
    SuccessImage: {
      name: "success",
      size: 18
    },
    ErrorImage: {
      name: "error",
      size: 18,
      color: "red"
    },
    WarningImage: {
      name: "warning",
      size: 18
    }
  },
  SpeedDial: {
    Class: "fixed end-6 bottom-6 group",
    MenuClass: "flex flex-col items-center mb-4 space-y-2",
    MainButtonClass: "flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800",
    DialButtonClass: "flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400",
    Image: /*#__PURE__*/React$1__default.createElement("svg", {
      className: "w-5 h-5 transition-transform group-hover:rotate-45",
      "aria-hidden": "true",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 18 18"
    }, /*#__PURE__*/React$1__default.createElement("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 1v16M1 9h16"
    }))
  },
  Progress: {
    Class: "w-full bg-gray-200 rounded-full dark:bg-gray-700",
    BarClass: "bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
  },
  Modal: {
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
  Dropdown: {
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
    SearchIcon: {
      name: "search",
      size: 16,
      color: "#5B6782"
    }
  },
  Accordion: {
    DetailClass: "w-full px-5 py-6 border border-darkBlue rounded-2xl",
    SummaryClass: "flex items-center justify-between gap-10 cursor-pointer",
    TitleClass: "text-base font-bold",
    ContentClass: "text-[22px]/[30px] pt-2.5 pr-5"
  },
  Highlight: {
    Languages: ['javascript', 'ruby', 'python', 'rust', 'json', 'c#', '']
  },
  Quill: {
    Formats: ["header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", "color", "clean"],
    Toolbar: [['bold', 'italic', 'underline', 'strike'], ['blockquote', 'code-block'], ['link', 'image', 'video', 'formula'], [{
      'header': 1
    }, {
      'header': 2
    }], [{
      'list': 'ordered'
    }, {
      'list': 'bullet'
    }, {
      'list': 'check'
    }], [{
      'script': 'sub'
    }, {
      'script': 'super'
    }], [{
      'indent': '-1'
    }, {
      'indent': '+1'
    }], [{
      'direction': 'rtl'
    }], [{
      'header': [1, 2, 3, 4, 5, 6, false]
    }], [{
      'color': []
    }, {
      'background': []
    }], [{
      'align': []
    }], ['clean']],
    ImageHandler: function (fileName, size, buffer, base64) {
      return Promise.resolve(undefined);
    }
  },
  Icons: {
    DefaultSize: "18px",
    getCustomIconSvg: function getCustomIconSvg(iconName, size, className, strokeColor, fillColor, ext1, ext2, ext3) {
      return "";
    },
    getIconSvg: function getIconSvg(iconName, size, className, strokeColor, fillColor, ext1, ext2, ext3) {
      if (strokeColor === void 0) {
        strokeColor = undefined;
      }
      if (fillColor === void 0) {
        fillColor = undefined;
      }
      if (!strokeColor) strokeColor = "none";
      if (!fillColor) fillColor = "none";
      var theme = getAppTheme();
      if (theme.Icons && theme.Icons.getCustomIconSvg) {
        var icon = theme.Icons.getCustomIconSvg(iconName, size, className, strokeColor, fillColor, ext1, ext2, ext3);
        if (icon && icon != "") return icon;
      }
      switch (iconName) {
        case "spinner":
          return /*#__PURE__*/React$1__default.createElement("svg", {
            width: size,
            height: size,
            className: className,
            viewBox: "0 0 100 101",
            fill: fillColor,
            xmlns: "http://www.w3.org/2000/svg"
          }, /*#__PURE__*/React$1__default.createElement("path", {
            d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
            fill: strokeColor
          }), /*#__PURE__*/React$1__default.createElement("path", {
            d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
            fill: ext1
          }));
        case "home":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 24 24\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M2 8.5c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v7c0 3.5-2 5-5 5H7\" stroke=\"" + strokeColor + "\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"m17 9-3.13 2.5c-1.03.82-2.72.82-3.75 0L7 9M2 16.5h6M2 12.5h3\" stroke=\"" + strokeColor + "\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>";
        case "menu":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 24 24\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"m6 18-2.756-2.47a.698.698 0 0 1 0-1.06L6 12\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M3 6h18M10 12h11M10 18h11\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg>";
        case "search":
          return "<svg  width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 24 24\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <circle cx=\"10.429\" cy=\"10.429\" r=\"7.179\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\"/>\n          <path d=\"m16.244 15.184-.53-.53-1.06 1.06.53.53 1.06-1.06zm4.225 6.346a.75.75 0 1 0 1.06-1.06l-1.06 1.06zm-5.286-5.286 5.286 5.286 1.06-1.06-5.285-5.286-1.06 1.06z\" fill=\"" + strokeColor + "\"/>\n      </svg>\n      ";
        case "bell":
          return "<svg  width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 24 24\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M17.295 10.172c0-2.933-2.422-5.312-5.41-5.312s-5.41 2.379-5.41 5.312v.799c0 2.075-.624 4.103-1.79 5.82A.863.863 0 0 0 5.4 18.14h12.97a.863.863 0 0 0 .714-1.349 10.362 10.362 0 0 1-1.789-5.82v-.799z\" stroke=\"#fff\" stroke-linejoin=\"round\"/>\n          <path d=\"M10.41 20.354c.196.245.766.737 1.475.737.708 0 1.279-.492 1.475-.738\" stroke=\"" + strokeColor + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <circle cx=\"16.312\" cy=\"5.598\" r=\"3.689\" fill=\"" + ext1 + "\"/>\n      </svg>\n      ";
        case "settings":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 20 20\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z\" stroke=\"" + strokeColor + "\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M1.667 10.733V9.266c0-.866.708-1.583 1.583-1.583 1.508 0 2.125-1.067 1.367-2.375A1.583 1.583 0 0 1 5.2 3.15l1.442-.825c.658-.392 1.508-.159 1.9.5l.091.158c.75 1.308 1.984 1.308 2.742 0l.092-.158c.391-.659 1.241-.892 1.9-.5l1.441.825a1.582 1.582 0 0 1 .584 2.158c-.759 1.308-.142 2.375 1.366 2.375.867 0 1.584.708 1.584 1.583v1.467c0 .867-.709 1.583-1.584 1.583-1.508 0-2.125 1.067-1.366 2.375a1.58 1.58 0 0 1-.584 2.158l-1.441.825c-.659.392-1.509.159-1.9-.5l-.092-.158c-.75-1.308-1.983-1.308-2.742 0l-.091.159c-.392.658-1.242.891-1.9.5L5.2 16.848a1.582 1.582 0 0 1-.583-2.158c.758-1.308.141-2.375-1.367-2.375a1.588 1.588 0 0 1-1.583-1.583z\" stroke=\"#fff\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>\n      ";
        case "wallet":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 24 24\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M22 9.5v5c0 3-2 5-5 5H7c-3 0-5-2-5-5v-5c0-2.72 1.64-4.62 4.19-4.94.26-.04.53-.06.81-.06h10c.26 0 .51.01.75.05C20.33 4.85 22 6.76 22 9.5z\" stroke=\"" + strokeColor + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M22 10h-3c-1.1 0-2 .9-2 2s.9 2 2 2h3\" stroke=\"" + strokeColor + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>    \n      ";
        case "arrow-down":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 16 16\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"m13.28 5.967-4.347 4.346a1.324 1.324 0 0 1-1.867 0L2.72 5.967\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>   \n      ";
        case "arrow-up":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 16 16\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"m2.72 10.033 4.347-4.346a1.324 1.324 0 0 1 1.867 0l4.346 4.346\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>\n      ";
        case "arrow-left":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"" + fillColor + "\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"" + strokeColor + "\" >\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18\" />\n        </svg>\n\n      ";
        case "arrow-right":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"" + fillColor + "\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"" + strokeColor + "\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3\" />\n        </svg>";
        case "bag":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 24 24\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M8.81 2 5.19 5.63M15.19 2l3.62 3.63\" stroke=\"" + strokeColor + "\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M2 7.85c0-1.85.99-2 2.22-2h15.56c1.23 0 2.22.15 2.22 2 0 2.15-.99 2-2.22 2H4.22C2.99 9.85 2 10 2 7.85z\" stroke=\"" + strokeColor + "\"/>\n          <path d=\"M9.76 14v3.55M14.36 14v3.55M3.5 10l1.41 8.64C5.23 20.58 6 22 8.86 22h6.03c3.11 0 3.57-1.36 3.93-3.24L20.5 10\" stroke=\"" + strokeColor + "\" stroke-linecap=\"round\"/>\n      </svg>\n      ";
        case "box":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 24 24\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M3.17 7.44 12 12.55l8.77-5.08M12 21.61v-9.07\" stroke=\"" + strokeColor + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M9.93 2.48 4.59 5.44c-1.21.67-2.2 2.35-2.2 3.73v5.65c0 1.38.99 3.06 2.2 3.73l5.34 2.97c1.14.63 3.01.63 4.15 0l5.34-2.97c1.21-.67 2.2-2.35 2.2-3.73V9.17c0-1.38-.99-3.06-2.2-3.73l-5.34-2.97c-1.15-.63-3.01-.63-4.15.01z\" stroke=\"" + strokeColor + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>\n      ";
        case "personel-card":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 20 20\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M14.167 17.5H5.833c-3.333 0-4.166-.833-4.166-4.167V6.667c0-3.334.833-4.167 4.166-4.167h8.334c3.333 0 4.166.833 4.166 4.167v6.666c0 3.334-.833 4.167-4.166 4.167zM11.667 6.667h4.166M12.5 10h3.333M14.167 13.333h1.666\" stroke=\"" + strokeColor + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M7.083 9.408a1.508 1.508 0 1 0 0-3.016 1.508 1.508 0 0 0 0 3.016zM10 13.608a2.517 2.517 0 0 0-2.283-2.266 6.428 6.428 0 0 0-1.267 0 2.524 2.524 0 0 0-2.283 2.266\" stroke=\"" + strokeColor + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>\n      ";
        case "profile":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 24 24\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M12.16 10.87c-.1-.01-.22-.01-.33 0a4.42 4.42 0 0 1-4.27-4.43C7.56 3.99 9.54 2 12 2a4.435 4.435 0 0 1 .16 8.87zM7.16 14.56c-2.42 1.62-2.42 4.26 0 5.87 2.75 1.84 7.26 1.84 10.01 0 2.42-1.62 2.42-4.26 0-5.87-2.74-1.83-7.25-1.83-10.01 0z\" stroke=\"" + strokeColor + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>    \n      ";
        case "plus":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 18 18\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M3.134 9h11.733M9 14.867V3.134\" stroke=" + strokeColor + " stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>    \n      ";
        case "box-add":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 40 40\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M38.333 30c0 1.25-.35 2.433-.966 3.433-.35.6-.8 1.133-1.317 1.567a6.508 6.508 0 0 1-4.383 1.666 6.57 6.57 0 0 1-5.05-2.35c-.034-.05-.084-.083-.117-.133a4.708 4.708 0 0 1-.533-.75A6.534 6.534 0 0 1 25 30c0-2.1.967-3.984 2.5-5.2a6.671 6.671 0 0 1 4.167-1.467c1.666 0 3.166.6 4.333 1.617.2.15.383.333.55.516 1.1 1.2 1.783 2.784 1.783 4.534zM34.15 29.967h-4.967M31.667 27.533v4.983\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M5.283 12.4 20 20.915l14.617-8.467M20 36.016V20.9\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M36.017 15.283v9.433c0 .084 0 .15-.017.234a6.535 6.535 0 0 0-4.333-1.617c-1.567 0-3.017.55-4.167 1.467A6.618 6.618 0 0 0 25 30c0 1.25.35 2.433.967 3.433.15.267.333.517.533.75l-3.05 1.683c-1.9 1.067-5 1.067-6.9 0l-8.9-4.933c-2.017-1.117-3.667-3.917-3.667-6.217v-9.433c0-2.3 1.65-5.1 3.667-6.217l8.9-4.933c1.9-1.067 5-1.067 6.9 0l8.9 4.933c2.017 1.117 3.667 3.917 3.667 6.217z\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>    \n      ";
        case "chart":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 40 40\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M6.7 9.95A16.61 16.61 0 0 0 3.333 20c0 9.2 7.467 16.666 16.667 16.666 9.2 0 16.667-7.466 16.667-16.666S29.2 3.333 20 3.333\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M8.333 20c0 6.45 5.217 11.666 11.667 11.666S31.667 26.45 31.667 20 26.45 8.333 20 8.333\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M20 26.666A6.665 6.665 0 0 0 26.667 20 6.665 6.665 0 0 0 20 13.333\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>    \n      ";
        case "direct":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 40 40\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M15 36.666h10c8.333 0 11.667-3.333 11.667-11.666V15c0-8.334-3.334-11.667-11.667-11.667H15C6.667 3.333 3.333 6.666 3.333 15v10c0 8.333 3.334 11.666 11.667 11.666z\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M3.333 21.667H9.6c1.267 0 2.417.717 2.983 1.85l1.484 2.983c.933 1.834 2.6 1.834 3 1.834h5.883a3.333 3.333 0 0 0 2.983-1.85l1.484-2.984a3.333 3.333 0 0 1 2.983-1.85h6.233M17.233 11.667h5.55M15.833 16.667h8.334\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>    \n      ";
        case "shop":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 40 40\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M5.017 18.7v7.483c0 7.484 3 10.484 10.483 10.484h8.983c7.484 0 10.484-3 10.484-10.484V18.7\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M20 20c3.05 0 5.3-2.484 5-5.534L23.9 3.333h-7.783L15 14.466C14.7 17.516 16.95 20 20 20z\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M30.517 20c3.366 0 5.833-2.734 5.5-6.084l-.467-4.583c-.6-4.333-2.267-6-6.633-6h-5.084L25 15.016c.283 2.75 2.767 4.984 5.517 4.984zM9.4 20c2.75 0 5.233-2.234 5.5-4.984l.367-3.683.8-8h-5.084c-4.366 0-6.033 1.667-6.633 6l-.45 4.583C3.567 17.266 6.033 20 9.4 20zM20 28.333c-2.783 0-4.167 1.383-4.167 4.167v4.166h8.334V32.5c0-2.784-1.384-4.167-4.167-4.167z\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>\n      ";
        case "task-square":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 40 40\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M20.617 14.8h8.75M10.634 14.8l1.25 1.25 3.75-3.75M20.105 26.043h8.75M10.634 26.468l1.25 1.25 3.75-3.75\" stroke=\"" + strokeColor + "\" stroke-width=\"1.649\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M15 36.667h10c8.334 0 11.667-3.333 11.667-11.666V15c0-8.334-3.333-11.667-11.666-11.667H15c-8.333 0-11.667 3.333-11.667 11.667v10c0 8.333 3.334 11.666 11.667 11.666z\" stroke=\"" + strokeColor + "\" stroke-width=\"1.649\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>\n      ";
        case "suitcase":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 40 40\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M36.667 20v8.334c0 5-3.334 8.333-8.334 8.333H11.667c-5 0-8.334-3.333-8.334-8.333V20c0-4.533 2.734-7.7 6.984-8.233.433-.067.883-.1 1.35-.1h16.666c.434 0 .85.017 1.25.083 4.3.5 7.084 3.684 7.084 8.25z\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M29.586 11.75a7.618 7.618 0 0 0-1.25-.084H11.669c-.467 0-.917.034-1.35.1.233-.466.567-.9.967-1.3l5.416-5.433a5.875 5.875 0 0 1 8.267 0l2.917 2.95a5.623 5.623 0 0 1 1.7 3.767zM36.667 20.833h-5a3.343 3.343 0 0 0-3.334 3.333c0 1.834 1.5 3.334 3.334 3.334h5\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>\n      ";
        case "shipping":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 40 40\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M20 23.333h1.667C23.5 23.333 25 21.833 25 20V3.333H10A6.66 6.66 0 0 0 4.183 6.75\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M3.333 28.333c0 2.767 2.234 5 5 5H10C10 31.5 11.5 30 13.333 30c1.834 0 3.334 1.5 3.334 3.333h6.666c0-1.833 1.5-3.333 3.334-3.333C28.5 30 30 31.5 30 33.333h1.667c2.766 0 5-2.233 5-5v-5h-5c-.917 0-1.667-.75-1.667-1.667v-5c0-.916.75-1.666 1.667-1.666h2.15l-2.85-4.984a3.36 3.36 0 0 0-2.9-1.683H25V20c0 1.833-1.5 3.333-3.333 3.333H20\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M13.333 36.667a3.333 3.333 0 1 0 0-6.667 3.333 3.333 0 0 0 0 6.667zM26.667 36.667a3.333 3.333 0 1 0 0-6.667 3.333 3.333 0 0 0 0 6.667zM36.667 20v3.333h-5c-.917 0-1.667-.75-1.667-1.666v-5c0-.917.75-1.667 1.667-1.667h2.15l2.85 5zM3.333 13.333h10M3.333 18.333H10M3.333 23.333h3.334\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>\n          \n      ";
        case "diagram":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 40 40\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M3.333 3.333v28.333c0 2.767 2.234 5 5 5h28.334\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"m8.333 28.334 7.65-8.934c1.267-1.466 3.517-1.566 4.884-.183L22.45 20.8a3.34 3.34 0 0 0 4.883-.183L35 11.667\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>\n          \n      ";
        case "graph":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 40 40\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M30.532 20c4.334 0 6.134-1.666 4.534-7.133-1.084-3.683-4.25-6.85-7.934-7.933-5.466-1.6-7.133.2-7.133 4.533v4.8c0 4.067 1.667 5.734 5 5.734h5.534z\" stroke=\"" + strokeColor + "\" stroke-width=\"1.649\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M33.333 24.501a15.152 15.152 0 0 1-17.367 11.95c-6.316-1.016-11.4-6.1-12.433-12.416a15.168 15.168 0 0 1 11.9-17.35\" stroke=\"" + strokeColor + "\" stroke-width=\"1.649\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>\n      \n      ";
        case "shop":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 40 40\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M5.017 18.7v7.483c0 7.484 3 10.484 10.483 10.484h8.983c7.484 0 10.484-3 10.484-10.484V18.7\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M20 20c3.05 0 5.3-2.484 5-5.534L23.9 3.333h-7.783L15 14.466C14.7 17.516 16.95 20 20 20z\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M30.517 20c3.366 0 5.833-2.734 5.5-6.084l-.467-4.583c-.6-4.333-2.267-6-6.633-6h-5.084L25 15.016c.283 2.75 2.767 4.984 5.517 4.984zM9.4 20c2.75 0 5.233-2.234 5.5-4.984l.367-3.683.8-8h-5.084c-4.366 0-6.033 1.667-6.633 6l-.45 4.583C3.567 17.266 6.033 20 9.4 20zM20 28.333c-2.783 0-4.167 1.383-4.167 4.167v4.166h8.334V32.5c0-2.784-1.384-4.167-4.167-4.167z\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>    \n      ";
        case "microphone":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" viewBox=\"0 0 24 24\" fill=\"" + strokeColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M19.12 9.12c-.39 0-.7.31-.7.7v1.58c0 3.54-2.88 6.42-6.42 6.42s-6.42-2.88-6.42-6.42V9.81c0-.39-.31-.7-.7-.7-.39 0-.7.31-.7.7v1.58c0 4.07 3.13 7.42 7.12 7.78v2.13c0 .39.31.7.7.7.39 0 .7-.31.7-.7v-2.13c3.98-.35 7.12-3.71 7.12-7.78V9.81a.707.707 0 0 0-.7-.69z\" fill=\"" + strokeColor + "\"/>\n          <path d=\"M12 2C9.56 2 7.58 3.98 7.58 6.42v5.12c0 2.44 1.98 4.42 4.42 4.42s4.42-1.98 4.42-4.42V6.42C16.42 3.98 14.44 2 12 2zm1.31 6.95c-.07.26-.3.43-.56.43-.05 0-.1-.01-.15-.02-.39-.11-.8-.11-1.19 0-.32.09-.63-.1-.71-.41-.09-.31.1-.63.41-.71.59-.16 1.21-.16 1.8 0 .3.08.48.4.4.71zm.53-1.94a.58.58 0 0 1-.55.38c-.07 0-.13-.01-.2-.03-.7-.26-1.48-.26-2.18 0a.59.59 0 0 1-.75-.35c-.11-.3.05-.64.35-.74a4.36 4.36 0 0 1 2.98 0c.3.11.46.44.35.74z\" fill=\"" + strokeColor + "\"/>\n      </svg>   \n      ";
        case "qrCode":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"" + strokeColor + "\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z\" />\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z\" />\n        </svg>\n        \n      ";
        case "redo":
          return "<svg width=\"" + size + "\" class=\"" + className + "\" height=\"" + size + "\" class=\"" + className + "\" viewBox=\"0 0 24 24\" fill=\"" + fillColor + "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M7.13 5.69h8c2.76 0 5 2.24 5 5s-2.24 5-5 5h-11\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"m6.43 13.19-2.56 2.56 2.56 2.56\" stroke=\"" + strokeColor + "\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>\n      ";
        case "info":
          return /*#__PURE__*/React$1__default.createElement("svg", {
            width: size,
            height: size,
            xmlns: "http://www.w3.org/2000/svg",
            fill: fillColor,
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: strokeColor,
            className: className
          }, /*#__PURE__*/React$1__default.createElement("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          }));
        case "warning":
          return /*#__PURE__*/React$1__default.createElement("svg", {
            width: size,
            height: size,
            xmlns: "http://www.w3.org/2000/svg",
            fill: fillColor,
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: strokeColor,
            className: className
          }, /*#__PURE__*/React$1__default.createElement("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }));
        case "success":
          return /*#__PURE__*/React$1__default.createElement("svg", {
            width: size,
            height: size,
            xmlns: "http://www.w3.org/2000/svg",
            fill: fillColor,
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: strokeColor,
            className: className
          }, /*#__PURE__*/React$1__default.createElement("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "m4.5 12.75 6 6 9-13.5"
          }));
        case "star":
          return /*#__PURE__*/React$1__default.createElement("svg", {
            width: size,
            height: size,
            className: className,
            xmlns: "http://www.w3.org/2000/svg",
            fill: strokeColor,
            viewBox: "0 0 22 20"
          }, /*#__PURE__*/React$1__default.createElement("path", {
            d: "M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
          }));
        case "export":
          return /*#__PURE__*/React$1__default.createElement("svg", {
            width: size,
            height: size,
            className: className,
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }, /*#__PURE__*/React$1__default.createElement("path", {
            d: "m13 11 8.2-8.2m.8 4V2h-4.8M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2",
            stroke: strokeColor,
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }));
        case "excel":
          return /*#__PURE__*/React$1__default.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: size,
            height: size,
            className: className,
            fill: fillColor,
            viewBox: "0 0 256 256"
          }, /*#__PURE__*/React$1__default.createElement("path", {
            d: "M200,24H72A16,16,0,0,0,56,40V64H40A16,16,0,0,0,24,80v96a16,16,0,0,0,16,16H56v24a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24Zm-40,80h40v48H160Zm40-16H160V80a16,16,0,0,0-16-16V40h56ZM72,40h56V64H72ZM40,80H144v79.83c0,.06,0,.11,0,.17s0,.11,0,.17V176H40ZM72,192h56v24H72Zm72,24V192a16,16,0,0,0,16-16v-8h40v48ZM65.85,146.88,81.59,128,65.85,109.12a8,8,0,0,1,12.3-10.24L92,115.5l13.85-16.62a8,8,0,1,1,12.3,10.24L102.41,128l15.74,18.88a8,8,0,0,1-12.3,10.24L92,140.5,78.15,157.12a8,8,0,0,1-12.3-10.24Z"
          }));
        case "pdf":
          return /*#__PURE__*/React$1__default.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            height: size,
            width: size,
            stroke: strokeColor,
            fill: fillColor,
            viewBox: "0 0 256 256"
          }, /*#__PURE__*/React$1__default.createElement("path", {
            d: "M224,152a8,8,0,0,1-8,8H192v16h16a8,8,0,0,1,0,16H192v16a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8h32A8,8,0,0,1,224,152ZM92,172a28,28,0,0,1-28,28H56v8a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8H64A28,28,0,0,1,92,172Zm-16,0a12,12,0,0,0-12-12H56v24h8A12,12,0,0,0,76,172Zm88,8a36,36,0,0,1-36,36H112a8,8,0,0,1-8-8V152a8,8,0,0,1,8-8h16A36,36,0,0,1,164,180Zm-16,0a20,20,0,0,0-20-20h-8v40h8A20,20,0,0,0,148,180ZM40,112V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0ZM160,80h28.69L160,51.31Z"
          }));
        case "error":
          return /*#__PURE__*/React$1__default.createElement("svg", {
            width: size,
            height: size,
            xmlns: "http://www.w3.org/2000/svg",
            fill: fillColor,
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: strokeColor,
            className: className
          }, /*#__PURE__*/React$1__default.createElement("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          }));
        default:
          return "";
      }
    }
  }
};
var currentAppTheme = AppThemeConfig;
function getAppTheme(config) {
  if (config) {
    var tmpValue = _.merge(currentAppTheme, removeEmptyProps(config));
    return tmpValue;
  }
  return currentAppTheme;
}
function useAppTheme(theme) {
  currentAppTheme = _.merge(currentAppTheme, theme);
  return currentAppTheme;
}

var BinderOptions = function BinderOptions() {
  this.PageTitle = undefined;
  this.NewURL = undefined;
  this.ActionURL = undefined;
  this.EditURL = undefined;
  this.ViewURL = undefined;
  this.BackURL = undefined;
  this.AllowBack = true;
  this.AllowNew = true;
  this.AllowExport = true;
  this.AllowSave = true;
  this.AllowDelete = true;
  this.IsNewEntity = false;
  this.AllowEdit = true;
  this.DrawViewLinkInsteadOfEdit = false;
  this.UpdateContent = undefined;
  this.Visible = true;
  this.ExportTypes = [{
    extension: "xls",
    name: "Excel",
    icon: {
      name: "excel",
      fill: "#5B6782"
    }
  }, {
    extension: "pdf",
    name: "PDF",
    icon: {
      name: "pdf",
      color: "#000",
      fill: "#5B6782"
    }
  }];
  this.ExportMode = "screenshot";
};

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var Tab = function Tab(_ref) {
  var theme = _ref.theme,
    visible = _ref.visible,
    id = _ref.id,
    active = _ref.active,
    children = _ref.children;
  if (visible === false) return /*#__PURE__*/React$1__default.createElement(Fragment, null);
  return /*#__PURE__*/React$1__default.createElement("div", {
    id: id,
    key: id,
    role: "tabpanel",
    "aria-labelledby": id + "-tab",
    className: (active === true ? "block" : "hidden") + " " + (theme === null || theme === void 0 ? void 0 : theme.TabPaneClass)
  }, children);
};

var _excluded = ["active"];
var Tabs = function Tabs(_ref) {
  var id = _ref.id,
    theme = _ref.theme,
    children = _ref.children;
  var Theme = getAppTheme({
    Tabs: theme
  }).Tabs;
  var _useState = React$1.useState("0"),
    selectedTab = _useState[0],
    setSelectedTab = _useState[1];
  var onTabSelectedClick = function onTabSelectedClick(tab) {
    setSelectedTab(tab.props.id);
  };
  var tabs = deepMap(children, ["Tab"]);
  tabs = React$1.Children.map(tabs, function (item, i) {
    var isSelected = !selectedTab && item.props.active === true || item.props.id === selectedTab;
    return React$1__default.cloneElement(item, {
      active: isSelected,
      visible: item.props.visible,
      id: item.props.id,
      text: item.props.text,
      children: item.props.children
    });
  });
  return /*#__PURE__*/React$1__default.createElement("div", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.RootClass,
    key: id
  }, tabs.length > 1 && /*#__PURE__*/React$1__default.createElement("ul", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.TabHeaderClass,
    key: "nav-tabs"
  }, tabs.filter(function (tab) {
    var _tab$props;
    return ((_tab$props = tab.props) === null || _tab$props === void 0 ? void 0 : _tab$props.visible) !== false;
  }).map(function (tab, i) {
    var _tab$props2, _tab$props3, _tab$props4, _tab$props5, _tab$props6, _tab$props7;
    var selected = tab.props.id === selectedTab || tabs.length == 1;
    return /*#__PURE__*/React$1__default.createElement("li", {
      className: Theme === null || Theme === void 0 ? void 0 : Theme.TabHeaderButtonContainerClass,
      role: "presentation",
      key: i,
      onClick: function onClick() {
        onTabSelectedClick(tab);
      }
    }, /*#__PURE__*/React$1__default.createElement("button", {
      className: selected ? Theme === null || Theme === void 0 ? void 0 : Theme.SelectedTabHeaderButtonClass : Theme === null || Theme === void 0 ? void 0 : Theme.TabHeaderButtonClass,
      key: ((_tab$props2 = tab.props) === null || _tab$props2 === void 0 ? void 0 : _tab$props2.id) + "-tab",
      id: ((_tab$props3 = tab.props) === null || _tab$props3 === void 0 ? void 0 : _tab$props3.id) + "-tab",
      "data-tabs-target": "#" + ((_tab$props4 = tab.props) === null || _tab$props4 === void 0 ? void 0 : _tab$props4.id),
      type: "button",
      role: "tab",
      "aria-controls": (_tab$props5 = tab.props) === null || _tab$props5 === void 0 ? void 0 : _tab$props5.id,
      "aria-selected": selected || ((_tab$props6 = tab.props) === null || _tab$props6 === void 0 ? void 0 : _tab$props6.active)
    }, (_tab$props7 = tab.props) === null || _tab$props7 === void 0 ? void 0 : _tab$props7.text));
  })), /*#__PURE__*/React$1__default.createElement("div", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.TabContentClass
  }, tabs.map(function (tab, i) {
    var selected = tab.props.id === selectedTab || tabs.length == 1;
    var otherProps = function (_ref2) {
      var others = _objectWithoutPropertiesLoose(_ref2, _excluded);
      return others;
    }(tab.props);
    return /*#__PURE__*/React$1__default.createElement(Tab, _extends({
      theme: Theme,
      key: i,
      active: selected
    }, otherProps));
  })));
};

var _excluded$1 = ["text", "type", "listener", "value"];
var BaseField = /*#__PURE__*/function (_React$Component) {
  function BaseField(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.Theme = getAppTheme({
      InputFields: _this.props.theme
    }).InputFields;
    _this.Validate = function () {
      if (_this.props.required === true) {
        var value = _this.GetValue();
        var valid = value !== undefined && value !== "";
        if (!valid) {
          _this.setState({
            hasValidationError: true
          });
          return false;
        }
      }
      _this.setState({
        hasValidationError: false
      });
      return true;
    };
    _this.state = {
      hasValidationError: false,
      key: "",
      value: undefined
    };
    return _this;
  }
  _inheritsLoose(BaseField, _React$Component);
  var _proto = BaseField.prototype;
  _proto.render = function render() {
    var _this$props$listener, _this$Theme, _this$Theme2, _this$Theme3;
    if ((_this$props$listener = this.props.listener) !== null && _this$props$listener !== void 0 && _this$props$listener.registerField) {
      var _this$props$listener2;
      (_this$props$listener2 = this.props.listener) === null || _this$props$listener2 === void 0 ? void 0 : _this$props$listener2.registerField(this);
    }
    return /*#__PURE__*/React$1__default.createElement("div", {
      className: (_this$Theme = this.Theme) === null || _this$Theme === void 0 ? void 0 : _this$Theme.RootClass
    }, this.props.labelVisible != false && this.props.text && /*#__PURE__*/React$1__default.createElement("label", {
      className: (_this$Theme2 = this.Theme) === null || _this$Theme2 === void 0 ? void 0 : _this$Theme2.LabelClass
    }, this.props.text, !this.state.hasValidationError && this.props.required === true ? "*" : ""), /*#__PURE__*/React$1__default.createElement("div", {
      className: "field-input"
    }, this.renderInput()), this.state.hasValidationError && /*#__PURE__*/React$1__default.createElement("span", {
      className: (_this$Theme3 = this.Theme) === null || _this$Theme3 === void 0 ? void 0 : _this$Theme3.ErrorMessageClass
    }, "Please fill this area!"));
  };
  _proto.renderInput = function renderInput() {
    return /*#__PURE__*/React$1__default.createElement(Fragment, null);
  };
  _proto.onChange = function onChange(e) {
    try {
      var _this2$props$listener, _this2$props$listener2;
      var _this2 = this;
      var inputEvent = e.nativeEvent;
      var value = "";
      if (inputEvent) {
        if (inputEvent.target) {
          var target = inputEvent.target;
          value = target.value;
        }
      } else if (e.value) {
        value = e.value;
      }
      if (_this2.props.onChange) _this2.props.onChange({
        name: _this2.props.name,
        value: value
      });
      if ((_this2$props$listener = _this2.props.listener) !== null && _this2$props$listener !== void 0 && _this2$props$listener.setFieldData) (_this2$props$listener2 = _this2.props.listener) === null || _this2$props$listener2 === void 0 ? void 0 : _this2$props$listener2.setFieldData(_this2.props.name, value);
      _this2.Validate();
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.GetValue = function GetValue() {
    var _value;
    var value = this.props.listener && this.props.listener.getFieldData ? this.props.listener.getFieldData(this) : undefined;
    if (isValidDate(value)) {
      value = getFormattedDateString(value, this.props.format, this.props.type);
    }
    return (_value = value) != null ? _value : undefined;
  };
  _proto.GetProps = function GetProps() {
    var _this3 = this;
    var otherProps = function (_ref) {
      var others = _objectWithoutPropertiesLoose(_ref, _excluded$1);
      return others;
    }(this.props);
    var props = _extends({}, {
      id: otherProps.name,
      defaultValue: undefined,
      value: this.GetValue(),
      defaultChecked: undefined,
      checked: this.props.checked,
      onChange: function onChange(e) {
        _this3.onChange(e);
      }
    }, otherProps);
    return props;
  };
  return BaseField;
}(React$1__default.Component);

var DataList = /*#__PURE__*/function (_React$Component) {
  function DataList() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(DataList, _React$Component);
  var _proto = DataList.prototype;
  _proto.render = function render() {
    if (!this.props.children && !this.props.options) return /*#__PURE__*/React$1__default.createElement(Fragment, null);
    return /*#__PURE__*/React$1__default.createElement("datalist", {
      id: this.props.id
    }, this.props.children, this.props.options && typeof this.props.options == "string" && this.props.options.split(",").map(function (item) {
      return /*#__PURE__*/React$1__default.createElement("option", {
        value: item
      });
    }), this.props.options && Array.isArray(this.props.options) && this.props.options.map(function (item) {
      return /*#__PURE__*/React$1__default.createElement("option", {
        value: item
      });
    }));
  };
  return DataList;
}(React$1__default.Component);

var NumberInput = /*#__PURE__*/function (_React$Component) {
  function NumberInput() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(NumberInput, _React$Component);
  var _proto = NumberInput.prototype;
  _proto.render = function render() {
    var _this$props$className, _getAppTheme$Inputs;
    return /*#__PURE__*/React$1__default.createElement(Fragment, null, /*#__PURE__*/React$1__default.createElement(DataList, {
      options: this.props.dataOptions,
      id: this.props.list
    }), /*#__PURE__*/React$1__default.createElement("input", _extends({
      type: "number",
      className: (_this$props$className = this.props.className) != null ? _this$props$className : (_getAppTheme$Inputs = getAppTheme().Inputs) === null || _getAppTheme$Inputs === void 0 ? void 0 : _getAppTheme$Inputs.numeric
    }, this.props)));
  };
  return NumberInput;
}(React$1__default.Component);

var NumericField = /*#__PURE__*/function (_BaseField) {
  function NumericField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(NumericField, _BaseField);
  var _proto = NumericField.prototype;
  _proto.renderInput = function renderInput() {
    return /*#__PURE__*/React.createElement(NumberInput, this.GetProps());
  };
  return NumericField;
}(BaseField);

var DateInput = /*#__PURE__*/function (_React$Component) {
  function DateInput() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(DateInput, _React$Component);
  var _proto = DateInput.prototype;
  _proto.render = function render() {
    var _this$props$className, _getAppTheme$Inputs;
    return /*#__PURE__*/React$1__default.createElement("input", _extends({
      type: "date",
      className: (_this$props$className = this.props.className) != null ? _this$props$className : (_getAppTheme$Inputs = getAppTheme().Inputs) === null || _getAppTheme$Inputs === void 0 ? void 0 : _getAppTheme$Inputs.date
    }, this.props));
  };
  return DateInput;
}(React$1__default.Component);

var DateField = /*#__PURE__*/function (_BaseField) {
  function DateField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(DateField, _BaseField);
  var _proto = DateField.prototype;
  _proto.renderInput = function renderInput() {
    return /*#__PURE__*/React.createElement(DateInput, this.GetProps());
  };
  return DateField;
}(BaseField);

var CheckboxInput = /*#__PURE__*/function (_React$Component) {
  function CheckboxInput() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(CheckboxInput, _React$Component);
  var _proto = CheckboxInput.prototype;
  _proto.render = function render() {
    var _this$props$className, _getAppTheme$Inputs;
    return /*#__PURE__*/React$1__default.createElement("input", _extends({
      type: "checkbox",
      className: (_this$props$className = this.props.className) != null ? _this$props$className : (_getAppTheme$Inputs = getAppTheme().Inputs) === null || _getAppTheme$Inputs === void 0 ? void 0 : _getAppTheme$Inputs.checkbox
    }, this.props));
  };
  return CheckboxInput;
}(React$1__default.Component);

var BoolField = /*#__PURE__*/function (_BaseField) {
  function BoolField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(BoolField, _BaseField);
  var _proto = BoolField.prototype;
  _proto.renderInput = function renderInput() {
    return /*#__PURE__*/React.createElement(CheckboxInput, this.GetProps());
  };
  return BoolField;
}(BaseField);

var _excluded$2 = ["placeholder", "type", "options", "displayProp", "valueProp", "className"];
var SelectInput = /*#__PURE__*/function (_React$Component) {
  function SelectInput() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(SelectInput, _React$Component);
  var _proto = SelectInput.prototype;
  _proto.getOptions = function getOptions() {
    var _options = [];
    if (this.props.options) {
      var _this$props$displayPr, _this$props$valueProp;
      var tmpOptions = JSON.parse(JSON.stringify(this.props.options));
      var displayProp = (_this$props$displayPr = this.props.displayProp) != null ? _this$props$displayPr : "text";
      var valueProp = (_this$props$valueProp = this.props.valueProp) != null ? _this$props$valueProp : "value";
      for (var index = 0; index < tmpOptions.length; index++) {
        var tmp = tmpOptions[index];
        if (displayProp == "itself" && valueProp == "itself") _options.push({
          text: tmp,
          value: tmp
        });else _options.push({
          text: tmp[displayProp],
          value: tmp[valueProp]
        });
      }
    } else if (this.props.low && this.props.high) {
      for (var _index = this.props.low; _index <= this.props.high; _index++) {
        _options.push({
          text: _index.toString(),
          value: _index.toString()
        });
      }
    }
    return _options;
  };
  _proto.render = function render() {
    var _this$props$className, _getAppTheme$Inputs;
    var _options = this.getOptions();
    var pureProps = function (_ref) {
      var others = _objectWithoutPropertiesLoose(_ref, _excluded$2);
      return others;
    }(this.props);
    return /*#__PURE__*/React$1__default.createElement(Fragment, null, /*#__PURE__*/React$1__default.createElement("select", _extends({}, pureProps, {
      className: (_this$props$className = this.props.className) != null ? _this$props$className : (_getAppTheme$Inputs = getAppTheme().Inputs) === null || _getAppTheme$Inputs === void 0 ? void 0 : _getAppTheme$Inputs.selectbox
    }), this.props.placeholder && /*#__PURE__*/React$1__default.createElement("option", null, this.props.placeholder), _options && _options.map(function (item, i) {
      return /*#__PURE__*/React$1__default.createElement("option", {
        key: i,
        value: item.value
      }, item.text);
    })));
  };
  return SelectInput;
}(React$1__default.Component);

var _excluded$3 = ["options", "displayProp", "valueProp"];
var EnumSelectBoxField = /*#__PURE__*/function (_BaseField) {
  function EnumSelectBoxField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(EnumSelectBoxField, _BaseField);
  var _proto = EnumSelectBoxField.prototype;
  _proto.renderInput = function renderInput() {
    var options = this.props.options;
    var displayProp = this.props.displayProp;
    var valueProp = this.props.valueProp;
    var otherProps = function (_ref) {
      var others = _objectWithoutPropertiesLoose(_ref, _excluded$3);
      return others;
    }(this.GetProps());
    if (this.props.enumSelectionType && !this.props.options) {
      options = enumToArray(this.props.enumSelectionType, this.props.translateFn);
      options.splice(0, 0, {
        text: "",
        value: ""
      });
      displayProp = "text";
      valueProp = "value";
    }
    return /*#__PURE__*/React.createElement(SelectInput, _extends({
      displayProp: displayProp,
      valueProp: valueProp,
      options: options
    }, otherProps));
  };
  return EnumSelectBoxField;
}(BaseField);

var TextInput = /*#__PURE__*/function (_React$Component) {
  function TextInput() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(TextInput, _React$Component);
  var _proto = TextInput.prototype;
  _proto.render = function render() {
    var _this$props$className, _getAppTheme$Inputs;
    return /*#__PURE__*/React$1__default.createElement(Fragment, null, /*#__PURE__*/React$1__default.createElement(DataList, {
      options: this.props.dataOptions,
      id: this.props.list
    }), /*#__PURE__*/React$1__default.createElement("input", _extends({
      type: "text",
      className: "" + ((_this$props$className = this.props.className) != null ? _this$props$className : (_getAppTheme$Inputs = getAppTheme().Inputs) === null || _getAppTheme$Inputs === void 0 ? void 0 : _getAppTheme$Inputs.text)
    }, this.props)));
  };
  return TextInput;
}(React$1__default.Component);

var TextField = /*#__PURE__*/function (_BaseField) {
  function TextField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(TextField, _BaseField);
  var _proto = TextField.prototype;
  _proto.renderInput = function renderInput() {
    return /*#__PURE__*/React.createElement(TextInput, this.GetProps());
  };
  return TextField;
}(BaseField);

var DropdownField = /*#__PURE__*/function (_BaseField) {
  function DropdownField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(DropdownField, _BaseField);
  var _proto = DropdownField.prototype;
  _proto.renderInput = function renderInput() {
    return /*#__PURE__*/React.createElement(SelectInput, this.GetProps());
  };
  return DropdownField;
}(BaseField);

var PasswordInput = /*#__PURE__*/function (_React$Component) {
  function PasswordInput() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(PasswordInput, _React$Component);
  var _proto = PasswordInput.prototype;
  _proto.render = function render() {
    var _this$props$className, _getAppTheme$Inputs;
    return /*#__PURE__*/React$1__default.createElement("input", _extends({
      type: "password",
      className: (_this$props$className = this.props.className) != null ? _this$props$className : (_getAppTheme$Inputs = getAppTheme().Inputs) === null || _getAppTheme$Inputs === void 0 ? void 0 : _getAppTheme$Inputs.password
    }, this.props));
  };
  return PasswordInput;
}(React$1__default.Component);

var PasswordField = /*#__PURE__*/function (_BaseField) {
  function PasswordField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(PasswordField, _BaseField);
  var _proto = PasswordField.prototype;
  _proto.renderInput = function renderInput() {
    return /*#__PURE__*/React.createElement(PasswordInput, this.GetProps());
  };
  return PasswordField;
}(BaseField);

var _excluded$4 = ["value", "children"];
var Label = /*#__PURE__*/function (_React$Component) {
  function Label() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(Label, _React$Component);
  var _proto = Label.prototype;
  _proto.render = function render() {
    var _this$props = this.props,
      pureProps = _objectWithoutPropertiesLoose(_this$props, _excluded$4);
    return /*#__PURE__*/React$1__default.createElement("label", pureProps, this.props.value, this.props.children);
  };
  return Label;
}(React$1__default.Component);

var _excluded$5 = ["value", "defaultValue"];
var LabelField = /*#__PURE__*/function (_BaseField) {
  function LabelField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(LabelField, _BaseField);
  var _proto = LabelField.prototype;
  _proto.renderInput = function renderInput() {
    var _this$GetProps = this.GetProps(),
      value = _this$GetProps.value,
      pureProps = _objectWithoutPropertiesLoose(_this$GetProps, _excluded$5);
    return /*#__PURE__*/React.createElement(Label, pureProps, value);
  };
  return LabelField;
}(BaseField);

var TextAreaInput = /*#__PURE__*/function (_React$Component) {
  function TextAreaInput() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(TextAreaInput, _React$Component);
  var _proto = TextAreaInput.prototype;
  _proto.render = function render() {
    var _this$props$className, _getAppTheme$Inputs;
    return /*#__PURE__*/React$1__default.createElement("textarea", _extends({}, this.props, {
      className: (_this$props$className = this.props.className) != null ? _this$props$className : (_getAppTheme$Inputs = getAppTheme().Inputs) === null || _getAppTheme$Inputs === void 0 ? void 0 : _getAppTheme$Inputs.textarea
    }));
  };
  return TextAreaInput;
}(React$1__default.Component);

var TextAreaField = /*#__PURE__*/function (_BaseField) {
  function TextAreaField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(TextAreaField, _BaseField);
  var _proto = TextAreaField.prototype;
  _proto.renderInput = function renderInput() {
    return /*#__PURE__*/React.createElement(TextAreaInput, this.GetProps());
  };
  return TextAreaField;
}(BaseField);

var RichTextInput = function RichTextInput(_ref) {
  var _theme$Quill3, _theme$Quill4;
  var _ref$value = _ref.value,
    value = _ref$value === void 0 ? undefined : _ref$value,
    _ref$onChange = _ref.onChange,
    _onChange = _ref$onChange === void 0 ? undefined : _ref$onChange,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? "editor" : _ref$id,
    _ref$name = _ref.name,
    name = _ref$name === void 0 ? "editor" : _ref$name,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className;
  var ReactQuill = React$1.useMemo(function () {
    return dynamic(function () {
      return new Promise(function (resolve) { resolve(_interopNamespace(require('react-quill'))); });
    }, {
      ssr: false
    });
  }, []);
  var theme = getAppTheme();
  var InputRef = React$1__default.createRef();
  React$1.useEffect(function () {
    var _theme$Highlight;
    hljs.configure({
      languages: (_theme$Highlight = theme.Highlight) === null || _theme$Highlight === void 0 ? void 0 : _theme$Highlight.Languages
    });
    if (window) window.hljs = hljs;
  }, []);
  function imageHandler() {
    var quill = this.quill;
    var input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = function () {
      if (!quill || !input.files || input.files.length == 0) return;
      if (!quill || !quill.editor) return;
      var file = input.files[0];
      var range = quill.getSelection(true);
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var _theme$Quill;
          if (!((_theme$Quill = theme.Quill) !== null && _theme$Quill !== void 0 && _theme$Quill.ImageHandler)) return Promise.resolve();
          var base64 = reader.result;
          return Promise.resolve(file.arrayBuffer()).then(function (buffer) {
            var _theme$Quill2;
            var promise = (_theme$Quill2 = theme.Quill) === null || _theme$Quill2 === void 0 ? void 0 : _theme$Quill2.ImageHandler(file.name, file.size, buffer, base64);
            if (!promise) {
              quill.insertEmbed(range.index, "image", base64);
            } else {
              promise.then(function (url) {
                if (url) quill.insertEmbed(range.index, "image", url);
              });
            }
          });
        } catch (e) {
          return Promise.reject(e);
        }
      };
      reader.readAsDataURL(file);
    };
  }
  var modules = {
    toolbar: {
      container: (_theme$Quill3 = theme.Quill) === null || _theme$Quill3 === void 0 ? void 0 : _theme$Quill3.Toolbar,
      handlers: {
        image: imageHandler
      }
    },
    syntax: {
      highlight: function highlight(text) {
        return hljs.highlightAuto(text).value;
      }
    },
    clipboard: {
      matchVisual: true
    }
  };
  return /*#__PURE__*/React$1__default.createElement(Fragment, null, /*#__PURE__*/React$1__default.createElement("input", {
    onChange: function onChange(e) {
      return _onChange && _onChange(e);
    },
    ref: InputRef,
    type: "hidden",
    id: id,
    name: name
  }), /*#__PURE__*/React$1__default.createElement(ReactQuill, {
    value: value,
    className: className,
    formats: (_theme$Quill4 = theme.Quill) === null || _theme$Quill4 === void 0 ? void 0 : _theme$Quill4.Formats,
    modules: modules,
    onChange: function onChange(value, delta, source, editor) {
      if (InputRef && InputRef.current && window) {
        InputRef.current.value = value;
        var event = {
          currentTarget: InputRef.current,
          bubbles: true
        };
        _onChange && _onChange(event);
      }
    }
  }));
};

var RichTextField = /*#__PURE__*/function (_BaseField) {
  function RichTextField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(RichTextField, _BaseField);
  var _proto = RichTextField.prototype;
  _proto.renderInput = function renderInput() {
    return /*#__PURE__*/React.createElement(RichTextInput, this.GetProps());
  };
  return RichTextField;
}(BaseField);

var EmailInput = /*#__PURE__*/function (_React$Component) {
  function EmailInput() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(EmailInput, _React$Component);
  var _proto = EmailInput.prototype;
  _proto.render = function render() {
    var _this$props$className, _getAppTheme$Inputs;
    return /*#__PURE__*/React$1__default.createElement(Fragment, null, /*#__PURE__*/React$1__default.createElement(DataList, {
      options: this.props.dataOptions,
      id: this.props.list
    }), /*#__PURE__*/React$1__default.createElement("input", _extends({
      type: "email",
      className: (_this$props$className = this.props.className) != null ? _this$props$className : (_getAppTheme$Inputs = getAppTheme().Inputs) === null || _getAppTheme$Inputs === void 0 ? void 0 : _getAppTheme$Inputs.email
    }, this.props)));
  };
  return EmailInput;
}(React$1__default.Component);

var EmailField = /*#__PURE__*/function (_BaseField) {
  function EmailField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(EmailField, _BaseField);
  var _proto = EmailField.prototype;
  _proto.renderInput = function renderInput() {
    return /*#__PURE__*/React.createElement(EmailInput, this.GetProps());
  };
  return EmailField;
}(BaseField);

var PhoneInput = /*#__PURE__*/function (_React$Component) {
  function PhoneInput() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(PhoneInput, _React$Component);
  var _proto = PhoneInput.prototype;
  _proto.render = function render() {
    var _this$props$className, _getAppTheme$Inputs;
    return /*#__PURE__*/React$1__default.createElement(Fragment, null, /*#__PURE__*/React$1__default.createElement(DataList, {
      options: this.props.dataOptions,
      id: this.props.list
    }), /*#__PURE__*/React$1__default.createElement("input", _extends({
      type: "tel",
      className: (_this$props$className = this.props.className) != null ? _this$props$className : (_getAppTheme$Inputs = getAppTheme().Inputs) === null || _getAppTheme$Inputs === void 0 ? void 0 : _getAppTheme$Inputs.phone
    }, this.props)));
  };
  return PhoneInput;
}(React$1__default.Component);

var PhoneField = /*#__PURE__*/function (_BaseField) {
  function PhoneField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(PhoneField, _BaseField);
  var _proto = PhoneField.prototype;
  _proto.renderInput = function renderInput() {
    return /*#__PURE__*/React.createElement(PhoneInput, this.GetProps());
  };
  return PhoneField;
}(BaseField);

var WeekInput = /*#__PURE__*/function (_React$Component) {
  function WeekInput() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(WeekInput, _React$Component);
  var _proto = WeekInput.prototype;
  _proto.render = function render() {
    var _this$props$className, _getAppTheme$Inputs;
    return /*#__PURE__*/React$1__default.createElement("input", _extends({
      type: "week",
      className: (_this$props$className = this.props.className) != null ? _this$props$className : (_getAppTheme$Inputs = getAppTheme().Inputs) === null || _getAppTheme$Inputs === void 0 ? void 0 : _getAppTheme$Inputs.week
    }, this.props));
  };
  return WeekInput;
}(React$1__default.Component);

var WeekField = /*#__PURE__*/function (_BaseField) {
  function WeekField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(WeekField, _BaseField);
  var _proto = WeekField.prototype;
  _proto.renderInput = function renderInput() {
    return /*#__PURE__*/React.createElement(WeekInput, this.GetProps());
  };
  return WeekField;
}(BaseField);

var MonthInput = /*#__PURE__*/function (_React$Component) {
  function MonthInput() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(MonthInput, _React$Component);
  var _proto = MonthInput.prototype;
  _proto.render = function render() {
    var _this$props$className, _getAppTheme$Inputs;
    return /*#__PURE__*/React$1__default.createElement("input", _extends({
      type: "month",
      className: (_this$props$className = this.props.className) != null ? _this$props$className : (_getAppTheme$Inputs = getAppTheme().Inputs) === null || _getAppTheme$Inputs === void 0 ? void 0 : _getAppTheme$Inputs.month
    }, this.props));
  };
  return MonthInput;
}(React$1__default.Component);

var MonthField = /*#__PURE__*/function (_BaseField) {
  function MonthField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(MonthField, _BaseField);
  var _proto = MonthField.prototype;
  _proto.renderInput = function renderInput() {
    return /*#__PURE__*/React.createElement(MonthInput, this.GetProps());
  };
  return MonthField;
}(BaseField);

var URLInput = /*#__PURE__*/function (_React$Component) {
  function URLInput() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(URLInput, _React$Component);
  var _proto = URLInput.prototype;
  _proto.render = function render() {
    var _this$props$className, _getAppTheme$Inputs;
    return /*#__PURE__*/React$1__default.createElement(Fragment, null, /*#__PURE__*/React$1__default.createElement(DataList, {
      options: this.props.dataOptions,
      id: this.props.list
    }), /*#__PURE__*/React$1__default.createElement("input", _extends({
      type: "url",
      className: (_this$props$className = this.props.className) != null ? _this$props$className : (_getAppTheme$Inputs = getAppTheme().Inputs) === null || _getAppTheme$Inputs === void 0 ? void 0 : _getAppTheme$Inputs.url
    }, this.props)));
  };
  return URLInput;
}(React$1__default.Component);

var URLField = /*#__PURE__*/function (_BaseField) {
  function URLField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(URLField, _BaseField);
  var _proto = URLField.prototype;
  _proto.renderInput = function renderInput() {
    return /*#__PURE__*/React.createElement(URLInput, this.GetProps());
  };
  return URLField;
}(BaseField);

var TimeInput = /*#__PURE__*/function (_React$Component) {
  function TimeInput() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(TimeInput, _React$Component);
  var _proto = TimeInput.prototype;
  _proto.render = function render() {
    var _this$props$className, _getAppTheme$Inputs;
    return /*#__PURE__*/React$1__default.createElement(Fragment, null, /*#__PURE__*/React$1__default.createElement(DataList, {
      options: this.props.dataOptions,
      id: this.props.list
    }), /*#__PURE__*/React$1__default.createElement("input", _extends({
      type: "time",
      className: (_this$props$className = this.props.className) != null ? _this$props$className : (_getAppTheme$Inputs = getAppTheme().Inputs) === null || _getAppTheme$Inputs === void 0 ? void 0 : _getAppTheme$Inputs.time
    }, this.props)));
  };
  return TimeInput;
}(React$1__default.Component);

var TimeField = /*#__PURE__*/function (_BaseField) {
  function TimeField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(TimeField, _BaseField);
  var _proto = TimeField.prototype;
  _proto.renderInput = function renderInput() {
    return /*#__PURE__*/React.createElement(TimeInput, this.GetProps());
  };
  return TimeField;
}(BaseField);

var FileInput = /*#__PURE__*/function (_React$Component) {
  function FileInput() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(FileInput, _React$Component);
  var _proto = FileInput.prototype;
  _proto.render = function render() {
    var _this$props$className, _getAppTheme$Inputs;
    return /*#__PURE__*/React$1__default.createElement("input", _extends({
      type: "file",
      className: (_this$props$className = this.props.className) != null ? _this$props$className : (_getAppTheme$Inputs = getAppTheme().Inputs) === null || _getAppTheme$Inputs === void 0 ? void 0 : _getAppTheme$Inputs.file
    }, this.props));
  };
  return FileInput;
}(React$1__default.Component);

var FileField = /*#__PURE__*/function (_BaseField) {
  function FileField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(FileField, _BaseField);
  var _proto = FileField.prototype;
  _proto.renderInput = function renderInput() {
    return /*#__PURE__*/React.createElement(FileInput, this.GetProps());
  };
  return FileField;
}(BaseField);

var DateTimeInput = /*#__PURE__*/function (_React$Component) {
  function DateTimeInput() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(DateTimeInput, _React$Component);
  var _proto = DateTimeInput.prototype;
  _proto.render = function render() {
    var _this$props$className, _getAppTheme$Inputs;
    return /*#__PURE__*/React$1__default.createElement("input", _extends({
      type: "datetime-local",
      className: (_this$props$className = this.props.className) != null ? _this$props$className : (_getAppTheme$Inputs = getAppTheme().Inputs) === null || _getAppTheme$Inputs === void 0 ? void 0 : _getAppTheme$Inputs.datetime
    }, this.props));
  };
  return DateTimeInput;
}(React$1__default.Component);

var DateTimeField = /*#__PURE__*/function (_BaseField) {
  function DateTimeField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(DateTimeField, _BaseField);
  var _proto = DateTimeField.prototype;
  _proto.renderInput = function renderInput() {
    return /*#__PURE__*/React.createElement(DateTimeInput, this.GetProps());
  };
  return DateTimeField;
}(BaseField);

var RangeInput = /*#__PURE__*/function (_React$Component) {
  function RangeInput() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(RangeInput, _React$Component);
  var _proto = RangeInput.prototype;
  _proto.render = function render() {
    var _this$props$className, _getAppTheme$Inputs;
    return /*#__PURE__*/React$1__default.createElement("input", _extends({
      type: "range",
      className: (_this$props$className = this.props.className) != null ? _this$props$className : (_getAppTheme$Inputs = getAppTheme().Inputs) === null || _getAppTheme$Inputs === void 0 ? void 0 : _getAppTheme$Inputs.range
    }, this.props));
  };
  return RangeInput;
}(React$1__default.Component);

var RangeField = /*#__PURE__*/function (_BaseField) {
  function RangeField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(RangeField, _BaseField);
  var _proto = RangeField.prototype;
  _proto.renderInput = function renderInput() {
    return /*#__PURE__*/React.createElement(RangeInput, this.GetProps());
  };
  return RangeField;
}(BaseField);

var Image = /*#__PURE__*/function (_React$Component) {
  function Image() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(Image, _React$Component);
  var _proto = Image.prototype;
  _proto.render = function render() {
    return /*#__PURE__*/React$1__default.createElement("img", this.props);
  };
  return Image;
}(React$1__default.Component);

var ImageField = /*#__PURE__*/function (_BaseField) {
  function ImageField() {
    return _BaseField.apply(this, arguments) || this;
  }
  _inheritsLoose(ImageField, _BaseField);
  var _proto = ImageField.prototype;
  _proto.renderInput = function renderInput() {
    return /*#__PURE__*/React.createElement(Image, _extends({
      src: this.GetValue()
    }, this.GetProps()));
  };
  return ImageField;
}(BaseField);

var _excluded$6 = ["name"];
function getImageComponent(elem, props, funcParams) {
  if (!elem) return /*#__PURE__*/React.createElement(Fragment, null);
  if (!props) props = {};
  if (typeof elem == "object" && !elem.props && elem.name) {
    var name = elem.name;
    props = _extends({}, function (_ref) {
      var others = _objectWithoutPropertiesLoose(_ref, _excluded$6);
      return others;
    }(elem), props);
    elem = name;
  }
  if (typeof elem === "string") {
    if (elem.indexOf("http") == -1 && elem.indexOf("/") == -1 && elem.indexOf("<") == -1) {
      var theme = getAppTheme();
      if (theme.Icons[elem]) return theme.Icons[elem];else if (theme.Icons && theme.Icons.getIconSvg) {
        var _props$size, _props;
        var imageComponent = theme.Icons.getIconSvg(elem, (_props$size = (_props = props) === null || _props === void 0 ? void 0 : _props.size) != null ? _props$size : theme.Icons.DefaultSize, props.className, props.color, props.fill, props.ext1, props.ext2, props.ext3);
        if (typeof imageComponent === "string") return /*#__PURE__*/React.createElement("div", {
          dangerouslySetInnerHTML: {
            __html: imageComponent
          }
        });
        return imageComponent;
      }
    } else if (elem.indexOf("<") == -1) ;
    return /*#__PURE__*/React.createElement(Image, _extends({
      src: elem,
      alt: "icon"
    }, props));
  }
  if (typeof elem === "function") return getImageComponent(elem(funcParams));else if (elem) return elem;
  return /*#__PURE__*/React.createElement(Fragment, null);
}

function findData(data, propOne, value, resultType) {
  if (resultType === void 0) {
    resultType = "object";
  }
  var result = undefined;
  var index = -1;
  if (data && propOne && value) {
    result = data.find(function (item, i) {
      var _String;
      var isEqual = ((_String = String(item[propOne])) === null || _String === void 0 ? void 0 : _String.toLocaleLowerCase()) === String(value).toLocaleLowerCase();
      if (isEqual) index = i;
      return isEqual;
    });
  }
  return resultType == "index" ? index : result;
}
function findKeyInObject(data, key) {
  if (!data) return "";
  key = key.toLocaleLowerCase();
  return Object.keys(data).find(function (item) {
    return item.toLocaleLowerCase() === key;
  });
}
function filterData(data, propOne, value, equals) {
  if (data && propOne && value) {
    return data.filter(function (item) {
      var _String3;
      if (equals) {
        var _String2;
        return ((_String2 = String(item[propOne])) === null || _String2 === void 0 ? void 0 : _String2.toLocaleLowerCase()) === String(value).toLocaleLowerCase();
      }
      return ((_String3 = String(item[propOne])) === null || _String3 === void 0 ? void 0 : _String3.toLocaleLowerCase()) !== String(value).toLocaleLowerCase();
    });
  }
  return false;
}
var yearSelectBox = function yearSelectBox(startDate) {
  var newDate = new Date();
  var thisYear = newDate.getFullYear();
  var arrayDate = [{
    id: startDate,
    name: startDate
  }];
  for (var index = startDate; index < thisYear; index++) {
    arrayDate.unshift({
      id: arrayDate[0].id + 1,
      name: arrayDate[0].id + 1
    });
  }
  return arrayDate;
};
var loopInRange = function loopInRange(from, to, fn) {
  if (fn === void 0) {
    fn = function fn(i) {};
  }
  var result = [];
  for (var index = from; index <= to; index++) {
    result.push(fn(index));
  }
  return result.map(function (item) {
    return item;
  });
};
var findInArray = function findInArray(arr, find, prop) {
  var result = {
    value: undefined,
    index: -1
  };
  arr.forEach(function (item, i) {
    if (prop && (item[prop] == find[prop] || item == find[prop] || item[prop] == find) || item == find) {
      result.value = item;
      result.index = i;
    }
  });
  return result;
};
var selectDefaultValues = function selectDefaultValues(selectedValue, prop, allValues, splitters) {
  if (splitters === void 0) {
    splitters = /[,;]/;
  }
  if (selectedValue) {
    if (Array.isArray(selectedValue)) {
      return selectedValue;
    } else if (allValues && Array.isArray(allValues) && allValues.length > 0) {
      var tmpOptions = new Array();
      allValues.forEach(function (option) {
        if (option[prop] == selectedValue || selectedValue[prop] == option[prop]) tmpOptions.push(option);
      });
      return tmpOptions;
    } else if (typeof selectedValue == "string") {
      if (selectedValue.startsWith("[") && selectedValue.endsWith("]")) return JSON.parse(selectedValue);
      var splittedValues = selectedValue.split(splitters);
      return splittedValues;
    } else return [selectedValue];
  }
  return [];
};
var filterInArray = function filterInArray(arr, find, prop) {
  if (!find) return arr;
  find = find.toLocaleLowerCase();
  var result = new Array();
  arr.forEach(function (item, i) {
    var text = "";
    if (typeof item == "string" || typeof item == "boolean" || typeof item == "number") text = item.toString();
    if (prop) text = getObjectValue(item, prop, "");
    if (text && text.toLocaleLowerCase().indexOf(find) > -1) result.push(item);
  });
  return result;
};
var getNextElement = function getNextElement(arr, lastIndex) {
  if (!arr || !lastIndex) return undefined;
  if (lastIndex + 1 >= arr.length) return arr[0];
  return arr[lastIndex + 1];
};

var Dropdown = function Dropdown(_ref) {
  var _ref$id = _ref.id,
    id = _ref$id === void 0 ? "" : _ref$id,
    _ref$multipleSelectio = _ref.multipleSelection,
    multipleSelection = _ref$multipleSelectio === void 0 ? undefined : _ref$multipleSelectio,
    _ref$visible = _ref.visible,
    visible = _ref$visible === void 0 ? false : _ref$visible,
    _ref$enableSearch = _ref.enableSearch,
    enableSearch = _ref$enableSearch === void 0 ? false : _ref$enableSearch,
    _ref$searchPlaceholde = _ref.searchPlaceholder,
    searchPlaceholder = _ref$searchPlaceholde === void 0 ? "Search" : _ref$searchPlaceholde,
    _ref$onSearch = _ref.onSearch,
    onSearch = _ref$onSearch === void 0 ? undefined : _ref$onSearch,
    _ref$onSelectionChang = _ref.onSelectionChange,
    onSelectionChange = _ref$onSelectionChang === void 0 ? undefined : _ref$onSelectionChang,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? undefined : _ref$children,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? [] : _ref$options,
    _ref$buttons = _ref.buttons,
    buttons = _ref$buttons === void 0 ? [] : _ref$buttons,
    _ref$optionTemplateFn = _ref.optionTemplateFn,
    optionTemplateFn = _ref$optionTemplateFn === void 0 ? undefined : _ref$optionTemplateFn,
    _ref$defaultValue = _ref.defaultValue,
    defaultValue = _ref$defaultValue === void 0 ? undefined : _ref$defaultValue,
    _ref$urlProp = _ref.urlProp,
    urlProp = _ref$urlProp === void 0 ? "url" : _ref$urlProp,
    _ref$iconProp = _ref.iconProp,
    iconProp = _ref$iconProp === void 0 ? "icon" : _ref$iconProp,
    _ref$displayProp = _ref.displayProp,
    displayProp = _ref$displayProp === void 0 ? "text" : _ref$displayProp,
    _ref$valueProp = _ref.valueProp,
    valueProp = _ref$valueProp === void 0 ? "value" : _ref$valueProp,
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? "" : _ref$label,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? undefined : _ref$theme;
  var _useState = React$1.useState(new Array()),
    selectedOptions = _useState[0],
    setSelectedOptions = _useState[1];
  var _useState2 = React$1.useState(options),
    filteredOptions = _useState2[0],
    setFilteredOptions = _useState2[1];
  var _useState3 = React$1.useState(false),
    open = _useState3[0],
    setOpen = _useState3[1];
  var Theme = getAppTheme({
    Dropdown: theme
  }).Dropdown;
  var SearchRef = React$1__default.createRef();
  var Searching = false;
  var Timer;
  var onSearchKeyup = function onSearchKeyup(e) {
    try {
      if (Searching) return Promise.resolve();
      Searching = true;
      if (Timer) clearTimeout(Timer);
      Timer = setTimeout(function () {
        try {
          var _SearchRef$current$va, _SearchRef$current;
          var _temp2 = function _temp2() {
            if (!onSearch || result == undefined) {
              result = filterInArray(options, key, displayProp);
            }
            if (result != undefined) setFilteredOptions(result);
            Searching = false;
          };
          var key = (_SearchRef$current$va = (_SearchRef$current = SearchRef.current) === null || _SearchRef$current === void 0 ? void 0 : _SearchRef$current.value) != null ? _SearchRef$current$va : "";
          var result = undefined;
          var _temp = function () {
            if (onSearch) {
              return Promise.resolve(onSearch(key)).then(function (_onSearch) {
                result = _onSearch;
              });
            }
          }();
          return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
        } catch (e) {
          return Promise.reject(e);
        }
      }, 500);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var onButtonClick = function onButtonClick(e, button) {
    e.preventDefault();
    if (button.type == "dismiss") {
      setOpen(false);
      return;
    } else if (button.type == "reset") {
      if (defaultValue) setSelectedOptions(selectDefaultValues(defaultValue, valueProp, options));
      return;
    } else {
      if (onSelectionChange) onSelectionChange(selectedOptions, button);
      if (button.hideDropdownOnClick === true) setOpen(false);
    }
  };
  var onOptionSelectionChanged = function onOptionSelectionChanged(e, option) {
    if (multipleSelection == undefined) {
      if (onSelectionChange) onSelectionChange(option);
      return;
    }
    var tmpOptions = JSON.parse(JSON.stringify(selectedOptions));
    var findResult = findInArray(tmpOptions, option, valueProp);
    if (multipleSelection == false) {
      tmpOptions = [];
      findResult.index = -1;
    }
    if (findResult.index > -1) {
      tmpOptions.splice(findResult.index, 1);
    } else tmpOptions.push(option);
    setSelectedOptions(tmpOptions);
    if (onSelectionChange) onSelectionChange(tmpOptions);
  };
  React$1.useEffect(function () {
    setOpen(visible);
    if (defaultValue) {
      var values = selectDefaultValues(defaultValue, valueProp, options);
      setSelectedOptions(values);
    }
    if (enableSearch && visible) {
      setTimeout(function () {
        var _SearchRef$current2;
        (_SearchRef$current2 = SearchRef.current) === null || _SearchRef$current2 === void 0 ? void 0 : _SearchRef$current2.focus();
      }, 200);
    }
    if (visible && (!filteredOptions || filteredOptions.length == 0)) onSearchKeyup();
  }, [enableSearch, visible]);
  return /*#__PURE__*/React$1__default.createElement("div", {
    id: id,
    className: (Theme === null || Theme === void 0 ? void 0 : Theme.Class) + " " + (open ? "block" : "hidden")
  }, enableSearch && /*#__PURE__*/React$1__default.createElement("div", {
    className: "p-3"
  }, /*#__PURE__*/React$1__default.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React$1__default.createElement("div", {
    className: "absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center"
  }, getImageComponent(Theme === null || Theme === void 0 ? void 0 : Theme.SearchIcon)), /*#__PURE__*/React$1__default.createElement("input", {
    onKeyUp: function onKeyUp(e) {
      return onSearchKeyup();
    },
    type: "text",
    ref: SearchRef,
    className: "border-b border-wildBlueYonder text-black placeholder:text-silverChalice text-[14px] font-normal focus:border-black outline-none block w-full py-2 pl-6",
    placeholder: searchPlaceholder
  }))), label && /*#__PURE__*/React$1__default.createElement("p", {
    className: "text-manatee text-[10px] font-normal mb-1.5"
  }, label), filteredOptions && filteredOptions.length > 0 && /*#__PURE__*/React$1__default.createElement("ul", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.ContentClass,
    "aria-labelledby": "dropdownSearchButton"
  }, filteredOptions.map(function (option, i) {
    var _Theme$CheckboxClass, _getAppTheme$Inputs, _Theme$RadioClass, _getAppTheme$Inputs2;
    var checked = findInArray(selectedOptions, option, valueProp).index > -1;
    return /*#__PURE__*/React$1__default.createElement("li", null, /*#__PURE__*/React$1__default.createElement(Link, {
      href: urlProp && option[urlProp] != undefined ? option[urlProp] : "javascript:void(0)"
    }, /*#__PURE__*/React$1__default.createElement("div", {
      id: id + "_option_" + i,
      className: Theme === null || Theme === void 0 ? void 0 : Theme.ItemClass,
      onClick: function onClick(e) {
        return onOptionSelectionChanged(e, option);
      }
    }, iconProp && option[iconProp] && getImageComponent(option[iconProp]), multipleSelection != undefined && /*#__PURE__*/React$1__default.createElement("input", {
      disabled: true,
      id: id + "_selectedvalue_" + i,
      name: id + "_selectedvalue",
      type: multipleSelection ? "checkbox" : "radio",
      value: option[valueProp],
      checked: checked,
      className: multipleSelection ? (_Theme$CheckboxClass = Theme === null || Theme === void 0 ? void 0 : Theme.CheckboxClass) != null ? _Theme$CheckboxClass : (_getAppTheme$Inputs = getAppTheme().Inputs) === null || _getAppTheme$Inputs === void 0 ? void 0 : _getAppTheme$Inputs.checkbox : (_Theme$RadioClass = Theme === null || Theme === void 0 ? void 0 : Theme.RadioClass) != null ? _Theme$RadioClass : (_getAppTheme$Inputs2 = getAppTheme().Inputs) === null || _getAppTheme$Inputs2 === void 0 ? void 0 : _getAppTheme$Inputs2.radio
    }), !optionTemplateFn && /*#__PURE__*/React$1__default.createElement("label", {
      className: Theme === null || Theme === void 0 ? void 0 : Theme.ItemLabelClass
    }, option[displayProp]), optionTemplateFn && optionTemplateFn(option))));
  })), children, buttons && buttons.length > 0 && /*#__PURE__*/React$1__default.createElement("div", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.ButtonContainerClass
  }, buttons.map(function (button) {
    var _button$className;
    return /*#__PURE__*/React$1__default.createElement("a", {
      href: "#",
      onClick: function onClick(e) {
        return onButtonClick(e, button);
      },
      className: (_button$className = button.className) != null ? _button$className : Theme === null || Theme === void 0 ? void 0 : Theme.ButtonClass
    }, button.icon && getImageComponent(button.icon), button.text);
  })));
};

var FilterboxInput = /*#__PURE__*/function (_React$Component) {
  function FilterboxInput(props) {
    var _props$options;
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.HiddenInputRef = React$1__default.createRef();
    _this.SelectionLabelRef = React$1__default.createRef();
    _this.Theme = getAppTheme();
    var selectedOptions = selectDefaultValues(props.defaultValue, "");
    _this.state = {
      filteredOptions: (_props$options = props.options) != null ? _props$options : [],
      showDropdown: props.dropDownDefaultOpen === true,
      selectedOptions: selectedOptions
    };
    return _this;
  }
  _inheritsLoose(FilterboxInput, _React$Component);
  var _proto = FilterboxInput.prototype;
  _proto.onSearch = function onSearch(key) {
    try {
      var _this2 = this;
      if (_this2.props.searchFn) return Promise.resolve(_this2.props.searchFn(key));
      return Promise.resolve(undefined);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.componentDidMount = function componentDidMount() {
    if (this.props.defaultValue) {
      this.setState({
        filteredOptions: this.props.defaultValue
      });
    }
  };
  _proto.onSelection = function onSelection(value, clickedButton) {
    var _this3 = this;
    if (this.props.applyText && !clickedButton) return;
    var selectedOptions = selectDefaultValues(value, "");
    this.setState({
      selectedOptions: selectedOptions
    });
    if (!this.HiddenInputRef.current) return;
    if (Array.isArray(value)) {
      var arr = value.map(function (item) {
        var _parseFloatIfCan;
        return (_parseFloatIfCan = parseFloatIfCan(item[_this3.props.valueProp])) != null ? _parseFloatIfCan : parseFloatIfCan(item);
      });
      if (arr && arr.length > 0) this.HiddenInputRef.current.value = JSON.stringify(arr);else this.HiddenInputRef.current.value = "";
    } else {
      var _ref, _value$this$props$val;
      this.HiddenInputRef.current.value = (_ref = (_value$this$props$val = value[this.props.valueProp]) != null ? _value$this$props$val : value) != null ? _ref : "";
    }
    if (this.props.onChange) {
      this.props.onChange({
        value: this.HiddenInputRef.current.value,
        currentTarget: this.HiddenInputRef.current,
        bubbles: true
      });
    }
  };
  _proto.getItemDisplayText = function getItemDisplayText(item) {
    var _this4 = this;
    return /*#__PURE__*/React$1__default.createElement("div", {
      className: "relative flex gap-2 w-fit"
    }, /*#__PURE__*/React$1__default.createElement("label", null, typeof item == "string" && item, typeof item != "string" && item[this.props.displayProp]), /*#__PURE__*/React$1__default.createElement(solid.XMarkIcon, {
      onClick: function onClick() {
        return _this4.removeItem(item);
      },
      width: 12,
      height: 12,
      className: "cursor-pointer"
    }));
  };
  _proto.removeItem = function removeItem(item) {
    var findResult = findInArray(this.state.selectedOptions, item, this.props.valueProp);
    if (findResult.index > -1) {
      var tmpOptions = clone(this.state.selectedOptions);
      tmpOptions.splice(findResult.index, 1);
      this.setState({
        selectedOptions: tmpOptions
      });
    }
  };
  _proto.clear = function clear() {
    this.setState({
      selectedOptions: []
    });
  };
  _proto.toggleDropDown = function toggleDropDown() {
    this.setState({
      showDropdown: !this.state.showDropdown
    });
  };
  _proto.getButtons = function getButtons() {
    var buttons = new Array();
    if (this.props.applyText) buttons.push({
      text: this.props.applyText,
      icon: this.props.applyIcon,
      type: "button",
      className: this.props.applyButtonClassName,
      hideDropdownOnClick: true
    });
    if (this.props.resetText) buttons.push({
      text: this.props.resetText,
      icon: this.props.resetIcon,
      type: "reset",
      className: this.props.resetButtonClassName,
      hideDropdownOnClick: true
    });
    return buttons;
  };
  _proto.render = function render() {
    var _this$Theme$Inputs,
      _this5 = this,
      _this$Theme$Dropdown,
      _this$Theme$Dropdown2,
      _this$props$multipleS;
    return /*#__PURE__*/React$1__default.createElement(Fragment, null, /*#__PURE__*/React$1__default.createElement("div", null, /*#__PURE__*/React$1__default.createElement("input", {
      ref: this.HiddenInputRef,
      type: "hidden",
      name: this.props.name,
      id: this.props.id
    }), this.props.hideSelections != true && /*#__PURE__*/React$1__default.createElement("div", {
      ref: this.SelectionLabelRef,
      className: "relative " + ((_this$Theme$Inputs = this.Theme.Inputs) === null || _this$Theme$Inputs === void 0 ? void 0 : _this$Theme$Inputs.filterbox),
      onClick: function onClick() {
        return _this5.toggleDropDown();
      }
    }, this.state.selectedOptions && this.state.selectedOptions.length > 0 && this.state.selectedOptions.map(function (item) {
      return _this5.getItemDisplayText(item);
    }), this.props.multipleSelection == true && this.props.allowClear != false && /*#__PURE__*/React$1__default.createElement(solid.XMarkIcon, {
      onClick: function onClick() {
        return _this5.clear();
      },
      width: 13,
      height: 13,
      className: "cursor-pointer absolute right-1 top-1"
    })), /*#__PURE__*/React$1__default.createElement("div", {
      className: "relative"
    }, /*#__PURE__*/React$1__default.createElement(Dropdown, {
      theme: {
        Class: this.props.shownInDropdown == true ? (_this$Theme$Dropdown = this.Theme.Dropdown) === null || _this$Theme$Dropdown === void 0 ? void 0 : _this$Theme$Dropdown.ClassWhenInner : (_this$Theme$Dropdown2 = this.Theme.Dropdown) === null || _this$Theme$Dropdown2 === void 0 ? void 0 : _this$Theme$Dropdown2.Class
      },
      enableSearch: true,
      buttons: this.getButtons(),
      onSearch: function onSearch(key) {
        return _this5.onSearch(key);
      },
      onSelectionChange: function onSelectionChange(value, button) {
        return _this5.onSelection(value, button);
      },
      visible: this.state.showDropdown,
      options: this.state.filteredOptions,
      defaultValue: this.state.selectedOptions,
      displayProp: this.props.displayProp,
      valueProp: this.props.valueProp,
      searchPlaceholder: this.props.searchPlaceholder,
      multipleSelection: (_this$props$multipleS = this.props.multipleSelection) != null ? _this$props$multipleS : true
    }))));
  };
  return FilterboxInput;
}(React$1__default.Component);

var _excluded$7 = ["value", "defaultValue", "displayProp", "valueProp", "remoteDataSource"];
var DropdownFilterboxField = /*#__PURE__*/function (_BaseField) {
  function DropdownFilterboxField(props) {
    var _this;
    _this = _BaseField.call(this, props) || this;
    _this.Searching = false;
    _this.onSearch = function (input) {
      if (!_this.Searching && _this.props.remoteDataSource && _this.props.remoteDataSource.CallFunction) {
        _this.Searching = true;
        var data = _this.props.remoteDataSource.CallFunction(input != null ? input : "", 1, 10);
        _this.Searching = false;
        return data;
      }
      return undefined;
    };
    return _this;
  }
  _inheritsLoose(DropdownFilterboxField, _BaseField);
  var _proto = DropdownFilterboxField.prototype;
  _proto.renderInput = function renderInput() {
    var _this$props$displayPr,
      _this$props$remoteDat,
      _this$props$valueProp,
      _this$props$remoteDat2,
      _this2 = this;
    var props = this.GetProps();
    var pureProps = function (_ref) {
      var others = _objectWithoutPropertiesLoose(_ref, _excluded$7);
      return others;
    }(props);
    return /*#__PURE__*/React.createElement(FilterboxInput, _extends({
      hideSelections: this.props.hideSelections,
      displayProp: (_this$props$displayPr = this.props.displayProp) != null ? _this$props$displayPr : (_this$props$remoteDat = this.props.remoteDataSource) === null || _this$props$remoteDat === void 0 ? void 0 : _this$props$remoteDat.DisplayProp,
      valueProp: (_this$props$valueProp = this.props.valueProp) != null ? _this$props$valueProp : (_this$props$remoteDat2 = this.props.remoteDataSource) === null || _this$props$remoteDat2 === void 0 ? void 0 : _this$props$remoteDat2.ValueProp
    }, pureProps, {
      searchFn: function searchFn(key) {
        return _this2.onSearch(key);
      },
      options: [],
      defaultValue: props.value,
      dropDownDefaultOpen: this.props.dropDownDefaultOpen
    }));
  };
  return DropdownFilterboxField;
}(BaseField);

var _excluded$8 = ["allowEdit"];
var InputField = function InputField(props) {
  if (props.visible) {
    if (props.visible === false) return /*#__PURE__*/React.createElement(Fragment, null);
    if (typeof props.visible == "function") {
      var visible = props.visible();
      if (!visible) return /*#__PURE__*/React.createElement(Fragment, null);
    }
  }
  var pureProps = _objectWithoutPropertiesLoose(props, _excluded$8);
  if (props.allowEdit === false || props.type === "label") return /*#__PURE__*/React.createElement(LabelField, pureProps);
  return /*#__PURE__*/React.createElement(Fragment, null, props.type === "numeric" && /*#__PURE__*/React.createElement(NumericField, pureProps), props.type === "date" && /*#__PURE__*/React.createElement(DateField, pureProps), props.type === "time" && /*#__PURE__*/React.createElement(TimeField, pureProps), props.type === "datetime" && /*#__PURE__*/React.createElement(DateTimeField, pureProps), (props.type === "checkbox" || props.type === "boolean") && /*#__PURE__*/React.createElement(BoolField, pureProps), props.type === "radio" && /*#__PURE__*/React.createElement(BoolField, pureProps), (props.type === "object" || props.type === "filterbox") && /*#__PURE__*/React.createElement(DropdownFilterboxField, pureProps), props.type === "enum" && /*#__PURE__*/React.createElement(EnumSelectBoxField, _extends({
    translateFn: props.translateFn
  }, pureProps)), props.type === "selectbox" && /*#__PURE__*/React.createElement(DropdownField, pureProps), props.type === "password" && /*#__PURE__*/React.createElement(PasswordField, pureProps), props.type === "text" && /*#__PURE__*/React.createElement(TextField, pureProps), props.type === "richtext" && /*#__PURE__*/React.createElement(RichTextField, pureProps), props.type === "textarea" && /*#__PURE__*/React.createElement(TextAreaField, pureProps), props.type === "email" && /*#__PURE__*/React.createElement(EmailField, pureProps), (props.type === "phone" || props.type === "tel") && /*#__PURE__*/React.createElement(PhoneField, pureProps), props.type === "week" && /*#__PURE__*/React.createElement(WeekField, pureProps), props.type === "month" && /*#__PURE__*/React.createElement(MonthField, pureProps), props.type === "url" && /*#__PURE__*/React.createElement(URLField, pureProps), props.type === "file" && /*#__PURE__*/React.createElement(FileField, pureProps), props.type === "range" && /*#__PURE__*/React.createElement(RangeField, pureProps), props.type === "image" && /*#__PURE__*/React.createElement(ImageField, pureProps));
};

var Alert = function Alert(_ref) {
  var _Theme$Types$type, _iconProps$name;
  var _ref$id = _ref.id,
    id = _ref$id === void 0 ? undefined : _ref$id,
    _ref$visible = _ref.visible,
    visible = _ref$visible === void 0 ? true : _ref$visible,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? undefined : _ref$children,
    _ref$text = _ref.text,
    text = _ref$text === void 0 ? undefined : _ref$text,
    _ref$iconProps = _ref.iconProps,
    iconProps = _ref$iconProps === void 0 ? undefined : _ref$iconProps,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "info" : _ref$type,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? undefined : _ref$theme;
  var Theme = getAppTheme({
    Alert: theme
  }).Alert;
  var className = (_Theme$Types$type = Theme === null || Theme === void 0 ? void 0 : Theme.Types[type]) != null ? _Theme$Types$type : Theme === null || Theme === void 0 ? void 0 : Theme.Class;
  return /*#__PURE__*/React$1__default.createElement(Fragment, null, visible && /*#__PURE__*/React$1__default.createElement("div", {
    id: id,
    className: className
  }, getImageComponent((_iconProps$name = iconProps === null || iconProps === void 0 ? void 0 : iconProps.name) != null ? _iconProps$name : type, iconProps != null ? iconProps : {
    size: 18
  }), text && /*#__PURE__*/React$1__default.createElement("div", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.TextClass
  }, text), children));
};

var ServiceMessageResult = function ServiceMessageResult(props) {
  return /*#__PURE__*/React.createElement(Alert, {
    type: "error"
  }, props.code, " - ", props.description);
};

(function (LoadingState) {
  LoadingState[LoadingState["Waiting"] = 0] = "Waiting";
  LoadingState[LoadingState["Loading"] = 1] = "Loading";
  LoadingState[LoadingState["Loaded"] = 2] = "Loaded";
  LoadingState[LoadingState["Failed"] = 3] = "Failed";
})(exports.LoadingState || (exports.LoadingState = {}));

var Panel = React$1__default.memo(function (_ref) {
  var _theme$Panel, _theme$Panel2, _theme$Panel3;
  var id = _ref.id,
    _ref$leftIcon = _ref.leftIcon,
    leftIcon = _ref$leftIcon === void 0 ? undefined : _ref$leftIcon,
    _ref$rightIcon = _ref.rightIcon,
    rightIcon = _ref$rightIcon === void 0 ? undefined : _ref$rightIcon,
    headerText = _ref.headerText,
    children = _ref.children;
  var theme = getAppTheme();
  return /*#__PURE__*/React$1__default.createElement(Fragment, null, /*#__PURE__*/React$1__default.createElement("div", {
    id: id,
    className: (_theme$Panel = theme.Panel) === null || _theme$Panel === void 0 ? void 0 : _theme$Panel.RootClass
  }, headerText && /*#__PURE__*/React$1__default.createElement("div", {
    className: (_theme$Panel2 = theme.Panel) === null || _theme$Panel2 === void 0 ? void 0 : _theme$Panel2.HeaderClass
  }, leftIcon && getImageComponent(leftIcon), /*#__PURE__*/React$1__default.createElement("div", {
    className: (_theme$Panel3 = theme.Panel) === null || _theme$Panel3 === void 0 ? void 0 : _theme$Panel3.HeaderTextClass
  }, headerText), rightIcon && getImageComponent(rightIcon)), children));
});

var PDFExporter = /*#__PURE__*/function () {
  function PDFExporter() {
    this.FileName = "File.pdf";
    this.Html = undefined;
    this.Orientation = "landscape";
  }
  var _proto = PDFExporter.prototype;
  _proto.Export = function Export() {
    var doc = new jspdf.jsPDF(this.Orientation, "pt", "letter");
    var $this = this;
    if (this.HtmlElement) {
      html2canvas(this.HtmlElement).then(function (canvas) {
        var imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'JPEG', 0, 0, 0, 0);
        doc.save($this.FileName);
      });
    } else if (this.Html) {
      doc.html(this.Html, {
        callback: function callback(doc) {
          doc.save($this.FileName);
        }
      });
    }
  };
  return PDFExporter;
}();

var resolveMimeType = function resolveMimeType(filenameOrExt) {
  if (!filenameOrExt) return false;
  return mime.lookup(filenameOrExt);
};
var resolveContentType = function resolveContentType(filenameOrExt) {
  if (!filenameOrExt) return false;
  return mime.contentType(filenameOrExt);
};
var resolveCharset = function resolveCharset(typeString) {
  if (!typeString) return false;
  return mime.charset(typeString);
};

var ExcelExporter = /*#__PURE__*/function () {
  function ExcelExporter() {
    this.FileName = "File.xls";
    this.Title = "Sheet1";
    this.Html = undefined;
  }
  var _proto = ExcelExporter.prototype;
  _proto.Export = function Export() {
    var _ref, _this$Html, _this$HtmlElement;
    var mimeType = resolveMimeType(this.FileName);
    var uri = 'data:' + mimeType + ';base64,';
    var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><?xml version="1.0" encoding="UTF-8" standalone="yes"?><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>{table}</body></html>';
    var base64 = function base64(s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    };
    var format = function format(s, c) {
      return s.replace(/{(\w+)}/g, function (m, p) {
        return c[p];
      });
    };
    var html = ((_ref = (_this$Html = this.Html) != null ? _this$Html : (_this$HtmlElement = this.HtmlElement) === null || _this$HtmlElement === void 0 ? void 0 : _this$HtmlElement.outerHTML) != null ? _ref : "").replace(/(<[a|A][^>]*>|)/g, '');
    if (this.FormatHtml) html = this.FormatHtml(html);
    var ctx = {
      table: html
    };
    window.location.href = uri + base64(format(template, ctx));
  };
  return ExcelExporter;
}();

var raiseCustomEvent = function raiseCustomEvent(eventType, data) {
  if (eventType === void 0) {
    eventType = "";
  }
  if (global.document === undefined) return;
  var event;
  event = new CustomEvent(eventType, {
    bubbles: true,
    cancelable: true,
    detail: data
  });
  document.dispatchEvent(event);
};
var listenCustomEvent = function listenCustomEvent(eventType, listener) {
  if (eventType === void 0) {
    eventType = "";
  }
  if (global.document === undefined) return;
  document.addEventListener(eventType, listener);
};

var EntityBinder = /*#__PURE__*/function (_React$Component) {
  function EntityBinder(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.Key = 0;
    _this.Controller = "";
    _this.AjaxBinder = false;
    _this.Options = new BinderOptions();
    _this.Renderer = null;
    _this.InputFields = [];
    _this.UseI18n = false;
    _this.Languages = [];
    _this.DefaultLanguageID = 0;
    _this.i18nProperty = "";
    _this.Theme = getAppTheme();
    _this.RootElementRef = React$1__default.createRef();
    _this.getEditUrl = function (id) {
      if (id === void 0) {
        id = 0;
      }
      if (_this.Options.EditURL) return _this.Options.EditURL;
      return "/" + _this.Controller + "/edit" + _this.Entity + "/" + id;
    };
    _this.getBackUrl = function () {
      if (_this.Options.BackURL) {
        return _this.Options.BackURL;
      } else {
        return "/" + _this.Controller + "/" + camelize(_this.Entity) + "List";
      }
    };
    _this.getActionPath = function () {
      if (_this.Options.ActionURL) {
        return _this.Options.ActionURL;
      }
      return "Update" + _this.Entity;
    };
    _this.onButtonClicked = function (key, params) {
      try {
        var _this$props$AppClient;
        if (key === "Save") {
          _this.SaveEntity();
        } else if (key === "Delete" && confirm((_this$props$AppClient = _this.props.AppClient) === null || _this$props$AppClient === void 0 ? void 0 : _this$props$AppClient.Translate("AreYouSureToDelete"))) {
          _this.DeleteEntity();
        }
        if (key === "AddNew") {
          _this.resetMetaTags();
          _this.setInitData(false, true);
        }
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
    _this.getFieldData = function (field) {
      if (!_this.state.data) return "";
      if (field.props.name === "id") return _this.state.data.id;
      if (field.props.name === "selectedLanguageID") return _this.state.languageID;
      var value = getObjectValue(_this.state.data, field.props.name, "");
      if (_this.UseI18n) {
        if (!_this.i18nProperty) _this.getI18NProperty();
        var i18nData = _this.getI18NData();
        if (!i18nData) i18nData = _this.addI18NData();
        value = getObjectValue(i18nData, field.props.name, "");
      }
      return value;
    };
    return _this;
  }
  _inheritsLoose(EntityBinder, _React$Component);
  var _proto = EntityBinder.prototype;
  _proto.Init = function Init() {
    if (this.state && this.state.initialized) return;
    if (this.props.Options) this.Options = _extends({}, this.Options, this.props.Options);
    if (this.props.pageTitle && !this.Options.PageTitle) this.Options.PageTitle = this.props.pageTitle;
    this.Configure();
    this.setInitData(true);
  };
  _proto.Configure = function Configure() {};
  _proto.beforeSendRequest = function beforeSendRequest(data) {
    return data;
  };
  _proto.SetDataSource = function SetDataSource(controller, entity) {
    this.Controller = controller;
    this.Entity = entity;
  };
  _proto.registerField = function registerField(field) {
    var existing = this.InputFields.find(function (item) {
      return item.props.name == field.props.name;
    });
    if (!existing) {
      this.InputFields.push(field);
    }
  };
  _proto.getI18NProperty = function getI18NProperty() {
    if (!this.i18nProperty && this.UseI18n) {
      var i18nProp = Object.keys(this.state.data).find(function (item) {
        return item.toLocaleUpperCase().indexOf("I18N") > -1;
      });
      if (!i18nProp && this.UseI18n) i18nProp = camelize(this.Entity) + "_i18n";
      if (i18nProp) {
        this.i18nProperty = i18nProp;
        if (!this.state.data[this.i18nProperty]) this.state.data[this.i18nProperty] = [];
      }
    }
    return this.i18nProperty;
  };
  _proto.getI18NData = function getI18NData() {
    var _this2 = this;
    if (this.i18nProperty && this.UseI18n && this.state && this.state.data && this.state.data[this.i18nProperty]) {
      var data = this.state.data[this.i18nProperty].find(function (item) {
        return item.languageID == _this2.state.languageID;
      });
      return data;
    }
  };
  _proto.addI18NData = function addI18NData() {
    var _this3 = this;
    if (this.i18nProperty && this.UseI18n && this.state && this.state.data && this.state.data[this.i18nProperty]) {
      var list = this.state.data[this.i18nProperty];
      var data = list.find(function (item) {
        return item.languageID == _this3.state.languageID;
      });
      if (data) return data;
      var data;
      if (list.length > 0) data = JSON.parse(JSON.stringify(list[0]));else data = JSON.parse(JSON.stringify(this.state.data));
      data.id = 0;
      data.languageID = this.state.languageID;
      delete data[this.i18nProperty];
      delete data["isImporting"];
      delete data["isSelected"];
      delete data["isValid"];
      delete data["userCreatedID"];
      delete data["userModifiedID"];
      delete data["dateCreated"];
      delete data["dateModified"];
      delete data["captcha"];
      list.push(data);
      return data;
    }
    return undefined;
  };
  _proto.OnAfterSave = function OnAfterSave() {};
  _proto.useTabs = function useTabs() {
    for (var _len = arguments.length, children = new Array(_len), _key = 0; _key < _len; _key++) {
      children[_key] = arguments[_key];
    }
    return /*#__PURE__*/React$1__default.createElement(Tabs, {
      key: this.Entity + "-tabs",
      id: this.Entity + "-tabs"
    }, children);
  };
  _proto.useTab = function useTab(id, text, active) {
    var _this$props$AppClient2;
    text = (_this$props$AppClient2 = this.props.AppClient) === null || _this$props$AppClient2 === void 0 ? void 0 : _this$props$AppClient2.Translate(pascalize(text));
    for (var _len2 = arguments.length, children = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      children[_key2 - 3] = arguments[_key2];
    }
    return /*#__PURE__*/React$1__default.createElement(Tab, {
      key: id,
      id: id,
      text: text,
      active: active
    }, children);
  };
  _proto.usePanel = function usePanel(text, collapsed, leftIcon, rightIcon) {
    var _this$props$AppClient3;
    text = (_this$props$AppClient3 = this.props.AppClient) === null || _this$props$AppClient3 === void 0 ? void 0 : _this$props$AppClient3.Translate(pascalize(text));
    for (var _len3 = arguments.length, children = new Array(_len3 > 4 ? _len3 - 4 : 0), _key3 = 4; _key3 < _len3; _key3++) {
      children[_key3 - 4] = arguments[_key3];
    }
    return /*#__PURE__*/React$1__default.createElement(Panel, {
      headerText: text,
      collapsed: collapsed,
      leftIcon: leftIcon,
      rightIcon: rightIcon
    }, children);
  };
  _proto.useInput = function useInput(props) {
    var _this$props$AppClient4,
      _this4 = this;
    if (!props.text && props.name) props.text = (_this$props$AppClient4 = this.props.AppClient) === null || _this$props$AppClient4 === void 0 ? void 0 : _this$props$AppClient4.Translate(pascalize(removeLastPropName(props.name, "ID")));
    return /*#__PURE__*/React$1__default.createElement(InputField, _extends({
      translateFn: function translateFn(key) {
        var _this4$props$AppClien;
        return (_this4$props$AppClien = _this4.props.AppClient) === null || _this4$props$AppClien === void 0 ? void 0 : _this4$props$AppClien.Translate(key);
      },
      key: this.Entity + "-field-" + props.name
    }, props, {
      listener: this
    }));
  };
  _proto.useI18NLanguageSelection = function useI18NLanguageSelection() {
    var _this$props$AppClient5;
    this.UseI18n = true;
    var props = {
      id: "selectedLanguageID",
      text: (_this$props$AppClient5 = this.props.AppClient) === null || _this$props$AppClient5 === void 0 ? void 0 : _this$props$AppClient5.Translate(pascalize("SelectedLanguageID")),
      name: "selectedLanguageID",
      value: this.state.languageID,
      type: "selectbox",
      options: this.Languages,
      displayProp: "name",
      valueProp: "id"
    };
    return /*#__PURE__*/React$1__default.createElement(InputField, _extends({
      key: this.Entity + "-field-" + props.name
    }, props, {
      listener: this
    }));
  };
  _proto.CreateService = function CreateService() {
    var _this$props$AppClient6;
    return (_this$props$AppClient6 = this.props.AppClient) === null || _this$props$AppClient6 === void 0 ? void 0 : _this$props$AppClient6.CreateService();
  };
  _proto.getExportFileName = function getExportFileName() {
    var _this$Options$PageTit;
    return (_this$Options$PageTit = this.Options.PageTitle) != null ? _this$Options$PageTit : "File";
  };
  _proto.onExportButtonClicked = function onExportButtonClicked(option) {
    try {
      var _this5 = this;
      var _temp3 = function () {
        if (_this5.RootElementRef.current) {
          var _temp2 = function () {
            if (_this5.Options.ExportMode == "screenshot") {
              if (option.extension == "pdf") {
                var exporter = new PDFExporter();
                exporter.HtmlElement = _this5.RootElementRef.current;
                exporter.FileName = _this5.getExportFileName() + "." + option.extension;
                exporter.Export();
              } else if (option.extension == "xls") {
                var xlsExporter = new ExcelExporter();
                xlsExporter.FileName = _this5.getExportFileName() + "." + option.extension;
                xlsExporter.HtmlElement = _this5.RootElementRef.current;
                xlsExporter.Export();
              }
            } else {
              var _temp4 = function () {
                if (_this5.Options.ExportMode == "remote" && _this5.Options.ExportCallback) {
                  return Promise.resolve(_this5.Options.ExportCallback(option)).then(function (dataArray) {
                    if (dataArray) {
                      var type = resolveMimeType(option.extension);
                      if (typeof type == "string") {
                        var blob = new Blob([dataArray], {
                          type: type
                        });
                        var url = URL.createObjectURL(blob);
                        window.open(url);
                      }
                    }
                  });
                }
              }();
              if (_temp4 && _temp4.then) return _temp4.then(function () {});
            }
          }();
          if (_temp2 && _temp2.then) return _temp2.then(function () {});
        }
      }();
      return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.resetMetaTags = function resetMetaTags() {
    if (!this.props.AppClient) return;
    if (!this.props.AppClient.DynamicSEO) this.props.AppClient.DynamicSEO = {};
    this.props.AppClient.DynamicSEO.Title = undefined;
    this.Options.PageTitle = undefined;
  };
  _proto.setMetaTags = function setMetaTags(data) {
    if (!data || !this.props.AppClient) return;
    if (!this.props.AppClient.DynamicSEO) this.props.AppClient.DynamicSEO = {};
    if (!this.props.AppClient.DynamicSEO.Title) this.props.AppClient.DynamicSEO.Title = this.props.AppClient.Translate(this.Entity) + " (#" + data.id + ")";
    if (!this.Options.PageTitle) this.Options.PageTitle = this.props.AppClient.DynamicSEO.Title;
    if (!this.Options.PageTitle) this.Options.PageTitle = this.props.AppClient.Translate(this.Entity);
  };
  _proto.validateFields = function validateFields() {
    var validForm = true;
    this.InputFields.forEach(function (field) {
      if (field.Validate && !field.Validate()) {
        validForm = false;
      }
    });
    return validForm;
  };
  _proto.GetEntity = function GetEntity(id, data) {
    try {
      var _exit = false;
      var _this6 = this;
      if (!id && !data) return Promise.resolve();
      var _temp5 = function () {
        if (data) {
          _this6.setState({
            loadingState: exports.LoadingState.Loaded
          });
          var _data$messages = {
            data: data,
            messages: []
          };
          _exit = true;
          return _data$messages;
        } else return function () {
          if (_this6.Controller && _this6.Entity && id) {
            _this6.setState({
              loadingState: exports.LoadingState.Loading
            });
            return _catch(function () {
              var _this6$CreateService;
              var postData = _extends({}, {
                Data: {
                  id: id
                },
                id: id
              });
              return Promise.resolve((_this6$CreateService = _this6.CreateService()) === null || _this6$CreateService === void 0 ? void 0 : _this6$CreateService.CreateEndpoint(_this6.Controller + "/Get" + _this6.Entity, {
                Payload: postData
              }).call()).then(function (result) {
                _this6.setState({
                  loadingState: exports.LoadingState.Loaded
                });
                _exit = true;
                return result;
              });
            }, function (error) {
              console.error(error);
              _this6.setState({
                loadingState: exports.LoadingState.Failed
              });
            });
          }
        }();
      }();
      return Promise.resolve(_temp5 && _temp5.then ? _temp5.then(function (_result3) {
        return _exit ? _result3 : data;
      }) : _exit ? _temp5 : data);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.SaveEntity = function SaveEntity() {
    try {
      var _this7 = this;
      if (!_this7.validateFields()) {
        return Promise.resolve();
      }
      var redirect = true;
      if (_this7.Options.IsNewEntity) {
        _this7.state.data.statusID = 1;
      }
      if (_this7.state.data.id && _this7.state.data.id > 0) {
        redirect = false;
      }
      var postData = {
        Data: _this7.state.data,
        languageID: _this7.state.languageID
      };
      return Promise.resolve(_catch(function () {
        var _this7$CreateService;
        postData = _this7.beforeSendRequest(postData);
        return Promise.resolve((_this7$CreateService = _this7.CreateService()) === null || _this7$CreateService === void 0 ? void 0 : _this7$CreateService.CreateEndpoint(_this7.Controller + "/" + _this7.getActionPath(), {
          Payload: postData
        }).call()).then(function (result) {
          if (result === undefined) return;
          if (!result.hasFailed) {
            var _this7$props$AppClien, _this7$props$AppClien2;
            _this7.setState({
              data: result.data
            });
            _this7.OnAfterSave();
            if (redirect && _this7.props.shownInParent !== true) {
              Router.push(_this7.getBackUrl());
            }
            if (_this7.props.parent != null) _this7.props.parent.onChildAction("refreshData");else if (!redirect) {
              Router.push(_this7.getEditUrl(result.data.id));
            }
            raiseCustomEvent("notification", {
              type: "info",
              title: (_this7$props$AppClien = _this7.props.AppClient) === null || _this7$props$AppClien === void 0 ? void 0 : _this7$props$AppClien.Translate("Info"),
              description: (_this7$props$AppClien2 = _this7.props.AppClient) === null || _this7$props$AppClien2 === void 0 ? void 0 : _this7$props$AppClien2.Translate("EntitySavedSuccessfully")
            });
          } else {
            if (result.messages && result.messages.length > 0) {
              _this7.setState({
                messages: result.messages
              });
            }
          }
        });
      }, function () {}));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.DeleteEntity = function DeleteEntity() {
    var _this8 = this;
    return Promise.resolve(_catch(function () {
      var _this8$CreateService;
      var service = _this8.CreateService();
      if (service === undefined) return;
      var postData = {
        Data: _extends({}, clone(_this8.state.data), {
          statusID: 2
        })
      };
      return Promise.resolve((_this8$CreateService = _this8.CreateService()) === null || _this8$CreateService === void 0 ? void 0 : _this8$CreateService.CreateEndpoint(_this8.Controller + "/" + _this8.getActionPath(), {
        Payload: postData
      }).call()).then(function (result) {
        if (result) {
          var _this8$props$AppClien, _this8$props$AppClien2;
          if (!result.hasFailed) {
            if (_this8.props.shownInParent !== true) {
              Router.push(_this8.getBackUrl());
            } else if (_this8.props.parent != null) {
              _this8.props.parent.onChildAction("refreshData");
            }
          } else {
            if (result.messages && result.messages.length > 0) {
              _this8.setState({
                messages: result.messages
              });
            }
          }
          raiseCustomEvent("notification", {
            type: "info",
            title: (_this8$props$AppClien = _this8.props.AppClient) === null || _this8$props$AppClien === void 0 ? void 0 : _this8$props$AppClien.Translate("Info"),
            description: (_this8$props$AppClien2 = _this8.props.AppClient) === null || _this8$props$AppClien2 === void 0 ? void 0 : _this8$props$AppClien2.Translate("EntityDeletedSuccessfully")
          });
        }
      });
    }, function () {}));
  };
  _proto.setFieldData = function setFieldData(name, value) {
    if (!name && name === "id") return;
    if (name == "selectedLanguageID") {
      this.setState({
        languageID: parseInt(value)
      });
      return;
    }
    if (this.UseI18n) {
      if (!this.i18nProperty) this.getI18NProperty();
      var i18nData = this.getI18NData();
      if (!i18nData) i18nData = this.addI18NData();
      if (i18nData) setObjectValue(i18nData, name, value);
      if (this.DefaultLanguageID == this.state.languageID) setObjectValue(this.state.data, name, value);
    } else setObjectValue(this.state.data, name, value);
  };
  _proto.setInitData = function setInitData(firstLoad, resetForNew) {
    if (firstLoad === void 0) {
      firstLoad = false;
    }
    if (resetForNew === void 0) {
      resetForNew = false;
    }
    var id = this.props.id;
    if (resetForNew) id = 0;
    var data = undefined;
    if (firstLoad) data = this.props.Data;
    if (!id && this.props.shownInParent !== true) {
      var splittedURL = window.location.href.split("/");
      id = splittedURL[splittedURL.length - 1];
    }
    if (!data && (!id || id === "0")) {
      data = {
        id: 0
      };
      id = 0;
      this.Options.IsNewEntity = true;
    } else this.Options.IsNewEntity = false;
    this.setState({
      loadingState: data ? exports.LoadingState.Loaded : exports.LoadingState.Waiting,
      id: id,
      data: data,
      messages: [],
      languageID: this.DefaultLanguageID
    });
  };
  _proto.componentDidMount = function componentDidMount() {
    this.Options = new BinderOptions();
    this.UseI18n = this.props.useI18N === true;
    this.Key = Math.random() * (10000 - 1) + 1;
    this.Init();
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this9 = this;
    if (this.state.loadingState == exports.LoadingState.Loaded && (!prevProps || prevProps.id != this.props.id || !this.state.data)) {
      this.setInitData();
    } else if (this.state.loadingState === exports.LoadingState.Waiting) {
      this.GetEntity(this.state.id, this.state.data).then(function (data) {
        if (data && data.data) _this9.setState({
          id: _this9.props.id,
          data: data.data,
          messages: data.messages,
          languageID: _this9.DefaultLanguageID
        });else if (data) _this9.setState({
          id: 0,
          data: {},
          messages: data.messages
        });
      });
    } else {
      var _this$props$AppClient7;
      this.setMetaTags(this.state.data);
      if (!this.props.shownInParent) (_this$props$AppClient7 = this.props.AppClient) === null || _this$props$AppClient7 === void 0 ? void 0 : _this$props$AppClient7.UpdateMetaTags();
    }
  };
  _proto.onChildAction = function onChildAction(type) {};
  _proto.render = function render() {
    var _this$state$messages;
    if (!this.state || !this.state.data) return /*#__PURE__*/React$1__default.createElement(Fragment, null);
    this.setMetaTags(this.state.data);
    return /*#__PURE__*/React$1__default.createElement(Fragment, null, this.renderHeader(), /*#__PURE__*/React$1__default.createElement("div", {
      className: "entity-binder",
      key: "entity-binder",
      ref: this.RootElementRef
    }, (_this$state$messages = this.state.messages) === null || _this$state$messages === void 0 ? void 0 : _this$state$messages.map(function (item, index) {
      return /*#__PURE__*/React$1__default.createElement(ServiceMessageResult, {
        code: item.code,
        description: item.description,
        key: index,
        type: 0
      });
    }), this.renderBinder()), this.renderFooter());
  };
  _proto.renderHeader = function renderHeader() {
    return /*#__PURE__*/React$1__default.createElement(Fragment, null);
  };
  _proto.renderFooter = function renderFooter() {
    return /*#__PURE__*/React$1__default.createElement(Fragment, null);
  };
  _proto.renderBinder = function renderBinder() {
    return /*#__PURE__*/React$1__default.createElement(Fragment, null);
  };
  return EntityBinder;
}(React$1__default.Component);

var TableClass = function TableClass() {
  this.Columns = [];
};

var QueryDataModel = function QueryDataModel() {
  this.sorters = [];
};

var QueryFilter = function QueryFilter() {
  this.name = "";
  this.constraint = 0;
  this.comparison = 0;
};
var DataConstraint;
(function (DataConstraint) {
  DataConstraint[DataConstraint["And"] = 0] = "And";
  DataConstraint[DataConstraint["Or"] = 1] = "Or";
})(DataConstraint || (DataConstraint = {}));
var DataComparison;
(function (DataComparison) {
  DataComparison[DataComparison["Equal"] = 0] = "Equal";
  DataComparison[DataComparison["Different"] = 1] = "Different";
  DataComparison[DataComparison["Greater"] = 2] = "Greater";
  DataComparison[DataComparison["Less"] = 3] = "Less";
  DataComparison[DataComparison["GreaterOrEqual"] = 4] = "GreaterOrEqual";
  DataComparison[DataComparison["LessOrEqual"] = 5] = "LessOrEqual";
  DataComparison[DataComparison["In"] = 6] = "In";
  DataComparison[DataComparison["Between"] = 7] = "Between";
  DataComparison[DataComparison["StartsWith"] = 8] = "StartsWith";
  DataComparison[DataComparison["EndsWith"] = 9] = "EndsWith";
  DataComparison[DataComparison["Contains"] = 10] = "Contains";
  DataComparison[DataComparison["Exists"] = 11] = "Exists";
  DataComparison[DataComparison["ContainsFTS"] = 12] = "ContainsFTS";
})(DataComparison || (DataComparison = {}));

var QueryData = /*#__PURE__*/function () {
  function QueryData() {
    this.model = new QueryDataModel();
  }
  var _proto = QueryData.prototype;
  _proto.processQuery = function processQuery(columns, filters, sorter) {
    var internalFilters = [];
    var internalSorters = [];
    if (filters) {
      for (var _i = 0, _Object$keys = Object.keys(filters); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        if (filters[key] && filters[key].length > 0) {
          var _column$Filtering;
          var column = columns.find(function (x) {
            var _x$Filtering;
            return ((_x$Filtering = x.Filtering) === null || _x$Filtering === void 0 ? void 0 : _x$Filtering.Name) === key;
          });
          if (column && (_column$Filtering = column.Filtering) !== null && _column$Filtering !== void 0 && _column$Filtering.Name) {
            var _column$Filtering$Com, _column$Filtering2;
            var internalFilter = new QueryFilter();
            internalFilter.name = key;
            internalFilter.value = filters[key];
            internalFilter.comparison = (_column$Filtering$Com = (_column$Filtering2 = column.Filtering) === null || _column$Filtering2 === void 0 ? void 0 : _column$Filtering2.Comparison) != null ? _column$Filtering$Com : DataComparison.Equal;
            if (internalFilter.value && typeof internalFilter.value == "string") {
              if (internalFilter.value.startsWith("[") && internalFilter.value.endsWith("]")) {
                internalFilter.value = JSON.parse(internalFilter.value);
              }
            }
            if (Array.isArray(internalFilter.value)) {
              internalFilter.comparison = DataComparison.In;
            }
            internalFilters.push(internalFilter);
          }
        }
      }
    }
    if (sorter && sorter.name) {
      internalSorters.push(sorter);
    }
    if (internalSorters.length === 0 && internalFilters.length === 0) return null;
    this.model = new QueryDataModel();
    this.model.sorters = internalSorters;
    if (internalFilters.length > 0) {
      for (var i = 0; i < internalFilters.length; i++) {
        this.applyFilter(internalFilters[i]);
      }
    }
    return {
      queryData: this.model
    };
  };
  _proto.applyFilter = function applyFilter(filterToApply) {
    var newFilter = new QueryFilter();
    newFilter.left = filterToApply;
    newFilter.right = this.model.filter;
    this.model.filter = newFilter;
  };
  return QueryData;
}();

var Config = function Config() {
  this.Key = Math.random() * (10000 - 1) + 1;
  this.Entity = "";
  this.Schema = "";
  this.DataSourcePath = "";
  this.PageSize = 25;
  this.Query = new QueryData();
  this.AjaxBinder = false;
  this.Table = new TableClass();
  this.RowSelection = "";
  this.HideSelectAll = false;
  this.beforeSendRequest = function (data) {
    return data;
  };
  this.onRowSelectionChange = function (selectedRowKeys, selectedRows) {};
};

var TableColumnClass = function TableColumnClass() {
  this.Type = "text";
  this.PropertyName = "";
  this.DataSource = undefined;
  this.HeaderText = "";
  this.Format = "";
  this.TextFormatter = function (text) {
    return text;
  };
  this.Freeze = false;
  this.DisplayOrder = 0;
  this.Visible = true;
  this.AllowSorting = true;
  this.AllowFiltering = true;
  this.AllowEditing = false;
  this.IsSorted = false;
  this.SortDirection = "";
  this.IsFiltered = false;
  this.MaxTextLength = 0;
  this.Checkboxes = false;
  this.Filtering = {
    Type: "text",
    RemoteDataSource: {
      DisplayProp: "name",
      ValueProp: "id"
    }
  };
};

var Table = React$1__default.memo(function (_ref) {
  var _table$Columns$find, _table$Columns$find2;
  var table = _ref.table,
    theme = _ref.theme,
    data = _ref.data,
    appClient = _ref.appClient,
    listener = _ref.listener;
  var _useState = React$1.useState(0),
    selectedRow = _useState[0],
    setSelectedRow = _useState[1];
  var _useState2 = React$1.useState([0, 0]),
    selectedCell = _useState2[0],
    setSelectedCell = _useState2[1];
  var _useState3 = React$1.useState([0, 0]),
    hoveredCell = _useState3[0],
    setHoveredCell = _useState3[1];
  var _useState4 = React$1.useState(0),
    selectedColumn = _useState4[0],
    setSelectedColumn = _useState4[1];
  var _useState5 = React$1.useState([""]),
    setFilteredColumns = _useState5[1];
  var _useState6 = React$1.useState(new TableColumnClass()),
    selectedColumnToFilter = _useState6[0],
    setSelectedColumnToFilter = _useState6[1];
  var _useState7 = React$1.useState(table === null || table === void 0 ? void 0 : (_table$Columns$find = table.Columns.find(function (column) {
      return column.IsSorted === true;
    })) === null || _table$Columns$find === void 0 ? void 0 : _table$Columns$find.PropertyName),
    setSortedColumn = _useState7[1];
  var _useState8 = React$1.useState(table === null || table === void 0 ? void 0 : (_table$Columns$find2 = table.Columns.find(function (column) {
      return column.IsSorted === true;
    })) === null || _table$Columns$find2 === void 0 ? void 0 : _table$Columns$find2.SortDirection),
    sortedColumnDirection = _useState8[0],
    setSortedColumnDirection = _useState8[1];
  var Theme = getAppTheme({
    Table: theme
  }).Table;
  var containerRef = React$1__default.createRef();
  var topScrollRef = React$1__default.createRef();
  var ComparisonSigns = [{
    text: appClient === null || appClient === void 0 ? void 0 : appClient.Translate("Equal"),
    comparison: DataComparison.Equal,
    types: ["numeric", "date", "time", "datetime", "text", "month", "week"],
    sign: "="
  }, {
    text: appClient === null || appClient === void 0 ? void 0 : appClient.Translate("Different"),
    comparison: DataComparison.Different,
    types: ["numeric", "date", "time", "datetime", "text", "month", "week"],
    sign: "!="
  }, {
    text: appClient === null || appClient === void 0 ? void 0 : appClient.Translate("Greater"),
    comparison: DataComparison.Greater,
    types: ["numeric", "date", "time", "datetime", "month", "week"],
    sign: ">"
  }, {
    text: appClient === null || appClient === void 0 ? void 0 : appClient.Translate("Less"),
    comparison: DataComparison.Less,
    types: ["numeric", "date", "time", "datetime", "month", "week"],
    sign: "<"
  }, {
    text: appClient === null || appClient === void 0 ? void 0 : appClient.Translate("GreaterOrEqual"),
    comparison: DataComparison.GreaterOrEqual,
    types: ["numeric", "date", "time", "datetime", "month", "week"],
    sign: ">="
  }, {
    text: appClient === null || appClient === void 0 ? void 0 : appClient.Translate("LessOrEqual"),
    comparison: DataComparison.LessOrEqual,
    types: ["numeric", "date", "time", "datetime", "month", "week"],
    sign: "<="
  }, {
    text: appClient === null || appClient === void 0 ? void 0 : appClient.Translate("Between"),
    comparison: DataComparison.Between,
    types: ["text"],
    sign: "*.*"
  }, {
    text: appClient === null || appClient === void 0 ? void 0 : appClient.Translate("StartsWith"),
    comparison: DataComparison.StartsWith,
    types: ["text"],
    sign: ".*"
  }, {
    text: appClient === null || appClient === void 0 ? void 0 : appClient.Translate("EndsWith"),
    comparison: DataComparison.EndsWith,
    types: ["text"],
    sign: "*."
  }, {
    text: appClient === null || appClient === void 0 ? void 0 : appClient.Translate("Contains"),
    comparison: DataComparison.Contains,
    types: ["text"],
    sign: "*.*"
  }];
  if (!table) return /*#__PURE__*/React$1__default.createElement("div", null);
  var renderColumns = function renderColumns() {
    return /*#__PURE__*/React$1__default.createElement("tr", {
      className: Theme === null || Theme === void 0 ? void 0 : Theme.ColumnsRowClass
    }, table.Columns.filter(function (column) {
      return column.Visible !== false;
    }).map(function (column, index) {
      var _Theme$Icons, _Theme$Icons2, _Theme$Icons3, _Theme$Icons4, _Theme$Icons5;
      return /*#__PURE__*/React$1__default.createElement("th", {
        className: selectedColumn == index ? Theme === null || Theme === void 0 ? void 0 : Theme.SelectedColumnClass : Theme === null || Theme === void 0 ? void 0 : Theme.ColumnClass
      }, /*#__PURE__*/React$1__default.createElement("div", {
        className: Theme === null || Theme === void 0 ? void 0 : Theme.ColumnRootComponentClass
      }, /*#__PURE__*/React$1__default.createElement("div", {
        className: Theme === null || Theme === void 0 ? void 0 : Theme.ColumnTitleClass
      }, column.HeaderText), /*#__PURE__*/React$1__default.createElement("div", {
        className: Theme === null || Theme === void 0 ? void 0 : Theme.ColumnButtonsClass
      }, column.AllowSorting !== false && /*#__PURE__*/React$1__default.createElement(Fragment, null, /*#__PURE__*/React$1__default.createElement("span", {
        onClick: function onClick(e) {
          return onSortingClick(e, column);
        },
        style: {
          cursor: "pointer"
        }
      }, !column.SortDirection && getImageComponent(Theme === null || Theme === void 0 ? void 0 : (_Theme$Icons = Theme.Icons) === null || _Theme$Icons === void 0 ? void 0 : _Theme$Icons.NotSorted), column.IsSorted && column.SortDirection === "DESC" && getImageComponent(Theme === null || Theme === void 0 ? void 0 : (_Theme$Icons2 = Theme.Icons) === null || _Theme$Icons2 === void 0 ? void 0 : _Theme$Icons2.DescSorted), column.IsSorted && column.SortDirection === "ASC" && getImageComponent(Theme === null || Theme === void 0 ? void 0 : (_Theme$Icons3 = Theme.Icons) === null || _Theme$Icons3 === void 0 ? void 0 : _Theme$Icons3.AscSorted))), column.AllowFiltering !== false && /*#__PURE__*/React$1__default.createElement(Fragment, null, /*#__PURE__*/React$1__default.createElement("span", {
        onClick: function onClick(e) {
          return onFilteringClick(e, column);
        },
        style: {
          cursor: "pointer"
        }
      }, !column.IsFiltered && getImageComponent(Theme === null || Theme === void 0 ? void 0 : (_Theme$Icons4 = Theme.Icons) === null || _Theme$Icons4 === void 0 ? void 0 : _Theme$Icons4.NotFiltered), column.IsFiltered && getImageComponent(Theme === null || Theme === void 0 ? void 0 : (_Theme$Icons5 = Theme.Icons) === null || _Theme$Icons5 === void 0 ? void 0 : _Theme$Icons5.Filtered))))), selectedColumnToFilter && selectedColumnToFilter.PropertyName == column.PropertyName && showFilterModal(selectedColumnToFilter, index));
    }));
  };
  var setColumnFilterValue = function setColumnFilterValue(column, value) {
    if (value && value != "") {
      debugger;
      column.IsFiltered = true;
      if (column.Filtering) column.Filtering.Value = value;
    } else {
      column.IsFiltered = false;
      if (column.Filtering) column.Filtering.Value = undefined;
    }
  };
  var ClearFilterValue = function ClearFilterValue(column) {
    column.IsFiltered = false;
    if (column.Filtering) column.Filtering.Value = undefined;
    SetFilteredColumnsState();
  };
  var SetFilteredColumnsState = function SetFilteredColumnsState() {
    setFilteredColumns(table.Columns.map(function (item) {
      return item.IsFiltered === true && item.PropertyName ? item.PropertyName : "";
    }));
    if (listener !== null && listener !== void 0 && listener.onFilteringChanged) listener === null || listener === void 0 ? void 0 : listener.onFilteringChanged(table.Columns);
    setSelectedColumnToFilter({});
  };
  var setComparison = function setComparison(column, val) {
    if (column.Filtering) column.Filtering.Comparison = val;
  };
  var showFilterModal = function showFilterModal(column, columnIndex) {
    var _ref2, _column$Filtering$Typ, _column$Filtering, _column$Filtering2, _appClient$Translate, _appClient$Translate2, _appClient$Translate3, _column$Filtering3, _column$Filtering$Rem, _column$Filtering4, _column$Filtering4$Re, _column$Filtering$Rem2, _column$Filtering5, _column$Filtering5$Re, _column$Filtering$Typ2, _column$Filtering7, _column$Filtering8, _column$Filtering9, _column$Filtering$Nam, _column$Filtering10;
    var modalID = "filter-selection";
    var type = (_ref2 = (_column$Filtering$Typ = (_column$Filtering = column.Filtering) === null || _column$Filtering === void 0 ? void 0 : _column$Filtering.Type) != null ? _column$Filtering$Typ : column.Type) != null ? _ref2 : "NONE";
    var comparisons = ComparisonSigns.filter(function (comp) {
      return comp.types.indexOf(type) > -1;
    }).map(function (comp) {
      var _comp$text;
      return {
        text: (_comp$text = comp.text) != null ? _comp$text : comp.sign,
        value: comp.comparison.toString()
      };
    });
    if (column.Filtering && !((_column$Filtering2 = column.Filtering) !== null && _column$Filtering2 !== void 0 && _column$Filtering2.Comparison) && comparisons.length > 0) column.Filtering.Comparison = parseInt(comparisons[0].value);
    return /*#__PURE__*/React$1__default.createElement(Dropdown, {
      visible: true,
      id: modalID,
      label: "Filter to",
      theme: {
        Class: (columnIndex > 0 ? "right-3" : "left-3") + " absolute p-3 bg-white border border-gainsboro rounded-lg shadow-sm z-10"
      },
      onSelectionChange: function onSelectionChange(options, button) {
        if (button) {
          if (button.id == 0) {
            ClearFilterValue(column);
          } else if (button.id == 1) {
            SetFilteredColumnsState();
          } else setSelectedColumnToFilter({});
        }
      },
      buttons: [{
        id: 0,
        text: (_appClient$Translate = appClient === null || appClient === void 0 ? void 0 : appClient.Translate("Clear")) != null ? _appClient$Translate : "Clear",
        hideDropdownOnClick: true
      }, {
        id: 1,
        text: (_appClient$Translate2 = appClient === null || appClient === void 0 ? void 0 : appClient.Translate("Apply")) != null ? _appClient$Translate2 : "Apply",
        hideDropdownOnClick: true
      }, {
        id: -1,
        text: (_appClient$Translate3 = appClient === null || appClient === void 0 ? void 0 : appClient.Translate("Dismiss")) != null ? _appClient$Translate3 : "Dismiss",
        hideDropdownOnClick: true
      }]
    }, comparisons && comparisons.length > 0 && /*#__PURE__*/React$1__default.createElement(SelectInput, {
      defaultValue: (_column$Filtering3 = column.Filtering) === null || _column$Filtering3 === void 0 ? void 0 : _column$Filtering3.Comparison,
      options: comparisons,
      onChange: function onChange(e) {
        return setComparison(column, parseInt(e.currentTarget.value));
      }
    }), /*#__PURE__*/React$1__default.createElement(InputField, {
      shownInDropdown: true,
      dropDownDefaultOpen: true,
      hideSelections: true,
      multipleSelection: true,
      labelVisible: false,
      valueProp: (_column$Filtering$Rem = (_column$Filtering4 = column.Filtering) === null || _column$Filtering4 === void 0 ? void 0 : (_column$Filtering4$Re = _column$Filtering4.RemoteDataSource) === null || _column$Filtering4$Re === void 0 ? void 0 : _column$Filtering4$Re.ValueProp) != null ? _column$Filtering$Rem : "id",
      displayProp: (_column$Filtering$Rem2 = (_column$Filtering5 = column.Filtering) === null || _column$Filtering5 === void 0 ? void 0 : (_column$Filtering5$Re = _column$Filtering5.RemoteDataSource) === null || _column$Filtering5$Re === void 0 ? void 0 : _column$Filtering5$Re.DisplayProp) != null ? _column$Filtering$Rem2 : "name",
      listener: {
        setFieldData: function setFieldData(name, value) {
          return setColumnFilterValue(column, value);
        },
        getFieldData: function getFieldData(field) {
          var _column$Filtering6;
          return (_column$Filtering6 = column.Filtering) === null || _column$Filtering6 === void 0 ? void 0 : _column$Filtering6.Value;
        }
      },
      text: column.HeaderText,
      type: (_column$Filtering$Typ2 = (_column$Filtering7 = column.Filtering) === null || _column$Filtering7 === void 0 ? void 0 : _column$Filtering7.Type) != null ? _column$Filtering$Typ2 : column.Type,
      enumSelectionType: (_column$Filtering8 = column.Filtering) === null || _column$Filtering8 === void 0 ? void 0 : _column$Filtering8.EnumSelectionType,
      remoteDataSource: (_column$Filtering9 = column.Filtering) === null || _column$Filtering9 === void 0 ? void 0 : _column$Filtering9.RemoteDataSource,
      name: (_column$Filtering$Nam = (_column$Filtering10 = column.Filtering) === null || _column$Filtering10 === void 0 ? void 0 : _column$Filtering10.Name) != null ? _column$Filtering$Nam : column.PropertyName
    }));
  };
  var onSortingClick = function onSortingClick(e, column) {
    e.preventDefault();
    table.Columns.forEach(function (item) {
      item.IsSorted = false;
      item.SortDirection = undefined;
    });
    if (column.PropertyName) setSortedColumn(column.PropertyName);
    var direction = "ASC";
    if (sortedColumnDirection == "ASC") direction = "DESC";else direction = "ASC";
    setSortedColumnDirection(direction);
    column.IsSorted = true;
    column.SortDirection = direction;
    if (listener !== null && listener !== void 0 && listener.onSortingChanged) listener === null || listener === void 0 ? void 0 : listener.onSortingChanged(column, direction);
    return true;
  };
  var onFilteringClick = function onFilteringClick(e, column) {
    e.preventDefault();
    if (!selectedColumnToFilter || column.PropertyName != selectedColumnToFilter.PropertyName) setSelectedColumnToFilter(column);else if (column.PropertyName == selectedColumnToFilter.PropertyName) setSelectedColumnToFilter({});
    return true;
  };
  var onRowClick = function onRowClick(e, index) {
    if (listener !== null && listener !== void 0 && listener.onRowClick) listener === null || listener === void 0 ? void 0 : listener.onRowClick(e, index);
    setSelectedRow(index);
    return true;
  };
  var renderRows = function renderRows() {
    return data === null || data === void 0 ? void 0 : data.map(function (row, index) {
      return /*#__PURE__*/React$1__default.createElement("tr", {
        key: index,
        onClick: function onClick(e) {
          return onRowClick(e, index);
        },
        className: selectedRow === index ? Theme === null || Theme === void 0 ? void 0 : Theme.SelectedRowClass : Theme === null || Theme === void 0 ? void 0 : Theme.RowClass
      }, table.Columns.filter(function (column) {
        return column.Visible !== false;
      }).map(function (column, columnIndex) {
        return renderCell(row, column, index, columnIndex);
      }));
    });
  };
  var onCellClick = function onCellClick(e, row, column, rowIndex, columnIndex) {
    if (listener !== null && listener !== void 0 && listener.onCellClick) listener === null || listener === void 0 ? void 0 : listener.onCellClick(e, row, column, rowIndex, columnIndex);
    setSelectedCell([rowIndex, columnIndex]);
    setSelectedColumn(columnIndex);
    return true;
  };
  var cellEditableControlKeyUp = function cellEditableControlKeyUp(e, row, column) {
    if (e.key == "Escape") {
      setSelectedCell([-1, -1]);
    } else if (e.key == "Enter") {
      setSelectedCell([-1, -1]);
      if (listener && listener.onCellValueChanged) listener.onCellValueChanged(row, column);
    }
  };
  var renderCellValue = function renderCellValue(row, column, value, rowIndex, columnIndex) {
    if (listener && listener.renderCellValue) value = listener.renderCellValue(row, column, value);
    if (column.AllowEditing == true && selectedCell && selectedCell[0] == rowIndex && selectedCell[1] == columnIndex) {
      var _column$Filtering11, _column$Filtering$Rem3, _column$Filtering12, _column$Filtering12$R, _column$Filtering$Rem4, _column$Filtering13, _column$Filtering13$R, _column$Filtering$Typ3, _column$Filtering16, _column$Filtering17, _column$Filtering18, _column$Filtering$Nam2, _column$Filtering19;
      return /*#__PURE__*/React$1__default.createElement(InputField, {
        theme: {
          RootClass: ""
        },
        onKeyUp: function onKeyUp(e) {
          return cellEditableControlKeyUp(e, row, column);
        },
        labelVisible: false,
        valuevisible: (_column$Filtering11 = column.Filtering) === null || _column$Filtering11 === void 0 ? void 0 : _column$Filtering11.Value,
        valueProp: (_column$Filtering$Rem3 = (_column$Filtering12 = column.Filtering) === null || _column$Filtering12 === void 0 ? void 0 : (_column$Filtering12$R = _column$Filtering12.RemoteDataSource) === null || _column$Filtering12$R === void 0 ? void 0 : _column$Filtering12$R.ValueProp) != null ? _column$Filtering$Rem3 : "id",
        displayProp: (_column$Filtering$Rem4 = (_column$Filtering13 = column.Filtering) === null || _column$Filtering13 === void 0 ? void 0 : (_column$Filtering13$R = _column$Filtering13.RemoteDataSource) === null || _column$Filtering13$R === void 0 ? void 0 : _column$Filtering13$R.DisplayProp) != null ? _column$Filtering$Rem4 : "name",
        listener: {
          setFieldData: function setFieldData(name, value) {
            var _column$Filtering14;
            return setObjectValue(row, (_column$Filtering14 = column.Filtering) === null || _column$Filtering14 === void 0 ? void 0 : _column$Filtering14.Name, value);
          },
          getFieldData: function getFieldData(field) {
            var _column$Filtering15;
            return getObjectValue(row, (_column$Filtering15 = column.Filtering) === null || _column$Filtering15 === void 0 ? void 0 : _column$Filtering15.Name);
          }
        },
        text: column.HeaderText,
        type: (_column$Filtering$Typ3 = (_column$Filtering16 = column.Filtering) === null || _column$Filtering16 === void 0 ? void 0 : _column$Filtering16.Type) != null ? _column$Filtering$Typ3 : column.Type,
        enumSelectionType: (_column$Filtering17 = column.Filtering) === null || _column$Filtering17 === void 0 ? void 0 : _column$Filtering17.EnumSelectionType,
        remoteDataSource: (_column$Filtering18 = column.Filtering) === null || _column$Filtering18 === void 0 ? void 0 : _column$Filtering18.RemoteDataSource,
        name: (_column$Filtering$Nam2 = (_column$Filtering19 = column.Filtering) === null || _column$Filtering19 === void 0 ? void 0 : _column$Filtering19.Name) != null ? _column$Filtering$Nam2 : column.PropertyName
      });
    } else if (column.AllowEditing == true && hoveredCell && hoveredCell[0] == rowIndex && hoveredCell[1] == columnIndex) {
      return /*#__PURE__*/React$1__default.createElement(Fragment, null, value, " ", /*#__PURE__*/React$1__default.createElement(solid.PencilIcon, {
        width: 12,
        className: "absolute right-3 top-3",
        height: 12
      }));
    }
    return value;
  };
  var onMouseOverCell = function onMouseOverCell(row, column, rowIndex, columnIndex) {
    setHoveredCell([rowIndex, columnIndex]);
  };
  var onMouseOutCell = function onMouseOutCell(row, column, rowIndex, columnIndex) {
    setHoveredCell([-1, -1]);
  };
  var renderCell = function renderCell(row, column, rowIndex, columnIndex) {
    var value = getObjectValue(row, column.PropertyName);
    if (column.Type == "date" || column.Type == "datetime" || column.Type == "week" || column.Type == "time" || column.Type == "month") {
      value = getFormattedDateString(value, column.Format, column.Type);
    } else if (column.Type == "enum") {
      var _column$Filtering20;
      if (!column.DataSource && (_column$Filtering20 = column.Filtering) !== null && _column$Filtering20 !== void 0 && _column$Filtering20.EnumSelectionType) column.DataSource = enumToArray(column.Filtering.EnumSelectionType, function (key) {
        return appClient === null || appClient === void 0 ? void 0 : appClient.Translate(key);
      });
      if (Array.isArray(column.DataSource)) {
        var _column$DataSource$fi;
        var tmpValue = (_column$DataSource$fi = column.DataSource.find(function (item) {
          return item.value == value;
        })) === null || _column$DataSource$fi === void 0 ? void 0 : _column$DataSource$fi.text;
        if (tmpValue) value = tmpValue;
      }
    } else if (column.Type == "checkbox") {
      value = /*#__PURE__*/React$1__default.createElement(CheckboxInput, {
        readOnly: true,
        checked: value === true || parseFloatIfCan(value) > -1
      });
    }
    var className = column.Type ? Theme === null || Theme === void 0 ? void 0 : Theme.CellTypeClasses[column.Type] : "";
    className = className + " " + (selectedCell[0] == rowIndex && selectedCell[1] == columnIndex ? Theme === null || Theme === void 0 ? void 0 : Theme.SelectedCellClass : Theme === null || Theme === void 0 ? void 0 : Theme.CellClass);
    if (column.TextFormatter) value = column.TextFormatter(value);
    if (column.MaxTextLength && column.MaxTextLength > 0 && value && value.length > column.MaxTextLength) value = value.toString().substring(0, column.MaxTextLength);
    return /*#__PURE__*/React$1__default.createElement("td", {
      onMouseOver: function onMouseOver() {
        return onMouseOverCell(row, column, rowIndex, columnIndex);
      },
      onMouseOut: function onMouseOut() {
        return onMouseOutCell();
      },
      className: className + " relative",
      onClick: function onClick(e) {
        return onCellClick(e, row, column, rowIndex, columnIndex);
      }
    }, renderCellValue(row, column, value, rowIndex, columnIndex));
  };
  var onTableScroll = function onTableScroll() {
    if (containerRef.current && topScrollRef.current) {
      var table = containerRef.current.children.item(0);
      var scrollbar = topScrollRef.current.children.item(0);
      if (table && scrollbar) {
        if (table.clientWidth > containerRef.current.clientWidth) {
          topScrollRef.current.style.display = "block";
          scrollbar.setAttribute("style", "width:" + table.clientWidth + "px");
          topScrollRef.current.scrollTo({
            left: containerRef.current.scrollLeft
          });
        } else topScrollRef.current.style.display = "none";
      }
    }
  };
  var onTopScroll = function onTopScroll() {
    if (containerRef.current && topScrollRef.current) {
      var table = containerRef.current.children.item(0);
      var scrollbar = topScrollRef.current.children.item(0);
      if (table && scrollbar) {
        if (table.clientWidth > containerRef.current.clientWidth) {
          containerRef.current.scrollTo({
            left: topScrollRef.current.scrollLeft
          });
        }
      }
    }
  };
  React$1.useEffect(function () {
    onTableScroll();
  }, []);
  return /*#__PURE__*/React$1__default.createElement(Fragment, null, /*#__PURE__*/React$1__default.createElement("div", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.TopScrollClass,
    ref: topScrollRef,
    onScroll: function onScroll() {
      return onTopScroll();
    }
  }, /*#__PURE__*/React$1__default.createElement("div", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.TopScrollbarClass
  })), /*#__PURE__*/React$1__default.createElement("div", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.ContainerClass,
    ref: containerRef,
    onScroll: function onScroll() {
      return onTableScroll();
    }
  }, /*#__PURE__*/React$1__default.createElement("table", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.Class,
    border: 1
  }, /*#__PURE__*/React$1__default.createElement("thead", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.HeadClass
  }, renderColumns()), /*#__PURE__*/React$1__default.createElement("tbody", null, renderRows()))));
});

var ServiceResult = function ServiceResult() {
  this.hasFailed = false;
  this.messages = [];
  this.token = "";
};

var serviceCollectionResult = /*#__PURE__*/function (_ServiceResult) {
  function serviceCollectionResult() {
    var _this;
    _this = _ServiceResult.apply(this, arguments) || this;
    _this.totalDataCount = 0;
    return _this;
  }
  _inheritsLoose(serviceCollectionResult, _ServiceResult);
  return serviceCollectionResult;
}(ServiceResult);

var Pagination = function Pagination(_ref) {
  var totalDatacount = _ref.totalDatacount,
    datacount = _ref.datacount,
    pageUrl = _ref.pageUrl,
    _ref$pageSize = _ref.pageSize,
    pageSize = _ref$pageSize === void 0 ? 25 : _ref$pageSize,
    onPageSizeChange = _ref.onPageSizeChange,
    pageSizeSelectionText = _ref.pageSizeSelectionText,
    onChange = _ref.onChange,
    pagesTitle = _ref.pagesTitle,
    _ref$visible = _ref.visible,
    visible = _ref$visible === void 0 ? true : _ref$visible,
    _ref$page = _ref.page,
    page = _ref$page === void 0 ? 1 : _ref$page,
    _ref$pageSizes = _ref.pageSizes,
    pageSizes = _ref$pageSizes === void 0 ? [25, 50, 100] : _ref$pageSizes,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? undefined : _ref$theme;
  if (visible === false || datacount <= 0 || totalDatacount <= 0) return /*#__PURE__*/React$1__default.createElement(Fragment, null);
  var Theme = getAppTheme({
    Pagination: theme
  }).Pagination;
  var onPageChange = function onPageChange(e, i) {
    e.preventDefault();
    if (onChange) onChange(e, i);
    return false;
  };
  var onPageSizeChanged = function onPageSizeChanged(e) {
    e.preventDefault();
    if (onPageSizeChange) onPageSizeChange(e, parseInt(e.target.value));
    return false;
  };
  var getPageLink = function getPageLink(i) {
    var url = "";
    if (pageUrl) url = pageUrl;
    if (url) {
      return url;
    }
    return "javascript:void(0)";
  };
  var linkedPageCount = Math.ceil(totalDatacount / pageSize);
  var startIndex = 1;
  var endIndex = linkedPageCount;
  var visiblePagecount = 3;
  if (linkedPageCount >= visiblePagecount) {
    var endIndex = page + 3 > linkedPageCount ? linkedPageCount : page + 3;
    var startIndex = endIndex - visiblePagecount;
    if (startIndex <= 0) {
      startIndex = 1;
      endIndex = visiblePagecount;
    }
  }
  return /*#__PURE__*/React$1__default.createElement("div", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.RootClass
  }, pagesTitle && /*#__PURE__*/React$1__default.createElement("span", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.PagesTitleClass
  }, "Showing ", /*#__PURE__*/React$1__default.createElement("strong", {
    className: "text-blueZodiac"
  }, formatString((datacount >= pageSize ? (page - 2) * pageSize + datacount : (page - 1) * pageSize + datacount) + " - " + ((page - 1) * pageSize + datacount))), " of ", formatString("" + totalDatacount), " results"), /*#__PURE__*/React$1__default.createElement("div", {
    className: "flex items-center gap-6"
  }, startIndex > 1 && /*#__PURE__*/React$1__default.createElement(Link, {
    href: getPageLink(),
    onClick: function onClick(e) {
      return onPageChange(e, 1);
    },
    className: Theme === null || Theme === void 0 ? void 0 : Theme.PageListItemClass
  }, getImageComponent({
    name: "arrow-left",
    color: "#75819E",
    fill: "none",
    size: 16
  }), /*#__PURE__*/React$1__default.createElement("span", null, "Prev")), /*#__PURE__*/React$1__default.createElement("ul", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.PageListClass
  }, loopInRange(startIndex, endIndex, function (i) {
    return /*#__PURE__*/React$1__default.createElement(Link, {
      href: getPageLink(),
      onClick: function onClick(e) {
        return onPageChange(e, i);
      },
      "aria-current": page === i ? "page" : undefined,
      className: page === i ? Theme === null || Theme === void 0 ? void 0 : Theme.PageListItemSelectedClass : Theme === null || Theme === void 0 ? void 0 : Theme.PageListItemClass
    }, i);
  })), endIndex < linkedPageCount && /*#__PURE__*/React$1__default.createElement(Link, {
    href: getPageLink(),
    onClick: function onClick(e) {
      return onPageChange(e, linkedPageCount);
    },
    className: Theme === null || Theme === void 0 ? void 0 : Theme.PageListItemClass
  }, /*#__PURE__*/React$1__default.createElement("span", null, "Next"), getImageComponent({
    name: "arrow-right",
    color: "#75819E",
    fill: "none",
    size: 16
  }))), pageSizes && pageSizes.length > 0 && /*#__PURE__*/React$1__default.createElement("div", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.PageSizeSelectionRootClass
  }, pageSizeSelectionText && /*#__PURE__*/React$1__default.createElement(Label, {
    value: pageSizeSelectionText
  }), /*#__PURE__*/React$1__default.createElement(SelectInput, {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.PageSizeSelectionClass,
    id: "pagesize",
    name: "pagesize",
    value: pageSize.toString(),
    options: pageSizes === null || pageSizes === void 0 ? void 0 : pageSizes.map(function (i) {
      return {
        text: i.toString(),
        value: i.toString()
      };
    }),
    onChange: function onChange(e) {
      return onPageSizeChanged(e);
    }
  })));
};

var Backdrop = function Backdrop(_ref) {
  var _theme$Common;
  var _ref$id = _ref.id,
    id = _ref$id === void 0 ? undefined : _ref$id,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? undefined : _ref$className,
    _ref$visible = _ref.visible,
    visible = _ref$visible === void 0 ? true : _ref$visible;
  var theme = getAppTheme();
  return /*#__PURE__*/React$1__default.createElement(Fragment, null, visible && /*#__PURE__*/React$1__default.createElement("div", {
    id: id,
    className: className != null ? className : (_theme$Common = theme.Common) === null || _theme$Common === void 0 ? void 0 : _theme$Common.Backdrop
  }));
};

var checkMouseInBoundByRef = function checkMouseInBoundByRef(e, ref, callback) {
  if (!ref || !callback || !e) callback(false);
  checkMouseInBound(e, ref.current, callback);
};
var checkMouseInBound = function checkMouseInBound(e, ref, callback) {
  if (!ref || !callback || !e) callback(false);
  var eleBounds = ref.getBoundingClientRect();
  if (!eleBounds) callback(false);
  var inBound = false;
  if (e.clientX >= eleBounds.left && e.clientX <= eleBounds.right) {
    inBound = true;
  } else {
    inBound = false;
  }
  callback(inBound);
};

var Modal = function Modal(_ref) {
  var _theme$Modal, _theme$Modal2, _theme$Modal3, _theme$Modal4, _theme$Modal5, _theme$Modal6, _theme$Modal7, _theme$Modal8, _theme$Modal10;
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? undefined : _ref$className,
    _ref$dismissButtonCla = _ref.dismissButtonClassName,
    dismissButtonClassName = _ref$dismissButtonCla === void 0 ? undefined : _ref$dismissButtonCla,
    _ref$dismissOnBackdro = _ref.dismissOnBackdropClick,
    dismissOnBackdropClick = _ref$dismissOnBackdro === void 0 ? true : _ref$dismissOnBackdro,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? undefined : _ref$id,
    _ref$defaultOpen = _ref.defaultOpen,
    defaultOpen = _ref$defaultOpen === void 0 ? true : _ref$defaultOpen,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? undefined : _ref$title,
    _ref$dismissText = _ref.dismissText,
    dismissText = _ref$dismissText === void 0 ? undefined : _ref$dismissText,
    _ref$onBottomScroll = _ref.onBottomScroll,
    onBottomScroll = _ref$onBottomScroll === void 0 ? undefined : _ref$onBottomScroll,
    _ref$buttons = _ref.buttons,
    buttons = _ref$buttons === void 0 ? [] : _ref$buttons,
    _ref$backdrop = _ref.backdrop,
    backdrop = _ref$backdrop === void 0 ? true : _ref$backdrop,
    children = _ref.children;
  var theme = getAppTheme();
  var ModalRef = React$1__default.createRef();
  var ModalBodyRef = React$1__default.createRef();
  var _useState = React$1.useState(false),
    open = _useState[0],
    setOpen = _useState[1];
  var closeModal = function closeModal(e) {
    e.preventDefault();
    setOpen(false);
    return false;
  };
  var buttonClick = function buttonClick(e, item) {
    e.preventDefault();
    if (item.closeModalOnClick) {
      closeModal(e);
      setOpen(false);
    }
    if (item.onClick) item.onClick(e, item);
    return false;
  };
  var onScrollModalBody = function onScrollModalBody(e) {
    if (ModalBodyRef.current) {
      if (onBottomScroll && ModalBodyRef.current.scrollTop + ModalBodyRef.current.offsetHeight + 20 >= ModalBodyRef.current.scrollHeight) onBottomScroll();
    }
  };
  React$1.useEffect(function () {
    setOpen(defaultOpen || !open);
    var close = function close(e) {
      if (e.key === "Escape") {
        dismissOnBackdropClick && setOpen(false);
      }
    };
    window.addEventListener('keydown', close);
    return function () {
      return window.removeEventListener('keydown', close);
    };
  }, []);
  if (!open) return /*#__PURE__*/React$1__default.createElement(Fragment, null);
  if (!className) className = (_theme$Modal = theme.Modal) === null || _theme$Modal === void 0 ? void 0 : _theme$Modal.Class;
  if (backdrop) className += " z-" + ((_theme$Modal2 = theme.Modal) === null || _theme$Modal2 === void 0 ? void 0 : _theme$Modal2.DefaultZIndex);
  return /*#__PURE__*/React$1__default.createElement(Fragment, null, /*#__PURE__*/React$1__default.createElement("div", {
    id: id,
    className: className + " " + (open ? "" : "hidden"),
    onClick: function onClick(e) {
      checkMouseInBoundByRef(e, ModalRef, function (inside) {
        dismissOnBackdropClick && !inside ? setOpen(false) : undefined;
      });
    }
  }, /*#__PURE__*/React$1__default.createElement("div", {
    className: (_theme$Modal3 = theme.Modal) === null || _theme$Modal3 === void 0 ? void 0 : _theme$Modal3.SubClass
  }, /*#__PURE__*/React$1__default.createElement("div", {
    className: (_theme$Modal4 = theme.Modal) === null || _theme$Modal4 === void 0 ? void 0 : _theme$Modal4.ContainerClass,
    ref: ModalRef
  }, title && /*#__PURE__*/React$1__default.createElement("div", {
    className: (_theme$Modal5 = theme.Modal) === null || _theme$Modal5 === void 0 ? void 0 : _theme$Modal5.HeaderClass
  }, /*#__PURE__*/React$1__default.createElement("h3", {
    className: (_theme$Modal6 = theme.Modal) === null || _theme$Modal6 === void 0 ? void 0 : _theme$Modal6.TitleClass
  }, title)), /*#__PURE__*/React$1__default.createElement("div", {
    className: (_theme$Modal7 = theme.Modal) === null || _theme$Modal7 === void 0 ? void 0 : _theme$Modal7.BodyClass,
    ref: ModalBodyRef,
    onScroll: function onScroll(e) {
      return onScrollModalBody();
    }
  }, children), /*#__PURE__*/React$1__default.createElement("div", {
    className: (_theme$Modal8 = theme.Modal) === null || _theme$Modal8 === void 0 ? void 0 : _theme$Modal8.FooterClass
  }, buttons === null || buttons === void 0 ? void 0 : buttons.map(function (item) {
    var _item$className, _theme$Modal9;
    return /*#__PURE__*/React$1__default.createElement("button", {
      disabled: item.disabled,
      onClick: function onClick(e) {
        return buttonClick(e, item);
      },
      type: "button",
      className: ((_item$className = item.className) != null ? _item$className : (_theme$Modal9 = theme.Modal) === null || _theme$Modal9 === void 0 ? void 0 : _theme$Modal9.ButtonClass) + (item.disabled ? " disabled:opacity-50" : "")
    }, item.text);
  }), dismissText && /*#__PURE__*/React$1__default.createElement("button", {
    "data-modal-hide": id,
    type: "button",
    className: dismissButtonClassName != null ? dismissButtonClassName : (_theme$Modal10 = theme.Modal) === null || _theme$Modal10 === void 0 ? void 0 : _theme$Modal10.ButtonClass,
    onClick: function onClick(e) {
      closeModal(e);
    }
  }, dismissText))))), /*#__PURE__*/React$1__default.createElement(Backdrop, {
    visible: open && backdrop
  }));
};

var CollectionBinderProps = function CollectionBinderProps() {};
var CollectionBinder = /*#__PURE__*/function (_React$Component) {
  function CollectionBinder() {
    var _this;
    _this = _React$Component.apply(this, arguments) || this;
    _this.Config = new Config();
    _this.Options = new BinderOptions();
    _this.DefaultLanguageID = 0;
    _this.i18nProperty = "";
    _this.Theme = getAppTheme();
    _this.RootElementRef = React$1__default.createRef();
    _this.getData = function () {
      try {
        var _exit = false;
        var _temp = function () {
          if (_this.props.data) {
            var _this$props$data;
            var data = new serviceCollectionResult();
            data.data = _this.props.data;
            data.totalDataCount = (_this$props$data = _this.props.data) === null || _this$props$data === void 0 ? void 0 : _this$props$data.length;
            _this.setState({
              loadingState: exports.LoadingState.Loaded
            });
            _exit = true;
            return data;
          } else return function () {
            if (_this.Config.DataSourcePath) {
              _this.setState({
                loadingState: exports.LoadingState.Loading
              });
              return _catch(function () {
                var _this$Config$Table, _this$Config$Table2, _this$props$initialFi, _this$props$AppClient, _this$props$AppClient2;
                var queryData = new QueryData();
                if ((_this$Config$Table = _this.Config.Table) !== null && _this$Config$Table !== void 0 && _this$Config$Table.Columns) queryData.processQuery((_this$Config$Table2 = _this.Config.Table) === null || _this$Config$Table2 === void 0 ? void 0 : _this$Config$Table2.Columns, _this.state.filter, _this.state.sorter);
                var initialFilters = (_this$props$initialFi = _this.props.initialFilters) != null ? _this$props$initialFi : {};
                var postData = {
                  Page: _this.state.page,
                  PageSize: _this.state.pageSize,
                  Data: initialFilters,
                  QueryData: queryData.model
                };
                if (_this.Config.beforeSendRequest) postData = _this.Config.beforeSendRequest(postData);
                return Promise.resolve((_this$props$AppClient = _this.props.AppClient) === null || _this$props$AppClient === void 0 ? void 0 : (_this$props$AppClient2 = _this$props$AppClient.CreateService()) === null || _this$props$AppClient2 === void 0 ? void 0 : _this$props$AppClient2.CreateEndpoint(_this.Config.DataSourcePath, {
                  Payload: postData
                }).call()).then(function (data) {
                  _this.setState({
                    loadingState: exports.LoadingState.Loaded
                  });
                  _exit = true;
                  return data;
                });
              }, function () {
                _this.setState({
                  loadingState: exports.LoadingState.Failed
                });
              });
            }
          }();
        }();
        return Promise.resolve(_temp && _temp.then ? _temp.then(function (_result3) {
          return _exit ? _result3 : undefined;
        }) : _exit ? _temp : undefined);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    _this.getLink = function (record) {
      var _this$Options;
      if (_this.Config.RowClickOption == "showEntityBinder") return "javascript:void(0)";
      if ((_this$Options = _this.Options) !== null && _this$Options !== void 0 && _this$Options.DrawViewLinkInsteadOfEdit) return _this.getViewUrl(record.id);else return _this.getEditUrl(record.id);
    };
    _this.onButtonClicked = function (key) {
      try {
        if (key == "AddNew") {
          _this.setState({
            clickedRowIndex: -1
          });
        }
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
    _this.renderCellValue = function (row, column, value) {
      if (value) {
        return /*#__PURE__*/React$1__default.createElement(Link, {
          href: _this.getLink(row)
        }, value);
      }
      return value;
    };
    return _this;
  }
  _inheritsLoose(CollectionBinder, _React$Component);
  var _proto = CollectionBinder.prototype;
  _proto.Init = function Init() {
    if (this.state && this.state.initialized) return;
    var newConfig = new Config();
    if (this.props.config) newConfig = _extends({}, newConfig, this.props.config);
    this.Config = newConfig;
    if (this.props.options) this.Options = _extends({}, this.Options, this.props.options);
    this.Options.AllowSave = false;
    this.Options.AllowDelete = false;
    if (this.props.pageTitle && !this.Options.PageTitle) this.Options.PageTitle = this.props.pageTitle;
    this.Configure();
    this.ProcessColumns();
    this.setInitData();
  };
  _proto.Configure = function Configure() {};
  _proto.ProcessColumns = function ProcessColumns() {
    var _this2 = this;
    if (this.Config.Table) {
      this.Config.Table.Columns.forEach(function (column) {
        var _this2$props$AppClien;
        if (!column.HeaderText) column.HeaderText = (_this2$props$AppClien = _this2.props.AppClient) === null || _this2$props$AppClien === void 0 ? void 0 : _this2$props$AppClien.Translate(pascalize(removeLastPropName(column.PropertyName, "ID")));
        if (column.AllowFiltering) {
          if (!column.Filtering) column.Filtering = {};
        }
      });
    }
  };
  _proto.SetColumns = function SetColumns(columns) {
    if (this.Config.Table) this.Config.Table.Columns = columns;
  };
  _proto.SetDataSource = function SetDataSource(schema, entity, pluralEntity) {
    if (pluralEntity === void 0) {
      pluralEntity = "";
    }
    this.Config.Entity = entity;
    this.Config.Schema = schema;
    if (!pluralEntity) pluralEntity = Pluralize(entity);
    this.SetDataSourcePath(schema + "/Get" + pluralEntity);
  };
  _proto.SetDataSourcePath = function SetDataSourcePath(path) {
    this.Config.DataSourcePath = path;
  };
  _proto.componentDidMount = function componentDidMount() {
    this.Init();
  };
  _proto.setInitData = function setInitData(firstLoad) {
    var _this$Config, _this$Config$Table3, _this$Config2, _this$Config2$Table, _this$Config2$Table$C;
    if (firstLoad === void 0) {
      firstLoad = false;
    }
    var data = undefined;
    if (firstLoad) data = this.props.data;
    var page = parseInt(getQueryParam("page", 1));
    var pageSize = parseInt(getQueryParam("pageSize", 25));
    var sortBy = getQueryParam("sortBy", "");
    var sortDirection = getQueryParam("sortDirection", "");
    var filters = queryParamsAsObject("Filters.", true);
    var comparisons = queryParamsAsObject("Comp.", true);
    var sortedColumn = (_this$Config = this.Config) === null || _this$Config === void 0 ? void 0 : (_this$Config$Table3 = _this$Config.Table) === null || _this$Config$Table3 === void 0 ? void 0 : _this$Config$Table3.Columns.find(function (column) {
      return column.PropertyName === sortBy;
    });
    if (sortedColumn) {
      sortedColumn.IsSorted = true;
      sortedColumn.SortDirection = sortDirection;
    }
    (_this$Config2 = this.Config) === null || _this$Config2 === void 0 ? void 0 : (_this$Config2$Table = _this$Config2.Table) === null || _this$Config2$Table === void 0 ? void 0 : (_this$Config2$Table$C = _this$Config2$Table.Columns) === null || _this$Config2$Table$C === void 0 ? void 0 : _this$Config2$Table$C.forEach(function (column) {
      if (!column.Filtering) column.Filtering = {};
      if (!column.Filtering.Name) column.Filtering.Name = removeLastPropName(column.PropertyName, "ID", true);
      if (filters) {
        if (filters[column.Filtering.Name]) {
          column.IsFiltered = true;
          column.Filtering.Value = filters[column.Filtering.Name];
          if (comparisons[column.Filtering.Name]) column.Filtering.Comparison = parseInt(comparisons[column.Filtering.Name]);
          return;
        }
      }
      column.IsFiltered = false;
      column.Filtering.Value = undefined;
    });
    this.setState({
      path: Router.asPath,
      clickedRowIndex: -2,
      initialized: true,
      loadingState: data ? exports.LoadingState.Loaded : exports.LoadingState.Waiting,
      page: page,
      pageSize: pageSize,
      filter: filters,
      sorter: {
        name: sortBy,
        ascending: sortDirection === "ASC"
      },
      data: data,
      messages: [],
      languageID: this.DefaultLanguageID
    });
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this3 = this;
    if (this.state.path != Router.asPath || this.state.loadingState == exports.LoadingState.Loaded && !this.state.data) {
      this.setInitData();
    } else if (this.state.loadingState === exports.LoadingState.Waiting) {
      this.getData().then(function (data) {
        if (data && data.data) _this3.setState({
          path: Router.asPath,
          data: data.data,
          totalDatacount: data.totalDataCount,
          messages: data.messages
        });else if (data) _this3.setState({
          path: Router.asPath,
          data: [],
          totalDatacount: 0,
          messages: data.messages
        });
      });
    } else {
      var _this$props$AppClient3;
      if (!this.props.shownInParent) (_this$props$AppClient3 = this.props.AppClient) === null || _this$props$AppClient3 === void 0 ? void 0 : _this$props$AppClient3.UpdateMetaTags();
    }
  };
  _proto.setMetaTags = function setMetaTags(data) {
    if (!this.state.data || !this.props.AppClient || !this.Config.Entity) return;
    if (!this.props.AppClient.DynamicSEO) {
      this.props.AppClient.DynamicSEO = {};
    }
    if (!this.props.AppClient.DynamicSEO.Title) this.props.AppClient.DynamicSEO.Title = Pluralize(this.Config.Entity);
    if (!this.Options.PageTitle) this.Options.PageTitle = this.props.AppClient.DynamicSEO.Title;
    if (!this.Options.PageTitle) this.Options.PageTitle = this.props.AppClient.Translate(this.Config.Entity + "List");
  };
  _proto.CreateService = function CreateService() {
    var _this$props$AppClient4;
    return (_this$props$AppClient4 = this.props.AppClient) === null || _this$props$AppClient4 === void 0 ? void 0 : _this$props$AppClient4.CreateService();
  };
  _proto.OnBeforeRender = function OnBeforeRender() {};
  _proto.getEditUrl = function getEditUrl(id) {
    var _this$Options2;
    if (id === void 0) {
      id = 0;
    }
    if ((_this$Options2 = this.Options) !== null && _this$Options2 !== void 0 && _this$Options2.EditURL) return formatString(this.Options.EditURL, id);
    return "/" + this.Config.Schema + "/edit" + this.Config.Entity + "/" + id;
  };
  _proto.getExportFileName = function getExportFileName() {
    var _this$Options$PageTit;
    return (_this$Options$PageTit = this.Options.PageTitle) != null ? _this$Options$PageTit : "File";
  };
  _proto.onExportButtonClicked = function onExportButtonClicked(option) {
    try {
      var _this4 = this;
      var _temp4 = function () {
        if (_this4.RootElementRef.current) {
          var _temp3 = function () {
            if (_this4.Options.ExportMode == "screenshot") {
              if (option.extension == "pdf") {
                var exporter = new PDFExporter();
                exporter.HtmlElement = _this4.RootElementRef.current;
                exporter.FileName = _this4.getExportFileName() + "." + option.extension;
                exporter.Export();
              } else if (option.extension == "xls") {
                var xlsExporter = new ExcelExporter();
                xlsExporter.FileName = _this4.getExportFileName() + "." + option.extension;
                xlsExporter.HtmlElement = _this4.RootElementRef.current;
                xlsExporter.Export();
              }
            } else {
              var _temp5 = function () {
                if (_this4.Options.ExportMode == "remote" && _this4.Options.ExportCallback) {
                  return Promise.resolve(_this4.Options.ExportCallback(option)).then(function (dataArray) {
                    if (dataArray) {
                      var type = resolveMimeType(option.extension);
                      if (typeof type == "string") {
                        var blob = new Blob([dataArray], {
                          type: type
                        });
                        var url = URL.createObjectURL(blob);
                        window.open(url);
                      }
                    }
                  });
                }
              }();
              if (_temp5 && _temp5.then) return _temp5.then(function () {});
            }
          }();
          if (_temp3 && _temp3.then) return _temp3.then(function () {});
        }
      }();
      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.getViewUrl = function getViewUrl(id) {
    var _this$Options3;
    if (id === void 0) {
      id = 0;
    }
    if ((_this$Options3 = this.Options) !== null && _this$Options3 !== void 0 && _this$Options3.ViewURL) return formatString(this.Options.ViewURL, id);
    return "/" + this.Config.Schema + "/view" + this.Config.Entity + "/" + id;
  };
  _proto.getBackUrl = function getBackUrl() {
    var _this$Options4;
    if ((_this$Options4 = this.Options) !== null && _this$Options4 !== void 0 && _this$Options4.BackURL) {
      return this.Options.BackURL;
    }
    return "/";
  };
  _proto.onCellValueChanged = function onCellValueChanged(row, column) {
    this.SaveEntity(row);
  };
  _proto.SaveEntity = function SaveEntity(data) {
    try {
      var _this5 = this;
      var postData = {
        Data: data,
        languageID: _this5.state.languageID
      };
      return Promise.resolve(_catch(function () {
        var _this5$CreateService;
        return Promise.resolve((_this5$CreateService = _this5.CreateService()) === null || _this5$CreateService === void 0 ? void 0 : _this5$CreateService.CreateEndpoint(_this5.Config.Schema + "/update" + _this5.Config.Entity, {
          Payload: postData
        }).call()).then(function (result) {
          if (result === undefined) return;
          if (!result.hasFailed) {
            var _this5$props$AppClien, _this5$props$AppClien2;
            raiseCustomEvent("notification", {
              type: "info",
              title: (_this5$props$AppClien = _this5.props.AppClient) === null || _this5$props$AppClien === void 0 ? void 0 : _this5$props$AppClien.Translate("Info"),
              description: (_this5$props$AppClien2 = _this5.props.AppClient) === null || _this5$props$AppClien2 === void 0 ? void 0 : _this5$props$AppClien2.Translate("EntitySavedSuccessfully")
            });
          } else {
            var _this5$props$AppClien3, _this5$props$AppClien4;
            raiseCustomEvent("notification", {
              type: "error",
              title: (_this5$props$AppClien3 = _this5.props.AppClient) === null || _this5$props$AppClien3 === void 0 ? void 0 : _this5$props$AppClien3.Translate("Error"),
              description: (_this5$props$AppClien4 = _this5.props.AppClient) === null || _this5$props$AppClien4 === void 0 ? void 0 : _this5$props$AppClien4.Translate("EntityCouldNotBeSaved")
            });
          }
        });
      }, function () {}));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.onCellClick = function onCellClick(e, row, column, rowIndex, columnIndex) {
    if (column.AllowEditing != true && this.Config.RowClickOption == "showEntityBinder") {
      e.preventDefault();
      this.setState({
        clickedRowIndex: rowIndex
      });
    }
  };
  _proto.onRowClick = function onRowClick(e, index) {};
  _proto.renderEntityBinder = function renderEntityBinder(entity) {
    return /*#__PURE__*/React$1__default.createElement(Fragment, null);
  };
  _proto.onChildAction = function onChildAction(type) {
    if (type == "back") {
      this.setState({
        clickedRowIndex: -2
      });
    } else if (type == "refreshData") {
      this.setState({
        clickedRowIndex: -2,
        loadingState: exports.LoadingState.Waiting
      });
    }
  };
  _proto.onPageChange = function onPageChange(i) {
    Router.push("", replaceQueryParam("page", i.toString()), {
      shallow: true
    });
  };
  _proto.onPageSizeChange = function onPageSizeChange(i) {
    Router.push("", replaceQueryParam("pageSize", i.toString()), {
      shallow: true
    });
  };
  _proto.onSortingChanged = function onSortingChanged(column, direction) {
    if (column.PropertyName) {
      Router.push("", replaceQueryParam("sortDirection", direction, replaceQueryParam("sortBy", column.PropertyName)), {
        shallow: true
      });
    }
  };
  _proto.onFilteringChanged = function onFilteringChanged(filteredColumns) {
    var filters = {};
    var url = "";
    filteredColumns.forEach(function (column) {
      var _column$Filtering, _column$Filtering2;
      if (!column.Filtering) return;
      if (!((_column$Filtering = column.Filtering) !== null && _column$Filtering !== void 0 && _column$Filtering.Value) || column.Filtering.Value == "") column.Filtering.Value = undefined;
      if ((_column$Filtering2 = column.Filtering) !== null && _column$Filtering2 !== void 0 && _column$Filtering2.Name) {
        setObjectValue(filters, column.Filtering.Name, column.Filtering.Value);
        url = replaceQueryParam("Filters." + column.Filtering.Name, column.Filtering.Value, url);
        if (column.IsFiltered === true) {
          if (column.Filtering.Comparison || column.Filtering.Comparison == 0) url = replaceQueryParam("Comp." + column.Filtering.Name, column.Filtering.Comparison.toString(), url);
        } else {
          url = replaceQueryParam("Comp." + column.Filtering.Name, "", url);
        }
      }
    });
    Router.push("", url, {
      shallow: true
    });
  };
  _proto.renderHeader = function renderHeader() {
    return /*#__PURE__*/React$1__default.createElement(Fragment, null);
  };
  _proto.renderFooter = function renderFooter() {
    return /*#__PURE__*/React$1__default.createElement(Fragment, null);
  };
  _proto.render = function render() {
    var _this$Theme$Binders,
      _this$Theme$Binders$S,
      _this$props$AppClient5,
      _this$props$AppClient6,
      _this6 = this;
    if (!this.Config.Table || !this.state || !this.state.data) return /*#__PURE__*/React$1__default.createElement(Fragment, null);
    this.setMetaTags(this.state.data);
    this.OnBeforeRender();
    return /*#__PURE__*/React$1__default.createElement(Fragment, null, this.renderHeader(), this.state.clickedRowIndex > -2 && this.Config.RowClickOption == "showEntityBinder" && /*#__PURE__*/React$1__default.createElement(Modal, {
      className: (_this$Theme$Binders = this.Theme.Binders) === null || _this$Theme$Binders === void 0 ? void 0 : (_this$Theme$Binders$S = _this$Theme$Binders.SubBinderModal) === null || _this$Theme$Binders$S === void 0 ? void 0 : _this$Theme$Binders$S.Class,
      key: this.state.clickedRowIndex,
      dismissOnBackdropClick: true,
      defaultOpen: true
    }, this.state.clickedRowIndex >= 0 && this.renderEntityBinder(this.state.data[this.state.clickedRowIndex]), this.state.clickedRowIndex == -1 && this.renderEntityBinder({
      id: 0
    })), /*#__PURE__*/React$1__default.createElement("div", {
      className: "collection-binder"
    }, /*#__PURE__*/React$1__default.createElement("div", {
      ref: this.RootElementRef
    }, /*#__PURE__*/React$1__default.createElement(Table, {
      appClient: this.props.AppClient,
      table: this.Config.Table,
      data: this.state.data,
      listener: this
    })), /*#__PURE__*/React$1__default.createElement(Pagination, {
      pagesTitle: (_this$props$AppClient5 = this.props.AppClient) === null || _this$props$AppClient5 === void 0 ? void 0 : _this$props$AppClient5.Translate("{0}/{1}"),
      pageSizeSelectionText: (_this$props$AppClient6 = this.props.AppClient) === null || _this$props$AppClient6 === void 0 ? void 0 : _this$props$AppClient6.Translate("Results per page"),
      pageUrl: "",
      totalDatacount: this.state.totalDatacount,
      datacount: this.state.data.length,
      pageSize: this.state.pageSize,
      page: this.state.page,
      onChange: function onChange(e, i) {
        return _this6.onPageChange(i);
      },
      onPageSizeChange: function onPageSizeChange(e, i) {
        return _this6.onPageSizeChange(i);
      }
    })), this.renderFooter());
  };
  return CollectionBinder;
}(React$1__default.Component);

var QuerySorter = function QuerySorter() {
  this.name = "";
  this.ascending = true;
};

var ClientBarcodeReader = /*#__PURE__*/function () {
  function ClientBarcodeReader(videoElement) {
    var _this = this;
    this.Detect = function () {
      try {
        if (!_this.VideoElement || !_this.VideoElement.current) return Promise.resolve();
        var hints = new Map();
        var enabledFormats = [library.BarcodeFormat.UPC_A, library.BarcodeFormat.CODE_39, library.BarcodeFormat.CODE_93, library.BarcodeFormat.EAN_13, library.BarcodeFormat.EAN_8, library.BarcodeFormat.CODE_128];
        hints.set(library.DecodeHintType.POSSIBLE_FORMATS, enabledFormats);
        _this.Reader = new library.BrowserMultiFormatReader(hints);
        _this.Reader.decodeFromConstraints({
          audio: false,
          video: true
        }, _this.VideoElement.current, function (result, error) {
          if (result) _this.OnResult(result);
        })["catch"](function (error) {
          _this.OnError(error);
        });
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
    if (videoElement) this.VideoElement = videoElement;
  }
  var _proto = ClientBarcodeReader.prototype;
  _proto.OnError = function OnError(error) {
    if (this.onError) this.onError(error);
    this.Destroy();
    console.log("ClientBarcodeReader:OnError", error.name);
  };
  _proto.OnResult = function OnResult(result) {
    if (this.onResult && result) this.onResult(result.getText(), result.getBarcodeFormat());
    if (this.onResult && !result) this.onResult("", 0);
    this.Destroy();
    console.log("ClientBarcodeReader:OnResult", result);
  };
  _proto.OnCancel = function OnCancel() {
    this.OnResult(undefined);
    this.Destroy();
  };
  _proto.Destroy = function Destroy() {
    var _this$Reader;
    (_this$Reader = this.Reader) === null || _this$Reader === void 0 ? void 0 : _this$Reader.reset();
    this.Reader = undefined;
  };
  return ClientBarcodeReader;
}();

var SpeechRecognizer = /*#__PURE__*/function () {
  function SpeechRecognizer() {
    this.Language = "tr-TR";
  }
  var _proto = SpeechRecognizer.prototype;
  _proto.Init = function Init() {
    var _this = this;
    if (!speechRecognitionSupported()) return;
    var tmpWindow = window;
    var cons = tmpWindow.SpeechRecognition || tmpWindow.webkitSpeechRecognition;
    var cons2 = tmpWindow.SpeechGrammarList || tmpWindow.webkitSpeechGrammarList;
    if (!cons2 || !cons) return;
    this.SpeechRecognition = new cons();
    this.SpeechGrammarList = new cons2();
    this.SpeechRecognition.grammars = this.SpeechGrammarList;
    this.SpeechRecognition.continuous = false;
    this.SpeechRecognition.lang = this.Language;
    this.SpeechRecognition.interimResults = false;
    this.SpeechRecognition.maxAlternatives = 1;
    this.SpeechRecognition.onresult = function (event) {
      console.log("SpeechRecognition:OnResult", event);
      if (event.results && event.results.length > 0 && event.results[0].length > 0) _this.OnResult && _this.OnResult(event.results[0][0].transcript);
    };
    this.SpeechRecognition.onnomatch = function (event) {
      console.log("SpeechRecognition:onnomatch", event);
    };
    this.SpeechRecognition.onspeechend = function () {
      _this.SpeechRecognition.stop();
    };
    this.SpeechRecognition.onerror = function (event) {
      console.log("SpeechRecognition:onerror", event);
    };
  };
  _proto.Start = function Start() {
    if (!this.SpeechRecognition) return;
    this.SpeechRecognition.start();
  };
  _proto.Stop = function Stop() {
    if (!this.SpeechRecognition) return;
    this.SpeechRecognition.stop();
  };
  return SpeechRecognizer;
}();
var speechRecognitionSupported = function speechRecognitionSupported() {
  var tmpWindow = global.window;
  if (!tmpWindow) return true;
  if (!(tmpWindow.SpeechRecognition || tmpWindow.webkitSpeechRecognition)) return false;
  if (!(tmpWindow.SpeechGrammarList || tmpWindow.webkitSpeechGrammarList)) return false;
  return true;
};

var useMediaQuery = function useMediaQuery(breakpoint) {
  var _React$useState = React$1__default.useState(!!breakpoint && window.matchMedia(breakpoint).matches),
    matches = _React$useState[0],
    setMatches = _React$useState[1];
  React$1__default.useEffect(function () {
    if (breakpoint) {
      var media = window.matchMedia(breakpoint);
      var handleMatch = function handleMatch() {
        if (media.matches !== matches) {
          setMatches(media.matches);
        }
      };
      handleMatch();
      media.addEventListener('change', handleMatch);
      return function () {
        return media.removeEventListener('change', handleMatch);
      };
    }
    return undefined;
  }, [matches, breakpoint]);
  return matches;
};

var MediaListener = function MediaListener() {};

var VideoPlayerProps = function VideoPlayerProps() {
  this.preload = "auto";
};
var VideoPlayerListener = function VideoPlayerListener() {};

var useEndpointSWRCallback = function useEndpointSWRCallback(endpoint) {
  return useSWR(endpoint.URL, React$1.useCallback(function () {
    return endpoint.call();
  }, [endpoint]));
};
var useEndpointSWR = function useEndpointSWR(endpoint) {
  return useSWR(endpoint.URL, function () {
    return endpoint.call();
  });
};

var getLocalstorage = function getLocalstorage(propName) {
  if (!global.localStorage) return null;
  var getData = localStorage.getItem(propName);
  if (getData) {
    try {
      return JSON.parse(getData);
    } catch (e) {
      console.warn("getLocalstorage JSon parse edemedi.", e);
    }
  }
  return null;
};
var setLocalstorage = function setLocalstorage(propName, data) {
  if (!global.localStorage) return null;
  localStorage.setItem(propName, JSON.stringify(data));
  return undefined;
};
var removeLocalstorage = function removeLocalstorage(propName) {
  if (!global.localStorage) return null;
  localStorage.removeItem(propName);
  return undefined;
};

var Indicator = function Indicator(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? undefined : _ref$className,
    _ref$count = _ref.count,
    count = _ref$count === void 0 ? 0 : _ref$count,
    _ref$rootClassName = _ref.rootClassName,
    rootClassName = _ref$rootClassName === void 0 ? undefined : _ref$rootClassName,
    _ref$iconClassName = _ref.iconClassName,
    iconClassName = _ref$iconClassName === void 0 ? undefined : _ref$iconClassName,
    _ref$selectedClassNam = _ref.selectedClassName,
    selectedClassName = _ref$selectedClassNam === void 0 ? undefined : _ref$selectedClassNam,
    _ref$selectedIconClas = _ref.selectedIconClassName,
    selectedIconClassName = _ref$selectedIconClas === void 0 ? undefined : _ref$selectedIconClas,
    _ref$activeIndex = _ref.activeIndex,
    activeIndex = _ref$activeIndex === void 0 ? 0 : _ref$activeIndex,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? undefined : _ref$onChange,
    _ref$visible = _ref.visible,
    visible = _ref$visible === void 0 ? true : _ref$visible,
    _ref$items = _ref.items,
    items = _ref$items === void 0 ? [] : _ref$items;
  var theme = getAppTheme();
  var _useState = React$1.useState(0),
    selectedIndex = _useState[0],
    setSelectedIndex = _useState[1];
  var selectedIndexChanged = function selectedIndexChanged(i) {
    setSelectedIndex(i);
    if (onChange) onChange(i);
  };
  React$1.useEffect(function () {
    setSelectedIndex(activeIndex);
  }, [activeIndex, count, items]);
  if (!visible) return /*#__PURE__*/React$1__default.createElement(Fragment, null);
  if (!rootClassName) rootClassName = "flex center-content";
  if (!className) className = "flex items-center text-sm font-medium text-gray-900 dark:text-white me-3";
  if (!iconClassName) iconClassName = "flex w-3 h-3 me-3 bg-teal-500 rounded-full";
  if (!selectedClassName) selectedClassName = className;
  if (!selectedIconClassName) selectedIconClassName = "flex w-3 h-3 me-3 bg-yellow-300 rounded-full";
  if (count > 0) {
    return /*#__PURE__*/React$1__default.createElement("div", {
      className: rootClassName
    }, loopInRange(0, count - 1, function (i) {
      return /*#__PURE__*/React$1__default.createElement("span", {
        className: selectedIndex == i ? selectedClassName : className,
        onClick: function onClick() {
          return selectedIndexChanged(i);
        }
      }, /*#__PURE__*/React$1__default.createElement("span", {
        className: selectedIndex == i ? selectedIconClassName : iconClassName
      }));
    }));
  }
  if (items && items.length > 0) {
    return /*#__PURE__*/React$1__default.createElement("div", {
      className: rootClassName
    }, items.map(function (item, i) {
      var _item$selectedClassNa, _item$className, _item$selectedIconCla, _item$iconClassName;
      return /*#__PURE__*/React$1__default.createElement("div", {
        key: i,
        className: selectedIndex == i ? (_item$selectedClassNa = item.selectedClassName) != null ? _item$selectedClassNa : selectedClassName : (_item$className = item.className) != null ? _item$className : className,
        onClick: function onClick() {
          return selectedIndexChanged(i);
        }
      }, /*#__PURE__*/React$1__default.createElement("span", {
        className: selectedIndex == i ? (_item$selectedIconCla = item.selectedIconClassName) != null ? _item$selectedIconCla : selectedIconClassName : (_item$iconClassName = item.iconClassName) != null ? _item$iconClassName : iconClassName
      }), item.text != undefined && item.text, item.component && typeof item.component == "function" && item.component(selectedIndex == i), item.component && typeof item.component != "function" && item.component);
    }));
  }
  return /*#__PURE__*/React$1__default.createElement(Fragment, null);
};

var Carousel = React$1__default.memo(function (_ref) {
  var data = _ref.data,
    visible = _ref.visible,
    iconLeft = _ref.iconLeft,
    iconRight = _ref.iconRight,
    selectedIndex = _ref.selectedIndex,
    arrowPosition = _ref.arrowPosition,
    _ref$slidesToShow = _ref.slidesToShow,
    slidesToShow = _ref$slidesToShow === void 0 ? 1 : _ref$slidesToShow,
    _ref$autoplay = _ref.autoplay,
    autoplay = _ref$autoplay === void 0 ? false : _ref$autoplay,
    _ref$autoplayInterval = _ref.autoplayInterval,
    autoplayInterval = _ref$autoplayInterval === void 0 ? 2000 : _ref$autoplayInterval,
    _ref$gap = _ref.gap,
    gap = _ref$gap === void 0 ? 12 : _ref$gap,
    _ref$loop = _ref.loop,
    loop = _ref$loop === void 0 ? false : _ref$loop,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? undefined : _ref$theme;
  var _useState = React$1.useState(data != null ? data : []),
    slider = _useState[0];
  var _useState2 = React$1.useState(selectedIndex != null ? selectedIndex : 0),
    activeIndex = _useState2[0],
    setActiveIndex = _useState2[1];
  var Theme = getAppTheme({
    Carousel: theme
  }).Carousel;
  var timerRef = React$1.useRef(null);
  React$1.useEffect(function () {
    handleAutoPlay();
  }, [autoplay, autoplayInterval, activeIndex, slider]);
  React$1.useEffect(function () {
    handleLoop();
  }, [autoplayInterval, autoplay, activeIndex, slider]);
  var handleAutoPlay = function handleAutoPlay() {
    if (autoplay) {
      if (timerRef.current !== null) clearInterval(timerRef.current);
      timerRef.current = setInterval(nextSlide, autoplayInterval);
    }
  };
  var handleLoop = function handleLoop() {
    if (loop && activeIndex === slider.length - 1 && autoplay) {
      var timeout = setTimeout(function () {
        setActiveIndex(0);
      }, autoplayInterval);
      return function () {
        return clearTimeout(timeout);
      };
    }
    return undefined;
  };
  if (!iconLeft) {
    iconLeft = /*#__PURE__*/React$1__default.createElement("svg", {
      className: "w-4 h-4 dark:text-gray-800 rtl:rotate-180",
      "aria-hidden": "true",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 6 10"
    }, /*#__PURE__*/React$1__default.createElement("path", {
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M5 1 1 5l4 4"
    }));
  }
  if (!iconRight) {
    iconRight = /*#__PURE__*/React$1__default.createElement("svg", {
      className: "w-4 h-4 dark:text-gray-800 rtl:rotate-90",
      "aria-hidden": "true",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 6 10"
    }, /*#__PURE__*/React$1__default.createElement("path", {
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "m1 9 4-4-4-4"
    }));
  }
  var prevSlide = function prevSlide() {
    var index = (activeIndex - slidesToShow + slider.length) % slider.length;
    setActiveIndex(index);
  };
  var nextSlide = function nextSlide() {
    var index = (activeIndex + slidesToShow) % slider.length;
    setActiveIndex(index);
  };
  if (!visible) return /*#__PURE__*/React$1__default.createElement(Fragment, null);
  return /*#__PURE__*/React$1__default.createElement("div", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.Class
  }, /*#__PURE__*/React$1__default.createElement("div", {
    className: "relative overflow-hidden rounded-lg"
  }, /*#__PURE__*/React$1__default.createElement("div", {
    className: "flex animate-fade gap-" + gap,
    style: {
      gap: gap + "px"
    }
  }, slider.map(function (item, index) {
    return /*#__PURE__*/React$1__default.createElement("div", {
      key: index,
      className: "duration-700 ease-in-out  " + (index >= activeIndex && index < activeIndex + slidesToShow ? '' : 'hidden'),
      style: {
        flexBasis: 100 / slidesToShow + "%"
      }
    }, getImageComponent(item.image, {
      className: "h-full w-full"
    }), item.component);
  }))), /*#__PURE__*/React$1__default.createElement("button", {
    type: "button",
    onClick: nextSlide,
    className: (Theme === null || Theme === void 0 ? void 0 : Theme.LeftButtonClass) + " " + arrowPosition
  }, getImageComponent(iconLeft)), /*#__PURE__*/React$1__default.createElement("button", {
    type: "button",
    onClick: prevSlide,
    className: (Theme === null || Theme === void 0 ? void 0 : Theme.RightButtonClass) + " " + arrowPosition
  }, getImageComponent(iconRight)), /*#__PURE__*/React$1__default.createElement(Indicator, {
    rootClassName: Theme === null || Theme === void 0 ? void 0 : Theme.IndicatorClass,
    activeIndex: activeIndex / slidesToShow,
    count: Math.ceil(slider.length / slidesToShow),
    onChange: function onChange(i) {
      return setActiveIndex(i * slidesToShow);
    }
  }));
});

var Footer = React$1__default.memo(function (_ref) {
  var visible = _ref.visible,
    logo = _ref.logo,
    menuItems = _ref.menuItems,
    contactInformation = _ref.contactInformation,
    socialMediaLinks = _ref.socialMediaLinks,
    languageOptions = _ref.languageOptions,
    brandInfo = _ref.brandInfo,
    children = _ref.children,
    siteMapUrl = _ref.siteMapUrl,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "container p-20 text-black" : _ref$className,
    _ref$layoutClassName = _ref.layoutClassName,
    layoutClassName = _ref$layoutClassName === void 0 ? "container grid grid-cols-3 gap-4 grid-flow-row grid-" : _ref$layoutClassName,
    _ref$menuContainerCla = _ref.menuContainerClass,
    menuContainerClass = _ref$menuContainerCla === void 0 ? "flex flex-row gap-4 justify-between" : _ref$menuContainerCla,
    _ref$socialLinksClass = _ref.socialLinksClass,
    socialLinksClass = _ref$socialLinksClass === void 0 ? "gap-4 flex-col" : _ref$socialLinksClass,
    _ref$bgColor = _ref.bgColor,
    bgColor = _ref$bgColor === void 0 ? "bg-white" : _ref$bgColor,
    bgTop = _ref.bgTop,
    bgBottom = _ref.bgBottom,
    bg = _ref.bg,
    _ref$sticky = _ref.sticky,
    sticky = _ref$sticky === void 0 ? "relative" : _ref$sticky;
  var theme = getAppTheme();
  var getFooter = function getFooter() {
    return /*#__PURE__*/React$1__default.createElement("div", {
      className: "" + layoutClassName
    }, /*#__PURE__*/React$1__default.createElement("div", {
      className: "row-start-1 gap-4"
    }, logo, contactInformation), /*#__PURE__*/React$1__default.createElement("div", {
      className: "" + menuContainerClass
    }, menuItems === null || menuItems === void 0 ? void 0 : menuItems.map(function (item, index) {
      var _item$item;
      return /*#__PURE__*/React$1__default.createElement("div", null, /*#__PURE__*/React$1__default.createElement("label", null, item === null || item === void 0 ? void 0 : item.name), /*#__PURE__*/React$1__default.createElement("div", {
        className: "grid grid-cols-1"
      }, item === null || item === void 0 ? void 0 : (_item$item = item.item) === null || _item$item === void 0 ? void 0 : _item$item.map(function (el, _) {
        return /*#__PURE__*/React$1__default.createElement("a", {
          href: ""
        }, el === null || el === void 0 ? void 0 : el.name);
      })));
    })), /*#__PURE__*/React$1__default.createElement("div", {
      className: "" + socialLinksClass
    }, languageOptions, /*#__PURE__*/React$1__default.createElement("div", {
      className: "grid grid-cols-2"
    }, socialMediaLinks === null || socialMediaLinks === void 0 ? void 0 : socialMediaLinks.map(function (item, index) {
      return item.component;
    }))));
  };
  if (!visible) return /*#__PURE__*/React$1__default.createElement(Fragment, null);
  return /*#__PURE__*/React$1__default.createElement("footer", {
    className: bgColor + " " + className + " " + sticky + " border-t-1 shadow-inner"
  }, bg, " ", bgTop, " ", bgBottom, children ? children : getFooter(), brandInfo && brandInfo, siteMapUrl && siteMapUrl);
});

var ColorPalette = ["#FF9800", "#8E7AB5", "#90D26D", "#B784B7", "#D9EDBF", "#FFAF45", "#FB6D48", "#94A684"];

var Grid = React$1__default.memo(function (_ref) {
  var _theme$Grid, _theme$Grid2, _theme$Grid3, _theme$Grid4;
  var className = _ref.className,
    children = _ref.children;
  var theme = getAppTheme();
  return /*#__PURE__*/React$1__default.createElement(Fragment, null, /*#__PURE__*/React$1__default.createElement("div", {
    className: (_theme$Grid = theme.Grid) === null || _theme$Grid === void 0 ? void 0 : _theme$Grid.ContainerClass
  }, /*#__PURE__*/React$1__default.createElement("div", {
    className: (_theme$Grid2 = theme.Grid) === null || _theme$Grid2 === void 0 ? void 0 : _theme$Grid2.TopScrollClass
  }, /*#__PURE__*/React$1__default.createElement("div", {
    className: (_theme$Grid3 = theme.Grid) === null || _theme$Grid3 === void 0 ? void 0 : _theme$Grid3.TopScrollbarClass
  })), /*#__PURE__*/React$1__default.createElement("div", {
    className: className != null ? className : (_theme$Grid4 = theme.Grid) === null || _theme$Grid4 === void 0 ? void 0 : _theme$Grid4.Class
  }, children)));
});

var Icon = function Icon(_ref) {
  var name = _ref.name,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? "#fff" : _ref$color,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? undefined : _ref$fill,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 24 : _ref$size,
    className = _ref.className,
    ext1 = _ref.ext1,
    ext2 = _ref.ext2,
    ext3 = _ref.ext3;
  return getImageComponent(name, {
    color: color,
    fill: fill,
    size: size,
    className: className,
    ext1: ext1,
    ext2: ext2,
    ext3: ext3
  });
};

var MenuItem = React$1__default.memo(function (_ref) {
  var _ref2, _item$SubItems, _item$SubItems2, _theme$Levels, _menu$ItemClassConfig2;
  var selected = _ref.selected,
    menu = _ref.menu,
    id = _ref.id,
    item = _ref.item,
    stateKey = _ref.stateKey,
    setMenuCollapsed = _ref.setMenuCollapsed,
    menuCollapsed = _ref.menuCollapsed,
    listener = _ref.listener,
    children = _ref.children,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? undefined : _ref$theme;
  selected = selected && item.Selected;
  var _useState = React$1.useState(selected),
    collapsed = _useState[0],
    setCollapsed = _useState[1];
  var onClick = function onClick() {
    if (!item.Selected) listener === null || listener === void 0 ? void 0 : listener.onSelect([item]);
    setCollapsed(!collapsed);
  };
  var childEventListener = {
    onSelect: function onSelect(subItems) {
      listener === null || listener === void 0 ? void 0 : listener.onSelect([item].concat(subItems));
    },
    onRightIconClick: function onRightIconClick(subItem) {},
    onLeftIconClick: function onLeftIconClick(subItem) {}
  };
  if (!item) return /*#__PURE__*/React$1__default.createElement("li", null);
  var visible = (_ref2 = item.Visible !== false) != null ? _ref2 : false;
  if (menu.ItemVisiblityFn) visible = menu.ItemVisiblityFn(menu, item);
  if (visible !== true) return /*#__PURE__*/React$1__default.createElement(Fragment, null);
  if (menu.SearchInProgress === true && item.SearchVisiblity !== true) return /*#__PURE__*/React$1__default.createElement(Fragment, null);
  if (item.Component) {
    var _menu$ItemClassConfig;
    var component = item.Component;
    if (typeof component == "function") component = component(menuCollapsed === true, menu);
    return /*#__PURE__*/React$1__default.createElement("div", {
      key: id,
      className: item.ClassName || ((_menu$ItemClassConfig = menu.ItemClassConfig) === null || _menu$ItemClassConfig === void 0 ? void 0 : _menu$ItemClassConfig.className),
      "data-rtl": item.RTL || menu.RTL
    }, component);
  }
  var LeftIconComponent = getImageComponent(item.LeftIcon, {
    className: item.IconClassName
  }, selected);
  var RightIconComponent = getImageComponent(item.RightIcon, {
    className: item.IconClassName
  }, selected);
  if (item.SubItems && ((_item$SubItems = item.SubItems) === null || _item$SubItems === void 0 ? void 0 : _item$SubItems.length) > 0 && !item.RightIcon) {
    var _item$RightIcon;
    RightIconComponent = getImageComponent((_item$RightIcon = item.RightIcon) != null ? _item$RightIcon : {
      name: "arrow-down",
      color: selected ? "#fff" : "#A6A5E3",
      fill: "none",
      size: 16
    }, {
      className: item.IconClassName
    }, selected);
  }
  var subMenuItems = (_item$SubItems2 = item.SubItems) === null || _item$SubItems2 === void 0 ? void 0 : _item$SubItems2.map(function (subItem, i) {
    var _item$Level;
    subItem.Level = ((_item$Level = item.Level) != null ? _item$Level : 0) + 1;
    return /*#__PURE__*/React$1__default.createElement(MenuItem, {
      key: i,
      id: i.toString(),
      menu: menu,
      item: subItem,
      listener: childEventListener,
      stateKey: stateKey,
      selected: selected,
      setMenuCollapsed: setMenuCollapsed,
      menuCollapsed: menuCollapsed
    });
  });
  var className = "flex items-center justify-between py-4 text-lavenderBlue hover:text-white";
  if (selected && item.Level && theme !== null && theme !== void 0 && (_theme$Levels = theme.Levels) !== null && _theme$Levels !== void 0 && _theme$Levels.Selected) {
    var _theme$Levels2;
    var tmpClassName = theme === null || theme === void 0 ? void 0 : (_theme$Levels2 = theme.Levels) === null || _theme$Levels2 === void 0 ? void 0 : _theme$Levels2.Selected[item.Level.toString()];
    if (tmpClassName) className = tmpClassName;
  }
  if (menuCollapsed) {
    return /*#__PURE__*/React$1__default.createElement("div", {
      className: "mb-5 cursor-pointer",
      onClick: function onClick() {
        setMenuCollapsed && setMenuCollapsed(false), listener === null || listener === void 0 ? void 0 : listener.onSelect([item]);
      }
    }, LeftIconComponent);
  }
  return /*#__PURE__*/React$1__default.createElement("div", {
    key: id,
    className: item.ClassName || ((_menu$ItemClassConfig2 = menu.ItemClassConfig) === null || _menu$ItemClassConfig2 === void 0 ? void 0 : _menu$ItemClassConfig2.className),
    "data-rtl": item.RTL || menu.RTL
  }, /*#__PURE__*/React$1__default.createElement(Link, {
    key: "item-link",
    className: className,
    href: item.Location || "",
    onClick: onClick
  }, /*#__PURE__*/React$1__default.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React$1__default.createElement("div", null, LeftIconComponent), item.Text), RightIconComponent), collapsed && selected && subMenuItems && /*#__PURE__*/React$1__default.createElement("div", {
    className: "" + menu.SubMenuClassName
  }, subMenuItems), children);
});

var Menu = React$1__default.memo(function (_ref) {
  var _menu$ClassName, _menu$Items;
  var menu = _ref.menu,
    stateKey = _ref.stateKey,
    id = _ref.id,
    searchKey = _ref.searchKey,
    children = _ref.children,
    setMenuCollapsed = _ref.setMenuCollapsed,
    menuCollapsed = _ref.menuCollapsed,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? undefined : _ref$theme;
  if (!menu) return /*#__PURE__*/React$1__default.createElement("ul", null);
  var Theme = getAppTheme({
    Menu: theme
  }).Menu;
  var _useState = React$1.useState(new Array()),
    setSelectedItems = _useState[1];
  var childEventListener = {
    onSelect: function onSelect(subItems) {
      menu.UnselectItems(menu);
      subItems.forEach(function (item) {
        return item.Selected = true;
      });
      setSelectedItems(subItems);
    },
    onRightIconClick: function onRightIconClick(subItem) {},
    onLeftIconClick: function onLeftIconClick(subItem) {}
  };
  return /*#__PURE__*/React$1__default.createElement("div", {
    className: (_menu$ClassName = menu.ClassName) != null ? _menu$ClassName : Theme === null || Theme === void 0 ? void 0 : Theme.Class,
    key: id,
    style: {
      scrollbarWidth: "none",
      height: "calc(100% - 240px)"
    }
  }, (_menu$Items = menu.Items) === null || _menu$Items === void 0 ? void 0 : _menu$Items.map(function (item, i) {
    item.Level = 1;
    return /*#__PURE__*/React$1__default.createElement(MenuItem, {
      searchKey: searchKey,
      stateKey: stateKey,
      key: i,
      id: i.toString(),
      menu: menu,
      item: item,
      listener: childEventListener,
      selected: item.Selected,
      setMenuCollapsed: setMenuCollapsed,
      menuCollapsed: menuCollapsed,
      theme: Theme
    });
  }), children);
});

var MenuItemClass = function MenuItemClass() {
  this.Text = undefined;
  this.IconClassName = undefined;
  this.ClassName = undefined;
  this.Location = undefined;
  this.RequireLogin = true;
  this.SubItems = [];
  this.RTL = false;
  this.Visible = true;
  this.SearchVisiblity = true;
  this.Selected = false;
  this.MenuCode = undefined;
  this.Init = function (item, initialPath) {
    var _item$SubItems;
    if (item.Location && item.MenuCode) {
      item.Location = replaceQueryParam("MenuCode", item.MenuCode, item.Location);
    }
    item.Selected = false;
    if (initialPath && item.MenuCode && initialPath.indexOf("MenuCode=" + item.MenuCode) > -1) item.Selected = true;else if (urlMatch(initialPath, item.Location)) item.Selected = true;
    (_item$SubItems = item.SubItems) === null || _item$SubItems === void 0 ? void 0 : _item$SubItems.forEach(function (subItem) {
      if (!subItem.Init) subItem.Init = new MenuItemClass().Init;
      if (subItem.Init) subItem.Init(subItem, initialPath);
      if (subItem.Selected) item.Selected = true;
    });
  };
};

var MenuClass = function MenuClass() {
  var _this = this;
  this.Data = undefined;
  this.Items = [];
  this.Name = undefined;
  this.ClassName = undefined;
  this.SubMenuClassName = undefined;
  this.SearchInProgress = false;
  this.RTL = false;
  this.ItemVisiblityFn = function (menu, item) {
    return true;
  };
  this.Search = function (menu, key) {
    menu.SearchInProgress = true;
    if (!key) menu.SearchInProgress = false;
    if (menu.SearchInProgress) {
      var _menu$Items;
      key = key.toLocaleLowerCase();
      (_menu$Items = menu.Items) === null || _menu$Items === void 0 ? void 0 : _menu$Items.forEach(function (item) {
        return _this.SearchItem && _this.SearchItem(item, key);
      });
    }
    return menu;
  };
  this.SearchItem = function (item, key) {
    item.SearchVisiblity = false;
    if (!item.Component) {
      if (item.Text) item.SearchVisiblity = item.Text.toLocaleLowerCase().indexOf(key) > -1;
      if (item.SubItems) {
        item.SubItems.forEach(function (subItem) {
          return _this.SearchItem && _this.SearchItem(subItem, key);
        });
        if (item.SubItems.find(function (subItem) {
          return subItem.SearchVisiblity === true;
        })) item.SearchVisiblity = true;
      }
    }
  };
  this.UnselectItems = function (menu, item) {
    var _items;
    var items = menu.Items;
    if (item) items = item.SubItems;
    (_items = items) === null || _items === void 0 ? void 0 : _items.forEach(function (tmpItem) {
      tmpItem.Selected = false;
      _this.UnselectItems(menu, tmpItem);
    });
  };
  this.Init = function (menu, initialPath) {
    var _menu$Items2;
    (_menu$Items2 = menu.Items) === null || _menu$Items2 === void 0 ? void 0 : _menu$Items2.forEach(function (item) {
      if (!item.Init) item.Init = new MenuItemClass().Init;
      if (item.Init) item.Init(item, initialPath);
    });
  };
};

var Searchbar = React$1__default.memo(function (_ref) {
  var navigateText = _ref.navigateText,
    selectText = _ref.selectText,
    dismissText = _ref.dismissText,
    _ref$allowSpeechToTex = _ref.allowSpeechToText,
    allowSpeechToText = _ref$allowSpeechToTex === void 0 ? true : _ref$allowSpeechToTex,
    _ref$allowBarcodeRead = _ref.allowBarcodeRead,
    allowBarcodeRead = _ref$allowBarcodeRead === void 0 ? true : _ref$allowBarcodeRead,
    _ref$searchOptions = _ref.searchOptions,
    searchOptions = _ref$searchOptions === void 0 ? [] : _ref$searchOptions,
    placeholder = _ref.placeholder,
    _ref$onSearch = _ref.onSearch,
    onSearch = _ref$onSearch === void 0 ? undefined : _ref$onSearch,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? undefined : _ref$theme;
  var _useState = React$1.useState(""),
    searchValue = _useState[0],
    setSearchValue = _useState[1];
  var videoRef = React$1__default.createRef();
  var SearchboxRef = React$1__default.createRef();
  var moveRef = React$1__default.createRef();
  var _useState2 = React$1.useState(false),
    speechRecognitionSupportedFlag = _useState2[0],
    setSpeechRecognitionSupportedFlag = _useState2[1];
  var _useState3 = React$1.useState(false),
    barcodeReadingEnabled = _useState3[0],
    setBarcodeReadingEnabled = _useState3[1];
  var _useState4 = React$1.useState(new ClientBarcodeReader()),
    barcodeReader = _useState4[0];
  var _useState5 = React$1.useState(new Array()),
    options = _useState5[0],
    setOptions = _useState5[1];
  var _useState6 = React$1.useState(false),
    searchOptionsVisible = _useState6[0],
    setSearchOptionsVisible = _useState6[1];
  var _useState7 = React$1.useState({}),
    selectedSearchOption = _useState7[0],
    setSelectedSearchOption = _useState7[1];
  var _useState8 = React$1.useState(-1),
    focusedDropdownItem = _useState8[0],
    setFocusedDropdownItem = _useState8[1];
  var Theme = getAppTheme({
    Searchbar: theme
  }).Searchbar;
  React$1.useEffect(function () {
    if (focusedDropdownItem > -1 && moveRef.current) {
      moveRef.current.scrollTo(0, 107 * focusedDropdownItem);
    }
  }, [focusedDropdownItem]);
  React$1.useEffect(function () {
    setSpeechRecognitionSupportedFlag(speechRecognitionSupported());
    (function () {
      try {
        var _temp = function () {
          if (Array.isArray(searchOptions)) setOptions(searchOptions);else return Promise.resolve(searchOptions(searchValue)).then(function (_searchOptions) {
            setOptions(_searchOptions);
          });
        }();
        return _temp && _temp.then ? _temp.then(function () {}) : void 0;
      } catch (e) {
        Promise.reject(e);
      }
    })();
  }, [searchValue]);
  var _onKeyUp = function onKeyUp(e) {
    var _SearchboxRef$current;
    var value = "";
    if ((_SearchboxRef$current = SearchboxRef.current) !== null && _SearchboxRef$current !== void 0 && _SearchboxRef$current.value) value = SearchboxRef.current.value;
    if (value) {
      var selectedOption = options.find(function (option) {
        return option.shortCodeChar && option.shortCodeChar == value;
      });
      if (selectedOption) {
        onSearchOptionClick(selectedOption);
        if (SearchboxRef.current && selectedOption.shortCodeChar) SearchboxRef.current.value = value.replace(selectedOption.shortCodeChar, "");
        return;
      }
    }
    setSearchValue(value);
    if (searchOptionsVisible) {
      if (e.key == "ArrowDown") {
        var index = focusedDropdownItem + 1;
        if (index >= (options === null || options === void 0 ? void 0 : options.length)) index = (options === null || options === void 0 ? void 0 : options.length) - 1;
        setFocusedDropdownItem(index);
      } else if (e.key == "ArrowUp") {
        var index = focusedDropdownItem - 1;
        if (index < 0) index = 0;
        setFocusedDropdownItem(index);
      } else if (e.key == "Escape") {
        toggleSearchOptions(false);
        setBarcodeReadingEnabled(false);
      }
    } else if (e.key == "ArrowDown") {
      toggleSearchOptions(true);
    }
    if (e.key == "Enter") {
      if (focusedDropdownItem > -1 && focusedDropdownItem < options.length) onSearchOptionClick(options[focusedDropdownItem]);
      if (onSearch) onSearch(selectedSearchOption, value);
    }
  };
  var onSearchOptionClick = function onSearchOptionClick(option) {
    setSelectedSearchOption(option);
    toggleSearchOptions(false);
  };
  var toggleSearchOptions = function toggleSearchOptions(focus) {
    setTimeout(function () {
      setSearchOptionsVisible(focus);
    }, 100);
  };
  var recognizeSpeech = function recognizeSpeech() {
    var region = getCurrentRegionSetting();
    if (!region) return;
    var recognizer = new SpeechRecognizer();
    recognizer.Init();
    recognizer.Language = region.Tag;
    recognizer.OnResult = function (text) {
      if (text && SearchboxRef.current) SearchboxRef.current.value = text;
    };
    recognizer.Start();
  };
  var readBarcode = function readBarcode() {
    try {
      if (barcodeReadingEnabled) {
        barcodeReader.Destroy();
      } else {
        barcodeReader.VideoElement = videoRef;
        var sb = SearchboxRef.current;
        barcodeReader.onResult = function (text, format) {
          if (sb) sb.value = text;
          setSearchValue(text);
          setBarcodeReadingEnabled(false);
        };
        barcodeReader.onError = function (err) {
          setBarcodeReadingEnabled(false);
        };
        barcodeReader.Detect();
        setTimeout(function () {
          sb === null || sb === void 0 ? void 0 : sb.focus();
        }, 500);
      }
      setBarcodeReadingEnabled(!barcodeReadingEnabled);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };
  return /*#__PURE__*/React$1__default.createElement(Fragment, null, /*#__PURE__*/React$1__default.createElement("div", {
    className: "relative w-full"
  }, /*#__PURE__*/React$1__default.createElement("div", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.SearchClass
  }, selectedSearchOption && selectedSearchOption.image && getImageComponent(selectedSearchOption.image, {
    color: Theme === null || Theme === void 0 ? void 0 : Theme.ItemIconColor
  }), (!selectedSearchOption || !selectedSearchOption.image) && getImageComponent(Theme === null || Theme === void 0 ? void 0 : Theme.SearchIcon)), /*#__PURE__*/React$1__default.createElement("div", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.RightIconsWrapperClass
  }, allowSpeechToText && /*#__PURE__*/React$1__default.createElement("div", {
    className: "cursor-pointer " + (speechRecognitionSupportedFlag ? "" : "hidden"),
    onClick: function onClick() {
      return recognizeSpeech();
    }
  }, getImageComponent(Theme === null || Theme === void 0 ? void 0 : Theme.MicrophoneIcon)), allowBarcodeRead && /*#__PURE__*/React$1__default.createElement("div", {
    className: "cursor-pointer",
    onClick: function onClick() {
      return readBarcode();
    }
  }, getImageComponent(Theme === null || Theme === void 0 ? void 0 : Theme.BarcodeIcon))), /*#__PURE__*/React$1__default.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React$1__default.createElement("input", {
    type: "text",
    className: (Theme === null || Theme === void 0 ? void 0 : Theme.InputClass) + " " + (searchOptionsVisible && "rounded-b-none"),
    placeholder: placeholder,
    onKeyUp: function onKeyUp(e) {
      return _onKeyUp(e);
    },
    onFocus: function onFocus() {
      return toggleSearchOptions(true);
    },
    onBlur: function onBlur() {
      toggleSearchOptions(false);
    },
    ref: SearchboxRef
  }), /*#__PURE__*/React$1__default.createElement("video", {
    ref: videoRef,
    className: barcodeReadingEnabled ? "absolute z-20" : "hidden",
    onKeyUp: function onKeyUp(e) {
      return _onKeyUp(e);
    }
  }), searchOptionsVisible && !barcodeReadingEnabled && options && options.length > 0 && /*#__PURE__*/React$1__default.createElement("div", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.ItemsContainerClass
  }, /*#__PURE__*/React$1__default.createElement("div", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.ItemsScrollableAreaClass,
    ref: moveRef
  }, options.map(function (item, i) {
    var _item$id;
    return /*#__PURE__*/React$1__default.createElement("div", {
      onFocus: function onFocus() {
        return setFocusedDropdownItem(i);
      },
      className: focusedDropdownItem == i ? Theme === null || Theme === void 0 ? void 0 : Theme.FocusedItemClass : Theme === null || Theme === void 0 ? void 0 : Theme.ItemClass,
      id: (_item$id = item.id) === null || _item$id === void 0 ? void 0 : _item$id.toString(),
      onClick: function onClick() {
        return onSearchOptionClick(item);
      }
    }, /*#__PURE__*/React$1__default.createElement("div", {
      className: "flex items-center gap-5"
    }, item.image && /*#__PURE__*/React$1__default.createElement("div", {
      className: Theme === null || Theme === void 0 ? void 0 : Theme.ItemIconClass
    }, getImageComponent(item.image, {
      color: Theme === null || Theme === void 0 ? void 0 : Theme.ItemIconColor
    })), item.title && /*#__PURE__*/React$1__default.createElement("p", {
      className: Theme === null || Theme === void 0 ? void 0 : Theme.ItemTitleClass
    }, item.title)), item.badgeText && /*#__PURE__*/React$1__default.createElement("span", {
      className: Theme === null || Theme === void 0 ? void 0 : Theme.BadgeClass
    }, item.badgeText));
  })), /*#__PURE__*/React$1__default.createElement("div", {
    className: "absolute flex items-center justify-between w-full py-5 bottom-0 border-t border-blackHaze"
  }, /*#__PURE__*/React$1__default.createElement("div", {
    className: "flex gap-2 pl-6"
  }, /*#__PURE__*/React$1__default.createElement("div", {
    className: "flex items-center justify-center bg-gainsboro p-1 rounded"
  }, /*#__PURE__*/React$1__default.createElement(Icon, {
    name: "arrow-down",
    color: "#5b6782",
    size: 24
  })), /*#__PURE__*/React$1__default.createElement("div", {
    className: "flex items-center justify-center bg-gainsboro p-1 rounded"
  }, /*#__PURE__*/React$1__default.createElement(Icon, {
    name: "arrow-up",
    color: "#5b6782",
    size: 24
  })), navigateText && /*#__PURE__*/React$1__default.createElement("p", {
    className: "text-cadetBlue"
  }, navigateText)), /*#__PURE__*/React$1__default.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React$1__default.createElement("div", {
    className: "flex items-center justify-center bg-gainsboro p-1 rounded"
  }, /*#__PURE__*/React$1__default.createElement(Icon, {
    name: "redo",
    color: "#5b6782",
    size: 24
  })), selectText && /*#__PURE__*/React$1__default.createElement("p", {
    className: "text-cadetBlue"
  }, selectText)), /*#__PURE__*/React$1__default.createElement("div", {
    className: "flex gap-2 pr-6"
  }, /*#__PURE__*/React$1__default.createElement("div", {
    className: "flex items-center justify-center bg-gainsboro p-1 rounded"
  }, /*#__PURE__*/React$1__default.createElement("p", {
    className: "text-cadetBlue w-6 h-6"
  }, "esc")), dismissText && /*#__PURE__*/React$1__default.createElement("p", {
    className: "text-cadetBlue"
  }, dismissText)))))));
});

var Shortcutlist = React$1__default.memo(function (_ref) {
  var _ref$onItemClick = _ref.onItemClick,
    onItemClick = _ref$onItemClick === void 0 ? undefined : _ref$onItemClick,
    _ref$newImage = _ref.newImage,
    newImage = _ref$newImage === void 0 ? undefined : _ref$newImage,
    _ref$allowNew = _ref.allowNew,
    allowNew = _ref$allowNew === void 0 ? true : _ref$allowNew,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? undefined : _ref$title,
    _ref$showBadge = _ref.showBadge,
    showBadge = _ref$showBadge === void 0 ? true : _ref$showBadge,
    _ref$visible = _ref.visible,
    visible = _ref$visible === void 0 ? true : _ref$visible,
    _ref$newTitle = _ref.newTitle,
    newTitle = _ref$newTitle === void 0 ? undefined : _ref$newTitle,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? undefined : _ref$theme,
    _ref$items = _ref.items,
    items = _ref$items === void 0 ? [] : _ref$items;
  var Theme = getAppTheme({
    ShortcutList: theme
  }).ShortcutList;
  if (!visible) return /*#__PURE__*/React$1__default.createElement(Fragment, null);
  return /*#__PURE__*/React$1__default.createElement(Fragment, null, /*#__PURE__*/React$1__default.createElement("div", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.Class
  }, title && /*#__PURE__*/React$1__default.createElement("p", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.TitleClass
  }, title), /*#__PURE__*/React$1__default.createElement("div", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.ItemsClass
  }, items.map(function (item) {
    var _item$id;
    return /*#__PURE__*/React$1__default.createElement("div", {
      className: Theme === null || Theme === void 0 ? void 0 : Theme.ItemClass,
      id: (_item$id = item.id) === null || _item$id === void 0 ? void 0 : _item$id.toString(),
      onClick: function onClick() {
        return onItemClick && onItemClick(item);
      }
    }, showBadge && item.badgeText && /*#__PURE__*/React$1__default.createElement("span", {
      className: Theme === null || Theme === void 0 ? void 0 : Theme.BadgeClass
    }, item.badgeText), item.image && /*#__PURE__*/React$1__default.createElement("div", {
      className: Theme === null || Theme === void 0 ? void 0 : Theme.ItemIconClass
    }, getImageComponent(item.image, {
      color: Theme === null || Theme === void 0 ? void 0 : Theme.ItemIconColor
    })), item.title && /*#__PURE__*/React$1__default.createElement("p", {
      className: Theme === null || Theme === void 0 ? void 0 : Theme.ItemTitleClass
    }, item.title));
  }), allowNew && /*#__PURE__*/React$1__default.createElement("div", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.ItemClass,
    onClick: function onClick() {
      return onItemClick && onItemClick({
        id: -1
      });
    }
  }, newImage && /*#__PURE__*/React$1__default.createElement("div", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.ItemIconClass
  }, getImageComponent(newImage, {
    color: Theme === null || Theme === void 0 ? void 0 : Theme.ItemIconColor
  }, "new-shortcut-icon")), newTitle && /*#__PURE__*/React$1__default.createElement("p", {
    className: Theme === null || Theme === void 0 ? void 0 : Theme.ItemTitleClass
  }, newTitle)))));
});

var SidebarMenuClass = /*#__PURE__*/function (_MenuClass) {
  function SidebarMenuClass() {
    var _this;
    _this = _MenuClass.apply(this, arguments) || this;
    _this.Name = "Sidebar";
    _this.EnableSearch = true;
    _this.SearchIcon = /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      color: "#A6A5E3",
      fill: "none"
    });
    _this.SearchIconPosition = "left";
    return _this;
  }
  _inheritsLoose(SidebarMenuClass, _MenuClass);
  return SidebarMenuClass;
}(MenuClass);

var Sidebar = React$1__default.memo(function (_ref) {
  var _theme$Sidebar, _theme$Sidebar2;
  var menu = _ref.menu,
    stateKey = _ref.stateKey,
    id = _ref.id,
    children = _ref.children;
  var _useState = React$1.useState({
      menu: new SidebarMenuClass(),
      searchKey: "",
      stateKey: false
    }),
    currentState = _useState[0],
    setCurrentState = _useState[1];
  var _useState2 = React$1.useState(false),
    menuCollapsed = _useState2[0],
    setMenuCollapsed = _useState2[1];
  var _useState3 = React$1.useState(false),
    mobile = _useState3[0],
    setMobile = _useState3[1];
  var path = navigation.usePathname();
  var theme = getAppTheme();
  React$1.useEffect(function () {
    setCurrentState({
      menu: menu,
      searchKey: "",
      stateKey: stateKey
    });
    if (!menu.Init) menu.Init = new MenuClass().Init;
    if (menu.Init) menu.Init(menu, path);
  }, [stateKey, menu]);
  var searchTextInMenu = function searchTextInMenu(e) {
    var text = e.currentTarget.value;
    if (menu.Search) {
      setCurrentState({
        stateKey: currentState.stateKey,
        menu: menu.Search(menu, text),
        searchKey: text
      });
    }
  };
  var iconComponent = getImageComponent(currentState.menu.SearchIcon);
  var searchArea = React$1.useMemo(function () {
    return /*#__PURE__*/React$1__default.createElement("div", {
      className: "mb-9",
      key: "search-area"
    }, /*#__PURE__*/React$1__default.createElement("label", {
      className: "relative"
    }, currentState.menu.SearchIconPosition === "left" && /*#__PURE__*/React$1__default.createElement("span", {
      className: (menuCollapsed && "bg-deepBlue w-12 h-12 flex items-center justify-center rounded-xl -ml-3 cursor-text") + " absolute inset-y-0 left-0 flex items-center",
      onClick: function onClick() {
        return setMenuCollapsed(false);
      }
    }, iconComponent), /*#__PURE__*/React$1__default.createElement("input", {
      type: "text",
      onKeyUp: searchTextInMenu,
      placeholder: "Search",
      className: (menuCollapsed ? "border-none" : "border-b") + " flex p-3 w-full bg-blueZodiac text-white font-semibold text-[12px] border-blueBell tracking-[.42px] focus:outline-none focus:border-white pl-8"
    }), currentState.menu.SearchIconPosition === "right" && /*#__PURE__*/React$1__default.createElement("span", {
      className: "absolute inset-y-0 right-0 flex items-center"
    }, iconComponent)));
  }, [menuCollapsed]);
  if (!currentState.menu) return /*#__PURE__*/React$1__default.createElement("div", null);
  if (!id) id = "sidebar";
  return /*#__PURE__*/React$1__default.createElement(Fragment, null, /*#__PURE__*/React$1__default.createElement("button", {
    className: "flex pl-6 pt-9 md:hidden " + (mobile && 'hidden'),
    onClick: function onClick() {
      setMobile(!mobile), setMenuCollapsed(false);
    }
  }, /*#__PURE__*/React$1__default.createElement(Icon, {
    name: "menu",
    color: "black"
  })), /*#__PURE__*/React$1__default.createElement("div", {
    className: (!menuCollapsed ? "" + ((_theme$Sidebar = theme.Sidebar) === null || _theme$Sidebar === void 0 ? void 0 : _theme$Sidebar.RootClass) : "" + ((_theme$Sidebar2 = theme.Sidebar) === null || _theme$Sidebar2 === void 0 ? void 0 : _theme$Sidebar2.ToogleClass)) + " " + (mobile ? "max-md:block" : "max-md:hidden"),
    key: id
  }, /*#__PURE__*/React$1__default.createElement("div", {
    className: "flex items-center justify-between mb-10"
  }, /*#__PURE__*/React$1__default.createElement(Link, {
    href: "/",
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React$1__default.createElement(Image, {
    src: "/assets/quip-logo.png",
    className: "h-[22px]"
  }), !menuCollapsed && /*#__PURE__*/React$1__default.createElement("p", {
    className: "text-white text-3xl"
  }, "quip")), !menuCollapsed && /*#__PURE__*/React$1__default.createElement("button", {
    onClick: function onClick() {
      setMenuCollapsed(!menuCollapsed), !open && setMobile(false);
    }
  }, /*#__PURE__*/React$1__default.createElement(Icon, {
    name: "menu",
    color: "#E1E1F5"
  }))), currentState.menu.EnableSearch && searchArea, /*#__PURE__*/React$1__default.createElement(Menu, {
    menu: currentState.menu,
    id: "menu",
    searchKey: currentState.searchKey,
    stateKey: currentState.stateKey,
    setMenuCollapsed: setMenuCollapsed,
    menuCollapsed: menuCollapsed
  }), children));
});

exports.BinderOptions = BinderOptions;
exports.ClientBarcodeReader = ClientBarcodeReader;
exports.CollectionBinder = CollectionBinder;
exports.CollectionBinderProps = CollectionBinderProps;
exports.ColorPalette = ColorPalette;
exports.Config = Config;
exports.EndpointOptions = EndpointOptions;
exports.EntityBinder = EntityBinder;
exports.ExcelExporter = ExcelExporter;
exports.MediaListener = MediaListener;
exports.PDFExporter = PDFExporter;
exports.QueryData = QueryData;
exports.QueryDataModel = QueryDataModel;
exports.QueryFilter = QueryFilter;
exports.QuerySorter = QuerySorter;
exports.Region_EN = Region_EN;
exports.Region_TR = Region_TR;
exports.SpeechRecognizer = SpeechRecognizer;
exports.SystemLog = SystemLog;
exports.VideoPlayerListener = VideoPlayerListener;
exports.VideoPlayerProps = VideoPlayerProps;
exports.camelize = camelize;
exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.changeRegion = changeRegion;
exports.checkMouseInBound = checkMouseInBound;
exports.checkMouseInBoundByRef = checkMouseInBoundByRef;
exports.cleanLineFeeds = cleanLineFeeds;
exports.cleanSpaces = cleanSpaces;
exports.clone = clone;
exports.convertToDate = convertToDate;
exports.deepMap = deepMap;
exports.default = AppClient;
exports.enumToArray = enumToArray;
exports.execInTry = execInTry;
exports.filterData = filterData;
exports.filterInArray = filterInArray;
exports.findData = findData;
exports.findInArray = findInArray;
exports.findKeyInObject = findKeyInObject;
exports.formatString = formatString;
exports.functionExists = functionExists;
exports.getAppTheme = getAppTheme;
exports.getCurrentRegionSetting = getCurrentRegionSetting;
exports.getFormattedDateString = getFormattedDateString;
exports.getImageComponent = getImageComponent;
exports.getKeyByValue = getKeyByValue;
exports.getLocalstorage = getLocalstorage;
exports.getNextElement = getNextElement;
exports.getObjectValue = getObjectValue;
exports.getQueryParam = getQueryParam;
exports.getQueryString = getQueryString;
exports.getReferencePath = getReferencePath;
exports.getRegionSetting = getRegionSetting;
exports.isNullOrEmpty = isNullOrEmpty;
exports.isNumeric = isNumeric;
exports.isValidDate = isValidDate;
exports.listenCustomEvent = listenCustomEvent;
exports.loopInRange = loopInRange;
exports.padLeft = padLeft;
exports.parseFloatIfCan = parseFloatIfCan;
exports.pascalize = pascalize;
exports.queryParamsAsObject = queryParamsAsObject;
exports.raiseCustomEvent = raiseCustomEvent;
exports.randomId = randomId;
exports.registerRegionSetting = registerRegionSetting;
exports.removeEmptyProps = removeEmptyProps;
exports.removeLastPropName = removeLastPropName;
exports.removeLocalstorage = removeLocalstorage;
exports.replaceLowerTRChars = replaceLowerTRChars;
exports.replaceQueryParam = replaceQueryParam;
exports.replaceUpperTRChars = replaceUpperTRChars;
exports.resolveCharset = resolveCharset;
exports.resolveContentType = resolveContentType;
exports.resolveMimeType = resolveMimeType;
exports.selectDefaultValues = selectDefaultValues;
exports.setLocalstorage = setLocalstorage;
exports.setObjectValue = setObjectValue;
exports.shortenText = shortenText;
exports.speechRecognitionSupported = speechRecognitionSupported;
exports.toJson = toJson;
exports.toSlug = toSlug;
exports.trimChars = trimChars;
exports.typeCheck = typeCheck;
exports.urlMatch = urlMatch;
exports.useAppTheme = useAppTheme;
exports.useEndpointSWR = useEndpointSWR;
exports.useEndpointSWRCallback = useEndpointSWRCallback;
exports.useMediaQuery = useMediaQuery;
exports.validateEmail = validateEmail;
exports.yearSelectBox = yearSelectBox;
//# sourceMappingURL=index.js.map
