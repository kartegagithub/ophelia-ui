import { useEffect, useRef } from "react";
import { insertToIndex } from "./ArrayExtensions";
import { maskText } from "./StringExtensions";

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

export const maskHandler = (mask?: string, e?: React.KeyboardEvent<HTMLInputElement>, onChange?: Function, rules?: Array<string | Function>)=>{
  if(mask && e){
    if(e.key.length > 1 && e.key != "Space") return;
    else{
      const value = e.currentTarget.value;
      let newValue;
      newValue = `${value.slice(0, e.currentTarget.selectionStart as number)}${e.key}${value.slice(e.currentTarget.selectionStart as number)}`;
      var tmpValue = maskText(newValue, mask, undefined, rules);
      e.preventDefault()
      e.currentTarget.value = tmpValue;
      onChange && onChange(({currentTarget: e.currentTarget, target: e.target, "bubbles": true }))
    }
  }
}

export const useScrollInlineDynamically = (pathname: string) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (activeLinkRef.current && scrollContainerRef.current) {
      const activeLink = activeLinkRef.current;
      const scrollContainer = scrollContainerRef.current;
      const activeLinkOffsetLeft = activeLink.offsetLeft;
      const containerWidth = scrollContainer.clientWidth;
      const linkWidth = activeLink.clientWidth;

      const scrollTo = activeLinkOffsetLeft - containerWidth / 2 + linkWidth / 2;
      scrollContainer.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  }, [pathname]);

  return { scrollContainerRef, activeLinkRef };
};