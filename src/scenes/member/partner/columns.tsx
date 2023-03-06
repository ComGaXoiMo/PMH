import { MailOutlined, PhoneOutlined } from '@ant-design/icons'
import * as React from 'react'
import { L } from '@lib/abpUtility'
import AppConst from '@lib/appconst'
import { formatNumber, renderAvatar, renderDateTime, renderIsActive } from '@lib/helper'
const { align } = AppConst

const columns = (actionColumn?) => {
  let data = [
    {
      title: L('PARTNER_FULL_NAME'),
      dataIndex: 'displayName',
      key: 'displayName',
      width: 250,
      ellipsis: true,
      render: (displayName, row) =>
        renderAvatar(displayName, { ...row, emailAddress: undefined, phoneNumber: undefined })
    },
    {
      title: L('PARTNER_CONTACT'),
      dataIndex: 'emailAddress',
      key: 'emailAddress',
      width: 220,
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
      title: L('STATUS'),
      dataIndex: 'warningInformation',
      key: 'warningInformation',
      width: 120,
      align: align.center,
      render: (warningInformation) => renderIsActive(warningInformation?.status)
    },
    {
      title: L('TRUCK_STATUS'),
      dataIndex: 'warningInformation',
      key: 'warningInformation',
      width: 120,
      align: align.center,
      render: (warningInformation) => renderIsActive(warningInformation?.isTruckConfirmed)
    },
    {
      title: L('EMAIL_STATUS'),
      dataIndex: 'warningInformation',
      key: 'warningInformation',
      width: 120,
      align: align.center,
      render: (warningInformation) => renderIsActive(warningInformation?.isEmailConfirmed)
    },
    {
      title: L('PHONE_STATUS'),
      dataIndex: 'warningInformation',
      key: 'warningInformation',
      width: 120,
      align: align.center,
      render: (warningInformation) => renderIsActive(warningInformation?.isPhoneConfirmed)
    },
    {
      title: L('BALANCE_STATUS'),
      dataIndex: 'warningInformation',
      key: 'warningInformation',
      width: 120,
      align: align.center,
      render: (warningInformation) => renderIsActive(!warningInformation?.isTopUp)
    },
    {
      title: L('PARTNER_ACCOUNT_BALANCE'),
      dataIndex: 'feeCashAdvance',
      key: 'feeCashAdvance',
      width: 100,
      align: align.right,
      render: (feeCashAdvance) => <>{formatNumber(feeCashAdvance?.balanceAmount || 0)}</>
    },
    {
      title: L('PARTNER_ACCEPT_PER_TOTAL'),
      dataIndex: 'isActive',
      key: 'isActive',
      width: 100,
      align: align.center,
      render: () => <></>
    },
    {
      title: L('PARTNER_CREATE_BY'),
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
      title: L('PARTNER_LAST_MODIFICATION'),
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
