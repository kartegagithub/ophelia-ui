import ServiceResult from "./serviceResult"

export default class serviceCollectionResult extends ServiceResult{
    data?: Array<any>
    totalDataCount: number = 0
}