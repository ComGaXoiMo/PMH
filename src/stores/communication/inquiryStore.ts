import { PagedResultDto } from "@services/dto/pagedResultDto";
import inquiryService from "@services/projects/inquiryService";
import { action, observable } from "mobx";

class InquiryStore {
  @observable isLoading: boolean = false;
  @observable source: Array<any> = [];
  @observable status: Array<any> = [];
  @observable pageResult: PagedResultDto<any> = {totalCount: 0, items: []}
  @observable inquiryDetail!: any
  @observable matchingListing!: any
  @observable matchingInquiry: PagedResultDto<any> = {totalCount: 0, items: []}
  
  @action getCategories = async () => {
    const res = await inquiryService.getCategories();
    this.status = res.filter((item) => item.typeCode === "InquiryStatus");
    this.source = res.filter((item) => item.typeCode === "InquirySource");
  };

  @action getAll = async (params) => {
    this.isLoading = true
    this.pageResult = await inquiryService.getAll(params).finally(() => this.isLoading = false);
  }
  @action
  async create(body) {
    let result = await inquiryService.create({...body})
    this.pageResult.items.push(result)
    return result
  }

  @action
  async update(params) {
    let result = await inquiryService.update({...params})
    this.pageResult!.items = this.pageResult?.items.map((news) => {
      if (news.id === params.id) return result
      return news
    })
  }

  @action async get(id) {
    this.isLoading = true
    const result = await inquiryService.get(id).finally(() => this.isLoading = false)
     this.inquiryDetail = result
  }
  @action async getMatchingListing(inquiryId) {
    this.isLoading = true
    this.matchingListing = await inquiryService.getMatchingListing(inquiryId).finally(() => this.isLoading = false)
  }
  @action async getMatchingInquiry(listingId) {
    this.isLoading = true
    this.matchingInquiry = await inquiryService.getMatchingInquiry(listingId).finally(() => this.isLoading = false)
  }
  
  

}

export default InquiryStore;
