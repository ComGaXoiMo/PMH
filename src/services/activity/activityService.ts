import { PagedResultDto } from "../dto/pagedResultDto";
import http from "../httpService";
import { L, LNotification } from "../../lib/abpUtility";
import { notifyError, notifySuccess } from "../../lib/helper";
import {
  ActivityDetailModel,
  RowActivityModel,
} from "@models/activity/activityModel";

class ActivityService {
  public async create(body: any, moduleId, parentId) {
    body.activityReminder = body.activityReminder.filter(item => item.moduleName !== "" && item.value !== "")
    body.activityUser = body.activityUserIds;
    body.activityOrganizationUnit = body.activityOrganizationUnitIds;

    let url = `api/services/app/Activity/CreateOrUpdate`;
    let result = await http.post(url, body, {params: {moduleId, referenceId: parentId}});
    notifySuccess(
      LNotification("SUCCESS"),
      LNotification("SAVING_SUCCESSFULLY")
    );
    return result.data.result;
  }

  public async update(body: any, moduleId, parentId) {
    body.activityReminder = body.activityReminder.filter(item => item.moduleName !== "" && item.value !== "")
    body.activityUser = body.activityUserIds;
    body.activityOrganizationUnit = body.activityOrganizationUnitIds;

    let result = await http.post(
      `api/services/app/Activity/CreateOrUpdate`,
      body,
      {params: {moduleId, referenceId: parentId}}
    );
    notifySuccess(
      LNotification("SUCCESS"),
      LNotification("SAVING_SUCCESSFULLY")
    );
    return result.data.result;
  }

  public async delete(id: number) {
    let result = await http.delete("api/Activity/Create/Delete", {
      params: { id },
    });
    return result.data;
  }

  public async deactivate(activityId: number) {
    let result = await http.put("/api/Activity/Deactive", null, {
      params: { activityId },
    });
    return result.data;
  }

  public async get(id: number): Promise<any> {
    if (!id) {
      notifyError(L("Error"), L("EntityNotFound"));
    }
    
    let result = await http.get('api/services/app/Activity/Get', {params: {id}});
    // let result = await http.get(`api/Activity/${id}`);

    return ActivityDetailModel.assign(result.data.result);
  }

  public async getAll(params: any): Promise<PagedResultDto<any>> {
    let res = await http.get("api/services/app/Activity/GetAll", {params});
    let { result } = res.data;
    result.items = RowActivityModel.assigns(result.items);
    return result;
  }

  public async getAll4Calendar(params: any): Promise<PagedResultDto<any>> {
    let res = await http.get("api/services/app/Activity/GetActivityByType", {params});
    let { result } = res.data;
    // result.items = RowActivityModel.assigns(result.items);
    return {totalCount: 0, items: result};
  }

  public async getActivityCategories(params: any): Promise<any> {
    let res = await http.get("api/services/app/Activity/GetListActivityType", {params});
    return res.data.result;
  }

  public async getAllByModule(
    params: any,
    moduleId,
    parentId
  ): Promise<PagedResultDto<any>> {
    let url = `api/services/app/Activity/GetListActivityByModule`;
    let res = await http.get(url, {params: {...params, moduleId: moduleId, referenceId: parentId }});
    let { result } = res.data;
    result.items = RowActivityModel.assigns(result.items);
    return result;
  }

  public async getAllCompanyActivity(
    params: any
  ): Promise<PagedResultDto<any>> {
    let url = `api/services/app/Activity/GetListActivityOfCompany`;
    let res = await http.get(url, { params });
    let { result } = res.data;
    result.items = RowActivityModel.assigns(result.items);
    return result;
  }
}

export default new ActivityService();
