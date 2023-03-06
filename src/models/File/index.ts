import { CreatorUser } from '../../services/administrator/user/dto/creatorUser'
import { mimeType } from '../../lib/appconst'
import { buildFileUrlWithEncToken } from '../../lib/helper'

export class FileModel {
  id?: number
  uid: string
  name: string
  status: string
  icon?: any
  url: string
  thumbUrl: string
  downloadUrl: string
  hasPreview: boolean
  creationTime?: Date
  creatorUserId?: number
  creatorUser?: CreatorUser
  isActive?: boolean
  fileUrl?: any

  constructor(uid?, name?, status?, url?, thumbUrl?) {
    this.id = undefined
    this.uid = uid
    this.name = name
    this.status = status
    this.icon = undefined
    this.url = url
    this.thumbUrl = thumbUrl
    this.downloadUrl = ''
    this.hasPreview = false
    this.creationTime = new Date()
    this.creatorUserId = undefined
    this.creatorUser = undefined
    this.isActive = true
  }

  public static assign(obj) {
    if (!obj) return undefined

    let newObj = Object.assign(new FileModel(), obj)
    newObj.name = obj.originalFileName
    newObj.uid = obj.guid
    newObj.url = buildFileUrlWithEncToken(obj.fileUrl)
    newObj.downloadUrl = buildFileUrlWithEncToken(obj.fileUrl)
    newObj.icon = mimeType[obj.mimeType]
    newObj.hasPreview = /^image\//.test(obj.mimeType)

    return newObj
  }

  public static assigns<T>(objs) {
    let results: FileModel[] = []
    objs.forEach((item) => results.push(this.assign(item)))
    return results
  }
}

export interface ImageFile {
  fileUrl: string
  mimeType: string
  description?: string
  originalFileName?: string
  fileName?: string
  guid: string
  id?: number
}
