import { loopInRange } from "../../Extensions/ArrayExtensions";
import Link from "next/link";
import React from "react";
import Select from "../Inputs/SelectInput";
import Label from "../Label";
import { formatString } from "../../Extensions/StringExtensions";
import { getImageComponent } from "../Image/Extensions";
const Pagination: React.FC<PaginationProps> = ({
  nextText = undefined,
  prevText = undefined,
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
  id,
}) => {
  if (visible === false || datacount <= 0 || totalDatacount <= 0) return <></>;

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
  var visiblePagecount = 3;
  if (linkedPageCount >= visiblePagecount) {
    var endIndex = page + 3 > linkedPageCount ? linkedPageCount : page + 3;
    var startIndex = endIndex - visiblePagecount;
    if (startIndex <= 0) {
      startIndex = 1;
      endIndex = visiblePagecount;
    }
  }
  return (
    <div id={id} className="oph-pagination">
      {pagesTitle && (
        <span className="oph-pagination-title">
          <strong className="text-indigo-900">
            {formatString(
              pagesTitle,
              `${(page - 1) * pageSize + datacount}`,
              `${totalDatacount}`
            )}
          </strong>
        </span>
      )}
      <div className="oph-pagination-list">
        {startIndex > 1 && (
          <Link
            href={getPageLink(1)}
            onClick={(e) => onPageChange(e, 1)}
            className="oph-pagination-list-item"
          >
            {getImageComponent({
              name: "arrow-left",
              color: "#75819E",
              fill: "none",
              size: 16,
            })}
            <span>{prevText}</span>
          </Link>
        )}
        <ul className="oph-pagination-list-items">
          {loopInRange(startIndex, endIndex, (i) => {
            return (
              <Link
                href={getPageLink(i)}
                onClick={(e) => onPageChange(e, i)}
                aria-current={page === i ? "page" : undefined}
                className={`oph-pagination-list-items${page === i ? "-selected" : ""}`}
              >
                {i}
              </Link>
            );
          })}
        </ul>
        {endIndex < linkedPageCount && (
          <Link
            href={getPageLink(linkedPageCount)}
            onClick={(e) => onPageChange(e, linkedPageCount)}
            className={"oph-pagination-list-item"}
          >
            <span>{nextText}</span>
            {getImageComponent({
              name: "arrow-right",
              color: "#75819E",
              fill: "none",
              size: 16,
            })}
          </Link>
        )}
      </div>
      {pageSizes && pageSizes.length > 0 && (
        <div className="oph-pagination-pagesize">
          {pageSizeSelectionText && <Label value={pageSizeSelectionText} />}
          <Select
            className="oph-pagination-pagesize-select"
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

var paginationProps: {
  totalDatacount: number;
  datacount: number;
  page: number;
  pageSize: number;
  pageSizes?: Array<number>;
  visible?: boolean;
  pagesTitle?: string;
  nextText?: string;
  prevText?: string;
  pageSizeSelectionText?: string;
  pageUrl: string;
  onChange?: Function;
  onPageSizeChange?: Function;
  children?: React.ReactNode;
  id?: string;
};
export type PaginationProps = typeof paginationProps;
