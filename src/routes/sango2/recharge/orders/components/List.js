import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import moment from 'moment'
import { defineMessages } from 'react-intl'

const message = defineMessages({
  playerId: {
    id: 'TABLE.PLAYERID',
    defaultMessage: '玩家ID'
  },
  nickname: {
    id: 'TABLE.NICKNAME',
    defaultMessage: '玩家昵称'
  },
  uid: {
    id: 'TABLE.PLATFORMID',
    defaultMessage: '平台ID'
  },
  orderId: {
    id: 'TABLE.ORDERID',
    defaultMessage: '订单ID'
  },
  itemName: {
    id: 'TABLE.ITEMNAME',
    defaultMessage: '物品'
  },
  channel: {
    id: 'TABLE.PAYCHANNEL',
    defaultMessage: '支付渠道'
  },
  rmb: {
    id: 'TABLE.RMB',
    defaultMessage: '人民币'
  },
  amount: {
    id: 'TABLE.PAYAMOUNT',
    defaultMessage: '金额'
  },
  currency: {
    id: 'TABLE.CURRENCY',
    defaultMessage: '货币类型'
  },
  coinCount: {
    id: 'TABLE.DIAMOND',
    defaultMessage: '钻石'
  },
  createTime: {
    id: 'TABLE.TRADECREATETIME',
    defaultMessage: '交易创建时间'
  },
  commitTime: {
    id: 'TABLE.COMMITTIME',
    defaultMessage: '完成时间'
  },
  orderStatus: {
    id: 'TABLE.ORDERSTATUS',
    defaultMessage: '充值状态'
  }
})

export default class List extends Component {

  constructor(props) {
    super(props)
    const { initials, intl } = this.props
    this.columns = [
      {
        title: intl.formatMessage(message.playerId),
        dataIndex: 'playerId',
        key: 'playerId'
      }, {
        title: intl.formatMessage(message.nickname),
        dataIndex: 'nickname',
        key: 'nickname'
      }, {
        title: intl.formatMessage(message.uid),
        dataIndex: 'uid',
        key: 'uid'
      }, {
        title: intl.formatMessage(message.orderId),
        dataIndex: 'orderId',
        key: 'orderId'
      }, {
        title: intl.formatMessage(message.itemName),
        dataIndex: 'itemName',
        key: 'itemName'
      }, {
        title: intl.formatMessage(message.channel),
        dataIndex: 'channel',
        key: 'channel'
      }, {
        title: intl.formatMessage(message.rmb),
        dataIndex: 'rmb',
        key: 'rmb'
      }, {
        title: intl.formatMessage(message.amount),
        dataIndex: 'amount',
        key: 'amount',
        render: (text, record) => {
          return `${text} ${record.currencyUnit}`
        }
      }, {
        title: intl.formatMessage(message.currency),
        dataIndex: 'currency',
        key: 'currency'
      }, {
        title: intl.formatMessage(message.coinCount),
        dataIndex: 'coinCount',
        key: 'coinCount'
      }, {
        title: intl.formatMessage(message.createTime),
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text, record) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }, {
        title: intl.formatMessage(message.commitTime),
        dataIndex: 'commitTime',
        key: 'commitTime',
        render: (text, record) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }, {
        title: intl.formatMessage(message.orderStatus),
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        render: (text, record) => {
          return `${initials.map.orderStatus[text]}(${text})`
        }
      }
    ]

    this.dataSource = []
  }

  render() {
    const { params, products, conf } = this.props.initials
    const options = this.props.options
    this.dataSource = options.recharge.orders
    let arrParam = []
    products.productId ? arrParam.push(`产品/服务器：${products.productId}/${products.serverId}`) : ''
    params.startTime ? arrParam.push(`开始时间：${params.startTime}`) : ''
    params.endTime ? arrParam.push(`结束时间：${params.endTime}`) : ''
    params.nickname ? arrParam.push(`昵称：${params.nickname}`) : ''
    params.playerId ? arrParam.push(`玩家 ID：${params.playerId}`) : ''
    params.orderId ? arrParam.push(`订单 ID：${params.orderId}`) : ''
    params.platformId ? arrParam.push(`平台 ID：${params.platformId}`) : ''
    let strParam = arrParam.join('，')
    let defaultLocale = {
      emptyText: conf.locale ? `查询：{ ${strParam} }，暂未查到数据` : '未作查询，暂无数据'
    }
    let pagination = {
      showSizeChanger: true,
      defaultPageSize: 50,
      pageSizeOptions: ['20', '50', '100', '200', '500'],
      total: this.dataSource.length
    }
    return (
      <div>
        <Table
          dataSource={this.dataSource}
          columns={this.columns}
          locale={defaultLocale}
          rowKey='orderId'
          pagination={pagination}
          bordered
        />

      </div>
    )
  }
}

List.propTypes = {
  intl: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object
}
