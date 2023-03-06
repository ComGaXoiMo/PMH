import React from 'react'
import { L } from '@lib/abpUtility'
import { renderDateTime } from '@lib/helper'
import moment from 'moment-timezone/moment-timezone'

const SystemColumn = {
  title: L('SYSTEM'),
  dataIndex: 'creationTime',
  key: 'creationTime',
  width: 300,
  render: (creationTime, row) => {
    const createdAtAgo = moment(creationTime).fromNow()
    const updatedAtAgo = moment(row.lastModificationTime).fromNow()
    return (
      <div className="text-muted small">
        <div>
          {L('CREATED_BY')} {row.creatorUser?.displayName} {createdAtAgo}
          <br />
          {L('AT')} {renderDateTime(creationTime)}
        </div>
        {row.lastModifierUser && (
          <div>
            {L('UPDATED_BY')} {row.lastModifierUser?.displayName} {updatedAtAgo}
            <br />
            {L('AT')} {renderDateTime(row.lastModificationTime)}
          </div>
        )}
      </div>
    )
  }
}

export default SystemColumn
