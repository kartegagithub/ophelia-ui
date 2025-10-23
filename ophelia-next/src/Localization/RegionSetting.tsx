import { Region_EN } from "./Region_EN"
import { Region_TR } from "./Region_TR"
import { Region_AZ } from "./Region_AZ"
import { getCaseLocale } from "../Extensions"

var RegionSettingTypeDef: {
    Code: string,
    Tag: string,
    TimeZone: string,
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
    code = code.toLocaleLowerCase(getCaseLocale());
    registeredRegions[code] = setting;
}
export function getRegionSetting(code: string): RegionSetting | undefined{
    code = code.toLocaleLowerCase(getCaseLocale());
    if(registeredRegions[code]) return registeredRegions[code];
    return undefined;
}
export function getAllRegions(): Readonly<any>{
    return registeredRegions
}
export function getCurrentRegionSetting(): RegionSetting | undefined{
    return getRegionSetting(currentRegion.toLocaleLowerCase(getCaseLocale()));
}
export function changeRegion(code: string){
    if(!registeredRegions[code.toLocaleLowerCase(getCaseLocale())]) return
    currentRegion = code.toLocaleLowerCase(getCaseLocale())
}

registerRegionSetting("EN", Region_EN)
registerRegionSetting("TR", Region_TR)
registerRegionSetting("AZ", Region_AZ)
changeRegion("EN")