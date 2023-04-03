import {
  checkArrayEmail,
  checkArrayPhone,
  checkArrayRequired,
} from "@lib/validation";
import { emailRegex, phoneRegex } from "@lib/appconst";

const rules = {
  gender: [{ required: true }],
  contactName: [{ required: true }],
  nationalityId: [{ required: false }],

  contactPhone: [
    { type: "array" as const },
    {
      pattern: phoneRegex,
      validator: (rule, value) => checkArrayPhone(rule, value, "CONTACT_PHONE"),
    },
  ],
  contactEmail: [
    {
      required: true,
      validator: (rule, value) =>
        checkArrayRequired(rule, value, "CONTACT_EMAIL"),
    },
    { type: "array" as const },
    {
      pattern: emailRegex,
      validator: (rule, value) => checkArrayEmail(rule, value, "CONTACT_EMAIL"),
    },
  ],
  contactAddress: [
    {
      required: true,
      validator: (rule, value) =>
        checkArrayRequired(rule, value, "CONTACT_LOCATION"),
    },
    { type: "array" as const },
  ],
};

export default rules;
