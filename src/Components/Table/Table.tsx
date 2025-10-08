import React, { useEffect, useState } from "react";
import TableClass from "./TableClass";
import TableColumnClass from "./TableColumnClass";
import InputField from "../InputFields/inputField";
import {
  convertToBool,
  enumToArray,
  getObjectValue,
  setObjectValue,
} from "../../Extensions/ReflectionExtensions";
import { getAppTheme } from "../../AppTheme";
import { getImageComponent } from "../Image/Extensions";
import {
  clone,
  getFormattedDateString,
  isNullOrEmpty,
  padLeft,
  removeHtml,
  sanitizeHtml,
} from "../../Extensions/StringExtensions";
import Dropdown from "../Dropdown";
import { DataComparison } from "../../Binders/CollectionBinder/query/queryFilter";
import Select from "../Inputs/SelectInput";
import AppClient from "../../AppClient";
import { IconProps } from "../Icon";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import Checkbox from "../Inputs/CheckboxInput";
import RawHTML from "../RawHTML";
import Image from "../Image/Image";
import { findInArray, formatDataToString, getCaseLocale } from "../../Extensions";
import CheckboxInput from "../Inputs/CheckboxInput";
import { getCurrentRegionSetting } from "../../Localization";
import ISanitizeOptions from "../../Models/ISanitizeOptions";
const Table: React.FC<TableProps> = React.memo(
  ({
    refreshKey,
    id,
    table,
    theme,
    data,
    appClient,
    adjustHeight = true,
    listener,
    selectedRowIndex = -1,
    hierarchicalDisplay = false,
    hierarchyPropertyName = undefined,
    hierarchyParentValue = undefined,
    allowFiltering = true,
    allowSorting = true,
    applyRowValidation = false,
    className = undefined,
    focusForNewRow = undefined,
    emptyColumnToBeginning = false,
    emptyColumnToEnd = false,
    checkboxes = false,
    checkedItems = undefined,
    columnData,
    isHeaderSticky = false,
  }) => {
    var [selectedRow, setSelectedRow] = useState(selectedRowIndex);
    var [selectedCell, setSelectedCell] = useState([-1, -1]);
    var [editingCell, setEditingCell] = useState<TableColumnClass>();
    var [hoveredCell, setHoveredCell] = useState([-1, -1]);
    var [selectedColumn, setSelectedColumn] = useState(-1);
    var [filteredColumns, setFilteredColumns] = useState([""]);
    var [selectedColumnToFilter, setSelectedColumnToFilter] = useState(
      new TableColumnClass()
    );
    var [sortedColumn, setSortedColumn] = useState(
      table?.Columns.find((column) => column.IsSorted === true)?.PropertyName
    );
    var [sortedColumnDirection, setSortedColumnDirection] = useState(
      table?.Columns.find((column) => column.IsSorted === true)?.SortDirection
    );
    const Theme = getAppTheme({ Table: theme }).Table;
    const containerRef = React.createRef<HTMLDivElement>();
    const topScrollRef = React.createRef<HTMLDivElement>();
    const ComparisonSigns = [
      {
        text: appClient?.Translate("Equal"),
        comparison: DataComparison.Equal,
        types: ["numeric", "date", "time", "datetime", "text", "month", "week"],
        sign: "=",
        defaultFor: ["numeric", "date", "time", "datetime", "month", "week"],
      },
      {
        text: appClient?.Translate("Different"),
        comparison: DataComparison.Different,
        types: ["numeric", "date", "time", "datetime", "text", "month", "week"],
        sign: "!=",
      },
      {
        text: appClient?.Translate("Greater"),
        comparison: DataComparison.Greater,
        types: ["numeric", "date", "time", "datetime", "month", "week"],
        sign: ">",
      },
      {
        text: appClient?.Translate("Less"),
        comparison: DataComparison.Less,
        types: ["numeric", "date", "time", "datetime", "month", "week"],
        sign: "<",
      },
      {
        text: appClient?.Translate("GreaterOrEqual"),
        comparison: DataComparison.GreaterOrEqual,
        types: ["numeric", "date", "time", "datetime", "month", "week"],
        sign: ">=",
      },
      {
        text: appClient?.Translate("LessOrEqual"),
        comparison: DataComparison.LessOrEqual,
        types: ["numeric", "date", "time", "datetime", "month", "week"],
        sign: "<=",
      },
      {
        text: appClient?.Translate("Between"),
        comparison: DataComparison.Between,
        types: ["text"],
        sign: "*.*",
      },
      {
        text: appClient?.Translate("StartsWith"),
        comparison: DataComparison.StartsWith,
        types: ["text"],
        sign: ".*",
      },
      {
        text: appClient?.Translate("EndsWith"),
        comparison: DataComparison.EndsWith,
        types: ["text"],
        sign: "*.",
      },
      {
        text: appClient?.Translate("Contains"),
        comparison: DataComparison.Contains,
        types: ["text"],
        sign: "*.*",
        defaultFor: ["text"],
      },
    ];

    const onKeyDown = (e: any) => {
      if(!table || selectedCell[0] == -1 || (e.key != "Escape" && e.key != "Enter")) return;

      var rowIndex = selectedCell[0];
      var columnIndex = selectedCell[1];

      var row = data?.find((item) => item.viewOrderIndex == rowIndex);
      var column = table.Columns.filter((column) => isColumnVisible(column)).find((column, index) => index == columnIndex)

      setEditingCell(undefined);
      setSelectedCell([-1, -1]);
      if (e.key == "Escape"){
        if (listener && listener.onCellValueCancelled)
          listener.onCellValueCancelled(row, column, rowIndex, columnIndex);
      }
      else if (e.key == "Enter") {
        if (listener && listener.onCellValueChanged)
          listener.onCellValueChanged(
            row,
            column,
            rowIndex,
            columnIndex,
            e.key
          );
      }
    };
    useEffect(() => {
      window.addEventListener("keydown", onKeyDown, true);
      return () => window.removeEventListener("keydown", onKeyDown, true);
    }, [onKeyDown]);

    const recalculateHeight = () => {
      if (adjustHeight && containerRef.current) {
        if (selectedColumnToFilter && selectedColumnToFilter.PropertyName)
          containerRef.current.classList.add("filter-opened");
        else containerRef.current.classList.remove("filter-opened");

        for (
          let index = containerRef.current.classList.length - 1;
          index >= 0;
          index--
        ) {
          const element = containerRef.current.classList[index];
          if (element && element.indexOf("editing-input") > -1)
            containerRef.current.classList.remove(element);
        }

        if (editingCell) {
          containerRef.current.classList.add("editing-input");
          if (editingCell.Filtering)
            containerRef.current.classList.add(
              "editing-input-type-" + editingCell.Filtering.Type
            );
          else
            containerRef.current.classList.add(
              "editing-input-type-" + editingCell.Type
            );
        }
      }
    };
    useEffect(() => {
      recalculateHeight();
    }, [selectedColumnToFilter, editingCell]);

    useEffect(() => {
      onTableScroll();
      if (data && focusForNewRow == true) {
        var rowIndex: number = 0;
        var columnIndex: number = 0;
        var newRow = data.find((item, i) => {
          if (item.isNewRow == true) rowIndex = i;
          return item.isNewRow == true;
        });

        if (newRow) {
          var firstEditableColumn = table?.Columns.find((col, i) => {
            if (col.AllowEditingOnNewRow != false) columnIndex = i;
            return col.AllowEditingOnNewRow != false;
          });
          if (firstEditableColumn) {
            onCellClick(
              undefined,
              newRow,
              firstEditableColumn,
              rowIndex,
              columnIndex
            );
          }
        }
      }
    }, []);

    if (!table) return <div></div>;
    const isColumnVisible = (column: TableColumnClass) => {
      if (typeof column.Visible == "boolean") return column.Visible !== false;
      else if (column.Visible) {
        var fn: any = column.Visible;
        return fn();
      }
      return true;
    };

    const onCheckAllChange = (e: any) => {
      var checked = e.target.checked;
      if (listener?.setCheckedItems)
        listener?.setCheckedItems(undefined, -1, checked ? "ALL" : "NONE");
    };

    const renderColumns = () => {
      return (
        <tr className="oph-table-columns">
          {emptyColumnToBeginning == true && <th></th>}
          {checkboxes == true && (
            <th className={`px-4 py-2`}>
              <CheckboxInput
                onChange={(e) => onCheckAllChange(e)}
              ></CheckboxInput>
            </th>
          )}
          {hierarchycalDisplayEnabled() && <th></th>}
          {table.Columns.filter((column) => isColumnVisible(column)).map(
            (column, index) => {
              return (
                <th
                  key={index}
                  className={`oph-table-columns-column ${
                    column.Freeze ? "sticky-col" : ""
                  } col-${index} ${selectedColumn == index ? "selected" : ""}`}
                >
                  <div className="oph-table-columns-column-rootComponent">
                    <div className="oph-table-columns-column-title">
                      <RawHTML html={column.HeaderText} />
                    </div>
                    <div className="oph-table-columns-column-buttons">
                      {allowSorting && column.AllowSorting !== false && (
                        <>
                          <span
                            onClick={(e) => onSortingClick(e, column)}
                            style={{ cursor: "pointer" }}
                          >
                            {!column.SortDirection &&
                              getImageComponent(Theme?.Icons?.NotSorted)}
                            {column.IsSorted &&
                              column.SortDirection === "DESC" &&
                              getImageComponent(Theme?.Icons?.DescSorted)}
                            {column.IsSorted &&
                              column.SortDirection === "ASC" &&
                              getImageComponent(Theme?.Icons?.AscSorted)}
                          </span>
                        </>
                      )}
                      {allowFiltering && column.AllowFiltering !== false && (
                        <>
                          <span
                            onClick={(e) => onFilteringClick(e, column)}
                            style={{ cursor: "pointer" }}
                          >
                            {!column.IsFiltered &&
                              getImageComponent(Theme?.Icons?.NotFiltered)}
                            {column.IsFiltered &&
                              getImageComponent(Theme?.Icons?.Filtered)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  {selectedColumnToFilter &&
                    selectedColumnToFilter.PropertyName ==
                      column.PropertyName &&
                    showFilterModal(selectedColumnToFilter, index)}
                </th>
              );
            }
          )}
          {emptyColumnToEnd == true && <th></th>}
        </tr>
      );
    };

    const setColumnFilterValue = (
      column: TableColumnClass,
      value: any,
      propName: string
    ) => {
      if (!column.Filtering) return;

      if (propName.indexOf("_low") > -1 || propName.indexOf("_high") > -1) {
        setComparison(column, DataComparison.Between);
        if (propName.indexOf("_low") > -1) column.Filtering.LowValue = value;
        else column.Filtering.HighValue = value;
        column.IsFiltered =
          !!column.Filtering.HighValue || !!column.Filtering.LowValue;
      } else if (value && value != "") {
        column.IsFiltered = true;
        if (column.Filtering) {
          var valueProp = column.PropertyName;
          if (column.Filtering?.RemoteDataSource?.ValueProp)
            valueProp = column.Filtering?.RemoteDataSource?.ValueProp;
          if (
            Array.isArray(value) &&
            value.length > 0 &&
            typeof value[0] == "object"
          ) {
            value = value.map((item) => {
              return getObjectValue(item, valueProp);
            });
          } else if (typeof value == "object") {
            if (column.Filtering?.RemoteDataSource?.ValueProp)
              value = getObjectValue(value, valueProp);
          }
          column.Filtering.Value = value;
        }
      } else {
        column.IsFiltered = false;
        if (column.Filtering) column.Filtering.Value = undefined;
      }
    };

    const ClearFilterValue = (column: TableColumnClass) => {
      column.IsFiltered = false;
      if (column.Filtering) {
        column.Filtering.Value = undefined;
        column.Filtering.LowValue = undefined;
        column.Filtering.HighValue = undefined;
      }
      SetFilteredColumnsState();
    };
    const SetFilteredColumnsState = () => {
      setFilteredColumns(
        table.Columns.map((item) =>
          item.IsFiltered === true && item.PropertyName ? item.PropertyName : ""
        )
      );
      // console.log(filteredColumns)
      if (listener?.onFilteringChanged)
        listener?.onFilteringChanged(table.Columns);
      setSelectedColumnToFilter({});
    };
    const setComparison = (column: TableColumnClass, val?: number) => {
      if (column.Filtering) column.Filtering.Comparison = val;
    };
    const showFilterModal = (column: TableColumnClass, columnIndex: number) => {
      var modalID = "filter-selection";
      var type = column.Filtering?.Type ?? column.Type ?? "NONE";
      if (type == "richtext" || type == "url") type = "text";
      if (type == "date" || type == "datetime") type = "daterange";
      if (type == "time") type = "timerange";

      var comparisons = ComparisonSigns.filter(
        (comp) => comp.types.indexOf(type) > -1
      ).map((comp) => {
        return {
          text: comp.text ?? comp.sign,
          value: comp.comparison.toString(),
        };
      });
      if (
        column.Filtering &&
        !column.Filtering?.Comparison &&
        comparisons.length > 0
      ) {
        var defaultComparison = ComparisonSigns.find(
          (comp) => comp.defaultFor && comp.defaultFor.indexOf(type) > -1
        );
        if (defaultComparison)
          column.Filtering.Comparison = parseInt(
            defaultComparison.comparison.toString()
          );
        else column.Filtering.Comparison = parseInt(comparisons[0].value);
      }

      var fieldName =
        column.Filtering?.ValueName ??
        column.Filtering?.Name ??
        column.PropertyName;
      var lowValueName: string | undefined = undefined;
      var highValueName: string | undefined = undefined;
      if (type == "timerange" || type == "daterange") {
        lowValueName = `${fieldName}_low`;
        highValueName = `${fieldName}_high`;
      }
      return (
        <Dropdown
          multipleSelection={true}
          visibilityCallback={(visible) =>
            !visible && setSelectedColumnToFilter({})
          }
          key={`${modalID}-dropdown-${column.PropertyName}`}
          visible={true}
          id={modalID}
          label={appClient?.Translate("FilterTo") ?? "Filter to"}
          onSelectionChange={(options, button) => {
            if (button) {
              if (button.id == 0) {
                ClearFilterValue(column);
              } else if (button.id == 1) {
                SetFilteredColumnsState();
              } else setSelectedColumnToFilter({});
            }
          }}
          buttons={[
            {
              id: 0,
              text: appClient?.Translate("Clear") ?? "Clear",
              hideDropdownOnClick: true,
            },
            {
              id: 1,
              text: appClient?.Translate("Apply") ?? "Apply",
              hideDropdownOnClick: true,
            },
            {
              id: -1,
              text: appClient?.Translate("Dismiss") ?? "Dismiss",
              hideDropdownOnClick: true,
            },
          ]}
        >
          {comparisons && comparisons.length > 0 && (
            <Select
              className="filter-comparison"
              defaultValue={column.Filtering?.Comparison}
              options={comparisons}
              onChange={(e) =>
                setComparison(column, parseInt(e.currentTarget.value))
              }
            ></Select>
          )}
          <InputField
            shownInDropdown={true}
            dropDownDefaultOpen={true}
            hideSelections={true}
            multipleSelection={true}
            labelVisible={false}
            valueName={column.Filtering?.ValueName}
            valueProp={column.Filtering?.RemoteDataSource?.ValueProp ?? "id"}
            displayProp={
              column.Filtering?.RemoteDataSource?.DisplayProp ?? "name"
            }
            listener={{
              setFieldData: (
                name: string,
                value: any,
                field: any,
                rawValue?: any
              ) => {
                setColumnFilterValue(column, value, name);
              },
              getFieldData: (field: any) => column.Filtering?.Value,
            }}
            text={column.HeaderText}
            type={type}
            enumSelectionType={column.Filtering?.EnumSelectionType}
            remoteDataSource={column.Filtering?.RemoteDataSource}
            name={fieldName}
            lowValueName={lowValueName}
            highValueName={highValueName}
            lowValue={column.Filtering?.LowValue}
            highValue={column.Filtering?.HighValue}
          />
        </Dropdown>
      );
    };

    const onSortingClick = (
      e: React.MouseEvent<HTMLSpanElement>,
      column: TableColumnClass
    ) => {
      e.preventDefault();
      table.Columns.forEach((item) => {
        item.IsSorted = false;
        item.SortDirection = undefined;
      });
      if (column.PropertyName) setSortedColumn(column.PropertyName);
      var direction = "ASC";
      if (sortedColumnDirection == "ASC") direction = "DESC";
      else direction = "ASC";
      setSortedColumnDirection(direction);

      column.IsSorted = true;
      column.SortDirection = direction;
      if (listener?.onSortingChanged)
        listener?.onSortingChanged(column, direction);
      return true;
    };

    const onFilteringClick = (
      e: React.MouseEvent<HTMLSpanElement>,
      column: TableColumnClass
    ) => {
      e.preventDefault();

      if (
        !selectedColumnToFilter ||
        column.PropertyName != selectedColumnToFilter.PropertyName
      )
        setSelectedColumnToFilter(column);
      else if (column.PropertyName == selectedColumnToFilter.PropertyName)
        setSelectedColumnToFilter({});
      return true;
    };

    const hierarchycalDisplayEnabled = () => {
      return (
        hierarchicalDisplay == true && !isNullOrEmpty(hierarchyPropertyName)
      );
    };

    const onItemCheckedChange = (e: any, row: any, rowIndex: number) => {
      var checked = e.target.checked;
      if (listener?.setCheckedItems)
        listener?.setCheckedItems(row, rowIndex, checked);
    };

    const formatColumnValue = (column: TableColumnClass, value: any) => {
      return formatDataToString(value, column.DecimalPlaces);
    }
    const renderColumnData = () => {
      if (!columnData) return <></>;
      var keys = Object.keys(columnData);
      if (keys.length == 0) return <></>;
      var columns = table.Columns.filter((op) => isColumnVisible(op));
      var getData = (col: TableColumnClass) => {
        var key = keys.find(
          (k) => k.toLocaleLowerCase(getCaseLocale()) == col.PropertyName?.toLocaleLowerCase(getCaseLocale())
        );
        if (!key) return <></>;
        return formatColumnValue(col, columnData[key]);
      };
      return (
        <tr className={`oph-table-body-row totals`}>
          {checkboxes == true && <td></td>}
          {emptyColumnToBeginning == true && <td></td>}
          {columns.map((col, index) => (
            <td key={index} className="oph-table-body-cell numeric">
              {getData(col)}
            </td>
          ))}
          {emptyColumnToEnd == true && <td></td>}
        </tr>
      );
    };

    const renderRows = (
      rowsToRender?: Array<any>,
      additionalClassName?: string
    ): React.ReactNode => {
      if (!data) return <></>;

      var childrenRows: Array<any> | undefined = undefined;
      data.map((item, i) => {
        item.viewOrderIndex = i;
      });
      if (!rowsToRender && hierarchyPropertyName) {
        rowsToRender = data.filter((item, i) => {
          return (
            getObjectValue(item, hierarchyPropertyName) == hierarchyParentValue
          );
        });
      } else if (!rowsToRender) rowsToRender = data;
      return rowsToRender?.map((row, index) => {
        if (listener?.canRenderRow && !listener?.canRenderRow(row, index))
          return <></>;
        if (hierarchycalDisplayEnabled()) {
          if (!row.viewOrderStr) row.viewOrderStr = padLeft(row.id, 4, "0");
          childrenRows = data.filter(
            (item) => getObjectValue(item, hierarchyPropertyName) == row.id
          );
          childrenRows.forEach((item) => {
            item.viewOrderStr = row.viewOrderStr + padLeft(item.id, 4, "0");
          });
        } else {
          childrenRows = undefined;
        }
        var selectedRowData: any =
          selectedRow > -1 ? data[selectedRow] : undefined;
        var isSelected =
          selectedRow === row.viewOrderIndex ||
          (selectedRowData &&
            selectedRowData.viewOrderStr &&
            row.viewOrderStr &&
            selectedRowData.viewOrderStr.startsWith(row.viewOrderStr));
        listener?.getItemPropertyValue;

        var isChecked = false;
        if (listener && listener.isChecked)
          isChecked = listener.isChecked(row, index);
        var rowProps: { className?: string } = {};
        if (listener && listener.getRowProps)
          rowProps = listener?.getRowProps(row, index);
        var { className, ...otherProps } = rowProps;
        return (
          <>
            <tr
              key={`${row.viewOrderIndex}${refreshKey}${index}`}
              className={`oph-table-body-row ${className} ${
                selectedRow === row.viewOrderIndex ? "selected" : ""
              } ${isChecked? "checked": ""}${
                applyRowValidation && row.isValid === false ? "inValid" : ""
              } ${row.hasUnsavedChanges === true ? "has-dirty-data" : ""} ${
                additionalClassName ?? ""
              }`}
              {...otherProps}
            >
              {checkboxes == true && (
                <td
                  className={`px-4 py-2 checkbox-column`}
                  onClick={(e) => {
                    onItemCheckedChange(e, row, index);
                  }}
                >
                  {row.isNewRow != true && (
                    <CheckboxInput
                      key={`${index}${isChecked}`}
                      defaultChecked={isChecked}
                    ></CheckboxInput>
                  )}
                </td>
              )}
              {emptyColumnToBeginning == true && (
                <td
                  className={`px-4 py-2 empty-column`}
                  onClick={(e) => {
                    if (selectedRow != row.viewOrderIndex)
                      onCellClick(e, row, undefined, row.viewOrderIndex, -1);
                  }}
                >
                  {listener &&
                    listener.renderEmptyCell &&
                    listener.renderEmptyCell(row, true, index)}
                </td>
              )}
              {hierarchycalDisplayEnabled() && (
                <td
                  onClick={(e) => {
                    if (selectedRow != row.viewOrderIndex)
                      onCellClick(e, row, undefined, row.viewOrderIndex, -1);
                    else {
                      var parentID = getObjectValue(row, hierarchyPropertyName);
                      if (parentID) {
                        var result = findInArray(
                          data,
                          parentID,
                          "id",
                          undefined
                        );
                        onSelectedRowChange(result.index);
                      } else onSelectedRowChange(-1);
                    }
                  }}
                  className={`px-4 py-2`}
                >
                  {childrenRows && childrenRows.length > 0 && !isSelected && (
                    <ArrowRightIcon width={18} height={18}></ArrowRightIcon>
                  )}
                  {childrenRows && childrenRows.length > 0 && isSelected && (
                    <ArrowDownIcon width={18} height={18}></ArrowDownIcon>
                  )}
                </td>
              )}
              {table.Columns.filter((column) => isColumnVisible(column)).map(
                (column, columnIndex) => {
                  return renderCell(
                    row,
                    column,
                    row.viewOrderIndex,
                    columnIndex
                  );
                }
              )}
              {emptyColumnToEnd == true && (
                <td
                  className={`px-4 py-2 empty-column`}
                  onClick={(e) => {
                    if (selectedRow != row.viewOrderIndex)
                      onCellClick(e, row, undefined, row.viewOrderIndex, -1);
                  }}
                >
                  {listener &&
                    listener.renderEmptyCell &&
                    listener.renderEmptyCell(row, false, index)}
                </td>
              )}
            </tr>
            {childrenRows &&
              childrenRows.length > 0 &&
              renderRows(childrenRows, isSelected ? "" : "hidden")}
          </>
        );
      });
    };

    const canEditCell = (row: any, column: TableColumnClass) => {
      return (
        (column.AllowEditing == true &&
          (!row.isNewRow || column.AllowEditingOnNewRow !== false)) ||
        (row.isNewRow == true && column.AllowEditingOnNewRow !== false)
      );
    };
    const onSelectedRowChange = (index: number) => {
      if(selectedRow != index){
        setSelectedRow(index)
        if(listener?.onSelectedRowChange) listener?.onSelectedRowChange(index);
      }
    }
    const onSelectedCellChange = (rowIndex: number, columnIndex: number) => {
      if(rowIndex != selectedRow || columnIndex != selectedColumn){
        setSelectedCell([rowIndex, columnIndex]);
        setSelectedColumn(columnIndex);
        onSelectedRowChange(rowIndex);
      }
    }

    const onCellClick = async (
      e: React.MouseEvent<HTMLTableCellElement> | undefined,
      row: any,
      column: TableColumnClass | undefined,
      rowIndex: number,
      columnIndex: number
    ) => {
      if(listener?.canClickCell){
        var canClick = await listener?.canClickCell(e, row, column, rowIndex, columnIndex);
        if(canClick === false){
          return;
        }
      }
      if (listener?.onCellClick && column)
        listener?.onCellClick(e, row, column, rowIndex, columnIndex);

      onSelectedCellChange(rowIndex, columnIndex);

      if (column) {
        var willShowEdit = canEditCell(row, column);
        if (willShowEdit) setEditingCell(column);
        else setEditingCell(undefined);
      }

      setTimeout(() => {
        var fieldName = column?.Filtering?.Name ?? column?.PropertyName;
        var elems = document.body.querySelectorAll(
          `#${fieldName}${rowIndex} input`
        );
        if (!elems || elems.length == 0)
          elems = document.body.querySelectorAll(
            `#${fieldName}${rowIndex} select`
          );
        if (!elems || elems.length == 0)
          elems = document.body.querySelectorAll(
            `#${fieldName}${rowIndex} textarea`
          );
        if (!elems || elems.length == 0) return;

        var elemToFocus = elems[0];
        if (elemToFocus) {
          (elemToFocus as any).focus();
          elemToFocus.dispatchEvent(
            new Event("focus", { bubbles: false, cancelable: false })
          );
        }
      }, 150);
      return true;
    };

    const cellValueChanging = (
      row: any,
      name?: string,
      value?: any,
      i18n: boolean = false,
      rowIndex?: number,
      columnIndex?: number,
      field?: any,
      rawValue?: any
    ) => {
      if (listener && listener.onCellValueChanging) {
        listener.onCellValueChanging(
          row,
          name,
          value,
          i18n,
          rowIndex,
          columnIndex,
          field,
          rawValue
        );
      } else {
        setObjectValue(row, name, value);
      }
    };
    const renderCellValue = (
      row: any,
      column: TableColumnClass,
      value: any,
      rowIndex: number,
      columnIndex: number
    ) => {
      if (listener && listener.renderCellValue)
        value = listener.renderCellValue(row, column, value);

      if (
        selectedCell &&
        selectedCell[0] == rowIndex &&
        selectedCell[1] == columnIndex &&
        column == editingCell
      ) {
        var fieldName =
          column.Filtering?.ValueName ??
          column.CellValueProp ??
          column.Filtering?.Name ??
          column.PropertyName;
        var multipleSelection = false;
        if (column.InputProps?.multipleSelection != undefined)
          multipleSelection = column.InputProps?.multipleSelection;
        else if (column.Filtering?.MultipleSelection != undefined)
          multipleSelection = column.Filtering?.MultipleSelection;
        if (column.Filtering?.RemoteDataSource) {
          column.Filtering.RemoteDataSource.ExtraFilters = {
            ...column.Filtering.RemoteDataSource.ExtraFilters,
            ...row,
          };
        }
        var type = column.Filtering?.Type ?? column.Type;
        if (type == "richtext" || type == "url") type = "text";

        return (
          <InputField
            {...column.InputProps}
            id={`${fieldName}${rowIndex}`}
            switchbox={column.Type == "checkbox"}
            labelVisible={false}
            valueName={column.Filtering?.ValueName}
            valueProp={
              column.CellValueProp ??
              column.Filtering?.RemoteDataSource?.ValueProp ??
              "id"
            }
            displayProp={
              column.CellDisplayProp ??
              column.Filtering?.RemoteDataSource?.DisplayProp ??
              "name"
            }
            listener={{
              onChangeRequest: (
                name: string,
                value: any,
                isValid: boolean,
                field: any
              ) => {
                if (column.OnBeforeSetData)
                  column.OnBeforeSetData(row, name, value, field, isValid);
              },
              setFieldData: (name: string, value: any, field: any, rawValue?: any) => {
                if (rawValue && Array.isArray(rawValue) && rawValue.length > 0 && multipleSelection !== true) {
                  rawValue = rawValue[0];
                }
                cellValueChanging(row, fieldName, value, column.I18n, rowIndex, columnIndex, field, rawValue);
                if (column.Filtering && column.Filtering.Name && column.Filtering.ValueName && column.Filtering.ValueName != column.Filtering.Name) {
                  var refValue = rawValue;
                  if(typeof refValue == "object" && Object.hasOwn(refValue, column.Filtering?.Name)){
                    refValue = refValue[column.Filtering?.Name];
                  }
                  cellValueChanging(row, column.Filtering?.Name, refValue, column.I18n, rowIndex, columnIndex, field);
                }
                if (column.OnAfterSetData)
                  column.OnAfterSetData(row, value, field, rawValue);
              },
              getFieldData: (field: any) => {
                var value: any;
                if (listener?.getItemPropertyValue){
                  value = listener.getItemPropertyValue(
                    row,
                    column.PropertyName,
                    column.I18n
                  );
                }
                else
                  value = getObjectValue(row, column.Filtering?.Name);
                return value;
              },
            }}
            text={column.HeaderText}
            type={type}
            enumSelectionType={column.Filtering?.EnumSelectionType}
            remoteDataSource={column.Filtering?.RemoteDataSource}
            multipleSelection={multipleSelection}
            multiple={multipleSelection}
            name={fieldName}
            translateFn={(key: string) => appClient?.Translate(key) ?? key}
          />
        );
      } else if (
        canEditCell(row, column) &&
        hoveredCell &&
        hoveredCell[0] == rowIndex &&
        hoveredCell[1] == columnIndex
      ) {
        return (
          <>
            <RawHTML html={value} />{" "}
            <PencilIcon
              width={12}
              className="absolute right-3 top-3"
              height={12}
            />
          </>
        );
      }
      return value;
    };
    const onMouseOverCell = (
      row: any,
      column: TableColumnClass,
      rowIndex: number,
      columnIndex: number
    ) => {
      setHoveredCell([rowIndex, columnIndex]);
    };
    const onMouseOutCell = (
      row: any,
      column: TableColumnClass,
      rowIndex: number,
      columnIndex: number
    ) => {
      setHoveredCell([-1, -1]);
    };
    
    const renderCell = (
      row: any,
      column: TableColumnClass,
      rowIndex: number,
      columnIndex: number
    ) => {
      var value: any = "";
      if (listener?.getItemPropertyValue)
        value = listener?.getItemPropertyValue(
          row,
          column.PropertyName,
          column.I18n,
          column.Type
        );
      else value = getObjectValue(row, column.PropertyName);

      if (typeof value == "string") {
        var options: ISanitizeOptions;
        if(listener?.getSanitizeOptions)
          options = listener?.getSanitizeOptions();
        else{
          options = { 
              parser: {
                decodeEntities: false 
              }, 
              textFilter: function(text: string) {
                return text.replace(/&amp;/g, "&");
            } 
          };
        }
        
        options.textFilter = function(text: string) {
          return text.replace(/&amp;/g, "&");
        }
        value = removeHtml(value);
        value = sanitizeHtml(value, options);
      }
      if (
        column.Type == "date" ||
        column.Type == "datetime" ||
        column.Type == "week" ||
        column.Type == "time" ||
        column.Type == "month"
      ) {
        if (value) {
          value = getFormattedDateString(value, column.Format, column.Type);
        }
      } else if (column.Type == "enum") {
        if (!column.DataSource && column.Filtering?.EnumSelectionType)
          column.DataSource = enumToArray(
            column.Filtering.EnumSelectionType,
            (key) => appClient?.Translate(key)
          );
        if (Array.isArray(column.DataSource)) {
          var tmpValue = column.DataSource.find(
            (item) => item.value == value
          )?.text;
          if (tmpValue) value = tmpValue;
        }
      } else if (column.Type == "image") {
        if (value) {
          if (value.indexOf("size") > -1)
            value = value.replace("{size}", "Size1");
          value = (
            <Image
              src={value}
              size={100}
              className="w-full max-w-25"
              unoptimized={true}
            />
          );
        }
      } else if (column.Type == "checkbox") {
        value = (
          <Checkbox
            readOnly={true}
            defaultChecked={convertToBool(value)}
            switchbox={true}
            onText=""
            offText=""
          />
        );
      }
      var predefinedClassName = column.Type ? column.Type : "";
      predefinedClassName =
        predefinedClassName +
        " " +
        (selectedCell[0] == rowIndex && selectedCell[1] == columnIndex
          ? "selected"
          : "");
      if (column.TextFormatter) value = column.TextFormatter(value, row, column);

      var unwrappedValue: string | undefined = undefined;
      if (
        column.MaxTextLength &&
        column.MaxTextLength > 0 &&
        value &&
        value.length > column.MaxTextLength
      ) {
        unwrappedValue = value;
        value = value.toString().substring(0, column.MaxTextLength);
      }

      var cellProps: { className?: string } = {};
      if (listener && listener.getCellProps)
        cellProps = listener?.getCellProps(row, column, rowIndex, columnIndex);
      var { className, ...otherProps } = cellProps;
      return (
        <td
          key={`${rowIndex}${columnIndex}`}
          onMouseOver={() =>
            onMouseOverCell(row, column, rowIndex, columnIndex)
          }
          onMouseOut={() => onMouseOutCell(row, column, rowIndex, columnIndex)}
          className={`oph-table-body-cell ${className} ${predefinedClassName} col-${columnIndex} ${
            column.Freeze ? "sticky-cell" : ""
          }`}
          onClick={(e) => onCellClick(e, row, column, rowIndex, columnIndex)}
          {...otherProps}
          title={unwrappedValue}
        >
          {renderCellValue(row, column, formatColumnValue(column, value), rowIndex, columnIndex)}
        </td>
      );
    };

    const onTableScroll = () => {
      if (containerRef.current && topScrollRef.current) {
        var table = containerRef.current.children.item(0);
        var scrollbar = topScrollRef.current.children.item(0);
        if (table && scrollbar) {
          if (table.clientWidth > containerRef.current.clientWidth) {
            topScrollRef.current.style.display = "block";
            scrollbar.setAttribute(
              "style",
              "width:" + table.clientWidth + "px"
            );
            topScrollRef.current.scrollTo({
              left: containerRef.current.scrollLeft,
            });
          } else topScrollRef.current.style.display = "none";
        }
      }
    };
    const onTopScroll = () => {
      if (containerRef.current && topScrollRef.current) {
        var table = containerRef.current.children.item(0);
        var scrollbar = topScrollRef.current.children.item(0);
        if (table && scrollbar) {
          if (table.clientWidth > containerRef.current.clientWidth) {
            containerRef.current.scrollTo({
              left: topScrollRef.current.scrollLeft,
            });
          }
        }
      }
    };

    try {
      return (
        <div id={id} className={`oph-table-container-root ${className}`}>
          <div
            className="oph-table-scroller"
            ref={topScrollRef}
            onScroll={() => onTopScroll()}
          >
            <div className="oph-table-scroller-bar"></div>
          </div>
          <div
            className={`oph-table-container ${
              isHeaderSticky ? "sticky-header" : ""
            }`}
            ref={containerRef}
            onScroll={() => onTableScroll()}
          >
            <table className={`oph-table`} border={1}>
              <thead
                className={`oph-table-header  ${
                  isHeaderSticky ? "sticky-header" : ""
                }`}
              >
                {renderColumns()}
              </thead>
              <tbody className="oph-table-body">
                {renderRows()}
                {renderColumnData()}
              </tbody>
            </table>
          </div>
        </div>
      );
    } catch (error) {
      console.error(error);
      return (
        <div>
          <div>Location: Table</div>
          <div>Type: RenderError</div>
          <div>{JSON.stringify(error)}</div>
        </div>
      );
    }
  }
);
Table.displayName = "Table";
export default Table;

var tableProps: {
  id?: string;
  table?: TableClass;
  data?: Array<any>;
  children?: React.ReactNode;
  appClient?: AppClient;
  className?: string;
  theme?: TableTheme;
  adjustHeight?: boolean;
  hierarchicalDisplay?: boolean;
  hierarchyPropertyName?: string;
  hierarchyParentValue?: string | number;
  allowFiltering?: boolean;
  allowSorting?: boolean;
  selectedRowIndex?: number;
  applyRowValidation?: boolean;
  refreshKey?: string | number | undefined;
  focusForNewRow?: boolean;
  emptyColumnToEnd?: boolean;
  emptyColumnToBeginning?: boolean;
  checkboxes?: boolean;
  checkedItems?: Array<any>;
  columnData?: any;
  isHeaderSticky?: boolean;
  listener?: {
    canClickCell?: (e: any | undefined, row: any, column: TableColumnClass | undefined, rowIndex: number, columnIndex: number) => Promise<boolean>;
    onCellClick?: Function;
    // onRowClick?: Function;
    renderCellValue?: Function;
    renderEmptyCell?: Function;
    canRenderRow?: Function;
    onSortingChanged?: Function;
    onFilteringChanged?: Function;
    onCellValueChanged?: Function;
    onCellValueCancelled?: Function;
    onCellValueChanging?: Function;
    onSelectedRowChange?: Function;
    getItemPropertyValue?: Function;
    getSanitizeOptions?: () => ISanitizeOptions;
    getRowProps?: Function;
    getCellProps?: Function;
    setCheckedItems?: Function;
    isChecked?: Function;
  };
};
export type TableProps = typeof tableProps;

var tableTheme: {
  Icons?: {
    NotFiltered?: React.JSX.Element | string | undefined | IconProps;
    Filtered?: React.JSX.Element | string | undefined | IconProps;
    NotSorted?: React.JSX.Element | string | undefined | IconProps;
    DescSorted?: React.JSX.Element | string | undefined | IconProps;
    AscSorted?: React.JSX.Element | string | undefined | IconProps;
  };
};
export type TableTheme = typeof tableTheme;
