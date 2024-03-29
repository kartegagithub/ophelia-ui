import React, { KeyboardEventHandler, MouseEventHandler, useEffect, useMemo, useState } from "react";
import TableClass from "./TableClass";
import TableColumnClass from "./TableColumnClass";
import InputField from "../InputFields/inputField";
import { enumToArray, getObjectValue, randomId, setObjectValue } from "../../Extensions/ReflectionExtensions";
import { getAppTheme } from "../../AppTheme";
import { getImageComponent } from "../Image/Extensions";
import { getFormattedDateString, parseFloatIfCan } from "../../Extensions/StringExtensions";
import Dropdown from "../Dropdown";
import { DataComparison } from "../../Binders/CollectionBinder/query/queryFilter";
import Select from "../Inputs/SelectInput";
import AppClient from "../../AppClient";
import { IconProps } from "../Icon";
import { PencilIcon } from "@heroicons/react/24/solid";
import Checkbox from "../Inputs/CheckboxInput";
const Table: React.FC<TableProps> = React.memo(({ table, theme, data, appClient, children, listener }) => {
  var [selectedRow, setSelectedRow] = useState(0)
  var [selectedCell, setSelectedCell] = useState([0,0])
  var [hoveredCell, setHoveredCell] = useState([0,0])
  var [selectedColumn, setSelectedColumn] = useState(0)
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
  if (!table) return <div></div>;

  const renderColumns = () => {
    return (<tr className={Theme?.ColumnsRowClass}>
      {table.Columns.filter((column) => column.Visible !== false).map((column, index) => {
        return <th className={selectedColumn == index? Theme?.SelectedColumnClass: Theme?.ColumnClass}>
          <div className={Theme?.ColumnRootComponentClass}>
            <div className={Theme?.ColumnTitleClass}>{column.HeaderText}</div>
            <div className={Theme?.ColumnButtonsClass}>
              {column.AllowSorting !== false && <>
                <span onClick={(e) => onSortingClick(e, column)} style={{ cursor: "pointer"}}>
                  {!column.SortDirection && getImageComponent(Theme?.Icons?.NotSorted)}
                  {column.IsSorted && column.SortDirection === "DESC" && getImageComponent(Theme?.Icons?.DescSorted)}
                  {column.IsSorted && column.SortDirection === "ASC" && getImageComponent(Theme?.Icons?.AscSorted)}
                </span>
              </>}
              {column.AllowFiltering !== false && <>
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
      debugger;
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
    return <Dropdown visible={true} id={modalID} label="Filter to" theme={{Class: `${columnIndex > 0? "right-3": "left-3"} absolute p-3 bg-white border border-gainsboro rounded-lg shadow-sm z-10`}} onSelectionChange={(options, button) => {
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

  const onRowClick = (e: React.MouseEvent<HTMLTableRowElement>, index: number) => {
    if(listener?.onRowClick) listener?.onRowClick(e, index)
    setSelectedRow(index)
    return true;
  }
  const renderRows = () => {
    return data?.map((row, index) => {
      return <tr key={index} onClick={(e) => onRowClick(e, index)} className={selectedRow === index? Theme?.SelectedRowClass: Theme?.RowClass}>
        {table.Columns.filter((column) => column.Visible !== false).map((column, columnIndex) => {
          return renderCell(row, column, index, columnIndex)
        })}
      </tr>
    })
  }

  const onCellClick = (e: React.MouseEvent<HTMLTableCellElement>, row: any, column: TableColumnClass, rowIndex: number, columnIndex: number) => {
    if(listener?.onCellClick) listener?.onCellClick(e, row, column, rowIndex, columnIndex)
    setSelectedCell([rowIndex, columnIndex])
    setSelectedColumn(columnIndex)
    return true;
  }
  const cellEditableControlKeyUp = (e: any, row: any, column: TableColumnClass) => {
    if(e.key == "Escape"){
      setSelectedCell([-1,-1])
    }
    else if(e.key == "Enter"){
      setSelectedCell([-1,-1])
      if(listener && listener.onCellValueChanged)
        listener.onCellValueChanged(row, column)
    }
  }
  const renderCellValue = (row: any, column: TableColumnClass, value: any, rowIndex: number, columnIndex: number) => {
    if(listener && listener.renderCellValue)
      value = listener.renderCellValue(row, column, value)
    if(column.AllowEditing == true && selectedCell && selectedCell[0] == rowIndex && selectedCell[1] == columnIndex){
      return <InputField theme={{RootClass: ""}} onKeyUp={(e: any) => cellEditableControlKeyUp(e, row, column)} labelVisible={false} valuevisible={column.Filtering?.Value} valueProp={column.Filtering?.RemoteDataSource?.ValueProp ?? "id"} displayProp={column.Filtering?.RemoteDataSource?.DisplayProp ?? "name"} listener={{
        setFieldData: (name: string, value: any) => setObjectValue(row, column.Filtering?.Name, value),
        getFieldData: (field: any) => getObjectValue(row, column.Filtering?.Name)
      }} text={column.HeaderText} type={column.Filtering?.Type ?? column.Type} enumSelectionType={column.Filtering?.EnumSelectionType} remoteDataSource={column.Filtering?.RemoteDataSource} name={column.Filtering?.Name ?? column.PropertyName} />
    }
    else if(column.AllowEditing == true && hoveredCell && hoveredCell[0] == rowIndex && hoveredCell[1] == columnIndex){
      return <>{value} <PencilIcon width={12} className="absolute right-3 top-3" height={12}/></>
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
    var value: any = getObjectValue(row, column.PropertyName);
    if(column.Type == "date" || column.Type == "datetime" || column.Type == "week" || column.Type == "time" || column.Type == "month"){
      value = getFormattedDateString(value, column.Format, column.Type)
    }
    else if(column.Type == "enum"){
      if(!column.DataSource && column.Filtering?.EnumSelectionType) column.DataSource = enumToArray(column.Filtering.EnumSelectionType, (key) => appClient?.Translate(key))
      if(Array.isArray(column.DataSource)){
        var tmpValue = column.DataSource.find((item) => item.value == value)?.text;
        if(tmpValue) value = tmpValue
      }
    }
    else if(column.Type == "checkbox"){
      value = <Checkbox readOnly={true} checked={value === true || parseFloatIfCan(value) > -1} />
    }
    var className = column.Type ? (Theme?.CellTypeClasses as any)[column.Type] : ""
    className = className + " " + (selectedCell[0] == rowIndex && selectedCell[1] == columnIndex? Theme?.SelectedCellClass: Theme?.CellClass)
    if (column.TextFormatter) value = column.TextFormatter(value);
    if(column.MaxTextLength && column.MaxTextLength > 0 && value && value.length > column.MaxTextLength) value = value.toString().substring(0, column.MaxTextLength)
    return <td onMouseOver={() => onMouseOverCell(row, column, rowIndex, columnIndex)} onMouseOut={() => onMouseOutCell(row, column, rowIndex, columnIndex)} className={`${className} relative`} onClick={(e) => onCellClick(e, row, column, rowIndex, columnIndex)}>{renderCellValue(row, column, value, rowIndex, columnIndex)}</td>
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
  useEffect(() => {
    onTableScroll();
  }, []);
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
});

export default Table;
var tableProps:{
  table?: TableClass;
  data?: Array<any>
  children?: React.ReactNode;
  appClient?: AppClient;
  theme?: TableTheme,
  listener?: {
    onCellClick?: Function;
    onRowClick?: Function;
    renderCellValue?: Function;
    onSortingChanged?: Function
    onFilteringChanged?: Function
    onCellValueChanged?: Function
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