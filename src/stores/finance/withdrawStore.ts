import { PagedResultDto } from '@services/dto/pagedResultDto'
import { IWithdraw, WithdrawModel } from '@models/finance/withdrawModel'
import { action, observable } from 'mobx'
import withdrawService from '@services/finance/withdrawService'
import { OptionModel } from '@models/global'

class WithdrawStore {
  @observable pagedData!: PagedResultDto<IWithdraw>
  @observable isLoading!: boolean
  @observable withdraws!: IWithdraw[]
  @observable editWithdraw!: IWithdraw
  @observable listStatus!: OptionModel[]

  constructor() {
    this.pagedData = {
      items: [],
      totalCount: 0
    }

    this.listStatus = []
  }

  @action
  async create(body) {
    await withdrawService.create(body)
  }

  @action
  async update(body) {
    await withdrawService.update(body)
  }

  @action
  async updateSortList(body) {
    this.isLoading = true
    await withdrawService.updateSortList(body).finally(() => {
      this.isLoading = false
    })
  }

  @action
  async activateOrDeactivate(id, isActive) {
    await withdrawService.activateOrDeactivate(id, isActive)
  }

  @action
  async delete(id) {
    await withdrawService.delete(id)
    this.pagedData.items = this.pagedData.items.filter((x) => x.id !== id)
  }

  @action
  async get(id) {
    let result = await withdrawService.get(id)
    this.editWithdraw = result
  }

  @action
  async createWithdraw() {
    this.editWithdraw = new WithdrawModel()
  }

  @action
  async filter(params) {
    this.isLoading = true
    let result = await withdrawService.filter(params).finally(() => (this.isLoading = false))
    this.pagedData = result
  }

  @action
  async getAll(params) {
    this.isLoading = true
    params.isActive = true
    this.withdraws = await withdrawService.getAll(params).finally(() => (this.isLoading = false))
  }

  @action
  async cancelRequest(data) {
    this.isLoading = true
    this.withdraws = await withdrawService.cancelRequest(data).finally(() => (this.isLoading = false))
  }

  @action
  async getListStatus() {
    this.isLoading = true
    this.listStatus = await withdrawService.getListStatus().finally(() => (this.isLoading = false))
  }
}

export default WithdrawStore
