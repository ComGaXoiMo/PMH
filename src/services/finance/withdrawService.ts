import http from '@services/httpService'
import { WithdrawModel, IWithdraw } from '@models/finance/withdrawModel'
import { notifySuccess } from '@lib/helper'
import { LNotification } from '@lib/abpUtility'
import { OptionModel } from '@models/global'

class WithdrawService {
  public async create(body) {
    let result = await http.post('api/services/app/ExpenseMandateRequests/CreateWithdrawRequest', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return result.data.result
  }

  public async update(body) {
    let result = await http.put('api/services/app/ExpenseMandateRequests/Update', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return result.data.result
  }

  public async updateSortList(body: any) {
    let res = await http.post('api/services/app/TruckTypes/SortList', body)
    return res.data.result
  }

  public async activateOrDeactivate(id, isActive) {
    let result = await http.post('api/services/app/ExpenseMandateRequests/Active', { id }, { params: { isActive } })
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return result.data.result
  }

  public async delete(id) {
    let result = await http.delete('api/services/app/ExpenseMandateRequests/Delete', { params: { id } })
    return result.data
  }

  public async get(id): Promise<any> {
    let result = await http.get('api/services/app/ExpenseMandateRequests/Get', { params: { id } })
    return WithdrawModel.assign(result.data.result || {})
  }

  public async checkExist(code): Promise<any> {
    let result = await http.post('api/services/app/ExpenseMandateRequests/CheckExistCode', null, { params: { code } })
    return result.data.result
  }

  public async filter(params): Promise<any> {
    let res = await http.get('api/services/app/ExpenseMandateRequests/GetAll', { params: params })
    const result = res.data.result
    result.items = WithdrawModel.assigns(result.items)
    return result
  }

  public async getAll(params): Promise<IWithdraw[]> {
    const res = await http.get('api/services/app/ExpenseMandateRequests/GetLists', { params })
    return WithdrawModel.assigns(res.data.result || [])
  }

  public async cancelRequest(body) {
    let result = await http.post('api/services/app/ExpenseMandateRequests/CancelRequest', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('CANCEL_SUCCESSFULLY'))
    return result.data.result
  }

  public async getListStatus(): Promise<OptionModel[]> {
    const res = await http.get('api/services/app/ExpenseMandateRequests/GetListStatus')
    return res.data.result
  }
}

export default new WithdrawService()
