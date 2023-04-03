// import { checkArrayRequired } from "@lib/validation";

const rules = {
  unitName: [{ required: true }],
  floorId: [{ required: true }],
  statusId: [{ required: true }],
  unitTypeId: [{ required: true }],
  size: [{ required: true }],
  roomNumber: [{ require: true }],
  
};

export const ruleUnitTenant = {
  orgTenantId: [{ required: true }],
  reasonMove: [{ required: false }],
  description: [{ required: false }],
};

export default rules;
