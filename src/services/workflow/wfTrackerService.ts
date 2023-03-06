import { EntityDto } from '../dto/entityDto'
import http from '../httpService'
import { notifySuccess } from '../../lib/helper'
import { LNotification } from '../../lib/abpUtility'
import { WfTrackerModel } from '@models/workflow/wfTrackerModel'

class WfTrackerService {
  public async create(createStatusInput) {
    let res = await http.post('api/services/app/WorkflowTracker/Create', createStatusInput)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return WfTrackerModel.assign(res.data.result)
  }

  public async update(updateStatusInput) {
    let res = await http.put('api/services/app/WorkflowTracker/Update', updateStatusInput)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return WfTrackerModel.assign(res.data.result)
  }

  public async updateSortList(body: any) {
    let res = await http.post('/api/services/app/WorkflowTracker/Sort', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return res.data.result
  }

  public async delete(entityDto: EntityDto) {
    let res = await http.delete('api/services/app/WorkflowTracker/Delete', { params: entityDto })
    return res.data
  }

  public async activateOrDeactivate(id: number, isActive) {
    let res = await http.post('api/services/app/WorkflowTracker/Active', null, { params: { id, isActive } })
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return res.data
  }

  public async changeStatus(changeStatusInput) {
    let res = await http.post('api/services/app/WorkflowTracker/ChangeLanguage', changeStatusInput)
    return res.data
  }

  public async get(params): Promise<any> {
    let res = await http.get('api/services/app/WorkflowTracker/GetForEdit', { params })
    return WfTrackerModel.assign(res.data.result)
  }

  public async filter(pagedFilterAndSortedRequest): Promise<any> {
    let res = await http.get('api/services/app/WorkflowTracker/GetAll', { params: pagedFilterAndSortedRequest })
    let result = res.data.result
    result.items = WfTrackerModel.assigns(result.items)
    return result
  }

  public async getAll(params): Promise<any> {
    let result = await http.get('api/services/app/WorkflowTracker/GetList', { params })
    return WfTrackerModel.assigns(result.data.result)
  }
}

export default new WfTrackerService()
