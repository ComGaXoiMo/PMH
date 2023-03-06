import { checkMultiLanguageMaxLength, checkMultiLanguageRequired } from '@lib/validation'

const rules = {
  names: [
    { required: true, validator: (rule, value) => checkMultiLanguageRequired(rule, value, 'NAME') },
    { max: 64, validator: (rule, value) => checkMultiLanguageMaxLength(rule, value, 'NAME') }
  ],
  code: [{ required: true }, { max: 64 }],
  description: [{ required: true }, { max: 5000 }],
  sortNumber: [{ required: true }, { type: 'number' as const, max: 32768 }],
  moduleIds: [{ required: true }],
  parentId: [{ required: true }]
}

export default rules
