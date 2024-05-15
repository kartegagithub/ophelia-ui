import { getAppTheme } from "../../AppTheme";
import React, { InputHTMLAttributes, useEffect, useMemo } from "react";
import "react-quill/dist/quill.snow.css"
import hljs from 'highlight.js';
import dynamic from 'next/dynamic';
import { readUploadedFile } from "../../Extensions/InputExtensions";

const modules = {
  toolbar: {
    container: new Array<any>(),
    handlers: {}
  },
  syntax: {
    highlight: (text: string) => {
      return hljs.highlightAuto(text).value
    }
  },
  clipboard: {
    matchVisual: true,
  }
};

const RichTextInput: React.FC<{ 
  id?: string, 
  className?: string, 
  name?: string, 
  defaultValue?: string, 
  visible?: boolean, 
  onChange: Function,
  imageHandler?: ((fileName: string, size: number, buffer: ArrayBuffer, base64: string | undefined) => Promise<string | undefined>)
}> = ({ 
  defaultValue = undefined, 
  onChange = undefined, 
  id = "editor", 
  name = "editor", 
  className = "",
  ...props
}) => {  
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
  const theme = getAppTheme();
  const InputRef = React.createRef<HTMLInputElement>();
  
  useEffect(() => {
    hljs.configure({
      languages: theme.Highlight?.Languages
    });
    if(window) (window as any).hljs = hljs

    var toolbar: any = modules.toolbar;
    if(theme.Quill?.Toolbar) toolbar.container = theme.Quill?.Toolbar
    toolbar.handlers.image = imageHandler
  }, [])

  function imageHandler (this: { quill: any; }) {
    var quill = this.quill;
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // When a file is selected
    input.onchange = () => {
      if(!quill || !input.files || input.files.length == 0)  return;
      if(!quill || !quill.editor) return;

      const file = input.files[0];
      const range = quill.getSelection(true);
      readUploadedFile(input.files[0], (name, size, base64, buffer) => {
        if(!props.imageHandler) return;

        var promise = props.imageHandler(file.name, file.size, buffer, base64);
        if(!promise){
          quill.insertEmbed(range.index, "image", base64);
        }
        else{
          promise.then((url) => {
            if(url) quill.insertEmbed(range.index, "image", url);
          });
        }
      })   
    };
  }
  
  return (
    <>
      <input onChange={(e) => onChange && onChange(e)} ref={InputRef} type="hidden" id={id} name={name}/>
      <ReactQuill 
        value={defaultValue}
        className={className}
        formats={theme.Quill?.Formats}
        modules={modules}
        onChange={(value, delta, source, editor) => {
          if(InputRef && InputRef.current && window){
            InputRef.current.value = value;
            var event: any = {currentTarget: InputRef.current,  bubbles: true };
            onChange && onChange(event);
          }
        }}
      />
    </>
  );
}
export default RichTextInput;