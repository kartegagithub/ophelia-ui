import FileData, { convertToFileData } from "../../Models/FileData";
import { getAppTheme } from "../../AppTheme";
import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  clone,
  findInArray,
  getFileName,
  removeAtIndex,
  removeFileFromFileList,
  selectDefaultValues,
} from "../../Extensions/";
import { IconProps } from "../Icon";
import { getImageComponent } from "../Image";

const FileInput: React.FC<
  InputHTMLAttributes<HTMLInputElement> & {
    previewSize?: string;
    sizeKey?: string;
    languageID?: number;
    rightIcon?: React.JSX.Element | string | undefined | IconProps;
    leftIcon?: React.JSX.Element | string | undefined | IconProps;
    iconText?: string;
    bodyClassName?: string;
    iconWrapperStyle?: string;
    withEyeCls?: string;
    placeholderStyle?: string;
    fileTypeWithButton?: boolean;
  }
> = ({
  onChange = undefined,
  placeholder = "Select file",
  value = undefined,
  defaultValue = undefined,
  previewSize = "Original",
  sizeKey = "size",
  type = undefined,
  className = undefined,
  bodyClassName = undefined,
  iconWrapperStyle = undefined,
  placeholderStyle = undefined,
  withEyeCls = undefined,
  iconText = undefined,
  languageID = undefined,
  rightIcon = undefined,
  leftIcon = undefined,
  fileTypeWithButton = false,
  ...props
}) => {
  const [selectedFiles, setSelectedFiles] = useState(new Array<FileData>());
  const [showPreview, setShowPreview] = useState(true);
  const FileRef: React.RefObject<HTMLInputElement> =
    React.createRef<HTMLInputElement>();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (e.target.files && e.target.files.length > 0) {
      var arr = new Array<FileData>();
      for (let index = 0; index < e.target.files.length; index++) {
        const file = e.target.files[index];
        convertToFileData(file, (data) => {
          arr.push(data);
          setSelectedFiles(arr);
        });
      }
      setShowPreview(true);
    } else setSelectedFiles([]);
  };
  useEffect(() => {
    var fileParameter: Array<any> = selectDefaultValues(value, "");
    if (!fileParameter || fileParameter.length == 0)
      fileParameter = selectDefaultValues(defaultValue, "");
    var initialValueSet = value != undefined || defaultValue != undefined;
    if (fileParameter && fileParameter.length > 0) {
      var files: Array<FileData> = new Array<FileData>();
      for (let index = 0; index < fileParameter.length; index++) {
        if (!fileParameter[index]) continue;

        if (typeof fileParameter[index] == "object")
          files.push(fileParameter[index]);
        else if (typeof fileParameter[index] == "string") {
          var data = new FileData();
          data.FilePath = fileParameter[index];
          data.StatusID = 1;
          if (languageID) data.LanguageID = languageID;
          if (data.FilePath && data.FilePath.indexOf("{") > -1) {
            sizeKey = sizeKey ?? "size";
            previewSize = previewSize ?? "Original";
            data.FilePath = data.FilePath.replace(`{${sizeKey}}`, previewSize);
          }
          data.FileName = getFileName(data.FilePath);
          files.push(data);
        }
      }
      setSelectedFiles(files);
    } else if (initialValueSet) setSelectedFiles([]);
  }, [value, defaultValue]);

  const onPreviewClick = (
    e: React.MouseEvent<SVGSVGElement>,
    file: FileData
  ) => {
    e.preventDefault();
    if (file.Base64Data) {
      var image = new Image();
      image.src = file.Base64Data;
      var w = window.open("");
      if (!w) return;

      w.document.write(image.outerHTML);
      w.document.close();
    } else if (file.FilePath) {
      var w = window.open(file.FilePath);
    } else if (file.FileName) {
      var w = window.open(file.FileName);
    }
  };
  const onRemoveClick = (
    e: React.MouseEvent<SVGSVGElement>,
    file: FileData
  ) => {
    e.preventDefault();
    if (!selectedFiles) return;
    var item = findInArray(selectedFiles, file, "FileName");
    if (item.index > -1) {
      var arr = clone(selectedFiles);
      removeAtIndex(arr, item.index);
      removeFileFromFileList(FileRef.current, file.FileName);
      setSelectedFiles(arr);
    }
    setShowPreview(false);
    var event: any = {
      currentTarget: FileRef.current,
      target: FileRef.current,
      deletedFile: item.value,
      bubbles: true,
    };
    if (onChange) onChange(event);
  };
  const onUploadClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    FileRef.current?.click();
  };
  const renderSelectedFiles = () => {
    if (selectedFiles && selectedFiles.length > 0 && showPreview) {
      return (
        <div className="block cursor-pointer w-full ">
          {selectedFiles.map((file, i) => {
            return (
              <div
                key={i}
                className={`flex items-center justify-between py-1`}
                // className={`flex items-center justify-between ${fileTypeWithButton ? "border-none" : "border-l-4"} border-slate-400 py-1`}
              >
                <label onClick={(e) => onUploadClick(e)} className="ml-2">
                  {fileTypeWithButton ? (
                    <div className={placeholderStyle}>{placeholder}</div>
                  ) : (
                    file.FileName
                  )}
                </label>
                <div className={`flex items-center ${withEyeCls ?? withEyeCls}`}>
                  <EyeIcon
                    width={18}
                    height={18}
                    className="pr-1 cursor-pointer"
                    onClick={(e) => onPreviewClick(e, file)}
                  ></EyeIcon>
                  {/* <img src={file.Base64Data} width={32} height={32}/> */}
                  {fileTypeWithButton ? (
                    <div
                      className={iconWrapperStyle}
                      onClick={(e: any) => onUploadClick(e)}
                    >
                      {iconText} {getImageComponent(rightIcon)}
                    </div>
                  ) : (
                    <XMarkIcon
                      width={18}
                      height={18}
                      className="cursor-pointer"
                      onClick={(e) => onRemoveClick(e, file)}
                    ></XMarkIcon>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <div
        onClick={(e) => onUploadClick(e)}
        className={`${bodyClassName ?? "flex items-center justify-between w-full"} cursor-pointer`}
      >
        <div className={placeholderStyle}>{placeholder}</div>

        <div className={iconWrapperStyle}>
          {leftIcon && getImageComponent(leftIcon)}
          {iconText}
          {rightIcon && getImageComponent(rightIcon)}
        </div>
      </div>
    );
  };

  return (
    <>
      <input
        type="file"
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
};

export default FileInput;
