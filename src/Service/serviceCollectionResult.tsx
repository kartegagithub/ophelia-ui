import ServiceResult from "./serviceResult"

export default class ServiceCollectionResult extends ServiceResult{
    data?: Array<any>
    totalDataCount: number = 0
}