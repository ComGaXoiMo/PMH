import { action, observable } from 'mobx'

import { PagedResultDto } from '../../services/dto/pagedResultDto'
import { Priority } from '../../services/workflow/dto/priority'
import wfPriorityService from '../../services/workflow/wfPriorityService'
import { initMultiLanguageField } from '../../lib/helper'

class WfPriorityStore {
  @observable isLoading!: boolean
  @observable wfPriority!: PagedResultDto<Priority>
  @observable editWfPriority!: Priority

  @action
  async create(createWfPriorityInput) {
    this.isLoading = true
    await wfPriorityService.create(createWfPriorityInput).finally(() => this.isLoading = false)
  }

  @action
  async update(updateWfPriorityInput) {
    this.isLoading = false
    await wfPriorityService.update(updateWfPriorityInput).finally(() => this.isLoading = false)
  }

  @action
  async activateOrDeactivate(id: number, isActive) {
    await wfPriorityService.activateOrDeactivate(id, isActive)
  }

  @action
  async get(id) {
    this.editWfPriority = await wfPriorityService.get({ id })
  }

  @action
  async createWfPriority() {
    this.editWfPriority = {
      id: 0,
      names: initMultiLanguageField(),
      isActive: true
    }
  }

  @action
  async getAll(pagedFilterAndSortedRequest: any) {
    this.isLoading = true
    this.wfPriority = await wfPriorityService.filter(pagedFilterAndSortedRequest).finally(() => this.isLoading = false)
  }
}

export default WfPriorityStore
