import http from '@services/httpService'
import { CashAdvanceModel, ICashAdvance } from '@models/finance/cashAdvanceModel'
import { notifySuccess } from '@lib/helper'
import { LNotification } from '@lib/abpUtility'
import { OptionModel } from '@models/global'
import { TransactionModel } from '@models/finance/transactionModel'

class CashAdvanceService {
  async createDeposit(body) {
    let result = await http.post('/api/services/app/CashAdvance/AddDeposit', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return result.data.result
  }

  async update(body) {
    let result = await http.put('api/services/app/CashAdvance/Update', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return result.data.result
  }

  async getPaymentChannels() {
    let res = await http.get('api/services/app/CashAdvance/GetChannels')
    return OptionModel.assigns(res.data.result)
  }

  async activateOrDeactivate(id, isActive) {
    let result = await http.post('api/services/app/CashAdvance/Active', { id }, { params: { isActive } })
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return result.data.result
  }

  async delete(id) {
    let result = await http.delete('api/services/app/CashAdvance/Delete', { params: { id } })
    return result.data
  }

  async get(userId): Promise<any> {
    let result = await http.get('api/services/app/User/GetUserBalanceAmount', { params: { userId } })
    return CashAdvanceModel.assign(result.data.result || {})
  }

  async checkExist(code): Promise<any> {
    let result = await http.post('api/services/app/CashAdvance/CheckExistCode', null, { params: { code } })
    return result.data.result
  }

  async filter(params): Promise<any> {
    let res = await http.get('api/services/app/CashAdvance/GetAll', { params: params })
    let result = res.data.result
    result.items = CashAdvanceModel.assigns(result.items)
    return result
  }

  async getAll(params): Promise<ICashAdvance[]> {
    const res = await http.get('api/services/app/CashAdvance/GetLists', { params })
    return Promise.resolve(res.data.result)
  }

  // Cash advance detail
  async filterCashAdvanceTransactions(params): Promise<any> {
    let res = await http.get('api/services/app/CashAdvance/GetCashAdvanceReceipts', { params: params })
    let result = res.data.result
    result.items = TransactionModel.assigns(result.items)
    return result
  }
}

export default new CashAdvanceService()
