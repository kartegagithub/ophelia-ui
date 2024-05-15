import ServiceResult from "./serviceResult"

export default class serviceCollectionResult extends ServiceResult{
    declare data?: Array<any>
    totalDataCount: number = 0
}