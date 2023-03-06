import { action, observable } from "mobx";

import type { PagedResultDto } from "../../services/dto/pagedResultDto";
import taskService from "@services/activity/taskService";

class TaskStore {
  @observable isLoading!: boolean;
  @observable tableData!: PagedResultDto<any>;
  @observable editFinancial!: any;

  constructor() {
    this.tableData = { items: [], totalCount: 0 };
  }

  @action
  async create(body: any) {
    let result = await taskService.create(body);
    this.editFinancial = result;
    this.tableData.items.push(result);
  }

  @action
  async createStaff() {
    this.editFinancial = {
      userName: "",
      name: "",
      surname: "",
      displayName: "",
      emailAddress: "",
      isActive: true,
      roleNames: [],
      password: "",
      id: 0,
    };
  }

  @action
  async update(updateStaffInput: any) {
    let result = await taskService.update(updateStaffInput);
    this.tableData.items = this.tableData.items.map((x) => {
      if (x.id === updateStaffInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(id: number) {
    await taskService.delete(id);
    this.tableData.items = this.tableData.items.filter((x) => x.id !== id);
  }

  @action
  async activateOrDeactivate(id: number, isActive) {
    await taskService.activateOrDeactivate(id, isActive);
  }

  @action
  async get(id: number) {
    let result = await taskService.get(id);
    this.editFinancial = result;
  }

  @action
  async getAll(params: any) {
    this.isLoading = true;
    let result = await taskService
      .getAll(params)
      .finally(() => (this.isLoading = false));
    this.tableData = result;
  }
}

export default TaskStore;
