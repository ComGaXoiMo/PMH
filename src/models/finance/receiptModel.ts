import { UserModel } from '@models/user/IUserModel'
import moment from 'moment-timezone/moment-timezone'
import { mapActiveStatus } from '@lib/helper'

export interface IReceipt {
  id?: number
  receiptNumber?: string
  totalAmount?: number
  receiptDate?: Date
  description?: string
  paymentChannel?: any
  status?: boolean
  creationTime?: Date
  creatorUser?: UserModel
  isActive?: boolean
}

export class ReceiptModel implements IReceipt {
  id?: number
  receiptNumber?: string
  totalAmount?: number
  receiptDate?: Date
  description?: string
  paymentChannel?: any
  status?: boolean
  creationTime?: Date
  creatorUser?: UserModel
  isActive?: boolean
  withdrawRequestId?: number
  transactionId?: number
  cashAdvanceId?: number
  userId?: number
  user?: UserModel
  balanceAmount?: number

  constructor(userId?, user?, cashAdvanceId?, balanceAmount?, withdrawRequestId?, totalAmount?) {
    this.id = undefined
    this.isActive = true
    this.userId = userId
    this.user = user
    this.withdrawRequestId = withdrawRequestId
    this.totalAmount = totalAmount
    this.balanceAmount = balanceAmount
    this.cashAdvanceId = cashAdvanceId
  }

  public static assign(obj) {
    if (!obj) return undefined

    let newObj = Object.assign(new ReceiptModel(), obj)
    newObj.receiptNumber = obj.receiptNumber
    newObj.receiptDate = obj.cashReceiptDate ? moment(obj.cashReceiptDate) : undefined
    newObj.paymentChannel = obj.cashChanel
    newObj.status = mapActiveStatus(obj.isActive)
    return newObj
  }

  public static assigns<T>(objs) {
    let results: any[] = []
    objs.forEach((item) => results.push(this.assign(item)))
    return results
  }
}
