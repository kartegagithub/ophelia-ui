import ServiceMessage from "./serviceMessage";
export default class ServiceResult {
    data?: any;
    hasFailed: boolean;
    messages: Array<ServiceMessage>;
    token: string;
    extraData: any;
    performance: any;
    encryptedData: any;
}
