import { PagedResultDto } from '@services/dto/pagedResultDto'
import http from '../httpService'
import moment from 'moment-timezone/moment-timezone'
import { downloadFile } from '@lib/helperFile'
import { notifySuccess } from '@lib/helper'
import { LNotification } from '@lib/abpUtility'
import { ExpenseMandateModel } from '@models/finance/expenseMandateModel'
import { ExpenseMandateFormDto } from '@services/finance/dto/expenseMandateFormDto'
import AppConsts from '@lib/appconst'
const {cashAdvanceTransactionTypes} = AppConsts

class ExpenseMandateService {
  public async create(body: any) {
    let data = ExpenseMandateFormDto.assign(body)
    let result = await http.post('/api/services/app/CashAdvance/AddWithDraw', data)
    notifySuccess(LNotification('SUCCESS'), LNotification('ITEM_CREATE_SUCCEED'))
    return result.data.result
  }

  public async filter(params: any): Promise<PagedResultDto<ExpenseMandateModel>> {
    if (!params) {
      params = {}
    }

    params.transactionType = cashAdvanceTransactionTypes.expenseMandate
    let [fromDate, toDate] = params.dateFromTo || []
    params.fromDate = fromDate ? moment(fromDate).startOf('day').toJSON() : null
    params.toDate = toDate ? moment(toDate).endOf('day').toJSON() : null
    delete params.dateFromTo

    let res = await http.get('/api/services/app/CashAdvance/GetCashAdvanceReceipts', { params })
    const result = res.data.result
    result.items = ExpenseMandateModel.assigns(result.items)
    return result
  }

  public async delete(params) {
    return http.delete('/api/services/app/ExpenseMandate/Remove', { params })
  }

  public async downloadVouchers(params) {
    let response = await http.get('api/ExpenseMandates/ExportFeeVoucher', { responseType: 'blob', params })
    downloadFile(response.data, 'fee-receipts.xlsx')
  }
}

export default new ExpenseMandateService()
