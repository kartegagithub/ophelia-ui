import { resolveMimeType } from "../Extensions/MimeTypeResolver";

export class ExcelExporter{
    FileName: string = "File.xls"
    Title?: string = "Sheet1"
    Html?: string = undefined
    FormatHtml?: ((html: string) => string)
    HtmlElement?: HTMLElement
    Export(){
        var $this = this;
        var mimeType = resolveMimeType(this.FileName);
        var uri = 'data:' + mimeType + ';base64,'
        var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><?xml version="1.0" encoding="UTF-8" standalone="yes"?><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>{table}</body></html>'
        var base64 = function (s: any) { return window.btoa(unescape(encodeURIComponent(s))) }
        var format = function (s: any, c: any) { return s.replace(/{(\w+)}/g, function (m: any, p: any) { return c[p]; }) };
        var html = (this.Html ?? this.HtmlElement?.outerHTML ?? "").replace(/(<[a|A][^>]*>|)/g, '')
        if(this.FormatHtml) html = this.FormatHtml(html)
        var ctx = { table: html }
        window.location.href = uri + base64(format(template, ctx))
    }
}