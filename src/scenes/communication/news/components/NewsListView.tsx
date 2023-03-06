import React from 'react'
import { EventType, NewsModel } from '@models/communication/News'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Dropdown, Menu, Spin } from 'antd'
import {
  ClockCircleOutlined,
  MoreOutlined,
  TagOutlined,
  UserOutlined,
  BorderlessTableOutlined
} from '@ant-design/icons'
import confirm from 'antd/lib/modal/confirm'
import { portalLayouts } from '@components/Layout/Router/router.config'
import { isGranted, L, LNotification } from '@lib/abpUtility'
import { renderDateTime } from '@lib/helper'
import orderBy from 'lodash/orderBy'
import { appPermissions } from '@lib/appconst'

interface NewsProps extends RouteComponentProps {
  news: NewsModel[]
  loading?: boolean
  onDelete: (id: number, isActive: boolean) => void
  onNotify: (item: number) => void
}

function NewsListView(props: NewsProps) {
  const onDelete = (item: NewsModel) => () => {
    confirm({
      title: LNotification('DO_YOU_WANT_TO_DEACTIVATE_THIS_ITEM'),
      okText: L('BTN_YES'),
      cancelText: L('BTN_NO'),
      onOk: () => {
        props.onDelete(item.id, !item.isActive)
      },
      onCancel() {}
    })
  }
  const gotoEdit = (id: number) => () => {
    props.history?.push(portalLayouts.newsEdit.path.replace(':id', id))
  }

  const onNotify = (item: NewsModel) => () => {
    confirm({
      title: LNotification(L(`DO_YOU_WANT_TO_NOTIFY_${item.eventType === EventType.PROJECT ? 'PROJECT' : 'UNIT'}`)),
      okText: L('BTN_YES'),
      cancelText: L('BTN_NO'),
      onOk: () => {
        props.onNotify(item.id)
      },
      onCancel() {}
    })
  }

  if (props.loading) {
    return (
      <div className="flex auto center-content">
        <Spin size="large" />
      </div>
    )
  }

  if (!props.news.length) {
    return <div className="news-list flex center-content news-empty">{L('NEWS_EMPTY_DATA')}</div>
  }

  const sortedNewsList = orderBy(props.news, ['sortOrder', 'creationTime'], ['desc', 'desc'])

  return (
    <div className="flex column news-list">
      {sortedNewsList.map((item) => (
        <div className="flex news-list-row" key={item.id}>
          <div className="news-photo">
            <img
              src={item.file?.fileUrl}
              alt=""
              style={{ width: 120, height: 120, objectFit: 'cover' }}
            />
          </div>
          <div className="news-list-meta flex column auto">
            <h4 className="news-item-title">
              <a href={portalLayouts.newsDetail.path.replace(':id', item.id)} className="text-truncate-1">
                {item.subject}
              </a>
            </h4>
            <div className="flex column space-between auto">
              <p className="news-item-desc text-truncate-2">{item.shortDescription}</p>
              <div className="news-list-detail inline-flex">
                {item.sortOrder && (
                  <div>
                    <BorderlessTableOutlined />
                    {item.sortOrder}&nbsp;
                  </div>
                )}
                {item.category && (
                  <div className="news-item-detail">
                    <TagOutlined /> {item.category?.name}
                  </div>
                )}
                {item.creatorUser && (
                  <div className="news-item-detail">
                    <UserOutlined /> {item.creatorUser?.displayName}
                  </div>
                )}
                {item.creationTime && (
                  <div className="news-item-detail">
                    <ClockCircleOutlined /> {renderDateTime(item.creationTime)}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="news-list-actions flex center-items">
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu style={{ width: 150 }}>
                  {isGranted(appPermissions.news.update) && (
                    <Menu.Item onClick={gotoEdit(item.id)}>{L('BTN_EDIT')}</Menu.Item>
                  )}
                  {isGranted(appPermissions.news.delete) && (
                    <Menu.Item onClick={onDelete(item)}>
                      {item.isActive ? L('BTN_DEACTIVATE') : L('BTN_ACTIVATE')}
                    </Menu.Item>
                  )}
                  {
                    <Menu.Item onClick={onNotify(item)}>
                      {item.eventType === EventType.PROJECT ? L('NEWS_SEND_TO_PROJECT') : L('NEWS_SEND_TO_UNIT')}
                    </Menu.Item>
                  }
                </Menu>
              }
              placement="topLeft"
            >
              <MoreOutlined style={{ marginRight: 16, marginLeft: 16 }} />
            </Dropdown>
          </div>
        </div>
      ))}
    </div>
  )
}

export default withRouter(NewsListView)
