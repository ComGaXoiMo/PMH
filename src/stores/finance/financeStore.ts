import financeService from '@services/finance/financeService'
import { action, observable } from 'mobx'

class FinanceStore {
  @observable isLoading!: boolean
  @observable currentPage!: number
  @observable paymentChannels!: any[]
  @observable reasons!: any[]

  constructor() {
    this.currentPage = 1
  }

  @action
  async getPaymentChannels() {
    this.paymentChannels = await financeService.getPaymentChannels({})
  }

  @action
  async getExpenseMandateReasons() {
    this.reasons = await financeService.getExpenseMandateReasons({})
  }
}

export default FinanceStore
