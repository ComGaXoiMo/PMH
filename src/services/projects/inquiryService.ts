import { L, LNotification } from "@lib/abpUtility";
import { notifyError, notifySuccess } from "@lib/helper";
import { PagedResultDto } from "@services/dto/pagedResultDto";
import http from "../httpService";

class InquiryService {
  public async getCategories() {
    let res = await http.get(`api/Category/GetInquiryCategory`);
    return res.data.result;
  }
  public async getAll(params: any): Promise<PagedResultDto<any>> {
    let res = await http.get("api/services/app/Inquiry/GetAll", {params});
    let { result } = res.data;
    return result;
  }
  public async create(body: any) {
    let res = await http.post('api/services/app/Inquiry/CreateOrUpdate', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return res.data.result
  }

  public async update(body: any) {
    let res = await http.post('api/services/app/Inquiry/CreateOrUpdate', body)
    notifySuccess(LNotification('SUCCESS'), LNotification('SAVING_SUCCESSFULLY'))
    return res.data.result
  }

  // public async delete(id: number) {
  //   let res = await http.delete('api/services/app/Employees/Delete', { params: { id } })
  //   return res.data
  // }

  // public async activateOrDeactivate(id: number, isActive) {
  //   let res = await http.post('api/services/app/Employees/Active', { id }, { params: { isActive } })
  //   notifySuccess(LNotification('SUCCESS'), LNotification('UPDATE_SUCCESSFULLY'))
  //   return res.data
  // }

  public async get(id: number): Promise<any> {
    if (!id) {
      notifyError(L('ERROR'), L('ENTITY_NOT_FOUND'))
    }
    let res = await http.get('api/services/app/Inquiry/Get', { params: { id } })
    return res.data.result
  }
  public async getMatchingListing(inquiryId: any): Promise<any> {
    let res = await http.get('api/services/app/Listing/GetMatchingListing', { params: {inquiryId} })
    return res.data.result
  }
  public async getMatchingInquiry(listingId: number): Promise<any> {
    let res = await http.get('api/services/app/Inquiry/GetMatchingInquiry', { params: {listingId} })
    return res.data.result
  }
  
}

export default new InquiryService();
