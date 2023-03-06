import { WorkflowModel } from '../../workflow/WorkflowModel'
import { UserModel } from '@models/user/IUserModel'
import { OptionModel } from '@models/global'

export interface IRowFeedback {
  user?: UserModel
}

export class RowFeedbackModel implements IRowFeedback {
  user?: UserModel

  public static assign(obj) {
    if (!obj) return undefined

    let newObj = Object.assign(new RowFeedbackModel(), obj)
    newObj.user = UserModel.assign(obj.user || {})
    return newObj
  }

  public static assigns<T>(objs) {
    let results: any[] = []
    objs.forEach((item) => results.push(this.assign(item)))
    return results
  }
}

export class FeedbackModel {
  id: number
  userId?: number
  user?: any
  feedbackTypeId?: number
  workflow?: any
  wfUniqueId?: string
  isActive?: boolean
  rating?: number

  constructor() {
    this.id = 0
    this.user = {}
    this.workflow = new WorkflowModel()
    this.isActive = true
  }

  public static assign(obj) {
    if (!obj) return undefined

    let newObj = Object.assign(new FeedbackModel(), obj)
    newObj.workflow = obj.workflow ? WorkflowModel.assign(obj.workflow) : {}
    newObj.userId = obj.user?.id
    newObj.user = OptionModel.assign(obj.user)
    newObj.wfUniqueId = obj.workflow?.uniqueId
    return newObj
  }
}
