import { action, observable } from 'mobx'

import { CreateOrUpdateUserInput } from '../../services/administrator/user/dto/createOrUpdateUserInput'
import { EntityDto } from '../../services/dto/entityDto'
import { GetRoles } from '../../services/administrator/user/dto/getRolesOuput'
import { GetUserOutput } from '../../services/administrator/user/dto/getUserOutput'
import { PagedResultDto } from '../../services/dto/pagedResultDto'
import { PagedUserResultRequestDto } from '../../services/administrator/user/dto/PagedUserResultRequestDto'
import { UpdateUserInput } from '../../services/administrator/user/dto/updateUserInput'
import userService from '../../services/administrator/user/userService'
import { compressImage } from '../../lib/helper'
import {defaultAvatar} from '../../lib/appconst'

class UserStore {
  @observable isLoading!: boolean
  @observable users!: PagedResultDto<GetUserOutput>
  @observable editUser!: CreateOrUpdateUserInput
  @observable roles: GetRoles[] = []
  @observable editUserProfilePicture!: string

  constructor() {
    this.editUserProfilePicture = defaultAvatar
  }

  @action
  async create(createUserInput: CreateOrUpdateUserInput) {
    let result = await userService.create(createUserInput)
    this.users.items.push(result)
  }

  @action
  async update(updateUserInput: UpdateUserInput) {
    let result = await userService.update(updateUserInput)
    this.users.items = this.users.items.map((x: GetUserOutput) => {
      if (x.id === updateUserInput.id) x = result
      return x
    })
  }

  @action
  async delete(entityDto: EntityDto) {
    await userService.delete(entityDto)
    this.users.items = this.users.items.filter((x: GetUserOutput) => x.id !== entityDto.id)
  }

  @action
  async getRoles() {
    let result = await userService.getRoles()
    this.roles = result
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await userService.get(entityDto)
    this.editUser = result
  }

  @action
  async createUser() {
    this.editUser = {
      userName: '',
      name: '',
      surname: '',
      emailAddress: '',
      isActive: true,
      roleNames: [],
      password: '',
      id: 0
    }

    this.roles = []
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedUserResultRequestDto) {
    this.isLoading = true
    let result = await userService.getAll(pagedFilterAndSortedRequest).finally(() => this.isLoading = false)
    this.users = result
  }

  async changeLanguage(languageName: string) {
    await userService.changeLanguage({ languageName: languageName })
  }

  @action
  async getProfilePicture(profilePictureId) {
    let result = await userService.getProfilePictureById(profilePictureId)
    this.editUserProfilePicture = result || defaultAvatar
  }

  @action
  async uploadProfilePicture(file) {
    let compressedImage = await compressImage(file, 1024)
    let result = await userService.uploadProfilePicture(compressedImage)
    return result
  }

  @action
  async updateProfilePicture(data) {
    const profilePictureId = await userService.updateProfilePicture(data)
    await this.getProfilePicture(profilePictureId)
  }
}

export default UserStore
