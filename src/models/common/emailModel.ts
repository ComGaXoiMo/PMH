/* Emails Input */
export interface IEmailModel {
  id?: number
  email: string
  isPrimary?: boolean
  isInvalid?: boolean
}

export class EmailModel implements IEmailModel {
  id?: number
  email: string
  isPrimary?: boolean
  isInvalid?: boolean
  constructor(email?, isPrimary?, isInvalid?) {
    this.email = email
    this.isPrimary = isPrimary
    this.isInvalid = isInvalid
  }
}
