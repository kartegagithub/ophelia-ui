import mime from "mime-types"

export const resolveMimeType = (filenameOrExt?: string): string | boolean => {
    if(!filenameOrExt) return false;
    return mime.lookup(filenameOrExt)
}

export const resolveContentType = (filenameOrExt?: string): string | boolean => {
    if(!filenameOrExt) return false;
    return mime.contentType(filenameOrExt)
}

export const resolveCharset = (typeString?: string): string | boolean => {
    if(!typeString) return false;
    return mime.charset(typeString)
}