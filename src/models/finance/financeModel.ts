import { LanguageValue } from '@models/global'

export interface IFeeType {
  code?: string
  name?: string
  names?: LanguageValue[]
  description?: any
  isActive?: boolean
  id?: number
  nameId?: string
}

export class FeeTypeModel implements IFeeType {
  code?: string
  name?: string
  names?: LanguageValue[]
  description?: any
  isActive?: boolean
  id?: number
  nameId?: string

  constructor() {
    this.id = undefined
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
