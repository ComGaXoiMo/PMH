import { initMultiLanguageField, mapMultiLanguageField } from '@lib/helper'

export interface IWfTrackerModel {
  id: number
  names: any[]
  name?: string
  isActive?: boolean
  sortNumber?: number
  modules?: any[]
  deleterUserId?: number
  parentId?: number
  deletionTime?: Date
  lastModificationTime?: Date
  lastModifierUserId?: number
  creationTime?: Date
  creatorUserId?: number
}

export class WfTrackerModel implements IWfTrackerModel {
  id: number
  names: any[]
  name?: string
  code?: string
  isDefault?: boolean
  isActive?: boolean
  sortNumber?: number
  description?: string
  deleterUserId?: number
  parentId?: number
  deletionTime?: Date
  lastModificationTime?: Date
  lastModifierUserId?: number
  creationTime?: Date
  creatorUserId?: number

  constructor() {
    this.id = 0
    this.isActive = true
    this.isDefault = false
    this.sortNumber = 1
    this.names = initMultiLanguageField()
  }

  public static assign(obj) {
    if (!obj) return undefined

    let newObj = Object.assign(new WfTrackerModel(), obj)
    newObj.moduleIds = (obj.modules || []).map((item) => item.id)
    newObj.names = mapMultiLanguageField(obj.names)
    newObj.parentId = obj.parent?.id
    return newObj
  }

  public static assigns<T>(objs) {
    let results: WfTrackerModel[] = []
    objs.forEach((item) => results.push(this.assign(item)))
    return results
  }
}
