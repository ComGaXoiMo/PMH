import http from '../httpService'

class FinanceService {
  async getPaymentChannels(params) {
    const res = await http.get('/api/services/app/CashAdvance/GetChannels', { params })
    return res.data.result
  }

  async getExpenseMandateReasons(params) {
    const res = await http.get('/api/services/app/ExpenseMandateRequests/GetListTypes', { params })
    return res.data.result
  }
}

export default new FinanceService()
