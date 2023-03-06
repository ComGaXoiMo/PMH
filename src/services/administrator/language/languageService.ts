import { EntityDto } from '../../dto/entityDto'
import { PagedLanguageResultRequestDto, PagedLanguageTextResultRequestDto } from './dto/PagedLanguageResultRequestDto'
import { LanguageTextDto } from './dto/languageTextDto'
import http from '../../httpService'
import { PagedResultDto } from '../../dto/pagedResultDto'
import { notifySuccess } from '@lib/helper'
import { L, LNotification } from '@lib/abpUtility'

class LanguageService {
  public async create(createLanguageInput) {
    let result = await http.post('api/services/app/Language/CreateOrUpdateLanguage', createLanguageInput)
    notifySuccess(LNotification('SUCCESS'), LNotification(L('SAVE_SUCCESSFULLY')))
    return result.data.result
  }

  public async update(updateLanguageInput) {
    let result = await http.put('api/services/app/Language/CreateOrUpdateLanguage', updateLanguageInput)
    notifySuccess(LNotification('SUCCESS'), LNotification(L('SAVE_SUCCESSFULLY')))
    return result.data.result
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Language/DeleteLanguage', { params: entityDto })
    return result.data
  }

  public async deleteLanguageText(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Language/DeleteLanguageText', { params: entityDto })
    return result.data
  }

  public async changeLanguage(changeLanguageInput) {
    let result = await http.post('api/services/app/Language/ChangeLanguage', changeLanguageInput)
    return result.data
  }

  public async get(entityDto: EntityDto): Promise<any> {
    let result = await http.get('api/services/app/Language/GetLanguageForEdit', { params: entityDto })
    return result.data.result
  }

  public async getAll(pagedFilterAndSortedRequest: PagedLanguageResultRequestDto): Promise<any> {
    let result = await http.get('api/services/app/Language/GetLanguages', { params: pagedFilterAndSortedRequest })
    return result.data.result
  }

  // Language text
  public async createOrUpdateLanguageText(createLanguageInput) {
    let result = await http.put('api/services/app/Language/UpdateLanguageText', createLanguageInput)
    notifySuccess(LNotification('SUCCESS'), LNotification(L('SAVE_SUCCESSFULLY')))
    return result.data.result
  }

  public async getAllLanguageText(
    pagedFilterAndSortedRequest: PagedLanguageTextResultRequestDto
  ): Promise<PagedResultDto<LanguageTextDto>> {
    let result = await http.get('api/services/app/Language/GetLanguageTexts', { params: pagedFilterAndSortedRequest })
    return result.data.result
  }
}

export default new LanguageService()
