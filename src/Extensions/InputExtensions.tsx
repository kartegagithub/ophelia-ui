export const readUploadedFile = (file?: File, callback?: ((name: string, size: number, base64: string, buffer: ArrayBuffer) => void)) => {
    if(!file || !callback) return undefined;

    const reader = new FileReader();
    reader.onload = async () => {
        const base64: string = reader.result as string;
        var buffer = await file.arrayBuffer();
        callback(file.name, file.size, base64, buffer);
    };  
    reader.onerror = (e) => {
        console.error(e);
    }
    reader.readAsDataURL(file);
    return reader;
}

export const removeFileFromFileList = (input: HTMLInputElement | null = null, indexOrName?: number | string) => {
    if(!input || !indexOrName) return;

    const dt = new DataTransfer()
    const { files } = input
    if(!files) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if(typeof indexOrName == "string"){
        if(file.name !== indexOrName)
            dt.items.add(file)
      }
      else if (indexOrName !== i)
        dt.items.add(file)
    }
    input.files = dt.files
  }