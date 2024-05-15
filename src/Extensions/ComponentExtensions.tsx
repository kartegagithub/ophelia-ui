export const checkMouseInBoundByRef = (e: React.MouseEvent<any>, ref: React.RefObject<any>, callback: (result: boolean) => void) => {
    if(!ref || !callback || !e) callback(false);
    checkMouseInBound(e, ref.current, callback)
};

export const checkMouseInBound = (e: React.MouseEvent<any> | MouseEvent, ref: HTMLElement | undefined | null, callback: (result: boolean) => void) => {
    if(!callback || !e) callback(false);
    if(!ref) return callback(false);

    const eleBounds = ref.getBoundingClientRect();
    if(!eleBounds) callback(false);

    let inBound = false;
    if (e.clientX >= eleBounds.left && e.clientX <= eleBounds.right && e.clientY >= eleBounds.top && e.clientY <= eleBounds.bottom) {
      inBound = true;
    } else {
      inBound = false;
    }
    callback(inBound)
};