export interface IPaymentSetting {
  projectId: Number | undefined
  iosSchemaId: string
  partnerCode: string
  partnerName: string
  accessKey: string
  secretKey: string
  publicKey: string
  apiEndpoint: string
  apiEndpointQuery: string
  apiEndpointRefund: string
  isActive: Boolean
}

export class PaymentSetting implements IPaymentSetting {
  projectId: Number | undefined
  iosSchemaId: string
  partnerCode: string
  partnerName: string
  accessKey: string
  secretKey: string
  publicKey: string
  apiEndpoint: string
  apiEndpointQuery: string
  apiEndpointRefund: string
  isActive: Boolean

  constructor() {
    this.projectId = undefined
    this.iosSchemaId = ''
    this.partnerCode = ''
    this.partnerName = ''
    this.accessKey = ''
    this.secretKey = ''
    this.publicKey = ''
    this.apiEndpoint = ''
    this.apiEndpointQuery = ''
    this.apiEndpointRefund = ''
    this.isActive = true
  }

  public static assign(obj) {
    if (!obj) return undefined

    let newObj = Object.assign(new PaymentSetting(), obj)
    return newObj
  }
}
