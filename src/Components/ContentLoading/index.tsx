import AppClient from "../../AppClient";
import { getImageComponent } from "../Image";
import React from "react";
import Spinner from "../../Components/Spinner";
const ContentLoading: React.FC<ContentLoadingProps> = ({
  id,
  text = undefined,
  image = undefined,
  loading = false,
  children = undefined,
  showDefaultText = true,
  showDefaultSpinner = true,
  ...props
}) => {
  return (
    <div id={id} className="oph-contentLoading">
      {loading && (
        <div className="oph-contentLoading-content">
          {image && getImageComponent(image)}
          {!image && showDefaultSpinner && <Spinner />}
          {(text || showDefaultText) && (
            <span>
              {text ?? props.appClient?.Translate("ProcessingPleaseWait")}
            </span>
          )}
        </div>
      )}
      {children && (
        <div
          className={
            loading
              ? "oph-contentLoading-partialOpac"
              : "oph-contentLoading-fullOpac"
          }
        >
          {children}
        </div>
      )}
    </div>
  );
};
export default ContentLoading;

var contentLoadingProps: {
  appClient?: AppClient;
  id?: string;
  text?: string;
  loading?: boolean;
  showDefaultText?: boolean;
  showDefaultSpinner?: boolean;
  image?: string | any | React.JSX.Element;
  children?: React.ReactNode;
};
export type ContentLoadingProps = typeof contentLoadingProps;
