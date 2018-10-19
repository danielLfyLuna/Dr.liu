import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import _ from 'lodash'

import moment from 'moment'
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn'
moment.locale('zh-cn')


export default class NicknameList extends Component {

  static propTypes = {
    data: PropTypes.object
  }


  constructor(props) {
    super(props)

    this.columns = [{
        title: '玩家ID',
        dataIndex: 'playerId',
        key: 'playerId'
      }, {
        title: '昵称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '修改时间',
        dataIndex: 'editTime',
        key: 'editTime',
        render: (text) => {
          if (text === 0) {
            return '正在使用中'
          }
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }]
  }

  onReduce = (value) => {
    let item = []
    _.forEach(value, (val, idx) => {
      _.forEach(val, (v, l) => {
        item.push(v)
      })
    })
    return item
  }

  render() {
    let dataSource = []
    dataSource = this.onReduce(this.props.data)

    return (
      <div>
        <Table
          bordered
          dataSource={dataSource}
          columns={this.columns}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
      </div>
    )
  }

}
