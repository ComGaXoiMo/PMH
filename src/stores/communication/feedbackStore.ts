import {action, observable} from 'mobx'

import {PagedResultDto} from '../../services/dto/pagedResultDto'
import feedbackService from '../../services/communication/feedbackService'
import fileService from '../../services/common/fileService'
import {moduleFile} from '../../lib/appconst'
import {FeedbackModel} from '@models/communication/Feedback/FeedbackModel'

class FeedbackStore {
  @observable isLoading!: boolean
  @observable feedbacks!: PagedResultDto<any>
  @observable editFeedback!: FeedbackModel

  constructor() {
    this.feedbacks = { items: [], totalCount: 0 }
    this.editFeedback = new FeedbackModel()
  }

  @action
  async create(body: any, files) {
    this.isLoading = true
    this.editFeedback = await feedbackService.create(body).finally(async () => {
      this.isLoading = !!(files && files.length)
    })
    const { wfUniqueId } = this.editFeedback
    if (files && files.length && wfUniqueId) {
      await fileService.upload(moduleFile.feedback, wfUniqueId, files).finally(() => {
        this.isLoading = false
      })
    }
  }

  @action
  async update(updateFeedbackInput: any, files) {
    this.isLoading = true
    await feedbackService.update(updateFeedbackInput).finally(async () => {
      const { wfUniqueId } = this.editFeedback
      this.isLoading = !!(files && files.length && wfUniqueId)
      if (files && files.length && wfUniqueId) {
        await fileService.upload(moduleFile.feedback, wfUniqueId, files).finally(() => {
          this.isLoading = false
        })
      }
    })
  }

  @action
  async delete(id: number) {
    await feedbackService.delete(id)
    this.feedbacks.items = this.feedbacks.items.filter((x) => x.id !== id)
  }

  @action
  async activateOrDeactivate(id: number, isActive) {
    await feedbackService.activateOrDeactivate(id, isActive)
  }

  @action
  async get(id: number) {
    this.isLoading = true
    this.editFeedback = await feedbackService.get(id).finally(() => (this.isLoading = false))
  }

  @action
  async createFeedback(customFields?) {
    this.editFeedback = new FeedbackModel()
  }

  @action
  async getAll(params: any) {
    this.isLoading = true
    let result = await feedbackService.getAll(params).finally(() => (this.isLoading = false))
    this.feedbacks = result
  }

  @action
  async getAllMyFeedback(params: any) {
    this.isLoading = true
    let result = await feedbackService.getAllMyFeedback(params).finally(() => (this.isLoading = false))
    this.feedbacks = result
  }

  @action
  async exportFeedbacks(params: any) {
    this.isLoading = true
    return await feedbackService.exportFeedback(params).finally(() => (this.isLoading = false))
  }
}

export default FeedbackStore
