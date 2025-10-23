import { loopInRange } from "../../Extensions/ArrayExtensions";
import Link from "next/link";
import React from "react";
import Select from "../Inputs/SelectInput";
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
  totalCounText,
}) => {
  if (visible === false || datacount <= 0 || totalDatacount <= 0) return <></>;

  const linkedPageCount = Math.ceil(totalDatacount / pageSize);
  const visiblePages = 3;
  const halfVisible = Math.floor(visiblePages / 2);

  let startIndex = Math.max(1, page - halfVisible);
  let endIndex = Math.min(linkedPageCount, page + halfVisible);

  if (page <= halfVisible) {
    endIndex = Math.min(visiblePages, linkedPageCount);
  }

  if (page + halfVisible > linkedPageCount) {
    startIndex = Math.max(1, linkedPageCount - visiblePages + 1);
  }

  const onPageChange = (e: any, newPage: number) => {
    e.preventDefault();
    if (newPage < 1 || newPage > linkedPageCount) return;
    if (onChange) onChange(e, newPage);
  };

  const onPageSizeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    if (onPageSizeChange) onPageSizeChange(e, parseInt(e.target.value));
  };

  const getPageLink = (i: number) => {
    return pageUrl ? `${pageUrl}?page=${i}` : "javascript:void(0)";
  };

  return (
    <div id={id} className="oph-pagination">
      <div className="oph-pagination-list">
        <div className="oph-pagination-list-wrapper">
          <span>{prevText}</span>
          <button
            onClick={(e) => onPageChange(e, page - 1)}
            className={`oph-pagination-list-wrapper-directions ${
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={page === 1}
          >
            {getImageComponent({
              name: "azChevronLeft",
              color: "#A5A5A5",
              fill: "none",
              size: 20,
            })}
          </button>

          <ul className="oph-pagination-list-wrapper-numbers">
            {startIndex > 1 && (
              <>
                <Link
                  href={getPageLink(1)}
                  onClick={(e) => onPageChange(e, 1)}
                  className="oph-pagination-list-wrapper-numbers-item"
                >
                  1
                </Link>
                {startIndex > 2 && (
                  <span className="oph-pagination-list-wrapper-numbers-dots">...</span>
                )}
              </>
            )}

            {loopInRange(startIndex, endIndex, (i) => (
              <Link
                key={i}
                href={getPageLink(i)}
                onClick={(e) => onPageChange(e, i)}
                aria-current={page === i ? "page" : undefined}
                className={`oph-pagination-list-wrapper-numbers-item ${
                  page === i ? "oph-pagination-list-wrapper-numbers-item-selected" : ""
                }`}
              >
                {i}
              </Link>
            ))}

            {endIndex < linkedPageCount && (
              <>
                {endIndex < linkedPageCount - 1 && (
                  <span className="oph-pagination-list-wrapper-numbers-dots">...</span>
                )}
                <Link
                  href={getPageLink(linkedPageCount)}
                  onClick={(e) => onPageChange(e, linkedPageCount)}
                  className="oph-pagination-list-wrapper-numbers-item"
                >
                  {linkedPageCount}
                </Link>
              </>
            )}
          </ul>

          <button
            onClick={(e) => onPageChange(e, page + 1)}
            className={`oph-pagination-list-wrapper-directions ${
              page === linkedPageCount ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={page === linkedPageCount}
          >
            {getImageComponent({
              name: "azChevronRight",
              color: "#A5A5A5",
              fill: "none",
              size: 20,
            })}
          </button>
          <span>{nextText}</span>
        </div>
        {pageSizes && pageSizes.length > 0 && (
          <div className="oph-pagination-pagesize">
            <Select
              className="oph-pagination-pagesize-select"
              id="pagesize"
              name="pagesize"
              value={pageSize.toString()}
              options={pageSizes?.map((i) => ({
                text: i,
                value: i.toString(),
              }))}
              onChange={(e) => onPageSizeChanged(e)}
            />
            <p className="oph-pagination-pagesize-select-label">{`/${pageSizeSelectionText}`}</p>
          </div>
        )}
      </div>

      {pagesTitle && (
        <span className="oph-pagination-title">
          {totalCounText}
          <strong>
            {formatString(
              pagesTitle,
              `${(page - 1) * pageSize + 1}`,
              `${totalDatacount}`
            )}
          </strong>
        </span>
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
  totalCounText?: string;
};
export type PaginationProps = typeof paginationProps;
