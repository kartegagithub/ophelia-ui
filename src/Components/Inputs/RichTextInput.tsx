import { getAppTheme } from "../../AppTheme";
import React, { InputHTMLAttributes, useEffect, useMemo, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';

interface BlobInfo {
  id: () => string;
  name: () => string;
  filename: () => string;
  blob: () => Blob;
  base64: () => string;
  blobUri: () => string;
  uri: () => string | undefined;
}

const RichTextInput: React.FC<{ 
  id?: string, 
  className?: string, 
  name?: string, 
  defaultValue?: string, 
  visible?: boolean, 
  onChange: Function,
  imageHandler?: ((fileName: string, size: number, buffer: ArrayBuffer, base64: string | undefined, progress?: Function) => Promise<string | undefined>)
}> = ({ 
  defaultValue = undefined, 
  onChange = undefined, 
  id = "editor", 
  name = "editor", 
  className = "",
  ...props
}) => {  
  const editorRef = useRef(null as any);
  const theme = getAppTheme();
  const InputRef = React.createRef<HTMLInputElement>();

  async function imageHandler (file: BlobInfo, progress: Function): Promise<string> {
    if(!props.imageHandler) return "";

    var arrayBuffer = await file.blob().arrayBuffer();
    var size = arrayBuffer.byteLength;
    var base64 = file.base64();
    return (await props.imageHandler(file.filename(), size, arrayBuffer, base64, progress)) ?? "";
  }
  
  return (
    <>
      <input onChange={(e) => onChange && onChange(e)} ref={InputRef} type="hidden" id={id} name={name}/>
      <Editor
        tinymceScriptSrc={theme.RichTextEditor?.FileLocation}
        apiKey={theme.RichTextEditor?.APIKey}
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue={defaultValue}
        onChange={(e: any) => {
          if(InputRef && InputRef.current && window){
            InputRef.current.value = editorRef.current.getContent();
            var event: any = {currentTarget: InputRef.current,  bubbles: true };
            onChange && onChange(event);
          }
        }}
        init={{
          height: theme.RichTextEditor?.Height,
          menubar: false,
          plugins: theme.RichTextEditor?.Plugins,
          toolbar: theme.RichTextEditor?.Toolbar,
          automatic_uploads: true,
          images_upload_handler: imageHandler,
          content_style: theme.RichTextEditor?.ContentStyle,
          content_css: theme.RichTextEditor?.ContentCSS,
          body_class: theme.RichTextEditor?.BodyClassName
        }}
      />
    </>
  );
}
export default RichTextInput;