export default interface ISanitizeOptions {
    allowedTags?: string[], 
    disallowedTagsMode?: string, 
    allowedAttributes?: { 
        [key: string]: string[] 
    }, 
    textFilter?: (text: string) => string,
    allowedSchemes?: string[],   
    allowProtocolRelative?: boolean, 
    enforceHtmlBoundary?: boolean,
    parseStyleAttributes?: boolean,
    parser?: { 
        decodeEntities?: boolean
    }
}