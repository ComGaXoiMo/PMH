import http from '@services/httpService'
import { notifySuccess } from '@lib/helper'
import { LNotification } from '@lib/abpUtility'
import {
  RowNotificationTemplateModel,
  NotificationTemplateDetailModel,
  NotificationTypeModel
} from '@models/notificationTemplate'

class NotificationTemplateService {
  public async create(body) {
    let result = await http.post('api/services/app/TemplateNotify/Create', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return result.data.result
  }

  public async update(body: NotificationTemplateDetailModel) {
    if (!body) {
      return
    }
    Object.keys(body.notificationTemplateLanguages).forEach((key) => {
      let index = (body.notificationTemplates || []).findIndex((item) => item.languageName === key)
      if (index === -1) {
        body.notificationTemplates.push({ ...body.notificationTemplateLanguages[key], languageName: key })
        return
      }

      body.notificationTemplates[index] = {
        ...body.notificationTemplates[index],
        ...body.notificationTemplateLanguages[key]
      }
    })

    delete body.notificationTemplateLanguages

    let result = await http.put('api/services/app/TemplateNotify/Update', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return result.data.result
  }

  public async activateOrDeactivate(templateId, action) {
    let result = await http.post('api/services/app/TemplateNotify/SwitchStatusTemplate', { templateId, action })
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return result.data.result
  }

  public async delete(id) {
    let result = await http.delete('api/services/app/TemplateNotify/Delete', { params: { id } })
    return result.data
  }

  public async get(id): Promise<any> {
    let result = await http.get('api/services/app/TemplateNotify/GetTemplate', { params: { id } })
    return NotificationTemplateDetailModel.assign(result.data.result || {})
  }

  public async getNotificationTypes(params): Promise<any> {
    let result = await http.get('api/services/app/TemplateNotify/GetNotificationTypes', { params })

    return NotificationTypeModel.assigns(result.data.result || [])
  }

  public async getParameters(code): Promise<any> {
    let result = await http.post('api/services/app/TemplateNotify/GetParameters', null, { params: { code } })
    return result.data.result
  }

  public async filter(params): Promise<any> {
    let res = await http.get('api/services/app/TemplateNotify/GetAll', { params: params })
    let { result } = res.data
    result.items = RowNotificationTemplateModel.assigns(result.items)

    return result
  }

  public async getAll(params): Promise<RowNotificationTemplateModel[]> {
    const res = await http.get('api/services/app/TemplateNotify/GetListTemplates', { params })
    return Promise.resolve(res.data.result)
  }
}

export default new NotificationTemplateService()
