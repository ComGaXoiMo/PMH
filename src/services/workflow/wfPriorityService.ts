import { EntityDto } from '../dto/entityDto'
import { PagedPriorityResultRequestDto } from './dto/PagedResultRequestDto'
import http from '../httpService'
import { mapMultiLanguageField, notifySuccess } from '../../lib/helper'
import { LCategory, LNotification } from '../../lib/abpUtility'

class WfPriorityService {
  public async create(createStatusInput) {
    let res = await http.post('api/services/app/WorkflowPriority/Create', createStatusInput)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return res.data.result
  }

  public async update(updateStatusInput) {
    let res = await http.put('api/services/app/WorkflowPriority/Update', updateStatusInput)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return res.data.result
  }

  public async delete(entityDto: EntityDto) {
    let res = await http.delete('api/services/app/WorkflowPriority/Delete', { params: entityDto })
    return res.data
  }

  public async activateOrDeactivate(id: number, isActive) {
    let res = await http.post('api/services/app/WorkflowPriority/Active', null, { params: { id, isActive } })
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return res.data
  }

  public async changeStatus(changeStatusInput) {
    let res = await http.post('api/services/app/WorkflowPriority/ChangeLanguage', changeStatusInput)
    return res.data
  }

  public async get(params): Promise<any> {
    let res = await http.get('api/services/app/WorkflowPriority/Get', { params })
    let result = res.data.result
    if (result.names) {
      result.names = mapMultiLanguageField(result.names)
    }
    result.moduleIds = (result.modules || []).map((item) => item.id)
    return result
  }

  public async filter(pagedFilterAndSortedRequest: PagedPriorityResultRequestDto): Promise<any> {
    let res = await http.get('api/services/app/WorkflowPriority/GetAll', { params: pagedFilterAndSortedRequest })
    let result = res.data.result
    ;(result.items || []).forEach((item) =>
      item.modules.map((module) => {
        module.name = LCategory(module.key)
        return module
      })
    )
    return result
  }
  public async filterWithoutType(params: any): Promise<any> {
    let res = await http.get('api/services/app/WorkflowPriority/GetAll', { params })
    let result = res.data.result
    ;(result.items || []).forEach((item) =>
      item.modules.map((module) => {
        module.name = LCategory(module.key)
        return module
      })
    )
    return result
  }

  public async getList(params): Promise<any> {
    let result = await http.get('api/services/app/WorkflowPriority/GetList', { params })
    return result.data.result
  }
}

export default new WfPriorityService()
