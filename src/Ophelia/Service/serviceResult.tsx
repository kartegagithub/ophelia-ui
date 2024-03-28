import ServiceMessage from "./serviceMessage"

export default class ServiceResult{
    data?: any
    hasFailed: boolean = false
    messages: Array<ServiceMessage> = []
    token: string = ""
    extraData: any
    performance: any
    encryptedData: any
}