import http from '../httpService'
import {
  CustomFieldConfigurationModel,
  PropertyConfigurationModel,
  StatusTransitionModel
} from '../../models/workflow/ConfigurationModels'
import { notifySuccess } from '../../lib/helper'
import { LNotification } from '../../lib/abpUtility'
class WfConfigurationService {
  public async updatePropertyConfig(body) {
    let res = await http.post('api/services/app/Workflow/UpdatePropertyPermissions', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return res.data.result
  }

  public async updateCustomFieldConfig(body) {
    let res = await http.post('api/services/app/Workflow/UpdateFieldPermissions', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return res.data.result
  }

  public async updateStatusTransition(body) {
    let res = await http.post('api/services/app/Workflow/UpdateStatusTransition', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return res.data.result
  }

  public async getPropertyConfig(params): Promise<any> {
    let res = await http.get('api/services/app/Workflow/GetPropertyPermissions', { params })
    let result = res.data.result
    result = PropertyConfigurationModel.assign(result)
    return result
  }

  public async getCustomFieldConfig(params): Promise<any> {
    let res = await http.get('api/services/app/Workflow/GetFieldPermissions', { params })
    let result = res.data.result
    result = CustomFieldConfigurationModel.assign(result)
    return result
  }

  public async getStatusTransition(params): Promise<any> {
    let res = await http.get('api/services/app/Workflow/GetStatusTransition', { params })
    let result = res.data.result
    result = StatusTransitionModel.assign(result)
    return result
  }
}

export default new WfConfigurationService()
