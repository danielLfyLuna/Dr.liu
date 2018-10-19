import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import moment from 'moment'
import { defineMessages } from 'react-intl'


const message = defineMessages({
  activityId: {
    id: 'TABLE.ACTIVITY_ID',
    defaultMessage: '礼包编号'
  },
  productId: {
    id: 'TABLE.PRODUCTID',
    defaultMessage: '产品ID'
  },
  serverId: {
    id: 'TABLE.SERVERID',
    defaultMessage: '服务器ID'
  },
  channel: {
    id: 'FORM.CHANNEL',
    defaultMessage: '渠道'
  },
  creator: {
    id: 'FORM.CREATOR',
    defaultMessage: '创建人'
  },
  receiveState: {
    id: 'TABLE.RECEIVESTATE',
    defaultMessage: '领取状态'
  },
  type: {
    id: 'TABLE.TYPE',
    defaultMessage: '类型'
  },
  receiveTime: {
    id: 'TABLE.RECEIVE_TIME',
    defaultMessage: '领取时间'
  },
  endTime: {
    id: 'TABLE.ENDTIME',
    defaultMessage: '结束时间'
  },
  userId: {
    id: 'TABLE.USERID',
    defaultMessage: '用户ID'
  },
  usedCount: {
    id: 'TABLE.USEDCOUNT',
    defaultMessage: '使用量'
  },
  total: {
    id: 'TABLE.TOTAL',
    defaultMessage: '总量'
  },
  item: {
    id: 'FORM.ITEM',
    defaultMessage: '道具'
  },
  count: {
    id: 'TABLE.TOTAL',
    defaultMessage: '数量'
  },
  cdkey: {
    id: 'TABLE.TOTAL',
    defaultMessage: '兑换码'
  },
  uid: {
    id: 'FORM.PLATFORMID',
    defaultMessage: '平台ID'
  },
  useTime: {
    id: 'TABLE.USE_TIME',
    defaultMessage: '使用时间'
  },
  cdkey_empty: {
    id: 'NOTIFICATION.CDKEY_EMPTY',
    defaultMessage: '此礼包暂无奖励'
  },
  useStatus: {
    id: 'TABLE.USESTATUS',
    defaultMessage: '使用情况'
  },
  useStatus_no: {
    id: 'NOTIFICATION.USESTATUS_NO',
    defaultMessage: '暂无CDKEY使用情况'
  },
  notFound: {
    id: 'NOTIFICATION.FOUND_NORESULT',
    defaultMessage: '暂无数据'
  }
})


export default class List extends Component {

  constructor(props) {
    super(props)
    const { initials } = this.props
    this.columns = [
      {
        title: this.props.intl.formatMessage(message.activityId),
        dataIndex: 'activityId',
        key: 'activityId'
      }, {
        title: this.props.intl.formatMessage(message.productId),
        dataIndex: 'productId',
        key: 'productId'
      }, {
        title: this.props.intl.formatMessage(message.serverId),
        dataIndex: 'serverId',
        key: 'serverId'
      }, {
        title: this.props.intl.formatMessage(message.channel),
        dataIndex: 'channel',
        key: 'channel'
      }, {
        title: this.props.intl.formatMessage(message.creator),
        dataIndex: 'creator',
        key: 'creator'
      }, {
        title: this.props.intl.formatMessage(message.receiveState),
        dataIndex: 'state',
        key: 'state',
        render: (text, record) => {
          return `${initials.map.cdkeyState[record.state]}`
        }
      }, {
        title: this.props.intl.formatMessage(message.type),
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => {
          return `${initials.map.cdkeyTypes[record.type]}(${record.type})`
        }
      }, {
        title: this.props.intl.formatMessage(message.receiveTime),
        dataIndex: 'currentDate',
        key: 'currentDate',
        render: (text, record) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }, {
        title: this.props.intl.formatMessage(message.endTime),
        dataIndex: 'endDate',
        key: 'endDate',
        render: (text, record) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }, {
        title: this.props.intl.formatMessage(message.userId),
        dataIndex: 'userId',
        key: 'userId'
      }, {
        title: this.props.intl.formatMessage(message.usedCount),
        dataIndex: 'usedCount',
        key: 'usedCount'
      }, {
        title: this.props.intl.formatMessage(message.total),
        dataIndex: 'num',
        key: 'num'
      }
    ]

    this.dataSource = []
  }

