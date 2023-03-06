import { L, LCategory } from "./abpUtility";
import {
  ExcelIcon,
  ImageIcon,
  OtherFileIcon,
  PdfIcon,
  WordIcon,
  PowerPointIcon,
} from "@components/Icon";
import { useEffect, useRef } from "react";

export const AppConfiguration = {
  appBaseUrl: "",
  remoteServiceBaseUrl: "",
  googleMapKey: "AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw",
  appLayoutConfig: {} as any,
};

export const validateStatus = {
  validating: "validating",
  success: "success",
  error: "error",
  warning: "warning",
};
export const firebaseConfig = {
  apiKey: "AIzaSyBWB9UZA57pjeVhQ6IrZ7XfXc-3uuZag0Q",
  authDomain: "sbhub-admin.firebaseapp.com",
  databaseURL: "https://sbhub-admin.firebaseio.com",
  projectId: "sbhub-admin",
  storageBucket: "sbhub-admin.appspot.com",
  messagingSenderId: "1065389236552",
  appId: "1:1065389236552:android:1311d58ede888d25b1537d",
};
export const defaultLocation = {
  lat: 10.8230989,
  lng: 106.6296638,
};
export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const StepOTPVariable = {
  otpOldPhone: "old-phone-otp",
  otpNewPhone: "new-phone-otp",
  newPhoneNumber: "new-phone",
};

