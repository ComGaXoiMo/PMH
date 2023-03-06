import { PagedResultDto } from '@services/dto/pagedResultDto'
import http from '@services/httpService'

class TruckService {
  public async getAll(params: any): Promise<PagedResultDto<any>> {
    let res = await http.get('api/services/app/Truck/GetAll', { params })
    const result = res.data.result

    return result
  }
  public async get(id: number) {
    let res = await http.get('api/services/app/Truck/Get', { params: { id } })
    const result = res.data.result
    return result
  }
  public async getPartnerOptions(params) {
    let res = await http.get('api/services/app/Partners/GetAll', {
      params: { ...params, skipCount: 0, maxResultCount: 10 }
    })
    const result = res.data.result.items
    return result
  }

  public async createTruck(body) {
    let res = await http.post('api/services/app/Truck/Create', body)
    return res.data.result
  }
  public async updateTruck(body) {
    const dataIdentityCard = new FormData();
    (body.truckUserInformation.identityCard || []).filter(item => !item.id).forEach(async (file) => {
      let blobFile = new Blob ([file.originFileObj], {type: file.type})
      dataIdentityCard.append('identityCard', blobFile, file.name)}
      )
    
    const dataTruckCard = new FormData();
    (body.truckUserInformation.truckCard || []).filter(item => !item.id).forEach((file) => {
      let blobFile = new Blob([file])
      dataTruckCard.append('truckCard', blobFile, file.name)
    })
    const dataTruck = new FormData();
    (body.truckUserInformation.truck || []).filter(item => !item.id).forEach((file) => {
      let blobFile = new Blob([file])
      dataTruck.append('truck', blobFile, file.name)
    })
    const dataSafetyCertification = new FormData();
    (body.truckUserInformation.safetyCertification || []).filter(item => !item.id).forEach((file) => {
      let blobFile = new Blob([file])
      dataSafetyCertification.append('safetyCertification', blobFile, file.name)
    })
    const dataInsurance = new FormData();
    (body.truckUserInformation.insurance || []).filter(item => !item.id).forEach((file) => {
      let blobFile = new Blob([file])
      dataInsurance.append('insurance', blobFile, file.name)
    })

    delete body.truckUserInformation['identityCard']
    delete body.truckUserInformation['truckCard']
    delete body.truckUserInformation['truck']
    delete body.truckUserInformation['safetyCertification']
    delete body.truckUserInformation['insurance']

    let res = await http.put('api/services/app/Truck/Update', body)
    let uniqueId = res.data.result.uniqueId
    if (dataIdentityCard.getAll('identityCard').length) {
      await http.post(`api/Documents/UploadIdentityCards`, dataIdentityCard, {
        headers: {
          'content-type': 'multipart/form-data'
        },
        params: { uniqueId }
      })
    }
    if (dataTruckCard.getAll('truckCard').length) {
      await http.post(`/api/Documents/UploadTruckCards`, dataTruckCard, {
        headers: {
          'content-type': 'multipart/form-data'
        },
        params: { uniqueId }
      })
    }
    if (dataTruck.getAll('truck').length) {
      await http.post(`/api/Documents/UploadTrucks`, dataTruck, {
        headers: {
          'content-type': 'multipart/form-data'
        },
        params: { uniqueId }
      })
    }
    if (dataSafetyCertification.getAll('safetyCertification').length) {
      await http.post(`/api/Documents/UploadSafetyCertifications`, dataSafetyCertification, {
        headers: {
          'content-type': 'multipart/form-data'
        },
        params: { uniqueId }
      })
    }
    if (dataInsurance.getAll('insurance').length) {
      await http.post(`api/Documents/UploadInsurances`, dataInsurance, {
        headers: {
          'content-type': 'multipart/form-data'
        },
        params: { uniqueId }
      })
    }
    return res.data.result
  }

  public async getDocument(uniqueId) {
    let res = await http.get('/api/services/app/Documents/GetDocuments', {params: {uniqueId}})
    const result = res.data.result
    return result
  }
  
  public async deactivated(id) {
    await http.delete('api/services/app/Truck/Delete', {params: {id}})
  }
  public async active(id, isActive) {
    await http.post('api/services/app/Truck/Active', {isActive: isActive, id})
  }
  

  public async uploadPhoto(fileList: any[], moduleName: string, uniqueId) {
    const data = new FormData();
    fileList.filter(item => !item.id).forEach((file) => {
      let blobFile = new Blob ([file.originFileObj], {type: file.type})
      data.append(moduleName, blobFile, file.name)}
      )
      if (data.getAll(moduleName).length) {
        await http.post(`api/Documents/Upload${moduleName}s`, data, {
          headers: {
            'content-type': 'multipart/form-data'
          },
          params: { uniqueId }
        })
      }
  }
}

export default new TruckService()
