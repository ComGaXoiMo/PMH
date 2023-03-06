import React from 'react'
import { inject, observer } from 'mobx-react'
import Stores from '../../../../stores/storeIdentifier'
import { RouteComponentProps } from 'react-router-dom'
import get from 'lodash/get'
import NewsStore from '../../../../stores/communication/newsStore'
import './news-detail.less'
import { renderDate } from '@lib/helper'
import { ClockCircleOutlined, TagOutlined, UserOutlined } from '@ant-design/icons'
import { ImageFile } from '@models/File'
import { Button } from 'antd'
import WrapPageScroll from '../../../../components/WrapPageScroll'
import { L } from '@lib/abpUtility'

interface NewsDetailProps extends RouteComponentProps {
  newsStore: NewsStore
}

@inject(Stores.NewsStore)
@observer
export default class NewsDetail extends React.Component<NewsDetailProps, { img: ImageFile | null }> {
  constructor(props: NewsDetailProps) {
    super(props)
    this.state = {
      img: null
    }
  }
  async componentDidMount() {
    const newsId = get(this.props, 'match.params.id')
    if (newsId) {
      const { newsStore } = this.props
      await newsStore.get(newsId)
      const images = await newsStore.getImage(newsStore.detailNews?.uniqueId)
      if (images && images.length) {
        this.setState({ img: images[0] as any })
      }
    }
  }

  renderBackBtn = () => (
    <Button onClick={this.props.history.goBack} shape="round">
      {L('BTN_BACK')}
    </Button>
  )

  render() {
    const { newsStore } = this.props
    return (
      <WrapPageScroll renderActions={this.renderBackBtn}>
        <div className="news-d-container">
          {this.state.img && (
            <div className="news-d-banner mb-3">
              <img src={this.state.img.fileUrl} alt="" />
            </div>
          )}
          <h1 className="news-d-title">{newsStore.detailNews?.subject}</h1>
          <span className="news-d-sub text-muted mb-3">
            <TagOutlined /> {newsStore.detailNews?.category?.name}
            {' | '}
            <UserOutlined /> {newsStore.detailNews?.creatorUser?.displayName} {' | '}
            <ClockCircleOutlined /> {renderDate(newsStore.detailNews?.creationTime)}
          </span>
          <p
            className="news-d-content"
            dangerouslySetInnerHTML={{
              __html: newsStore.detailNews?.content || ''
            }}
          />
        </div>
      </WrapPageScroll>
    )
  }
}
