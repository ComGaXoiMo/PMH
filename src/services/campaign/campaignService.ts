import type { PagedResultDto } from "../../services/dto/pagedResultDto";
import http from "../httpService";
import { L, LNotification } from "../../lib/abpUtility";
import { notifyError, notifySuccess } from "../../lib/helper";
import moment from "moment-timezone";
import { RowCampaignModel } from "@models/campaign";

class CampaignService {
  public async create(body: any) {
    let result = await http.post("api/services/app/Residents/Create", body);
    notifySuccess(
      LNotification("SUCCESS"),
      LNotification("SAVING_SUCCESSFULLY")
    );
    return result.data.result;
  }

  public async update(body: any) {
    let result = await http.post("api/services/app/Residents/Update", body);
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

  public async get(id: number): Promise<any> {
    if (!id) {
      notifyError(L("Error"), L("EntityNotFound"));
    }

    let result = await http.get("api/services/app/Residents/Get", {
      params: { id },
    });
    if (result.data.result && result.data.result.birthDate) {
      result.data.result.birthDate = moment(result.data.result.birthDate);
    }
    return result.data.result;
  }

  public async getAll(params: any): Promise<PagedResultDto<any>> {
    let res = await http.post("api/Campaign/Filters", params);
    let { result } = res.data;
    result.items = RowCampaignModel.assigns(result.items);
    return result;
  }
}

export default new CampaignService();
