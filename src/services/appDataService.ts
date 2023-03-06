import http from "./httpService";
import { AppConfiguration } from "@lib/appconst";
import axios from "axios";
import { OptionModel } from "@models/global";

class AppDataService {
  public async getAppConfiguration(): Promise<any> {
    const httpTemp = axios.create();
    let result = await httpTemp.get(
      process.env.NODE_ENV === "production"
        ? "/configuration.json"
        : "/assets/configuration.json"
    );
    AppConfiguration.remoteServiceBaseUrl = result.data.remoteServiceBaseUrl;
    AppConfiguration.appBaseUrl = result.data.appBaseUrl;
    AppConfiguration.appLayoutConfig = result.data.appLayoutConfig;
    AppConfiguration.googleMapKey =
      result.data.googleMapKey || AppConfiguration.googleMapKey;
    http.defaults.baseURL = result.data.remoteServiceBaseUrl;
  }
  public async getLinkDashboard(): Promise<any> {
    let res = await http.get("api/Statistic/GetLinkDashboard");
    let { result } = res.data;
    return result;
  }

  public async getCountries(params: any): Promise<any> {
    let res = await http.get("api/services/app/Category/GetListCountry", {
      ...params,
    });
    let { result } = res.data;
    return (result || []).map((item) => {
      item.phoneCodeName = `${item.countryCode} (+${item.phoneCode})`;
      item.name = item.countryName;
      item.label = item.countryName;
      item.value = item.id;
      item.isLeaf = false; // for Cascader
      return item;
    });
  }

  public async getCountryFull(params: any): Promise<any> {
    let res = await http.get("api/services/app/Category/GetListCountryFull", {
      ...params,
    });
    let { result } = res.data;
    return (result || []).map((item) => {
      item.name = item.countryName;
      item.label = item.countryName;
      item.value = item.id;
      item.isLeaf = false; // for Cascader
      item.children = (item.provinces || []).map((item) => ({
        ...item,
        name: item.provinceName,
        label: item.provinceName,
        value: item.id,
        isLeaf: false,
        children: (item.districts || []).map((item) => ({
          ...item,
          name: item.districtName,
          label: item.districtName,
          value: item.id,
        })),
      }));
      return item;
    });
  }

  public async getProvinces(countryId: any): Promise<any> {
    let res = await http.get(`api/services/app/Category/GetListProvince`, {
      params: { countryId },
    });
    let { result } = res.data;
    return (result || []).map((item) => {
      item.name = item.provinceName;
      item.label = item.provinceName;
      item.value = item.id;
      return item;
    });
  }

  public async getDistricts(provinceId): Promise<any> {
    let res = await http.get(`api/services/app/Category/GetListDistrict`, {
      params: { provinceId },
    });
    let { result } = res.data;
    return (result || []).map((item) => {
      item.name = item.districtName;
      item.label = item.districtName;
      item.value = item.id;
      return item;
    });
  }

  public async getWards(params: any): Promise<any> {
    let res = await http.get("api/services/app/Category/GetListWards", {
      params,
    });
    let { result } = res.data;
    return (result || []).map((item) => {
      item.name = item.wardName;
      item.label = item.wardName;
      item.value = item.id;
      return item;
    });
  }

  public async getOffices(params: any): Promise<any> {
    let res = await http.get(
      "api/services/app/OrganizationUnit/GetListOffice",
      {
        ...params,
      }
    );
    let { result } = res.data;
    return (result.items || []).map((item) => {
      item.name = item.displayName;
      return item;
    });
  }

  public async getDepartments(params: any): Promise<any> {
    let res = await http.get(
      "api/services/app/OrganizationUnit/GetOrganizationUnits",
      {
        ...params,
      }
    );
    let { result } = res.data;
    return (result.items || []).map((item) => {
      item.name = item.displayName;
      item.label = item.displayName;
      item.value = item.id;
      return item;
    });
  }

  public async getLeadSources(params: any): Promise<any> {
    let res = await http.get("api/services/app/Category/GetListLeadSource", {
      ...params,
    });
    let { result } = res.data;
    return (result || []).map((item) => {
      item.name = item.leadSourceName;
      return item;
    });
  }

  public async getIndustries(params: any): Promise<any> {
    let res = await http.get("api/services/app/Category/GetListIndustries", {
      ...params,
    });
    let { result } = res.data;
    return (result || []).map((item) => {
      item.name = item.industryName;
      return item;
    });
  }

  public async getClientTypes(params: any): Promise<any> {
    let res = await http.get("api/services/app/Category/GetListClientType", {
      ...params,
    });
    let { result } = res.data;
    return (result || []).map((item) => {
      item.name = item.clientTypeName;
      return item;
    });
  }

