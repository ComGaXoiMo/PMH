import { action, observable } from 'mobx'

import { PagedResultDto } from '../../services/dto/pagedResultDto'
import wfStatusService from '../../services/workflow/wfStatusService'
import { WfStatusModel } from '@models/workflow/wfStatusModel'

class WfStatusStore {
  @observable isLoading!: boolean
  @observable wfStatusPage!: PagedResultDto<WfStatusModel>
  @observable wfStatusList!: WfStatusModel[]
  @observable editWfStatus!: WfStatusModel

  @action
  async create(createWfStatusInput) {
    this.isLoading = true
    await wfStatusService.create(createWfStatusInput).finally(() => (this.isLoading = false))
  }

  @action
  async update(updateWfStatusInput) {
    this.isLoading = true
    await wfStatusService.update(updateWfStatusInput).finally(() => (this.isLoading = false))
  }

  @action
  async updateSortList(body) {
    this.isLoading = true
    await wfStatusService.updateSortList(body).finally(() => {
      this.isLoading = false
    })
  }

  @action
  async activateOrDeactivate(id: number, isActive) {
    await wfStatusService.activateOrDeactivate(id, isActive)
  }

  @action
  async get(id) {
    this.editWfStatus = await wfStatusService.get({ id })
  }

  @action
  async createWfStatus() {
    this.editWfStatus = new WfStatusModel()
  }

  @action
  async filter(pagedFilterAndSortedRequest: any) {
    this.isLoading = true
    this.wfStatusPage = await wfStatusService
      .filter(pagedFilterAndSortedRequest)
      .finally(() => (this.isLoading = false))
  }

  @action
  async getAll(params) {
    this.isLoading = true
    params.isActive = true
    this.wfStatusList = await wfStatusService.getAll(params).finally(() => (this.isLoading = false))
  }
}

export default WfStatusStore
