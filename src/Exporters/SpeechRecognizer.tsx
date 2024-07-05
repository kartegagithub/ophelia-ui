export class SpeechRecognizer{
    SpeechRecognition: any
    SpeechGrammarList: any
    Language: string = "tr-TR"
    OnResult?: ((text: string) => void)
    constructor(){
        
    }
    Init(){
        if(!speechRecognitionSupported()) return;

        var tmpWindow: any = window;
        var cons = tmpWindow.SpeechRecognition || tmpWindow.webkitSpeechRecognition;
        var cons2 = tmpWindow.SpeechGrammarList || tmpWindow.webkitSpeechGrammarList;
        if(!cons2 || !cons) return;

        this.SpeechRecognition = new cons();
        this.SpeechGrammarList = new cons2();
        
        this.SpeechRecognition.grammars = this.SpeechGrammarList;
        this.SpeechRecognition.continuous = false;
        this.SpeechRecognition.lang = this.Language;
        this.SpeechRecognition.interimResults = false;
        this.SpeechRecognition.maxAlternatives = 1;
        this.SpeechRecognition.onresult = (event: any) => {
            console.log(`SpeechRecognition:OnResult`, event);
            if(event.results && event.results.length > 0 && event.results[0].length > 0)
                this.OnResult && this.OnResult(event.results[0][0].transcript)
        };
        this.SpeechRecognition.onnomatch = (event: any) => {
            console.log(`SpeechRecognition:onnomatch`, event);
          };
        this.SpeechRecognition.onspeechend = () => {
            this.SpeechRecognition.stop();
        };
        this.SpeechRecognition.onerror = (event:any) => {
            console.log(`SpeechRecognition:onerror`, event);
        };
    }
    Start(){
        if(!this.SpeechRecognition) return;
        this.SpeechRecognition.start();
    }
    Stop(){
        if(!this.SpeechRecognition) return;
        this.SpeechRecognition.stop();
    }
}

export const speechRecognitionSupported = ()=>{
    var tmpWindow: any = globalThis.window;
    if(!tmpWindow) return true
    if(!(tmpWindow.SpeechRecognition || tmpWindow.webkitSpeechRecognition)) return false
    if(!(tmpWindow.SpeechGrammarList || tmpWindow.webkitSpeechGrammarList)) return false
    return true
}