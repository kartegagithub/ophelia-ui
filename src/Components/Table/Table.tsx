import React, { KeyboardEventHandler, MouseEventHandler, useEffect, useMemo, useState } from "react";
import TableClass from "./TableClass";
import TableColumnClass from "./TableColumnClass";
import InputField from "../InputFields/inputField";
import { convertToBool, enumToArray, getObjectValue, randomId, setObjectValue } from "../../Extensions/ReflectionExtensions";
import { getAppTheme } from "../../AppTheme";
import { getImageComponent } from "../Image/Extensions";
import { getFormattedDateString, isNullOrEmpty, padLeft, parseFloatIfCan, removeHtml, sanitizeHtml } from "../../Extensions/StringExtensions";
import Dropdown from "../Dropdown";
import { DataComparison } from "../../Binders/CollectionBinder/query/queryFilter";
import Select from "../Inputs/SelectInput";
import AppClient from "../../AppClient";
import { IconProps } from "../Icon";
import { ArrowDownIcon, ArrowRightIcon, PencilIcon } from "@heroicons/react/24/solid";
import Checkbox from "../Inputs/CheckboxInput";
import RawHTML from "../RawHTML";
import Image from "../Image/Image";
import { findInArray } from "../../Extensions";
const Table: React.FC<TableProps> = React.memo(({ 
  refreshKey,
  table, 
  theme, 
  data, 
  appClient, 
  children, 
  adjustHeight = true, 
  listener,
  hierarchicalDisplay = false,
  hierarchyPropertyName = undefined,
  hierarchyParentValue = undefined,
  allowFiltering = true,
  allowSorting = true
}) => {
  var [selectedRow, setSelectedRow] = useState(-1)
  var [selectedCell, setSelectedCell] = useState([-1,-1])
  var [hoveredCell, setHoveredCell] = useState([-1,-1])
  var [selectedColumn, setSelectedColumn] = useState(-1)
  var [filteredColumns, setFilteredColumns] = useState([""])
  var [selectedColumnToFilter, setSelectedColumnToFilter] = useState(new TableColumnClass())
  var [sortedColumn, setSortedColumn] = useState(table?.Columns.find((column) => column.IsSorted === true)?.PropertyName)
  var [sortedColumnDirection, setSortedColumnDirection] = useState(table?.Columns.find((column) => column.IsSorted === true)?.SortDirection)
  const Theme = getAppTheme({Table: theme}).Table;
  const containerRef = React.createRef<HTMLDivElement>();
  const topScrollRef = React.createRef<HTMLDivElement>();
  const ComparisonSigns = [
    {text: appClient?.Translate("Equal"), comparison: DataComparison.Equal, types: ["numeric", "date", "time", "datetime", "text", "month", "week"], sign: "="},
    {text: appClient?.Translate("Different"), comparison: DataComparison.Different, types: ["numeric", "date", "time", "datetime", "text", "month", "week"], sign: "!="},
    {text: appClient?.Translate("Greater"), comparison: DataComparison.Greater, types: ["numeric", "date", "time", "datetime", "month", "week"], sign: ">"},
    {text: appClient?.Translate("Less"), comparison: DataComparison.Less, types: ["numeric", "date", "time", "datetime", "month", "week"], sign: "<"},
    {text: appClient?.Translate("GreaterOrEqual"), comparison: DataComparison.GreaterOrEqual, types: ["numeric", "date", "time", "datetime", "month", "week"], sign: ">="},
    {text: appClient?.Translate("LessOrEqual"), comparison: DataComparison.LessOrEqual, types: ["numeric", "date", "time", "datetime", "month", "week"], sign: "<="},
    // {text: appClient?.Translate("In"), comparison: DataComparison.In, types: ["filterbox"], sign: "*.*"},
    {text: appClient?.Translate("Between"), comparison: DataComparison.Between, types: ["text"], sign: "*.*"},
    {text: appClient?.Translate("StartsWith"), comparison: DataComparison.StartsWith, types: ["text"], sign: ".*"},
    {text: appClient?.Translate("EndsWith"), comparison: DataComparison.EndsWith, types: ["text"], sign: "*."},
    {text: appClient?.Translate("Contains"), comparison: DataComparison.Contains, types: ["text"], sign: "*.*"}
  ]
  const recalculateHeight = () => {
    if(adjustHeight && containerRef.current){
      if(selectedColumnToFilter && selectedColumnToFilter.PropertyName) containerRef.current.style.minHeight = "400px";
      else containerRef.current.style.minHeight = "";
    }
  }
  useEffect(() => {
    recalculateHeight();
  }, [selectedColumnToFilter]);
  useEffect(() => {
    onTableScroll();
  }, []);
  
  if (!table) return <div></div>;
  const isColumnVisible = (column: TableColumnClass) => {
    if(typeof column.Visible == "boolean") return column.Visible !== false;
    else if(column.Visible){
      var fn: any = column.Visible;
      return fn();
    }
    return true;
  }
  const renderColumns = () => {
    return (<tr className={Theme?.ColumnsRowClass}>
      {hierarchycalDisplayEnabled() && <th></th>}
      {table.Columns.filter((column) => isColumnVisible(column)).map((column, index) => {
        return <th key={index} className={`${column.Freeze ? "sticky": "relative"} col-${index} ${selectedColumn == index? Theme?.SelectedColumnClass: Theme?.ColumnClass}`}>
          <div className={Theme?.ColumnRootComponentClass}>
            <div className={Theme?.ColumnTitleClass}><RawHTML html={column.HeaderText} /></div>
            <div className={Theme?.ColumnButtonsClass}>
              {allowSorting && column.AllowSorting !== false && <>
                <span onClick={(e) => onSortingClick(e, column)} style={{ cursor: "pointer"}}>
                  {!column.SortDirection && getImageComponent(Theme?.Icons?.NotSorted)}
                  {column.IsSorted && column.SortDirection === "DESC" && getImageComponent(Theme?.Icons?.DescSorted)}
                  {column.IsSorted && column.SortDirection === "ASC" && getImageComponent(Theme?.Icons?.AscSorted)}
                </span>
              </>}
              {allowFiltering && column.AllowFiltering !== false && <>
                <span onClick={(e) => onFilteringClick(e, column)} style={{ cursor: "pointer"}}>
                  {!column.IsFiltered && getImageComponent(Theme?.Icons?.NotFiltered)}
                  {column.IsFiltered && getImageComponent(Theme?.Icons?.Filtered)}
                </span>
              </>}
            </div>
          </div>
          {selectedColumnToFilter && selectedColumnToFilter.PropertyName == column.PropertyName && showFilterModal(selectedColumnToFilter, index)}
        </th>
      })}
    </tr>)
  }

  const setColumnFilterValue = (column: TableColumnClass, value: any) => {
    if(value && value != ""){
      column.IsFiltered = true;
      if(column.Filtering) column.Filtering.Value = value;
    }
    else{
      column.IsFiltered = false;
      if(column.Filtering) column.Filtering.Value = undefined;
    }
  }

  const ClearFilterValue = (column: TableColumnClass) => {
    column.IsFiltered = false;
    if(column.Filtering) column.Filtering.Value = undefined;
    SetFilteredColumnsState();    
  }
  const SetFilteredColumnsState = () => {
    setFilteredColumns(table.Columns.map((item) => item.IsFiltered === true && item.PropertyName? item.PropertyName: ""))
    // console.log(filteredColumns)
    if(listener?.onFilteringChanged) listener?.onFilteringChanged(table.Columns)
    setSelectedColumnToFilter({})
  }
  const setComparison = (column: TableColumnClass, val?: number) => {
    if(column.Filtering) column.Filtering.Comparison = val;
  }
  const showFilterModal = (column: TableColumnClass, columnIndex: number) => {
    var modalID = "filter-selection"
    var type = column.Filtering?.Type ??column.Type ?? "NONE"
    var comparisons = ComparisonSigns.filter((comp) => comp.types.indexOf(type) > -1).map((comp) => {
      return { text: comp.text ?? comp.sign, value: comp.comparison.toString()}
    });
    if(column.Filtering && !column.Filtering?.Comparison && comparisons.length > 0) column.Filtering.Comparison = parseInt(comparisons[0].value)
    return <Dropdown multipleSelection={true} visibilityCallback={(visible) => !visible && setSelectedColumnToFilter({}) } key={`${modalID}-dropdown-${column.PropertyName}`} visible={true} id={modalID} label="Filter to" theme={{Class: `${columnIndex > 0? "right-3": "left-3"} absolute p-3 bg-white border border-gainsboro rounded-lg shadow-sm z-10 min-w-[225px]`}} onSelectionChange={(options, button) => {
      if(button){
        if(button.id == 0){
          ClearFilterValue(column)
        }
        else if(button.id == 1){
          SetFilteredColumnsState()
        }
        else setSelectedColumnToFilter({})
      }
    }} buttons={[
      { id: 0, text: appClient?.Translate("Clear") ?? "Clear", hideDropdownOnClick: true },
      { id: 1, text:appClient?.Translate("Apply") ?? "Apply", hideDropdownOnClick: true },
      { id: -1, text:appClient?.Translate("Dismiss") ?? "Dismiss", hideDropdownOnClick: true },
    ]}>
      {comparisons && comparisons.length > 0 && <Select defaultValue={column.Filtering?.Comparison} options={comparisons} onChange={(e) => setComparison(column, parseInt(e.currentTarget.value))}></Select>}
      <InputField shownInDropdown={true} dropDownDefaultOpen={true} hideSelections={true} multipleSelection={true} labelVisible={false} valueProp={column.Filtering?.RemoteDataSource?.ValueProp ?? "id"} displayProp={column.Filtering?.RemoteDataSource?.DisplayProp ?? "name"} listener={{
        setFieldData: (name: string, value: any) => setColumnFilterValue(column, value),
        getFieldData: (field: any) => column.Filtering?.Value
      }} text={column.HeaderText} type={column.Filtering?.Type ?? column.Type} enumSelectionType={column.Filtering?.EnumSelectionType} remoteDataSource={column.Filtering?.RemoteDataSource} name={column.Filtering?.Name ?? column.PropertyName} />
    </Dropdown>
  }

  const onSortingClick = (e: React.MouseEvent<HTMLSpanElement>, column: TableColumnClass) => {
    e.preventDefault();
    table.Columns.forEach((item) => {
      item.IsSorted = false
      item.SortDirection = undefined
    })
    if(column.PropertyName)
      setSortedColumn(column.PropertyName)
    var direction = "ASC"
    if(sortedColumnDirection == "ASC")
      direction = "DESC"
    else
      direction = "ASC"
    setSortedColumnDirection(direction)

    column.IsSorted = true
    column.SortDirection = direction
    if(listener?.onSortingChanged) listener?.onSortingChanged(column, direction)
    return true;
  }

  const onFilteringClick = (e: React.MouseEvent<HTMLSpanElement>, column: TableColumnClass) => {
    e.preventDefault();
    
    if(!selectedColumnToFilter || column.PropertyName != selectedColumnToFilter.PropertyName) setSelectedColumnToFilter(column)
    else if(column.PropertyName == selectedColumnToFilter.PropertyName) setSelectedColumnToFilter({})
    return true;
  }

  // const onRowClick = (e: React.MouseEvent<HTMLTableRowElement>, index: number) => {
  //   if(listener?.onRowClick) listener?.onRowClick(e, index)
  //   setSelectedRow(index)
  //   return true;
  // }
  const hierarchycalDisplayEnabled = () => {
    return hierarchicalDisplay == true && !isNullOrEmpty(hierarchyPropertyName)
  }
  const isHierarchyChecked = () => {
    
  }
  const renderRows = (rowsToRender?: Array<any>, additionalClassName?: string): React.ReactNode => {
    if(!data) return <></>;
    
    var childrenRows: Array<any> | undefined = undefined
    data.map((item, i) => {
      if(!item.viewOrderIndex) item.viewOrderIndex = i; 
    })
    if(!rowsToRender && hierarchyPropertyName){
      rowsToRender = data.filter((item, i) => { 
        return getObjectValue(item, hierarchyPropertyName) == hierarchyParentValue
      })
    }
    else if(!rowsToRender) rowsToRender = data;
    return rowsToRender?.map((row, index) => {
      if(hierarchycalDisplayEnabled()){
        if(!row.viewOrderStr) row.viewOrderStr = padLeft(row.id, 4, "0")
        childrenRows = data.filter((item) => getObjectValue(item, hierarchyPropertyName) == row.id)
        childrenRows.forEach((item) => {item.viewOrderStr = row.viewOrderStr + padLeft(item.id, 4, "0")})
      }
      else{
        childrenRows = undefined
      }
      var selectedRowData: any = selectedRow > -1 ? data[selectedRow]: undefined
      var isSelected = selectedRow === row.viewOrderIndex || (selectedRowData && selectedRowData.viewOrderStr && row.viewOrderStr && selectedRowData.viewOrderStr.startsWith(row.viewOrderStr));
      return (<>
        <tr key={`${row.viewOrderIndex}${refreshKey}`} className={`${selectedRow === row.viewOrderIndex? Theme?.SelectedRowClass: Theme?.RowClass} ${!allowFiltering && row.isValid === false? "bg-red-400 text-white": ""} ${additionalClassName?? ""}`}>
          {hierarchycalDisplayEnabled() && 
            <td onClick={(e) => {
              if(selectedRow != row.viewOrderIndex) onCellClick(e, row, undefined, row.viewOrderIndex, -1)
              else{
                var parentID = getObjectValue(row, hierarchyPropertyName)
                if(parentID){
                  var result = findInArray(data, parentID, "id", undefined)
                  setSelectedRow(result.index)
                }
                else setSelectedRow(-1)
              }
            }} 
            className={`px-4 py-2`}>
            {childrenRows && childrenRows.length > 0 && !isSelected && <ArrowRightIcon width={18} height={18}></ArrowRightIcon>}
            {childrenRows && childrenRows.length > 0 && isSelected && <ArrowDownIcon width={18} height={18}></ArrowDownIcon>}
          </td>}
          {table.Columns.filter((column) => isColumnVisible(column)).map((column, columnIndex) => {
            return renderCell(row, column, row.viewOrderIndex, columnIndex)
          })}
        </tr>
        {childrenRows && childrenRows.length > 0 && renderRows(childrenRows, isSelected? "": "hidden")}
      </>)
    })
  }

  const onCellClick = (e: React.MouseEvent<HTMLTableCellElement>, row: any, column: TableColumnClass | undefined, rowIndex: number, columnIndex: number) => {
    if(listener?.onCellClick && column) listener?.onCellClick(e, row, column, rowIndex, columnIndex)
    setSelectedCell([rowIndex, columnIndex])
    setSelectedColumn(columnIndex)
    setSelectedRow(rowIndex)
    return true;
  }
  const cellEditableControlKeyUp = (e: any, row: any, column: TableColumnClass) => {
    if(e){
      if(e.key == "Escape"){
        setSelectedCell([-1,-1])
      }
      else if(e.key == "Enter"){
        setSelectedCell([-1,-1])
        if(listener && listener.onCellValueChanged)
          listener.onCellValueChanged(row, column)
      }
    }
    else if(listener && listener.onCellValueChanged)
      listener.onCellValueChanged(row, column)
  }
  const cellValueChanging = (row: any, name?: string, value?: any, i18n: boolean = false) => {
    if(listener && listener.onCellValueChanging)
      listener.onCellValueChanging(row, name, value, i18n)
    else
      setObjectValue(row, name, value)
  }
  const renderCellValue = (row: any, column: TableColumnClass, value: any, rowIndex: number, columnIndex: number) => {
    if(listener && listener.renderCellValue)
      value = listener.renderCellValue(row, column, value)
    if(column.AllowEditing == true && selectedCell && selectedCell[0] == rowIndex && selectedCell[1] == columnIndex){
      return <InputField 
      theme={{RootClass: ""}} 
      onKeyUp={(e: any) => cellEditableControlKeyUp(e, row, column)} 
      labelVisible={false} 
      valuevisible={column.Filtering?.Value} 
      valueProp={column.Filtering?.RemoteDataSource?.ValueProp ?? "id"} 
      displayProp={column.Filtering?.RemoteDataSource?.DisplayProp ?? "name"} 
      listener={{
        setFieldData: (name: string, value: any) => {
          cellValueChanging(row, column.Filtering?.Name, value, column.I18n)
          if(column.Type == "selectbox" || column.Type == "enum") cellEditableControlKeyUp(undefined, row, column)
        },
        getFieldData: (field: any) => {
          if(listener?.getItemPropertyValue) return listener.getItemPropertyValue(row, column.PropertyName, column.I18n)
          return getObjectValue(row, column.Filtering?.Name)
        }
      }} 
      text={column.HeaderText} 
      type={column.Filtering?.Type ?? column.Type} enumSelectionType={column.Filtering?.EnumSelectionType} remoteDataSource={column.Filtering?.RemoteDataSource} name={column.Filtering?.Name ?? column.PropertyName}
      translateFn={(key: string) =>  appClient?.Translate(key) ?? key} />
    }
    else if(column.AllowEditing == true && hoveredCell && hoveredCell[0] == rowIndex && hoveredCell[1] == columnIndex){
      return <><RawHTML html={value} /> <PencilIcon width={12} className="absolute right-3 top-3" height={12}/></>
    }
    return value;
  }
  const onMouseOverCell = (row: any, column: TableColumnClass, rowIndex: number, columnIndex: number) => {
    setHoveredCell([rowIndex, columnIndex])
  }
  const onMouseOutCell = (row: any, column: TableColumnClass, rowIndex: number, columnIndex: number) => {
    setHoveredCell([-1, -1])
  }
  const renderCell = (row: any, column: TableColumnClass, rowIndex: number, columnIndex: number) => {
    var value: any = "";
    if(listener?.getItemPropertyValue) value = listener?.getItemPropertyValue(row, column.PropertyName, column.I18n, column.Type)
    else value = getObjectValue(row, column.PropertyName);

    value = removeHtml(value)
    value = sanitizeHtml(value)
    if(column.Type == "date" || column.Type == "datetime" || column.Type == "week" || column.Type == "time" || column.Type == "month"){
      if(value){
        value = getFormattedDateString(value, column.Format, column.Type)
      }
    }
    else if(column.Type == "enum"){
      if(!column.DataSource && column.Filtering?.EnumSelectionType) column.DataSource = enumToArray(column.Filtering.EnumSelectionType, (key) => appClient?.Translate(key))
      if(Array.isArray(column.DataSource)){
        var tmpValue = column.DataSource.find((item) => item.value == value)?.text;
        if(tmpValue) value = tmpValue
      }
    }
    else if(column.Type == "image"){
      if(value){
        if(value.indexOf("size") > -1) value = value.replace("{size}", "Size1")
        value = <Image src={value} size={100} className="w-full max-w-25" />
      }
    }
    else if(column.Type == "checkbox"){
      value = <Checkbox readOnly={true} defaultChecked={convertToBool(value)} switchbox={true} onText="" offText="" />
    }
    var className = column.Type ? (Theme?.CellTypeClasses as any)[column.Type] : ""
    className = className + " " + (selectedCell[0] == rowIndex && selectedCell[1] == columnIndex? Theme?.SelectedCellClass: Theme?.CellClass)
    if (column.TextFormatter) value = column.TextFormatter(value);
    if(column.MaxTextLength && column.MaxTextLength > 0 && value && value.length > column.MaxTextLength) value = value.toString().substring(0, column.MaxTextLength)
    return <td onMouseOver={() => onMouseOverCell(row, column, rowIndex, columnIndex)} onMouseOut={() => onMouseOutCell(row, column, rowIndex, columnIndex)} className={`col-${columnIndex} ${className} ${column.Freeze ? "sticky": "relative"}`} onClick={(e) => onCellClick(e, row, column, rowIndex, columnIndex)}>{renderCellValue(row, column, value, rowIndex, columnIndex)}</td>
  }
  
  const onTableScroll = ()=>{
    if(containerRef.current && topScrollRef.current){
      var table = containerRef.current.children.item(0);
      var scrollbar = topScrollRef.current.children.item(0);
      if(table && scrollbar){
        if(table.clientWidth > containerRef.current.clientWidth){
          topScrollRef.current.style.display = "block";
          scrollbar.setAttribute("style", "width:" + table.clientWidth + "px")
          topScrollRef.current.scrollTo({ left: containerRef.current.scrollLeft })
        }
        else topScrollRef.current.style.display = "none";
      }
    }
  }
  const onTopScroll = ()=>{
    if(containerRef.current && topScrollRef.current){
      var table = containerRef.current.children.item(0);
      var scrollbar = topScrollRef.current.children.item(0);
      if(table && scrollbar){
        if(table.clientWidth > containerRef.current.clientWidth){
          containerRef.current.scrollTo({ left: topScrollRef.current.scrollLeft })
        }
      }
    }
  }

  try {
    return (
      <>
        <div className={Theme?.TopScrollClass} ref={topScrollRef} onScroll={() => onTopScroll()}><div className={Theme?.TopScrollbarClass}></div></div>
        <div className={Theme?.ContainerClass} ref={containerRef} onScroll={() => onTableScroll()}>
          <table className={Theme?.Class} border={1}>
            <thead className={Theme?.HeadClass}>
              {renderColumns()}
            </thead>
            <tbody>
              {renderRows()}
            </tbody>
          </table>
        </div>
      </>
    ); 
  } catch (error) {
      console.error(error);
      return <div>
        <div>Location: Table</div>
        <div>Type: RenderError</div>
        <div>{JSON.stringify(error)}</div>
      </div>
  }
});
Table.displayName = "Table";
export default Table;

