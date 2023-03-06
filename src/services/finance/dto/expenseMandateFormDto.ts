export class ExpenseMandateFormDto {
  cashAdvanceId?: number
  cashChanelId?: number
  userId?: number
  expenseMandateTypeId?: number
  expenseMandateRequestId?: number
  description?: string
  transactionId?: string
  receiptDate?: Date
  totalAmount?: number

  public static assign(obj) {
    if (!obj) return undefined

    let newObj = Object.assign(new ExpenseMandateFormDto(), obj)
    newObj.cashChanelId = obj.paymentChannelId
    newObj.expenseMandateTypeId = obj.reasonId
    newObj.expenseMandateRequestId = obj.withdrawRequestId
    newObj.receiptDate = obj.expenseDate
    return newObj
  }

  public static assigns<T>(objs) {
    let results: any[] = []
    objs.forEach((item) => results.push(this.assign(item)))
    return results
  }
}
