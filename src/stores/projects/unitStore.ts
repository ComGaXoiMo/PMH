import { action, observable } from "mobx";

import type { PagedResultDto } from "../../services/dto/pagedResultDto";
import unitService from "@services/projects/unitService";

class UnitStore {
  @observable isLoading!: boolean;
  @observable tableData!: PagedResultDto<any>;
  @observable unitHistories!: any[];
  @observable unitRequirements!: any[];
  @observable editUnit!: any;
  @observable editUnitRes!: any;
  @observable editUnitTenant!: any;
  @observable facing: any = [];
  @observable view: any = [];
  @observable facilities: any = [];
  @observable unitTypes: any = [];
  @observable publishedUnits!: any[];

  constructor() {
    this.tableData = { items: [], totalCount: 0 };
    this.unitHistories = [];
  }

  @action async getUnitRes(id) {
    let result = await unitService.getUnitRes(id);
    let unitAddress = result.unitAddress.length
      ? { ...result.unitAddress[0] }
      : {};
    this.editUnitRes = { ...result, unitAddress };
  }

  @action
  async create(body: any) {
    let result = await unitService.create(body);
    this.editUnit = result;
    this.tableData.items.push(result);
  }

  @action async createUnitRes(body, id) {
    let unitAddress = body.unitAddress.address ? [body.unitAddress] : [];
    let newBody = id ? { ...body, unitAddress, id } : { ...body, unitAddress };
    await unitService.createUnitRes(newBody);
  }

  @action
  async createUnitTenant(body: any) {
    body.isActive = true;
    await unitService.createUnitTenant(body);
  }

  @action
  async createUnit() {
    this.editUnit = {
      name: "",
      isActive: true,
      id: 0,
    };
  }
  @action
  async initUnitTenant(space, monthly, per) {
    this.editUnitTenant = {
      isActive: true,
      space,
      monthly,
      per,
      id: 0,
    };
  }

  @action
  async update(updateStaffInput: any) {
    let result = await unitService.update(updateStaffInput);
    this.tableData.items = this.tableData.items.map((x) => {
      if (x.id === updateStaffInput.id) x = result;
      return x;
    });
  }

  @action
  async updateUnitTenant(body: any) {
    await unitService.updateTenantUnit(body);
  }

  @action
  async delete(id: number) {
    await unitService.delete(id);
    this.tableData.items = this.tableData.items.filter((x) => x.id !== id);
  }

  @action
  async deleteTenantUnit(id: number) {
    await unitService.deleteTenantUnit(id);
    this.unitHistories = this.unitHistories.filter((x) => x.id !== id);
  }

  @action
  async activateOrDeactivate(id: number, isActive) {
    await unitService.activateOrDeactivate(id, isActive);
  }

  @action
  async get(id: number) {
    let result = await unitService.get(id);
    this.editUnit = result;
  }

  @action
  async getUnitTenantById(id: number) {
    let result = await unitService.getUnitTenantById(id);
    this.editUnitTenant = result;
  }

  @action
  async getAll(params: any) {
    this.isLoading = true;
    let result = await unitService
      .getAll(params)
      .finally(() => (this.isLoading = false));
    this.tableData = result;
  }

  async getAllRes(params: any) {
    this.isLoading = true;
    let result = await unitService
      .getAllRes(params)
      .finally(() => (this.isLoading = false));
    this.tableData = result;
    return result.items;
  }

  @action
  async getAllUnitHistories(params: any) {
    this.isLoading = true;
    let result = await unitService
      .getAllUnitHistories(params)
      .finally(() => (this.isLoading = false));
    this.unitHistories = result;
  }

  @action
  async getAllUnitRequirements(params: any) {
    this.isLoading = true;
    let result = await unitService
      .getAllUnitRequirements(params)
      .finally(() => (this.isLoading = false));
    this.unitRequirements = result;
  }
  @action async getFacing() {
    this.facing = await unitService.getFacing();
  }
  @action async getFacilities() {
    this.facilities = await unitService.getFacilities();
  }
  @action async getView() {
    this.view = await unitService.getView();
  }
  @action
  async getUnitTypes() {
    let result = await unitService.getUnitTypes();
    this.unitTypes = result;
  }
  @action
  async getUnitsByProjectIds(projectIds: number[] | number, params = {}) {
    this.publishedUnits = await unitService.getUnitByProjectIds(
      projectIds,
      params
    );
  }
}

export default UnitStore;
