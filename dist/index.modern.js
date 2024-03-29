import 'react';
import moment from 'moment';

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

function convertToDate(value) {
  if (!value) return moment(new Date());
  var setting = getCurrentRegionSetting();
  moment.locale(setting === null || setting === void 0 ? void 0 : setting.Code.toLowerCase());
  return moment(value);
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

var Endpoint = /*#__PURE__*/function () {
  function Endpoint(service, url, options) {
    this.URL = "";
    this.Options = new EndpointOptions();
    this.Status = ServiceStatus.NotInitialized;
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
  this.Method = RequestMethod.POST;
  this.ContentType = "application/json";
  this.CanBeCached = false;
  this.CacheDuration = 0;
  this.Headers = [];
  this.ValidateCache = undefined;
  this.toString = function (apiURL) {
    return apiURL + "_" + _this.Method + "_" + JSON.stringify(_this.Parameters);
  };
};
var ServiceStatus;
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
})(ServiceStatus || (ServiceStatus = {}));
var RequestMethod;
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
})(RequestMethod || (RequestMethod = {}));

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
      endpoint.Status = ServiceStatus.Fetching;
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
        endpoint.Status = ServiceStatus.Error;
        _this.OnErrorResponse(endpoint, reason);
      });
      return Promise.resolve(fetcher).then(function (data) {
        endpoint.Status = ServiceStatus.Success;
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
            endpoint.Status = ServiceStatus.Success;
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

var createAppClient = function createAppClient() {
  return new AppClient();
};

export { createAppClient };
//# sourceMappingURL=index.modern.js.map
