// import { PagedRoleResultRequestDto } from './dto/PagedResultRequestDto'
import http from '../httpService'
import { notifySuccess } from '../../lib/helper'
import { LCategory, LNotification } from '../../lib/abpUtility'

class WfRoleService {
  public async create(createStatusInput) {
    let res = await http.post('api/services/app/WorkflowRole/Create', createStatusInput)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return res.data.result
  }

  public async update(updateStatusInput) {
    let res = await http.put('api/services/app/WorkflowRole/Update', updateStatusInput)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return res.data.result
  }

  public async delete(id) {
    let res = await http.delete('api/services/app/WorkflowRole/Delete', { params: { id } })
    return res.data
  }

  public async activateOrDeactivate(id: number, isActive) {
    let res = await http.post('api/services/app/WorkflowRole/Active', null, { params: { id, isActive } })
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return res.data
  }

  public async get(id): Promise<any> {
    let res = await http.get('api/services/app/WorkflowRole/Get', { params: { id } })
    let result = res.data.result
    result.moduleIds = (result.modules || []).map((item) => item.id)
    return result
  }

  public async getAll(pagedFilterAndSortedRequest: any): Promise<any> {
    let res = await http.get('api/services/app/WorkflowRole/GetAll', { params: pagedFilterAndSortedRequest })
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
    let res = await http.get('api/services/app/WorkflowRole/GetList', { params })
    return res.data.result
  }

  public async getRoleMember(params): Promise<any> {
    let res = await http.get('api/services/app/WorkflowRole/GetUsers', { params })
    return res.data.result
  }

  public async updateRoleMember(body) {
    let res = await http.post('api/services/app/WorkflowRole/UpdateUsers', body)
    return res.data.result
  }
}

export default new WfRoleService()
