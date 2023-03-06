import {RowData} from "@models/DataTable"

export interface IRowUnit {
  projectId: number
  projectName: string
  floorName: string
  amountMonthly: number
  amountPerSquareMeter: number
  size: number
  orgTenantId: number
  orgTenantBusinessName: string
  orgTenantLegalName: string
  statusName: string
  unitTypeName: string
  startDate?: Date
  expiredDate?: Date
  description: string
}

export class RowUnitModel extends RowData implements IRowUnit{
  projectId: number
  projectName: string
  floorName: string
  amountMonthly: number
  amountPerSquareMeter: number
  size: number
  orgTenantId: number
  orgTenantBusinessName: string
  orgTenantLegalName: string
  statusName: string
  unitTypeName: string
  startDate?: Date
  expiredDate?: Date
  description: string
  constructor() {
    super()
    this.projectId = 0
    this.projectName = ''
    this.floorName = ''
    this.amountMonthly = 0
    this.amountPerSquareMeter = 0
    this.size = 0
    this.orgTenantId = 0
    this.orgTenantBusinessName = ''
    this.orgTenantLegalName = ''
    this.statusName = ''
    this.unitTypeName = ''
    this.startDate = undefined
    this.expiredDate = undefined
    this.description = ''
  }

  public static assign(obj) {
    if (!obj) return undefined

    let newObj = Object.assign(new RowUnitModel(), obj)
    newObj.name = obj.unitName
    newObj.amountMonthly = obj.monthly
    newObj.amountPerSquareMeter = obj.per
    return newObj
  }

  public static assigns<T>(objs) {
    let results: any[] = []
    objs.forEach((item) => results.push(this.assign(item)))
    return results
  }
}
