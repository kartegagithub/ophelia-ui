export const raiseCustomEvent = (eventType: string = "", data: any) => {
    if(global.document === undefined) return;
    var event: Event; // The custom event that will be created
    event = new CustomEvent(eventType, { bubbles: true, cancelable: true, detail: data})
    document.dispatchEvent(event);
}

export const listenCustomEvent = (eventType: string = "", listener: any) => {
    if(global.document === undefined) return;
    document.addEventListener(eventType, listener);
}