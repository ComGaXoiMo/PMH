import { PagedResultDto } from '../dto/pagedResultDto'
import http from '../httpService'
import { RatingBadgeModel } from '../../models/master-data/ratingBadgeModel'
import { notifyError, notifySuccess } from '@lib/helper'
import { L, LNotification } from '@lib/abpUtility'
import { downloadFile } from '@lib/helperFile'
import { TruckBrandModel } from '@models/master-data/truckBrandModel'

class RatingBadgeService {
  public async create(body: any) {
    let res = await http.post('api/services/app/WorkflowTracker/Create', body)
    notifySuccess(LNotification('SUCCESS'), LNotification(L('SAVE_SUCCESSFULLY')))
    return RatingBadgeModel.assign(res.data.result)
  }

  public async filter(params: any): Promise<PagedResultDto<any>> {
    let res = await http.get('api/services/app/WorkflowTracker/GetAll', { params })
    const result = res.data.result
    result.items = RatingBadgeModel.assigns(result.items || [])
    return result
  }

  public async getAll(params: any): Promise<RatingBadgeModel[]> {
    let res = await http.get('api/services/app/WorkflowTracker/GetList', { params })
    const result = res.data.result
    return RatingBadgeModel.assigns(result || [])
  }

  public async update(body: any) {
    let res = await http.put('api/services/app/WorkflowTracker/Update', body)
    notifySuccess(LNotification('SUCCESS'), LNotification(L('SAVE_SUCCESSFULLY')))
    return RatingBadgeModel.assign(res.data.result)
  }

  public async updateSortList(body: any) {
    let res = await http.post('api/services/app/WorkflowTracker/Sort', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return TruckBrandModel.assign(res.data.result)
  }

  public async getById(id): Promise<any> {
    if (!id) {
      notifyError(L('ERROR'), L('ENTITY_NOT_FOUND'))
    }
    let result = await http.get('/api/services/app/WorkflowTracker/GetForEdit', { params: { id } })
    return RatingBadgeModel.assign(result.data.result)
  }

  public async activateOrDeactivate(ids: number, isActive) {
    let response = await http.post('api/services/app/WorkflowTracker/MultiActives', ids, { params: { isActive } })
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return response.data
  }

  public async delete(id: number) {
    let response = await http.delete('api/services/app/WorkflowTracker/Delete', { params: { id } })
    return response.data
  }

  public async downloadTemplateImport() {
    let response = await http.get('api/Imports/WorkflowTracker/GetTemplateImport', { responseType: 'blob' })
    downloadFile(response.data, 'import-rating-badge-template.xlsx')
  }

  public async importByTemplateImport(file) {
    const formData = new FormData()
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    let response = await http.post('api/Imports/CarCompany/ImportFromExcel', formData, config)
    return response.data
  }

  public async exportRatingBadge(params: any): Promise<any> {
    let res = await http.get('api/Export/ExportRatingBadge', {
      params,
      responseType: 'blob'
    })
    downloadFile(res.data, 'project-size.xlsx')
  }
}

export default new RatingBadgeService()
