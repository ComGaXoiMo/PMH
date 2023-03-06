import { PagedResultDto } from '../dto/pagedResultDto'
import http from '../httpService'
import { L, LNotification } from '@lib/abpUtility'
import { notifyError, notifySuccess } from '@lib/helper'
import { NewsModel } from '../../models'

class NewsService {
  public async create(body: NewsModel) {
    let result = await http.post('/api/services/app/News/Create', body)
    return result.data.result
  }

  public async update(body: any) {
    let result = await http.put('/api/services/app/News/Update', body)
    return result.data.result
  }

  public async delete(id: number, isActive) {
    let result = await http.post('api/services/app/News/Active', undefined, { params: { isActive,id } })
    return result.data
  }

  public async get(id: number): Promise<any> {
    if (!id) {
      notifyError(L('ERROR'), L('ENTITY_NOT_FOUND'))
    }

    let result = await http.get('/api/services/app/News/Get', {
      params: { id }
    })
    return result.data.result
  }

  public async getForEdit(id: number): Promise<any> {
    if (!id) {
      notifyError(L('ERROR'), L('ENTITY_NOT_FOUND'))
    }

    let result = await http.get('/api/services/app/News/GetEventForEdit', {
      params: { id }
    })
    return result.data.result
  }

  public async getAll(params: any): Promise<PagedResultDto<any>> {
    let res = await http.get('api/services/app/News/GetAll', { params })
    let {result} = res.data
    result.items = NewsModel.assigns(result.items || [])
    return result
  }

  public notify(newsId: number) {
    return http
      .post('api/services/app/News/SendEventNotification', null, { params: { eventId: newsId } })
      .then(() => {
        notifySuccess(LNotification('SUCCESS'), LNotification(L('NEWS_NOTIFICATION_SENT')))
      })
  }
}

export default new NewsService()