var tableProps:{
  refreshKey?: string | number| undefined;
  table?: TableClass;
  data?: Array<any>
  children?: React.ReactNode;
  appClient?: AppClient;
  theme?: TableTheme,
  adjustHeight?: boolean
  hierarchicalDisplay?: boolean
  hierarchyPropertyName?: string
  hierarchyParentValue?: string | number
  allowFiltering?: boolean
  allowSorting?: boolean
  listener?: {
    onCellClick?: Function;
    // onRowClick?: Function;
    renderCellValue?: Function;
    onSortingChanged?: Function
    onFilteringChanged?: Function
    onCellValueChanged?: Function
    onCellValueChanging?: Function
    getItemPropertyValue?: Function
  }
}
export type TableProps = typeof tableProps

var tableTheme: {
  Icons?: {
    NotFiltered?: React.JSX.Element | string | undefined | IconProps,
    Filtered?: React.JSX.Element | string | undefined | IconProps,
    NotSorted?: React.JSX.Element | string | undefined | IconProps,
    DescSorted?: React.JSX.Element | string | undefined | IconProps,
    AscSorted?: React.JSX.Element | string | undefined | IconProps,
  },
  Class?: string,
  RowClass?: string,
  SelectedRowClass?: string,
  ColumnsRowClass?: string,
  SelectedColumnClass?: string,
  ColumnClass?: string,
  ColumnRootComponentClass?: string,
  ColumnTitleClass?: string,
  ColumnButtonsClass?: string,
  ContainerClass?: string,
  TopScrollClass?: string,
  TopScrollbarClass?: string,
  SelectedCellClass?: string,
  CellClass?: string,
  HeadClass?: string,
  
  CellTypeClasses?:{
    text?: string,
    textarea?: string,
    selectbox?: string,
    checkbox?: string,
    radio?: string,
    boolean?: string,
    enum?: string,
    password?: string,
    richtext?: string,
    date?: string,
    datetime?: string,
    numeric?: string,
    label?: string,
    file?: string,
    month?: string,
    email?: string,
    phone?: string,
    url?: string,
    range?: string,
    time?: string,
    week?: string,
  }
}
export type TableTheme = typeof tableTheme