import { Status } from '@models/global'
import { UserModel } from '@models/user/IUserModel'
import { AppStatus } from '@lib/appconst'
const { withdrawStatus } = AppStatus

export interface IWithdraw {
  code?: string
  description?: any
  isActive?: boolean
  id?: number
  user?: UserModel
  balanceAmount?: number
  statusId?: number
  statusCode?: string
  status?: Status
  nameId?: string
}

export class WithdrawModel implements IWithdraw {
  code?: string
  description?: any
  isActive?: boolean
  id?: number
  userId?: number
  user?: UserModel
  balanceAmount?: number
  totalAmount?: number
  statusId?: number
  statusCode?: string
  status?: Status
  isStatusDone?: boolean
  nameId?: string

  constructor() {
    this.id = undefined
    this.totalAmount = undefined
  }

  public static assign(obj) {
    if (!obj) return undefined

    let newObj = Object.assign(new WithdrawModel(), obj)
    newObj.userId = obj.user?.id
    newObj.balanceAmount = obj.user?.balanceAmount
    newObj.statusCode = obj.status?.code
    newObj.isStatusDone = withdrawStatus.isDone(newObj?.statusCode)
    return newObj
  }

  public static assigns<T>(objs) {
    let results: any[] = []
    ;(objs || []).forEach((item) => results.push(this.assign(item)))
    return results
  }
}
