import { emailRegex, phoneRegex } from '../../../../lib/appconst'

const rules = {
  require: [{ required: true }],
  name: [{ required: true }, { min: 1 }, { max: 64 }],
  surname: [{ required: true }, { min: 1 }, { max: 64 }],
  displayName: [{ required: true }, { min: 6 }, { max: 256 }],
  userName: [{ required: true }, { min: 5 }, { max: 256 }],
  emailAddress: [
    { required: true },
    { min: 6 },
    { max: 256 },
    {
      required: false,
      pattern: emailRegex
    }
  ],
  password: [{ required: true }, { min: 6 }, { max: 256 }],
  phoneNumber: [
    { max: 15 },
    {
      required: true,
      pattern: phoneRegex
    }
  ],
  identityNumber: [{ max: 64 }],
  passport: [{ max: 64 }],
  license: [{ max: 32 }, {required: true}],
  description: [{ max: 256}, {required: true}]
}

export default rules
