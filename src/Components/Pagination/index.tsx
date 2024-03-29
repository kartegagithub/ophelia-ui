import { loopInRange } from "../../Extensions/ArrayExtensions";
import Link from "next/link";
import React, { useState } from "react";
import Select from "../Inputs/SelectInput";
import Label from "../Label";
import { getAppTheme } from "../../AppTheme";
import { formatString } from "../../Extensions/StringExtensions";
import { getImageComponent } from "../Image/Extensions";
const Pagination: React.FC<PaginationProps> = ({
  totalDatacount,
  datacount,
  pageUrl,
  pageSize = 25,
  onPageSizeChange,
  pageSizeSelectionText,
  onChange,
  pagesTitle,
  visible = true,
  page = 1,
  pageSizes = [25, 50, 100],
  children,
  theme = undefined
}) => {
  if (visible === false || datacount <= 0 || totalDatacount <= 0) return <></>;

  const Theme = getAppTheme({Pagination: theme}).Pagination;

  const onPageChange = (e: any, i: number) => {
    e.preventDefault();
    if (onChange) onChange(e, i);
    return false;
  };
  const onPageSizeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    if (onPageSizeChange) onPageSizeChange(e, parseInt(e.target.value));
    return false;
  };
  const getPageLink = (i: number) => {
    var url = "";
    if (pageUrl) url = pageUrl;
    if (url) {
      return url;
    }
    return "javascript:void(0)";
  };
  var linkedPageCount = Math.ceil(totalDatacount / pageSize);
  var startIndex = 1;
  var endIndex = linkedPageCount;
  var visiblePagecount = 3
  if(linkedPageCount >= visiblePagecount){
    var endIndex = page + 3 > linkedPageCount ? linkedPageCount: page + 3;
    var startIndex = endIndex - visiblePagecount
    if(startIndex <= 0){
      startIndex = 1
      endIndex = visiblePagecount;
    }
  }
  return (
    <div className={Theme?.RootClass}>
      {pagesTitle && <span className={Theme?.PagesTitleClass}>
        Showing <strong className="text-blueZodiac">
          {formatString(`${datacount >= pageSize ? (page - 2) * pageSize + datacount : (page - 1) * pageSize + datacount} - ${(page - 1) * pageSize + datacount}`)}</strong> of {formatString(`${ totalDatacount}`)} results
      </span>}
      <div className="flex items-center gap-6">
        {startIndex >  1 && 
          <Link
            href={getPageLink(1)}
            onClick={(e) => onPageChange(e, 1)}
            className={Theme?.PageListItemClass}
          >
            {getImageComponent( {name: "arrow-left", color: "#75819E", fill: "none", size: 16})}
            <span>Prev</span>
          </Link>
        }
      <ul className={Theme?.PageListClass}>
        {loopInRange(startIndex, endIndex, (i) => {
          return (
            <Link
              href={getPageLink(i)}
              onClick={(e) => onPageChange(e, i)}
              aria-current={page === i? "page": undefined}
              className={(page === i ? Theme?.PageListItemSelectedClass : Theme?.PageListItemClass)}
            >
              {i}
            </Link>
          );
        })}
      </ul>
        {endIndex < linkedPageCount && 
          <Link
            href={getPageLink(linkedPageCount)}
            onClick={(e) => onPageChange(e, linkedPageCount)}
            className={Theme?.PageListItemClass}
          >
            <span>Next</span>
            {getImageComponent( {name: "arrow-right", color: "#75819E", fill: "none", size: 16})}
          </Link>
        }
      </div>
      {pageSizes && pageSizes.length > 0 && (
        <div className={Theme?.PageSizeSelectionRootClass}>
          {pageSizeSelectionText && <Label value={pageSizeSelectionText} />}
          <Select
            className={Theme?.PageSizeSelectionClass}
            id="pagesize"
            name="pagesize"
            value={pageSize.toString()}
            options={pageSizes?.map((i) => {
              return { text: i.toString(), value: i.toString() };
            })}
            onChange={(e) => onPageSizeChanged(e)}
          ></Select>
        </div>
      )}
    </div>
  );
};
export default Pagination;

var paginationProps : {
  totalDatacount: number;
  datacount: number;
  page: number;
  pageSize: number;
  pageSizes?: Array<number>;
  visible?: boolean;
  pagesTitle?: string;
  pageSizeSelectionText?: string;
  pageUrl: string;
  onChange?: Function;
  onPageSizeChange?: Function;
  children?: React.ReactNode;
  theme?: PaginationTheme
}
export type PaginationProps = typeof paginationProps

var paginationTheme: {
  RootClass?: string,
  PageListClass?: string,
  PageListItemClass?: string,
  PageListItemSelectedClass?: string,
  PageSizeSelectionRootClass?: string,
  PageSizeSelectionClass?: string,
  PagesTitleClass?: string,
}
export type PaginationTheme = typeof paginationTheme