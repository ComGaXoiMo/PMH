import { ChangeLanguagaInput } from './dto/changeLanguageInput'
import { CreateOrUpdateUserInput } from './dto/createOrUpdateUserInput'
import { EntityDto } from '../../dto/entityDto'
import { GetAllUserOutput } from './dto/getAllUserOutput'
import { PagedResultDto } from '../../dto/pagedResultDto'
import { PagedUserResultRequestDto } from './dto/PagedUserResultRequestDto'
import { UpdateUserInput } from './dto/updateUserInput'
import orderBy from 'lodash/orderBy'
import http from '../../httpService'
import { notifySuccess } from '@lib/helper'
import { L, LNotification } from '@lib/abpUtility'
import { UserBalanceModel } from '@models/user/IUserModel'
import { OptionModel } from '@models/global'

class UserService {
  public async create(createUserInput: CreateOrUpdateUserInput) {
    let result = await http.post('api/services/app/User/Create', createUserInput)
    return result.data.result
  }

  public async update(updateUserInput: UpdateUserInput) {
    let result = await http.put('api/services/app/User/Update', updateUserInput)
    return result.data.result
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/User/Delete', { params: entityDto })
    return result.data
  }

  public async getRoles() {
    let result = await http.get('api/services/app/User/GetRoles')
    return orderBy(result.data.result.items || [], 'displayName')
  }

  public async changeLanguage(changeLanguageInput: ChangeLanguagaInput) {
    let result = await http.post('api/services/app/User/ChangeLanguage', changeLanguageInput)
    return result.data
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateUserInput> {
    let result = await http.get('api/services/app/User/Get', { params: entityDto })
    return result.data.result
  }

  public async getUserBalance(params): Promise<UserBalanceModel> {
    let result = await http.get('api/services/app/User/GetUserBalanceAmount', { params })
    return UserBalanceModel.assign(result.data.result)
  }

  public async getAll(
    pagedFilterAndSortedRequest: PagedUserResultRequestDto
  ): Promise<PagedResultDto<GetAllUserOutput>> {
    let result = await http.get('api/services/app/User/GetAll', { params: pagedFilterAndSortedRequest })
    return result.data.result
  }

  public async getMyProfilePicture() {
    let result = await http.get('api/services/app/Profile/GetProfilePicture')
    let profilePictureUrl = result.data.result?.profilePicture
      ? `data:image/jpeg;base64,${result.data.result.profilePicture}`
      : undefined
    return profilePictureUrl
  }

  public async getProfilePictureById(profilePictureId) {
    let result = await http.get('api/services/app/Profile/GetProfilePictureById', { params: { profilePictureId } })
    let profilePictureUrl = result.data.result?.profilePicture
      ? `data:image/jpeg;base64,${result.data.result.profilePicture}`
      : undefined
    return profilePictureUrl
  }

  public async uploadProfilePicture(file) {
    const data = new FormData()
    data.append('file', file)
    let result = await http.post('api/Profile/UploadProfilePicture', data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    return result.data.result
  }

  public async updateMyProfilePicture(body: any) {
    let result = await http.put('api/services/app/Profile/UpdateMyProfilePicture', body)
    return result.data.result
  }

  public async updateProfilePicture(body: any) {
    let result = await http.put('api/services/app/Profile/UpdateProfilePicture', body)
    return result.data.result
  }

  public async updateMyProfile(body: any) {
    let result = await http.put('api/services/app/Profile/UpdateCurrentUserProfile', body)
    notifySuccess(LNotification('SUCCESS'), LNotification(L('SAVE_SUCCESSFULLY')))
    return result.data.result
  }

  public async filterOptions(params: any): Promise<any> {
    let res = await http.get('api/services/app/User/GetUsers', { params })
    return OptionModel.assigns(res.data?.result?.items || [])
  }
  public async findUsers(params): Promise<any[]> {
    let result = await http.get("api/services/app/Employees/GetAll", { params });

    return result.data.result?.items || [];
  }
}

export default new UserService()
