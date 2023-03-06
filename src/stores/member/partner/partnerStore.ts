import partnerService from '@services/member/partner/partnerService'
import truckServices from '@services/truck/truckServices'
import { action, observable } from 'mobx'

import { PagedResultDto } from '../../../services/dto/pagedResultDto'

class PartnerStore {
  @observable isLoading!: boolean
  @observable partners!: PagedResultDto<any>
  @observable editPartner!: any
  @observable partnerProjectRoles: any = []
  @observable warnings: any[] = []

  constructor() {
    this.partners = { items: [], totalCount: 0 }
  }

  @action
  async create(body: any) {
    this.isLoading = true
    let identityCardData = body.truckUserInformation?.identityCard;
    let truckCardData = body.truckUserInformation?.truckCard;
    let truckData = body.truckUserInformation?.truck;
    let safetyCertificationData = body.truckUserInformation?.safetyCertification;
    let insuranceData = body.truckUserInformation?.insurance;
    delete body.truckUserInformation['identityCard']
    delete body.truckUserInformation['truckCard']
    delete body.truckUserInformation['truck']
    delete body.truckUserInformation['safetyCertification']
    delete body.truckUserInformation['insurance']
    this.editPartner = await partnerService.create(body).finally(() => (this.isLoading = false))
    await Promise.all([
       truckServices.uploadPhoto(identityCardData, 'IdentityCard', this.editPartner.uniqueId),
     truckServices.uploadPhoto(truckCardData, 'TruckCard', this.editPartner.uniqueId),
     truckServices.uploadPhoto(truckData, 'Truck', this.editPartner.uniqueId),
     truckServices.uploadPhoto(safetyCertificationData, 'SafetyCertification', this.editPartner.uniqueId),
     truckServices.uploadPhoto(insuranceData, 'Insurance', this.editPartner.uniqueId)
    ])
  }

  @action async getStaticInformation() {
    this.isLoading = true
    const result = await partnerService.getStaticInformation().finally(() => (this.isLoading = false))
    this.editPartner = Object.assign(this.editPartner, result)
  }

  @action async getWarning() {
    this.isLoading = true
    this.warnings = await partnerService.getWarning().finally(() => (this.isLoading = false))
  }

  @action
  async createStaff() {
    this.editPartner = {
      userName: '',
      name: '',
      surname: '',
      displayName: '',
      emailAddress: '',
      isActive: 'true',
      roleNames: [],
      password: '',
      id: 0
    }
  }

  @action
  async update(updateStaffInput: any) {
    this.isLoading = true
    await partnerService.update(updateStaffInput).finally(() => (this.isLoading = false))
  }

  @action
  async delete(id: number) {
    // await staffService.delete(id)
    // this.staffs.items = this.staffs.items.filter((x) => x.id !== id)
  }

  @action
  async activateOrDeactivate(id: number, isActive) {
    await partnerService.activateOrDeactivate(id, isActive)
  }

  @action
  async get(id: number) {
    let result = await partnerService.get(id)
    const resultStatic = await partnerService.getStaticInformation().finally(() => (this.isLoading = false))
    this.editPartner = Object.assign(result, resultStatic)
  }

  @action
  async getAll(params: any) {
    this.isLoading = true
    let result = await partnerService.getAll(params).finally(() => (this.isLoading = false))
    this.partners = result
  }

  @action
  async getProjectRoles(params: any, roles) {
    // let result = await staffService.getProjectRoles(params)
    // this.staffProjectRoles = result.map((projectRole) => {
    //   let initProjectRoles = (roles || []).map((role) => {
    //     return { ...role, isSelected: projectRole.roles.findIndex((item) => item.id === role.id) > -1 }
    //   })
    //   projectRole.roles = initProjectRoles
    //   return projectRole
    // })
  }

  @action
  async createStaffProject(project, roles) {
    // if (!this.staffProjectRoles) {
    //   this.staffProjectRoles = []
    // }
    // if (this.staffProjectRoles.findIndex((item) => item.project.id === project.id) === -1) {
    //   this.staffProjectRoles.push({ project, roles })
    // }
  }

  @action
  async removeStaffProject(record) {
    // if (!this.staffProjectRoles) {
    //   this.staffProjectRoles = []
    // }
    // this.staffProjectRoles = this.staffProjectRoles.filter((item) => item.project.id !== record.project.id)
  }

  @action
  async updateProjectRoles(userId) {
    // this.isLoading = true
    // const body = {
    //   userId,
    //   projects: this.staffProjectRoles.map((item) => ({
    //     projectId: item.project.id,
    //     roleIds: item.roles.filter(role => role.isSelected).map((role) => role.id)
    //   }))
    // }
    // await staffService.setProjectRole(body).finally(() => this.isLoading = false)
  }
}

export default PartnerStore
