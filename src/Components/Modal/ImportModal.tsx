import AppClient from "../../AppClient";
import {
    Alert,
    Form,
    InputField,
    Modal
  } from "../../Components";
  import { getFileName } from "../../Extensions"
  import FileData, { convertToFileData } from "../../Models/FileData";
  import { ArrowDownCircleIcon, CloudArrowUpIcon } from "@heroicons/react/24/solid";
  import React, { useEffect, useState } from "react";
  
  const ImportModal: React.FC<{
    fileName?: string;
    sampleFilePath?: string | React.JSX.Element;
    message?: string | React.JSX.Element;
    accept?: string;
    multiple?: boolean;
    onSubmit: (data: any, files: Array<FileData>, isValid: boolean) => void;
    children?: React.ReactNode;
    title?: string;
    AppClient?: AppClient;
    onVisibilityChange?: (visible: boolean) => void;
  }> = ({
    accept = ".xls, .xlsx",
    sampleFilePath = undefined,
    message = undefined,
    onVisibilityChange,
    fileName,
    AppClient,
    title,
    multiple = false,
    onSubmit,
    children,
  }) => {
      const onFormSubmit = async (e: any, data: any, isValid: boolean, fieldStates: Array<any>) => {
        if (fileName) {
          var files = data[fileName];
          if (files && files.constructor && files.constructor.name == "FileList") {
            var arr = new Array<FileData>();
            for (let index = 0; index < files.length; index++) {
              const file = files[index];
              convertToFileData(file, (data) => {
                arr.push(data);
                if (index == files.length - 1 && onSubmit) onSubmit(data, arr, isValid);
              })
            }
            delete data[fileName];
          }
        }
        return false;
      };
      const modalButtons: any = [
        {
          text: AppClient?.Translate("Upload"),
          closeModalOnClick: false,
          type: "submit",
          className: "bg-blue-500 p-2.5 rounded-lg border border-gray-200 text-white text-sm"
        },
      ];
      return (
        <Form
          formData={{}}
          onSubmit={(e: any, data: any, isValid: boolean, fieldStates: Array<any>) => onFormSubmit(e, data, isValid, fieldStates)}
          translateFn={(key) => AppClient?.Translate(key) ?? key}
        >
          <Modal
            dismissOnBackdropClick={false}
            defaultOpen={true}
            title={title}
            center={true}
            className="oph-import-modal"
            buttons={modalButtons}
            dismissText={AppClient?.Translate("Cancel")}
            onCurrentValue={(val: boolean) =>
              onVisibilityChange && onVisibilityChange(val)
            }
          >
            {(sampleFilePath || message) && (
              <Alert type="info">
                <div className="ml-3">
                  {message && <div>{message}</div>}
                  {sampleFilePath && typeof sampleFilePath === "string" && <a target="_blank" href={sampleFilePath} className="flex mt-4">
                    <ArrowDownCircleIcon
                      className="mt-1"
                      width={16}
                      height={16}
                    ></ArrowDownCircleIcon>
                    <div className="ml-1">
                      {getFileName(sampleFilePath)}
                    </div>
                  </a>}
                  {sampleFilePath && typeof sampleFilePath !== "string" && sampleFilePath}
                </div>
              </Alert>
            )}
            {fileName && (
              <InputField
                type="file"
                multipleSelection={multiple}
                name={fileName}
                accept={accept}
              ></InputField>
            )}
            {children}
          </Modal>
        </Form>
      );
    };
  
  export default ImportModal;
  