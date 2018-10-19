import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { defineMessages } from 'react-intl'
import { Table } from 'antd'
// import _ from 'lodash'
import moment from 'moment'
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const message = defineMessages({
  product: {
    id: 'FORM.PRODUCTS',
    defaultMessage: '产品'
  },
  server: {
    id: 'FORM.SERVERS',
    defaultMessage: '服务器'
  },
  time: {
    id: 'TABLE.TIME',
    defaultMessage: '时间'
  },
  tip: {
    id: 'TABLE.NOTICE_TIP',
    defaultMessage: '维护提示'
  }
})


export default class List extends Component {

  static propTypes = {
    // login: PropTypes.object.isRequired,
    intl: PropTypes.object,
    maintenanceTip: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.columns = [{
      title: this.props.intl.formatMessage(message.tip),
      dataIndex: 'notice',
      key: 'notice'
    }, {
      title: this.props.intl.formatMessage(message.product),
      dataIndex: 'productId',
      key: 'productId'
    }, {
      title: this.props.intl.formatMessage(message.server),
      dataIndex: 'serverId',
      key: 'serverId'
    }, {
      title: this.props.intl.formatMessage(message.time),
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text, record) => {
        return moment(text).format('YYYY-MM-DD HH:mm:ss')
      }
    }]
  }

  render() {

    return (
      <div>
        <Table
          bordered
          dataSource={this.props.maintenanceTip.list}
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
