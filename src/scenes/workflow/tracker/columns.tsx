import {L} from "@lib/abpUtility"
import * as React from "react"
import AppConst from '@lib/appconst'
import { renderIsActive } from '@lib/helper'
const { align } = AppConst

const columns = (actionColumn?) => {
  let data = [
    {
      title: L('WF_TRACKER_NAME'),
      dataIndex: 'name',
      key: 'name',
      width: 250,
      ellipsis: true,
      render: (name, row) => <>{name}<br/>
        <small className="text-muted">{row.code}</small>
      </>
    },
    {
      title: L('DESCRIPTION'),
      dataIndex: 'description',
      width: 300,
      ellipsis: true,
      render: (description) => description
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
