import moment from 'moment-timezone/moment-timezone'
import { UserModel } from '@models/user/IUserModel'

export interface ICashAdvance {
  id?: number
  userId?: number
  user?: UserModel
  totalAmount?: number
  receiptDate?: Date
  cashChanelId?: number
  isActive?: boolean
  description?: any
}

export class CashAdvanceModel implements ICashAdvance {
  id?: number
  userId?: number
  user?: UserModel
  totalAmount?: number
  receiptDate?: Date
  cashChanelId?: number
  isActive?: boolean
  description?: any

  constructor(initCashAdvance?) {
    this.id = undefined
    this.isActive = true
    this.receiptDate = moment(new Date())
    this.user = initCashAdvance?.user
    this.userId = initCashAdvance?.user?.id
  }

  public static assign(obj) {
    if (!obj) return undefined

    let newObj = Object.assign(new CashAdvanceModel(), obj)
    newObj.receiptDate = obj.receiptDate ? moment(obj.receiptDate) : undefined
    newObj.userId = obj.user?.id
    return newObj
  }

  public static assigns<T>(objs) {
    let results: any[] = []
    objs.forEach((item) => results.push(this.assign(item)))
    return results
  }
}

export interface IDepositModel {
  id?: number
  userId?: number
  balanceAmount?: number
  totalAmount?: number
  receiptDate?: Date
  cashChanelId?: number
  isActive?: boolean
  description?: any
}

export class DepositModel {
  id?: number
  userId?: number
  user?: any
  balanceAmount?: number
  totalAmount?: number
  receiptDate?: Date
  cashChanelId?: number
  isActive?: boolean
  description?: any

  constructor(initDeposit?) {
    this.id = undefined
    this.isActive = true
    this.receiptDate = moment(new Date())
    this.user = initDeposit?.user
    this.userId = initDeposit?.user?.id
    this.balanceAmount = initDeposit?.balanceAmount
  }

  public static assign(obj) {
    if (!obj) return undefined

    let newObj = Object.assign(new DepositModel(), obj)
    newObj.receiptDate = obj.receiptDate ? moment(obj.receiptDate) : undefined
    return newObj
  }

  public static assigns<T>(objs) {
    let results: any[] = []
    objs.forEach((item) => results.push(this.assign(item)))
    return results
  }
}
