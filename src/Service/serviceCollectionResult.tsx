import ServiceResult from "./serviceResult"

export default class ServiceCollectionResult extends ServiceResult{
    data?: Array<any>
    message?: string
    totalDataCount: number = 0
}