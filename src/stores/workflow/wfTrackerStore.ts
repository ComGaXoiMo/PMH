import { action, observable } from 'mobx'

import { PagedResultDto } from '../../services/dto/pagedResultDto'
import wfTrackerService from '../../services/workflow/wfTrackerService'
import { WfTrackerModel } from '@models/workflow/wfTrackerModel'

class WfTrackerStore {
  @observable isLoading!: boolean
  @observable wfTrackerPage!: PagedResultDto<WfTrackerModel>
  @observable editWfTracker!: WfTrackerModel
  @observable wfTrackers!: WfTrackerModel[]

  @action
  async create(createWfTrackerInput) {
    let result = await wfTrackerService.create(createWfTrackerInput)
    this.wfTrackerPage.items.push(result)
  }

  @action
  async update(updateWfTrackerInput) {
    await wfTrackerService.update(updateWfTrackerInput)
    this.wfTrackerPage.items = this.wfTrackerPage.items.map((x) => {
      if (x.id === updateWfTrackerInput.id) x = updateWfTrackerInput
      return x
    })
  }

  @action
  async updateSortList(body) {
    this.isLoading = true
    await wfTrackerService.updateSortList(body).finally(() => {
      this.isLoading = false
    })
  }

  @action
  async activateOrDeactivate(id: number, isActive) {
    await wfTrackerService.activateOrDeactivate(id, isActive)
  }

  @action
  async get(id) {
    this.editWfTracker = await wfTrackerService.get({ id })
  }

  @action
  async createWfTracker() {
    this.editWfTracker = new WfTrackerModel()
  }

  @action
  async filter(pagedFilterAndSortedRequest: any) {
    this.isLoading = true
    this.wfTrackerPage = await wfTrackerService
      .filter(pagedFilterAndSortedRequest)
      .finally(() => (this.isLoading = false))
  }

  @action
  async getAll(params) {
    this.isLoading = true
    params.isActive = true
    this.wfTrackers = await wfTrackerService.getAll(params).finally(() => (this.isLoading = false))
  }
}

export default WfTrackerStore
