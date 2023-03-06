import { PagedResultDto } from '../../services/dto/pagedResultDto'
import http from '../httpService'
import { L, LNotification } from '../../lib/abpUtility'
import { notifyError, notifySuccess } from '../../lib/helper'

class MasterDataService {
  public async create(body: any) {
    let result = await http.post('api/services/app/ProjectCategory/Create', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return result.data.result
  }

  public async update(body: any) {
    let result = await http.put('api/services/app/ProjectCategory/Update', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return result.data.result
  }

  public async delete(id: number) {
    let result = await http.delete('api/services/app/ProjectCategory/Delete', { params: { id } })
    return result.data
  }

  public async activateOrDeactivate(id: number, isActive) {
    let result = await http.post('api/services/app/ProjectCategory/Active', { id }, { params: { isActive} })
    return result.data
  }

  public async get(id: number): Promise<any> {
    if (!id) {
      notifyError(L('ERROR'), L('ENTITY_NOT_FOUND'))
    }

    let result = await http.get('api/services/app/ProjectCategory/GetProjectCategoryForEdit', { params: { id } })
    return result.data.result
  }

  public async getAll(params: any): Promise<PagedResultDto<any>> {
    let result = await http.get('api/services/app/ProjectCategory/GetAll', { params })
    return result.data.result
  }

  public async getTargetOptions(params: any): Promise<any> {
    let result = await http.get('api/services/app/ProjectCategory/GetTargets', { params })
    return (result.data?.result || []).map((item) => ({ value: item.name, label: item.displayName }))
  }
}

export default new MasterDataService()
