import { Status } from '../global'
import { wfFieldTypes } from '../../lib/appconst'
import { IUserModel, UserModel, UserOption } from '../user/IUserModel'
import moment from 'moment-timezone'

export class WorkflowModel {
  id: number
  uniqueId: string
  moduleId: number
  parentId: number
  description: string
  dueDate: Date
  startDate: Date
  closedDate: Date
  estimatedHours: number
  doneRatio: number
  creationTime: Date
  statusId: number
  status: Status
  trackerId?: number
  tracker: any
  roleId: number
  role: any
  assignedId?: number
  watcherId: number
  assigned: IUserModel
  priorityId: number
  priority: any
  creatorUser: IUserModel
  customFields: any[]
  propertyPermissions: any[]
  customfieldObject: any
  subject: string
  assignedUsers?: UserOption[]
  watcherUsers?: UserOption[]

  constructor() {
    this.id = 0
    this.uniqueId = ''
    this.moduleId = 0
    this.parentId = 0
    this.description = ''
    this.dueDate = new Date()
    this.startDate = new Date()
    this.closedDate = new Date()
    this.estimatedHours = 0
    this.doneRatio = 0
    this.creationTime = new Date()
    this.statusId = 0
    this.status = new Status()
    this.trackerId = undefined
    this.tracker = {}
    this.roleId = 0
    this.role = {}
    this.assignedId = undefined
    this.watcherId = 0
    this.assigned = new UserModel()
    this.priorityId = 0
    this.priority = {}
    this.creatorUser = new UserModel()
    this.customFields = []
    this.propertyPermissions = []
    this.customfieldObject = {}
    this.subject = ''
  }

  public static assign(obj) {
    if (!obj) return undefined
    let newObj = Object.assign(new WorkflowModel(), obj)
    newObj.dueDate = obj.dueDate ? moment(moment.utc(obj.dueDate).toDate()).local() : null
    newObj.startDate = obj.startDate ? moment(moment.utc(obj.startDate).toDate()).local() : null
    newObj.closedDate = obj.closedDate ? moment(obj.closedDate) : null

    newObj.statusId = obj.statusId || obj.status?.id
    newObj.trackerId = obj.trackerId || obj.tracker?.id
    newObj.roleId = obj.roleId || obj.role?.id
    newObj.priorityId = obj.priorityId || obj.priority?.id
    ;(newObj.customFields || []).forEach((item) => {
      if (item.fieldType === wfFieldTypes.dateTime) {
        item.value = item.value ? moment(item.value) : null
      }
    })

    newObj.assignedUsers = UserOption.assigns(obj.assignedUsers)
    newObj.watcherUsers = UserOption.assigns(obj.watcherUsers)
    return newObj
  }
}
