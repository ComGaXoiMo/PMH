import http from "../httpService";
import { LNotification } from "../../lib/abpUtility";
import { notifySuccess } from "../../lib/helper";

class ListingService {
  public async create(body: any) {
    let result = await http.post("api/Unit/Create", body);
    notifySuccess(
      LNotification("SUCCESS"),
      LNotification("SAVING_SUCCESSFULLY")
    );
    return result.data.result;
  }
  public async getAllListing(params) {
    let result = await http.get("api/services/app/Listing/GetAll", { params });
    return result.data.result;
  }
  public async getListingCategory(params) {
    let result = await http.get(
      "api/services/app/Category/GetListListingCategory",
      { params }
    );
    return result.data.result;
  }
  public async createListing(body) {
    let result = await http.post(
      "api/services/app/Listing/CreateOrUpdate",
      body
    );
    return result.data.result;
  }

  public async getListingDetail(id) {
    let result = await http.get("api/services/app/Listing/Get", {
      params: { id },
    });
    return result.data.result;
  }

  public async getListingCompare(ids) {
    let result = await http.get("api/services/app/Listing/GetAll", {
      params: { ids },
    });
    return result.data.result.items;
  }
}

export default new ListingService();
