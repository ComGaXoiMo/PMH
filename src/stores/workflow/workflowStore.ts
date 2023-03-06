import { action, observable } from 'mobx'

import { WfStatusModel } from '../../models/workflow/wfStatusModel'
import wfStatusService from '../../services/workflow/wfStatusService'
import { Priority } from '../../services/workflow/dto/priority'
import { Role } from '../../services/workflow/dto/role'
import wfPriorityService from '../../services/workflow/wfPriorityService'
import wfRoleService from '../../services/workflow/wfRoleService'
import wfTrackerService from '../../services/workflow/wfTrackerService'
import workflowService from '../../services/workflow/workflowService'
import { WfTrackerModel } from '../../models/workflow/wfTrackerModel'

class WorkflowStore {
  @observable wfStatus!: WfStatusModel[]
  @observable wfPriorities!: Priority[]
  @observable wfRoles!: Role[]
  @observable wfTrackers!: WfTrackerModel[]
  @observable wfProperties!: any
  @observable wfCustomFields!: any

  constructor() {
    this.wfProperties = {}
    this.wfCustomFields = {}
  }

  @action
  async getListWfStatus(workflowId?, moduleId?) {
    if (workflowId) {
      let result = await wfStatusService.getNextStatus({ id: workflowId, moduleId })
      this.wfStatus = result || []
      return
    }
    let result = await wfStatusService.getAll({ moduleId, isActive: true })
    this.wfStatus = result || []
  }

  @action
  async getListWfPriority(moduleId?) {
    let result = await wfPriorityService.getList({ moduleId, isActive: true })
    this.wfPriorities = result || []
  }

  @action
  async getListWfRole(moduleId?) {
    let result = await wfRoleService.getList({ moduleId, isActive: true })
    this.wfRoles = result || []
  }

  @action
  async getListWfTracker(moduleId?, parentId?) {
    let result = await wfTrackerService.getAll({ moduleId, parentId, isActive: true })
    this.wfTrackers = result || []
  }

  @action
  async getWorkflowFields(moduleId, trackerId?) {
    let result = await workflowService.getWorkflowFields({ moduleId, trackerId, isActive: true })
    await this.setWfCustomFields(result.customFields)
    await this.setWfProperties(result.properties)
    return result
  }

  @action
  async setWfProperties(properties) {
    this.wfProperties = (properties || []).reduce((objProperties, item) => {
      objProperties[item.propertyName] = { ...item }
      return objProperties
    }, {})
  }

  @action
  async setWfCustomFields(customFields) {
    this.wfCustomFields = (customFields || []).reduce((objCustomFields, item) => {
      objCustomFields[item.id] = { ...item }
      return objCustomFields
    }, {})
  }
}

export default WorkflowStore
