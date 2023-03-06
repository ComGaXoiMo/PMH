import http from '@services/httpService'
import { notifySuccess } from '@lib/helper'
import { LNotification } from '@lib/abpUtility'
import { IPaymentSetting } from '@models/finance/paymentSettingModel'

class PaymentSettingService {
  public async getPaymentSetting(): Promise<IPaymentSetting> {
    const res = await http.get('/api/services/app/Projects/GetProjectsMomoSetting', {})
    return res.data.result
  }

  public async updatePaymentSetting(payload: IPaymentSetting) {
    const res = await http.put('/api/services/app/Projects/UpdateProjectsMomoSetting', payload)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return res.data
  }
}

export default new PaymentSettingService()
