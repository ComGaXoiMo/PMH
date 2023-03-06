import { LanguageValue } from '@models/global'
import { initMultiLanguageField } from '@lib/helper'

export interface IFeeType {
  code?: string
  name?: string
  names?: LanguageValue[]
  sortNumber?: number
  description?: any
  isActive?: boolean
  id?: number
  nameId?: string
  serviceFeeAmount?: number
}

export class FeeTypeModel implements IFeeType {
  code?: string
  name?: string
  names?: LanguageValue[]
  sortNumber?: number
  description?: any
  isActive?: boolean
  id?: number
  nameId?: string
  serviceFeeAmount?: number

  constructor() {
    this.id = undefined
    this.sortNumber = 1
    this.isActive = true
    this.names = initMultiLanguageField()
  }

  public static assign(obj) {
    if (!obj) return undefined

    let newObj = Object.assign(new FeeTypeModel(), obj)
    newObj.names = LanguageValue.init(obj.names || [])
    return newObj
  }

  public static assigns<T>(objs) {
    let results: any[] = []
    objs.forEach((item) => results.push(this.assign(item)))
    return results
  }
}