const AppConsts = {
  vnCountryId: 232,
  noImage: "/assets/images/logo.png",
  tableMaxHeight: window.innerHeight - 440,
  align: {
    right: "right" as const,
    left: "left" as const,
    center: "center" as const,
  },
  dataType: {
    string: "string" as const,
    number: "number" as const,
    boolean: "boolean" as const,
    method: "method" as const,
    regexp: "regexp" as const,
    integer: "integer" as const,
    float: "float" as const,
    object: "object" as const,
    enum: "enum" as const,
    date: "date" as const,
    url: "url" as const,
    hex: "hex" as const,
    email: "email" as const,
  },
  formVerticalLayout: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
      xl: { span: 24 },
      xxl: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
      xl: { span: 24 },
      xxl: { span: 24 },
    },
  },
  formVerticalLayout2: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 10 },
      lg: { span: 10 },
      xl: { span: 12 },
      xxl: { span: 12 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 14 },
      lg: { span: 14 },
      xl: { span: 12 },
      xxl: { span: 12 },
    },
  },
  formHorizontalLayout: {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 12 },
      md: { span: 12 },
      lg: { span: 6 },
      xl: { span: 6 },
      xxl: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 12 },
      md: { span: 12 },
      lg: { span: 18 },
      xl: { span: 18 },
      xxl: { span: 20 },
    },
  },
  projectCategoryTarget: {
    unitType: "UNITTYPE",
    unitStatus: "UNITSTATUS",
    memberRole: "MEMBERROLE",
    memberType: "MEMBERTYPE",
  },
  ratingOptions: [
    {
      value: 1,
    },
    {
      value: 2,
    },
    {
      value: 3,
    },
    {
      value: 4,
    },
    {
      value: 5,
    },
  ],
  escrowOptions: [100000, 200000, 500000, 800000],
  confirmedStatus: [
    {
      name: "All",
      value: " ",
      get label() {
        return L("ALL");
      },
    },
    {
      name: "Active",
      value: "true",
      get label() {
        return L("CONFIRMED");
      },
    },
    {
      name: "Inactive",
      value: "false",
      get label() {
        return L("UNCONFIRMED");
      },
    },
  ],
  activeStatus: [
    {
      name: "All",
      value: " ",
      get label() {
        return L("ALL");
      },
    },
    {
      name: "Active",
      value: "true",
      get label() {
        return L("ACTIVE");
      },
    },
    {
      name: "Inactive",
      value: "false",
      get label() {
        return L("INACTIVE");
      },
    },
  ],
  authenticationOptions: [
    {
      name: "All",
      value: " ",
      get label() {
        return L("ALL");
      },
    },
    {
      name: "Active",
      value: "1",
      get label() {
        return L("AUTHENTICATED");
      },
    },
    {
      name: "Inactive",
      value: "0",
      get label() {
        return L("UNAUTHENTICATED");
      },
    },
  ],
  emailAuthenticationStatus: [
    {
      name: "All",
      value: " ",
      get label() {
        return L("ALL");
      },
    },
    {
      name: "Authentication",
      value: "true",
      get label() {
        return L("EMAIL_AUTHENTICATION");
      },
    },
    {
      name: "Unauthentication",
      value: "false",
      get label() {
        return L("EMAIL_UNAUTHENTICATION");
      },
    },
  ],
  phoneAuthenticationStatus: [
    {
      name: "All",
      value: " ",
      get label() {
        return L("ALL");
      },
    },
    {
      name: "Authentication",
      value: "true",
      get label() {
        return L("PHONE_AUTHENTICATION");
      },
    },
    {
      name: "Unauthentication",
      value: "false",
      get label() {
        return L("PHONE_UNAUTHENTICATION");
      },
    },
  ],
  genders: [
    { name: "GENDER_MALE", value: true },
    { name: "GENDER_FEMALE", value: false },
    { name: "GENDER_OTHER", value: undefined },
  ],
  bookingTimes: [
    {
      get name() {
        return L("DAY");
      },
      value: "DAY",
    },
    {
      get name() {
        return L("WEEK");
      },
      value: "WEEK",
    },
    {
      get name() {
        return L("MONTH");
      },
      value: "MONTH",
    },
  ],
  bookingFutureTypes: [
    {
      value: "CURRENT",
      get label() {
        return L("CURRENT");
      },
    },
    {
      value: "CURRENT_AND_NEXT",
      get label() {
        return L("CURRENT_AND_NEXT");
      },
    },
    {
      value: "NEXT",
      get label() {
        return L("NEXT");
      },
    },
  ],
  bookingDates: [
    {
      numNextValidDate: "ALL_DAY",
      value: "ALL_DAY",
      label: "ALL_DAY",
      isAnyTime: true,
      daySelected: true,
      order: 0,
    },
    {
      numNextValidDate: "MONDAY",
      value: "MONDAY",
      label: "MONDAY",
      isAnyTime: true,
      daySelected: true,
      order: 1,
    },
    {
      numNextValidDate: "TUESDAY",
      value: "TUESDAY",
      label: "TUESDAY",
      isAnyTime: true,
      daySelected: true,
      order: 2,
    },
    {
      numNextValidDate: "WEDNESDAY",
      value: "WEDNESDAY",
      label: "WEDNESDAY",
      isAnyTime: true,
      daySelected: true,
      order: 3,
    },
    {
      numNextValidDate: "THURSDAY",
      value: "THURSDAY",
      label: "THURSDAY",
      isAnyTime: true,
      daySelected: true,
      order: 4,
    },
    {
      numNextValidDate: "FRIDAY",
      value: "FRIDAY",
      label: "FRIDAY",
      isAnyTime: true,
      daySelected: true,
      order: 5,
    },
    {
      numNextValidDate: "SATURDAY",
      value: "SATURDAY",
      label: "SATURDAY",
      isAnyTime: true,
      daySelected: true,
      order: 6,
    },
    {
      numNextValidDate: "SUNDAY",
      value: "SUNDAY",
      label: "SUNDAY",
      isAnyTime: true,
      daySelected: true,
      order: 7,
    },
  ],
  reservationStatus: {
    requested: "REQUESTED",
    approved: "APPROVED",
  },
  userManagement: {
    defaultAdminUserName: "admin",
  },
  localization: {
    defaultLocalizationSourceName: "WebLabel",
    sourceWebNotification: "WebNotification",
    sourceWebError: "WebError",
    sourceWebMainMenu: "WebMainMenu",
    sourceWebCategory: "WebCategory",
  },
  authorization: {
    encrptedAuthTokenName: "enc_auth_token",
    projectId: "projectId",
    targetApplication: 1,
  },
  validate: {
    maxNumber: 999999999999,
  },
  masterDataTargets: {
    WORK_ORDER_TYPE: "WorkOrderType",
    UNIT_TYPE: "UnitType",
    UNIT_STATUS: "UnitStatus",
    RESIDENT_TYPE: "ResidentType",
    RESIDENT_ROLE: "ResidentRole",
  },
  notificationTypes: {
    all: 0,
    sms: 1,
    email: 2,
    inApp: 3,
  },
  announcementTypes: {
    picture: "Picture",
    video: "Video",
    updateApp: "UpdateApp",
  },
  announcementMethodTypes: {
    all: 0,
    email: 1,
    inApp: 2,
  },
  announcementMethodTypeKeys: {
    0: "ALL",
    1: "EMAIL", //(allow HTML)
    2: "INAPP",
  },
  announcementStatus: {
    readyForPublish: 1,
    sending: 2,
    completed: 3,
    failed: 4,
  },
  announcementStatusKeys: {
    0: "ANNOUNCEMENT_STATUS_PROCESSING",
    1: "ANNOUNCEMENT_STATUS_READY_FOR_PUBLISH",
    2: "ANNOUNCEMENT_STATUS_SENDING",
    3: "ANNOUNCEMENT_STATUS_COMPLETED",
    4: "ANNOUNCEMENT_STATUS_FAILED",
  },
  monthNamesShort: [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ],
  timeUnits: {
    hours: "HOURS",
    days: "DAYS",
    minutes: "MINUTES",
  },

  cashAdvanceTransactionTypes: {
    receipt: 1,
    expenseMandate: 2,
  },

  dayOfWeek: [
    {
      value: 0,
      name: "Sunday",
    },
    {
      value: 1,
      name: "Monday",
    },
    {
      value: 2,
      name: "Tuesday",
    },
    {
      value: 3,
      name: "Wednesday",
    },
    {
      value: 4,
      name: "Thursday",
    },
    {
      value: 5,
      name: "Friday",
    },
    {
      value: 6,
      name: "Saturday",
    },
  ],
};

