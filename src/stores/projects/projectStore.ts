import { action, observable } from "mobx";

import { PagedResultDto } from "@services/dto/pagedResultDto";
import projectService from "@services/projects/projectService";
import unitService from "@services/projects/unitService";

class ProjectStore {
  @observable isLoading!: boolean;
  @observable tableData!: PagedResultDto<any>;
  @observable floors!: any;
  @observable units!: any;
  @observable editProject!: any;
  @observable editFloor!: any;
  @observable editProjectUnit!: any;
  @observable transportations: any = [];
  @observable projectOptions: any = [];

  constructor() {
    this.tableData = { items: [], totalCount: 0 };
  }

  @action
  async create(updateInput: any) {
    this.isLoading = true;
    const body = {
      ...updateInput,
      projectAddress: Array.isArray(updateInput.projectAddress)
        ? updateInput.projectAddress
        : [updateInput.projectAddress],
    };
    this.editProject = await projectService
      .create(body)
      .finally(() => (this.isLoading = false));
  }

  @action
  async createFloor(body: any) {
    this.isLoading = true;
    await projectService
      .createFloor(body)
      .finally(() => (this.isLoading = false));
  }

  @action
  async createUnit(body: any) {
    this.isLoading = true;
    await unitService.create(body).finally(() => (this.isLoading = false));
  }

  @action
  async createProject() {
    this.editProject = {
      name: "",
      isActive: true,
      projectAddress: {},
    };
  }

  @action
  async createProjectUnit() {
    this.editProjectUnit = {
      name: "",
      isActive: true,
    };
  }

  @action
  async getProjectUnit(id) {
    this.editProjectUnit = await unitService.get(id);
  }

  @action
  async update(updateInput: any) {
    this.isLoading = true;
    const body = {
      ...updateInput,
      projectAddress: Array.isArray(updateInput.projectAddress)
        ? updateInput.projectAddress
        : [updateInput.projectAddress],
    };
    await projectService.update(body).finally(() => (this.isLoading = false));
  }

  @action
  async updateFloor(body: any) {
    this.isLoading = true;
    await projectService
      .updateFloor(body)
      .finally(() => (this.isLoading = false));
  }

  @action
  async updateUnit(body: any) {
    this.isLoading = true;
    await unitService.update(body).finally(() => (this.isLoading = false));
  }

  @action
  async updateProjectAddress(projectId, body: any) {
    this.isLoading = true;
    await projectService
      .updateProjectAddress(projectId, body)
      .finally(() => (this.isLoading = false));
  }

  @action
  async delete(id: number) {
    await projectService.delete(id);
    this.tableData.items = this.tableData.items.filter((x) => x.id !== id);
  }

  @action
  async activateOrDeactivate(id: number, isActive) {
    await projectService.activateOrDeactivate(id, isActive);
  }

  @action
  async get(id: number) {
    this.editProject = await projectService.get(id);
  }

  @action
  async getAll(params: any) {
    this.isLoading = true;
    this.tableData = await projectService
      .getAll(params)
      .finally(() => (this.isLoading = false));
  }

  @action
  async getFloors(projectId, params: any) {
    this.isLoading = true;
    this.floors = await projectService
      .getFloors(projectId, params)
      .finally(() => (this.isLoading = false));
  }

  @action
  async getUnits(projectId, params: any) {
    this.isLoading = true;
    this.units = await projectService
      .getUnits(projectId, params)
      .finally(() => (this.isLoading = false));
  }
  @action getTransportations = async (keyword) => {
    this.transportations = (
      await projectService.getTransportation(keyword)
    ).data.result;
  };
  @action
  async filterOptions(params: any) {
    params.maxResultCount = 1000;
    params.isActive = true;
    params.sorting = "Name ASC";
    let result = await projectService.filterOptions(params);
    this.projectOptions = result;
  }
}

export default ProjectStore;
