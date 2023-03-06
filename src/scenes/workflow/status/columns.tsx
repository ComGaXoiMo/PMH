import {L} from "@lib/abpUtility"
import * as React from "react"
import AppConst from '@lib/appconst'
import { Tag } from 'antd'
const { align } = AppConst

const columns = (actionColumn?) => {
  let data = [
    {
      title: L('WF_STATUS_NAME'),
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (text: string, item) => <div style={{ color: item.borderColorCode }}>{text}</div>
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
      width: 300,
      align: align.center,
      render: (text, item) => (
        <div>
          {item.isActive && (
            <Tag className="cell-round mr-1" color="#2db7f5">
              {L('ACTIVE')}
            </Tag>
          )}
          {item.isAdjustEscalationCompleteTime && (
            <Tag className="cell-round mr-1" color="#1D4449">
              {L('ADJUST_SLA_COMPLETION_TIME')}
            </Tag>
          )}
          {item.isFirstResponse && (
            <Tag className="cell-round mr-1" color="#DA3B01">
              {L('1_ST_RESPONSE')}
            </Tag>
          )}
          {item.isIssueClosed && (
            <Tag className="cell-round mr-1" color="#B2B2B2">
              {L('ISSUE_CLOSED')}
            </Tag>
          )}
          {item.isSkipEscalationNotification && (
            <Tag className="cell-round mr-1" color="#FFB64D">
              {L('SKIP_ESCALATION_NOTIFICATION')}
            </Tag>
          )}
        </div>
      )
    },
  ]

  if (actionColumn) {
    data.push(actionColumn)
  }

  return data
}

export default columns
