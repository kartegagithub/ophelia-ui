export default interface IAnalytics{
    ReportEvent(eventType: string, data: any): void;
}