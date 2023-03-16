import LoadableComponent from "../../Loadable";

import {
  IdcardOutlined,
  PieChartOutlined,
  StarOutlined,
  UserSwitchOutlined,
  ExceptionOutlined,
  LogoutOutlined,
  RadarChartOutlined,
  TagsOutlined,
  UserOutlined,
  AppstoreOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { appPermissions } from "@lib/appconst";

export const layouts: any = {
  userLayout: "userLayout",
  portalLayout: "appLayout",
  publicLayout: "publicLayout",
};

export const layoutRouter: any = {
  userLayout: LoadableComponent(() => import("../UserLayout")),
  appLayout: LoadableComponent(() => import("../AppLayout")),
  publicLayout: LoadableComponent(() => import("../PublicLayout")),
};

export const publicLayout: any = {
  publicNews: {
    path: "/public/news/:id",
    title: "NEWS",
    layout: layouts.userLayout,
    component: LoadableComponent(
      () => import("../../../scenes/communication/news/detail/public-news")
    ),
  },
  termAndCondition: {
    path: "/public/terms-and-conditions",
    title: "TERM_CONDITIONS",
    layout: layouts.userLayout,
    component: LoadableComponent(
      () => import("../../../scenes/public/term-condition")
    ),
  },
};

export const userLayout: any = {
  accountLogin: {
    path: "/account/login",
    title: "LogIn",
    layout: layouts.userLayout,
    component: LoadableComponent(
      () => import("../../../scenes/accounts/Login")
    ),
  },
  forgotPassword: {
    path: "/account/forgot-password",
    title: "FORGOT_PASSWORD",
    layout: layouts.userLayout,
    component: LoadableComponent(
      () => import("../../../scenes/accounts/ForgotPassword")
    ),
  },
  resetPassword: {
    path: "/account/reset-password",
    title: "RESET_PASSWORD",
    layout: layouts.userLayout,
    component: LoadableComponent(
      () => import("../../../scenes/accounts/ForgotPassword")
    ),
  },
  register: {
    path: "/account/register",
    title: "REGISTER_ACCOUNT",
    layout: layouts.userLayout,
    component: LoadableComponent(
      () => import("../../../scenes/accounts/Register")
    ),
  },
  registerByOTP: {
    path: "/account/register-by-otp",
    title: "REGISTER_ACCOUNT_BY_OTP",
    layout: layouts.userLayout,
    component: LoadableComponent(
      () => import("../../../scenes/accounts/Register/SMSRegisterAccount")
    ),
  },
  registerPhoneForSocial: {
    path: "/account/register-phone-for-social",
    title: "REGISTER_PHONE",
    layout: layouts.userLayout,
    component: LoadableComponent(
      () => import("../../../scenes/accounts/Register/RegisterPhoneForSocial")
    ),
  },
  // resetPasswordEmployee: {
  //   path: '/account/employee/reset-password',
  //   title: 'RESET_PASSWORD',
  //   layout: layouts.userLayout,
  //   component: LoadableComponent(() => import('../../../scenes/accounts/ForgotPassword'))
  // },
  // resetPasswordPartner: {
  //   path: '/account/partner/reset-password',
  //   title: 'RESET_PASSWORD',
  //   layout: layouts.userLayout,
  //   component: LoadableComponent(() => import('../../../scenes/accounts/ForgotPassword'))
  // },

  // resetPasswordCustomer: {
  //   path: '/account/customer/reset-password',
  //   title: 'RESET_PASSWORD',
  //   layout: layouts.userLayout,
  //   component: LoadableComponent(() => import('../../../scenes/accounts/ForgotPassword'))
  // },
};

export const portalLayouts: any = {
  // Portal
  appSetting: {
    path: "/app-setting",
    permission: "",
    title: "App Setting",
    name: "APP_SETTING",
    layout: layouts.portalLayout,
    icon: LogoutOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/appSetting/AppSetting")
    ),
  },
  accountLogout: {
    path: "/logout",
    permission: "",
    title: "Logout",
    name: "LOGOUT",
    layout: layouts.portalLayout,
    icon: LogoutOutlined,
    component: LoadableComponent(() => import("../../Logout")),
  },
  accountConfigMyProfile: {
    path: "/account-config/my-profile",
    permission: "",
    title: "My Profile",
    name: "MY_PROFILE",
    layout: layouts.portalLayout,
    // icon: LogoutOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/accounts/AccountConfig/MyProfile")
    ),
  },
  accountConfigChangePassword: {
    path: "/account-config/change-password",
    permission: "",
    title: "Change Password",
    name: "CHANGE_PASSWORD",
    layout: layouts.portalLayout,
    // icon: LogoutOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/accounts/AccountConfig/ChangePassword")
    ),
  },
  accountConfigHistory: {
    path: "/account-config/history",
    permission: "",
    title: "History",
    name: "HISTORY",
    layout: layouts.portalLayout,
    // icon: LogoutOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/common/Exception")
    ),
  },
  accountConfigSavedShortcuts: {
    path: "/account-config/saved-shortcuts",
    permission: "",
    title: "Saved Shortcuts",
    name: "SAVED_SHORTCUTS",
    layout: layouts.portalLayout,
    // icon: LogoutOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/common/Exception")
    ),
  },
  accountConfigChatWithSupport: {
    path: "/account-config/chat-with-support",
    permission: "",
    title: "Chat with support",
    name: "CHAT_WITH_SUPPORT",
    layout: layouts.portalLayout,
    // icon: LogoutOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/common/Exception")
    ),
  },
  accountConfigSendFeedback: {
    path: "/account-config/send-feedback",
    permission: "",
    title: "Send Feedback",
    name: "SEND_FEEDBACK",
    layout: layouts.portalLayout,
    // icon: LogoutOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/common/Exception")
    ),
  },
  accountConfigSetting: {
    path: "/account-config/setting",
    permission: "",
    title: "Setting",
    name: "SETTING",
    layout: layouts.portalLayout,
    // icon: LogoutOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/common/Exception")
    ),
  },
  exception: {
    path: "/exception",
    permission: "",
    title: "exception",
    name: "EXCEPTION",
    layout: layouts.portalLayout,
    icon: ExceptionOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/common/Exception")
    ),
  },
  dashboard: {
    path: "/dashboard",
    name: "DASHBOARD",
    permission: "PagesAdministration.Dashboard",
    title: "Dashboard",
    layout: layouts.portalLayout,
    icon: PieChartOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/common/Dashboard")
    ),
  },
  notification: {
    path: "/user-notification",
    name: "USER_NOTIFICATION",
    permission: "",
    title: "User Notification",
    layout: layouts.portalLayout,
    icon: RadarChartOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/common/Notification")
    ),
  },
  termCondition: {
    path: "/term-condition-form",
    name: "TERM_CONDITION_SETTING",
    permission: "",
    title: "TEM_CONDITION_SETTING",
    layout: layouts.portalLayout,
    icon: RadarChartOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/administrator/TermConditionForm")
    ),
  },
  // Master Data

  ratingBadge: {
    path: "/master-data/rating-badge",
    permission: appPermissions.ratingBadge.page,
    title: "BADGE",
    name: "BADGE",
    layout: layouts.portalLayout,
    icon: StarOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/master-data/ratingBadge")
    ),
  },

  // Staff
  staffManagement: {
    path: "/staffs",
    name: "STAFF_MANAGEMENT",
    permission: appPermissions.staff.page,
    layout: layouts.portalLayout,
    icon: IdcardOutlined,
    component: LoadableComponent(() => import("../../../scenes/member/staff")),
  },
  staffCreate: {
    path: "/staff-create",
    name: "STAFF_MANAGEMENT_CREATE",
    permission: appPermissions.staff.create,
    layout: layouts.portalLayout,
    icon: IdcardOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/member/staff/StaffDetail")
    ),
  },
  staffDetail: {
    path: "/staff-detail/:id",
    name: "STAFF_MANAGEMENT_DETAIL",
    permission: appPermissions.staff.detail,
    layout: layouts.portalLayout,
    icon: IdcardOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/member/staff/StaffDetail")
    ),
  },
  // Partner
  partnerManagement: {
    path: "/partners",
    name: "PARTNER_MANAGEMENT",
    permission: appPermissions.partner.page,
    layout: layouts.portalLayout,
    icon: UserSwitchOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/member/partner")
    ),
  },
  partnerCreate: {
    path: "/partner-create",
    name: "PARTNER_MANAGEMENT_CREATE",
    permission: appPermissions.partner.create,
    layout: layouts.portalLayout,
    icon: UserSwitchOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/member/partner/component/partnerDetail")
    ),
  },
  partnerDetail: {
    path: "/partner-detail/:id",
    name: "PARTNER_MANAGEMENT_DETAIL",
    permission: appPermissions.partner.detail,
    layout: layouts.portalLayout,
    icon: UserSwitchOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/member/partner/component/partnerDetail")
    ),
  },

  // Customer
  customerManagement: {
    path: "/customers",
    name: "CUSTOMER_MANAGEMENT",
    permission: appPermissions.customer.page,
    layout: layouts.portalLayout,
    icon: UserOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/member/customer")
    ),
  },
  customerCreate: {
    path: "/customer-create",
    name: "CUSTOMER_MANAGEMENT_CREATE",
    permission: appPermissions.customer.create,
    layout: layouts.portalLayout,
    icon: UserOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/member/customer/component/customerDetails")
    ),
  },
  customerDetail: {
    path: "/customer-detail/:id",
    name: "CUSTOMER_MANAGEMENT_DETAIL",
    permission: appPermissions.customer.detail,
    layout: layouts.portalLayout,
    icon: UserOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/member/customer/component/customerDetails")
    ),
  },

  // Admin
  adminUser: {
    path: "/users",
    permission: appPermissions.adminUser.page,
    title: "Users",
    name: "ADMINISTRATION_USER",
    layout: layouts.portalLayout,
    icon: UserOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/administrator/Users")
    ),
  },
  adminRole: {
    path: "/roles",
    permission: appPermissions.adminRole.page,
    title: "Roles",
    name: "ADMINISTRATION_ROLE",
    layout: layouts.portalLayout,
    icon: TagsOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/administrator/Roles")
    ),
  },
  adminTenants: {
    path: "/tenants",
    permission: appPermissions.adminTenant.page,
    title: "Tenants",
    name: "ADMINISTRATION_TENANT",
    layout: layouts.portalLayout,
    icon: AppstoreOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/administrator/Tenants")
    ),
  },
  adminLanguages: {
    path: "/language",
    permission: appPermissions.adminLanguage.page,
    title: "Languages",
    name: "ADMINISTRATION_LANGUAGE",
    layout: layouts.portalLayout,
    icon: AppstoreOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/administrator/Languages")
    ),
  },
  adminLanguageTexts: {
    path: "/language-text/:id",
    permission: appPermissions.adminLanguage.changeText,
    title: "ADMINISTRATION_LANGUAGE_TEXT",
    name: "ADMINISTRATION_LANGUAGE_TEXT",
    layout: layouts.portalLayout,
    icon: AppstoreOutlined,
    component: LoadableComponent(
      () =>
        import(
          "../../../scenes/administrator/Languages/components/languageTexts"
        )
    ),
  },
  adminOrganizationUnit: {
    path: "/organization-unit",
    permission: appPermissions.adminRole.page,
    title: "OrganizationUnit",
    name: "ORGANIZATION_UNIT",
    layout: layouts.portalLayout,
    icon: FolderOpenOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/administrator/OrganizationUnit")
    ),
  },
  //TODO: pmh
  dashboardsAndReports: {
    path: "/dashboards-reports",
    name: "DASHBOARDS_AND_REPROTS",
    // permission: appPermissions.properties.page,
    layout: layouts.portalLayout,
    // icon: CopyrightOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/dashboardsManagement")
    ),
  },
  properties: {
    path: "/properties",
    name: "PROPERTIES",
    // permission: appPermissions.properties.page,
    layout: layouts.portalLayout,
    // icon: CopyrightOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/propertiesManagement/index")
    ),
  },

  projectsCreate: {
    path: "/projects-create",
    name: "PROJECT_CREATE",
    // permission: appPermissions.company.create,
    layout: layouts.portalLayout,
    component: LoadableComponent(
      () =>
        import(
          "../../../scenes/propertiesManagement/projects/components/projectDetail"
        )
    ),
  },
  projectsDetail: {
    path: "/projects-detail/:id",
    name: "PROJECT_DETAIL",
    // permission: appPermissions.company.detail,
    layout: layouts.portalLayout,
    component: LoadableComponent(
      () =>
        import(
          "../../../scenes/propertiesManagement/projects/components/projectDetail"
        )
    ),
  },
  clients: {
    path: "/clients",
    name: "CLIENTS",
    // permission: appPermissions.properties.page,
    layout: layouts.portalLayout,
    // icon: CopyrightOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/clientsManagement")
    ),
  },
  inquiries: {
    path: "/inquiries",
    name: "INQUIRIES",
    // permission: appPermissions.properties.page,
    layout: layouts.portalLayout,
    // icon: CopyrightOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/inquiriesManagement/index")
    ),
  },
  inquiriesCreate: {
    path: "/inquiries-create",
    name: "INQUIRIES_CREATE",
    // permission: appPermissions.company.create,
    layout: layouts.portalLayout,
    component: LoadableComponent(
      () =>
        import(
          "../../../scenes/inquiriesManagement/inquiriesList/components/inquiriesDetail"
        )
    ),
  },
  inquiriesDetail: {
    path: "/inquiries-detail/:id",
    name: "INQUIRIES_DETAIL",
    // permission: appPermissions.company.detail,
    layout: layouts.portalLayout,
    component: LoadableComponent(
      () =>
        import(
          "../../../scenes/inquiriesManagement/inquiriesList/components/inquiriesDetail"
        )
    ),
  },
  leaseContracts: {
    path: "/lease-contracts",
    name: "LEASE_CONTRACTS",
    // permission: appPermissions.properties.page,
    layout: layouts.portalLayout,
    // icon: CopyrightOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/leaseContractsManagement/index")
    ),
  },
  tasks: {
    path: "/tasks",
    name: "TASKS",
    // permission: appPermissions.properties.page,
    layout: layouts.portalLayout,
    // icon: CopyrightOutlined,
    component: LoadableComponent(
      () => import("../../../scenes/tasksManagement/index")
    ),
  },

  map: {
    path: "http://property-landing.sadec.co/",
    name: "MAP",
    // permission: appPermissions.map.page,
    layout: layouts.portalLayout,
    icon: UserOutlined,
    isExternal: true,
  },
};

export const routers: any = {
  ...userLayout,
  ...portalLayouts,
};

export const appMenuGroups: any = [
  routers.dashboardsAndReports,
  routers.properties,
  routers.clients,
  routers.inquiries,
  routers.leaseContracts,
  routers.tasks,
];

export const accountMenuGroups: any = [
  routers.accountConfigMyProfile,
  routers.accountConfigChangePassword,
  routers.accountConfigHistory,
  routers.accountConfigSavedShortcuts,
  routers.accountConfigChatWithSupport,
  routers.accountConfigSendFeedback,
  routers.accountConfigSetting,
];
