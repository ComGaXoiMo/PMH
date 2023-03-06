import { action, observable } from 'mobx'

import { PagedResultDto } from '@services/dto/pagedResultDto'
import receiptService from '@services/finance/receiptService'

class ReceiptStore {
  @observable isLoading!: boolean
  @observable pagedData!: PagedResultDto<any>

  constructor() {
    this.pagedData = {
      items: [],
      totalCount: 0
    }
  }

  async create(body: any) {
    this.isLoading = true
    return receiptService.create(body).finally(() => (this.isLoading = false))
  }

  @action
  async filter(params: any) {
    this.isLoading = true
    this.pagedData = await receiptService.filter(params).finally(() => (this.isLoading = false))
  }

  @action
  async delete(params) {
    await receiptService.delete(params)
    this.pagedData.items = this.pagedData.items.filter((item) => item.id !== params.id)
  }

  @action
  async downloadReceipt(params) {
    await receiptService.downloadReceipts(params)
  }
}

export default ReceiptStore
