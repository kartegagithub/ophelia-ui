import { checkMouseInBound, findData, findInArray } from ".";

export function raiseCustomEvent(eventType: string = "", data: any) {
    if(globalThis.document === undefined) return;
    var event: Event; // The custom event that will be created
    event = new CustomEvent(eventType, { bubbles: true, cancelable: true, detail: data})
    document.dispatchEvent(event);
}

export function listenCustomEvent(eventType: string = "", listener: any) {
    if(globalThis.document === undefined) return;
    document.addEventListener(eventType, listener);
}

let keyDownRegistered: boolean = false
let mouseDownRegistered: boolean = false
let registeredKeydownHandlers: Array<{keys: Array<string> | string, callback: Function}> = []
let registeredMouseDownHandlers: Array<{callback: Function, boundryElement?: HTMLElement | null}> = []
const registerGlobalDocumentKeyDown = () => {
    if(globalThis.document === undefined || keyDownRegistered) return;
    keyDownRegistered = true;
    document.addEventListener("keydown", onDocumentKeyDown);
}
const registerGlobalMouseDown = () => {
    if(globalThis.document === undefined || mouseDownRegistered) return;
    mouseDownRegistered = true;
    document.addEventListener("mousedown", onDocumentMouseDown);
}
const onDocumentMouseDown = (e: MouseEvent) => {
    if(globalThis.document === undefined) return;
    for (let index = 0; index < registeredMouseDownHandlers.length; index++) {
        const handler = registeredMouseDownHandlers[index];
        checkMouseInBound(e, handler.boundryElement, (inBound) => handler.callback(inBound))
    }
}
const onDocumentKeyDown = (e: KeyboardEvent) => {
    if(globalThis.document === undefined) return;
    for (let index = 0; index < registeredKeydownHandlers.length; index++) {
        const handler = registeredKeydownHandlers[index];
        var canHandle = false;
        if(typeof handler.keys == "string") canHandle = handler.keys == e.key
        else canHandle = findInArray(handler.keys, e.key).index > -1;

        if(canHandle && handler.callback) handler.callback(e);
    }
}
export function registerDocumentKeyDown (keys: Array<string> | string, callback: Function) {
    if(globalThis.document === undefined) return;
    unregisterDocumentKeyDown(keys, callback)
    registeredKeydownHandlers.push({keys, callback})
}
export function unregisterDocumentKeyDown (keys: Array<string> | string, callback: Function) {
    if(globalThis.document === undefined) return;
    for (let index = 0; index < registeredKeydownHandlers.length; index++) {
        const element = registeredKeydownHandlers[index];
        if(element.keys == keys && element.callback == callback){
            registeredKeydownHandlers.splice(index, 1)
        }
    }
}
export function registerDocumentMouseDown(callback: Function, boundryElement?: HTMLElement | null) {
    if(globalThis.document === undefined) return;
    unregisterDocumentMouseDown(callback, boundryElement);
    registeredMouseDownHandlers.push({callback, boundryElement})
}
export function unregisterDocumentMouseDown (callback: Function, boundryElement?: HTMLElement | null) {
    if(globalThis.document === undefined) return;
    for (let index = 0; index < registeredMouseDownHandlers.length; index++) {
        const element = registeredMouseDownHandlers[index];
        if((boundryElement && element.boundryElement == boundryElement) || element.callback == callback){
            registeredMouseDownHandlers.splice(index, 1)
        }
    }
}

registerGlobalDocumentKeyDown()
registerGlobalMouseDown();