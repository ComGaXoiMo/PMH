import { EntityDto } from '../dto/entityDto'
import { PagedStatusResultRequestDto } from './dto/PagedResultRequestDto'
import http from '../httpService'
import { notifySuccess } from '../../lib/helper'
import { LCategory, LNotification } from '../../lib/abpUtility'
import { downloadFile } from '@lib/helperFile'
import { WfStatusModel } from '@models/workflow/wfStatusModel'

class WfStatusService {
  public async create(createStatusInput) {
    let res = await http.post('api/services/app/WorkflowStatus/Create', createStatusInput)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return res.data.result
  }

  public async update(updateStatusInput) {
    let res = await http.put('api/services/app/WorkflowStatus/Update', updateStatusInput)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return res.data.result
  }

  public async updateSortList(body: any) {
    let res = await http.post('/api/services/app/WorkflowStatus/Sort', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return res.data.result
  }

  public async delete(entityDto: EntityDto) {
    let res = await http.delete('api/services/app/WorkflowStatus/Delete', { params: entityDto })
    return res.data
  }

  public async activateOrDeactivate(id: number, isActive) {
    let res = await http.post('api/services/app/WorkflowStatus/Active', null, { params: { id, isActive } })
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return res.data
  }

  public async changeStatus(changeStatusInput) {
    let res = await http.post('api/services/app/WorkflowStatus/ChangeLanguage', changeStatusInput)
    return res.data
  }

  public async get(params): Promise<any> {
    let res = await http.get('api/services/app/WorkflowStatus/Get', { params })
    return WfStatusModel.assign(res.data.result)
  }

  public async filter(pagedFilterAndSortedRequest: PagedStatusResultRequestDto): Promise<any> {
    let res = await http.get('api/services/app/WorkflowStatus/GetAll', { params: pagedFilterAndSortedRequest })
    let result = res.data.result
    ;(result.items || []).forEach((item) =>
      item.modules.map((module) => {
        module.name = LCategory(module.key)
        return module
      })
    )
    return result
  }

  public async getAll(params): Promise<any> {
    let res = await http.get('api/services/app/WorkflowStatus/GetList', { params })
    let result = res.data.result
    return result
  }

  public async getNextStatus(params): Promise<any> {
    let res = await http.get('api/services/app/Workflow/GetNextStatus', { params })
    return res.data.result || []
  }
  public async getSettingEscalation(moduleId) {
    let result = await http.get(`api/services/app/SettingEscalation/GetEscalationSetting?escalationModule=${moduleId}`)
    return result.data.result
  }

  public async saveSettingEscalation(body) {
    await http.post('/api/services/app/SettingEscalation/SetEscalationSetting', body)
  }

  // public async getEscalateDashboard(moduleId): Promise<any> {
  //   return await (await http.get(`api/services/app/Escalations/GetEscalateDashboard?module=${moduleId}`)).data.result
  // }

  public async getEscalateDashboard(params) {
    return (await http.get('api/services/app/Escalations/GetEscalateDashboard', { params })).data.result
  }
  public async getEscalateViolates(params) {
    return (await http.get('api/services/app/Escalations/GetEscalateViolates', { params })).data.result
  }

  public async exportEscalate(params) {
    let response = await http.get('/api/EscalateExport/ExportEscalateViolate', { responseType: 'blob', params })
    downloadFile(response.data, 'escalation-report.xlsx')
  }
}

export default new WfStatusService()
