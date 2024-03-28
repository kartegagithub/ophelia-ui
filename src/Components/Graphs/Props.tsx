import { CurveType } from "recharts/types/shape/Curve";

export const ColorPalette = [
  "#FF9800", "#8E7AB5", "#90D26D", "#B784B7", "#D9EDBF", "#FFAF45", "#FB6D48", "#94A684"
]
var graphDataType : {
    colors?: Array<string>
    xAxisNameKey?: string
    fontSize?: string
    width?: number
    height?: number
    data: Array<any>
    cartesianGrid?: { stroke?: string},
    lines: Array<{ key: string, type?: CurveType, fill?: string, stroke?: string, strokeWidth?: number}>
  }
  export type GraphDataType = typeof graphDataType
  
  var graphProps : {
    data?: GraphDataType
    theme?: GraphTheme
  }
  
  export type GraphProps = typeof graphProps

  var graphTheme: {
    Class?: string
  }
  export type GraphTheme = typeof graphTheme