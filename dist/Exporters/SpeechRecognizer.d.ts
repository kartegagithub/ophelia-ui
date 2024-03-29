export declare class SpeechRecognizer {
    SpeechRecognition: any;
    SpeechGrammarList: any;
    Language: string;
    OnResult?: ((text: string) => void);
    constructor();
    Init(): void;
    Start(): void;
    Stop(): void;
}
export declare const speechRecognitionSupported: () => boolean;
