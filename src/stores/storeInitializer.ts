import RoleStore from "./administrator/roleStore";
import TenantStore from "./administrator/tenantStore";
import UserStore from "./administrator/userStore";
import SessionStore from "./sessionStore";
import AuthenticationStore from "./authenticationStore";
import AccountStore from "./accountStore";
import LanguageStore from "./administrator/languageStore";

import StaffStore from "./member/staff/staffStore";
import NewsStore from "./communication/newsStore";
import FeedbackStore from "./communication/feedbackStore";
import NewsCategoryStore from "./communication/newsCategoryStore";
import AnnouncementStore from "./communication/announcementStore";

import WorkflowStore from "./workflow/workflowStore";
import WfStatusStore from "./workflow/wfStatusStore";
import WfRoleStore from "./workflow/wfRoleStore";
import WfPriorityStore from "./workflow/wfPriorityStore";
import WfCustomFieldStore from "./workflow/wfCustomFieldStore";
import WfTrackerStore from "./workflow/wfTrackerStore";
import WfConfigurationStore from "./workflow/wfConfigurationStore";

import FileStore from "./common/fileStore";
import AuditLogStore from "./common/auditLogStore";
import CommentStore from "./common/commentStore";

import NotificationTemplateStore from "./notificationTemplate/notificationTemplateStore";
import TermConditionStore from "./administrator/termConditionStore";
import ReminderStore from "@stores/common/reminderStore";

import FinanceStore from "./finance/financeStore";
import ReceiptStore from "./finance/receiptStore";
import FeeTypeStore from "./finance/feeTypeStore";
import ExpenseMandateStore from "@stores/finance/expenseMandateStore";
import WithdrawStore from "@stores/finance/withdrawStore";
import CashAdvanceStore from "@stores/finance/cashAdvanceStore";

import MasterDataStore from "@stores/master-data/masterDataStore";
import TransportationCostStore from "@stores/master-data/transportationCostStore";
import TruckBrandStore from "@stores/master-data/truckBrandStore";
import TruckTypeStore from "@stores/master-data/truckTypeStore";
import RatingBadgeStore from "@stores/master-data/ratingBadgeStore";
import ProductTypeStore from "@stores/master-data/productTypeStore";

import PartnerStore from "./member/partner/partnerStore";
import CustomerStore from "./member/customer/customerStore";
import AppDataStore from "./appDataStore";

import CompanyStore from "./clientManagement/companyStore";
import ContactStore from "./clientManagement/contactStore";

import OpportunityStore from "./opportunity/opportunityStore";
import ActivityStore from "./activity/activityStore";
import TaskStore from "./activity/taskStore";
import CallStore from "./activity/callStore";
import MeetingStore from "./activity/meetingStore";
import CalendarStore from "./activity/calendarStore";

import CampaignStore from "./campaign/campaignStore";
import TargetStore from "./campaign/targetStore";

// import OpportunityCommercialStore from "./opportunity/opportunityCommercialStore";
// import DealContractStore from "./dealContracts/dealContractStore";

import ProjectStore from "./projects/projectStore";
import RequirementStore from "./projects/requirementStore";
import UnitStore from "./projects/unitStore";
import ListingStore from "./projects/listingStore";

import InquiryStore from "./communication/inquiryStore";
import OpportunityCommercialStore from "./opportunity/opportunityCommercialStore";
// import ActivityStore from "./activity/activityStore";
// import TaskStore from "./activity/taskStore";
// import CallStore from "./activity/callStore";
// import MeetingStore from "./activity/meetingStore";
// import CalendarStore from "./activity/calendarStore";

// import ReportCommercialStore from "./reports/reportCommercialStore";
// import ReportDepartmentStore from "./reports/reportDepartmentStore";
// import ReportMMMStore from "./reports/reportMMMStore";
// import ReportOpportunityStore from "./reports/reportOpportunityStore";
// import ReportRevenueForecastStore from "./reports/reportRevenueForecastStore";
// import ReportUserActivityStore from "./reports/reportUserActivityStore";

export default function initializeStores() {
  return {
    authenticationStore: new AuthenticationStore(),
    roleStore: new RoleStore(),
    tenantStore: new TenantStore(),
    userStore: new UserStore(),
    sessionStore: new SessionStore(),
    accountStore: new AccountStore(),
    languageStore: new LanguageStore(),
    appDataStore: new AppDataStore(),

    // masterDataStore: new MasterDataStore(),
    staffStore: new StaffStore(),
    partnerStore: new PartnerStore(),
    customerStore: new CustomerStore(),

    // News & Event
    newsStore: new NewsStore(),
    newsCategoryStore: new NewsCategoryStore(),
    feedbackStore: new FeedbackStore(),
    announcementStore: new AnnouncementStore(),

    // Finance
    financeStore: new FinanceStore(),
    withdrawStore: new WithdrawStore(),
    cashAdvanceStore: new CashAdvanceStore(),
    feeTypeStore: new FeeTypeStore(),
    receiptStore: new ReceiptStore(),
    expenseMandateStore: new ExpenseMandateStore(),

    workflowStore: new WorkflowStore(),
    wfStatusStore: new WfStatusStore(),
    wfRoleStore: new WfRoleStore(),
    wfPriorityStore: new WfPriorityStore(),
    wfTrackerStore: new WfTrackerStore(),
    wfCustomFieldStore: new WfCustomFieldStore(),
    wfConfigurationStore: new WfConfigurationStore(),

    auditLogStore: new AuditLogStore(),
    fileStore: new FileStore(),
    commentStore: new CommentStore(),
    notificationTemplateStore: new NotificationTemplateStore(),
    termConditionStore: new TermConditionStore(),
    reminderStore: new ReminderStore(),

    truckBrandStore: new TruckBrandStore(),
    truckTypeStore: new TruckTypeStore(),
    productTypeStore: new ProductTypeStore(),
    ratingBadgeStore: new RatingBadgeStore(),
    transportationCostStore: new TransportationCostStore(),
    masterDataStore: new MasterDataStore(),

    companyStore: new CompanyStore(),
    contactStore: new ContactStore(),

    opportunityStore: new OpportunityStore(),
    // opportunityCommercialStore: new OpportunityCommercialStore(),
    // dealContractStore: new DealContractStore(),

    activityStore: new ActivityStore(),
    taskStore: new TaskStore(),
    callStore: new CallStore(),
    meetingStore: new MeetingStore(),
    calendarStore: new CalendarStore(),

    targetStore: new TargetStore(),
    campaignStore: new CampaignStore(),

    projectStore: new ProjectStore(),
    requirementStore: new RequirementStore(),
    unitStore: new UnitStore(),
    listingStore: new ListingStore(),
    inquiryStore: new InquiryStore(),
    opportunityCommercialStore: new OpportunityCommercialStore(),
  };
}
