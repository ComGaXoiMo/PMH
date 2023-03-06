import http from '../httpService'

class WorkflowService {
  public async getWorkflowFields(params): Promise<any> {
    let res = await http.get('api/services/app/Workflow/GetWorkflowFields', { params })
    let result = res.data.result
    if (result.customFields) {
      result.customFields.forEach((item) => {
        item.possibleValues = item.possibleValues
          ? item.possibleValues.map((item) => {
              return { name: item, value: item }
            })
          : []
      })
    }
    return result
  }
}

export default new WorkflowService()
