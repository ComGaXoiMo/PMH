import customerService from '@services/member/customer/customerService'
import { action, observable } from 'mobx'

import { PagedResultDto } from '../../../services/dto/pagedResultDto'

class CustomerStore {
  @observable isLoading!: boolean
  @observable customers!: PagedResultDto<any>
  @observable editCustomer: any = {}
  @observable customerProjectRoles: any = []
  @observable warnings: any = []

  constructor() {
    this.customers = { items: [], totalCount: 0 }
  }

  @action async getWarning() {
    this.isLoading = true
    this.warnings = await customerService.getWarning().finally(() => (this.isLoading = false))
  }
  @action
  async create(body: any) {
    this.isLoading = true
    this.editCustomer = await customerService.create(body).finally(() => (this.isLoading = false))
  }

  @action
  async createStaff() {
    this.editCustomer = {
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
    await customerService.update(updateStaffInput).finally(() => (this.isLoading = false))
  }

  @action
  async delete(id: number) {
    // await staffService.delete(id)
    // this.staffs.items = this.staffs.items.filter((x) => x.id !== id)
  }

  @action
  async activateOrDeactivate(id: number, isActive) {
    await customerService.activateOrDeactivate(id, isActive)
  }

  @action
  async get(id: number) {
    let result = await customerService.get(id)
    let resultStatic = await customerService.getStaticInformation().finally(() => (this.isLoading = false))
    this.editCustomer = Object.assign(result, resultStatic)
  }

  @action
  async getAll(params: any) {
    this.isLoading = true
    let result = await customerService.getAll(params).finally(() => (this.isLoading = false))
    this.customers = result
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

export default CustomerStore
