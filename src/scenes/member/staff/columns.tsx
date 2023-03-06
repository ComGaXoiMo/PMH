import { MailOutlined, PhoneOutlined } from '@ant-design/icons'
import * as React from 'react'
import { L } from '@lib/abpUtility'
import AppConst from '@lib/appconst'
import { renderAvatar, renderDateTime } from '@lib/helper'
import { Switch } from 'antd'
const { align } = AppConst

const columns = (actionColumn?) => {
  let data = [
    {
      title: L('STAFF_FULL_NAME'),
      dataIndex: 'displayName',
      key: 'displayName',
      width: 250,
      ellipsis: true,
      render: (displayName, row) => renderAvatar(displayName, { ...row, emailAddress: undefined })
    },
    {
      title: L('STAFF_CONTACT'),
      dataIndex: 'emailAddress',
      key: 'emailAddress',
      width: 200,
      ellipsis: true,
      render: (emailAddress, row) => (
        <>
          <div>
            <PhoneOutlined /> {row.phoneNumber}
          </div>
          <div>
            <MailOutlined /> {emailAddress}
          </div>
        </>
      )
    },

    {
      title: L('STAFF_ACTIVE_STATUS'),
      dataIndex: 'isActive',
      key: 'isActive',
      width: 100,
      align: align.center,
      render: (isActive) => <Switch checked={isActive} disabled />
    },
    {
      title: L('STAFF_CREATE_BY'),
      dataIndex: 'creationTime',
      key: 'creationTime',
      width: 150,
      render: (creationTime, row) => (
        <>
          <div>{row.creatorUser?.displayName}</div>
          <div>{renderDateTime(creationTime)}</div>
        </>
      )
    },
    {
      title: L('STAFF_LAST_MODIFICATION'),
      dataIndex: 'lastModificationTime',
      key: 'lastModificationTime',
      width: 150,
      render: (lastModificationTime, row) => (
        <>
          <div>{row.lastModifierUser?.displayName}</div>
          <div>{renderDateTime(lastModificationTime)}</div>
        </>
      )
    }
  ]

  if (actionColumn) {
    data.push(actionColumn)
  }

  return data
}

export default columns
