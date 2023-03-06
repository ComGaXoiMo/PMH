import { initMultiLanguageField, mapMultiLanguageField } from '@lib/helper'

export interface IWfStatusModel {
  id: number
  names: any[]
  name?: string
  isDefault?: boolean
  isIssueClosed?: boolean
  isActive?: boolean
  sortNumber?: number
  modules?: any[]
  colorCode?: string
  borderColorCode?: string
}

export class WfStatusModel implements IWfStatusModel {
  id: number
  names: any[]
  name?: string
  isDefault?: boolean
  isIssueClosed?: boolean
  isActive?: boolean
  sortNumber?: number
  modules?: any[]
  colorCode?: string
  borderColorCode?: string

  constructor() {
    this.id = 0
    this.isActive = true
    this.isDefault = false
    this.sortNumber = 1
    this.names = initMultiLanguageField()
  }

  public static assign(obj) {
    if (!obj) return undefined

    let newObj = Object.assign(new WfStatusModel(), obj)
    newObj.moduleIds = (obj.modules || []).map((item) => item.id)
    newObj.names = mapMultiLanguageField(obj.names)
    newObj.parentId = obj.parent?.id
    return newObj
  }

  public static assigns<T>(objs) {
    let results: WfStatusModel[] = []
    objs.forEach((item) => results.push(this.assign(item)))
    return results
  }
}
