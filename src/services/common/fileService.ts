import http from '../httpService'
import { L, LNotification } from '../../lib/abpUtility'
import { notifyError, notifySuccess, prepareLinkQueryString } from '../../lib/helper'
import { FileModel } from '../../models/File'
import { AppConfiguration, moduleNames } from '@lib/appconst'

class FileService {
  public async upload(moduleName, uniqueId, files: any) {
    const data = new FormData();
    data.append('file', files);

    // (files || []).forEach((file, index) => {
    //   data.append('file' + index, file)
    // })

    // data.append('file', files[0])
    let url;
    switch(moduleName) {
      case moduleNames.news:
        url = 'api/Documents/UploadNews'
        break;
      case moduleNames.company:
        url = 'api/Documents/UploadCompanies'
        break;
        case moduleNames.listing:
        url = 'api/Documents/UploadListings'
        break;
        case moduleNames.project:
          url = 'api/Documents/UploadProjects'
          break;
      default:
        // code block
    }
    if (url) {
      let result = await http.post(url, data, {
        headers: {
          'content-type': 'multipart/form-data'
        },
        params: { uniqueId }
      })
      return result.data.result
    }
    
  }

  public async get(uniqueId: string): Promise<FileModel[]> {
    if (!uniqueId) {
      notifyError(L('ERROR'), L('ENTITY_NOT_FOUND'))
    }

    let res = await http.get('api/services/app/Documents/GetDocuments', { params: { uniqueId } })
    const result = res.data.result
    return FileModel.assigns(result || [])
  }

  public async delete(id): Promise<any> {
    if (!id) {
      notifyError(L('ERROR'), L('ENTITY_NOT_FOUND'))
    }

    let res = await http.delete('api/services/app/Documents/Delete', { params: { id } })
    notifySuccess(LNotification('SUCCESS'), LNotification('DELETE_SUCCESSFULLY'))
    return res.data.result
  }

  public async downloadTempFile({fileName, fileType, fileToken}) {
    if (!fileName) {
      notifyError(L('ERROR'), L('FILE_NOT_FOUND'))
    }
    if (!fileToken) {
      notifyError(L('ERROR'), L('NOTIFICATION_DOWNLOAD_NEED_FILE_TOKEN'))
    }

    let url = prepareLinkQueryString({fileName, fileType, fileToken},
      AppConfiguration.remoteServiceBaseUrl + 'api/File/DownloadTempFile');

    window.open(url, '_blank');
  }
  public async updateMainPhoto(moduleId, parentId, fileId): Promise<any> {
    if (!fileId) {
      notifyError(L("Error"), L("EntityNotFound"));
    }

    let res = await http.put(
      `api/AttachmentDocument/MarkMainPhoto/${moduleId}/${parentId}/${fileId}`
    );
    return res.data.result;
  }
  public async update(file): Promise<any> {
    if (!file.id) {
      notifyError(L("Error"), L("EntityNotFound"));
    }

    let res = await http.post(
      `api/AttachmentDocument/UpdateFile/${file.id}`,
      file
    );
    notifySuccess(
      LNotification("SUCCESS"),
      LNotification("SAVING_SUCCESSFULLY")
    );

    return res.data.result;
  }

  public async getDocumentByModuleId(
    moduleId,
    parentId: string,
    type = "DOCUMENT"
  ): Promise<FileModel[]> {
    if (!parentId) {
      notifyError(L("Error"), L("EntityNotFound"));
    }

    // let res = await http.get(
    //   `api/AttachmentDocument/${moduleId}/${parentId}/${type}`
    // );
    // api/Documents/GetDocumentFile
    let res = await http.get('api/services/app/Documents/GetDocuments', {params: {uniqueId: parentId}})
    // const result = res.data.result.filter((item) => item.isActive);
    return FileModel.assigns(res.data.result || []);
  }
}

export default new FileService()
