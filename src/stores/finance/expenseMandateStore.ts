import { action, observable } from 'mobx'

import { PagedResultDto } from '@services/dto/pagedResultDto'
import expenseMandateService from '@services/finance/expenseMandateService'
import { ExpenseMandateModel } from '@models/finance/expenseMandateModel'

class ExpenseMandateStore {
  @observable isLoading!: boolean
  @observable pagedData!: PagedResultDto<ExpenseMandateModel>
  @observable editExpenseMandate!: ExpenseMandateModel

  constructor() {
    this.pagedData = {
      items: [],
      totalCount: 0
    }
  }

  async create(body: any) {
    this.isLoading = true
    return expenseMandateService.create(body).finally(() => (this.isLoading = false))
  }

  @action
  async filter(params: any) {
    this.isLoading = true
    this.pagedData = await expenseMandateService.filter(params).finally(() => (this.isLoading = false))
  }

  @action
  async createExpenseMandate() {
    this.editExpenseMandate = new ExpenseMandateModel()
  }

  @action
  async delete(params) {
    await expenseMandateService.delete(params)
    this.pagedData.items = this.pagedData.items.filter((item) => item.id !== params.id)
  }

  @action
  async downloadVoucher(params) {
    await expenseMandateService.downloadVouchers(params)
  }
}

export default ExpenseMandateStore
