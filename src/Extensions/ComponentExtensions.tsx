export const checkMouseInBoundByRef = (e: React.MouseEvent<any>, ref: React.RefObject<any>, callback: (result: boolean) => void) => {
    if(!ref || !callback || !e) callback(false);
    checkMouseInBound(e, ref.current, callback)
};

export const checkMouseInBound = (e: React.MouseEvent<any>, ref: HTMLElement, callback: (result: boolean) => void) => {
    if(!ref || !callback || !e) callback(false);

    const eleBounds = ref.getBoundingClientRect();
    if(!eleBounds) callback(false);

    let inBound = false;
    if (e.clientX >= eleBounds.left && e.clientX <= eleBounds.right) {
      inBound = true;
    } else {
      inBound = false;
    }
    callback(inBound)
};