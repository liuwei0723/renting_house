import React, { Component } from 'react'

import { Input, Dimmer, Loader } from 'semantic-ui-react'

import axios from 'axios'

import './Home.css'

import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"

export default class Home extends Component {
  constructor() {
    super()

    this.state = {
      swipers: [], //轮播图
      menus: [], //菜单
      infos: [], //咨询
      faqs: [], //问答
      houses: [], //房屋列表
      isLoading: true //正在加载中...
    }
  }

  async componentWillMount() {
    const results = await Promise.all([
      axios.post('homes/swipe'),
      axios.post('homes/menu'),
      axios.post('homes/info'),
      axios.post('homes/faq'),
      axios.post('homes/house')
    ])

    this.setState(
      {
        swipers: results[0].data.data.list,
        menus: results[1].data.data.list,
        infos: results[2].data.data.list,
        faqs: results[3].data.data.list,
        houses: results[4].data.data.list
      },
      () => {
        this.setState({
          isLoading: false
        })
      }
    )
  }

  render() {
    const { isLoading,swipers } = this.state
    return (
      <div className="home-container">
        {/* 1.0 搜索框 */}
        <div className="home-topbar">
          <Input
            fluid
            icon={{ name: 'search', circular: true, link: true }}
            placeholder="搜房源..."
          />
        </div>
        {/* 2.0 Dimmer加载器 */}
        <Dimmer active={isLoading} inverted>
          <Loader>正在加载中...</Loader>
        </Dimmer>
        {/* 3.0 内容区域 */}
        <div className="home-content">
          {/* 3.1 轮播图 */}
          <ImageGallery autoPlay={true} showThumbnails={false} lazyLoad={true} items={swipers} />
          {/* 3.2 菜单 */}
          {/* 3.3 咨询 */}
          {/* 3.4 问答 */}
          {/* 3.5 房屋列表 */}
        </div>
      </div>
    )
  }
}
