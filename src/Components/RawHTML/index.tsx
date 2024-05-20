import { removeHtml, sanitizeHtml } from "../../Extensions/StringExtensions";
import React from "react";
const RawHTML: React.FC<RawHTMLProps> = ({ 
  html = undefined,
  tag = "span",
  clearHtml = false,
  sanitize = true
}) => {  
  if(!html) return <></>
  if(typeof html == "object" || typeof html == "symbol" || typeof html == "function") return <>{html}</>

  var htmlText: string | null | undefined = "";
  if(typeof html != "string") htmlText = html.toString();
  else htmlText = html;
  
  var containsHtml = htmlText.indexOf("<") > -1 || htmlText.indexOf("=") > -1 || htmlText.indexOf(":") > -1
  if(containsHtml){
    if(clearHtml === true) htmlText = removeHtml(htmlText)
    if(sanitize === true) htmlText = sanitizeHtml(htmlText as string)
  }

  if(tag == "span") return <span dangerouslySetInnerHTML={{__html: htmlText ?? ""}} />
  if(tag == "label") return <label dangerouslySetInnerHTML={{__html: htmlText ?? ""}} />
  return (
    <div dangerouslySetInnerHTML={{__html: htmlText ?? ""}} />
  );
}
export default RawHTML;

var rawHTMLProps : { 
  html?: string | React.JSX.Element | React.ReactNode,
  tag?: "span" | "div" | "label",
  clearHtml?: boolean
  sanitize?: boolean
}
export type RawHTMLProps = typeof rawHTMLProps