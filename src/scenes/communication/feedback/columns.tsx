import {L} from "@lib/abpUtility"
import * as React from "react"
import AppConst from '@lib/appconst'
import { renderAvatar, renderDate, renderIsActive, renderTag } from '@lib/helper'
import { CalendarOutlined, UserOutlined } from '@ant-design/icons'
const { align } = AppConst

const columns = (actionColumn?) => {
  let data = [
    {
      title: L('FEEDBACK_ID'),
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (id) => <>{id}</>
    },
    {
      title: L('ACCOUNT'),
      dataIndex: 'user',
      key: 'user',
      width: 200,
      render: (user) => renderAvatar(user?.displayName, user, true)
    },
    {
      title: L('FEEDBACK_TYPE'),
      dataIndex: 'feedbackType',
      key: 'feedbackType',
      width: 200,
      render: (feedbackType, row) => <>
        {feedbackType?.name}
        <div className="text-muted">{row.workflow?.tracker?.name}</div>
      </>
    },
    {
      title: L('DESCRIPTION'),
      dataIndex: 'workflow',
      key: 'workflow',
      width: 250,
      ellipsis: true,
      render: (workflow) => <>{workflow?.description}</>
    },
    {
      title: L('FEEDBACK_STATUS'),
      dataIndex: 'workflow',
      key: 'workflow',
      width: 80,
      render: (workflow) =>
        renderTag(workflow?.status?.name, workflow?.status?.borderColorCode || 'black')
    },
    {
      title: L('IS_ACTIVE'),
      dataIndex: 'isActive',
      key: 'isActive',
      width: 100,
      align: align.center,
      render: renderIsActive
    },
    {
      title: L('CREATED_AT'),
      dataIndex: 'workflow',
      key: 'workflow',
      width: 150,
      ellipsis: true,
      render: (workflow) => (
        <div className="text-muted small">
          <CalendarOutlined className="mr-1" /> {renderDate(workflow?.creationTime)}
          <div>
            <UserOutlined className="mr-1" /> {workflow?.creatorUser?.displayName}
          </div>
        </div>
      )
    }
  ]

  if (actionColumn) {
    data.push(actionColumn)
  }

  return data
}

export default columns
