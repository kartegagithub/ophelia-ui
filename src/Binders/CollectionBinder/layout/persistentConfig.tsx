import PersistentColumnConfig from "./persistentColumnConfig"

export default class PersistentConfig {
    BinderName?: string = ""
    PageURL?: string = ""
    // FilterURL?: string = ""
    // FilterName?: string = ""
    Scope?: BinderViewScope = BinderViewScope.Private
    Columns?: Array<PersistentColumnConfig> = []
}

export enum BinderViewScope{
    Private = 0,
    Public = 1
}