import ServiceResult from "./serviceResult"

export default class ServiceCollectionResult extends ServiceResult{
    data?: Array<any>
    message?: string
    totalDataCount: number = 0
    SetData<T>(data: T, count: number | undefined = undefined): void {
        if(count == undefined) count = (data as Array<any>)?.length;
        this.totalDataCount = count;
        super.SetData(data);
    }
}