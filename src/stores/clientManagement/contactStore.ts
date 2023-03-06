import { action, observable } from "mobx";

import type { PagedResultDto } from "../../services/dto/pagedResultDto";
import contactService from "@services/clientManagement/contactService";
import { AddressModel } from "@models/common/addressModel";

class ContactStore {
  @observable isLoading!: boolean;
  @observable tableData!: PagedResultDto<any>;
  @observable editContact!: any;

  constructor() {
    this.tableData = { items: [], totalCount: 0 };
  }

  @action
  async create(body: any) {
    this.isLoading = true;
    this.editContact = await contactService
      .create(body)
      .finally(() => (this.isLoading = false));
    return this.editContact;
  }

  @action
  async createContact() {
    this.editContact = {
      name: "",
      isActive: true,
      isVerified: true,
      contactAddress: [new AddressModel(null, null, null, null, true)],
      id: 0,
    };
  }

  @action
  async update(updateContactInput: any) {
    this.isLoading = true;
    await contactService
      .update(updateContactInput)
      .finally(() => (this.isLoading = false));
  }

  @action
  async delete(id: number) {
    await contactService.delete(id);
    this.tableData.items = this.tableData.items.filter((x) => x.id !== id);
  }

  @action
  async activateOrDeactivate(id: number, isActive) {
    await contactService.activateOrDeactivate(id, isActive);
  }

  @action
  async get(id: number, isShowFull: boolean) {
    let result = await contactService.get(id, isShowFull);
    this.editContact = result;
  }

  @action
  async getAll(params: any) {
    this.isLoading = true;
    let result = await contactService
      .getAll(params)
      .finally(() => (this.isLoading = false));
    this.tableData = result;
  }
}

export default ContactStore;
