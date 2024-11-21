import { removeHtml, sanitizeHtml } from "../../Extensions/StringExtensions";
import React from "react";
const RawHTML: React.FC<RawHTMLProps> = ({
  id,
  html = undefined,
  tag = "span",
  clearHtml = false,
  className = "oph-rawHtml",
  sanitize = true,
  replaceNewLines = false,
}) => {
  if (!html) return <></>;
  if (
    typeof html == "object" ||
    typeof html == "symbol" ||
    typeof html == "function"
  )
    return <>{html}</>;

  var htmlText: string | null | undefined = "";
  if (typeof html != "string") htmlText = html.toString();
  else htmlText = html;

  if (replaceNewLines)
    htmlText = htmlText.replaceAll("\n", "<br />").replaceAll("\r", "<br />");
  var containsHtml =
    htmlText.indexOf("<") > -1 ||
    htmlText.indexOf("=") > -1 ||
    htmlText.indexOf(":") > -1;
  if (containsHtml) {
    if (clearHtml === true) htmlText = removeHtml(htmlText);
    if (sanitize === true) htmlText = sanitizeHtml(htmlText as string);
  }

  if (tag == "span")
    return (
      <span
        id={id}
        className={className}
        dangerouslySetInnerHTML={{ __html: htmlText ?? "" }}
      />
    );
  if (tag == "label")
    return (
      <label
        id={id}
        className={className}
        dangerouslySetInnerHTML={{ __html: htmlText ?? "" }}
      />
    );
  return <div id={id} dangerouslySetInnerHTML={{ __html: htmlText ?? "" }} />;
};
RawHTML.displayName = "RawHTML";
export default RawHTML;

var rawHTMLProps: {
  id?: string;
  html?: string | React.JSX.Element | React.ReactNode;
  tag?: "span" | "div" | "label";
  className?: string;
  clearHtml?: boolean;
  sanitize?: boolean;
  replaceNewLines?: boolean;
};
export type RawHTMLProps = typeof rawHTMLProps;
