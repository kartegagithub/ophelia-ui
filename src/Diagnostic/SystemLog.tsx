class SystemLog {
  Level: LogLevel = LogLevel.Debug
  OriginalLog = (message?: any, ...optionalParams: any[]) => {};
  OriginalWarning = (message?: any, ...optionalParams: any[]) => {};
  OriginalError = (message?: any, ...optionalParams: any[]) => {};
  OriginalInfo = (message?: any, ...optionalParams: any[]) => {};
  OriginalDebug = (message?: any, ...optionalParams: any[]) => {};

  log = (message?: any, ...optionalParams: any[]) => {
    if (this.Level == LogLevel.None) return this;
    if (this.OriginalLog != null) this.OriginalLog(message, optionalParams);
    return this;
  };

  warn = (message?: any, ...optionalParams: any[]) => {
    if (this.Level == LogLevel.None || this.Level == LogLevel.Info) return this;

    if (this.OriginalWarning != null)
      this.OriginalWarning(message, optionalParams);
    return this;
  };

  error = (message?: any, ...optionalParams: any[]) => {
    if (this.Level == LogLevel.None) return this;

    if (this.OriginalError != null) this.OriginalError(message, optionalParams);
    return this;
  };

  info = (message?: any, ...optionalParams: any[]) => {
    if (this.Level == LogLevel.None) return this;

    if (this.OriginalInfo != null) this.OriginalInfo(message, optionalParams);
    return this;
  };

  debug = (message?: any, ...optionalParams: any[]) => {
    if (this.Level != LogLevel.Debug) return this;

    if (this.OriginalDebug != null) this.OriginalDebug(message, optionalParams);
    return this;
  };
  constructor() {
    if(console){
      this.OriginalLog = console.log;
      this.OriginalWarning = console.warn;
      this.OriginalError = console.error;
      this.OriginalInfo = console.info;
      this.OriginalDebug = console.debug;
    }
    
    console.log = this.log;
    console.warn = this.warn;
    console.error = this.error;
    console.debug = this.debug;
    console.info = this.info;
  }
  setLogLevel = (level: LogLevel) => {
    this.Level = level
  }
}

export enum LogLevel{
  None,
  Info,
  Warning,
  Debug,
}
const sysLog = new SystemLog();
export default sysLog as SystemLog