declare var RegionSettingTypeDef: {
    Code: string;
    Tag: string;
    DateFormat?: {
        ShortDateFormat?: string;
        LongDateFormat?: string;
        TimeFormat?: string;
        WeekFormat?: string;
        MonthFormat?: string;
        FirstDayOfWeek?: "Monday" | "Sunday";
    };
    NumberFormat?: {
        DecimalSeperator?: "." | ",";
        ThousandGrouper?: "." | ",";
    };
    Currency?: {
        Symbol?: string;
    };
    Translations: any;
};
export declare type RegionSetting = typeof RegionSettingTypeDef;
export declare function registerRegionSetting(code: string, setting: RegionSetting): void;
export declare function getRegionSetting(code: string): RegionSetting | undefined;
export declare function getCurrentRegionSetting(): RegionSetting | undefined;
export declare function changeRegion(code: string): void;
export {};
