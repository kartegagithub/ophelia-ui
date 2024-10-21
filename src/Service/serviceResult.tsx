import ServiceMessage from "./serviceMessage"

export default class ServiceResult{
    data?: any
    success?: boolean
    error: Array<ServiceMessage> = []
    hasFailed: boolean = false
    messages: Array<ServiceMessage> = []
    token: string = ""
    extraData: any
    performance: any
    encryptedData: any
    responseStatusCode: number = 0
}