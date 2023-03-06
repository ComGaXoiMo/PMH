import { action, observable } from 'mobx'
import fileService from '../../services/common/fileService'
import { FileModel } from '../../models/File'

class FileStore {
  @observable currentFiles: FileModel[] = []

  @action
  async getFiles(id?) {
    this.currentFiles = []
    if (!id) {
      return
    }
    let result = await fileService.get(id)
    this.currentFiles = result
  }

  @action
  async delete(guid) {
    await fileService.delete(guid)
    this.currentFiles = this.currentFiles.filter((item) => item.uid !== guid)
  }

  @action
  async update(file) {
    file.isMainPhoto = false;
    await fileService.update(file);
  }

  @action
  async updateMainPhoto(moduleId, parentId, fileId) {
    await fileService.updateMainPhoto(moduleId, parentId, fileId);
  }
}

export default FileStore
