import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"

export class PDFExporter{
    FileName: string = "File.pdf"
    Html?: string = undefined
    HtmlElement?: HTMLElement
    Orientation?: "portrait" | "landscape" = "landscape";
    Export(){
        const doc = new jsPDF(this.Orientation, "pt", "letter");
        var $this = this;

        if(this.HtmlElement){
            html2canvas(this.HtmlElement).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                doc.addImage(imgData, 'JPEG', 0, 0, 0, 0);
                doc.save($this.FileName);
            })
        }
        else if(this.Html){
            doc.html(this.Html, {
                callback: function (doc) {
                    doc.save($this.FileName);
                }
            });
        }
    }
}