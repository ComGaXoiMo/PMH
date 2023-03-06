import { action, observable } from "mobx";

import type { PagedResultDto } from "../../services/dto/pagedResultDto";
import companyService from "@services/clientManagement/companyService";
import { AddressModel } from "@models/common/addressModel";

class CompanyStore {
  @observable isLoading!: boolean;
  @observable tableData!: PagedResultDto<any>;
  @observable editCompany!: any;

  constructor() {
    this.tableData = { items: [], totalCount: 0 };
  }

  @action
  async create(body: any) {
    if (body.companyUserIds) {
      body.companyUser = body.companyUserIds.map((userId) => ({ userId }));
    }
    if (body.companyOrganizationUnitIds) {
      body.companyOrganizationUnit = body.companyOrganizationUnitIds.map(
        (organizationUnitId) => ({ organizationUnitId })
      );
    }
    this.isLoading = true;
    this.editCompany = await companyService
      .create(body)
      .finally(() => (this.isLoading = false));
    return this.editCompany;
  }

  @action
  async createCompany() {
    this.editCompany = {
      name: "",
      isActive: true,
      isVerified: true,
      id: 0,
      companyAddress: [new AddressModel(null, null, null, null, true)],
    };
  }

  @action
  async update(body: any) {
    if (body.companyUserIds) {
      body.companyUser = body.companyUserIds.map((userId) => ({ userId }));
    }
    if (body.companyOrganizationUnitIds) {
      body.companyOrganizationUnit = body.companyOrganizationUnitIds.map(
        (organizationUnitId) => ({ organizationUnitId })
      );
    }

    this.isLoading = true;
    await companyService.update(body).finally(() => (this.isLoading = false));
  }

  @action
  async delete(id: number) {
    await companyService.delete(id);
    this.tableData.items = this.tableData.items.filter((x) => x.id !== id);
  }

  @action
  async activateOrDeactivate(id: number, isActive) {
    await companyService.activateOrDeactivate(id, isActive);
  }

  @action
  async get(id: number) {
    let result = await companyService.get(id);
    this.editCompany = result;
  }

  @action
  async getAll(params: any) {
    this.isLoading = true;
    let result = await companyService
      .getAll(params)
      .finally(() => (this.isLoading = false));
    this.tableData = result;
  }
}

export default CompanyStore;
