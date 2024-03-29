import { CurveType } from "recharts/types/shape/Curve";
export declare const ColorPalette: string[];
declare var graphDataType: {
    colors?: Array<string>;
    xAxisNameKey?: string;
    fontSize?: string;
    width?: number;
    height?: number;
    data: Array<any>;
    cartesianGrid?: {
        stroke?: string;
    };
    lines: Array<{
        key: string;
        type?: CurveType;
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
    }>;
};
export declare type GraphDataType = typeof graphDataType;
declare var graphProps: {
    data?: GraphDataType;
    theme?: GraphTheme;
};
export declare type GraphProps = typeof graphProps;
declare var graphTheme: {
    Class?: string;
};
export declare type GraphTheme = typeof graphTheme;
export {};
