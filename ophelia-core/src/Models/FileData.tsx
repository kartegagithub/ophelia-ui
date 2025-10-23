import { readUploadedFile } from "../Extensions"

export default class FileData{
    ID?: number | string = 0
    StatusID?: number = 1
    KeyName?: string = ""
    FileName?: string = ""
    FilePath?: string = ""
    FileSize?: number
    Base64Data?: string
    ByteData?: ArrayBuffer
    LanguageID?: number = 0
}

export const convertToFileData = async (file: File, callback: (data: FileData) => void) => {
    await readUploadedFile(file, (name, size, base64, buffer) => {
        var data = new FileData();
        data.FileName = name;
        data.FileSize = size;
        data.Base64Data = base64;
        callback(data);
    })
}