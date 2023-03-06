import { AuthenticationModel, SwitchProjectModel } from './dto/authenticationModel'
import { AuthenticationResultModel } from './dto/authenticationResultModel'
import http from '../httpService'

class TokenAuthService {
  public async authenticate(authenticationInput: AuthenticationModel): Promise<AuthenticationResultModel> {
    let result = await http.post('api/TokenAuth/Authenticate', authenticationInput)
    return result.data.result
  }

  public async switchProject(targetProjectId): Promise<AuthenticationResultModel> {
    let result = await http.post('api/TokenAuth/SwitchProjectAuthenticate', null,{params: {targetProjectId}})
    return SwitchProjectModel.assign(result.data.result)
  }

  public async getLoginMethod(): Promise<any> {
    let result = await http.get('api/TokenAuth/GetAuthenticationProviders')
    return result.data.result
  }

  public async socialAuth(body: any): Promise<any> {
    let result = await http.post('api/TokenAuth/ExternalAuthenticateV1', body)
    return result.data.result
  }

  public async checkPhoneNumber(phoneNumber) {
    let result = await http.post('api/services/app/Account/IsPhoneNumberAvailable', {phoneNumber})
    return result.data.result
  }
  public async checkSocial(body) {
    let result = await http.post('api/services/app/Account/IsSocialLoginAvailable', body)
    return result.data.result
  }
  

  public async SMSAuth(body: any): Promise<any> {
    let result = await http.post('api/TokenAuth/PhoneLoginAuthenticate', body)
    return result.data.result
  }

  public async registerBySMS(body) {
    let result = await http.post('api/TokenAuth/RegisterViaPhoneNumberAuthenticate', body)
    return result.data.result
  }
  public async registerAccount(body) {
    let result = await http.post('api/services/app/Account/Register', body)
    return result.data.result
  }
  
}

export default new TokenAuthService()