export const AppStatus = {
  withdrawStatus: {
    cancelled: "CANCELLED",
    processed: "PROCESSED",
    isDone: (statusCode) =>
      statusCode === "CANCELLED" || statusCode === "PROCESSED",
  },
  activeStatus: {},
  announcementStatus: {
    cancelled: "CANCELLED",
    processed: "PROCESSED",
    isDone: (statusCode) =>
      statusCode === "CANCELLED" || statusCode === "PROCESSED",
  },
};

export const loginSteps = {
  login: 1,
  projectSelect: 2,
};
export const loginMethods = {
  systemAccount: 1,
  socialAccount: 2,
  phoneNumber: 3,
};

export const workflowEvent = {
  init: "InitWorkflow",
};
export const documentTypes = {
  image: "IMAGE",
  document: "DOCUMENT",
};
export let cookieKeys = {
  encToken: "enc_auth_token",
};
export let defaultAvatar = "/assets/images/logoCore.png";
export let dateFormat = "DD/MM/YYYY";
export let dateTimeFormat = "DD/MM/YYYY HH:mm";
export let yearFormat = "YYYY";
export let timeFormat = "HH:mm";
export let phoneRegex =
  /^[+]?\(?([0-9]{0,3})?\)?[-. ]?([0-9]{1,3})?[-. ]?([0-9]{1,3})[-. ]?([0-9]{1,5})$/;
export let emailRegex =
  /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export let modules = [
  {
    get name() {
      return LCategory("MODULE_WORKORDER");
    },
    id: 13,
  },
  {
    get name() {
      return LCategory("MODULE_FEEDBACK");
    },
    id: 20,
  },
];
export let moduleIds = {
  dismantlingRequest: 14,
  jobRequest: 13,
  feedback: 20,
  unit: 1,
  unitEdit: 1001,
  comment: 1002,
  reservation: 17,
  visitor: 1003,
  planMaintenance: 18,
  inventory: 34,
  order: 47,
  inspection: 41,
  cogs: 47,
  ratingBadge: 301,
  feedbackType: 201,
  feedbackCategory: 201,
  opMargin: 47,
  transportationCost: 47,
  quotationProject: 47,

  company: 7,
  requirement: 26,
  contact: 8,
  opportunity: 9,
  project: 25,
  dealContract: 33,
  activity: 26,
  accountant: 43,
};
export let moduleNames = {
  unit: "UNIT",
  news: "NEWS",
  requirement: "REQUEST",
  company: "COMPANY",
  opportunity: "OPPORTUNITY",
  project: "PROJECT",
  dealContract: "DEAL",
  listing: "LISTING",
};
export let modulePrefix = {
  13: "WORK_ORDER_WF_",
  20: "FEEDBACK_WF_",
  14: "DISMANTLING_REQUEST_",
};