  expandedRowRender = (record) => {
    const { initials, options } = this.props
    const rewards = record.activityRewards
    const loglist = record.cdkeyUsedLogList ? record.cdkeyUsedLogList : []
    const usedlist = record.cdkeyUserUsedList ? record.cdkeyUserUsedList : []

    const columns2 = [
      {
        title: this.props.intl.formatMessage(message.item),
        dataIndex: 'itemId',
        key: 'itemId',
        width: '50%',
        render: (text, record) => {
          return options.items[record.itemId] ? `${options.items[record.itemId]}(${record.itemId})` : `未找到该道具(${record.itemId}),not found`
        }
      }, {
        title: this.props.intl.formatMessage(message.count),
        dataIndex: 'count',
        key: 'count',
        width: '50%'
      }
    ]
    const columns = [
      {
        title: this.props.intl.formatMessage(message.cdkey),
        dataIndex: 'cdkey',
        key: 'cdkey'

      }, {
        title: this.props.intl.formatMessage(message.productId),
        dataIndex: 'productId',
        key: 'productId'
      }, {
        title: this.props.intl.formatMessage(message.serverId),
        dataIndex: 'serverId',
        key: 'serverId'
      }, {
        title: this.props.intl.formatMessage(message.receiveState),
        dataIndex: 'state',
        key: 'state',
        render: (text, record) => {
          return `${initials.map.cdkeyState[record.state]}`
        }
      }, {
        title: this.props.intl.formatMessage(message.receiveTime),
        dataIndex: 'currentDate',
        key: 'currentDate',
        render: (text, record) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }, {
        title: this.props.intl.formatMessage(message.userId),
        dataIndex: 'userId',
        key: 'userId'
      }
    ]

    const columns1 = [
      {
        title: this.props.intl.formatMessage(message.cdkey),
        dataIndex: 'cdkey',
        key: 'cdkey'

      }, {
        title: this.props.intl.formatMessage(message.productId),
        dataIndex: 'productId',
        key: 'productId'
      }, {
        title: this.props.intl.formatMessage(message.serverId),
        dataIndex: 'serverId',
        key: 'serverId'
      }, {
        title: this.props.intl.formatMessage(message.usedCount),
        dataIndex: 'useCount',
        key: 'useCount'
      }, {
        title: this.props.intl.formatMessage(message.useTime),
        dataIndex: 'usedDates',
        key: 'usedDates'
      }, {
        title: this.props.intl.formatMessage(message.uid),
        dataIndex: 'uid',
        key: 'uid'
      }
    ]

    const dataSource = [...loglist]
    const dataSource1 = [...rewards]
    const dataSource2 = [...usedlist]

    return (
      <div>
        <Table
          size='small'
          title={() => <div style={{color: '#6600AA'}}>{this.props.intl.formatMessage(message.item)}</div>}
          columns={columns2}
          dataSource={dataSource1}
          rowKey='itemId'
          locale={{emptyText: this.props.intl.formatMessage(message.cdkey_empty)}}
          pagination={false}
          showHeader
          style={{ marginBottom: 16 }}
        />
        {
          loglist.length > 0 &&
          <Table
            size='small'
            title={() => <div style={{color: '#8566FF'}}>{this.props.intl.formatMessage(message.useStatus)}</div>}
            columns={columns}
            dataSource={dataSource}
            rowKey='cdkey'
            locale={{emptyText: this.props.intl.formatMessage(message.useStatus_no)}}
            pagination={false}
            showHeader
            style={{ marginBottom: 16 }}
          />
        }
        {
          usedlist.length > 0 &&
          <Table
            size='small'
            title={() => <div style={{color: '#4E6DE4'}}>{this.props.intl.formatMessage(message.useStatus)}</div>}
            columns={columns1}
            dataSource={dataSource2}
            rowKey='cdkey'
            locale={{emptyText: this.props.intl.formatMessage(message.useStatus_no)}}
            pagination={false}
            showHeader
          />
        }
      </div>
    )
  }

  render() {
    const { options, initials: { params, conf }, intl } = this.props
    this.dataSource = Object.keys(options.cdkey).length ? [{...options.cdkey}] : []

    let arrParam = []
    params.productId ? arrParam.push(`产品：${params.productId}`) : ''
    params.cdkey ? arrParam.push(`CDKey：${params.cdkey}`) : ''
    let strParam = arrParam.join('，')
    let defaultLocale = {
      emptyText: conf.locale ? `查询：{ ${strParam} }，${intl.formatMessage(message.notFound)}` : `未作查询，${intl.formatMessage(message.notFound)}`
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
          expandedRowRender={record => this.expandedRowRender(record)}
          rowKey='activityId'
          locale={defaultLocale}
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
