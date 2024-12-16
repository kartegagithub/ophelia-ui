export const readUploadedFile = (
  file?: File,
  callback?: (
    name: string,
    size: number,
    base64: string,
    buffer: ArrayBuffer
  ) => void
) => {
  if (!file || !callback) return undefined;

  const reader = new FileReader();
  reader.onload = async () => {
    const base64: string = reader.result as string;
    var buffer = await file.arrayBuffer();
    callback(file.name, file.size, base64, buffer);
  };
  reader.onerror = (e) => {
    console.error(e);
  };
  reader.readAsDataURL(file);
  return reader;
};

export const removeFileFromFileList = (
  input: HTMLInputElement | null = null,
  indexOrName?: number | string
) => {
  if (!input || !indexOrName) return;

  const dt = new DataTransfer();
  const { files } = input;
  if (!files) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (typeof indexOrName == "string") {
      if (file.name !== indexOrName) dt.items.add(file);
    } else if (indexOrName !== i) dt.items.add(file);
  }
  input.files = dt.files;
};

export const onlyAlphanumeric = (event: any) => {
  var charCode = event.charCode || event.keyCode;

  // Harfler ve rakamların charcode aralıkları
  var isLetter =
    (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122);
  var isDigit = charCode >= 48 && charCode <= 57;
  var isBackspace = charCode === 8;
  var isArrowLeft = charCode === 37;
  var isArrowRight = charCode === 39;

  if (!isLetter && !isDigit && !isBackspace && !isArrowLeft && !isArrowRight) {
    event.preventDefault();
  }
};

export const onlyNumeric = (event: any) => {
  const charCode = event.charCode || event.keyCode;

  // Rakamların charcode aralıkları
  const isDigit = charCode >= 48 && charCode <= 57;
  const isBackspace = charCode === 8;
  var isArrowLeft = charCode === 37;
  var isArrowRight = charCode === 39;
  if (!isDigit && !isBackspace && !isArrowLeft && !isArrowRight) {
    event.preventDefault();
  }
};
export const onlyNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const invalidKeys = ["e", "E", "+", "-", "."];
  if (invalidKeys.includes(e.key)) {
    e.preventDefault();
  }
};
export const maxChar = (maxLength: number) => {
  return (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.value.length > maxLength) {
      target.value = target.value.slice(0, maxLength); // Maksimum uzunluğu aşan karakterleri sil
    }
  };
};
