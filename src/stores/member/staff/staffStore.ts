import { action, observable } from 'mobx'

import { PagedResultDto } from '../../../services/dto/pagedResultDto'
import staffService from '../../../services/member/staff/staffService'

class StaffStore {
  @observable isLoading!: boolean
  @observable staffs!: PagedResultDto<any>
  @observable editStaff!: any
  @observable staffProjectRoles: any = []

  constructor() {
    this.staffs = { items: [], totalCount: 0 }
  }

  @action
  async create(body: any) {
    this.isLoading = true
    this.editStaff = await staffService.create(body).finally(() => this.isLoading = false)
  }

  @action
  async createStaff() {
    this.editStaff = {
      userName: '',
      name: '',
      surname: '',
      displayName: '',
      emailAddress: '',
      isActive: true,
      roleNames: [],
      password: '',
      id: 0
    }
  }

  @action
  async update(updateStaffInput: any) {
    this.isLoading = true
    await staffService.update(updateStaffInput).finally( async () => {
      if((updateStaffInput.emailAddress !== this.editStaff.emailAddress) || (updateStaffInput.phoneNumber !== this.editStaff.phoneNumber)) {
        await staffService.sendActiveEmail(updateStaffInput.id)
      }
      this.isLoading = false
    } )
    
  }

  @action
  async delete(id: number) {
    await staffService.delete(id)
    this.staffs.items = this.staffs.items.filter((x) => x.id !== id)
  }

  @action
  async activateOrDeactivate(id: number, isActive) {
    await staffService.activateOrDeactivate(id, isActive)
  }

  @action
  async get(id: number) {
    let result = await staffService.get(id)
    this.editStaff = result
  }

  @action
  async getAll(params: any) {
    this.isLoading = true
    let result = await staffService.getAll(params).finally(() => this.isLoading = false)
    this.staffs = result
  }

  @action
  async getProjectRoles(params: any, roles) {
    let result = await staffService.getProjectRoles(params)
    this.staffProjectRoles = result.map((projectRole) => {
      let initProjectRoles = (roles || []).map((role) => {
        return { ...role, isSelected: projectRole.roles.findIndex((item) => item.id === role.id) > -1 }
      })

      projectRole.roles = initProjectRoles
      return projectRole
    })
  }

  @action
  async createStaffProject(project, roles) {
    if (!this.staffProjectRoles) {
      this.staffProjectRoles = []
    }
    if (this.staffProjectRoles.findIndex((item) => item.project.id === project.id) === -1) {
      this.staffProjectRoles.push({ project, roles })
    }
  }

  @action
  async removeStaffProject(record) {
    if (!this.staffProjectRoles) {
      this.staffProjectRoles = []
    }

    this.staffProjectRoles = this.staffProjectRoles.filter((item) => item.project.id !== record.project.id)
  }

  @action
  async updateProjectRoles(userId) {
    this.isLoading = true
    const body = {
      userId,
      projects: this.staffProjectRoles.map((item) => ({
        projectId: item.project.id,
        roleIds: item.roles.filter(role => role.isSelected).map((role) => role.id)
      }))
    }
    await staffService.setProjectRole(body).finally(() => this.isLoading = false)
  }
}

export default StaffStore
