import IAnalytics from "./IAnalytics";
export default class AnalyticsList {
    InnerList: Array<IAnalytics>;
    push(item: IAnalytics): void;
    Add(item: IAnalytics): void;
    ReportEvent(eventType: string, data: any): void;
}
