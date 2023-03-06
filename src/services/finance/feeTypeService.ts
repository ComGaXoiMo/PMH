import http from '@services/httpService'
import { FeeTypeModel, IFeeType } from '@models/finance/feeTypeModel'
import { notifySuccess } from '@lib/helper'
import { LNotification } from '@lib/abpUtility'

class FeeTypeService {
  public async create(body) {
    let result = await http.post('api/services/app/ServiceFees/Create', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return result.data.result
  }

  public async update(body) {
    let result = await http.put('api/services/app/ServiceFees/Update', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return result.data.result
  }

  public async updateSortList(body: any) {
    let res = await http.post('api/services/app/TruckTypes/SortList', body)
    return res.data.result
  }

  public async activateOrDeactivate(id, isActive) {
    let result = await http.post('api/services/app/ServiceFees/Active', { id }, { params: { isActive } })
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return result.data.result
  }

  public async delete(id) {
    let result = await http.delete('api/services/app/ServiceFees/Delete', { params: { id } })
    return result.data
  }

  public async get(id): Promise<any> {
    let result = await http.get('api/services/app/ServiceFees/Get', { params: { id } })
    return FeeTypeModel.assign(result.data.result || {})
  }

  public async checkExist(code): Promise<any> {
    let result = await http.post('api/services/app/ServiceFees/CheckExistCode', null, { params: { code } })
    return result.data.result
  }

  public async filter(params): Promise<any> {
    let result = await http.get('api/services/app/ServiceFees/GetAll', { params: params })
    return result.data.result
  }

  public async getAll(params): Promise<IFeeType[]> {
    const res = await http.get('api/services/app/ServiceFees/GetLists', { params })
    return Promise.resolve(res.data.result)
  }
}

export default new FeeTypeService()
