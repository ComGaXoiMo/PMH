import { PagedResultDto } from '@services/dto/pagedResultDto'
import { IFeeType } from '@models/finance/financeModel'
import { action, observable } from 'mobx'
import feeTypeService from '@services/finance/feeTypeService'
import { FeeTypeModel } from '@models/finance/feeTypeModel'

class FeeTypeStore {
  @observable pagedResult!: PagedResultDto<IFeeType>
  @observable isLoading!: boolean
  @observable feeTypes!: IFeeType[]
  @observable editFeeType!: IFeeType
  @observable filters!: any
  constructor() {
    this.pagedResult = {
      items: [],
      totalCount: 0
    }
    this.filters = {}
  }

  @action
  public setFilter(key, value) {
    this.filters = { ...this.filters, [key as any]: value }
  }

  @action
  async create(body) {
    await feeTypeService.create(body)
  }

  @action
  async update(body) {
    await feeTypeService.update(body)
  }

  @action
  async updateSortList(body) {
    this.isLoading = true
    await feeTypeService.updateSortList(body).finally(() => {
      this.isLoading = false
    })
  }

  @action
  async activateOrDeactivate(id, isActive) {
    await feeTypeService.activateOrDeactivate(id, isActive)
  }

  @action
  async delete(id) {
    await feeTypeService.delete(id)
    this.pagedResult.items = this.pagedResult.items.filter((x) => x.id !== id)
  }

  @action
  async get(id) {
    let result = await feeTypeService.get(id)
    this.editFeeType = result
  }

  @action
  async createFeeType() {
    this.editFeeType = new FeeTypeModel()
  }

  @action
  async filter(params) {
    this.isLoading = true
    let result = await feeTypeService.filter(params).finally(() => (this.isLoading = false))
    this.pagedResult = result
  }

  @action
  async getAll(params) {
    this.isLoading = true
    params.isActive = true
    this.feeTypes = await feeTypeService.getAll({ ...this.filters, ...params }).finally(() => (this.isLoading = false))
  }
}

export default FeeTypeStore
