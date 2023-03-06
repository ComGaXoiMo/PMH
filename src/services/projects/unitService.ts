import type { PagedResultDto } from "../../services/dto/pagedResultDto";
import http from "../httpService";
import { L, LNotification } from "../../lib/abpUtility";
import { notifyError, notifySuccess } from "../../lib/helper";
import moment from "moment-timezone";
import { RowUnitModel } from "@models/project/unitModel";

class UnitService {
  public async create(body: any) {
    let result = await http.post("api/Unit/Create", body);
    notifySuccess(
      LNotification("SUCCESS"),
      LNotification("SAVING_SUCCESSFULLY")
    );
    return result.data.result;
  }

  public async createUnitTenant(body: any) {
    let result = await http.post("api/UnitHistory/Create", body);
    notifySuccess(
      LNotification("SUCCESS"),
      LNotification("SAVING_SUCCESSFULLY")
    );
    return result.data.result;
  }

  public async update(body: any) {
    let result = await http.post(`api/Unit/Update/${body.id}`, body);
    notifySuccess(
      LNotification("SUCCESS"),
      LNotification("SAVING_SUCCESSFULLY")
    );
    return result.data.result;
  }

  public async updateTenantUnit(body: any) {
    let result = await http.post(`api/UnitHistory/Update/${body.id}`, body);
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

  public async deleteTenantUnit(id: number) {
    let result = await http.delete("api/UnitHistory/Delete", {
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

    let result = await http.get(`api/services/app/Unit/GetUnitResDetails`, {
      params: { id },
    });
    if (result.data.result && result.data.result.birthDate) {
      result.data.result.birthDate = moment(result.data.result.birthDate);
    }
    return result.data.result;
  }

  public async getUnitTenantById(id: number): Promise<any> {
    if (!id) {
      notifyError(L("Error"), L("EntityNotFound"));
    }

    let result = await http.get(`api/UnitHistory/Details/${id}`);
    if (result.data.result && result.data.result.startDate) {
      result.data.result.startDate = moment(result.data.result.startDate);
    }
    if (result.data.result && result.data.result.expiredDate) {
      result.data.result.expiredDate = moment(result.data.result.expiredDate);
    }
    return result.data.result;
  }

  public async getAll(params: any): Promise<PagedResultDto<any>> {
    let res = await http.post("api/Unit/Filters", params);
    let { result } = res.data;
    result.items = RowUnitModel.assigns(result.items);

    return result;
  }

  public async getAllRes(params: any): Promise<PagedResultDto<any>> {
    let res = await http.get("api/services/app/Unit/GetListUnitRes", {
      params,
    });
    let { result } = res.data;
    result.items = RowUnitModel.assigns(result.items);

    return result;
  }

  public async getAllUnitHistories(params: any): Promise<any> {
    let res = await http.get(
      `api/UnitHistory/GetListHistoryUnit/${params.unitId}`,
      { params }
    );
    let { result } = res.data;

    return result;
  }

  public async getAllUnitRequirements(params: any): Promise<any> {
    let res = await http.get(`api/Request/MatchingUnits/${params.unitId}`, {
      params,
    });
    let { result } = res.data;

    return result;
  }

  public async getProjectProvinces(params: any): Promise<any> {
    let res = await http.get(
      `api/services/app/Category/GetListProjectProvince`,
      { params }
    );
    let { result } = res.data;

    return (result || []).map((item) => {
      item.name = item.provinceName;
      return item;
    });
  }

  public async getProjectDistricts(params: any): Promise<any> {
    let res = await http.get(
      "api/services/app/Category/GetListProjectDistrict",
      { params }
    );
    let { result } = res.data;

    return (result || []).map((item) => {
      item.name = item.districtName;
      return item;
    });
  }
  public async getFacing() {
    let res = (await http.get("/api/services/app/Category/GetListFacing")).data
      .result;
    return res;
  }
  public async getFacilities() {
    let res = (await http.get("api/services/app/Category/GetListFacilities"))
      .data.result;
    return res;
  }
  public async getView() {
    let res = (await http.get("/api/services/app/Category/GetListView")).data
      .result;
    return res;
  }
  public async createUnitRes(body) {
    let res = await http.post("api/services/app/Unit/CreateOrUpdateRes", body);
    return res.data.result;
  }

  public async getUnitRes(id) {
    return (
      await http.get("api/services/app/Unit/GetUnitResDetails", {
        params: { id },
      })
    ).data.result;
  }
  public async getUnitTypes() {
    let response = await http.get(
      "api/services/app/ProjectCategory/GetByTargets",
      {
        params: { target: "UNITTYPE" },
      }
    );
    return (response.data.result || []).map((item) => {
      return { ...item, value: item.id, label: item.name };
    });
  }
  public async getUnits(params) {
    if (!params.skipCount) {
      params.skipCount = 0;
    }
    if (!params.maxResultCount) {
      params.maxResultCount = 20;
    }
    const response = await http.get("api/services/app/Units/GetUnits", {
      params,
    });
    return response.data.result.items;
  }
  public async getUnitByProjectIds(projectIds: number[] | number, params = {}) {
    if (projectIds instanceof Array && !projectIds.length) {
      return [];
    }

    if (projectIds === -1) {
      return this.getUnits(params);
    }

    return this.getUnits({ ...params, projectIds });
  }
  public async filterAllOptions(params: any): Promise<any> {
    if (!params.maxResultCount) {
      params.maxResultCount = 20;
    }
    if (!params.skipCount) {
      params.skipCount = 0;
    }

    let result = await http.get("api/services/app/Units/GetLists", { params });
    return (result.data?.result || []).map((item) => ({
      id: item.id,
      fullUnitCode: item.fullUnitCode,
      value: item.id,
      label: item.fullUnitCode,
      projectName: item.project?.name,
    }));
  }
}

export default new UnitService();