export let sidebarStatus = {
  menu: 1,
  setting: 2,
  account: 3,
};
export let moduleFile = {
  library: "Library",
  project: "Project",
  workOrder: "WorkOrder",
  feedback: "Feedback",
  news: "News",
  event: "Event",
  reservation: "Reservation",
  chatMessage: "ChatMessages",
  amenity: "Amenities",
  visitor: "Visitor",
  company: "Company",
  contract: "Contract",
  contractCategory: "ContractCategory",
  buildingDirectory: "BuildingDirectory",
  planMaintenance: "PlanMaintenance",
  asset: "AssetManagement",
  shopOwner: "ShopOwner",
  product: "Product",
  inventory: "Inventory",
  inventoryStockIn: "InventoryStock",
  inventoryStockOut: "InventoryAllocate",
};
export const notificationMethod = {
  1: "SMS",
  2: "EMAIL", //(allow HTML)
  3: "INAPP",
};
export const notificationMethods = [
  {
    get name() {
      return LCategory("SMS");
    },
    id: 1,
  },
  {
    get name() {
      return LCategory("EMAIL");
    },
    id: 2,
  },
  {
    get name() {
      return LCategory("INAPP");
    },
    id: 3,
  },
];
export const userGroups = [
  {
    get name() {
      return LCategory("STAFF");
    },
    id: 1,
  },
  {
    get name() {
      return LCategory("CUSTOMER");
    },
    id: 2,
  },
  {
    get name() {
      return LCategory("PARTNER");
    },
    id: 3,
  },
];

export const phoneStatus = {
  undefined: 0,
  available: 1,
  inActive: 2,
  notFound: 3,
};

export const getEscalationModuleByModuleId = (moduleId) => {
  switch (moduleId) {
    case moduleIds.inspection: {
      return 4;
    }
    case moduleIds.planMaintenance: {
      return 3;
    }
    case moduleIds.feedback: {
      return 2;
    }
    case moduleIds.jobRequest:
    default: {
      return 1;
    }
  }
};
export const appStatusColors = {
  success: "#689F38",
  error: "#EB7077",
  valid: "#689F38",
  expired: "#CCCCCC",
};
export const backgroundColors = [
  "#FAC51D",
  "#66BD6D",
  "#FAA026",
  "#29BB9C",
  "#E96B56",
  "#55ACD2",
  "#B7332F",
  "#2C83C9",
  "#9166B8",
  "#92E7E8",
];
export const getBackgroundColorByIndex = (arrayIndex) => {
  const index = arrayIndex % backgroundColors.length;
  return backgroundColors[index];
};

export let moduleAvatar = {
  myProfile: "myProfile",
  staff: "Staff",
  resident: "Resident",
  shopOwner: "ShopOwner",
  project: "Project",
  colorByLetter: (letter) => {
    if (!backgroundColors || !letter) return "#fff";

    const charCode = letter.charCodeAt(0);
    return getBackgroundColorByIndex(charCode);
  },
};
export let wfFieldTypes = {
  text: 0,
  number: 1,
  money: 2,
  dateTime: 3,
  list: 4,
};

