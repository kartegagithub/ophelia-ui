import FileData, { convertToFileData } from "../../Models/FileData";
import { getAppTheme } from "../../AppTheme";
import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { clone, findInArray, getFileName, removeAtIndex, removeFileFromFileList, selectDefaultValues } from "../../Extensions/";

const FileInput: React.FC<InputHTMLAttributes<HTMLInputElement> & {
  previewSize?: string,
  sizeKey?: string
}> = ({ 
  onChange = undefined,
  placeholder = "Select file",
  value = undefined,
  defaultValue = undefined,
  previewSize = "Original",
  sizeKey = "size",
  type = undefined, 
  className = undefined,
  ...props
}) => { 
    const [selectedFiles, setSelectedFiles] = useState(new Array<FileData>())
    const FileRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(onChange) onChange(e)
      if(e.target.files && e.target.files.length > 0){
        var arr = new Array<FileData>();
        for (let index = 0; index < e.target.files.length; index++) {
          const file = e.target.files[index];
          convertToFileData(file, (data) => {
            arr.push(data);
            setSelectedFiles(arr);
          })
        }
      }
      else
      setSelectedFiles([])
    }
    useEffect(() => {
      var fileParameter: Array<any> = selectDefaultValues(value, "");
      if(!fileParameter || fileParameter.length == 0) fileParameter = selectDefaultValues(defaultValue, "");
      var initialValueSet = value != undefined || defaultValue != undefined
      if(fileParameter && fileParameter.length > 0){
        var files: Array<FileData> = new Array<FileData>();
        for (let index = 0; index < fileParameter.length; index++) {
          if(!fileParameter[index]) continue;

          if(typeof fileParameter[index] == "object") files.push(fileParameter[index])
          else if(typeof fileParameter[index] == "string"){
            var data = new FileData();
            data.FilePath = fileParameter[index];
            if(data.FilePath && data.FilePath.indexOf("{") > -1){
              sizeKey = sizeKey ?? "size";
              previewSize = previewSize ?? "Original";
              data.FilePath = data.FilePath.replace(`{${sizeKey}}`, previewSize)
            }
            data.FileName = getFileName(data.FilePath);
            files.push(data)
          }
        }
        setSelectedFiles(files)
      }
      else if(initialValueSet)
        setSelectedFiles([])
    }, [value, defaultValue])
    
    const onPreviewClick = (e: React.MouseEvent<SVGSVGElement>, file: FileData) => {
      e.preventDefault();
      if(file.Base64Data){
        var image = new Image();
        image.src = file.Base64Data;
        var w = window.open("");
        if(!w) return;

        w.document.write(image.outerHTML);
        w.document.close();
      }
      else if(file.FilePath){
        var w = window.open(file.FilePath);
      }
      else if(file.FileName){
        var w = window.open(file.FileName);
      }
    }
    const onRemoveClick = (e: React.MouseEvent<SVGSVGElement>, file: FileData) => {
      e.preventDefault();
      if(!selectedFiles) return;
      var item = findInArray(selectedFiles, file, "FileName")
      if(item.index > -1){
        var arr = clone(selectedFiles)
        removeAtIndex(arr, item.index);
        removeFileFromFileList(FileRef.current, file.FileName)
        setSelectedFiles(arr);
      }
    }
    const onUploadClick = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      FileRef.current?.click()
    }
    const renderSelectedFiles = () => {
      if(selectedFiles && selectedFiles.length > 0){
        return <div className="block cursor-pointer">{selectedFiles.map((file, i) => {
          return <div key={i} className="flex place-content-between border-l-4 border-slate-400 py-1">
            <label onClick={(e) => onUploadClick(e)} className="ml-2">{file.FileName}</label>
            <div className="flex">
              <EyeIcon width={18} height={18} className="pr-1 cursor-pointer" onClick={(e) => onPreviewClick(e, file)}></EyeIcon>
              <XMarkIcon width={18} height={18} className="cursor-pointer" onClick={(e) => onRemoveClick(e, file)}></XMarkIcon>
            </div>
          </div>
        })}
        </div>
      }
      return <div onClick={(e) => onUploadClick(e)} className="cursor-pointer">{placeholder}</div>
    }
    
    return (
      <>
        <input type="file"
          style={{ display: "none" }}
          onChange={(e) => onFileChange(e)}
          {...props}
          ref={FileRef}
        />
        <div className={className ?? getAppTheme().Inputs?.file}>
          {renderSelectedFiles()}
        </div>
      </>
    );
  }

  export default FileInput;