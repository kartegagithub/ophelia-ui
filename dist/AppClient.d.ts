import { NextPageContext } from "next";
import SystemLog from "./Diagnostic/SystemLog";
import AnalyticsList from "./Metrics/AnalyticsList";
import IAnalytics from "./Metrics/IAnalytics";
import APIService from "./Service/apiService";
import { AppTheme } from "./AppTheme";
export default class AppClient {
    Region: string;
    AppData: any;
    Logger: SystemLog;
    Analytics: AnalyticsList;
    IsClientSide: boolean;
    Context?: NextPageContext;
    Theme?: AppTheme;
    DynamicSEO?: any;
    Hydrate(): void;
    ChangeUserRegion: (code?: string) => void;
    Translate(key?: string): string;
    CreateService(): APIService;
    RegisterAnalytics: (analytic: IAnalytics) => void;
    UpdateMetaTags: () => void;
    constructor();
}
