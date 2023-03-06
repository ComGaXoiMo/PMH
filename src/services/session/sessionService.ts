import { GetCurrentLoginInformations } from './dto/getCurrentLoginInformations'
import http from '../httpService'
import { AppSettingConfiguration, HostSettingConfiguration } from '@models/global'

declare var abp: any

class SessionService {
  public async getCurrentLoginInformations(): Promise<GetCurrentLoginInformations> {
    let result = await http.get('api/services/app/Session/GetCurrentLoginInformations', {
      headers: {
        'Abp.TenantId': abp.multiTenancy.getTenantIdCookie()
      }
    })

    return result.data.result
  }

  public async getWebConfiguration(): Promise<AppSettingConfiguration> {
    let result = await http.get('api/services/app/Configuration/GetWebConfiguration')
    return AppSettingConfiguration.assign(result.data.result)
  }

  public async getHostSetting(): Promise<HostSettingConfiguration> {
    let result = await http.get('api/services/app/HostSettings/GetAllSettings')
    return result.data.result
  }
  public async changeHostSetting(body): Promise<HostSettingConfiguration> {
    let result = await http.put('api/services/app/HostSettings/UpdateAllSettings', body)
    return result.data.result
  }

  public async updateUsername(body) {
    let result = await http.put('api/services/app/Session/UpdatePhoneNumber', body)
    return result.data.result
  }
  
}

export default new SessionService()
