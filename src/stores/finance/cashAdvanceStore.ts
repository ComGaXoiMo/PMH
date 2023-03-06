import { PagedResultDto } from '@services/dto/pagedResultDto'
import { ICashAdvance, IDepositModel, DepositModel } from '@models/finance/cashAdvanceModel'
import { action, observable } from 'mobx'
import cashAdvanceService from '@services/finance/cashAdvanceService'
import { OptionModel } from '@models/global'
import { TransactionModel } from '@models/finance/transactionModel'

class CashAdvanceStore {
  @observable pagedData!: PagedResultDto<ICashAdvance>
  @observable pagedTransactionData!: PagedResultDto<TransactionModel>
  @observable isLoading!: boolean
  @observable cashAdvances!: ICashAdvance[]
  @observable paymentChannels!: OptionModel[]
  @observable editCashAdvance!: ICashAdvance
  @observable editDeposit!: IDepositModel
  @observable filters!: any
  constructor() {
    this.pagedData = {
      items: [],
      totalCount: 0
    }
    this.pagedTransactionData = {
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
  async update(body) {
    await cashAdvanceService.update(body)
  }

  @action
  async getPaymentChannels() {
    this.isLoading = true
    this.paymentChannels = await cashAdvanceService.getPaymentChannels().finally(() => {
      this.isLoading = false
    })
  }

  @action
  async activateOrDeactivate(id, isActive) {
    await cashAdvanceService.activateOrDeactivate(id, isActive)
  }

  @action
  async delete(id) {
    await cashAdvanceService.delete(id)
    this.pagedData.items = this.pagedData.items.filter((x) => x.id !== id)
  }

  @action
  async get(id) {
    let result = await cashAdvanceService.get(id)
    this.editCashAdvance = result
  }

  @action
  async filter(params) {
    this.isLoading = true
    let result = await cashAdvanceService.filter(params).finally(() => (this.isLoading = false))
    this.pagedData = result
  }

  @action
  async filterCashAdvanceTransactions(params) {
    this.isLoading = true
    let result = await cashAdvanceService.filterCashAdvanceTransactions(params).finally(() => (this.isLoading = false))
    this.pagedTransactionData = result
  }

  @action
  async getAll(params) {
    this.isLoading = true
    params.isActive = true
    this.cashAdvances = await cashAdvanceService
      .getAll({ ...this.filters, ...params })
      .finally(() => (this.isLoading = false))
  }

  /// Deposit
  @action
  async createDepositModel(initDeposit) {
    this.editDeposit = new DepositModel(initDeposit)
  }

  @action
  async createDeposit(body) {
    await cashAdvanceService.createDeposit(body)
  }
}

export default CashAdvanceStore