  public async getOtherTypes(params: any): Promise<any> {
    let res = await http.get("api/services/app/Category/GetListOtherCategory", {
      ...params,
    });
    let { result } = res.data;
    return result || [];
  }

  public async getOpportunityCategories(params: any): Promise<any> {
    let res = await http.get(
      "api/services/app/Category/GetListOpportunityCategories",
      {
        params,
      }
    );
    let { result } = res.data;
    return result;
  }

  public async getAdvisoryStage(params: any): Promise<any> {
    let res = await http.get("api/services/app/Category/GetListStageAdvisory", {
      params,
    });
    let { result } = res.data;
    return result;
  }

  public async getCommercialStage(params: any): Promise<any> {
    let res = await http.get(
      "api/services/app/Category/GetListStageCommercial",
      { params }
    );
    let { result } = res.data;
    return result;
  }

  public async getAdvisoryDealStatus(params: any): Promise<any> {
    let res = await http.get(
      "api/services/app/Category/GetListDealStatusAdvisory",
      {
        params,
      }
    );
    let { result } = res.data;
    return result;
  }

  public async getCommercialDealStatus(params: any): Promise<any> {
    let res = await http.get(
      "api/services/app/Category/GetListDealStatusCommercial",
      {
        params,
      }
    );
    let { result } = res.data;
    return result;
  }

  public async getUnitCategories(params: any): Promise<any> {
    let res = await http.get("api/services/app/Category/GetListUnitCategory", {
      params,
    });
    let { result } = res.data;
    return result;
  }

  public async getPositionLevels(params: any): Promise<any> {
    let res = await http.get("api/services/app/Category/GetListLevels", {
      params,
    });
    let { result } = res.data;
    return (result || []).map((item) => {
      item.name = item.levelName;
      return item;
    });
  }

  public async getAssetClass(params: any): Promise<any> {
    let res = await http.get("api/services/app/Category/GetListAssetClass", {
      params,
    });
    let { result } = res.data;
    return (result || []).map((item) => {
      item.name = item.assetClassName;
      return item;
    });
  }

  public async getInstructions(params: any): Promise<any> {
    let res = await http.get("api/services/app/Category/GetListInstruction", {
      params,
    });
    let { result } = res.data;
    return (result || []).map((item) => {
      item.name = item.instructionName;
      return item;
    });
  }

  public async getExchangeRates(params: any): Promise<any> {
    let res = await http.get("api/Statistic/ExchangeRate", { params });
    let { result } = res.data;

    const exchangeRates = {};
    Object.keys(result || {}).forEach((key) => {
      exchangeRates[key.toUpperCase()] = result[key];
    });

    return exchangeRates;
  }

  // Project
  public async getPropertyTypes(params: any): Promise<any> {
    let res = await http.get("api/services/app/Category/GetListPropertyTypes", {
      params,
    });
    let { result } = res.data;
    return result || [];
  }

  public async getFacilities(params: any): Promise<any> {
    let res = await http.get("api/services/app/Category/GetListFacilities", {
      params,
    });
    let { result } = res.data;

    return result;
  }

  public async getGrades(params?: any): Promise<any> {
    let res = await http.get("api/services/app/Category/GetListGrades", {
      params,
    });
    let { result } = res.data;
    return (result || []).map((item) => new OptionModel(item.id, item.name));
  }

  public async getClients(keyword): Promise<any> {
    let res = await http.get("api/services/app/Company/GetAll", {
      params: { keyword },
    });
    let result = (res.data.result?.items || []).map((item) => {
      return { id: item.id, label: item.businessName };
    });
    return result;
  }
  public async getContacts(keyword): Promise<any> {
    let res = await http.get("api/services/app/Contact/GetAll", {
      params: { keyword },
    });
    let result = (res.data.result?.items || []).map((item) => {
      return { id: item.id, label: item.contactName };
    });
    return result;
  }
  public async getInquiryTypes(keyword): Promise<any> {
    let res = await http.get(
      "api/services/app/Category/GetListListingCategory",
      { params: { keyword } }
    );
    let result = res.data.result || [];
    return result;
  }
  public async getInquirySourceAndStatus(): Promise<any> {
    let res = await http.get(
      "api/services/app/Category/GetListInquiryCategory"
    );
    let result = res.data.result || [];
    return result;
  }
  public async getRequiredAreaOption(params: any): Promise<any> {
    let res = await http.get(
      "api/Category/GetListFacilityRequirementCategories",
      { params }
    );
    let { result } = res.data;

    return result;
  }
}

export default new AppDataService();