export const ckeditorToolbar = {
  toolbarGroups: [
    { name: "document", groups: ["mode", "doctools", "document", "source"] },
    { name: "clipboard", groups: ["clipboard", "undo"] },
    {
      name: "editing",
      groups: ["find", "selection", "spellchecker", "editing"],
    },
    { name: "styles", groups: ["styles", "font-family"] },
    { name: "forms", groups: ["forms"] },
    { name: "colors", groups: ["colors"] },
    { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
    {
      name: "paragraph",
      groups: ["align", "list", "indent", "blocks", "bidi", "paragraph"],
    },
    { name: "links", groups: ["links"] },
    { name: "insert", groups: ["insert"] },
    { name: "tools", groups: ["tools"] },
    { name: "others", groups: ["others"] },
    { name: "about", groups: ["about"] },
  ],
  removeButtons:
    "Save,Templates,Cut,NewPage,Preview,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,ShowBlocks,About,Flash,PageBreak,HorizontalRule,Language,BidiRtl,BidiLtr,Blockquote,CreateDiv,Smiley,Iframe",
};
export let mimeType = {
  "application/pdf": PdfIcon,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    ExcelIcon,
  "application/vnd.ms-excel": ExcelIcon,
  "application/msword": WordIcon,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    WordIcon,
  "application/vnd.ms-powerpoint": PowerPointIcon,
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    PowerPointIcon,
  "image/jpeg": ImageIcon,
  "image/png": ImageIcon,
  other: OtherFileIcon,
};
export let mimeTypeToImagePath = {
  "application/pdf": "/assets/icons/pdf.svg",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    "/assets/icons/excel.svg",
  "application/vnd.ms-excel": "/assets/icons/excel.svg",
  "application/msword": "/assets/icons/word.svg",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "/assets/icons/word.svg",
  "application/vnd.ms-powerpoint": "/assets/icons/power-point.svg",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "/assets/icons/power-point.svg",
  "image/jpeg": "/assets/icons/image-file.svg",
  "image/png": "/assets/icons/image-file.svg",
  other: "/assets/icons/other-file.svg",
};
export let appPermissions = {
  projectManagement: {
    page: "PagesAdministration.Project",
    create: "PagesAdministration.Project.Create",
    read: "PagesAdministration.Project.Read",
    update: "PagesAdministration.Project.Update",
    delete: "PagesAdministration.Project.Delete",
    detail: "PagesAdministration.Project.Detail",
  },
  projectResidential: {
    page: "PagesAdministration.ProjectResidential",
    create: "PagesAdministration.ProjectResidential.Create",
    read: "PagesAdministration.ProjectResidential.Read",
    update: "PagesAdministration.ProjectResidential.Update",
    delete: "PagesAdministration.ProjectResidential.Delete",
    detail: "PagesAdministration.ProjectResidential.Detail",
  },
  unitResidential: {
    page: "PagesAdministration.UnitResidential",
    create: "PagesAdministration.UnitResidential.Create",
    read: "PagesAdministration.UnitResidential.Read",
    update: "PagesAdministration.UnitResidential.Update",
    delete: "PagesAdministration.UnitResidential.Delete",
    detail: "PagesAdministration.UnitResidential.Detail",
  },
  unitManagement: {
    page: "PagesAdministration.Unit",
    create: "PagesAdministration.Unit.Create",
    read: "PagesAdministration.Unit.Read",
    update: "PagesAdministration.Unit.Update",
    delete: "PagesAdministration.Unit.Delete",
    detail: "PagesAdministration.Unit.Detail",
  },
  listingManagement: {
    page: "PagesAdministration.ListingResidential",
    create: "PagesAdministration.ListingResidential.Create",
    read: "PagesAdministration.ListingResidential.Read",
    update: "PagesAdministration.ListingResidential.Update",
    delete: "PagesAdministration.ListingResidential.Delete",
    detail: "PagesAdministration.ListingResidential.Detail",
  },
  newManagement: {
    page: "PagesAdministration.News",
    create: "PagesAdministration.News.Create",
    read: "PagesAdministration.News.Read",
    update: "PagesAdministration.News.Update",
    delete: "PagesAdministration.News.Delete",
    detail: "PagesAdministration.News.Detail",
  },
  inquiryManagement: {
    page: "PagesAdministration.InquiryResidential",
    create: "PagesAdministration.InquiryResidential.Create",
    read: "PagesAdministration.InquiryResidential.Read",
    update: "PagesAdministration.InquiryResidential.Update",
    delete: "PagesAdministration.InquiryResidential.Delete",
    detail: "PagesAdministration.InquiryResidential.Detail",
  },
  requirements: {
    page: "PagesAdministration.Requirement",
    create: "PagesAdministration.Requirement.Create",
    read: "PagesAdministration.Requirement.Read",
    update: "PagesAdministration.Requirement.Update",
    delete: "PagesAdministration.Requirement.Delete",
    detail: "PagesAdministration.Requirement.Detail",
  },
  map: {
    page: "PagesAdministration.Map",
  },
  tasks: {
    page: "PagesAdministration.Activity",
    create: "PagesAdministration.Activity.Create",
    read: "PagesAdministration.Activity.Read",
    update: "PagesAdministration.Activity.Update",
    delete: "PagesAdministration.Activity.Delete",
    detail: "PagesAdministration.Activity.Detail",
  },
  calls: {
    page: "PagesAdministration.Activity",
    create: "PagesAdministration.Activity.Create",
    read: "PagesAdministration.Activity.Read",
    update: "PagesAdministration.Activity.Update",
    delete: "PagesAdministration.Activity.Delete",
    detail: "PagesAdministration.Activity.Detail",
  },
  meetings: {
    page: "PagesAdministration.Activity",
    create: "PagesAdministration.Activity.Create",
    read: "PagesAdministration.Activity.Read",
    update: "PagesAdministration.Activity.Update",
    delete: "PagesAdministration.Activity.Delete",
    detail: "PagesAdministration.Activity.Detail",
  },
  activity: {
    page: "PagesAdministration.Activity",
    create: "PagesAdministration.Activity.Create",
    read: "PagesAdministration.Activity.Read",
    update: "PagesAdministration.Activity.Update",
    delete: "PagesAdministration.Activity.Delete",
    detail: "PagesAdministration.Activity.Detail",
  },
  calendar: {
    page: "PagesAdministration.Activity",
    create: "PagesAdministration.Activity.Create",
    read: "PagesAdministration.Activity.Read",
    update: "PagesAdministration.Activity.Update",
    delete: "PagesAdministration.Activity.Delete",
  },
  adminLanguage: {
    page: "PagesAdministration.Languages",
    create: "PagesAdministration.Languages.Create",
    read: "PagesAdministration.Languages.Read",
    update: "PagesAdministration.Languages.Update",
    delete: "PagesAdministration.Languages.Delete",
    changeText: "PagesAdministration.Languages.ChangeTexts",
  },
  adminRole: {
    page: "PagesAdministration.Roles",
    create: "PagesAdministration.Roles.Create",
    read: "PagesAdministration.Roles.Read",
    update: "PagesAdministration.Roles.Update",
    delete: "PagesAdministration.Roles.Delete",
  },
  adminUser: {
    page: "PagesAdministration.Users",
    create: "PagesAdministration.Users.Create",
    read: "PagesAdministration.Users.Read",
    update: "PagesAdministration.Users.Update",
    delete: "PagesAdministration.Users.Delete",
  },
  adminTenant: {
    page: "PagesAdministration.Roles",
    create: "PagesAdministration.Roles.Create",
    read: "PagesAdministration.Roles.Read",
    update: "PagesAdministration.Roles.Update",
    delete: "PagesAdministration.Roles.Delete",
  },
  adminMasterData: {
    page: "PagesAdministration.MasterData",
    create: "PagesAdministration.MasterData.Create",
    read: "PagesAdministration.MasterData.Read",
    update: "PagesAdministration.MasterData.Update",
    delete: "PagesAdministration.MasterData.Delete",
    detail: "PagesAdministration.MasterData.Detail",
  },
  workflow: {
    page: "PagesAdministration.Workflow",
    create: "PagesAdministration.Workflow.Create",
    read: "PagesAdministration.Workflow.Read",
    update: "PagesAdministration.Workflow.Update",
    delete: "PagesAdministration.Workflow.Delete",
    detail: "PagesAdministration.Workflow.Detail",
  },
  notificationTemplate: {
    page: "PagesAdministration.NotificationTemplate",
    create: "PagesAdministration.NotificationTemplate.Create",
    read: "PagesAdministration.NotificationTemplate.Read",
    update: "PagesAdministration.NotificationTemplate.Update",
    delete: "PagesAdministration.NotificationTemplate.Delete",
    detail: "PagesAdministration.NotificationTemplate.Detail",
  },
  termCondition: {
    page: "PagesAdministration.NotificationTemplate",
    create: "PagesAdministration.NotificationTemplate.Create",
    read: "PagesAdministration.NotificationTemplate.Read",
    update: "PagesAdministration.NotificationTemplate.Update",
    delete: "PagesAdministration.NotificationTemplate.Delete",
    detail: "PagesAdministration.NotificationTemplate.Detail",
  },
  dashboard: {
    fee: "PagesAdministration.Dashboard.FeeStatement",
    jobRequest: "PagesAdministration.Dashboard.WorkOrder",
  },
  settingEmail: {
    page: "PagesAdministration.SettingEmail",
  },
  status: {
    page: "PagesAdministration.MasterData",
    create: "PagesAdministration.MasterData.Create",
    read: "PagesAdministration.MasterData.Read",
    update: "PagesAdministration.MasterData.Update",
    delete: "PagesAdministration.MasterData.Delete",
    detail: "PagesAdministration.MasterData.Export",
    export: "PagesAdministration.MasterData.Export",
    import: "PagesAdministration.MasterData.Import",
  },
  feedbackType: {
    page: "PagesAdministration.MasterData",
    create: "PagesAdministration.MasterData.Create",
    read: "PagesAdministration.MasterData.Read",
    update: "PagesAdministration.MasterData.Update",
    delete: "PagesAdministration.MasterData.Delete",
    detail: "PagesAdministration.MasterData.Export",
    export: "PagesAdministration.MasterData.Export",
    import: "PagesAdministration.MasterData.Import",
  },
  feedbackCategory: {
    page: "PagesAdministration.MasterData",
    create: "PagesAdministration.MasterData.Create",
    read: "PagesAdministration.MasterData.Read",
    update: "PagesAdministration.MasterData.Update",
    delete: "PagesAdministration.MasterData.Delete",
    detail: "PagesAdministration.MasterData.Export",
    export: "PagesAdministration.MasterData.Export",
    import: "PagesAdministration.MasterData.Import",
  },
  ratingBadge: {
    page: "PagesAdministration.MasterData",
    create: "PagesAdministration.MasterData.Create",
    read: "PagesAdministration.MasterData.Read",
    update: "PagesAdministration.MasterData.Update",
    delete: "PagesAdministration.MasterData.Delete",
    detail: "PagesAdministration.MasterData.Export",
    export: "PagesAdministration.MasterData.Export",
    import: "PagesAdministration.MasterData.Import",
  },
  transportationCost: {
    page: "PagesAdministration.MasterData",
    create: "PagesAdministration.MasterData.Create",
    read: "PagesAdministration.MasterData.Read",
    update: "PagesAdministration.MasterData.Update",
    delete: "PagesAdministration.MasterData.Delete",
    detail: "PagesAdministration.MasterData.Export",
    export: "PagesAdministration.MasterData.Export",
    import: "PagesAdministration.MasterData.Import",
  },
  // Account
  staff: {
    page: "PagesAdministration.Staff",
    create: "PagesAdministration.Staff.Create",
    read: "PagesAdministration.Staff.Read",
    update: "PagesAdministration.Staff.Update",
    delete: "PagesAdministration.Staff.Delete",
    detail: "PagesAdministration.Staff.Detail",
  },
  customer: {
    page: "PagesAdministration.Customer",
    create: "PagesAdministration.Customer.Create",
    read: "PagesAdministration.Customer.Read",
    update: "PagesAdministration.Customer.Update",
    delete: "PagesAdministration.Customer.Delete",
    detail: "PagesAdministration.Customer.Detail",
  },
  partner: {
    page: "PagesAdministration.Partner",
    create: "PagesAdministration.Partner.Create",
    read: "PagesAdministration.Partner.Read",
    update: "PagesAdministration.Partner.Update",
    delete: "PagesAdministration.Partner.Delete",
    detail: "PagesAdministration.Partner.Detail",
  },
  // Services
  workOrder: {
    page: "PagesAdministration.Workorder",
    create: "PagesAdministration.Workorder.Create",
    read: "PagesAdministration.Workorder.Read",
    update: "PagesAdministration.Workorder.Update",
    delete: "PagesAdministration.Workorder.Delete",
    detail: "PagesAdministration.Workorder.Detail",
    myWorkOrder: "PagesAdministration.Workorder.MyWorkorder",
    export: "PagesAdministration.Workorder.Export",
  },
  feedback: {
    page: "PagesAdministration.Feedback",
    create: "PagesAdministration.Feedback.Create",
    read: "PagesAdministration.Feedback.Read",
    update: "PagesAdministration.Feedback.Update",
    delete: "PagesAdministration.Feedback.Delete",
    detail: "PagesAdministration.Feedback.Detail",
    myWorkOrder: "PagesAdministration.Feedback.MyWorkorder",
    export: "PagesAdministration.Feedback.Export",
  },
  news: {
    page: "PagesAdministration.News",
    create: "PagesAdministration.News.Create",
    read: "PagesAdministration.News.Read",
    update: "PagesAdministration.News.Update",
    delete: "PagesAdministration.News.Delete",
    detail: "PagesAdministration.News.Detail",
  },
  event: {
    page: "PagesAdministration.Event",
    create: "PagesAdministration.Event.Create",
    read: "PagesAdministration.Event.Read",
    update: "PagesAdministration.Event.Update",
    delete: "PagesAdministration.Event.Delete",
    detail: "PagesAdministration.Event.Detail",
  },
  announcement: {
    page: "PagesAdministration.Workorder",
    create: "PagesAdministration.Workorder.Create",
    read: "PagesAdministration.Workorder.Read",
    update: "PagesAdministration.Workorder.Update",
    delete: "PagesAdministration.Workorder.Delete",
    detail: "PagesAdministration.Workorder.Detail",
  },
  system: {
    paymentSetting: "PagesAdministration.System.Settings",
  },
  expenseMandate: {
    page: "PagesAdministration.ExpenseMandateRequest",
    create: "PagesAdministration.ExpenseMandateRequest.Update",
    read: "PagesAdministration.ExpenseMandateRequest.Read",
    update: "PagesAdministration.ExpenseMandateRequest.Update",
    delete: "PagesAdministration.ExpenseMandateRequest.Delete",
  },
  withdraw: {
    page: "PagesAdministration.ExpenseMandateRequest",
    create: "PagesAdministration.ExpenseMandateRequest.Update",
    read: "PagesAdministration.ExpenseMandateRequest.Read",
    update: "PagesAdministration.ExpenseMandateRequest.Update",
    delete: "PagesAdministration.ExpenseMandateRequest.Delete",
    detail: "PagesAdministration.ExpenseMandateRequest.Detail",
  },
  company: {
    page: "PagesAdministration.Company",
    create: "PagesAdministration.Company.Create",
    read: "PagesAdministration.Company.Read",
    update: "PagesAdministration.Company.Update",
    delete: "PagesAdministration.Company.Delete",
    detail: "PagesAdministration.Company.Detail",
  },
  contact: {
    page: "PagesAdministration.Contact",
    create: "PagesAdministration.Contact.Create",
    read: "PagesAdministration.Contact.Read",
    update: "PagesAdministration.Contact.Update",
    delete: "PagesAdministration.Contact.Delete",
    detail: "PagesAdministration.Contact.Detail",
    viewFull: "PagesAdministration.Contact.FullDetail",
  },
  commercialOpportunities: {
    page: "PagesAdministration.Opportunity",
    create: "PagesAdministration.Opportunity.Create",
    read: "PagesAdministration.Opportunity.Read",
    update: "PagesAdministration.Opportunity.Update",
    delete: "PagesAdministration.Opportunity.Delete",
    detail: "PagesAdministration.Opportunity.Detail",
  },
};

// Administrative Level
export enum AdministrativeLevel {
  administrative_area_level_1 = "administrative_area_level_1",
  administrative_area_level_2 = "administrative_area_level_2",
  administrative_area_level_3 = "administrative_area_level_3",
  undefined = "undefined",
}

// Notification
export let notificationTypes = {
  text: 1,
  download: 2,
  gotoDetail: 3,
};

// fileType
export let fileTypeGroup = {
  images: [".png", ".jpg", ".jpeg"],
  documents: [".csv", ".xlsx", ".pdf", ".doc", ".docx"],
  documentAndImage: [
    ".csv",
    ".xlsx",
    ".pdf",
    ".doc",
    ".docx",
    ".png",
    ".jpg",
    ".jpeg",
  ],
};

// Layout constant
export const themeByEvent = {
  events: {
    default: "default",
    xmasSanta: "xmas-santa",
    xmasHouse: "xmas-house",
    xmasNight: "xmas-night",
    flowers: "flowers",
  },
};

export const retrieveTypes = {
  administrative_area_level_1: ["(cities)"],
  administrative_area_level_2: ["(regions)"],
  undefined: [],
};
export let activityTypes = {
  calls: "1",
  meetings: "2",
  tasks: "3",
};
export let routeByModules = {
  [moduleIds.company]: "/company-detail/:id",
  [moduleIds.contact]: "/contact-detail/:id",
  [moduleIds.project]: "/project-detail/:id",
  [moduleIds.opportunity]: "/opportunity-detail/:id",
  [moduleIds.requirement]: "/requirement-detail/:id",
  [moduleIds.dealContract]: "/deal-contract-detail/:id",
  [moduleIds.accountant]: "/accountant-detail/:id",
};
export const MODULES = [
  { label: "COMPANY", value: moduleIds.company },
  { label: "CONTACT", value: moduleIds.contact },
  { label: "OPPORTUNITY", value: moduleIds.opportunity },
  { label: "PROJECT", value: moduleIds.project },
  { label: "DEAL", value: moduleIds.dealContract },
];
export const GENDERS = [
  { value: "Mr.", label: "Mr." },
  { value: "Ms.", label: "Ms." },
  { value: "Mrs.", label: "Mrs." },
  { value: "Dr.", label: "Dr." },
];
export let listDays = [
  {
    get label() {
      return L("{0}_DAYS", 7);
    },
    value: 7,
  },
  {
    get label() {
      return L("{0}_DAYS", 30);
    },
    value: 30,
  },
  {
    get label() {
      return L("{0}_DAYS", 60);
    },
    value: 60,
  },
  {
    get label() {
      return L("{0}_DAYS", 180);
    },
    value: 180,
  },
];
export const percentOptions = [
  { value: 0, label: "0%" },
  { value: 30, label: "30%" },
  { value: 50, label: "50%" },
  { value: 70, label: "70%" },
  { value: 100, label: "100%" },
];
export default AppConsts;
