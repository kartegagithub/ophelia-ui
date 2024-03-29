export default class SystemLog {
    Enabled: boolean;
    OriginalLog: (message?: any, ...optionalParams: any[]) => void;
    OriginalWarning: (message?: any, ...optionalParams: any[]) => void;
    OriginalError: (message?: any, ...optionalParams: any[]) => void;
    OriginalInfo: (message?: any, ...optionalParams: any[]) => void;
    OriginalDebug: (message?: any, ...optionalParams: any[]) => void;
    log: (message?: any, ...optionalParams: any[]) => this;
    warn: (message?: any, ...optionalParams: any[]) => this;
    error: (message?: any, ...optionalParams: any[]) => this;
    info: (message?: any, ...optionalParams: any[]) => this;
    debug: (message?: any, ...optionalParams: any[]) => this;
    constructor();
    enable: () => void;
    disable: () => void;
}
