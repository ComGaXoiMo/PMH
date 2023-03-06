import type { PagedResultDto } from "../../services/dto/pagedResultDto";
import http from "../httpService";
import { L, LNotification } from "../../lib/abpUtility";
import { notifyError, notifySuccess } from "../../lib/helper";
import {
  RowProjectModel,
  ProjectDetailModel,
  RowFloorModel,
} from "@models/project/projectModel";

class ProjectService {
  public async create(body: any) {
    let result = await http.post(
      "api/services/app/Project/CreateOrUpdate",
      body
    );
    notifySuccess(
      LNotification("SUCCESS"),
      LNotification("SAVING_SUCCESSFULLY")
    );
    return result.data.result;
  }

  public async createFloor(body: any) {
    let result = await http.post("api/Floor/Create", body);
    notifySuccess(
      LNotification("SUCCESS"),
      LNotification("SAVING_SUCCESSFULLY")
    );
    return result.data.result;
  }

  public async update(body: any) {
    let result = await http.post(
      `api/services/app/Project/CreateOrUpdate`,
      body
    );
    notifySuccess(
      LNotification("SUCCESS"),
      LNotification("SAVING_SUCCESSFULLY")
    );
    return result.data.result;
  }

  public async updateFloor(body: any) {
    // let result = await http.post(`api/Floor/update/${body.id}`, body);
    let result = await http.post(`api/services/app/Floor/CreateOrUpdate`, body);

    notifySuccess(
      LNotification("SUCCESS"),
      LNotification("SAVING_SUCCESSFULLY")
    );
    return result.data.result;
  }

  public async updateUnitOrder(body: any) {
    let result = await http.post(`api/services/app/Unit/OrderList`, body);
    notifySuccess(
      LNotification("SUCCESS"),
      LNotification("SAVING_SUCCESSFULLY")
    );
    return result.data.result;
  }

  public async updateProjectAddress(projectId, body: any) {
    let result = await http.post(
      "api/services/app/Project/CreateOrUpdateProjectAddress",
      [body]
    );
    notifySuccess(
      LNotification("SUCCESS"),
      LNotification("SAVING_SUCCESSFULLY")
    );
    return result.data.result;
  }

  public async updateFloorOrder(body: any) {
    let result = await http.post(`api/services/app/Floor/OrderList`, body);
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

    let result = await http.get("api/services/app/Project/Get", {
      params: { id },
    });

    return ProjectDetailModel.assign(result.data.result);
  }

  public async getAll(params: any): Promise<PagedResultDto<any>> {
    let res = await http.get("api/services/app/Project/GetAll", { params });
    let { result } = res.data;
    return result;
  }

  public async getFloors(projectId, params: any): Promise<any> {
    let res = await http.get("api/services/app/Floor/GetFloorByProject", {
      params: { ...params, projectId },
    });
    let { result } = res.data;

    return RowFloorModel.assigns(result);
  }

  public async getUnits(projectId, params: any): Promise<any> {
    let res = await http.get("api/services/app/Unit/GetListUnitsByProject", {
      params: { ...params, projectId },
    });
    let { result } = res.data;

    return RowFloorModel.assigns(result);
  }
  public async filterOptions(params: any): Promise<PagedResultDto<any>> {
    params.pageNumber = 1;
    params.pageSize = 20;
    let res = await http.get("api/services/app/Project/GetAll", { params });
    let { result } = res.data;
    result.items = RowProjectModel.assigns(result.items);

    return result.items;
  }

  public async countUnitByStatus(params) {
    let res = await http.get("api/services/app/Unit/GetUnitStatus", { params });
    let { result } = res.data;

    return result.map((item) => ({
      name: item.name,
      value: item.count,
    }));
  }
  public async countUnitByType(params) {
    let res = await http.get("api/services/app/Unit/GetUnitType", { params });
    let { result } = res.data;

    return result.map((item) => ({
      name: item.name,
      value: item.count,
    }));
  }
  public async getTransportation(keyword) {
    return await http.get("api/services/app/Category/GetListTransportations", {
      params: { keyword },
    });
  }
}

export default new ProjectService();
