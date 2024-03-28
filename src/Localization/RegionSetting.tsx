import { Region_EN } from "./Region_EN"
import { Region_TR } from "./Region_TR"

var RegionSettingTypeDef: {
    Code: string,
    Tag: string,
    DateFormat?: {
        ShortDateFormat?: string,
        LongDateFormat?: string,
        TimeFormat?: string,
        WeekFormat?: string,
        MonthFormat?: string,
        FirstDayOfWeek?: "Monday" | "Sunday"
    },
    NumberFormat?: {
        DecimalSeperator?: "." | ",",
        ThousandGrouper?: "." | ","
    },
    Currency?: {
        Symbol?: string
    }
    Translations: any
}

export type RegionSetting = typeof RegionSettingTypeDef

let currentRegion = "en"
let registeredRegions: any = {}

export function registerRegionSetting(code: string, setting: RegionSetting){
    code = code.toLocaleLowerCase();
    registeredRegions[code] = setting;
}
export function getRegionSetting(code: string): RegionSetting | undefined{
    code = code.toLocaleLowerCase();
    if(registeredRegions[code]) return registeredRegions[code];
    return undefined;
}
export function getCurrentRegionSetting(): RegionSetting | undefined{
    return getRegionSetting(currentRegion.toLocaleLowerCase());
}
export function changeRegion(code: string){
    currentRegion = code.toLocaleLowerCase()
}

registerRegionSetting("EN", Region_EN)
registerRegionSetting("TR", Region_TR)
changeRegion("EN")