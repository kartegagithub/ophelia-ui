import IAnalytics from "./IAnalytics";

export default class AnalyticsList{
    InnerList: Array<IAnalytics> = new Array<IAnalytics>();

    push(item: IAnalytics) {
        this.Add(item);
    }
    Add(item: IAnalytics) {
        this.InnerList.push(item);
    }

    ReportEvent(eventType: string, data: any){
        this.InnerList.forEach((item) => {
            item.ReportEvent(eventType, data);
        });
    }
}