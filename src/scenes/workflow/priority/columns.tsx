import {L} from "@lib/abpUtility"
import * as React from "react"
import AppConst from '@lib/appconst'
import { Tag } from 'antd'
import { renderIsActive } from '@lib/helper'
const { align } = AppConst

const columns = (actionColumn?) => {
  let data = [
    {
      title: L('WF_PRIORITY_NAME'),
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (text: string) => <div>{text}</div>
    },
    {
      title: L('WF_MODULE'),
      dataIndex: 'modules',
      key: 'modules',
      width: 150,
      render: (modules) => (
        <div>
          {(modules || []).map((module, index) => (
            <Tag key={index}>{module.name}</Tag>
          ))}
        </div>
      )
    },
    {
      title: L('ACTIVE_STATUS'),
      dataIndex: 'isActive',
      key: 'isActive',
      width: 150,
      align: align.center,
      render: renderIsActive
    }
  ]

  if (actionColumn) {
    data.push(actionColumn)
  }

  return data
}

export default columns
