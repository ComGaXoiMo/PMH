import * as React from 'react'
import { L, isGranted } from '../../lib/abpUtility'
import { Avatar, AutoComplete, Tag, Rate } from 'antd'
import { getFirstLetterAndUpperCase, renderDate, renderAvatar, renderGender, renderIsActive } from '../../lib/helper'
import { moduleAvatar } from '@lib/appconst'

const { Option } = AutoComplete
const { colorByLetter } = moduleAvatar

class AppComponentBase<P = {}, S = {}, SS = any> extends React.Component<P, S, SS> {
  L(key: string, sourceName?: string): string {
    return L(key)
  }

  isGranted(permissionName: string): boolean {
    return isGranted(permissionName)
  }

  renderOptions(options, log?) {
    if (log) {
      console.log(options)
    }

    return (options || []).map((option, index) => (
      <Option key={index} value={option.value || option.id}>
        {option.label || option.name}
      </Option>
    ))
  }
  renderRatingOptions(options, log?) {
    if (log) {
      console.log(options)
    }

    return (options || []).map((option, index) => (
      <Option key={index} value={option.value || option.id}>
        <Rate disabled defaultValue={option.value} />
      </Option>
    ))
  }
  renderAvatar = renderAvatar

  renderLogo(logoUrl, projectName, size = 64) {
    const firstLetter = getFirstLetterAndUpperCase(projectName || 'G')
    const color = colorByLetter(firstLetter)
    return (
      <>
        <div className="table-cell-profile">
          <div>
            <Avatar shape="square" size={size} src={logoUrl} style={{ background: color }}>
              {firstLetter}
            </Avatar>
          </div>
        </div>
      </>
    )
  }

  renderGender = renderGender
}

export class AppComponentListBase<P = {}, S = {}, SS = any> extends AppComponentBase<P, S, SS> {
  renderDate = renderDate

  renderIsActive = renderIsActive

  renderTag(value, color) {
    return (
      <Tag className="cell-round mr-0" color={color}>
        {value}
      </Tag>
    )
  }
}

export default AppComponentBase
