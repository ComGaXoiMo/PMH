import { isGranted, L } from '@lib/abpUtility'
import * as React from 'react'
import { EditOutlined, CheckOutlined, CloseOutlined  } from '@ant-design/icons'
import { Button } from 'antd'
import AppConst, { appPermissions } from '@lib/appconst'
import SystemColumn from '@components/DataTable/columns'
import { formatNumber, renderDate } from '@lib/helper'
import ItemStatus from '@components/AppItems/ItemStatus'

const { align } = AppConst

const columns = (onShowCreateOrUpdateModal, activateOrDeactivate) => {
  return [
    {
      title: L('ANNOUNCEMENT_SUBJECT'),
      dataIndex: 'subject',
      key: 'subject',
      width: 250,
      ellipsis: true,
      render: (subject, row) => <>
        {subject}<br/>
        <small className="text-muted">
          {renderDate(row.startDate)} - {renderDate(row.endDate)}
        </small>
      </>
    },
    {
      title: L('ANNOUNCEMENT_TYPE'),
      dataIndex: 'announcementType',
      key: 'announcementType',
      width: 150,
      ellipsis: true,
      render: (announcementType) => <>
        {announcementType?.name}
      </>
    },
    {
      title: L('ANNOUNCEMENT_VIEW_COUNT'),
      dataIndex: 'viewCount',
      key: 'viewCount',
      width: 100,
      align: align.right,
      render: (viewCount) => <>
        {formatNumber(viewCount)}
      </>
    },
    {
      title: L('ANNOUNCEMENT_EXPIRED_STATUS'),
      dataIndex: 'expiredStatus',
      key: 'expiredStatus',
      width: 150,
      align: align.center,
      render: (expiredStatus) => <ItemStatus status={expiredStatus} />
    },
    {
      title: L('ANNOUNCEMENT_STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 150,
      align: align.center,
      render: (status) => <ItemStatus status={status} />
    },
    SystemColumn,
    {
      title: L('ACTION'),
      key: 'action',
      fixed: align.right,
      align: align.right,
      width: 90,
      render: (text, item: any) => {
        return (
          <div>
            {isGranted(appPermissions.withdraw.update) && (
              <Button
                size="small"
                className="ml-1"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => onShowCreateOrUpdateModal(item.id)}
                title={L('BTN_EDIT')}
              />
            )}
            {isGranted(appPermissions.expenseMandate.delete) && (
              <Button
                size="small"
                className="ml-1"
                shape="circle"
                icon={item.isActive ? <CloseOutlined /> : <CheckOutlined />}
                onClick={() => activateOrDeactivate([item.id], !item.isActive)}
              />
            )}
          </div>
        )
      }
    }
  ]
}

export default columns
