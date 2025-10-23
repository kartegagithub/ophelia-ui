import { maskText } from "./StringExtensions";

export const checkMouseInBoundByRef = (
  e: {clientX: number; clientY: number},
  ref: any,
  callback: (result: boolean) => void
) => {
  if (!ref || !callback || !e) callback(false);
  checkMouseInBound(e, ref.current, callback);
};

export const checkMouseInBound = (
  e: {clientX: number; clientY: number},
  ref: HTMLElement | undefined | null,
  callback: (result: boolean) => void
) => {
  if (!callback || !e) callback(false);
  if (!ref) return callback(false);

  const eleBounds = ref.getBoundingClientRect();
  if (!eleBounds) callback(false);

  let inBound = false;
  if (
    e.clientX >= eleBounds.left &&
    e.clientX <= eleBounds.right &&
    e.clientY >= eleBounds.top &&
    e.clientY <= eleBounds.bottom
  ) {
    inBound = true;
  } else {
    inBound = false;
  }
  callback(inBound);
};

export const maskHandler = (
  mask?: string,
  e?: any,
  onChange?: Function,
  rules?: Array<string | Function>
) => {
  if (mask && e) {
    // Eğer Ctrl veya Cmd tuşu basılıysa (örneğin Ctrl+V), maskHandler çalışmasın
    if (e.ctrlKey || e.metaKey || (e?.key?.length > 1 && e.key !== " ")) {
      return;
    }

    const input = e.currentTarget;
    const value = input.value;

    // Seçili metin var mı kontrol et
    const selectionStart = input.selectionStart ?? 0;
    const selectionEnd = input.selectionEnd ?? 0;

    let newValue;

    if (selectionStart !== selectionEnd) {
      // Eğer seçim varsa, seçili kısmı silip yeni harfi ekle
      newValue = `${value.slice(0, selectionStart)}${e.key}${value.slice(
        selectionEnd
      )}`;
    } else {
      // Eğer seçim yoksa imlecin olduğu yere ekle
      newValue = `${value.slice(0, selectionStart)}${e.key}${value.slice(
        selectionStart
      )}`;
    }

    // Maskeli yeni değeri oluştur
    let tmpValue = maskText(newValue, mask, undefined, rules);

    const [hh, mm] = tmpValue.split(":");
    if (mm && mm.length > 2) {
      tmpValue = `${hh}:${mm.slice(0, 2)}`;
    }

    e.preventDefault();
    input.value = tmpValue;

    onChange &&
      onChange({
        currentTarget: input,
        target: e.target,
        bubbles: true,
      });
  }
};

export const pasteHandler = (
  mask?: string,
  e?: {clipboardData: any; preventDefault: Function; currentTarget: any; target: any},
  onChange?: Function,
  rules?: Array<string | Function>
) => {
  if (mask && e) {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("Text");
    const currentValue = e.currentTarget.value;
    const selectionStart = e.currentTarget.selectionStart ?? 0;
    const selectionEnd = e.currentTarget.selectionEnd ?? 0;
    const newValue = `${currentValue.slice(
      0,
      selectionStart
    )}${pastedText}${currentValue.slice(selectionEnd)}`;
    const tmpValue = maskText(newValue, mask, undefined, rules);
    e.currentTarget.value = tmpValue;
    onChange &&
      onChange({
        currentTarget: e.currentTarget,
        target: e.target,
        bubbles: true,
      });
  }
};