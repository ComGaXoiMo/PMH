import http from "@services/httpService";
import { notifyError, notifySuccess } from "@lib/helper";
import { L, LNotification } from "@lib/abpUtility";
import { PagedResultDto } from "@services/dto/pagedResultDto";
import { RowContactModel } from "@models/clientManagement/contactModel";
import { ContactDetailModel } from "@models/clientManagement/contactModel";

class ContactService {
  public async create(body: any) {
    let result = await http.post("api/services/app/Contact/CreateOrUpdate", body);
    notifySuccess(
      LNotification("SUCCESS"),
      LNotification("SAVING_SUCCESSFULLY")
    );
    return result.data.result;
  }

  public async update(body: any) {
    let result = await http.post("api/services/app/Contact/CreateOrUpdate", body);
    notifySuccess(
      LNotification("SUCCESS"),
      LNotification("SAVING_SUCCESSFULLY")
    );
    return result.data.result;
  }

  public async delete(id: number) {
    let result = await http.delete("api/services/app/Residents/Delete", {
      params: { id },
    });
    return result.data;
  }

  public async activateOrDeactivate(id: number, isActive) {
    let result = await http.post(
      "api/services/app/Residents/Active",
      { id },
      { params: { isActive } }
    );
    return result.data;
  }

  public async get(id: number, isShowFull: boolean): Promise<any> {
    if (!id) {
      notifyError(L("Error"), L("EntityNotFound"));
    }

    // let res = await http.get(
    //   `api/services/app/Contact/Get/${id}?isShowFull=${isShowFull === true ? "true" : "false"}`
    // );
    let res = await http.get(
      `api/services/app/Contact/Get`, {params: {id, isShowFull}}
    );
    let { result } = res.data;

    return ContactDetailModel.assign(result);
  }

  public async getAll(params: any): Promise<PagedResultDto<any>> {
    // if (params.levelIds) {
    //   params.levelIds = params.levelIds.join(",");
    // }
    let res = await http.get("api/services/app/Contact/GetAll", {params});
    let { result } = res.data;
    result.items = RowContactModel.assigns(result.items);

    return result;
  }

  public async filterOptions(params: any): Promise<any> {
    params.pageNumber = 1;
    params.pageSize = 20;
    let res = await http.get("api/services/app/Contact/GetAll", {params});
    let { result } = res.data;
    result.items = RowContactModel.assigns(result.items);

    return result.items;
  }
  
  public async checkExistContact(params: any): Promise<PagedResultDto<any>> {
    let res = await http.get("api/services/app/Contact/GetListExistContact", {params});
    let { result } = res.data;
    result.items = RowContactModel.assigns(result.items);

    return result;
  }
}

export default new ContactService();
