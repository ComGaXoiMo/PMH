import { PagedResultDto } from '@services/dto/pagedResultDto'
import http from '../httpService'
import {notifyError, notifySuccess} from "@lib/helper"
import {L, LNotification} from "@lib/abpUtility"
import {RowCompanyModel, CompanyDetailModel} from "@models/clientManagement/companyModel"

class CompanyService {
  public async create(body: any) {
    let result = await http.post('api/services/app/Company/CreateOrUpdate', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return result.data.result
  }

  public async update(body: any) {
    let result = await http.post('api/services/app/Company/CreateOrUpdate', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return result.data.result
  }

  public async delete(id: number) {
    let result = await http.delete('api/services/app/Residents/Delete', { params: { id } })
    return result.data
  }

  public async activateOrDeactivate(id: number, isActive) {
    let result = await http.post('api/services/app/Residents/Active', {id}, { params: { isActive }})
    return result.data
  }

  public async get(id: number): Promise<any> {
    if (!id) {
      notifyError(L('Error'), L('EntityNotFound'))
    }

    let res = await http.get(`api/services/app/Company/Get?id=${id}`)
    let {result} = res.data

    return CompanyDetailModel.assign(result)
  }

  public async getAll(params: any): Promise<PagedResultDto<any>> {
    let res = await http.get('api/services/app/Company/GetAll', {params})
    let {result} = res.data;
    result.items = RowCompanyModel.assigns(result.items)

    return result
  }

  public async filterOptions(params: any): Promise<any> {
    params.pageNumber = 1
    params.pageSize = 20
    let res = await http.get('api/services/app/Company/GetAll', {params})
    let {result} = res.data;
    result.items = RowCompanyModel.assigns(result.items)

    return result.items
  }

}

export default new CompanyService()
