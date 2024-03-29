export declare class ExcelExporter {
    FileName: string;
    Title?: string;
    Html?: string;
    FormatHtml?: ((html: string) => string);
    HtmlElement?: HTMLElement;
    Export(): void;
}
